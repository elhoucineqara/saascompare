"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (res?.error) {
                setError("Invalid email or password");
            } else {
                router.push("/dashboard");
                router.refresh();
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="relative min-h-screen flex items-center justify-center pt-24 pb-12 p-4 selection:bg-primary/20 selection:text-primary overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 -z-10 bg-grid-pattern opacity-40"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10">
                <div className="absolute top-[10%] left-0 w-96 h-96 bg-primary/20 rounded-full blur-[130px] animate-pulse-glow"></div>
                <div className="absolute bottom-[10%] right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-[130px] animate-pulse-glow" style={{ animationDelay: "2s" }}></div>
            </div>

            <div className="w-full max-w-md animate-fade-in-up">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-black tracking-tight mb-2">Welcome Back</h1>
                    <p className="text-muted-foreground font-semibold">
                        Enter your credentials to access your dashboard
                    </p>
                </div>

                <div className="glass-dark border border-white/10 p-10 rounded-[2.5rem] shadow-2xl">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-4 animate-shake">
                                <p className="text-sm font-bold text-red-500 text-center">{error}</p>
                            </div>
                        )}

                        <div className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">
                                    Email Address
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                                    </div>
                                    <input
                                        type="email"
                                        required
                                        className="w-full bg-background/50 border border-border/50 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                        placeholder="name@company.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center ml-1">
                                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                                        Password
                                    </label>
                                    <Link href="/forgot-password" title="Forgot Password" className="text-xs font-bold text-primary hover:underline">
                                        Forgot?
                                    </Link>
                                </div>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                                    </div>
                                    <input
                                        type="password"
                                        required
                                        className="w-full bg-background/50 border border-border/50 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary text-white py-4 rounded-2xl font-black text-sm shadow-xl shadow-primary/30 hover:shadow-primary/40 hover:-translate-y-1 active:translate-y-0 transition-all flex items-center justify-center gap-2 group"
                        >
                            {loading ? (
                                <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                            ) : (
                                <>
                                    Sign In to Platform
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-border/50 text-center">
                        <p className="text-sm font-bold text-muted-foreground">
                            Don&apos;t have an account?{" "}
                            <Link href="/register" className="text-primary hover:underline">
                                Start 14-day free trial
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
