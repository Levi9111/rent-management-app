import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../../config'; // Adjust path as necessary

export interface IAdmin extends Document {
  email: string;
  password: string;
}

const adminSchema = new Schema<IAdmin>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

const Admin = model<IAdmin>('Admin', adminSchema);

export const seedAdmin = async () => {
  try {
    const existingAdmin = await Admin.findOne({ email: config.app_email });

    if (existingAdmin) {
      console.log('✅ Admin already exists');
      return;
    }

    const hashedPassword = await bcrypt.hash(config.admin_pass!, 10);

    const admin = new Admin({
      email: config.app_email,
      password: hashedPassword,
    });

    await admin.save();
    console.log('🎉 Admin created and saved successfully!');
  } catch (error) {
    console.error('❌ Error seeding admin:', error);
  }
};
