import mongoose from 'mongoose';

const sizeSchema = new mongoose.Schema({
  ml: { type: Number, required: true },
  price: { type: Number, required: true },
}, { _id: false });

const notesSchema = new mongoose.Schema({
  top: [{ type: String }],
  heart: [{ type: String }],
  base: [{ type: String }],
}, { _id: false });

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    category: { type: String, enum: ['Men', 'Women', 'Unisex'], required: true },
    sizes: [sizeSchema],
    images: [{ type: String }],
    notes: notesSchema,
    rating: { type: Number, default: 4.5 },
    reviewCount: { type: Number, default: 0 },
    stock: { type: Number, default: 100 },
    isFeatured: { type: Boolean, default: false },
    isBestseller: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);
