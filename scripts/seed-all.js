
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Load env vars manually
const envPath = path.resolve(__dirname, '../.env');
if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf8');
    envConfig.split('\n').forEach(line => {
        const parts = line.split('=');
        if (parts.length >= 2) {
            const key = parts[0].trim();
            let value = parts.slice(1).join('=').trim();
            // Remove surrounding quotes if present
            if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
                value = value.slice(1, -1);
            }
            process.env[key] = value;
        }
    });
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('Please define the MONGODB_URI environment variable inside .env');
    process.exit(1);
}

// Define Schemas/Models locally to avoid TS compilation issues in the script
// USERS
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, select: false },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    image: String,
    provider: { type: String, default: 'credentials' },
}, { timestamps: true });
const User = mongoose.models.User || mongoose.model('User', UserSchema);

// CATEGORIES
const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: String,
}, { timestamps: true });
const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

// SAAS TOOLS
const SaaSToolSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true, lowercase: true, index: true },
    logoUrl: { type: String, required: true },
    websiteUrl: { type: String, required: true },
    affiliateLink: String,
    shortDescription: { type: String, required: true },
    longReview: String,
    pros: [String],
    cons: [String],
    features: [String],
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    pricingModel: { type: String, enum: ['Free', 'Freemium', 'Paid', 'Contact Sales'], default: 'Freemium' },
    startingPrice: Number,
    isFeatured: { type: Boolean, default: false },
    averageRating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
}, { timestamps: true });
const SaaSTool = mongoose.models.SaaSTool || mongoose.model('SaaSTool', SaaSToolSchema);

// PRICING PLANS
const PricingPlanSchema = new mongoose.Schema({
    tool: { type: mongoose.Schema.Types.ObjectId, ref: 'SaaSTool', required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    currency: { type: String, default: 'USD' },
    interval: { type: String, enum: ['month', 'year', 'one-time'], default: 'month' },
    features: [String],
    isPopular: { type: Boolean, default: false },
}, { timestamps: true });
const PricingPlan = mongoose.models.PricingPlan || mongoose.model('PricingPlan', PricingPlanSchema);

// BLOG POSTS
const BlogPostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    content: { type: String, required: true },
    excerpt: String,
    coverImage: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    tags: { type: [String], default: [] },
    published: { type: Boolean, default: false },
    publishedAt: Date,
    seoTitle: String,
    seoDescription: String,
}, { timestamps: true });
const BlogPost = mongoose.models.BlogPost || mongoose.model('BlogPost', BlogPostSchema);

// COMPARISONS
const ComparisonSchema = new mongoose.Schema({
    ids: { type: [mongoose.Schema.Types.ObjectId], required: true },
    slug: { type: String, required: true, unique: true, index: true },
    title: String,
    verdict: String,
    content: String,
    seoTitle: String,
    seoDescription: String,
}, { timestamps: true });
const Comparison = mongoose.models.Comparison || mongoose.model('Comparison', ComparisonSchema);

// DATA
const users = [
    { name: 'Admin User', email: 'admin@example.com', password: 'password123', role: 'admin' },
    { name: 'Regular User', email: 'user@example.com', password: 'password123', role: 'user' },
];

const blogPostsData = [
    {
        title: "Top 10 SaaS Metrics You Need to Track",
        slug: "top-10-saas-metrics",
        excerpt: "Discover the key performance indicators that every SaaS founder should be monitoring for growth.",
        content: `
# Top 10 SaaS Metrics You Need to Track in 2024

In the fast-paced world of Software as a Service (SaaS), data is king. But with an abundance of data available, it can be overwhelming to decide which metrics truly matter for your business's health and growth. Tracking the right KPIs (Key Performance Indicators) is crucial for making informed decisions, securing funding, and driving sustainable growth.

In this comprehensive guide, we will dive deep into the top 10 SaaS metrics that every founder, product manager, and investor needs to track. These metrics will give you a holistic view of your business, from customer acquisition to retention and financial efficiency.

## 1. Monthly Recurring Revenue (MRR)

**What it is:** MRR is the predictable revenue that your business expects to receive every month. It is the single most important metric for any subscription-based business.

**Why it matters:** MRR provides a clear picture of your current financial health and growth trajectory. Unlike one-time sales, MRR tracks the momentum of your business. It allows you to forecast revenue, plan budgets, and measure the impact of new sales and churn.

**How to calculate:**
\`MRR = Number of Paying Customers * Average Revenue Per User (ARPU)\`

To get a more granular view, you should break down your MRR into:
- **New MRR:** Revenue from new customers.
- **Expansion MRR:** Additional revenue from existing customers (upgrades, cross-sells).
- **Contraction MRR:** Lost revenue from downgrades.
- **Churned MRR:** Lost revenue from cancellations.

## 2. Annual Recurring Revenue (ARR)

**What it is:** ARR is simply your MRR annualized. It represents the value of your recurring revenue components on a yearly basis.

**Why it matters:** ARR is the standard metric used to value SaaS companies. Investors look at ARR to gauge the size and growth stage of your company. It smooths out monthly fluctuations and provides a long-term view of your business scale.

**How to calculate:**
\`ARR = MRR * 12\`

## 3. Churn Rate

**What it is:** Churn rate measures the percentage of customers or revenue that you lose over a specific period, typically a month or a year.

**Why it matters:** Churn is the silent killer of SaaS businesses. Even with high growth, a high churn rate can prevent you from ever reaching profitability. It is much more expensive to acquire a new customer than to retain an existing one. Keeping churn low is essential for a healthy LTV (Lifetime Value).

**Types of Churn:**
- **Customer Churn:** The percentage of customers who cancel.
- **Revenue Churn:** The percentage of revenue lost. Revenue churn can be negative if your expansion revenue (upgrades) exceeds your lost revenue from cancellations. Negative churn is the holy grail of SaaS growth.

## 4. Customer Acquisition Cost (CAC)

**What it is:** CAC is the total cost of acquiring a new customer. This includes all sales and marketing expenses (salaries, ad spend, software tools, etc.) divided by the number of new customers acquired during that period.

**Why it matters:** CAC tells you how efficient your sales and marketing efforts are. If your CAC is too high, you might be spending more to acquire a customer than they are worth, which is an unsustainable business model.

**How to calculate:**
\`CAC = (Total Sales + Marketing Expenses) / Number of New Customers Acquired\`

## 5. Customer Lifetime Value (LTV / CLV)

**What it is:** LTV estimates the total revenue a business can reasonably expect from a single customer account throughout their relationship with the company.

**Why it matters:** LTV helps you determine how much you can afford to spend on acquiring a customer (CAC). A common rule of thumb in successful SaaS companies is that LTV should be at least 3x CAC (LTV:CAC ratio > 3:1).

**How to calculate:**
\`LTV = (ARPU * Gross Margin %) / Customer Churn Rate\`

## 6. LTV:CAC Ratio

**What it is:** This ratio compares the value of a customer over their lifetime to the cost of acquiring them.

**Why it matters:** It is the ultimate measure of the fundamental health of your unit economics.
- **< 1:1**: You are losing money on every customer. Fix this immediately.
- **3:1**: Identify as a healthy benchmark for most SaaS businesses.
- **> 5:1**: You might be underinvesting in growth. You could afford to spend more to acquire customers faster.

## 7. Average Revenue Per User (ARPU)

**What it is:** ARPU measures the average amount of monthly revenue that you receive per user or account.

**Why it matters:** ARPU helps you validate your pricing strategy. Increasing ARPU is often one of the quickest ways to grow revenue without needing to acquire new customers. It indicates if you are successfully moving upmarket or cross-selling to your existing base.

## 8. Net Promoter Score (NPS)

**What it is:** NPS measures customer satisfaction and loyalty. It is based on a single question: "On a scale of 0 to 10, how likely are you to recommend our product to a friend or colleague?"

**Why it matters:** While financial metrics are important, customer sentiment is a leading indicator of future growth (or churn). High NPS correlates strongly with organic growth through word-of-mouth.

## 9. Burn Rate

**What it is:** Burn rate is the rate at which a company spends its cash reserves to cover operating expenses. It is usually expressed as a monthly figure.

**Why it matters:** For early-stage startups that are not yet profitable, knowing your burn rate is critical to understanding your "runway"—how many months you have left before you run out of money.

## 10. Activation Rate

**What it is:** The percentage of users who take a specific action that indicates they are receiving value from your product (e.g., "created first project", "invited a team member").

**Why it matters:** Signing up is just the first step. If users don't activate, they will likely churn. Improving activation rate is often the highest-leverage activity for early-stage product teams.

---

**Conclusion**

Tracking these metrics is not a one-time exercise. You should build a dashboard that updates them in real-time and review them weekly or monthly with your team. By keeping a finger on the pulse of these top 10 metrics, you will be well-equipped to navigate the challenges of building and scaling a successful SaaS business.
        `,
        coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
        tags: ["SaaS", "Metrics", "Growth", "Analytics", "Business"],
        published: true,
        publishedAt: new Date('2024-01-15'),
    },
    {
        title: "How to Choose the Right CRM for Your Startup: The Ultimate Guide",
        slug: "choose-right-crm",
        excerpt: "A comprehensive guide to selecting a CRM that scales with your business needs, avoids technical debt, and empowers your sales team.",
        content: `
# How to Choose the Right CRM for Your Startup

Choosing a Customer Relationship Management (CRM) system is one of the most critical infrastructure decisions a startup founder will make. The right CRM can accelerate your sales velocity, provide deep customer insights, and organize your chaotic startup life. The wrong one can become a black hole of data entry, a source of friction for your sales team, and a costly mistake to migrate away from later.

In this guide, we will explore everything you need to know to make the right choice for your stage of growth.

## Why Do You Need a CRM?

Before diving into features, let's clarify why you need one. Spreadsheets work fine for the first 10 customers. But as you scale, you need:
1.  **Centralized Data:** A single source of truth for every interaction with a customer.
2.  **Pipeline Visibility:** Knowing exactly where every deal stands and forecasting revenue.
3.  **Process Automation:** Removing manual tasks like data entry and follow-up emails.
4.  **Collaboration:** Allowing sales, marketing, and support to view the same customer profile.

## Key Factors to Consider

### 1. Complexity vs. Usability

This is the biggest trade-off. Enterprise tools like Salesforce offer infinite customization but require dedicated administrators and have a steep learning curve. Tools like Pipedrive or Trello are incredibly easy to use but might lack advanced reporting or automation features.

**Tip:** For early-stage startups, **usability is paramount**. If your sales team hates the CRM, they won't use it, and your data will be worthless.

### 2. Integration Ecosystem

Your CRM does not live in a vacuum. It needs to talk to your:
-   **Email Client** (Gmail, Outlook)
-   **Marketing Automation Platform** (HubSpot, Mailchimp)
-   **Customer Support Tool** (Intercom, Zendesk)
-   **Billing System** (Stripe)

Check the integration marketplace of any CRM you consider. Native integrations are always better than relying on third-party connectors like Zapier for core data flows.

### 3. Pricing and Scalability

Most CRMs charge per user/month. However, pricing structures vary:
-   **Tiered Features:** Lower tiers often hide essential features like reporting or API access.
-   **Contact Limits:** Some charge based on the number of contacts in your database.
-   **Add-ons:** "Enterprise" features often come with enterprise price tags.

Look for a "startup program." Hubspot, Zendesk, and Freshworks all offer significant discounts (up to 90% off) for eligible startups.

## Top CRM Contenders for Startups

### 1. HubSpot CRM

**Best for:** Most startups, inbound marketing focus.

HubSpot is arguably the best entry point. Their free tier is genuinely useful and includes unlimited users and 1 million contacts. As you grow, their Marketing, Sales, and Service hubs provide a seamless upgrade path.

**Pros:**
-   Excellent Free Operations Hub.
-   Best-in-class marketing integration.
-   Intuitive UI.

**Cons:**
-   Price jumps significantly when moving from Free/Starter to Professional tiers.

### 2. Salesforce Essentials

**Best for:** Startups planning for massive scale or needing complex customization.

Salesforce is the industry giant. Essentials is their SMB offering. It gives you the power of the Salesforce platform without the enterprise complexity (mostly).

**Pros:**
-   Infinite customizability.
-   Standard for enterprise sales hiring.
-   Massive ecosystem.

**Cons:**
-   UI can feel dated.
-   Steep learning curve.
-   Can feel like "overkill" for small teams.

### 3. Pipedrive

**Best for:** Sales-focused teams who want a visual pipeline.

Pipedrive is built by salespeople, for salespeople. It is fanatically focused on the "activity-based selling" methodology. If you just want to close deals and don't care much about marketing automation, this is a top choice.

**Pros:**
-   Extremely visual and easy to use.
-   Great mobile app.
-   Cost-effective.

**Cons:**
-   Limited marketing features.
-   Reporting is good but not enterprise-grade.

### 4. Close

**Best for:** High-volume outbound sales teams.

Close (formerly Close.io) is a powerhouse for teams that live on the phone. It has built-in calling, SMS, and email sequencing.

**Pros:**
-   Integrated calling and dialer.
-   Fastest workflow for outbound reps.

**Cons:**
-   Higher starting price.

## The Decision Matrix

To make your final decision, create a simple matrix:

1.  List your **Must-Have** features (e.g., Gmail integration, visual pipeline).
2.  List your **Nice-to-Have** features (e.g., mobile app, lead scoring).
3.  Assign a weight to each.
4.  Score your top 3 candidates.

## Implementation: The First 30 Days

Once you pick a CRM, the work isn't done. Implementation is where most fail.
-   **Clean your data:** Don't import dirty data from your spreadsheets.
-   **Define your stages:** Map your sales process clearly (Prospect -> Qualified -> Demo -> Proposal -> Closed).
-   **Train the team:** Run a workshop. make it mandatory.
-   **Enforce usage:** "If it's not in the CRM, it didn't happen."

## Conclusion

There is no single "best" CRM. The best CRM is the one your team actually uses. Start small, prioritize usability, and keep your data clean. For 80% of startups I advise, starting with **HubSpot** is the safest bet due to its scalability and free entry point. Good luck!
        `,
        coverImage: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
        tags: ["CRM", "Tools", "Guide", "Startups", "Sales"],
        published: true,
        publishedAt: new Date('2024-02-20'),
    },
    {
        title: "The Future of Remote Work Tools: Trends for 2025 and Beyond",
        slug: "future-remote-work",
        excerpt: "Predictions for how collaboration software, AI, and VR will evolve to shape the future of distributed teams.",
        content: `
# The Future of Remote Work Tools: Trends for 2025 and Beyond

Remote work is no longer a temporary experiment; it is a permanent fixture of the global economy. As we move past the initial "Zoom fatigue" era, a new generation of tools is emerging to solve the deeper challenges of distributed work: isolation, serendipity, and asynchronous collaboration.

In this article, we explore the cutting-edge trends and technologies that will define the remote work stack of 2025.

## 1. The Rise of Asynchronous-First Communication

The first wave of remote work simply replicated the office online. We replaced meeting rooms with Zoom and "shoulder taps" with Slack DMs. The result? Constant interruption and burnout.

The future is **Asynchronous-First**. Tools like **Twist**, **Threads**, and **Loom** are leading the charge.

-   **Video Messaging:** Instead of a 30-minute meeting to explain a bug, developers are sending 3-minute Loom videos. This respects the recipient's time and allows for re-watching.
-   **Structured Threads:** Chat tools are moving away from the "conveyor belt" of real-time messages towards structured, threaded conversations that don't demand immediate attention.
-   **Documentation as Culture:** "If it isn't written down, it doesn't exist." Tools like **Notion** and **Coda** are becoming the operating systems of companies, serving as the central brain where decisions are recorded, not just discussed.

## 2. Artificial Intelligence as the Ultimate Assistant

AI is not just a buzzword; it is becoming the glue that holds remote teams together.

-   **Meeting Transcription & Summary:** Tools like **Otter.ai** and **Fireflies** already join meetings to take notes. In 2025, they will proactively identify action items, assign tasks in your project management tool, and flag risks.
-   **Knowledge Retrieval:** "Who knows about the Q3 marketing plan?" AI bots in Slack will instantly surface the relevant Notion doc or point you to the person who wrote it, solving the "knowledge silos" problem.
-   **Writing Assistance:** Generative AI (like the one writing this!) helps remote workers communicate more clearly and empathetically, bridging cultural and language gaps in global teams.

## 3. The "Metaverse" for Work (Virtual Offices)

While "The Metaverse" has been overhyped, the concept of **spatial presence** is valuable. 2D grids of faces on Zoom are exhausting.

Tools like **Gather**, **Teamflow**, and **Kumospace** bring back the physical layout of an office in a 2D or 3D digital space. You have an avatar. You can walk up to a colleague's desk. As you get closer, their video and audio fade in.

**Why this matters:** It restores **serendipity**. The unplanned "watercooler moments" that spark innovation are lost in a Scheduled-Zoom-Call world. Virtual offices lower the friction of talking to a teammate, making it feel more like sitting next to them.

## 4. Deep Work & Focus Management

The biggest enemy of remote work is distraction. The next generation of tools will aggressively defend your attention.

-   **Smart Calendars:** Tools like **Clockwise** and **Reclaim.ai** automatically block out "Focus Time" on your calendar, defending it against meeting creep.
-   **OS-Level Blocking:** Operating systems and browsers will integrate deeper "Focus Modes" that mute not just notifications, but entire apps during deep work sessions.

## 5. Security & Compliance (The Boring but Necessary Part)

As remote teams go global, compliance becomes a nightmare. How do you ship a laptop to Brazil? How do you pay a contractor in Nigeria? How do you ensure data security on a personal WiFi network?

-   **Deel** and **Remote.com** have solved the payroll/HR compliance issue, becoming unicorns in record time.
-   **Zero Trust Security:** The concept of "VPN into the corporate network" is dying. It is being replaced by Zero Trust architectures where every device and user is verified continuously, regardless of location.

## Conclusion

The tool belt of the 2025 remote worker will look very different from 2020. It will be less about "simulating the office" and more about **enhancing human capability**.

We are moving towards a world where geography is irrelevant to opportunity. The winners will be the companies that adopt these tools not just to "manage" remote workers, but to unleash them.

*Are you ready for the asynchronous revolution?*
        `,
        coverImage: "https://images.unsplash.com/photo-1586717791821-3f44a5638d48?auto=format&fit=crop&w=800&q=80",
        tags: ["Remote Work", "Trends", "Future", "Technology", "AI"],
        published: true,
        publishedAt: new Date('2024-03-10'),
    }
];

const categoriesData = [
    { name: 'CRM & Sales', slug: 'crm-and-sales', description: 'Manage customer relationships and close more deals.' },
    { name: 'Project Management', slug: 'project-management', description: 'Organize tasks, teams, and projects efficiently.' },
    { name: 'Marketing Automation', slug: 'marketing-automation', description: 'Automate your marketing campaigns and workflows.' },
    { name: 'Email Marketing', slug: 'email-marketing', description: 'Reach your audience with targeted email campaigns.' },
    { name: 'SEO Tools', slug: 'seo-tools', description: 'Optimize your website for search engines.' },
    { name: 'Development', slug: 'dev-tools', description: 'Build and deploy better software faster.' },
    { name: 'AI Tools', slug: 'ai-tools', description: 'Harness the power of AI for your business.' },
];

const toolsData = [
    {
        name: 'HubSpot',
        slug: 'hubspot',
        logoUrl: 'https://logo.clearbit.com/hubspot.com',
        websiteUrl: 'https://www.hubspot.com',
        shortDescription: 'A leading CRM platform that provides software and support to help businesses grow better.',
        longReview: 'HubSpot is a complete CRM platform with all the tools and integrations you need for marketing, sales, content management, and customer service. Each product in the platform is powerful alone, but the real magic happens when you use them together.',
        pros: ['Free CRM available', 'All-in-one platform', 'Great user interface', 'Extensive marketplace'],
        cons: ['Can get expensive quickly', 'Contract lock-ins', 'Steep learning curve for advanced features'],
        features: ['Lead generation', 'Marketing automation', 'Analytics', 'Help desk'],
        categorySlug: 'crm-and-sales', // Helper for seeding
        pricingModel: 'Freemium',
        startingPrice: 0,
        isFeatured: true,
    },
    {
        name: 'Salesforce',
        slug: 'salesforce',
        logoUrl: 'https://logo.clearbit.com/salesforce.com',
        websiteUrl: 'https://www.salesforce.com',
        shortDescription: 'The world\'s #1 CRM, helping you connect with customers in a whole new way.',
        longReview: 'Salesforce is the world’s #1 customer relationship management (CRM) platform. We help your marketing, sales, commerce, service and IT teams work as one from anywhere.',
        pros: ['Highly customizable', 'Industry standard', 'Huge ecosystem', 'Enterprise grade security'],
        cons: ['Complex implementation', 'Expensive', 'Requires dedicated admin'],
        features: ['Account management', 'Opportunity tracking', 'Lead management', 'Reports & Dashboards'],
        categorySlug: 'crm-and-sales',
        pricingModel: 'Paid',
        startingPrice: 25,
        isFeatured: true,
    },
    {
        name: 'Trello',
        slug: 'trello',
        logoUrl: 'https://logo.clearbit.com/trello.com',
        websiteUrl: 'https://trello.com',
        shortDescription: 'Trello brings all your tasks, teammates, and tools together',
        longReview: 'Keep everything in the same place—even if your team isn’t. Trello is the visual collaboration tool that creates a shared perspective on any project.',
        pros: ['Very easy to use', 'Visual Kanban boards', 'Great free plan', 'Power-ups integration'],
        cons: ['Limited reporting', 'Not great for complex projects', 'Hard to manage large boards'],
        features: ['Kanban boards', 'Checklists', 'Attachments', 'Due dates'],
        categorySlug: 'project-management',
        pricingModel: 'Freemium',
        startingPrice: 0,
        isFeatured: false,
    },
    {
        name: 'Asana',
        slug: 'asana',
        logoUrl: 'https://logo.clearbit.com/asana.com',
        websiteUrl: 'https://asana.com',
        shortDescription: 'Asana helps you manage your projects, your work, and your tasks online.',
        longReview: 'Asana is the easiest way for teams to track their work and get results. From tasks and projects to conversations and notifications, Asana enables teams to move work from start to finish.',
        pros: ['Beautiful UI', 'Multiple views (List, Board, Timeline)', 'Robust task management', 'Good mobile app'],
        cons: ['Can be overwhelming', 'Pricey per user', 'Assigning multiple people to tasks is tricky'],
        features: ['Timeline', 'Portfolios', 'Workload', 'Automation'],
        categorySlug: 'project-management',
        pricingModel: 'Freemium',
        startingPrice: 10.99,
        isFeatured: true,
    },
    {
        name: 'Mailchimp',
        slug: 'mailchimp',
        logoUrl: 'https://logo.clearbit.com/mailchimp.com',
        websiteUrl: 'https://mailchimp.com',
        shortDescription: 'All-in-one marketing platform for small business.',
        longReview: 'Mailchimp is an all-in-one marketing platform that helps you manage and talk to your clients, customers, and other interested parties. Our approach to marketing focuses on healthy contact management practices, beautifully designed campaigns, and powerful data analysis.',
        pros: ['Easy to use builder', 'Great free plan', 'huge integration library'],
        cons: ['Pricing scales sharply', 'Automation can be basic'],
        features: ['Email marketing', 'Landing pages', 'Marketing CRM'],
        categorySlug: 'email-marketing',
        pricingModel: 'Freemium',
        startingPrice: 0,
        isFeatured: true,
    },
    {
        name: 'ActiveCampaign',
        slug: 'activecampaign',
        logoUrl: 'https://logo.clearbit.com/activecampaign.com',
        websiteUrl: 'https://www.activecampaign.com',
        shortDescription: 'Customer Experience Automation Platform.',
        longReview: 'ActiveCampaign gives you the email marketing, marketing automation, and CRM tools you need to create incredible customer experiences.',
        pros: ['Powerful automation', 'Advanced segmentation', 'Machine learning capabilities'],
        cons: ['Steep learning curve', 'Can be slow', 'Complex pricing'],
        features: ['Email automation', 'CRM', 'Messaging', 'Machine Learning'],
        categorySlug: 'email-marketing',
        pricingModel: 'Paid',
        startingPrice: 29,
        isFeatured: false,
    },
    {
        name: 'SEMrush',
        slug: 'semrush',
        logoUrl: 'https://logo.clearbit.com/semrush.com',
        websiteUrl: 'https://www.semrush.com',
        shortDescription: 'Online Visibility Management Platform.',
        longReview: 'Semrush is a leading online visibility management software-as-a-service platform. With over 55 products, tools and add-ons across online visibility management, including tools for search, content, social media and market research.',
        pros: ['Huge database', 'Comprehensive toolset', 'Great competitor analysis'],
        cons: ['Expensive', 'UI can be cluttered', 'Data sometimes varies from GSC'],
        features: ['Keyword research', 'Site audit', 'Backlink analysis'],
        categorySlug: 'seo-tools',
        pricingModel: 'Paid',
        startingPrice: 129.95,
        isFeatured: true,
    },
    {
        name: 'Ahrefs',
        slug: 'ahrefs',
        logoUrl: 'https://logo.clearbit.com/ahrefs.com',
        websiteUrl: 'https://ahrefs.com',
        shortDescription: 'SEO tools & resources to grow your search traffic.',
        longReview: 'Ahrefs is an all-in-one SEO toolset that can help you with: Competitor research, Link Building, Keyword Research, Website Audits, Content Research, Rank Tracking and Mentions Monitoring.',
        pros: ['Best backlink crawler', 'Great keyword data', 'Clean UI'],
        cons: ['No free trial', 'Credit based system', 'Expensive'],
        features: ['Site Explorer', 'Keywords Explorer', 'Site Audit'],
        categorySlug: 'seo-tools',
        pricingModel: 'Paid',
        startingPrice: 99,
        isFeatured: true,
    },
    {
        name: 'Zapier',
        slug: 'zapier',
        logoUrl: 'https://logo.clearbit.com/zapier.com',
        websiteUrl: 'https://zapier.com',
        shortDescription: 'The easiest way to automate your work.',
        longReview: 'Zapier moves information between your web apps automatically, so you can focus on your most important work.',
        pros: ['Connects almost anything', 'Easy to set up', 'Reliable'],
        cons: ['Expensive for high volume', 'Some limitations on triggers'],
        features: ['Workflow automation', 'Multi-step zaps', 'Code steps'],
        categorySlug: 'marketing-automation',
        pricingModel: 'Freemium',
        startingPrice: 0,
        isFeatured: true,
    },
    {
        name: 'Notion',
        slug: 'notion',
        logoUrl: 'https://logo.clearbit.com/notion.so',
        websiteUrl: 'https://www.notion.so',
        shortDescription: 'The all-in-one workspace for your notes, tasks, wikis, and databases.',
        longReview: 'Notion is a single space where you can think, write, and plan. Capture thoughts, manage projects, or even run an entire company — and do it exactly the way you want.',
        pros: ['Extremely versatile', 'Excellent collaboration features', 'Clean, minimal interface', 'Unmatched template library'],
        cons: ['Steep learning curve for databases', 'Mobile app can be sluggish', 'Offline mode is limited'],
        features: ['Notes & Docs', 'Wikis', 'Project Management', 'Databases'],
        categorySlug: 'project-management',
        pricingModel: 'Freemium',
        startingPrice: 0,
        isFeatured: true,
    },
    {
        name: 'ClickUp',
        slug: 'clickup',
        logoUrl: 'https://logo.clearbit.com/clickup.com',
        websiteUrl: 'https://clickup.com',
        shortDescription: 'One app to replace them all. All your work in one place: Tasks, Docs, Chat, Goals, & more.',
        longReview: 'ClickUp is a productivity platform that provides a radically new way to work. More than just task management - ClickUp offers docs, reminders, goals, calendars, and even an inbox.',
        pros: ['Incredible feature density', 'Highly customizable views', 'Great value for money', 'Frequent updates'],
        cons: ['UI can feel cluttered', 'Occasional performance lag', 'Steep learning curve due to many features'],
        features: ['Task Management', 'Docs & Whiteboards', 'Goals & Milestones', 'Time Tracking'],
        categorySlug: 'project-management',
        pricingModel: 'Freemium',
        startingPrice: 0,
        isFeatured: true,
    },
    {
        name: 'GitHub',
        slug: 'github',
        logoUrl: 'https://logo.clearbit.com/github.com',
        websiteUrl: 'https://github.com',
        shortDescription: 'The world\'s leading software development platform.',
        longReview: 'GitHub is where over 100 million developers shape the future of software, together. From open source to business, contribute to projects, manage repositories, and more.',
        pros: ['Industry standard', 'Excellent CI/CD (Actions)', 'Massive community'],
        cons: ['Steep learning curve for Git', 'Can be expensive for large teams'],
        features: ['Git repositories', 'Pull Requests', 'GitHub Actions', 'Project Boards'],
        categorySlug: 'dev-tools',
        pricingModel: 'Freemium',
        startingPrice: 0,
        isFeatured: true,
    },
    {
        name: 'ChatGPT',
        slug: 'chatgpt',
        logoUrl: 'https://logo.clearbit.com/openai.com',
        websiteUrl: 'https://chat.openai.com',
        shortDescription: 'Advanced AI language model for productivity and creativity.',
        longReview: 'ChatGPT, developed by OpenAI, is a powerful AI that can assist with writing, coding, analysis, and much more. It\'s becoming an essential tool for knowledge workers everywhere.',
        pros: ['Highly versatile', 'Saves hours of work', 'Constantly improving'],
        cons: ['Potential for hallucinations', 'Subscription needed for best models'],
        features: ['Text Generation', 'Code Assistance', 'Data Analysis', 'Custom GPTs'],
        categorySlug: 'ai-tools',
        pricingModel: 'Freemium',
        startingPrice: 0,
        isFeatured: true,
    }
];

const plansData = [
    {
        toolSlug: 'hubspot',
        name: 'Free Tools',
        price: 0,
        interval: 'month',
        features: ['Contact management', 'Website activity tracking', 'Companies', 'Deals'],
        isPopular: false,
    },
    {
        toolSlug: 'hubspot',
        name: 'Starter',
        price: 18,
        interval: 'month',
        features: ['Simple automation', 'Email marketing', 'Landing pages', 'Live chat'],
        isPopular: true,
    },
    {
        toolSlug: 'asana',
        name: 'Basic',
        price: 0,
        interval: 'month',
        features: ['Unlimited tasks', 'Unlimited projects', 'Unlimited messages', 'Unlimited activity log'],
        isPopular: false,
    },
    {
        toolSlug: 'asana',
        name: 'Premium',
        price: 10.99,
        interval: 'month',
        features: ['Timeline', 'Workflow Builder', 'Unlimited Dashboards', 'Advanced search'],
        isPopular: true,
    }
];

async function seed() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('Connected.');

        // Clear existing data
        console.log('Clearing existing data...');
        await Promise.all([
            User.deleteMany({}),
            Category.deleteMany({}),
            SaaSTool.deleteMany({}),
            PricingPlan.deleteMany({}),
            BlogPost.deleteMany({}),
            Comparison.deleteMany({}),
        ]);
        console.log('Data cleared.');

        // Seed Users
        console.log('Seeding Users...');
        const createdUsers = await User.insertMany(users);
        console.log(`Seeded ${users.length} users.`);
        const adminUser = createdUsers.find(u => u.role === 'admin') || createdUsers[0];

        // Seed Blog Posts
        console.log('Seeding Blog Posts...');
        const postsWithAuthor = blogPostsData.map(post => ({
            ...post,
            author: adminUser._id
        }));
        await BlogPost.insertMany(postsWithAuthor);
        console.log(`Seeded ${blogPostsData.length} blog posts.`);

        // Seed Categories
        console.log('Seeding Categories...');
        const createdCategories = await Category.insertMany(categoriesData);
        console.log(`Seeded ${categoriesData.length} categories.`);

        // Map category slugs to IDs
        const categoryMap = {};
        createdCategories.forEach(cat => {
            categoryMap[cat.slug] = cat._id;
        });

        // Seed Tools
        console.log('Seeding Tools...');
        const toolsWithIds = toolsData.map(tool => {
            const { categorySlug, ...rest } = tool;
            return {
                ...rest,
                category: categoryMap[categorySlug] // Link to category
            };
        });
        const createdTools = await SaaSTool.insertMany(toolsWithIds);
        console.log(`Seeded ${toolsData.length} tools.`);

        // Map tool slugs to IDs
        const toolMap = {};
        createdTools.forEach(tool => {
            toolMap[tool.slug] = tool._id;
        });

        // Seed Pricing Plans
        console.log('Seeding Pricing Plans...');
        const plansWithIds = plansData.map(plan => {
            const { toolSlug, ...rest } = plan;
            if (!toolMap[toolSlug]) return null; // Skip if tool not found (shouldn't happen)
            return {
                ...rest,
                tool: toolMap[toolSlug]
            };
        }).filter(p => p !== null);

        await PricingPlan.insertMany(plansWithIds);
        console.log(`Seeded ${plansWithIds.length} pricing plans.`);

        // Seed Comparisons
        console.log('Seeding Comparisons...');
        const comparisonsData = [
            {
                ids: [toolMap['hubspot'], toolMap['salesforce']],
                slug: 'salesforce-vs-hubspot',
                title: 'Salesforce vs HubSpot: Which CRM is Best for You?',
                verdict: 'HubSpot wins for ease of use, Salesforce wins for enterprise complexity.',
                content: '# Salesforce vs HubSpot\n\nComparing the two giants...',
            },
            {
                ids: [toolMap['notion'], toolMap['clickup']],
                slug: 'notion-vs-clickup',
                title: 'Notion vs ClickUp: The Ultimate Productivity Showdown',
                verdict: 'Notion is better for documents, ClickUp for project management.',
                content: '# Notion vs ClickUp\n\nBoth are great...',
            },
            {
                ids: [toolMap['stripe'], toolMap['adyen']],
                slug: 'stripe-vs-adyen',
                title: 'Stripe vs Adyen: Payment Gateways Compared',
                verdict: 'Stripe for developers, Adyen for massive global scale.',
                content: '# Stripe vs Adyen\n\nPayments handled...',
            }
        ];
        await Comparison.insertMany(comparisonsData);
        console.log(`Seeded ${comparisonsData.length} comparisons.`);

        console.log('Seeding complete!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
}

seed();
