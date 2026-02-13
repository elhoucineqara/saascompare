"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit, Trash, ExternalLink, Loader2 } from "lucide-react";

interface SaaSTool {
    _id: string;
    name: string;
    category: { name: string };
    pricingModel: string;
    websiteUrl: string;
    isFeatured: boolean;
}

export default function AdminToolsPage() {
    const [tools, setTools] = useState<SaaSTool[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTools();
    }, []);

    const fetchTools = async () => {
        try {
            const res = await fetch("/api/admin/tools");
            if (res.ok) {
                const data = await res.json();
                setTools(data);
            }
        } catch (error) {
            console.error("Failed to fetch tools", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this tool?")) return;

        try {
            const res = await fetch(`/api/admin/tools/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setTools(tools.filter((t: SaaSTool) => t._id !== id));
            } else {
                alert("Failed to delete tool");
            }
        } catch (error) {
            console.error("Error deleting tool", error);
        }
    };

    if (loading) {
        return <div className="flex h-96 items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        </div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">SaaS Tools</h1>
                <Link
                    href="/admin/tools/new"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition"
                >
                    <Plus className="w-4 h-4" />
                    Add Tool
                </Link>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 dark:bg-slate-700 text-xs uppercase text-slate-500 font-medium">
                        <tr>
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">Category</th>
                            <th className="px-6 py-4">Pricing</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                        {tools.map((tool: SaaSTool) => (
                            <tr key={tool._id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                                <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                                    {tool.name}
                                </td>
                                <td className="px-6 py-4 text-slate-500">
                                    {tool.category?.name || "Uncategorized"}
                                </td>
                                <td className="px-6 py-4 text-slate-500">
                                    <span className={`px-2 py-1 rounded-full text-xs ${tool.pricingModel === 'Free' ? 'bg-green-100 text-green-700' :
                                        tool.pricingModel === 'Paid' ? 'bg-indigo-100 text-indigo-700' :
                                            'bg-slate-100 text-slate-700'
                                        }`}>
                                        {tool.pricingModel}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    {tool.isFeatured && (
                                        <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-medium">Featured</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-right flex justify-end gap-2">
                                    <Link href={`/admin/tools/${tool._id}`} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition">
                                        <Edit className="w-4 h-4" />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(tool._id)}
                                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                                    >
                                        <Trash className="w-4 h-4" />
                                    </button>
                                    <a href={tool.websiteUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-slate-400 hover:text-slate-600 transition">
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                </td>
                            </tr>
                        ))}
                        {tools.length === 0 && (
                            <tr>
                                <td colSpan={5} className="text-center py-12 text-muted-foreground">
                                    No tools found. Click "Add Tool" to create one.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
