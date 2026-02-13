import { MetadataRoute } from 'next';
import dbConnect from "@/lib/mongodb";
import SaaSTool from "@/models/SaaSTool";
import Category from "@/models/Category";
import BlogPost from "@/models/BlogPost";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXTAUTH_URL || "https://saascomparepro.com";

    await dbConnect();

    // Fetch all dynamic data
    const tools = await SaaSTool.find({}).select('slug updatedAt');
    const categories = await Category.find({}).select('slug updatedAt');
    const posts = await BlogPost.find({ published: true }).select('slug updatedAt');

    const toolUrls = tools.map((tool: any) => ({
        url: `${baseUrl}/product/${tool.slug}`,
        lastModified: tool.updatedAt,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    const categoryUrls = categories.map((cat: any) => ({
        url: `${baseUrl}/category/${cat.slug}`,
        lastModified: cat.updatedAt,
        changeFrequency: 'daily' as const,
        priority: 0.9,
    }));

    const postUrls = posts.map((post: any) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.updatedAt,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.5,
        },
        ...categoryUrls,
        ...toolUrls,
        ...postUrls,
    ];
}
