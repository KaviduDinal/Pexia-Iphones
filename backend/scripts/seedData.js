import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Shop from '../models/Shop.js';
import iPhone from '../models/iPhone.js';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Shop.deleteMany({});
    await iPhone.deleteMany({});

    // Create sample users
    const users = await User.create([
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        isEmailVerified: true
      },
      {
        name: 'Sarah Johnson',
        email: 'sarah@techhub.com',
        password: 'password123',
        isShopOwner: true,
        isEmailVerified: true,
        role: 'shop_owner'
      },
      {
        name: 'Mike Chen',
        email: 'mike@mobileworld.com',
        password: 'password123',
        isShopOwner: true,
        isEmailVerified: true,
        role: 'shop_owner'
      }
    ]);

    // Create sample shops
    const shops = await Shop.create([
      {
        name: 'TechHub Electronics',
        owner: users[1]._id,
        ownerName: 'Sarah Johnson',
        description: 'Premium electronics retailer specializing in Apple products',
        location: {
          city: 'Mumbai',
          state: 'Maharashtra',
          address: '123 Tech Street, Bandra West'
        },
        contact: {
          phone: '+91-9876543210',
          email: 'info@techhub.com'
        },
        verified: true,
        rating: { average: 4.8, count: 156 },
        specializations: ['new_iphones', 'accessories']
      },
      {
        name: 'Mobile World',
        owner: users[2]._id,
        ownerName: 'Mike Chen',
        description: 'Your trusted mobile phone destination',
        location: {
          city: 'Delhi',
          state: 'Delhi',
          address: '456 Mobile Plaza, Connaught Place'
        },
        contact: {
          phone: '+91-9876543211',
          email: 'info@mobileworld.com'
        },
        verified: true,
        rating: { average: 4.6, count: 89 },
        specializations: ['refurbished', 'trade_in']
      }
    ]);

    // Update users with shop IDs
    users[1].shopId = shops[0]._id;
    users[2].shopId = shops[1]._id;
    await users[1].save();
    await users[2].save();

    // Create sample iPhones
    await iPhone.create([
      {
        model: 'iPhone 15 Pro Max',
        storage: '256GB',
        color: 'Natural Titanium',
        price: 134900,
        originalPrice: 159900,
        condition: 'New',
        shop: shops[0]._id,
        availability: 5,
        images: ['https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=400'],
        description: 'Latest iPhone with A17 Pro chip and titanium design',
        specifications: {
          display: '6.7" Super Retina XDR',
          processor: 'A17 Pro chip',
          camera: '48MP Main + 12MP Ultra Wide + 12MP Telephoto',
          battery: 'Up to 29 hours video playback'
        }
      },
      {
        model: 'iPhone 15',
        storage: '128GB',
        color: 'Pink',
        price: 79900,
        condition: 'New',
        shop: shops[1]._id,
        availability: 3,
        images: ['https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=400'],
        description: 'The newest iPhone with Dynamic Island and 48MP camera',
        specifications: {
          display: '6.1" Super Retina XDR',
          processor: 'A16 Bionic chip',
          camera: '48MP Main + 12MP Ultra Wide',
          battery: 'Up to 20 hours video playback'
        }
      },
      {
        model: 'iPhone 14 Pro',
        storage: '256GB',
        color: 'Deep Purple',
        price: 119900,
        originalPrice: 129900,
        condition: 'Like New',
        shop: shops[0]._id,
        availability: 2,
        images: ['https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=400'],
        description: 'iPhone 14 Pro with Dynamic Island and Always-On display',
        specifications: {
          display: '6.1" Super Retina XDR with ProMotion',
          processor: 'A16 Bionic chip',
          camera: '48MP Main + 12MP Ultra Wide + 12MP Telephoto',
          battery: 'Up to 23 hours video playback'
        }
      }
    ]);

    console.log('✅ Sample data seeded successfully');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedData();