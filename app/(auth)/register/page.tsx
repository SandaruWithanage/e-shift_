'use client';
import { useState } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
    const [formData, setFormData] = useState({ username: '', password: '', name: '' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            await api.post('/auth/register', { ...formData, role: 'CUSTOMER' });
            router.push('/login');
        } catch (err: any) {
            setError('Registration failed. Username may already be taken.');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            {/* Decorative Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-400/30 to-teal-400/30 rounded-full blur-3xl animate-float" />
                <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
            </div>

            <div className="glass-card p-10 w-full max-w-md animate-scale-in relative z-10">
                {/* Logo & Header */}
                <div className="text-center mb-8 animate-fade-in-up">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-teal-500 shadow-lg mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                        Create Account
                    </h1>
                    <p className="text-neutral-500 mt-2">Join e-Shift Transport today</p>
                </div>

                {/* Error Alert */}
                {error && (
                    <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm animate-fade-in-up flex items-center gap-3">
                        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {error}
                    </div>
                )}

                <form onSubmit={handleRegister} className="space-y-5">
                    <div className="animate-fade-in-up stagger-1" style={{ opacity: 0, animationFillMode: 'forwards' }}>
                        <label className="block text-sm font-semibold text-neutral-700 mb-2">Full Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="input-field"
                            placeholder="Enter your full name"
                            required
                        />
                    </div>

                    <div className="animate-fade-in-up stagger-2" style={{ opacity: 0, animationFillMode: 'forwards' }}>
                        <label className="block text-sm font-semibold text-neutral-700 mb-2">Username</label>
                        <input
                            type="text"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            className="input-field"
                            placeholder="Choose a username"
                            required
                        />
                    </div>

                    <div className="animate-fade-in-up stagger-3" style={{ opacity: 0, animationFillMode: 'forwards' }}>
                        <label className="block text-sm font-semibold text-neutral-700 mb-2">Password</label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="input-field"
                            placeholder="Create a password"
                            required
                        />
                    </div>

                    <div className="animate-fade-in-up stagger-4 pt-2" style={{ opacity: 0, animationFillMode: 'forwards' }}>
                        <button
                            type="submit"
                            className="w-full py-3 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-50"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <div className="loader w-5 h-5 border-2" />
                                    Creating account...
                                </>
                            ) : (
                                <>
                                    Create Account
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </>
                            )}
                        </button>
                    </div>
                </form>

                <div className="mt-8 text-center animate-fade-in-up stagger-5" style={{ opacity: 0, animationFillMode: 'forwards' }}>
                    <p className="text-neutral-500">
                        Already have an account?{' '}
                        <Link href="/login" className="font-semibold text-green-600 hover:text-green-700 transition-colors">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
