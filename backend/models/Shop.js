import mongoose from 'mongoose';

const shopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Shop name is required'],
    trim: true,
    maxlength: [100, 'Shop name cannot exceed 100 characters']
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  ownerName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  location: {
    address: String,
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: String,
    country: { type: String, default: 'India' },
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  contact: {
    phone: { type: String, required: true },
    email: String,
    website: String
  },
  images: [{
    type: String
  }],
  rating: {
    average: { type: Number, default: 0, min: 0, max: 5 },
    count: { type: Number, default: 0 }
  },
  verified: {
    type: Boolean,
    default: false
  },
  verificationDocuments: [{
    type: String,
    url: String,
    uploadedAt: { type: Date, default: Date.now }
  }],
  businessHours: {
    monday: { open: String, close: String, closed: { type: Boolean, default: false } },
    tuesday: { open: String, close: String, closed: { type: Boolean, default: false } },
    wednesday: { open: String, close: String, closed: { type: Boolean, default: false } },
    thursday: { open: String, close: String, closed: { type: Boolean, default: false } },
    friday: { open: String, close: String, closed: { type: Boolean, default: false } },
    saturday: { open: String, close: String, closed: { type: Boolean, default: false } },
    sunday: { open: String, close: String, closed: { type: Boolean, default: true } }
  },
  specializations: [{
    type: String,
    enum: ['new_iphones', 'refurbished', 'accessories', 'repairs', 'trade_in']
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  totalSales: {
    type: Number,
    default: 0
  },
  joinedDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for location-based searches
shopSchema.index({ 'location.coordinates': '2dsphere' });
shopSchema.index({ 'location.city': 1, 'location.state': 1 });

export default mongoose.model('Shop', shopSchema);