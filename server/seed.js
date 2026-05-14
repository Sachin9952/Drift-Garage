const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const connectDB = require('./config/db');

const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '.env') });
connectDB();

const seedAdmin = async () => {
  try {
    await User.deleteMany({ email: 'admin@driftgarage.com' });

    const adminUser = {
      name: 'Admin User',
      email: 'admin@driftgarage.com',
      password: 'admin123',
      role: 'admin',
    };

    await User.create(adminUser);

    console.log('Admin user created successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedAdmin();
