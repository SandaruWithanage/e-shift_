'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import Link from 'next/link';

export default function AdminJobsPage() {
    const [jobs, setJobs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchJobs = () => {
        api.get('/jobs').then(res => {
            setJobs(res.data);
            setLoading(false);
        }).catch(() => setLoading(false));
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const updateStatus = async (id: number, status: string) => {
        try {
            await api.patch(`/jobs/${id}`, { status });
            fetchJobs();
        } catch (err) {
            alert('Failed to update status');
        }
    };

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
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8 animate-fade-in-up">
                    <div className="flex items-center gap-4">
                        <Link href="/admin" className="p-2 rounded-xl hover:bg-white/50 transition-colors">
                            <svg className="w-6 h-6 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </Link>
                        <div>
                            <p className="text-neutral-500 text-sm">Admin</p>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                Manage Jobs
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="glass-card overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    {loading ? (
                        <div className="flex justify-center py-16">
                            <div className="loader"></div>
                        </div>
                    ) : jobs.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-4">📭</div>
                            <p className="text-neutral-500 text-lg">No jobs found</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Job ID</th>
                                        <th>Customer</th>
                                        <th>Route</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {jobs.map((job, index) => (
                                        <tr
                                            key={job.id}
                                            className="animate-slide-in-left"
                                            style={{ animationDelay: `${index * 0.03}s`, opacity: 0, animationFillMode: 'forwards' }}
                                        >
                                            <td className="font-mono text-sm text-neutral-500">#{job.jobId?.slice(0, 8) || job.id}</td>
                                            <td className="font-medium">{job.user?.username || 'N/A'}</td>
                                            <td>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <span>{job.pickupLocation}</span>
                                                    <svg className="w-4 h-4 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                    </svg>
                                                    <span>{job.destination}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <span className={getStatusBadge(job.status)}>{job.status}</span>
                                            </td>
                                            <td>
                                                <div className="flex gap-2">
                                                    {job.status === 'PENDING' && (
                                                        <>
                                                            <button
                                                                onClick={() => updateStatus(job.id, 'ACCEPTED')}
                                                                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-500 hover:shadow-lg hover:shadow-green-500/30 transition-all"
                                                            >
                                                                Accept
                                                            </button>
                                                            <button
                                                                onClick={() => updateStatus(job.id, 'DECLINED')}
                                                                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-red-500 to-rose-500 hover:shadow-lg hover:shadow-red-500/30 transition-all"
                                                            >
                                                                Decline
                                                            </button>
                                                        </>
                                                    )}
                                                    {job.status === 'ACCEPTED' && (
                                                        <button
                                                            onClick={() => updateStatus(job.id, 'COMPLETED')}
                                                            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:shadow-lg hover:shadow-blue-500/30 transition-all"
                                                        >
                                                            Mark Complete
                                                        </button>
                                                    )}
                                                    {job.status === 'COMPLETED' && (
                                                        <span className="text-xs text-neutral-400">No actions</span>
                                                    )}
                                                    {job.status === 'DECLINED' && (
                                                        <span className="text-xs text-neutral-400">Declined</span>
                                                    )}
                                                </div>
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
