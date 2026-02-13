import mongoose from 'mongoose';
import './User'; // Ensure User model is registered

const BlogPostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    content: {
        type: String, // Markdown or HTML
        required: true,
    },
    excerpt: String,
    coverImage: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    tags: {
        type: [String],
        default: [],
    },
    published: {
        type: Boolean,
        default: false,
    },
    publishedAt: Date,
    seoTitle: String,
    seoDescription: String,
}, { timestamps: true });

export default mongoose.models.BlogPost || mongoose.model('BlogPost', BlogPostSchema);
