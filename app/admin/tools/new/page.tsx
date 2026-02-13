"use client";

import ToolForm from "@/components/admin/ToolForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewToolPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link
                    href="/admin/tools"
                    className="p-2 rounded-full hover:bg-slate-100 transition"
                >
                    <ArrowLeft className="w-5 h-5 text-slate-500" />
                </Link>
                <h1 className="text-2xl font-bold">Add New SaaS Tool</h1>
            </div>
            <ToolForm />
        </div>
    );
}
