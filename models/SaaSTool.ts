import mongoose from 'mongoose';

const SaaSToolSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a tool name'],
        unique: true,
        trim: true,
        maxlength: [100, 'Name cannot be more than 100 characters'],
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true,
    },
    logoUrl: {
        type: String,
        required: [true, 'Please provide a logo URL'],
    },
    websiteUrl: {
        type: String,
        required: [true, 'Please provide a website URL'],
    },
    affiliateLink: {
        type: String,
        trim: true,
    },
    shortDescription: {
        type: String,
        required: [true, 'Please provide a short description'],
        maxlength: [200, 'Short description cannot be more than 200 characters'],
    },
    longReview: {
        type: String, // Markdown content
    },
    pros: {
        type: [String],
        default: [],
    },
    cons: {
        type: [String],
        default: [],
    },
    features: {
        type: [String], // Simple list of main features
        default: [],
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    pricingModel: {
        type: String,
        enum: ['Free', 'Freemium', 'Paid', 'Contact Sales'],
        default: 'Freemium',
    },
    startingPrice: {
        type: Number,
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
    // SEO Fields
    seoTitle: String,
    seoDescription: String,

    averageRating: {
        type: Number,
        default: 0,
    },
    reviewCount: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

export default mongoose.models.SaaSTool || mongoose.model('SaaSTool', SaaSToolSchema);
