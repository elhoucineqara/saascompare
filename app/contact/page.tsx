import { Mail, MapPin, Phone, MessageSquare, Send, Globe, ArrowRight } from "lucide-react";
import Link from "next/link";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Our SaaS Experts - SaaS Compare Pro",
    description: "Get in touch with our team for support, tool listing requests, or partnership inquiries. We're here to help you scale your business.",
    alternates: {
        canonical: "/contact",
    },
};

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-background selection:bg-primary/20 selection:text-primary">
            {/* Hero Section */}
            <section className="relative overflow-hidden border-b py-24 md:py-40 px-4 bg-background">
                <div className="absolute inset-0 -z-10 bg-grid-pattern opacity-40"></div>
                <div className="absolute top-0 right-1/2 translate-x-1/2 w-full max-w-7xl h-full -z-10">
                    <div className="absolute top-[20%] right-0 w-80 h-80 bg-primary/20 rounded-full blur-[130px] animate-pulse-glow"></div>
                </div>

                <div className="container mx-auto text-center space-y-8 relative">
                    <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary animate-fade-in-up">
                        <MessageSquare className="w-3.5 h-3.5 mr-2" /> Global Support
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black tracking-tight animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                        Let&apos;s Talk <br />
                        <span className="text-gradient italic">Results</span>
                    </h1>
                    <p className="max-w-3xl mx-auto text-xl md:text-2xl text-muted-foreground font-medium animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                        Have a question about our comparisons or want to list your SaaS tool? Our team is standing by.
                    </p>
                </div>
            </section>

            <section className="container mx-auto px-4 py-24 md:py-32">
                <div className="grid lg:grid-cols-2 gap-20 items-start">
                    {/* Contact Info */}
                    <div className="space-y-12 animate-fade-in-up">
                        <div className="space-y-6">
                            <h2 className="text-4xl font-black tracking-tight">Direct Access to <span className="text-primary italic">Expertise</span>.</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed font-medium">
                                We&apos;re more than just a registry. We&apos;re a community of software enthusiasts dedicated to helping you scale.
                            </p>
                        </div>

                        <div className="grid gap-6">
                            {[
                                { title: "Email Us", info: "support@saascomparepro.com", icon: Mail, label: "Response in 24h" },
                                { title: "Global Sales", info: "+1 (555) 123-4567", icon: Phone, label: "Mon-Fri / 9am-6pm" },
                                { title: "Official HQ", info: "123 Innovation Blvd, SF", icon: MapPin, label: "Global HQ" }
                            ].map((item, i) => (
                                <div key={i} className="group flex items-center gap-6 p-8 rounded-[2rem] bg-card border border-border/50 hover:border-primary/50 transition-all cursor-pointer">
                                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                        <item.icon className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black uppercase tracking-widest text-primary mb-1">{item.label}</p>
                                        <h3 className="text-xl font-bold text-foreground mb-1">{item.title}</h3>
                                        <p className="text-muted-foreground font-medium">{item.info}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-8 rounded-[2.5rem] glass border border-white/10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10"></div>
                            <p className="text-lg font-bold mb-4">Interested in a high-growth partnership?</p>
                            <Link href="/pricing" className="text-primary font-black flex items-center gap-2 group">
                                View Partner Plans <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="relative animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                        <div className="absolute inset-0 bg-primary/10 blur-[130px] -z-10 rounded-full animate-pulse-glow"></div>
                        <div className="glass-dark border border-white/10 p-10 md:p-14 rounded-[3rem] shadow-2xl">
                            <form className="space-y-8">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Full Name</label>
                                        <input className="w-full bg-background/50 border border-border/50 rounded-2xl py-4 px-6 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="John Doe" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Work Email</label>
                                        <input className="w-full bg-background/50 border border-border/50 rounded-2xl py-4 px-6 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="john@company.com" type="email" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Subject</label>
                                    <select className="w-full bg-background/50 border border-border/50 rounded-2xl py-4 px-6 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer">
                                        <option>General Inquiry</option>
                                        <option>Tool Listing Request</option>
                                        <option>Advertising & Partnership</option>
                                        <option>Technical Support</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Message</label>
                                    <textarea className="w-full bg-background/50 border border-border/50 rounded-2xl py-4 px-6 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all min-h-[150px]" placeholder="Tell us about your project or inquiry..." />
                                </div>
                                <button className="w-full bg-primary text-white py-5 rounded-2xl font-black text-sm shadow-xl shadow-primary/30 hover:shadow-primary/40 hover:-translate-y-1 active:translate-y-0 transition-all flex items-center justify-center gap-3 group">
                                    Send Transmission
                                    <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </button>
                                <p className="text-center text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50">
                                    Secured by SaaS Compare Guard
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Global Presence */}
            <section className="border-t py-24 bg-muted/20">
                <div className="container mx-auto px-4 flex flex-col items-center gap-12 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                    <div className="flex flex-wrap justify-center gap-12 md:gap-24 font-black text-2xl tracking-tighter">
                        <span className="flex items-center gap-2"><Globe className="text-primary" /> San Francisco</span>
                        <span className="flex items-center gap-2"><Globe className="text-primary" /> London</span>
                        <span className="flex items-center gap-2"><Globe className="text-primary" /> Berlin</span>
                        <span className="flex items-center gap-2"><Globe className="text-primary" /> Tokyo</span>
                    </div>
                </div>
            </section>
        </div>
    );
}
