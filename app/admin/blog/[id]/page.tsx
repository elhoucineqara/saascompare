"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Save, Loader2 } from "lucide-react";

interface PostFormProps {
    params: { id: string };
}

export default function AdminBlogEdit({ params }: PostFormProps) {
    const router = useRouter();
    const isNew = params.id === "new";
    const [loading, setLoading] = useState(!isNew);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        content: "",
        excerpt: "",
        coverImage: "",
        tags: "",
        published: false,
        seoTitle: "",
        seoDescription: "",
    });

    useEffect(() => {
        if (!isNew) {
            fetchPost();
        }
    }, [params.id]);

    const fetchPost = async () => {
        try {
            const res = await fetch(`/api/admin/blog/${params.id}`);
            if (res.ok) {
                const data = await res.json();
                setFormData({
                    ...data,
                    tags: data.tags?.join(", ") || "",
                });
            } else {
                alert("Failed to load post");
                router.push("/admin/blog");
            }
        } catch (error) {
            console.error("Error fetching post:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        const payload = {
            ...formData,
            tags: formData.tags.split(",").map((t: string) => t.trim()).filter(Boolean),
        };

        try {
            const url = isNew ? "/api/admin/blog" : `/api/admin/blog/${params.id}`;
            const method = isNew ? "POST" : "PUT";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                router.push("/admin/blog");
                router.refresh();
            } else {
                const err = await res.json();
                alert(err.error || "Failed to save post");
            }
        } catch (error) {
            console.error("Error saving post:", error);
            alert("An error occurred");
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
        }));
    };

    if (loading) return <div className="p-20 text-center">Loading...</div>;

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/blog"
                        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </Link>
                    <h1 className="text-2xl font-bold">{isNew ? "Create New Post" : "Edit Post"}</h1>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        onClick={() => router.push("/admin/blog")}
                        className="px-4 py-2 text-slate-600 hover:text-slate-900 font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={saving}
                        className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-indigo-700 transition disabled:opacity-50 flex items-center gap-2"
                    >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        {saving ? "Saving..." : "Save Post"}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    {/* Main Content */}
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border shadow-sm space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg bg-transparent"
                                placeholder="Enter post title"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Slug (URL)</label>
                            <input
                                type="text"
                                name="slug"
                                value={formData.slug}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg bg-slate-50 dark:bg-slate-900"
                                placeholder="auto-generated-from-title"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Excerpt</label>
                            <textarea
                                name="excerpt"
                                value={formData.excerpt}
                                onChange={handleChange}
                                rows={3}
                                className="w-full p-2 border rounded-lg bg-transparent"
                                placeholder="Short summary for SEO and cards..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Content (Markdown)</label>
                            <textarea
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                rows={20}
                                className="w-full p-4 border rounded-lg bg-slate-50 dark:bg-slate-900 font-mono text-sm"
                                placeholder="# Write your amazing content here..."
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Sidebar Settings */}
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border shadow-sm space-y-4">
                        <h3 className="font-bold text-lg border-b pb-2">Publishing</h3>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="published"
                                name="published"
                                checked={formData.published}
                                onChange={handleChange}
                                className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label htmlFor="published" className="font-medium cursor-pointer">Published</label>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border shadow-sm space-y-4">
                        <h3 className="font-bold text-lg border-b pb-2">Meta Data</h3>
                        <div>
                            <label className="block text-sm font-medium mb-1">Cover Image URL</label>
                            <input
                                type="text"
                                name="coverImage"
                                value={formData.coverImage}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg bg-transparent"
                                placeholder="https://..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
                            <input
                                type="text"
                                name="tags"
                                value={formData.tags}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg bg-transparent"
                                placeholder="SaaS, Growth, Marketing"
                            />
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border shadow-sm space-y-4">
                        <h3 className="font-bold text-lg border-b pb-2">SEO</h3>
                        <div>
                            <label className="block text-sm font-medium mb-1">SEO Title</label>
                            <input
                                type="text"
                                name="seoTitle"
                                value={formData.seoTitle}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg bg-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">SEO Description</label>
                            <textarea
                                name="seoDescription"
                                value={formData.seoDescription}
                                onChange={handleChange}
                                rows={3}
                                className="w-full p-2 border rounded-lg bg-transparent"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
