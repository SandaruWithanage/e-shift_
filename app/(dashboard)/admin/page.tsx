'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import Link from 'next/link';

export default function AdminDashboard() {
    const [stats, setStats] = useState({ totalJobs: 0, pendingJobs: 0, completedJobs: 0, totalCustomers: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/reports/summary').then(res => {
            setStats(res.data);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, []);

    const statCards = [
        { label: 'Total Jobs', value: stats.totalJobs, icon: '📦', gradient: 'from-blue-500 to-indigo-600', shadow: 'shadow-blue-500/25' },
        { label: 'Pending Jobs', value: stats.pendingJobs, icon: '⏳', gradient: 'from-amber-500 to-orange-600', shadow: 'shadow-amber-500/25' },
        { label: 'Completed', value: stats.completedJobs, icon: '✅', gradient: 'from-emerald-500 to-green-600', shadow: 'shadow-emerald-500/25' },
        { label: 'Customers', value: stats.totalCustomers, icon: '👥', gradient: 'from-purple-500 to-pink-600', shadow: 'shadow-purple-500/25' },
    ];

    const menuItems = [
        { href: '/admin/jobs', label: 'Manage Jobs', icon: '📋', desc: 'Review and approve transport requests', gradient: 'from-blue-500 to-blue-600' },
        { href: '/admin/products', label: 'Manage Products', icon: '📦', desc: 'Configure available transport products', gradient: 'from-purple-500 to-purple-600' },
        { href: '/admin/customers', label: 'Manage Customers', icon: '👥', desc: 'View and manage customer accounts', gradient: 'from-teal-500 to-teal-600' },
    ];

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-10 animate-fade-in-up">
                    <p className="text-neutral-500 mb-1">Admin Console</p>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Dashboard
                    </h1>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {statCards.map((stat, i) => (
                        <div
                            key={stat.label}
                            className={`stat-card overflow-hidden animate-fade-in-up`}
                            style={{ animationDelay: `${i * 0.1}s`, opacity: 0, animationFillMode: 'forwards' }}
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-neutral-500 text-sm font-medium">{stat.label}</p>
                                    {loading ? (
                                        <div className="h-9 w-16 bg-neutral-200 rounded animate-pulse mt-2"></div>
                                    ) : (
                                        <p className="text-4xl font-bold mt-1">{stat.value}</p>
                                    )}
                                </div>
                                <div className={`text-3xl p-3 rounded-2xl bg-gradient-to-br ${stat.gradient} ${stat.shadow} shadow-lg`}>
                                    {stat.icon}
                                </div>
                            </div>
                            <div className={`mt-4 h-1 w-full rounded-full bg-gradient-to-r ${stat.gradient} opacity-20`}></div>
                        </div>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="glass-card p-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Quick Actions
                    </h2>

                    <div className="grid md:grid-cols-3 gap-6">
                        {menuItems.map((item, i) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="group p-6 rounded-2xl border-2 border-neutral-200 hover:border-transparent bg-white/50 hover:bg-gradient-to-br transition-all duration-300 hover:shadow-xl animate-slide-in-left"
                                style={{ animationDelay: `${(i + 4) * 0.1}s`, opacity: 0, animationFillMode: 'forwards' }}
                            >
                                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} text-3xl mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                                    {item.icon}
                                </div>
                                <h3 className="text-lg font-bold text-neutral-800 mb-1">{item.label}</h3>
                                <p className="text-sm text-neutral-500">{item.desc}</p>
                                <div className="mt-4 flex items-center text-sm font-semibold text-blue-600 group-hover:text-blue-700">
                                    Open
                                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
