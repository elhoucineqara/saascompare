"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, Loader2, Package, Tag, Scale } from "lucide-react";
import Link from "next/link";

export default function HeroSearch() {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<{ tools: any[], categories: any[], comparisons: any[] } | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const router = useRouter();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const timer = setTimeout(async () => {
            if (query.length >= 2) {
                setIsLoading(true);
                try {
                    const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
                    const data = await res.json();
                    setSuggestions(data);
                    setShowSuggestions(true);
                } catch (err) {
                    console.error("Search error:", err);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setSuggestions(null);
                setShowSuggestions(false);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        // Handle "Tool vs Tool" queries
        if (query.toLowerCase().includes(" vs ")) {
            const parts = query.toLowerCase().split(" vs ");
            if (parts.length === 2) {
                const slug1 = parts[0].trim().replace(/\s+/g, "-");
                const slug2 = parts[1].trim().replace(/\s+/g, "-");
                router.push(`/compare/${slug1}-vs-${slug2}`);
                setShowSuggestions(false);
                return;
            }
        }

        router.push(`/categories?q=${encodeURIComponent(query.trim())}`);
        setShowSuggestions(false);
    };

    return (
        <div ref={containerRef} className="w-full max-w-2xl relative">
            <form onSubmit={handleSearch} className="relative z-20">
                <div className="relative flex items-center w-full">
                    <Search className={`absolute left-5 w-5 h-5 ${isLoading ? "text-primary animate-pulse" : "text-muted-foreground"}`} />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => query.length >= 2 && setShowSuggestions(true)}
                        placeholder="Compare tools (e.g. Salesforce vs HubSpot...)"
                        className="flex h-16 w-full rounded-full border border-white/20 bg-background/80 backdrop-blur-xl pl-14 pr-36 text-lg ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 shadow-2xl transition-all"
                    />
                    <button
                        type="submit"
                        className="absolute right-2 top-2 bottom-2 bg-primary text-primary-foreground hover:bg-primary/90 px-8 rounded-full font-black text-sm transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/25"
                    >
                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Search"}
                    </button>
                </div>
            </form>

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions && (
                <div className="absolute top-[calc(100%+10px)] left-0 right-0 bg-card/90 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-[0_32px_64px_rgba(0,0,0,0.2)] overflow-hidden z-10 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="p-4 max-h-[400px] overflow-y-auto custom-scrollbar">
                        {suggestions.tools.length > 0 && (
                            <div className="mb-4">
                                <h4 className="px-3 mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Top Matches</h4>
                                {suggestions.tools.map((tool) => (
                                    <Link
                                        key={tool.slug}
                                        href={`/product/${tool.slug}`}
                                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group"
                                        onClick={() => setShowSuggestions(false)}
                                    >
                                        <div className="w-8 h-8 bg-white rounded-lg p-1.5 shrink-0 border border-white/10">
                                            <img src={tool.logoUrl} alt={tool.name} className="w-full h-full object-contain" />
                                        </div>
                                        <span className="font-bold text-sm truncate">{tool.name}</span>
                                        <span className="ml-auto text-[10px] font-black text-primary opacity-0 group-hover:opacity-100 transition-opacity">VIEW</span>
                                    </Link>
                                ))}
                            </div>
                        )}

                        {suggestions.comparisons.length > 0 && (
                            <div className="mb-4">
                                <h4 className="px-3 mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Comparisons</h4>
                                {suggestions.comparisons.map((comp) => (
                                    <Link
                                        key={comp.slug}
                                        href={`/compare/${comp.slug}`}
                                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group"
                                        onClick={() => setShowSuggestions(false)}
                                    >
                                        <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-500 shrink-0">
                                            <Scale className="w-4 h-4" />
                                        </div>
                                        <span className="font-bold text-sm truncate">{comp.title}</span>
                                    </Link>
                                ))}
                            </div>
                        )}

                        {suggestions.tools.length === 0 && suggestions.categories.length === 0 && suggestions.comparisons.length === 0 && (
                            <div className="p-8 text-center text-muted-foreground">
                                <Package className="w-8 h-8 mx-auto mb-2 opacity-20" />
                                <p className="text-sm font-medium">No direct matches found</p>
                            </div>
                        )}
                    </div>
                    <div className="p-3 bg-muted/30 border-t border-white/5 text-center">
                        <Link
                            href={`/categories?q=${query}`}
                            className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline"
                            onClick={() => setShowSuggestions(false)}
                        >
                            View all results for "{query}"
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
