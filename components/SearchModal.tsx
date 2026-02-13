"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, Loader2, Package, Folder, Scale, ArrowRight, CornerDownLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface SearchResult {
    tools: any[];
    categories: any[];
    comparisons: any[];
}

export default function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const modalRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
            setQuery("");
            setResults(null);
        }
    }, [isOpen]);

    useEffect(() => {
        const timer = setTimeout(async () => {
            if (query.length >= 2) {
                setIsLoading(true);
                try {
                    const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
                    const data = await res.json();
                    setResults(data);
                    setSelectedIndex(0);
                } catch (err) {
                    console.error("Search error:", err);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setResults(null);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                onClose();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    if (!isOpen) return null;

    const flattenedResults = results ? [
        ...results.tools.map(t => ({ ...t, type: 'tool' })),
        ...results.categories.map(c => ({ ...c, type: 'category' })),
        ...results.comparisons.map(comp => ({ ...comp, type: 'comparison' }))
    ] : [];

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedIndex(prev => (prev + 1) % flattenedResults.length);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedIndex(prev => (prev - 1 + flattenedResults.length) % flattenedResults.length);
        } else if (e.key === "Enter" && flattenedResults[selectedIndex]) {
            e.preventDefault();
            const item = flattenedResults[selectedIndex];
            const url = item.type === 'tool' ? `/product/${item.slug}` :
                item.type === 'category' ? `/category/${item.slug}` :
                    `/compare/${item.slug}`;
            router.push(url);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4 md:px-6">
            <div className="absolute inset-0 bg-background/40 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose} />

            <div
                ref={modalRef}
                className="relative w-full max-w-2xl bg-card/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-[0_32px_128px_rgba(0,0,0,0.3)] overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col"
            >
                <div className="p-6 border-b border-white/5 flex items-center gap-4">
                    <Search className={`w-6 h-6 ${isLoading ? "text-primary animate-pulse" : "text-muted-foreground"}`} />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Search for tools, categories, or comparisons..."
                        className="flex-1 bg-transparent border-none outline-none text-xl font-medium placeholder:text-muted-foreground/50"
                    />
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/5 rounded-xl text-muted-foreground transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto max-h-[60vh] custom-scrollbar">
                    {query.length < 2 ? (
                        <div className="p-12 text-center space-y-4">
                            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto text-primary">
                                <Search className="w-8 h-8" />
                            </div>
                            <div>
                                <h3 className="text-lg font-black tracking-tight">Search SaaS Compare Pro</h3>
                                <p className="text-muted-foreground text-sm font-medium">Type tool names (HubSpot), categories (CRM), or comparisons (Notion vs ClickUp)</p>
                            </div>
                        </div>
                    ) : isLoading ? (
                        <div className="p-12 text-center h-[200px] flex flex-col items-center justify-center gap-4">
                            <Loader2 className="w-8 h-8 text-primary animate-spin" />
                            <p className="text-muted-foreground font-medium animate-pulse">Searching the software directory...</p>
                        </div>
                    ) : flattenedResults.length > 0 ? (
                        <div className="p-4 space-y-6">
                            {/* Tools Section */}
                            {(results?.tools?.length ?? 0) > 0 && (
                                <section>
                                    <h4 className="px-4 mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Tools</h4>
                                    <div className="space-y-1">
                                        {results?.tools.map((tool, i) => {
                                            const globalIndex = results.tools.indexOf(tool);
                                            return (
                                                <Link
                                                    key={tool.slug}
                                                    href={`/product/${tool.slug}`}
                                                    onClick={onClose}
                                                    className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all group ${selectedIndex === globalIndex ? "bg-primary/10 border-primary/20 shadow-sm" : "hover:bg-white/5 border-transparent"}`}
                                                    onMouseEnter={() => setSelectedIndex(globalIndex)}
                                                >
                                                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center p-2 shadow-sm shrink-0 border border-white/10 relative">
                                                        <Image
                                                            src={tool.logoUrl || "https://avatar.vercel.sh/saas"}
                                                            alt={tool.name}
                                                            fill
                                                            className="object-contain p-2"
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-bold text-sm truncate">{tool.name}</p>
                                                        <p className="text-xs text-muted-foreground truncate font-medium">{tool.shortDescription}</p>
                                                    </div>
                                                    {selectedIndex === globalIndex && <CornerDownLeft className="w-4 h-4 text-primary shrink-0 opacity-50" />}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </section>
                            )}

                            {/* Categories Section */}
                            {(results?.categories?.length ?? 0) > 0 && (
                                <section>
                                    <h4 className="px-4 mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Categories</h4>
                                    <div className="space-y-1">
                                        {results?.categories.map((cat, i) => {
                                            const globalIndex = results?.tools.length + i;
                                            return (
                                                <Link
                                                    key={cat.slug}
                                                    href={`/category/${cat.slug}`}
                                                    onClick={onClose}
                                                    className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all group ${selectedIndex === globalIndex ? "bg-primary/10 border-primary/20 shadow-sm" : "hover:bg-white/5 border-transparent"}`}
                                                    onMouseEnter={() => setSelectedIndex(globalIndex)}
                                                >
                                                    <div className="w-10 h-10 bg-indigo-500/10 rounded-lg flex items-center justify-center text-indigo-500 shrink-0 border border-indigo-500/10">
                                                        <Folder className="w-5 h-5" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-bold text-sm truncate">{cat.name}</p>
                                                    </div>
                                                    {selectedIndex === globalIndex && <CornerDownLeft className="w-4 h-4 text-primary shrink-0 opacity-50" />}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </section>
                            )}

                            {/* Comparisons Section */}
                            {(results?.comparisons?.length ?? 0) > 0 && (
                                <section>
                                    <h4 className="px-4 mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Comparisons</h4>
                                    <div className="space-y-1">
                                        {results?.comparisons.map((comp, i) => {
                                            const globalIndex = results?.tools.length + results?.categories.length + i;
                                            return (
                                                <Link
                                                    key={comp.slug}
                                                    href={`/compare/${comp.slug}`}
                                                    onClick={onClose}
                                                    className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all group ${selectedIndex === globalIndex ? "bg-primary/10 border-primary/20 shadow-sm" : "hover:bg-white/5 border-transparent"}`}
                                                    onMouseEnter={() => setSelectedIndex(globalIndex)}
                                                >
                                                    <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-500 shrink-0 border border-emerald-500/10">
                                                        <Scale className="w-5 h-5" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-bold text-sm truncate">{comp.title}</p>
                                                    </div>
                                                    {selectedIndex === globalIndex && <CornerDownLeft className="w-4 h-4 text-primary shrink-0 opacity-50" />}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </section>
                            )}
                        </div>
                    ) : (
                        <div className="p-12 text-center space-y-4">
                            <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto text-muted-foreground/40">
                                <Package className="w-8 h-8" />
                            </div>
                            <div>
                                <h3 className="text-lg font-black tracking-tight">No results for &quot;{query}&quot;</h3>
                                <p className="text-muted-foreground text-sm font-medium">Try another keyword or browse our categories.</p>
                            </div>
                            <Link
                                href="/categories"
                                onClick={onClose}
                                className="inline-flex items-center gap-2 text-primary font-bold hover:underline"
                            >
                                Browse all categories <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    )}
                </div>

                <div className="p-4 border-t border-white/5 bg-muted/30 flex items-center justify-between text-xs font-semibold text-muted-foreground">
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1.5"><kbd className="px-1.5 py-0.5 rounded border border-border bg-card">↑↓</kbd> to navigate</span>
                        <span className="flex items-center gap-1.5"><kbd className="px-1.5 py-0.5 rounded border border-border bg-card">Enter</kbd> to select</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <kbd className="px-1.5 py-0.5 rounded border border-border bg-card">Esc</kbd> to close
                    </div>
                </div>
            </div>
        </div>
    );
}
