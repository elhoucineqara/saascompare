import Link from "next/link";
import { Check } from "lucide-react";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "SaaS Pricing Comparison & Analysis - SaaS Compare Pro",
    description: "Compare pricing models across hundreds of SaaS tools. Find the best value CRM, Marketing, and Dev tools for your budget.",
    alternates: {
        canonical: "/pricing",
    },
};

export default function PricingPage() {
    return (
        <div className="container mx-auto px-4 py-20">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Pricing Plans</h1>
                <p className="text-xl text-slate-500 max-w-2xl mx-auto">
                    We help you find the best value for your money. Compare pricing models across hundreds of tools.
                </p>
            </div>

            {/* Example Pricing Grid - Static for now, could be dynamic featured tools */}
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {/* Free Tier */}
                <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border shadow-sm hover:shadow-xl transition-shadow">
                    <h3 className="text-2xl font-bold mb-4">Free Tools</h3>
                    <p className="text-slate-500 mb-6">Great for individuals and small startups just getting started.</p>
                    <div className="text-4xl font-bold mb-6">$0<span className="text-base text-slate-400 font-normal">/mo</span></div>
                    <ul className="space-y-4 mb-8">
                        <li className="flex gap-3"><Check className="text-green-500" /> Core Features</li>
                        <li className="flex gap-3"><Check className="text-green-500" /> Community Support</li>
                        <li className="flex gap-3"><Check className="text-green-500" /> Single User</li>
                    </ul>
                    <Link href="/categories" className="block w-full text-center py-3 border border-slate-300 rounded-lg hover:bg-slate-50 transition">Browse Free Tools</Link>
                </div>

                {/* Pro Tier */}
                <div className="bg-indigo-600 text-white p-8 rounded-2xl border shadow-lg transform md:-translate-y-4 relative">
                    <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">MOST POPULAR</div>
                    <h3 className="text-2xl font-bold mb-4">Pro Tools</h3>
                    <p className="text-indigo-100 mb-6">For growing businesses needing advanced functionality.</p>
                    <div className="text-4xl font-bold mb-6">$29<span className="text-base text-indigo-200 font-normal">/mo avg</span></div>
                    <ul className="space-y-4 mb-8">
                        <li className="flex gap-3"><Check className="text-white" /> Advanced Analytics</li>
                        <li className="flex gap-3"><Check className="text-white" /> Priority Support</li>
                        <li className="flex gap-3"><Check className="text-white" /> up to 5 Users</li>
                        <li className="flex gap-3"><Check className="text-white" /> API Access</li>
                    </ul>
                    <Link href="/categories" className="block w-full text-center py-3 bg-white text-indigo-600 rounded-lg font-bold hover:bg-indigo-50 transition">Compare Pro Tools</Link>
                </div>

                {/* Enterprise Tier */}
                <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border shadow-sm hover:shadow-xl transition-shadow">
                    <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
                    <p className="text-slate-500 mb-6">Custom solutions for large organizations and teams.</p>
                    <div className="text-4xl font-bold mb-6">Custom</div>
                    <ul className="space-y-4 mb-8">
                        <li className="flex gap-3"><Check className="text-green-500" /> Unlimited Users</li>
                        <li className="flex gap-3"><Check className="text-green-500" /> 24/7 Dedicated Support</li>
                        <li className="flex gap-3"><Check className="text-green-500" /> SSO & Security</li>
                        <li className="flex gap-3"><Check className="text-green-500" /> Custom Integrations</li>
                    </ul>
                    <Link href="/categories" className="block w-full text-center py-3 border border-slate-300 rounded-lg hover:bg-slate-50 transition">See Enterprise Solutions</Link>
                </div>
            </div>
        </div>
    );
}
