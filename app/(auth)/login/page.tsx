'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';

export default function LuxuryLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    console.log('📤 Login attempt:', email);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      console.log('📥 SignIn result:', result);

      if (result?.error) {
        console.log('❌ Login error:', result.error);
        setError('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
        setLoading(false);
        return;
      }

      if (result?.ok) {
        console.log('✅ Login successful, fetching session...');

        // Redirect ตาม role (ดึงจาก session)
        const response = await fetch('/api/auth/session');
        const session = await response.json();

        console.log('📋 Session data:', session);

        if (session?.user?.roleId === 1) {
          router.push('/dashboard/seeker');
        } else if (session?.user?.roleId === 2) {
          router.push('/dashboard/shop');
        } else {
          router.push('/');
        }

        router.refresh();
      }
    } catch (error) {
      console.error('❌ Login catch error:', error);
      setError('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-red-50 to-pink-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Grain Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
      }}></div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          {/* Logo Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center mb-6 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-300 to-rose-300 blur-xl opacity-40 animate-pulse"></div>
              <div className="relative bg-white p-5 rounded-2xl border border-red-100 shadow-2xl">
                <Sparkles className="w-10 h-10 text-red-400" strokeWidth={1.5} />
              </div>
            </div>
            <h1 className="text-5xl font-light text-gray-800 mb-3 tracking-tight">
              Part-time <span className="font-semibold bg-gradient-to-r from-red-400 via-rose-400 to-red-400 bg-clip-text text-transparent">Match</span>
            </h1>
            <p className="text-gray-600 text-sm tracking-wide font-light">ระบบเข้าสู่ระบบสำหรับสมาชิกพิเศษ</p>
          </div>

          {/* Login Card */}
          <div className="relative group">
            {/* Glow Effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-300 to-rose-300 rounded-3xl blur opacity-30 group-hover:opacity-40 transition duration-1000"></div>
            
            <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl border border-red-100 shadow-2xl p-10">
              {/* Heading */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-light text-gray-800 mb-2">ยินดีต้อนรับกลับมา</h2>
                <p className="text-gray-500 text-sm">กรอกข้อมูลเพื่อเข้าสู่ระบบ</p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start backdrop-blur-sm">
                  <AlertCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <p className="text-sm text-red-700 font-light">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Input */}
                <div className="relative">
                  <label htmlFor="email" className="block text-xs font-medium text-gray-600 mb-3 tracking-wide uppercase">
                    อีเมล
                  </label>
                  <div className="relative group">
                    <div className={`absolute -inset-0.5 bg-gradient-to-r from-red-300 to-rose-300 rounded-xl blur opacity-0 ${emailFocused ? 'opacity-30' : ''} transition duration-500`}></div>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={1.5} />
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setEmailFocused(true)}
                        onBlur={() => setEmailFocused(false)}
                        required
                        placeholder="your@email.com"
                        className="w-full pl-12 pr-4 py-4 bg-rose-50/50 border border-red-100 text-gray-800 rounded-xl focus:border-red-300 focus:bg-white outline-none transition-all duration-300 placeholder:text-gray-400 font-light"
                      />
                    </div>
                  </div>
                </div>

                {/* Password Input */}
                <div className="relative">
                  <label htmlFor="password" className="block text-xs font-medium text-gray-600 mb-3 tracking-wide uppercase">
                    รหัสผ่าน
                  </label>
                  <div className="relative group">
                    <div className={`absolute -inset-0.5 bg-gradient-to-r from-red-300 to-rose-300 rounded-xl blur opacity-0 ${passwordFocused ? 'opacity-30' : ''} transition duration-500`}></div>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={1.5} />
                      <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setPasswordFocused(true)}
                        onBlur={() => setPasswordFocused(false)}
                        required
                        placeholder="••••••••"
                        className="w-full pl-12 pr-4 py-4 bg-rose-50/50 border border-red-100 text-gray-800 rounded-xl focus:border-red-300 focus:bg-white outline-none transition-all duration-300 placeholder:text-gray-400 font-light"
                      />
                    </div>
                  </div>
                </div>

                {/* Remember & Forgot */}
                <div className="flex items-center justify-between text-sm pt-2">
                  <label className="flex items-center group cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 bg-white border-red-200 rounded text-red-400 focus:ring-red-300/30 focus:ring-offset-0"
                    />
                    <span className="ml-2 text-gray-600 group-hover:text-gray-800 transition font-light">จดจำฉันไว้</span>
                  </label>
                  <a href="/forgot-password" className="text-gray-600 hover:text-gray-800 transition font-light">
                    ลืมรหัสผ่าน?
                  </a>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="relative w-full group mt-8"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-red-300 to-rose-300 rounded-xl blur opacity-50 group-hover:opacity-75 transition duration-500"></div>
                  <div className="relative w-full bg-gradient-to-r from-red-400 to-rose-400 text-white py-4 rounded-xl font-light tracking-wide hover:from-red-300 hover:to-rose-300 focus:outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center">
                    {loading ? (
                      <div className="flex items-center">
                        <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        กำลังเข้าสู่ระบบ...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        เข้าสู่ระบบ
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
                      </div>
                    )}
                  </div>
                </button>
              </form>

              {/* Divider */}
              <div className="mt-10 mb-8 flex items-center">
                <div className="flex-1 border-t border-red-100"></div>
                <span className="px-4 text-xs text-gray-400 tracking-wider font-light">หรือ</span>
                <div className="flex-1 border-t border-red-100"></div>
              </div>

              {/* Register Link */}
              <div className="text-center">
                <p className="text-gray-600 font-light">
                  ยังไม่มีบัญชี?{' '}
                  <a href="/register" className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-400 hover:from-red-500 hover:to-rose-500 font-normal transition">
                    สมัครสมาชิก
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-gray-500 text-xs mt-8 tracking-wide font-light">
            Part-time Match. 
          </p>
        </div>
      </div>
    </div>
  );
}