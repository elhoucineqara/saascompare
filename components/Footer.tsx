"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
    const pathname = usePathname();
    const isDashboard = pathname?.startsWith("/dashboard");

    if (isDashboard) return null;

    return (
        <footer className="relative bg-card border-t py-20 overflow-hidden">
            <div className="absolute inset-0 -z-10 bg-grid-pattern opacity-20"></div>
            <div className="container px-6 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-1 space-y-6">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white shadow-lg shadow-primary/30">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M3 3v18h18" /><path d="M18 17V9" /><path d="M13 17V5" /><path d="M8 17v-3" /></svg>
                            </div>
                            <span className="font-black text-xl tracking-tighter">SaaS<span className="text-primary italic">Compare</span></span>
                        </Link>
                        <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                            Helping businesses find the perfect software solutions through data-driven analysis and expert reviews.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-black text-sm uppercase tracking-widest mb-6">Platform</h4>
                        <ul className="space-y-4 text-sm font-medium text-muted-foreground">
                            <li><Link href="/categories" className="hover:text-primary transition-colors">Categories</Link></li>
                            <li><Link href="/blog" className="hover:text-primary transition-colors">Expert Insights</Link></li>
                            <li><Link href="/pricing" className="hover:text-primary transition-colors">Pricing Plans</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-black text-sm uppercase tracking-widest mb-6">Company</h4>
                        <ul className="space-y-4 text-sm font-medium text-muted-foreground">
                            <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-black text-sm uppercase tracking-widest mb-6">Connect</h4>
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary cursor-pointer hover:bg-primary hover:text-white transition-all">𝕏</div>
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary cursor-pointer hover:bg-primary hover:text-white transition-all">in</div>
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary cursor-pointer hover:bg-primary hover:text-white transition-all">git</div>
                        </div>
                    </div>
                </div>
                <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-muted-foreground/60 uppercase tracking-widest">
                    <p>© {new Date().getFullYear()} SaaS Compare Pro. Designed for scale.</p>
                    <div className="flex gap-8">
                        <Link href="/terms" className="hover:text-primary cursor-pointer transition-colors">Terms</Link>
                        <Link href="/privacy" className="hover:text-primary cursor-pointer transition-colors">Privacy</Link>
                        <Link href="/cookie-policy" className="hover:text-primary cursor-pointer transition-colors">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
