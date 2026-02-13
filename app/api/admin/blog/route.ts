
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET() {
    try {
        await dbConnect();
        // Check authentication
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const posts = await BlogPost.find({})
            .sort({ createdAt: -1 })
            .populate("author", "name");

        return NextResponse.json(posts);
    } catch {
        return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect();
        // Check authentication
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();

        // Basic validation
        if (!body.title || !body.content) {
            return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
        }

        // Auto-generate slug if not provided
        let slug = body.slug;
        if (!slug) {
            slug = body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        }

        // Check for duplicate slug
        const existing = await BlogPost.findOne({ slug });
        if (existing) {
            return NextResponse.json({ error: "Slug already exists" }, { status: 400 });
        }

        const newPost = await BlogPost.create({
            ...body,
            slug,
            author: session.user.id, // Assuming session has user ID
            publishedAt: body.published ? new Date() : null
        });

        return NextResponse.json(newPost, { status: 201 });
    } catch (error) {
        console.error("Error creating post:", error);
        return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
    }
}
