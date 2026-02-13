"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

interface Category {
    _id: string;
    name: string;
    slug: string;
    description?: string;
}

export default function AdminCategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [newCategory, setNewCategory] = useState({ name: "", slug: "", description: "" });

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data);
        setLoading(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCategory.name || !newCategory.slug) return;

        try {
            const res = await fetch("/api/categories", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newCategory),
            });

            if (res.ok) {
                const created = await res.json();
                setCategories([...categories, created]);
                setNewCategory({ name: "", slug: "", description: "" });
            }
        } catch (error) {
            console.error(error);
        }
    };

    const generateSlug = (name: string) => {
        setNewCategory(prev => ({
            ...prev,
            name,
            slug: name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
        }));
    };

    return (
        <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
                <h1 className="text-2xl font-bold">Categories</h1>

                {loading ? (
                    <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
                ) : (
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border p-4 space-y-4">
                        {categories.map((cat) => (
                            <div key={cat._id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                                <div>
                                    <h3 className="font-semibold">{cat.name}</h3>
                                    <p className="text-xs text-slate-500">/{cat.slug}</p>
                                </div>
                                <span className="text-xs text-slate-400">{cat.description}</span>
                            </div>
                        ))}
                        {categories.length === 0 && <p className="text-slate-500">No categories yet.</p>}
                    </div>
                )}
            </div>

            <div className="space-y-6">
                <h2 className="text-xl font-bold">Add New Category</h2>
                <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Name</label>
                        <input
                            value={newCategory.name}
                            onChange={(e) => generateSlug(e.target.value)}
                            className="w-full p-2 border rounded-md"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Slug</label>
                        <input
                            value={newCategory.slug}
                            onChange={(e) => setNewCategory({ ...newCategory, slug: e.target.value })}
                            className="w-full p-2 border rounded-md"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Description</label>
                        <textarea
                            value={newCategory.description}
                            onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                            className="w-full p-2 border rounded-md"
                            rows={3}
                        />
                    </div>
                    <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700">
                        Create Category
                    </button>
                </form>
            </div>
        </div>
    );
}
