import mongoose from 'mongoose';

const FAQSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
    tool: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SaaSTool',
        // If null, it's a general FAQ (e.g., About Us page)
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        // If null, it's a general or tool-specific FAQ
    },
    order: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });

export default mongoose.models.FAQ || mongoose.model('FAQ', FAQSchema);
