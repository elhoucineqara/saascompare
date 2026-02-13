import dbConnect from "@/lib/mongodb";
import SaaSTool from "@/models/SaaSTool";
import ToolForm from "@/components/admin/ToolForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// Server Component for fetching data
export default async function EditToolPage({ params }: { params: { id: string } }) {
    await dbConnect();
    const tool = await SaaSTool.findById(params.id).lean();

    if (!tool) {
        return <div>Tool not found</div>;
    }

    // Convert _id to string for serialization
    const serializedTool = {
        ...tool,
        _id: tool._id.toString(),
        category: tool.category?.toString(),
        createdAt: tool.createdAt?.toISOString(),
        updatedAt: tool.updatedAt?.toISOString(),
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link
                    href="/admin/tools"
                    className="p-2 rounded-full hover:bg-slate-100 transition"
                >
                    <ArrowLeft className="w-5 h-5 text-slate-500" />
                </Link>
                <h1 className="text-2xl font-bold">Edit Tool: {serializedTool.name}</h1>
            </div>
            <ToolForm initialData={serializedTool} isEditing={true} />
        </div>
    );
}
