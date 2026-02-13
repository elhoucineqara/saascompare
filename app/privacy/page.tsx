import { Shield, Lock, Eye, FileText, Zap } from "lucide-react";
import Link from "next/link";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy & Data Security - SaaS Compare Pro",
    description: "Learn how we protect your data and respect your privacy. Our transparent data handling practices ensure your trust is always maintained.",
    alternates: {
        canonical: "/privacy",
    },
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-background selection:bg-primary/20 selection:text-primary">
            {/* Hero Section */}
            <section className="relative overflow-hidden border-b py-24 md:py-36 px-4 bg-background">
                <div className="absolute inset-0 -z-10 bg-grid-pattern opacity-40"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10">
                    <div className="absolute top-[20%] left-0 w-80 h-80 bg-primary/20 rounded-full blur-[130px] animate-pulse-glow"></div>
                </div>

                <div className="container mx-auto text-center space-y-8 relative">
                    <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary animate-fade-in-up">
                        <Shield className="w-3.5 h-3.5 mr-2 fill-current" /> Legal & Trust
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tight animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                        <span className="text-gradient">Privacy Policy</span>
                    </h1>
                    <p className="max-w-3xl mx-auto text-xl text-muted-foreground font-medium animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                        Your trust is our most valuable asset. Learn how we handle your data with transparency and care.
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section className="container mx-auto px-4 py-20">
                <div className="max-w-4xl mx-auto space-y-12 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                    <div className="glass border border-white/10 p-10 md:p-16 rounded-[2.5rem] shadow-2xl space-y-10">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-black tracking-tight flex items-center gap-3">
                                <Lock className="text-primary w-8 h-8" /> Data Protection
                            </h2>
                            <p className="text-muted-foreground font-medium leading-relaxed">
                                At SaaS Compare Pro, we prioritize the security of your information. We collect only what is necessary to provide you with the best comparison experience. This includes basic account info and search preferences.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="p-8 rounded-[2rem] bg-card border border-border/50 hover:border-primary/30 transition-all">
                                <Eye className="text-primary w-10 h-10 mb-6" />
                                <h3 className="text-xl font-bold mb-4">Transparency</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    We never sell your data to third parties. Our business model is based on affiliate transparency and expert analysis, not data harvesting.
                                </p>
                            </div>
                            <div className="p-8 rounded-[2rem] bg-card border border-border/50 hover:border-primary/30 transition-all">
                                <Zap className="text-primary w-10 h-10 mb-6" />
                                <h3 className="text-xl font-bold mb-4">Control</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    You have full control over your account. You can request data deletion or export your information directly from your dashboard at any time.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-6 pt-10 border-t border-border/50">
                            <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                                <FileText className="text-primary w-6 h-6" /> Detailed Terms
                            </h2>
                            <div className="prose prose-slate dark:prose-invert max-w-none text-muted-foreground space-y-6">
                                <p>
                                    <strong>Collection of Information:</strong> We collect information you provide directly to us when you create an account, subscribe to our newsletter, or fill out a form.
                                </p>
                                <p>
                                    <strong>Use of Information:</strong> We use the information we collect to personalize your experience, improve our website, and send periodic emails regarding your tool comparisons.
                                </p>
                                <p>
                                    <strong>Information Sharing:</strong> We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information.
                                </p>
                            </div>
                        </div>

                        <div className="pt-10 border-t border-border/50 text-center">
                            <p className="text-sm font-bold text-muted-foreground mb-6">Last Updated: February 2026</p>
                            <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary text-white font-black hover:translate-y-[-4px] transition-all shadow-xl shadow-primary/20">
                                Contact Privacy Team
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
