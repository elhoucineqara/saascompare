import mongoose from 'mongoose';

const ComparisonSchema = new mongoose.Schema({
    ids: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        validate: [(val: mongoose.Types.ObjectId[]) => val.length === 2, 'Comparison must be between exactly two tools'],
    },
    slug: {
        type: String, // e.g., "hubspot-vs-salesforce"
        required: true,
        unique: true,
        index: true,
    },
    title: String, // "HubSpot vs Salesforce: Which is better?"
    verdict: String, // Short summary of the winner
    content: String, // Markdown content of the comparison
    seoTitle: String,
    seoDescription: String,
}, { timestamps: true });

export default mongoose.models.Comparison || mongoose.model('Comparison', ComparisonSchema);
