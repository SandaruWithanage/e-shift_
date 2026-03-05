import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-900">
      <header className="px-6 py-4 flex items-center justify-between border-b bg-white border-slate-200 shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-500/20">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">e-Shift</span>
        </div>
        <nav className="flex gap-4">
          <Link href="/login" className="px-5 py-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Sign In</Link>
          <Link href="/register" className="px-5 py-2 text-sm font-semibold bg-blue-600 text-white rounded-xl shadow-md shadow-blue-500/20 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 transition-all">Get Started</Link>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 py-20 relative overflow-hidden">
        {/* Background Decorative Blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full -z-10 pointer-events-none opacity-50">
           <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
           <div className="absolute top-20 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
           <div className="absolute -bottom-8 left-1/2 text-emerald-400 w-72 h-72 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
          Household Moves,<br className="hidden md:block" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Simplified.</span>
        </h1>
        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          e-Shift is your modern transport management system. Book your move, track your goods in real-time, and experience a stress-free transition to your new home.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/customer/dashboard" className="px-8 py-4 text-base font-bold bg-slate-900 text-white rounded-2xl shadow-xl shadow-slate-900/20 hover:scale-105 transition-all">
            Book a Transport
          </Link>
          <Link href="/about" className="px-8 py-4 text-base font-bold bg-white text-slate-700 border border-slate-200 rounded-2xl hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
            Learn More
          </Link>
        </div>

        <div className="mt-28 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-sm border border-slate-100 text-left hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Fast Scheduling</h3>
                <p className="text-slate-600 leading-relaxed text-sm">Pick a date and time that works for you. Our intelligent system matches you with the right vehicle and driver instantly.</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-sm border border-slate-100 text-left hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Secure Transport</h3>
                <p className="text-slate-600 leading-relaxed text-sm">Your goods are comprehensively insured and handled by strict professionals at every single step of the journey.</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-sm border border-slate-100 text-left hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Live Tracking</h3>
                <p className="text-slate-600 leading-relaxed text-sm">Follow your move in real time on our interactive map dashboard. Never wonder where your belongings are.</p>
            </div>
        </div>
      </main>
      
      <footer className="py-10 bg-white border-t border-slate-200 flex flex-col items-center justify-center gap-4">
        <div className="flex items-center gap-2 grayscale opacity-50">
            <div className="w-6 h-6 bg-slate-900 rounded-md flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            <span className="font-bold tracking-tight text-slate-900">e-Shift</span>
        </div>
        <p className="text-slate-500 text-sm font-medium">&copy; {new Date().getFullYear()} e-Shift Transport Management. All rights reserved.</p>
      </footer>
    </div>
  );
}
