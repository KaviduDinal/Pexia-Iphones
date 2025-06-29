import express from 'express';
import { auth } from '../middleware/auth.js';
import iPhone from '../models/iPhone.js';
import Shop from '../models/Shop.js';

const router = express.Router();

// Get all iPhones
router.get('/', async (req, res) => {
  try {
    const {
      model,
      condition,
      minPrice,
      maxPrice,
      storage,
      color,
      city,
      sortBy = 'createdAt',
      order = 'desc',
      page = 1,
      limit = 12
    } = req.query;

    const filter = { isActive: true, availability: { $gt: 0 } };

    // Apply filters
    if (model) filter.model = model;
    if (condition) filter.condition = condition;
    if (storage) filter.storage = storage;
    if (color) filter.color = new RegExp(color, 'i');
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (city) filter.shopLocation = new RegExp(city, 'i');

    // Sort options
    const sortOptions = {};
    sortOptions[sortBy] = order === 'desc' ? -1 : 1;

    const iphones = await iPhone.find(filter)
      .populate('shop', 'name location rating verified')
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await iPhone.countDocuments(filter);

    res.json({
      success: true,
      iphones,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });

  } catch (error) {
    console.error('Get iPhones error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching iPhones'
    });
  }
});

// Add new iPhone (shop owners only)
router.post('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user.isShopOwner || !user.shopId) {
      return res.status(403).json({
        success: false,
        message: 'Only shop owners can add iPhones'
      });
    }

    const iphoneData = {
      ...req.body,
      shop: user.shopId
    };

    const iphone = new iPhone(iphoneData);
    await iphone.save();

    res.status(201).json({
      success: true,
      message: 'iPhone added successfully',
      iphone
    });

  } catch (error) {
    console.error('Add iPhone error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while adding iPhone'
    });
  }
});

// Get iPhone by ID
router.get('/:id', async (req, res) => {
  try {
    const iphone = await iPhone.findById(req.params.id)
      .populate('shop', 'name location contact rating verified businessHours');

    if (!iphone) {
      return res.status(404).json({
        success: false,
        message: 'iPhone not found'
      });
    }

    // Increment view count
    iphone.views += 1;
    await iphone.save();

    res.json({
      success: true,
      iphone
    });

  } catch (error) {
    console.error('Get iPhone error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching iPhone'
    });
  }
});

export default router;