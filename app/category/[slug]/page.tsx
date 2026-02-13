
import dbConnect from "@/lib/mongodb";
import Category from "@/models/Category";
import SaaSTool from "@/models/SaaSTool";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Star, Layers, Zap } from "lucide-react";

export async function generateMetadata({ params }: { params: { slug: string } }) {
    await dbConnect();
    const category = await Category.findOne({ slug: params.slug });
    return {
        title: category ? `Best ${category.name} Software - SaaS Compare Pro` : "Category Not Found",
        description: category?.description || "Browse top rated software tools.",
    };
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
    await dbConnect();
    const category = await Category.findOne({ slug: params.slug });

    if (!category) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <div className="bg-destructive/10 text-destructive p-4 rounded-full mb-6">
                    <Layers className="w-10 h-10" />
                </div>
                <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>
                <p className="text-muted-foreground mb-8 max-w-md">The software category you&apos;re looking for doesn&apos;t exist or has been moved.</p>
                <Link href="/categories" className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold hover:bg-primary/90 transition-all shadow-md">
                    Browse All Categories
                </Link>
            </div>
        );
    }

    const tools = await SaaSTool.find({ category: category._id }).sort({ isFeatured: -1, averageRating: -1 });

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            {/* Header Section */}
            <section className="relative py-16 md:py-24 border-b overflow-hidden">
                <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
                <div className="container px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <Link href="/categories" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Categories
                        </Link>
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">{category.name}</h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            {category.description || `Browse and compare the top-rated ${category.name} platforms for your business.`}
                        </p>
                    </div>
                </div>
            </section>

            {/* Tools Grid Section */}
            <section className="container px-4 py-20 flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Top {category.name} Solutions</h2>
                        <p className="text-muted-foreground text-sm">Showing {tools.length} products found in this category</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-muted-foreground">Sort by:</span>
                        <select className="bg-background border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary shadow-sm">
                            <option>Highest Rated</option>
                            <option>Most Popular</option>
                            <option>Price: Low to High</option>
                        </select>
                    </div>
                </div>

                {tools.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {tools.map((tool) => (
                            <Link href={`/product/${tool.slug}`} key={tool._id.toString()} className="group flex flex-col bg-card rounded-2xl overflow-hidden border shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
                                <div className="h-48 relative bg-white flex items-center justify-center p-12 border-b group-hover:bg-muted/30 transition-colors">
                                    <Image
                                        src={tool.logoUrl}
                                        alt={tool.name}
                                        width={160}
                                        height={60}
                                        className="object-contain max-h-full transition-transform duration-500 group-hover:scale-105"
                                    />
                                    {tool.isFeatured && (
                                        <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest shadow-sm flex items-center gap-1">
                                            <Zap className="w-3 h-3 fill-current" /> Editor&apos;s Choice
                                        </div>
                                    )}
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{tool.name}</h3>
                                        <div className="flex items-center text-xs font-bold px-2 py-1 bg-green-500/10 text-green-600 rounded">
                                            <Star className="w-3 h-3 fill-current mr-1" /> 4.8
                                        </div>
                                    </div>

                                    <p className="text-muted-foreground text-sm line-clamp-3 mb-6 leading-relaxed">
                                        {tool.shortDescription}
                                    </p>

                                    {/* Features */}
                                    <div className="flex flex-wrap gap-1.5 mb-8">
                                        {tool.features?.slice(0, 3).map((feat: string, i: number) => (
                                            <span key={i} className="px-2 py-0.5 bg-muted rounded text-[10px] font-medium text-muted-foreground border">
                                                {feat}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t mt-auto">
                                        <div className="flex flex-col leading-tight">
                                            <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Starts at</span>
                                            <span className="text-lg font-extrabold">{tool.startingPrice === 0 ? "Free" : `$${tool.startingPrice}/mo`}</span>
                                        </div>
                                        <div className="h-9 px-4 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold transition-transform group-hover:translate-x-1 shadow-sm">
                                            View Details <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-32 rounded-3xl border-2 border-dashed border-muted bg-muted/20">
                        <div className="w-20 h-20 rounded-full bg-background flex items-center justify-center mx-auto mb-6 shadow-sm border">
                            <Star className="w-10 h-10 text-muted-foreground" />
                        </div>
                        <h3 className="text-2xl font-bold mb-3">No tools found</h3>
                        <p className="text-muted-foreground mb-10 max-w-sm mx-auto">We&apos;re still curating the best solutions for this category. Check back soon for our top recommendations.</p>
                        <Link href="/" className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold hover:bg-primary/90 transition-all shadow-md">
                            Back to Home
                        </Link>
                    </div>
                )}
            </section>
        </div>
    );
}
