import dbConnect from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { ArrowRight, Calendar, User } from "lucide-react";

export const metadata = {
    title: "SaaS Insights & Guides - Blog",
    description: "Expert articles on software, productivity, and digital growth."
};

export default async function BlogIndexPage() {
    await dbConnect();
    // Ensure we fetch published posts
    const posts = await BlogPost.find({ published: true }).sort({ publishedAt: -1 }).limit(10).populate("author", "name");

    return (
        <div className="flex flex-col min-h-screen">

            <section className="relative py-24 md:py-36 bg-background border-b overflow-hidden">
                <div className="absolute inset-0 -z-10 bg-grid-pattern opacity-40"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10">
                    <div className="absolute top-[20%] left-[10%] w-72 h-72 bg-primary/20 rounded-full blur-[120px] animate-pulse-glow"></div>
                    <div className="absolute bottom-[20%] right-[10%] w-72 h-72 bg-violet-500/20 rounded-full blur-[120px] animate-pulse-glow"></div>
                </div>

                <div className="container px-4 text-center space-y-6">
                    <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary animate-fade-in-up">
                        <span className="flex h-1.5 w-1.5 rounded-full bg-primary mr-2 animate-ping"></span>
                        Expert Analysis & Trends
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                        SaaS <span className="text-gradient">Insights</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up font-medium leading-relaxed" style={{ animationDelay: "0.2s" }}>
                        Deep dives into software trends, comparison guides, and productivity hacks to help you work smarter and scale faster.
                    </p>
                </div>
            </section>

            <section className="container px-4 py-20">
                {posts.length === 0 ? (
                    <div className="text-center py-24 border-2 border-dashed rounded-[2rem] bg-muted/20 animate-fade-in">
                        <p className="text-2xl font-black text-muted-foreground">No active blog posts yet.</p>
                        <p className="text-muted-foreground mt-2 font-medium">Check back soon for our latest expert reviews and insights!</p>
                    </div>
                ) : (
                    <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                        {posts.map((post, i) => (
                            <Link
                                href={`/blog/${post.slug}`}
                                key={post._id.toString()}
                                className="group flex flex-col bg-card rounded-[2rem] overflow-hidden border border-border/50 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in-up"
                                style={{ animationDelay: `${i * 0.1}s` }}
                            >
                                <div className="h-64 bg-muted w-full relative overflow-hidden">
                                    {post.coverImage ? (
                                        <Image
                                            src={post.coverImage}
                                            alt={post.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-violet-500/10">
                                            <span className="text-5xl group-hover:scale-125 transition-transform duration-500">📄</span>
                                        </div>
                                    )}
                                    <div className="absolute top-6 left-6">
                                        <span className="bg-background/95 backdrop-blur-md text-foreground text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full border shadow-sm">
                                            {post.tags?.[0] || 'Article'}
                                        </span>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>
                                <div className="p-8 flex-1 flex flex-col">
                                    <h2 className="text-2xl font-black mb-4 group-hover:text-primary transition-colors line-clamp-2 leading-[1.2]">
                                        {post.title}
                                    </h2>
                                    <p className="text-muted-foreground mb-8 flex-1 line-clamp-3 text-sm font-medium leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                                        {post.excerpt}
                                    </p>

                                    <div className="flex items-center justify-between text-xs font-bold text-muted-foreground/60 mt-auto pt-6 border-t border-border/50">
                                        <div className="flex items-center gap-6">
                                            <span className="flex items-center gap-2">
                                                <Calendar className="w-3.5 h-3.5 text-primary/60" />
                                                {post.publishedAt ? format(new Date(post.publishedAt), 'MMM d, yyyy') : 'Recently Published'}
                                            </span>
                                            <span className="flex items-center gap-2">
                                                <User className="w-3.5 h-3.5 text-primary/60" />
                                                {post.author?.name || 'SaaS Expert'}
                                            </span>
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}
