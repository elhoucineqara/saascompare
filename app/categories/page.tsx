import dbConnect from "@/lib/mongodb";
import Category from "@/models/Category";
import Link from "next/link";
import { Folder, ArrowRight } from "lucide-react";

export const metadata = {
    title: "All Categories - SaaS Compare Pro",
    description: "Browse all software categories."
};

export default async function CategoriesIndexPage() {
    let categories = [];
    let error = null;

    try {
        await dbConnect();
        categories = await Category.find({}).sort({ name: 1 });
    } catch (e) {
        console.error("Failed to fetch categories:", e);
        error = "Could not load categories at this time.";
    }

    return (
        <div className="flex flex-col min-h-screen">

            <section className="relative py-24 md:py-36 bg-background overflow-hidden border-b">
                <div className="absolute inset-0 -z-10 bg-grid-pattern opacity-40"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10">
                    <div className="absolute top-[20%] right-[10%] w-72 h-72 bg-primary/20 rounded-full blur-[120px] animate-pulse-glow"></div>
                    <div className="absolute bottom-[20%] left-[10%] w-72 h-72 bg-indigo-500/20 rounded-full blur-[120px] animate-pulse-glow"></div>
                </div>

                <div className="container px-4 text-center space-y-6">
                    <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary animate-fade-in-up">
                        <span className="flex h-1.5 w-1.5 rounded-full bg-primary mr-2 animate-ping"></span>
                        Software Directory
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                        Browse <span className="text-gradient">Categories</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up font-medium" style={{ animationDelay: "0.2s" }}>
                        Explore our comprehensive directory of the best SaaS tools, organized by category to help you scale faster.
                    </p>
                </div>
            </section>

            <section className="container px-4 py-20 flex-1">
                {error ? (
                    <div className="text-center py-20 bg-destructive/10 text-destructive rounded-[2rem] border border-destructive/20 animate-fade-in">
                        <p className="font-bold text-lg">{error}</p>
                        <p className="text-sm mt-2 opacity-80">Please try again later.</p>
                    </div>
                ) : categories.length === 0 ? (
                    <div className="text-center py-24 border-2 border-dashed rounded-[2rem] bg-muted/20 animate-fade-in">
                        <Folder className="w-16 h-16 text-muted-foreground/40 mx-auto mb-6" />
                        <p className="text-2xl font-black text-muted-foreground">No categories found.</p>
                        <p className="text-muted-foreground mt-2 font-medium">Check back soon as we populate our directory.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {categories.map((cat, i) => (
                            <Link
                                href={`/category/${cat.slug}`}
                                key={cat._id.toString()}
                                className="group relative flex flex-col justify-between p-8 bg-card rounded-[2rem] border border-border/50 shadow-sm hover:shadow-2xl hover:border-primary/30 transition-all duration-500 animate-fade-in-up"
                                style={{ animationDelay: `${i * 0.05}s` }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem]"></div>
                                <div className="relative z-10">
                                    <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-inner">
                                        <Folder className="w-7 h-7" />
                                    </div>
                                    <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{cat.name}</h2>
                                    <p className="text-muted-foreground text-sm font-medium leading-relaxed line-clamp-2 mb-6 opacity-80 group-hover:opacity-100 transition-opacity">
                                        {cat.description || "Explore top-rated tools in this category for your business needs."}
                                    </p>
                                </div>
                                <div className="relative z-10 flex items-center text-sm font-bold text-primary opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
                                    Browse Category <ArrowRight className="ml-2 w-4 h-4" />
                                </div>
                                <div className="absolute bottom-6 right-8 text-5xl font-black text-foreground/[0.02] pointer-events-none group-hover:text-primary/[0.04] transition-colors">
                                    {i + 1 < 10 ? `0${i + 1}` : i + 1}
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}
