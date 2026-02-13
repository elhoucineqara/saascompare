import { Gavel, Scale, FileCheck, HelpCircle } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "Terms of Service - SaaS Compare Pro",
    description: "Read our terms of service and website usage agreements."
};

export default function TermsPage() {
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
                        <Gavel className="w-3.5 h-3.5 mr-2 fill-current" /> Agreement
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tight animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                        <span className="text-gradient">Terms of Service</span>
                    </h1>
                    <p className="max-w-3xl mx-auto text-xl text-muted-foreground font-medium animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                        The legal framework for using our comparison platform and services.
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section className="container mx-auto px-4 py-20">
                <div className="max-w-4xl mx-auto space-y-12 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                    <div className="glass border border-white/10 p-10 md:p-16 rounded-[2.5rem] shadow-2xl space-y-12">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <Scale className="text-primary w-10 h-10" />
                                <h2 className="text-2xl font-black">Usage Terms</h2>
                                <p className="text-muted-foreground font-medium leading-relaxed">
                                    By accessing SaaS Compare Pro, you agree to use our data and comparisons for informational purposes only. Commercial scraping or redistribution is strictly prohibited.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <FileCheck className="text-primary w-10 h-10" />
                                <h2 className="text-2xl font-black">Accuracy</h2>
                                <p className="text-muted-foreground font-medium leading-relaxed">
                                    While we strive for 100% accuracy, SaaS pricing and features change rapidly. Always verify details on the vendor's official website before purchasing.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-8 pt-10 border-t border-border/50">
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-black">1</span>
                                    Acceptance of Terms
                                </h3>
                                <p className="text-muted-foreground leading-relaxed pl-10">
                                    By using this website, you signify your acceptance of these terms. If you do not agree, please do not use our site. Your continued use of the site following the posting of changes to these terms will be deemed your acceptance of those changes.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xl font-bold flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-black">2</span>
                                    Intellectual Property
                                </h3>
                                <p className="text-muted-foreground leading-relaxed pl-10">
                                    The content, logo, and comparisons are the property of SaaS Compare Pro. You may not use our branding or original analysis without express written permission.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xl font-bold flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-black">3</span>
                                    Affiliate Disclosure
                                </h3>
                                <p className="text-muted-foreground leading-relaxed pl-10">
                                    Some links on our site are affiliate links. This means we may earn a commission if you click through and make a purchase, at no additional cost to you. This helps us maintain our platform and provide free comparisons.
                                </p>
                            </div>
                        </div>

                        <div className="pt-10 border-t border-border/50 flex flex-col items-center gap-6">
                            <div className="flex items-center gap-2 text-primary font-bold">
                                <HelpCircle className="w-5 h-5" />
                                <span>Questions about our terms?</span>
                            </div>
                            <Link href="/contact" className="px-12 py-4 rounded-full bg-primary text-white font-black hover:translate-y-[-4px] transition-all shadow-xl shadow-primary/20">
                                Contact Legal Team
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
