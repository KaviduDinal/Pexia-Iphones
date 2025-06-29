import express from 'express';
import { auth } from '../middleware/auth.js';
import Order from '../models/Order.js';
import iPhone from '../models/iPhone.js';

const router = express.Router();

// Create new order
router.post('/', auth, async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;

    // Validate items and calculate total
    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const iphone = await iPhone.findById(item.iphoneId);
      if (!iphone || iphone.availability < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `iPhone ${iphone?.model || 'not found'} is not available in requested quantity`
        });
      }

      orderItems.push({
        iphone: iphone._id,
        quantity: item.quantity,
        price: iphone.price,
        shop: iphone.shop
      });

      totalAmount += iphone.price * item.quantity;
    }

    // Calculate tax and final amount
    const tax = Math.round(totalAmount * 0.18); // 18% GST
    const finalAmount = totalAmount + tax;

    // Create order
    const order = new Order({
      user: req.user.userId,
      items: orderItems,
      totalAmount,
      tax,
      finalAmount,
      shippingAddress,
      paymentMethod
    });

    await order.save();

    // Update iPhone availability
    for (const item of items) {
      await iPhone.findByIdAndUpdate(
        item.iphoneId,
        { $inc: { availability: -item.quantity } }
      );
    }

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order
    });

  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating order'
    });
  }
});

// Get user orders
router.get('/my-orders', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.userId })
      .populate('items.iphone', 'model storage color images')
      .populate('items.shop', 'name location')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      orders
    });

  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching orders'
    });
  }
});

export default router;