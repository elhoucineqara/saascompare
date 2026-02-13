import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import SaaSTool from "@/models/SaaSTool";

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    const session = await getServerSession(authOptions);
    // Allow public read access to single tool? No, this is admin API.
    // Public access will use a different public API or server component.
    if (!session || session.user.role !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        await dbConnect();
        const tool = await SaaSTool.findById(params.id);
        if (!tool) {
            return NextResponse.json({ error: "Tool not found" }, { status: 404 });
        }
        return NextResponse.json(tool);
    } catch {
        return NextResponse.json({ error: "Failed to fetch tool" }, { status: 500 });
    }
}

export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        await dbConnect();
        const tool = await SaaSTool.findByIdAndUpdate(params.id, body, {
            new: true,
            runValidators: true,
        });
        if (!tool) {
            return NextResponse.json({ error: "Tool not found" }, { status: 404 });
        }
        return NextResponse.json(tool);
    } catch (error: unknown) {
        return NextResponse.json({ error: (error as Error).message || "Failed to update tool" }, { status: 400 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        await dbConnect();
        const tool = await SaaSTool.findByIdAndDelete(params.id);
        if (!tool) {
            return NextResponse.json({ error: "Tool not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Tool deleted successfully" });
    } catch {
        return NextResponse.json({ error: "Failed to delete tool" }, { status: 500 });
    }
}
