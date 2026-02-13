"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { Edit, Plus, Trash2, Eye } from "lucide-react";

interface Post {
    _id: string;
    title: string;
    slug: string;
    published: boolean;
    publishedAt: string;
    author: {
        name: string;
    };
    createdAt: string;
}

export default function AdminBlogList() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await fetch("/api/admin/blog");
            if (res.ok) {
                const data = await res.json();
                setPosts(data);
            }
        } catch (error) {
            console.error("Failed to fetch posts", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this post?")) return;

        try {
            const res = await fetch(`/api/admin/blog/${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                setPosts(posts.filter((p) => p._id !== id));
            } else {
                alert("Failed to delete post");
            }
        } catch (error) {
            console.error("Failed to delete post", error);
            alert("Error deleting post");
        }
    };

    if (loading) return <div className="p-8 text-center">Loading posts...</div>;

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold">Blog Posts</h1>
                <Link
                    href="/admin/blog/new"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition"
                >
                    <Plus className="w-4 h-4" /> New Post
                </Link>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 dark:bg-slate-700/50 text-slate-500 uppercase text-xs font-bold">
                        <tr>
                            <th className="px-6 py-4">Title</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Author</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                        {posts.map((post) => (
                            <tr key={post._id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition">
                                <td className="px-6 py-4 font-medium max-w-md truncate">
                                    {post.title}
                                    <div className="text-xs text-slate-400 font-normal">{post.slug}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-bold ${post.published
                                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                                : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                                            }`}
                                    >
                                        {post.published ? "Published" : "Draft"}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-500">
                                    {post.author?.name || "Unknown"}
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-500">
                                    {post.publishedAt ? format(new Date(post.publishedAt), "MMM d, yyyy") : "-"}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link
                                            href={`/blog/${post.slug}`}
                                            target="_blank"
                                            className="p-2 text-slate-400 hover:text-indigo-600 transition"
                                            title="View Live"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </Link>
                                        <Link
                                            href={`/admin/blog/${post._id}`}
                                            className="p-2 text-slate-400 hover:text-indigo-600 transition"
                                            title="Edit"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(post._id)}
                                            className="p-2 text-slate-400 hover:text-red-600 transition"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {posts.length === 0 && (
                    <div className="p-8 text-center text-slate-500">No blog posts found. Create one!</div>
                )}
            </div>
        </div>
    );
}
