import mongoose from 'mongoose';

const iphoneSchema = new mongoose.Schema({
  model: {
    type: String,
    required: [true, 'iPhone model is required'],
    enum: [
      'iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 15 Plus', 'iPhone 15',
      'iPhone 14 Pro Max', 'iPhone 14 Pro', 'iPhone 14 Plus', 'iPhone 14',
      'iPhone 13 Pro Max', 'iPhone 13 Pro', 'iPhone 13', 'iPhone 13 mini',
      'iPhone 12 Pro Max', 'iPhone 12 Pro', 'iPhone 12', 'iPhone 12 mini',
      'iPhone 11 Pro Max', 'iPhone 11 Pro', 'iPhone 11',
      'iPhone XS Max', 'iPhone XS', 'iPhone XR',
      'iPhone X', 'iPhone 8 Plus', 'iPhone 8', 'iPhone SE'
    ]
  },
  storage: {
    type: String,
    required: [true, 'Storage capacity is required'],
    enum: ['64GB', '128GB', '256GB', '512GB', '1TB']
  },
  color: {
    type: String,
    required: [true, 'Color is required']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  originalPrice: {
    type: Number,
    min: [0, 'Original price cannot be negative']
  },
  condition: {
    type: String,
    required: [true, 'Condition is required'],
    enum: ['New', 'Like New', 'Good', 'Fair']
  },
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop',
    required: true
  },
  shopName: String,
  shopLocation: String,
  availability: {
    type: Number,
    required: [true, 'Availability count is required'],
    min: [0, 'Availability cannot be negative'],
    default: 1
  },
  images: [{
    type: String,
    required: true
  }],
  description: {
    type: String,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  specifications: {
    display: String,
    processor: String,
    camera: String,
    battery: String,
    operatingSystem: String,
    connectivity: [String],
    sensors: [String]
  },
  features: [{
    type: String
  }],
  warranty: {
    duration: String,
    type: { type: String, enum: ['manufacturer', 'shop', 'none'], default: 'none' },
    details: String
  },
  imei: {
    type: String,
    unique: true,
    sparse: true
  },
  purchaseDate: Date,
  tags: [{
    type: String
  }],
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  soldAt: Date,
  soldTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Indexes for better query performance
iphoneSchema.index({ model: 1, condition: 1, price: 1 });
iphoneSchema.index({ shop: 1, isActive: 1 });
iphoneSchema.index({ price: 1 });
iphoneSchema.index({ createdAt: -1 });

// Pre-save middleware to populate shop details
iphoneSchema.pre('save', async function(next) {
  if (this.isModified('shop')) {
    try {
      const Shop = mongoose.model('Shop');
      const shop = await Shop.findById(this.shop);
      if (shop) {
        this.shopName = shop.name;
        this.shopLocation = `${shop.location.city}, ${shop.location.state}`;
      }
    } catch (error) {
      console.error('Error populating shop details:', error);
    }
  }
  next();
});

export default mongoose.model('iPhone', iphoneSchema);