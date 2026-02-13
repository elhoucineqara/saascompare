import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    description: String,
}, { timestamps: true });

export const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

const FeatureSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
});

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a product name'],
        maxlength: [100, 'Name cannot be more than 100 characters'],
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    description: {
        type: String,
        required: true,
    },
    websiteUrl: {
        type: String,
        required: true,
    },
    logoUrl: String,
    priceModel: {
        type: String,
        enum: ['Free', 'Freemium', 'Paid', 'Contact Sales'],
        default: 'Freemium',
    },
    pricing: String,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    features: [FeatureSchema],
    averageRating: {
        type: Number,
        default: 0,
    },
    reviewCount: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

export const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
