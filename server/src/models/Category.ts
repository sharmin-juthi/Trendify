import { Schema, model, Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  slug: string;
  iconName: string;
  itemCount: number;
  imageUrl: string;
  description?: string;
}

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    iconName: { type: String, required: true },
    itemCount: { type: Number, default: 0 },
    imageUrl: { type: String, required: true },
    description: { type: String }
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      }
    }
  }
);

export const Category = model<ICategory>('Category', categorySchema);
