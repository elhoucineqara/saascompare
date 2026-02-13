import dbConnect from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

export async function generateMetadata({ params }: { params: { slug: string } }) {
    await dbConnect();
    const post = await BlogPost.findOne({ slug: params.slug });

    if (!post) return { title: "Post Not Found" };

    const baseUrl = process.env.NEXTAUTH_URL || "https://saascompare.vercel.app";
    const title = post.seoTitle || post.title;
    const description = post.seoDescription || post.excerpt;
    const url = `${baseUrl}/blog/${post.slug}`;

    return {
        title: `${title} | SaaS Compare Pro`,
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
            publishedTime: post.publishedAt,
            authors: [post.author?.name || "SaaS Expert"],
            images: post.coverImage ? [post.coverImage] : [],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: post.coverImage ? [post.coverImage] : [],
        },
    };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
    await dbConnect();
    // Populate author. Ensure User model is registered.
    const post = await BlogPost.findOne({ slug: params.slug }).populate("author", "name image");

    if (!post) return notFound();

    const baseUrl = process.env.NEXTAUTH_URL || "https://saascompare.vercel.app";

    const blogJsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "image": post.coverImage,
        "datePublished": post.publishedAt,
        "author": {
            "@type": "Person",
            "name": post.author?.name || "SaaS Expert"
        },
        "publisher": {
            "@type": "Organization",
            "name": "SaaS Compare Pro",
            "logo": {
                "@type": "ImageObject",
                "url": `${baseUrl}/logo.png`
            }
        },
        "description": post.excerpt
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
                "name": "Blog",
                "item": `${baseUrl}/blog`
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": post.title,
                "item": `${baseUrl}/blog/${post.slug}`
            }
        ]
    };

    return (
        <article className="min-h-screen bg-background pb-20">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
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
