import { Cookie, Settings, ShieldCheck, Info } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "Cookie Policy - SaaS Compare Pro",
    description: "Learn how we use cookies to provide a better experience."
};

export default function CookiePolicyPage() {
    return (
        <div className="min-h-screen bg-background selection:bg-primary/20 selection:text-primary">
            {/* Hero Section */}
            <section className="relative overflow-hidden border-b py-24 md:py-36 px-4 bg-background">
                <div className="absolute inset-0 -z-10 bg-grid-pattern opacity-40"></div>
                <div className="absolute top-0 right-1/2 translate-x-1/2 w-full max-w-7xl h-full -z-10">
                    <div className="absolute top-[20%] right-0 w-80 h-80 bg-indigo-500/20 rounded-full blur-[130px] animate-pulse-glow"></div>
                </div>

                <div className="container mx-auto text-center space-y-8 relative">
                    <div className="inline-flex items-center rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-1.5 text-xs font-bold text-indigo-500 animate-fade-in-up">
                        <Cookie className="w-3.5 h-3.5 mr-2 fill-current" /> Browser Preference
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tight animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                        <span className="text-gradient">Cookie Policy</span>
                    </h1>
                    <p className="max-w-3xl mx-auto text-xl text-muted-foreground font-medium animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                        We use cookies to ensure you get the most out of our SaaS comparison platform.
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section className="container mx-auto px-4 py-20">
                <div className="max-w-4xl mx-auto space-y-12 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                    <div className="glass border border-white/10 p-10 md:p-16 rounded-[2.5rem] shadow-2xl space-y-12">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-black tracking-tight flex items-center gap-3">
                                <Info className="text-primary w-8 h-8" /> What are cookies?
                            </h2>
                            <p className="text-muted-foreground font-medium leading-relaxed">
                                Cookies are small text files stored on your device that help us remember your preferences, keep you logged in, and analyze our traffic to provide better tool recommendations.
                            </p>
                        </div>

                        <div className="grid gap-6">
                            {[
                                {
                                    title: "Essential Cookies",
                                    desc: "Required for basic site functionality like secure login and saved comparisons.",
                                    icon: ShieldCheck,
                                    color: "bg-emerald-500/10 text-emerald-500"
                                },
                                {
                                    title: "Preference Cookies",
                                    desc: "Allow us to remember your language, region, and tool dashboard settings.",
                                    icon: Settings,
                                    color: "bg-blue-500/10 text-blue-500"
                                }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-6 p-8 rounded-[2rem] bg-card border border-border/50">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${item.color}`}>
                                        <item.icon className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-6 pt-10 border-t border-border/50">
                            <h2 className="text-2xl font-black tracking-tight">Managing Your Choice</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Most web browsers allow you to control cookies through their settings. However, limiting cookies may affect your experience on SaaS Compare Pro, especially features like saved comparisons and account settings.
                            </p>
                        </div>

                        <div className="pt-10 border-t border-border/50 text-center">
                            <p className="text-sm font-bold text-muted-foreground mb-6">Effective Date: February 13, 2026</p>
                            <Link href="/" className="inline-flex items-center justify-center px-12 py-4 rounded-full bg-primary text-white font-black hover:translate-y-[-4px] transition-all shadow-xl shadow-primary/20">
                                Back to Homepage
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
