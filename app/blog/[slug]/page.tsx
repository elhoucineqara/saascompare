import dbConnect from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";
import User from "@/models/User"; // Import for author population
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

export async function generateMetadata({ params }: { params: { slug: string } }) {
    await dbConnect();
    const post = await BlogPost.findOne({ slug: params.slug });
    return {
        title: post?.seoTitle || post?.title || "Blog Post",
        description: post?.seoDescription || post?.excerpt || "Read our latest article.",
    };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
    await dbConnect();
    // Populate author. Ensure User model is registered.
    const post = await BlogPost.findOne({ slug: params.slug }).populate("author", "name image");

    if (!post) return notFound();

    return (
        <article className="min-h-screen bg-background pb-20">
            {/* Header */}
            <header className="relative py-20 md:py-24 border-b overflow-hidden">
                <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

                <div className="container px-4 text-center max-w-4xl mx-auto">
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
                        {post.tags && post.tags.map((t: string) => (
                            <span key={t} className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-secondary text-secondary-foreground">
                                #{t}
                            </span>
                        ))}
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-8 text-foreground leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex items-center justify-center gap-6 text-muted-foreground text-sm md:text-base">
                        <div className="flex items-center gap-2">
                            {post.author?.image ? (
                                <Image src={post.author.image} width={40} height={40} className="rounded-full border" alt={post.author.name} />
                            ) : (
                                <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold">
                                    {post.author?.name?.charAt(0) || 'A'}
                                </div>
                            )}
                            <span className="font-medium text-foreground">{post.author?.name || 'Anonymous'}</span>
                        </div>
                        <span className="hidden md:inline">•</span>
                        <time className="font-medium">{post.publishedAt ? format(new Date(post.publishedAt), 'MMMM d, yyyy') : 'Draft'}</time>
                    </div>
                </div>
            </header>

            {/* Content */}
            <div className="container px-4 py-12 max-w-3xl mx-auto">
                <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
                    <ReactMarkdown>{post.content}</ReactMarkdown>
                </div>

                {/* Footer / CTA could be added here */}
                <div className="mt-16 pt-8 border-t flex justify-between items-center">
                    <Link href="/blog" className="text-primary hover:underline font-medium">
                        &larr; Back to Blog
                    </Link>
                </div>
            </div>
        </article>
    );
}
