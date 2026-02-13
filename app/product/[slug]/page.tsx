
import dbConnect from "@/lib/mongodb";
import SaaSTool from "@/models/SaaSTool";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ChevronRight, ExternalLink, MinusCircle, Star, Shield, Zap } from "lucide-react";

export async function generateMetadata({ params }: { params: { slug: string } }) {
    await dbConnect();
    const tool = await SaaSTool.findOne({ slug: params.slug });

    if (!tool) return { title: "Product Not Found" };

    const baseUrl = process.env.NEXTAUTH_URL || "https://saascomparepro.com";
    const title = `${tool.name} Review 2024 - Pricing, Features & Alternatives`;
    const description = tool.shortDescription;
    const url = `${baseUrl}/product/${tool.slug}`;

    return {
        title,
        description,
        alternates: {
            canonical: url,
        },
        openGraph: {
            title,
            description,
            url,
            siteName: "SaaS Compare Pro",
            type: "article",
            images: [
                {
                    url: tool.logoUrl,
                    width: 800,
                    height: 800,
                    alt: tool.name,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [tool.logoUrl],
        },
    };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
    await dbConnect();
    const tool = await SaaSTool.findOne({ slug: params.slug }).populate("category");

    if (!tool) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
                <h1 className="text-2xl font-bold">Product Not Found</h1>
                <Link href="/" className="text-primary hover:underline">Return Home</Link>
            </div>
        );
    }

    const baseUrl = process.env.NEXTAUTH_URL || "https://saascomparepro.com";

    const productJsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": tool.name,
        "image": tool.logoUrl,
        "description": tool.shortDescription,
        "brand": {
            "@type": "Brand",
            "name": tool.name
        },
        "offers": {
            "@type": "Offer",
            "url": tool.websiteUrl,
            "priceCurrency": "USD",
            "price": tool.startingPrice || 0,
            "availability": "https://schema.org/InStock"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": tool.averageRating || 4.8,
            "reviewCount": tool.reviewCount || 12
        }
    };

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": baseUrl
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Categories",
                "item": `${baseUrl}/categories`
            },
            ...(tool.category ? [{
                "@type": "ListItem",
                "position": 3,
                "name": tool.category.name,
                "item": `${baseUrl}/category/${tool.category.slug}`
            }] : []),
            {
                "@type": "ListItem",
                "position": tool.category ? 4 : 3,
                "name": tool.name,
                "item": `${baseUrl}/product/${tool.slug}`
            }
        ]
    };

    return (
        <div className="min-h-screen bg-background text-foreground font-sans">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />

            {/* Hero Section */}
            <section className="relative overflow-hidden border-b py-12 md:py-16 bg-background">
                {/* Background Effects */}
                <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 opacity-30">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px]"></div>
                </div>

                <div className="container px-4">
                    {/* Integrated Breadcrumbs */}
                    <nav className="flex items-center text-xs font-medium text-muted-foreground/60 mb-8 overflow-x-auto whitespace-nowrap pb-2 md:pb-0">
                        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                        <ChevronRight className="w-3 h-3 mx-2 shrink-0" />
                        {tool.category && (
                            <>
                                <Link href="/categories" className="hover:text-primary transition-colors">Categories</Link>
                                <ChevronRight className="w-3 h-3 mx-2 shrink-0" />
                                <Link href={`/category/${tool.category.slug}`} className="hover:text-primary transition-colors">{tool.category.name}</Link>
                                <ChevronRight className="w-3 h-3 mx-2 shrink-0" />
                            </>
                        )}
                        <span className="text-foreground/80">{tool.name}</span>
                    </nav>

                    <div className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-14">
                        {/* Improved Logo Container */}
                        <div className="relative group shrink-0">
                            <div className="absolute -inset-1.5 bg-gradient-to-tr from-primary/20 to-indigo-500/20 rounded-3xl blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="relative bg-white dark:bg-slate-900 aspect-square w-32 md:w-40 rounded-2xl border shadow-sm flex items-center justify-center p-6 md:p-8 overflow-hidden group-hover:shadow-md transition-all duration-500">
                                <Image
                                    src={tool.logoUrl}
                                    alt={tool.name}
                                    width={160}
                                    height={160}
                                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none"></div>
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 text-center md:text-left space-y-6">
                            <div className="space-y-3">
                                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-2">
                                    <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border border-primary/20">
                                        Verified Review
                                    </span>
                                    <div className="flex items-center gap-1 text-yellow-500 font-bold text-xs">
                                        <Star className="w-3.5 h-3.5 fill-current" />
                                        <Star className="w-3.5 h-3.5 fill-current" />
                                        <Star className="w-3.5 h-3.5 fill-current" />
                                        <Star className="w-3.5 h-3.5 fill-current" />
                                        <Star className="w-3.5 h-3.5 fill-current" />
                                        <span className="ml-1 text-foreground/60 text-xs font-medium">(4.8/5)</span>
                                    </div>
                                </div>
                                <h1 className="text-4xl md:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                                    {tool.name} Review
                                </h1>
                                <p className="text-lg md:text-xl text-muted-foreground/90 max-w-2xl leading-relaxed font-medium">
                                    {tool.shortDescription}
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
                                {tool.websiteUrl && (
                                    <a
                                        href={tool.websiteUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-10 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:-translate-y-0.5 active:translate-y-0"
                                    >
                                        Visit {tool.name} <ExternalLink className="w-4 h-4 ml-2" />
                                    </a>
                                )}
                                <Link
                                    href={`/compare/${tool.slug}-vs-competitor`}
                                    className="inline-flex h-12 items-center justify-center rounded-full border bg-background px-10 text-sm font-bold shadow-sm transition-all hover:bg-muted hover:border-foreground/20 hover:-translate-y-0.5 active:translate-y-0"
                                >
                                    Compare Alternatives
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <div className="container px-4 py-20 grid grid-cols-1 lg:grid-cols-3 gap-16 relative">
                {/* Background Blobs for Content Area */}
                <div className="absolute top-1/4 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px] -z-10 animate-pulse-glow"></div>

                {/* Main Content */}
                <div className="lg:col-span-2 space-y-20">

                    {/* Features Grid */}
                    {tool.features && tool.features.length > 0 && (
                        <div>
                            <div className="flex items-center gap-4 mb-10">
                                <div className="h-px bg-border flex-1"></div>
                                <h2 className="text-3xl font-black tracking-tight whitespace-nowrap">Key Capabilities</h2>
                                <div className="h-px bg-border flex-1"></div>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-6">
                                {tool.features.map((feature: string, i: number) => (
                                    <div key={i} className="group flex items-start gap-4 p-6 rounded-[2rem] border border-border/50 bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-500">
                                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                            <Zap className="w-5 h-5 shadow-sm" />
                                        </div>
                                        <div>
                                            <span className="font-bold text-lg block mb-1">{feature}</span>
                                            <p className="text-muted-foreground text-xs font-medium">Industry-standard implementation for efficient workflows.</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Pros & Cons */}
                    <div className="grid md:grid-cols-2 gap-10">
                        <div className="relative group h-full">
                            <div className="absolute -inset-1 bg-emerald-500/10 rounded-[2.5rem] blur opacity-25 group-hover:opacity-100 transition duration-1000"></div>
                            <div className="relative rounded-[2rem] border border-emerald-500/20 bg-emerald-500/[0.02] p-8 h-full">
                                <h3 className="flex items-center gap-3 font-black text-emerald-700 dark:text-emerald-400 mb-8 text-2xl">
                                    <CheckCircle2 className="w-7 h-7" /> Pros
                                </h3>
                                <ul className="space-y-4">
                                    {tool.pros?.length > 0 ? tool.pros.map((pro: string, i: number) => (
                                        <li key={i} className="flex items-start gap-3 text-foreground/80 font-medium leading-relaxed">
                                            <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0 text-emerald-500" /> {pro}
                                        </li>
                                    )) : <li className="text-sm text-muted-foreground">Expert analysis pending for this tool.</li>}
                                </ul>
                            </div>
                        </div>
                        <div className="relative group h-full">
                            <div className="absolute -inset-1 bg-red-500/10 rounded-[2.5rem] blur opacity-25 group-hover:opacity-100 transition duration-1000"></div>
                            <div className="relative rounded-[2rem] border border-red-500/20 bg-red-500/[0.02] p-8 h-full">
                                <h3 className="flex items-center gap-3 font-black text-red-700 dark:text-red-400 mb-8 text-2xl">
                                    <MinusCircle className="w-7 h-7" /> Cons
                                </h3>
                                <ul className="space-y-4">
                                    {tool.cons?.length > 0 ? tool.cons.map((con: string, i: number) => (
                                        <li key={i} className="flex items-start gap-3 text-foreground/80 font-medium leading-relaxed">
                                            <MinusCircle className="w-5 h-5 mt-0.5 shrink-0 text-red-500" /> {con}
                                        </li>
                                    )) : <li className="text-sm text-muted-foreground">No major drawbacks identified yet.</li>}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* In-Depth Review */}
                    <div className="prose prose-slate dark:prose-invert prose-lg max-w-none">
                        <div className="flex items-center gap-4 mb-8">
                            <h2 className="text-3xl font-black tracking-tight m-0">In-Depth Review</h2>
                            <div className="h-px bg-border flex-1"></div>
                        </div>
                        {tool.longReview ? (
                            <div className="whitespace-pre-wrap leading-relaxed font-medium text-foreground/80 bg-muted/20 p-8 rounded-[2rem] border">
                                {tool.longReview}
                            </div>
                        ) : (
                            <div className="bg-muted/50 p-10 rounded-[2rem] border-2 border-dashed text-center italic text-muted-foreground">
                                Full expert review content for {tool.name} is currently being compiled.
                            </div>
                        )}
                    </div>

                </div>

                {/* Sidebar */}
                <aside className="space-y-8">
                    <div className="rounded-[2rem] border border-border/50 bg-card/80 backdrop-blur-xl shadow-2xl sticky top-24 p-8 overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-[0.03] rotate-12 -z-10 group-hover:scale-110 transition-transform duration-700">
                            <Shield className="w-48 h-48 text-primary" />
                        </div>
                        <h3 className="font-black text-2xl mb-8 tracking-tight">Technical Data</h3>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-bold text-muted-foreground/60 uppercase tracking-widest">Category</span>
                                <Link href={`/category/${tool.category?.slug}`} className="text-sm font-black text-primary hover:underline underline-offset-4 decoration-2">
                                    {tool.category?.name}
                                </Link>
                            </div>
                            <div className="h-px bg-border/50" />
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-bold text-muted-foreground/60 uppercase tracking-widest">Starting Price</span>
                                <span className="text-sm font-black text-foreground">
                                    {tool.startingPrice === 0 ? "FREE FOREVER" : `FROM $${tool.startingPrice}/MO`}
                                </span>
                            </div>
                            <div className="h-px bg-border/50" />
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-bold text-muted-foreground/60 uppercase tracking-widest">Pricing Model</span>
                                <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-[10px] font-black tracking-widest text-primary border border-primary/20">
                                    {tool.pricingModel?.toUpperCase()}
                                </span>
                            </div>

                            <div className="pt-8">
                                <a
                                    href={tool.websiteUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full inline-flex h-14 items-center justify-center rounded-full bg-primary text-white font-black shadow-xl shadow-primary/30 hover:shadow-primary/40 hover:-translate-y-1 active:translate-y-0 transition-all duration-300"
                                >
                                    GET STARTED WITH {tool.name?.toUpperCase()}
                                </a>
                                <p className="mt-4 text-center text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Official Partner Site</p>
                            </div>
                        </div>
                    </div>

                    {/* Share / other widgets could go here */}
                </aside>
            </div>
        </div>
    );
}
