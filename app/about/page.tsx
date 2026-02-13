import { Target, Users, Globe, Rocket, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
    title: "About Us - SaaS Compare Pro",
    description: "Learn about our mission to democratize software selection through data-driven analysis."
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background selection:bg-primary/20 selection:text-primary">
            {/* Hero Section */}
            <section className="relative overflow-hidden border-b py-24 md:py-40 px-4 bg-background">
                <div className="absolute inset-0 -z-10 bg-grid-pattern opacity-40"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10">
                    <div className="absolute top-[20%] left-0 w-80 h-80 bg-primary/20 rounded-full blur-[130px] animate-pulse-glow"></div>
                    <div className="absolute bottom-[20%] right-0 w-80 h-80 bg-indigo-500/20 rounded-full blur-[130px] animate-pulse-glow" style={{ animationDelay: "2s" }}></div>
                </div>

                <div className="container mx-auto text-center space-y-8 relative">
                    <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary animate-fade-in-up">
                        <Rocket className="w-3.5 h-3.5 mr-2" /> Our Mission
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black tracking-tight animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                        Democratizing <br />
                        <span className="text-gradient italic">Software Selection</span>
                    </h1>
                    <p className="max-w-3xl mx-auto text-xl md:text-2xl text-muted-foreground font-medium animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                        We're bringing elite-level data analysis and market transparency to every business, from startups to enterprises.
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="container mx-auto px-4 py-32">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    <div className="space-y-8 animate-fade-in-up">
                        <div className="space-y-4">
                            <h2 className="text-4xl font-black tracking-tight">Radical Transparency in a <span className="text-primary">$200B+</span> Market.</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed font-medium">
                                Choosing the right software shouldn't be a guessing game. At SaaS Compare Pro, we aggregate millions of data points, verified reviews, and real-world pricing to give you the truth behind the marketing.
                            </p>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-6">
                            {[
                                { title: "5k+ Tools", desc: "Monitored daily", icon: Globe },
                                { title: "100% Unbiased", desc: "No paid ratings", icon: ShieldCheck },
                            ].map((item, i) => (
                                <div key={i} className="p-6 rounded-2xl bg-muted/30 border border-border/50 flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold">{item.title}</h4>
                                        <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                        <div className="absolute inset-0 bg-primary/20 blur-[100px] -z-10 rounded-full animate-pulse-glow"></div>
                        <div className="glass border border-white/10 p-4 rounded-[2.5rem] shadow-2xl overflow-hidden group">
                            <Image
                                src="https://images.unsplash.com/photo-152207182399e-b89e7283625a?q=80&w=2070&auto=format&fit=crop"
                                alt="Our Team"
                                width={800}
                                height={500}
                                className="rounded-[1.5rem] object-cover aspect-video group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="bg-muted/30 border-y py-32">
                <div className="container mx-auto px-4 text-center mb-20 space-y-4">
                    <h2 className="text-4xl font-black tracking-tight">Our Core Principles</h2>
                    <p className="max-w-2xl mx-auto text-muted-foreground font-medium">Built on foundation of integrity and data excellence.</p>
                </div>
                <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
                    {[
                        {
                            title: "Data First",
                            desc: "Our algorithms prioritize feature depth and user satisfaction over marketing budget.",
                            icon: Zap,
                            color: "text-amber-500 bg-amber-500/10"
                        },
                        {
                            title: "Human Touch",
                            desc: "Every comparison is manually vetted by our team of industry experts for accuracy.",
                            icon: Users,
                            color: "text-indigo-500 bg-indigo-500/10"
                        },
                        {
                            title: "Future Ready",
                            desc: "We track the latest in AI and cloud tech to keep your stack ahead of the curve.",
                            icon: Target,
                            color: "text-emerald-500 bg-emerald-500/10"
                        }
                    ].map((value, i) => (
                        <div key={i} className="group p-10 rounded-[2.5rem] bg-background border border-border/50 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 text-center space-y-6">
                            <div className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center ${value.color} group-hover:scale-110 transition-transform`}>
                                <value.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-black tracking-tight">{value.title}</h3>
                            <p className="text-muted-foreground leading-relaxed font-medium">{value.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32">
                <div className="container mx-auto px-4">
                    <div className="glass-dark border border-white/10 p-12 md:p-24 rounded-[3rem] text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-primary/10 -z-10 animate-pulse-glow"></div>
                        <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-8">Ready to find your next favorite tool?</h2>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link href="/categories" className="px-12 py-5 rounded-2xl bg-primary text-white font-black hover:translate-y-[-4px] transition-all shadow-xl shadow-primary/30">
                                Explore All Categories
                            </Link>
                            <Link href="/contact" className="px-12 py-5 rounded-2xl bg-white/5 text-white font-black hover:bg-white/10 transition-all border border-white/10">
                                Talk to an Expert
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
