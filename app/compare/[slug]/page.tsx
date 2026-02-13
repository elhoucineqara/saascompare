
import dbConnect from "@/lib/mongodb";
import SaaSTool from "@/models/SaaSTool";
import Image from "next/image";
import Link from "next/link";
import { X, Zap, CheckCircle2, TrendingUp } from "lucide-react";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const slug = decodeURIComponent(params.slug);
    const [slug1, slug2] = slug.split("-vs-");

    const baseUrl = process.env.NEXTAUTH_URL || "https://saascomparepro.com";
    const url = `${baseUrl}/compare/${params.slug}`;

    if (!slug1 || !slug2) return { title: "Invalid Comparison" };

    const name1 = slug1.trim().charAt(0).toUpperCase() + slug1.trim().slice(1);
    const name2 = slug2.trim().charAt(0).toUpperCase() + slug2.trim().slice(1);

    const title = `${name1} vs ${name2} - Which is Better in 2024?`;
    const description = `Detailed comparison of ${name1} and ${name2}. Compare features, pricing, and pros/cons to choose the best SaaS tool for your business.`;

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
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
        },
    };
}


export default async function ComparisonPage({ params }: { params: { slug: string } }) {
    const slug = decodeURIComponent(params.slug);
    const [slug1, slug2] = slug.split("-vs-");

    if (!slug1 || !slug2) {
        return notFound();
    }

    await dbConnect();
    const tool1 = await SaaSTool.findOne({ slug: slug1.trim() });
    const tool2 = await SaaSTool.findOne({ slug: slug2.trim() });

    if (!tool1 || !tool2) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <div className="bg-destructive/10 text-destructive p-4 rounded-full mb-6">
                    <X className="w-10 h-10" />
                </div>
                <h1 className="text-3xl font-bold mb-4">Comparison Not Found</h1>
                <p className="text-muted-foreground mb-8 max-w-md">One or both of the tools you&apos;re trying to compare couldn&apos;t be found in our database.</p>
                <Link href="/categories" className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold hover:bg-primary/90 transition-all shadow-md">
                    Browse All Tools
                </Link>
            </div>
        );
    }

    const baseUrl = process.env.NEXTAUTH_URL || "https://saascomparepro.com";

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
                "name": "Compare",
                "item": `${baseUrl}/compare`
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": `${tool1.name} vs ${tool2.name}`,
                "item": `${baseUrl}/compare/${params.slug}`
            }
        ]
    };

    return (
        <div className="min-h-screen bg-background selection:bg-primary/20 selection:text-primary">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            {/* Header / Hero */}
            <section className="relative overflow-hidden border-b py-24 md:py-36 px-4 bg-background">
                <div className="absolute inset-0 -z-10 bg-grid-pattern opacity-40"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10">
                    <div className="absolute top-[20%] left-0 w-80 h-80 bg-primary/20 rounded-full blur-[130px] animate-pulse-glow"></div>
                    <div className="absolute bottom-[20%] right-0 w-80 h-80 bg-indigo-500/20 rounded-full blur-[130px] animate-pulse-glow" style={{ animationDelay: "2s" }}></div>
                </div>

                <div className="container mx-auto text-center space-y-8 relative">
                    <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary animate-fade-in-up">
                        <Zap className="w-3.5 h-3.5 mr-2 fill-current" /> Technical Comparison
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tight animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                        <span className="text-gradient">{tool1.name}</span> <span className="text-muted-foreground/40 italic mx-2">vs</span> <span className="text-gradient">{tool2.name}</span>
                    </h1>
                    <p className="max-w-3xl mx-auto text-xl text-muted-foreground font-medium animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                        Comprehensive side-by-side analysis to help you choose the better solution for your workflow.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Tool 1 */}
                    <div className="space-y-10 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-transparent rounded-[2.5rem] blur opacity-25 group-hover:opacity-100 transition duration-1000"></div>
                            <div className="relative flex items-center gap-8 bg-card p-10 rounded-[2rem] border border-border/50 shadow-sm group-hover:shadow-2xl transition-all duration-500">
                                <div className="w-24 h-24 bg-white dark:bg-slate-900 rounded-2xl border p-4 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-500">
                                    <Image src={tool1.logoUrl} alt={tool1.name} width={80} height={80} className="object-contain" />
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-4xl font-black mb-2">{tool1.name}</h2>
                                    <p className="text-muted-foreground font-medium line-clamp-2">{tool1.shortDescription}</p>
                                </div>
                            </div>
                        </div>

                        {/* Pros for Tool 1 */}
                        <div className="grid gap-6">
                            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-[2rem] p-8">
                                <h3 className="text-xl font-bold text-emerald-600 mb-6 flex items-center gap-2">
                                    <CheckCircle2 className="w-6 h-6" /> Key Advantages
                                </h3>
                                <ul className="space-y-4">
                                    {tool1.pros?.slice(0, 5).map((pro: string, i: number) => (
                                        <li key={i} className="flex items-start gap-4 group">
                                            <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                                                <CheckCircle2 className="w-4 h-4" />
                                            </div>
                                            <span className="text-foreground/80 font-medium leading-relaxed">{pro}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Tool 2 */}
                    <div className="space-y-10 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-transparent rounded-[2.5rem] blur opacity-25 group-hover:opacity-100 transition duration-1000"></div>
                            <div className="relative flex items-center gap-8 bg-card p-10 rounded-[2rem] border border-border/50 shadow-sm group-hover:shadow-2xl transition-all duration-500">
                                <div className="w-24 h-24 bg-white dark:bg-slate-900 rounded-2xl border p-4 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-500">
                                    <Image src={tool2.logoUrl} alt={tool2.name} width={80} height={80} className="object-contain" />
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-4xl font-black mb-2">{tool2.name}</h2>
                                    <p className="text-muted-foreground font-medium line-clamp-2">{tool2.shortDescription}</p>
                                </div>
                            </div>
                        </div>

                        {/* Pros for Tool 2 */}
                        <div className="grid gap-6">
                            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-[2rem] p-8">
                                <h3 className="text-xl font-bold text-emerald-600 mb-6 flex items-center gap-2">
                                    <CheckCircle2 className="w-6 h-6" /> Key Advantages
                                </h3>
                                <ul className="space-y-4">
                                    {tool2.pros?.slice(0, 5).map((pro: string, i: number) => (
                                        <li key={i} className="flex items-start gap-4 group">
                                            <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                                                <CheckCircle2 className="w-4 h-4" />
                                            </div>
                                            <span className="text-foreground/80 font-medium leading-relaxed">{pro}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Technical Verdict Section */}
                <div className="mt-20 relative p-10 md:p-20 rounded-[3rem] border border-primary/20 bg-primary/[0.02] overflow-hidden animate-fade-in-up shadow-2xl shadow-primary/5" style={{ animationDelay: "0.5s" }}>
                    <div className="absolute top-0 right-0 p-10 opacity-[0.03] rotate-12 scale-150">
                        <TrendingUp className="w-64 h-64 text-primary" />
                    </div>
                    <div className="relative z-10 text-center space-y-10">
                        <div className="inline-block px-6 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-black uppercase tracking-widest text-sm">
                            Expert Verdict
                        </div>
                        <h2 className="text-4xl md:text-7xl font-black tracking-tight">Which one is right for you?</h2>
                        <p className="max-w-4xl mx-auto text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed">
                            Choosing between <span className="text-foreground font-bold">{tool1.name}</span> and <span className="text-foreground font-bold">{tool2.name}</span> depends on your business scale.
                            If you need <span className="text-foreground font-bold">deep enterprise integrations</span>, {tool1.name} is the clear winner.
                            For <span className="text-foreground font-bold">agility and modern UX</span>, {tool2.name} offers a more streamlined experience.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-8 pt-6">
                            <Link href={`/product/${tool1.slug}`} className="px-12 py-6 rounded-full bg-primary text-white font-black text-lg hover:translate-y-[-4px] active:translate-y-0 transition-all shadow-2xl shadow-primary/30">
                                Review {tool1.name}
                            </Link>
                            <Link href={`/product/${tool2.slug}`} className="px-12 py-6 rounded-full bg-white text-foreground border-2 border-border font-black text-lg hover:translate-y-[-4px] active:translate-y-0 transition-all shadow-xl">
                                Review {tool2.name}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
