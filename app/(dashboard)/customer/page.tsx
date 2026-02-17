'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import Link from 'next/link';

export default function CustomerDashboard() {
    const [jobs, setJobs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            setUserName(user.name || user.username || 'Customer');
        }
        api.get('/jobs').then(res => {
            setJobs(res.data);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, []);

    const getStatusBadge = (status: string) => {
        const badges: Record<string, string> = {
            PENDING: 'badge badge-pending',
            ACCEPTED: 'badge badge-accepted',
            DECLINED: 'badge badge-declined',
            COMPLETED: 'badge badge-completed'
        };
        return badges[status] || 'badge';
    };

    return (
        <div className="min-h-screen p-8">
            {/* Header */}
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10 animate-fade-in-up">
                    <div>
                        <p className="text-neutral-500 mb-1">Welcome back,</p>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {userName}
                        </h1>
                    </div>
                    <Link
                        href="/customer/create-job"
                        className="btn-primary inline-flex items-center gap-2 self-start"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Request Transport
                    </Link>
                </div>

                {/* Stats Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {[
                        { label: 'Total Jobs', value: jobs.length, icon: '📦', color: 'from-blue-500 to-blue-600' },
                        { label: 'Pending', value: jobs.filter(j => j.status === 'PENDING').length, icon: '⏳', color: 'from-amber-500 to-orange-500' },
                        { label: 'Completed', value: jobs.filter(j => j.status === 'COMPLETED').length, icon: '✅', color: 'from-green-500 to-emerald-500' },
                    ].map((stat, i) => (
                        <div
                            key={stat.label}
                            className="stat-card animate-fade-in-up"
                            style={{ animationDelay: `${i * 0.1}s`, opacity: 0, animationFillMode: 'forwards' }}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-neutral-500 text-sm font-medium">{stat.label}</p>
                                    <p className="text-3xl font-bold mt-1">{stat.value}</p>
                                </div>
                                <div className={`text-4xl p-3 rounded-2xl bg-gradient-to-br ${stat.color} bg-opacity-10`}>
                                    {stat.icon}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Jobs List */}
                <div className="glass-card p-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        My Transport Jobs
                    </h2>

                    {loading ? (
                        <div className="flex justify-center py-10">
                            <div className="loader"></div>
                        </div>
                    ) : jobs.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-4">📭</div>
                            <p className="text-neutral-500 text-lg">No jobs yet</p>
                            <p className="text-neutral-400 text-sm mt-1">Create your first transport request to get started</p>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {jobs.map((job, index) => (
                                <div
                                    key={job.id}
                                    className="p-5 rounded-xl border border-neutral-200 hover:border-blue-300 bg-white/50 hover:bg-white transition-all duration-300 hover:shadow-md animate-slide-in-left"
                                    style={{ animationDelay: `${index * 0.05}s`, opacity: 0, animationFillMode: 'forwards' }}
                                >
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="text-sm text-neutral-400 font-mono">#{job.jobId?.slice(0, 8) || job.id}</span>
                                                <span className={getStatusBadge(job.status)}>{job.status}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-neutral-700">
                                                <span className="font-medium">{job.pickupLocation}</span>
                                                <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                                <span className="font-medium">{job.destination}</span>
                                            </div>
                                        </div>
                                        {job.loads?.length > 0 && (
                                            <div className="text-sm text-neutral-500 flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                                </svg>
                                                {job.loads.length} load(s)
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
