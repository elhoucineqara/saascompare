import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Zap, BarChart3, Globe2, Layers, Search, ShieldCheck, HelpCircle, Users, TrendingUp, ChevronRight } from "lucide-react";
import HeroSearch from "@/components/HeroSearch";

export const metadata: Metadata = {
  title: "SaaS Compare Pro - Find the Best Tools for Your Business",
  description: "Objective reviews and technical comparisons of thousands of software solutions. Compare CRM, Marketing, Dev Tools, and more to scale with confidence.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  const baseUrl = process.env.NEXTAUTH_URL || "https://saascompare.vercel.app";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "SaaS Compare Pro",
    "url": baseUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${baseUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "SaaS Compare Pro",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/icon.svg`
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen selection:bg-primary/30 selection:text-primary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-background">
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-grid-pattern opacity-40"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10">
          <div className="absolute top-[10%] left-[10%] w-72 h-72 bg-primary/20 rounded-full blur-[120px] animate-pulse-glow"></div>
          <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-indigo-500/20 rounded-full blur-[150px] animate-pulse-glow" style={{ animationDelay: "2s" }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-500/10 rounded-full blur-[200px] opacity-50"></div>
        </div>

        {/* Floating Shapes */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-10 w-4 h-4 rounded-full bg-primary/40 animate-float"></div>
          <div className="absolute top-3/4 right-20 w-6 h-6 rounded-full bg-indigo-500/30 animate-float" style={{ animationDelay: "1s" }}></div>
          <div className="absolute top-1/2 right-1/4 w-3 h-3 rounded-full bg-violet-400/40 animate-float" style={{ animationDelay: "2s" }}></div>
        </div>

        <div className="container px-4 md:px-6 relative">
          <div className="flex flex-col items-center text-center space-y-10">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary animate-fade-in-up shadow-[0_0_20px_rgba(99,102,241,0.2)]" style={{ animationDelay: "0.1s" }}>
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-ping"></span>
              The #1 SaaS Comparison Platform
            </div>

            <h1 className="text-5xl font-black tracking-tight sm:text-6xl md:text-7xl lg:text-8xl max-w-5xl mx-auto animate-fade-in-up leading-[1.1]" style={{ animationDelay: "0.2s" }}>
              Find the <span className="text-gradient">Best Tools</span> <br className="hidden md:block" /> for Your Success
            </h1>

            <p className="mx-auto max-w-[800px] text-muted-foreground md:text-xl lg:text-2xl animate-fade-in-up font-medium leading-relaxed" style={{ animationDelay: "0.3s" }}>
              Compare. Choose. Conquer. We analyze thousands of software solutions so you can scale your business with confidence.
            </p>

            {/* Functional Search Bar */}
            <div className="w-full max-w-2xl animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-violet-600 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                <HeroSearch />
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground font-medium">
                <span>Popular:</span>
                <Link href="/compare/notion-vs-clickup" className="hover:text-primary transition-colors">Notion vs ClickUp</Link>
                <span className="opacity-20">•</span>
                <Link href="/compare/salesforce-vs-hubspot" className="hover:text-primary transition-colors">Salesforce vs HubSpot</Link>
              </div>
            </div>

            {/* Dashboard Preview */}
            <div className="relative mt-12 mx-auto max-w-6xl rounded-3xl border border-white/20 bg-card/50 backdrop-blur-sm p-2 shadow-[0_0_50px_rgba(0,0,0,0.1)] overflow-hidden animate-fade-in-up group" style={{ animationDelay: "0.5s" }}>
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent pointer-events-none"></div>
              <div className="aspect-[16/9] relative bg-muted rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
                  alt="Product Dashboard"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By - With Floating Effect */}
      <section className="py-16 border-y bg-muted/20 relative overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-xs uppercase tracking-[0.2em] font-black text-muted-foreground/60">Trusted by modern teams worldwide</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
            <div className="flex items-center justify-center gap-3 font-bold text-2xl tracking-tighter hover:scale-110 transition-transform"><Zap className="fill-primary text-primary" /> TechFlow</div>
            <div className="flex items-center justify-center gap-3 font-bold text-2xl tracking-tighter hover:scale-110 transition-transform"><Globe2 className="text-blue-500" /> GlobalCorp</div>
            <div className="flex items-center justify-center gap-3 font-bold text-2xl tracking-tighter hover:scale-110 transition-transform"><Layers className="text-violet-500" /> StackMaster</div>
            <div className="flex items-center justify-center gap-3 font-bold text-2xl tracking-tighter hover:scale-110 transition-transform"><BarChart3 className="text-emerald-500" /> DataWise</div>
          </div>
        </div>
      </section>

      {/* Best-in-class Content */}
      <section className="py-32 relative bg-background">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-24 space-y-4">
            <h2 className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl text-gradient">Simplify Your Decision</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl font-medium">
              We&apos;ve meticulously reviewed thousands of tools so you don&apos;t have to.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "Browse",
                icon: Search,
                desc: "Explore 5,000+ curated tools across 50+ specialized categories.",
                color: "bg-blue-500/10 text-blue-500",
                delay: "0.1s"
              },
              {
                title: "Compare",
                icon: TrendingUp,
                desc: "Get deep, side-by-side technical breakdowns and pricing analysis.",
                color: "bg-primary/10 text-primary",
                delay: "0.2s"
              },
              {
                title: "Select",
                icon: CheckCircle2,
                desc: "Make confident choices backed by verified user data and expert reviews.",
                color: "bg-emerald-500/10 text-emerald-500",
                delay: "0.3s"
              }
            ].map((step, i) => (
              <div
                key={i}
                className="group relative h-full rounded-[2rem] border border-border/50 bg-card p-10 shadow-sm hover:shadow-2xl hover:border-primary/20 transition-all duration-500 animate-fade-in-up"
                style={{ animationDelay: step.delay }}
              >
                <div className={`mb-8 inline-flex h-16 w-16 items-center justify-center rounded-2xl ${step.color} shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                  <step.icon className="h-8 w-8" />
                </div>
                <h3 className="mb-4 text-2xl font-black">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed font-medium">{step.desc}</p>
                <div className="absolute top-0 right-0 p-8 text-8xl font-black text-foreground/[0.03] pointer-events-none group-hover:text-primary/5 transition-colors">
                  0{i + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Popular Categories</h2>
              <p className="text-muted-foreground md:text-lg">Explore the most searched software categories.</p>
            </div>
            <Link href="/categories" className="group flex items-center font-medium text-primary hover:underline">
              View all categories <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'CRM & Sales', count: '120+', icon: Users, color: 'text-blue-500' },
              { name: 'Project Mgmt', count: '85+', icon: Layers, color: 'text-indigo-500' },
              { name: 'Marketing', count: '200+', icon: Globe2, color: 'text-purple-500' },
              { name: 'Cybersecurity', count: '150+', icon: ShieldCheck, color: 'text-red-500' },
              { name: 'Analytics', count: '90+', icon: BarChart3, color: 'text-green-500' },
              { name: 'Support', count: '110+', icon: HelpCircle, color: 'text-orange-500' },
              { name: 'HR', count: '75+', icon: Users, color: 'text-pink-500' },
              { name: 'Dev Tools', count: '300+', icon: Zap, color: 'text-cyan-500' },
            ].map((cat, i) => (
              <Link href={`/category/${cat.name.toLowerCase().replace(/ /g, '-').replace('&', 'and')}`} key={i} className="group flex flex-col justify-between rounded-xl border bg-card p-6 shadow-sm transition-all hover:bg-accent hover:text-accent-foreground hover:shadow-md">
                <div className="flex items-start justify-between">
                  <cat.icon className={`h-8 w-8 ${cat.color} group-hover:text-foreground transition-colors`} />
                  <span className="text-sm text-muted-foreground group-hover:text-accent-foreground/60">{cat.count}</span>
                </div>
                <div className="mt-4">
                  <h3 className="font-semibold">{cat.name}</h3>
                  <p className="text-sm text-muted-foreground group-hover:text-accent-foreground/60 mt-1 flex items-center">
                    Browse <ChevronRight className="ml-1 h-3 w-3" />
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Comparisons */}
      <section className="py-24 bg-background">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-center mb-16">Head-to-Head Comparisons</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              { p1: "Salesforce", p2: "HubSpot", desc1: "Enterprise Power", desc2: "User Experience" },
              { p1: "Slack", p2: "Teams", desc1: "Best for Devs", desc2: "Office 365" },
              { p1: "Notion", p2: "ClickUp", desc1: "Flexible Docs", desc2: "Features Packed" },
              { p1: "Linear", p2: "Jira", desc1: "Speed & Design", desc2: "Comprehensive" }
            ].map((comp, i) => (
              <Link key={i} href={`/compare/${comp.p1.toLowerCase()}-vs-${comp.p2.toLowerCase()}`} className="group relative flex items-center gap-4 rounded-xl border bg-card p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-md">
                <div className="flex-1 text-right">
                  <h3 className="font-bold text-lg">{comp.p1}</h3>
                  <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
                    {comp.desc1}
                  </span>
                </div>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted font-bold text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  VS
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-bold text-lg">{comp.p2}</h3>
                  <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
                    {comp.desc2}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="container px-4 md:px-6 relative z-10 text-center space-y-8">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Scale?</h2>
          <p className="mx-auto max-w-[600px] text-primary-foreground/80 md:text-xl">
            Join 50,000+ founders and CTOs who use SaaS Compare Pro to build their tech stacks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="inline-flex h-12 items-center justify-center rounded-md bg-background px-8 text-sm font-medium text-foreground shadow transition-colors hover:bg-background/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
              Start Comparing Free
            </Link>
            <Link href="/about" className="inline-flex h-12 items-center justify-center rounded-md border border-primary-foreground/20 bg-primary-foreground/10 px-8 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary-foreground/20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
