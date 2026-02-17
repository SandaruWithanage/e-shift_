'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import Link from 'next/link';

export default function AdminCustomersPage() {
    const [customers, setCustomers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/users').then(res => {
            const filtered = res.data.filter((u: any) => u.role === 'CUSTOMER');
            setCustomers(filtered);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, []);

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8 animate-fade-in-up">
                    <Link href="/admin" className="p-2 rounded-xl hover:bg-white/50 transition-colors">
                        <svg className="w-6 h-6 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </Link>
                    <div>
                        <p className="text-neutral-500 text-sm">Admin</p>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                            Manage Customers
                        </h1>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="stat-card animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-2xl shadow-lg shadow-teal-500/30">
                                👥
                            </div>
                            <div>
                                <p className="text-neutral-500 text-sm">Total Customers</p>
                                <p className="text-2xl font-bold">{customers.length}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="glass-card overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    {loading ? (
                        <div className="flex justify-center py-16">
                            <div className="loader"></div>
                        </div>
                    ) : customers.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-4">👥</div>
                            <p className="text-neutral-500 text-lg">No customers found</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Username</th>
                                        <th>Name</th>
                                        <th>Role</th>
                                        <th>Joined</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customers.map((c, index) => (
                                        <tr
                                            key={c.id}
                                            className="animate-slide-in-left"
                                            style={{ animationDelay: `${index * 0.03}s`, opacity: 0, animationFillMode: 'forwards' }}
                                        >
                                            <td className="font-mono text-sm text-neutral-500">#{c.id}</td>
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-cyan-400 flex items-center justify-center text-white text-sm font-semibold">
                                                        {c.username?.charAt(0).toUpperCase()}
                                                    </div>
                                                    <span className="font-medium">{c.username}</span>
                                                </div>
                                            </td>
                                            <td>{c.name || <span className="text-neutral-400">-</span>}</td>
                                            <td>
                                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-teal-100 text-teal-600">
                                                    {c.role}
                                                </span>
                                            </td>
                                            <td className="text-neutral-500">
                                                {new Date(c.createdAt).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
