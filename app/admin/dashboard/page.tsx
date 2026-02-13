export default function AdminDashboard() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                <h3 className="text-slate-500 text-sm font-medium uppercase">Total Tools</h3>
                <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">124</p>
                <span className="text-green-500 text-sm flex items-center mt-2">
                    +12% from last month
                </span>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                <h3 className="text-slate-500 text-sm font-medium uppercase">Total Comparisons</h3>
                <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">1,024</p>
                <span className="text-green-500 text-sm flex items-center mt-2">
                    +5% from last month
                </span>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                <h3 className="text-slate-500 text-sm font-medium uppercase">Blog Posts</h3>
                <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">48</p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                <h3 className="text-slate-500 text-sm font-medium uppercase">Total Users</h3>
                <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">8,500</p>
            </div>
        </div>
    );
}
