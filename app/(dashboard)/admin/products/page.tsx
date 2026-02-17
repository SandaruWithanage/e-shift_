'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import Link from 'next/link';

export default function AdminProductsPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [form, setForm] = useState({ name: '', description: '', price: '' });
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchProducts = () => {
        api.get('/products').then(res => {
            setProducts(res.data);
            setLoading(false);
        }).catch(() => setLoading(false));
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this product?')) {
            await api.delete(`/products/${id}`);
            fetchProducts();
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await api.post('/products', {
                ...form,
                price: form.price ? parseFloat(form.price) : undefined
            });
            setForm({ name: '', description: '', price: '' });
            fetchProducts();
        } catch (err) {
            alert('Failed to create product');
        }
        setIsSubmitting(false);
    };

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
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Manage Products
                        </h1>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Add Product Form */}
                    <div className="lg:col-span-1">
                        <div className="glass-card p-6 animate-slide-in-left">
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Add Product
                            </h3>
                            <form onSubmit={handleCreate} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-600 mb-2">Name</label>
                                    <input
                                        type="text"
                                        value={form.name}
                                        onChange={e => setForm({ ...form, name: e.target.value })}
                                        className="input-field"
                                        placeholder="Product name"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-neutral-600 mb-2">Description</label>
                                    <textarea
                                        value={form.description}
                                        onChange={e => setForm({ ...form, description: e.target.value })}
                                        className="input-field resize-none"
                                        rows={3}
                                        placeholder="Product description"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-neutral-600 mb-2">Price (Optional)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={form.price}
                                        onChange={e => setForm({ ...form, price: e.target.value })}
                                        className="input-field"
                                        placeholder="0.00"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-3 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-lg hover:shadow-purple-500/30 transition-all disabled:opacity-50"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Adding...' : 'Add Product'}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Products List */}
                    <div className="lg:col-span-2">
                        <div className="glass-card overflow-hidden animate-slide-in-right">
                            <div className="p-4 border-b border-neutral-200">
                                <h3 className="font-bold">Products ({products.length})</h3>
                            </div>
                            {loading ? (
                                <div className="flex justify-center py-16">
                                    <div className="loader"></div>
                                </div>
                            ) : products.length === 0 ? (
                                <div className="text-center py-16">
                                    <div className="text-6xl mb-4">📦</div>
                                    <p className="text-neutral-500">No products yet</p>
                                </div>
                            ) : (
                                <div className="divide-y divide-neutral-200">
                                    {products.map((p, index) => (
                                        <div
                                            key={p.id}
                                            className="p-4 flex items-center justify-between hover:bg-neutral-50 transition-colors animate-fade-in"
                                            style={{ animationDelay: `${index * 0.05}s` }}
                                        >
                                            <div>
                                                <h4 className="font-semibold text-neutral-800">{p.name}</h4>
                                                <p className="text-sm text-neutral-500 line-clamp-1">{p.description}</p>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                {p.price && (
                                                    <span className="font-bold text-green-600">${p.price}</span>
                                                )}
                                                <button
                                                    onClick={() => handleDelete(p.id)}
                                                    className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
