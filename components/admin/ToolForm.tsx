"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Plus, X } from "lucide-react";

interface Category {
    _id: string;
    name: string;
}

interface ToolData {
    _id?: string;
    name: string;
    slug: string;
    websiteUrl: string;
    logoUrl: string;
    shortDescription: string;
    longReview: string;
    affiliateLink: string;
    category: string;
    pricingModel: string;
    startingPrice: number;
    isFeatured: boolean;
    seoTitle: string;
    seoDescription: string;
    features: string[];
}

interface ToolFormProps {
    initialData?: Partial<ToolData> | null;
    isEditing?: boolean;
}

export default function ToolForm({ initialData, isEditing = false }: ToolFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [features, setFeatures] = useState<string[]>(initialData?.features || []);
    const [featureInput, setFeatureInput] = useState("");

    const [formData, setFormData] = useState({
        name: initialData?.name || "",
        slug: initialData?.slug || "",
        websiteUrl: initialData?.websiteUrl || "",
        logoUrl: initialData?.logoUrl || "",
        shortDescription: initialData?.shortDescription || "",
        longReview: initialData?.longReview || "",
        affiliateLink: initialData?.affiliateLink || "",
        category: initialData?.category || "",
        pricingModel: initialData?.pricingModel || "Freemium",
        startingPrice: initialData?.startingPrice || 0,
        isFeatured: initialData?.isFeatured || false,
        seoTitle: initialData?.seoTitle || "",
        seoDescription: initialData?.seoDescription || "",
    });

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const res = await fetch("/api/categories"); // We need to create this Next!
        if (res.ok) {
            const data = await res.json();
            setCategories(data);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const value = e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });

        // Auto-generate slug from name if creating
        if (!isEditing && e.target.name === "name") {
            setFormData(prev => ({ ...prev, name: value as string, slug: (value as string).toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') }));
        }
    };

    const handleAddFeature = () => {
        if (featureInput.trim()) {
            setFeatures([...features, featureInput.trim()]);
            setFeatureInput("");
        }
    };

    const removeFeature = (index: number) => {
        setFeatures(features.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const payload = { ...formData, features };

        try {
            const url = isEditing ? `/api/admin/tools/${initialData._id}` : "/api/admin/tools";
            const method = isEditing ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.error || "Something went wrong");
            }

            router.push("/admin/tools");
            router.refresh();
        } catch (error) {
            alert("Error saving tool. Please check fields.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl bg-white dark:bg-slate-800 p-8 rounded-xl shadow-sm border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Tool Name</label>
                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. HubSpot"
                        className="w-full p-2 border rounded-md"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Slug</label>
                    <input
                        name="slug"
                        value={formData.slug}
                        onChange={handleChange}
                        placeholder="e.g. hubspot"
                        className="w-full p-2 border rounded-md"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                        required
                    >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                        ))}
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Pricing Model</label>
                    <select
                        name="pricingModel"
                        value={formData.pricingModel}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                    >
                        <option value="Free">Free</option>
                        <option value="Freemium">Freemium</option>
                        <option value="Paid">Paid</option>
                        <option value="Contact Sales">Contact Sales</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Starting Price ($)</label>
                    <input
                        type="number"
                        name="startingPrice"
                        value={formData.startingPrice}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Website URL</label>
                    <input
                        type="url"
                        name="websiteUrl"
                        value={formData.websiteUrl}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Logo URL</label>
                    <input
                        type="url"
                        name="logoUrl"
                        value={formData.logoUrl}
                        onChange={handleChange}
                        placeholder="https://..."
                        className="w-full p-2 border rounded-md"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Affiliate Link</label>
                    <input
                        type="url"
                        name="affiliateLink"
                        value={formData.affiliateLink}
                        onChange={handleChange}
                        placeholder="https://..."
                        className="w-full p-2 border rounded-md"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Short Description (SEO)</label>
                <textarea
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleChange}
                    rows={3}
                    className="w-full p-2 border rounded-md"
                    maxLength={200}
                    required
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Long Review (Markdown)</label>
                <textarea
                    name="longReview"
                    value={formData.longReview}
                    onChange={handleChange}
                    rows={10}
                    className="w-full p-2 border rounded-md font-mono text-sm"
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Features</label>
                <div className="flex gap-2">
                    <input
                        value={featureInput}
                        onChange={(e) => setFeatureInput(e.target.value)}
                        className="flex-1 p-2 border rounded-md"
                        placeholder="Add a feature"
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
                    />
                    <button type="button" onClick={handleAddFeature} className="p-2 bg-indigo-100 text-indigo-600 rounded-md">
                        <Plus className="w-5 h-5" />
                    </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                    {features.map((feat, i) => (
                        <span key={i} className="bg-slate-100 text-slate-800 px-2 py-1 rounded-full text-sm flex items-center gap-1">
                            {feat}
                            <button type="button" onClick={() => removeFeature(i)}><X className="w-3 h-3 hover:text-red-500" /></button>
                        </span>
                    ))}
                </div>
            </div>

            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    name="isFeatured"
                    id="isFeatured"
                    checked={formData.isFeatured}
                    // @ts-expect-error - checked property is present on checkbox input
                    onChange={handleChange}
                    className="w-4 h-4"
                />
                <label htmlFor="isFeatured" className="text-sm font-medium">Mark as Featured Tool</label>
            </div>

            <div className="pt-4 flex justify-end">
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-2"
                >
                    {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                    {isEditing ? "Update Tool" : "Create Tool"}
                </button>
            </div>
        </form>
    );
}
