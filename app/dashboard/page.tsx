"use client";

import { useSession } from "next-auth/react";
import {
    LayoutDashboard,
    Bookmark,
    Scale,
    Settings,
    ChevronRight,
    Zap,
    History,
    Search,
    TrendingUp,
    Star
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function DashboardPage() {
    const { data: session } = useSession();
    const [activeTab, setActiveTab] = useState("overview");

    // Sidebar Items
    const menuItems = [
        { id: "overview", label: "Overview", icon: LayoutDashboard },
        { id: "saved", label: "Saved Tools", icon: Bookmark },
        { id: "comparisons", label: "Comparisons", icon: Scale },
        { id: "settings", label: "Settings", icon: Settings },
    ];

    // Mock Stats
    const stats = [
        { label: "Active Comparisons", value: "12", icon: Scale, color: "text-primary bg-primary/10" },
        { label: "Saved Tools", value: "8", icon: Bookmark, color: "text-emerald-500 bg-emerald-500/10" },
        { label: "AI Insights Gen", value: "4", icon: Zap, color: "text-amber-500 bg-amber-500/10" },
    ];

    return (
        <div className="min-h-screen bg-background flex">
            {/* Left Sidebar */}
            <aside className="w-72 border-r border-border/50 bg-card/30 backdrop-blur-xl fixed h-full z-40 hidden lg:block">
                <div className="p-8 pb-4">
                    <Link href="/" className="flex items-center gap-3 group mb-8">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white shadow-lg shadow-primary/30 group-hover:rotate-6 transition-transform">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M3 3v18h18" /><path d="M18 17V9" /><path d="M13 17V5" /><path d="M8 17v-3" /></svg>
                        </div>
                        <span className="font-black text-xl tracking-tighter">SaaS<span className="text-primary italic">Compare</span></span>
                    </Link>

                    <div className="space-y-1">
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm ${activeTab === item.id
                                    ? "bg-primary/10 text-primary shadow-sm"
                                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                                    }`}
                            >
                                <item.icon className="w-4 h-4" />
                                {item.label}
                                {activeTab === item.id && <div className="ml-auto w-1 h-1 bg-primary rounded-full" />}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="absolute bottom-8 left-0 right-0 px-8 text-center">
                    <div className="p-6 rounded-[2rem] glass-dark border border-white/5 space-y-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary mx-auto">
                            <Zap className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-black tracking-tight">Pro Plan active</p>
                            <p className="text-xs text-muted-foreground font-medium">Next bill on March 1st</p>
                        </div>
                        <Link href="/pricing" className="block w-full py-2 bg-white/5 hover:bg-white/10 text-xs font-black rounded-lg transition-colors border border-white/10">
                            Upgrade / Billing
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 lg:ml-72 min-h-screen pt-24 pb-12 transition-all">
                <div className="container px-6 lg:px-12 mx-auto max-w-7xl animate-fade-in-up">
                    {activeTab === "overview" && (
                        <>
                            {/* Header */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                                <div>
                                    <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-2">
                                        Welcome, <span className="text-gradient">{(session?.user?.name || "Member").split(' ')[0]}</span>
                                    </h1>
                                    <p className="text-muted-foreground font-semibold flex items-center gap-2">
                                        <History className="w-4 h-4 text-primary" /> You&apos;ve made <span className="text-foreground">3</span> comparisons this week.
                                    </p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Link href="/categories" className="px-6 py-3 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 hover:shadow-primary/30 hover:translate-y-[-2px] transition-all text-sm flex items-center gap-2">
                                        <Search className="w-4 h-4" /> Compare New Tools
                                    </Link>
                                </div>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                                {stats.map((stat, i) => (
                                    <div key={i} className="p-8 rounded-[2.5rem] bg-card/40 border border-border/50 hover:border-primary/30 transition-all group cursor-default">
                                        <div className="flex justify-between items-start mb-6">
                                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform ${stat.color}`}>
                                                <stat.icon className="w-7 h-7" />
                                            </div>
                                            <div className="flex items-center gap-1 text-emerald-500 font-black text-xs">
                                                <TrendingUp className="w-3 h-3" /> +12%
                                            </div>
                                        </div>
                                        <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-1">{stat.label}</h3>
                                        <p className="text-4xl font-black leading-none">{stat.value}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Activity Section */}
                            <div className="grid lg:grid-cols-3 gap-8">
                                {/* Recent Comparisons */}
                                <div className="lg:col-span-2 space-y-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-2xl font-black tracking-tight">Recent Activity</h2>
                                        <Link href="/categories" className="text-xs font-black text-primary hover:underline tracking-widest uppercase">Explore More</Link>
                                    </div>

                                    <div className="space-y-4">
                                        {[
                                            { t1: "Salesforce", t2: "HubSpot", slug: "salesforce-vs-hubspot", status: "Winner: HubSpot", date: "2 hours ago" },
                                            { t1: "Notion", t2: "ClickUp", slug: "notion-vs-clickup", status: "Winner: Notion", date: "Yesterday" },
                                            { t1: "Stripe", t2: "Adyen", slug: "stripe-vs-adyen", status: "Tie", date: "Feb 12" },
                                        ].map((comp, i) => (
                                            <Link href={`/compare/${comp.slug}`} key={i} className="glass border border-white/10 p-6 rounded-3xl flex items-center justify-between group cursor-pointer hover:border-primary/40 transition-all block">
                                                <div className="flex items-center gap-4">
                                                    <div className="flex -space-x-3">
                                                        <div className="w-10 h-10 rounded-full bg-indigo-500 border-2 border-background flex items-center justify-center font-black text-xs text-white uppercase">{comp.t1.charAt(0)}</div>
                                                        <div className="w-10 h-10 rounded-full bg-primary border-2 border-background flex items-center justify-center font-black text-xs text-white uppercase">{comp.t2.charAt(0)}</div>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-sm tracking-tight">{comp.t1} vs {comp.t2}</h4>
                                                        <p className="text-xs text-muted-foreground font-medium">{comp.status}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right flex items-center gap-4">
                                                    <span className="text-[10px] font-black uppercase text-muted-foreground/60 tracking-widest">{comp.date}</span>
                                                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                {/* Top Recommendations */}
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-black tracking-tight">Daily Picks</h2>
                                    <div className="space-y-4">
                                        {[
                                            { name: "Notion", slug: "notion", cat: "Project Management", rating: "4.9" },
                                            { name: "Asana", slug: "asana", cat: "Project Management", rating: "4.8" },
                                            { name: "HubSpot", slug: "hubspot", cat: "CRM & Sales", rating: "5.0" },
                                        ].map((tool, i) => (
                                            <div key={i} className="p-6 rounded-3xl bg-muted/30 border border-border/50 hover:bg-muted/50 transition-all space-y-4">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">{tool.cat}</p>
                                                        <h4 className="font-black text-lg">{tool.name}</h4>
                                                    </div>
                                                    <div className="flex items-center gap-1 bg-amber-500/10 text-amber-500 px-2 py-1 rounded-lg">
                                                        <Star className="w-3 h-3 fill-current" />
                                                        <span className="text-[10px] font-black">{tool.rating}</span>
                                                    </div>
                                                </div>
                                                <Link href={`/product/${tool.slug}`} className="w-full py-2 bg-background flex items-center justify-center rounded-xl text-xs font-black border border-border/50 hover:border-primary/30 transition-all">
                                                    View Details
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab !== "overview" && (
                        <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
                            <div className="w-24 h-24 rounded-[2rem] bg-primary/10 flex items-center justify-center text-primary animate-pulse-glow">
                                {menuItems.find(m => m.id === activeTab)?.icon && (
                                    (() => {
                                        const Icon = menuItems.find(m => m.id === activeTab)!.icon;
                                        return <Icon className="w-12 h-12" />;
                                    })()
                                )}
                            </div>
                            <h2 className="text-3xl font-black tracking-tight uppercase tracking-widest">
                                {menuItems.find(m => m.id === activeTab)?.label}
                            </h2>
                            <p className="text-muted-foreground font-medium max-w-md">
                                This section is currently being improved to provide a more personalized experience. Check back soon for deeper analytics!
                            </p>
                            <button
                                onClick={() => setActiveTab("overview")}
                                className="text-primary font-black flex items-center gap-2 hover:underline"
                            >
                                <ChevronRight className="w-4 h-4 rotate-180" /> Back to Overview
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
