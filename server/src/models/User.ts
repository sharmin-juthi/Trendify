import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IAddress {
  id?: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault?: boolean;
}

export interface IUser extends Document {
  id: string;
  name: string;
  email: string;
  password?: string;
  avatar?: string;
  role: 'user' | 'admin';
  addresses: IAddress[];
  wishlist: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  matchPassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    avatar: { type: String },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    addresses: [
      {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true },
        country: { type: String, required: true, default: 'United States' },
        isDefault: { type: Boolean, default: false }
      }
    ],
    wishlist: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        delete ret.password;
      }
    }
  }
);

userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password') || !this.password) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
  if (!this.password) return false;
  return await bcrypt.compare(enteredPassword, this.password);
};

export const User = model<IUser>('User', userSchema);
