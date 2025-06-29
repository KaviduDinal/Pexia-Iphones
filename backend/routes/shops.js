import express from 'express';
import { auth } from '../middleware/auth.js';
import Shop from '../models/Shop.js';
import User from '../models/User.js';

const router = express.Router();

// Get all shops
router.get('/', async (req, res) => {
  try {
    const { city, state, verified, page = 1, limit = 10 } = req.query;
    
    const filter = { isActive: true };
    if (city) filter['location.city'] = new RegExp(city, 'i');
    if (state) filter['location.state'] = new RegExp(state, 'i');
    if (verified) filter.verified = verified === 'true';

    const shops = await Shop.find(filter)
      .populate('owner', 'name email')
      .sort({ verified: -1, 'rating.average': -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Shop.countDocuments(filter);

    res.json({
      success: true,
      shops,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });

  } catch (error) {
    console.error('Get shops error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching shops'
    });
  }
});

// Register new shop
router.post('/register', auth, async (req, res) => {
  try {
    const {
      name,
      description,
      location,
      contact,
      businessHours,
      specializations
    } = req.body;

    // Check if user already has a shop
    const user = await User.findById(req.user.userId);
    if (user.isShopOwner && user.shopId) {
      return res.status(400).json({
        success: false,
        message: 'User already has a registered shop'
      });
    }

    // Create new shop
    const shop = new Shop({
      name,
      owner: req.user.userId,
      ownerName: user.name,
      description,
      location,
      contact,
      businessHours,
      specializations
    });

    await shop.save();

    // Update user to be shop owner
    user.isShopOwner = true;
    user.shopId = shop._id;
    user.role = 'shop_owner';
    await user.save();

    res.status(201).json({
      success: true,
      message: 'Shop registered successfully',
      shop
    });

  } catch (error) {
    console.error('Shop registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while registering shop'
    });
  }
});

// Get shop by ID
router.get('/:id', async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id)
      .populate('owner', 'name email');

    if (!shop) {
      return res.status(404).json({
        success: false,
        message: 'Shop not found'
      });
    }

    res.json({
      success: true,
      shop
    });

  } catch (error) {
    console.error('Get shop error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching shop'
    });
  }
});

export default router;