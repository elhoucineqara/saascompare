import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";
import SaaSTool from "@/models/SaaSTool";
import Category from "@/models/Category"; // Ensure Category model is loaded

export async function GET(req: Request) {
    constsession = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        await dbConnect();
        // Ensure Category is loaded to avoid Schema hasn't been registered for model "Category" error
        // when populating.
        await Category.init();

        const tools = await SaaSTool.find({}).populate("category", "name").sort({ createdAt: -1 });
        return NextResponse.json(tools);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch tools" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        await dbConnect();
        const tool = await SaaSTool.create(body);
        return NextResponse.json(tool, { status: 201 });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.message || "Failed to create tool" }, { status: 400 });
    }
}
