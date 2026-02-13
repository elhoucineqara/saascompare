const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('Please define the MONGODB_URI environment variable inside .env');
    process.exit(1);
}

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: String,
}, { timestamps: true });

const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

const categories = [
    { name: 'CRM & Sales', slug: 'crm-and-sales', description: 'Manage customer relationships and close more deals.' },
    { name: 'Project Management', slug: 'project-management', description: 'Organize tasks, teams, and projects efficiently.' },
    { name: 'Marketing Automation', slug: 'marketing-automation', description: 'Automate your marketing campaigns and workflows.' },
    { name: 'Email Marketing', slug: 'email-marketing', description: 'Reach your audience with targeted email campaigns.' },
    { name: 'SEO Tools', slug: 'seo-tools', description: 'Optimize your website for search engines.' },
    { name: 'Analytics', slug: 'analytics', description: 'Track your data and gain actionable insights.' },
    { name: 'Design Tools', slug: 'design-tools', description: 'Create stunning graphics and user interfaces.' },
    { name: 'Collaboration', slug: 'collaboration', description: 'Work better together with your team.' },
];

async function seed() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        await Category.deleteMany({}); // Clear existing
        console.log('Cleared existing categories');

        await Category.insertMany(categories);
        console.log(`Seeded ${categories.length} categories`);

        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
}

seed();
