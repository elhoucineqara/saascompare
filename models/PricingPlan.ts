import mongoose from 'mongoose';

const PricingPlanSchema = new mongoose.Schema({
    tool: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SaaSTool',
        required: true,
    },
    name: {
        type: String, // e.g., "Basic", "Pro", "Enterprise"
        required: true,
    },
    price: {
        type: Number, // 0 for free
        required: true,
    },
    currency: {
        type: String,
        default: 'USD',
    },
    interval: {
        type: String,
        enum: ['month', 'year', 'one-time'],
        default: 'month',
    },
    features: {
        type: [String], // List of features included in this plan
        default: [],
    },
    isPopular: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

export default mongoose.models.PricingPlan || mongoose.model('PricingPlan', PricingPlanSchema);
