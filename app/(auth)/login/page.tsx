'use client';
import { useState } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            const res = await api.post('/auth/login', { username, password });
            localStorage.setItem('token', res.data.access_token);
            localStorage.setItem('user', JSON.stringify(res.data.user));

            if (res.data.user.role === 'ADMIN') {
                router.push('/admin');
            } else {
                router.push('/customer');
            }
        } catch (err: any) {
            setError('Invalid credentials. Please try again.');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            {/* Decorative Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-3xl animate-float" />
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-orange-400/20 to-pink-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
            </div>

            <div className="glass-card p-10 w-full max-w-md animate-scale-in relative z-10">
                {/* Logo & Header */}
                <div className="text-center mb-8 animate-fade-in-up">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Welcome Back
                    </h1>
                    <p className="text-neutral-500 mt-2">Sign in to e-Shift Transport</p>
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

                <form onSubmit={handleLogin} className="space-y-5">
                    <div className="animate-fade-in-up stagger-1" style={{ opacity: 0, animationFillMode: 'forwards' }}>
                        <label className="block text-sm font-semibold text-neutral-700 mb-2">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="input-field"
                            placeholder="Enter your username"
                            required
                        />
                    </div>

                    <div className="animate-fade-in-up stagger-2" style={{ opacity: 0, animationFillMode: 'forwards' }}>
                        <label className="block text-sm font-semibold text-neutral-700 mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input-field"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <div className="animate-fade-in-up stagger-3 pt-2" style={{ opacity: 0, animationFillMode: 'forwards' }}>
                        <button
                            type="submit"
                            className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <div className="loader w-5 h-5 border-2" />
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    Sign In
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </>
                            )}
                        </button>
                    </div>
                </form>

                <div className="mt-8 text-center animate-fade-in-up stagger-4" style={{ opacity: 0, animationFillMode: 'forwards' }}>
                    <p className="text-neutral-500">
                        Don&apos;t have an account?{' '}
                        <Link href="/register" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                            Create Account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
