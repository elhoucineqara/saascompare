"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Search, ChevronDown, LogOut, User, LayoutDashboard, Bell } from "lucide-react";
import SearchModal from "./SearchModal";

export default function Navbar() {
    const { data: session } = useSession();
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const isDashboard = pathname?.startsWith("/dashboard");

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setIsSearchOpen(true);
            }
        };
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled || isDashboard
                ? "bg-background/70 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.05)] py-3"
                : "bg-background/0 border-transparent py-5"
                } ${isDashboard ? "lg:left-72 lg:w-[calc(100%-18rem)]" : ""}`}
        >
            <div className="container mx-auto px-6 h-14 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/30 group-hover:rotate-6 group-hover:scale-110 transition-all duration-500">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M3 3v18h18" /><path d="M18 17V9" /><path d="M13 17V5" /><path d="M8 17v-3" /></svg>
                    </div>
                    <span className="font-black text-2xl tracking-tighter text-foreground group-hover:text-primary transition-colors">
                        SaaS<span className="text-primary italic">Compare</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                {!isDashboard && (
                    <nav className="hidden lg:flex items-center gap-10">
                        {['Categories', 'Pricing', 'Blog', 'About', 'Contact'].map((item) => (
                            <Link
                                key={item}
                                href={`/${item.toLowerCase()}`}
                                className="text-sm font-bold text-muted-foreground/80 hover:text-primary transition-all relative group"
                            >
                                {item}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                            </Link>
                        ))}
                    </nav>
                )}

                {/* Actions */}
                <div className="flex items-center gap-6">
                    {!isDashboard && (
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="hidden md:block text-muted-foreground/60 hover:text-primary transition-colors hover:scale-110"
                        >
                            <Search className="w-5 h-5" />
                        </button>
                    )}

                    {isDashboard && (
                        <button className="text-muted-foreground/60 hover:text-primary transition-colors relative group">
                            <Bell className="w-5 h-5" />
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full border-2 border-background"></span>
                        </button>
                    )}

                    {session?.user ? (
                        <div className="relative group">
                            <button className="flex items-center gap-3 pl-2 pr-4 py-1.5 rounded-full border border-border/50 bg-card/50 hover:bg-card hover:border-primary/30 transition-all">
                                {session.user.image ? (
                                    <Image src={session.user.image} alt={session.user.name || "User"} width={32} height={32} className="rounded-full border border-white/20" />
                                ) : (
                                    <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center font-black text-xs">
                                        {session.user.name?.charAt(0) || "U"}
                                    </div>
                                )}
                                <span className="text-sm font-bold text-foreground lg:block hidden max-w-[100px] truncate">{session.user.name}</span>
                                <ChevronDown className="w-4 h-4 text-muted-foreground" />
                            </button>

                            {/* Dropdown */}
                            <div className="absolute right-0 top-full mt-3 w-56 bg-card/95 backdrop-blur-xl rounded-[1.5rem] shadow-2xl border border-border/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top-right translate-y-2 group-hover:translate-y-0 p-2 z-50">
                                {session.user.role === 'admin' && (
                                    <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-xl transition-colors">
                                        <LayoutDashboard className="w-4 h-4" /> Admin Console
                                    </Link>
                                )}
                                <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-xl transition-colors">
                                    <User className="w-4 h-4" /> My Analytics
                                </Link>
                                <div className="h-px bg-border/50 my-1 mx-2" />
                                <button
                                    onClick={() => signOut()}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-500/10 rounded-xl transition-colors"
                                >
                                    <LogOut className="w-4 h-4" /> Sign Out
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link href="/login" className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors">Login</Link>
                            <Link href="/register" className="bg-primary text-white px-7 py-2.5 rounded-full text-sm font-black shadow-xl shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 transition-all">
                                Get Started
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-muted/50 text-foreground active:scale-95 transition-transform"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-20 left-4 right-4 bg-card/95 backdrop-blur-2xl rounded-[2rem] border border-border shadow-2xl p-6 animate-fade-in-up">
                    <nav className="flex flex-col gap-4">
                        {['Categories', 'Pricing', 'Blog', 'About', 'Contact'].map((item) => (
                            <Link
                                key={item}
                                href={`/${item.toLowerCase()}`}
                                className="text-xl font-black text-foreground/80 hover:text-primary py-4 border-b border-border/50"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {item}
                            </Link>
                        ))}

                        <button
                            onClick={() => {
                                setIsMobileMenuOpen(false);
                                setIsSearchOpen(true);
                            }}
                            className="w-full flex items-center gap-4 py-4 border-b border-border/50 text-xl font-black text-foreground/80 hover:text-primary transition-colors"
                        >
                            <Search className="w-6 h-6" /> Search Tools
                        </button>

                        {!session ? (
                            <div className="flex flex-col gap-4 mt-6">
                                <Link href="/login" className="w-full text-center py-4 rounded-2xl border border-border font-bold text-foreground">Sign In</Link>
                                <Link href="/register" className="w-full text-center py-4 rounded-2xl bg-primary text-white font-black shadow-lg">Create Free Account</Link>
                            </div>
                        ) : (
                            <button onClick={() => signOut()} className="w-full text-center py-4 rounded-2xl bg-red-500/10 text-red-500 font-black mt-6">Sign Out</button>
                        )}
                    </nav>
                </div>
            )}

            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </header>
    );
}
