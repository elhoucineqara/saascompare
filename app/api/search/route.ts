import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import SaaSTool from "@/models/SaaSTool";
import Category from "@/models/Category";
import Comparison from "@/models/Comparison";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const query = searchParams.get("q");

        if (!query || query.length < 2) {
            return NextResponse.json({ tools: [], categories: [] });
        }

        await dbConnect();

        // Search Tools
        const tools = await SaaSTool.find({
            $or: [
                { name: { $regex: query, $options: "i" } },
                { shortDescription: { $regex: query, $options: "i" } },
                { slug: { $regex: query, $options: "i" } }
            ]
        }).limit(5).select("name slug logoUrl shortDescription");

        // Search Categories
        const categories = await Category.find({
            $or: [
                { name: { $regex: query, $options: "i" } },
                { slug: { $regex: query, $options: "i" } }
            ]
        }).limit(3).select("name slug");

        // Search Comparisons
        const comparisons = await Comparison.find({
            $or: [
                { title: { $regex: query, $options: "i" } },
                { slug: { $regex: query, $options: "i" } }
            ]
        }).limit(3).select("title slug");

        return NextResponse.json({ tools, categories, comparisons });
    } catch (error) {
        console.error("Search API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
