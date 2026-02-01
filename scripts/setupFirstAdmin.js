import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/userModel.js';

dotenv.config();

const setupFirstAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const adminEmail = 'sackagentng@gmail.com';
    const adminPassword = 'Sackagent@12345';

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log('Super Admin already exists:', existingAdmin.email);
      await mongoose.disconnect();
      return;
    }

    // Create super admin (plain password; pre-save hook will hash it)
    const superAdmin = new User({
      fullName: 'Super Administrator',
      email: adminEmail,
      password: adminPassword,
      role: 'super_admin',
      isVerified: true,
      isEmailVerified: true,
      kycVerified: true,
      accountStatus: 'active'
    });

    await superAdmin.save();

    console.log('=========================================');
    console.log('SUPER ADMIN CREATED SUCCESSFULLY!');
    console.log('=========================================');
    console.log('Email:', adminEmail);
    console.log('Password:', adminPassword);
    console.log('Role: super_admin');
    console.log('=========================================');
    console.log('IMPORTANT: Change the password immediately after first login!');
    console.log('=========================================');

    await mongoose.disconnect();
  } catch (error) {
    console.error('Setup error:', error);
    process.exit(1);
  }
};

setupFirstAdmin();
