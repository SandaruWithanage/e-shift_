'use client';
import { useState } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CreateJobPage() {
    const [formData, setFormData] = useState({ pickupLocation: '', destination: '', loadDescription: '', loadWeight: '' });
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await api.post('/jobs', {
                ...formData,
                loadWeight: formData.loadWeight ? parseFloat(formData.loadWeight) : undefined
            });
            router.push('/customer');
        } catch (err) {
            alert('Failed to create job');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-2xl mx-auto">
                {/* Back Button */}
                <Link
                    href="/customer"
                    className="inline-flex items-center gap-2 text-neutral-500 hover:text-neutral-700 mb-6 transition-colors animate-fade-in"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Dashboard
                </Link>

                <div className="glass-card p-8 animate-scale-in">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30 mb-4">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            Request Transport
                        </h1>
                        <p className="text-neutral-500 mt-2">Fill in the details for your transport job</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Locations Section */}
                        <div className="space-y-5">
                            <div className="animate-fade-in-up stagger-1" style={{ opacity: 0, animationFillMode: 'forwards' }}>
                                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                                    <span className="flex items-center gap-2">
                                        <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">A</span>
                                        Pickup Location
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.pickupLocation}
                                    onChange={e => setFormData({ ...formData, pickupLocation: e.target.value })}
                                    className="input-field"
                                    placeholder="Enter pickup address"
                                    required
                                />
                            </div>

                            <div className="animate-fade-in-up stagger-2" style={{ opacity: 0, animationFillMode: 'forwards' }}>
                                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                                    <span className="flex items-center gap-2">
                                        <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs">B</span>
                                        Destination
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.destination}
                                    onChange={e => setFormData({ ...formData, destination: e.target.value })}
                                    className="input-field"
                                    placeholder="Enter destination address"
                                    required
                                />
                            </div>
                        </div>

                        {/* Load Details Section */}
                        <div className="border-t border-neutral-200 pt-6 animate-fade-in-up stagger-3" style={{ opacity: 0, animationFillMode: 'forwards' }}>
                            <h3 className="text-lg font-semibold text-neutral-800 mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                                Load Details <span className="text-sm font-normal text-neutral-400">(Optional)</span>
                            </h3>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-600 mb-2">Description</label>
                                    <input
                                        type="text"
                                        value={formData.loadDescription}
                                        onChange={e => setFormData({ ...formData, loadDescription: e.target.value })}
                                        className="input-field"
                                        placeholder="e.g., Furniture, boxes"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-neutral-600 mb-2">Weight (kg)</label>
                                    <input
                                        type="number"
                                        value={formData.loadWeight}
                                        onChange={e => setFormData({ ...formData, loadWeight: e.target.value })}
                                        className="input-field"
                                        placeholder="Approximate weight"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4 animate-fade-in-up stagger-4" style={{ opacity: 0, animationFillMode: 'forwards' }}>
                            <button
                                type="submit"
                                className="btn-primary w-full flex items-center justify-center gap-2"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <div className="loader w-5 h-5 border-2"></div>
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        Submit Request
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
