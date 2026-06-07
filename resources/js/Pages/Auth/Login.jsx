import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Selamat Datang Kembali!</h2>
                <p className="text-sm text-gray-500 mt-2">Silakan login untuk mengakses akun Anda.</p>
            </div>

            {status && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm font-medium">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-6">
                <div>
                    <InputLabel htmlFor="email" value="Email Address" className="text-gray-700 font-bold mb-1" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full rounded-xl border-gray-200 focus:border-[#FF6900] focus:ring-[#FF6900] shadow-sm py-3 px-4 transition-all"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="contoh@email.com"
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                    <div className="flex justify-between items-center mb-1">
                        <InputLabel htmlFor="password" value="Password" className="text-gray-700 font-bold" />
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-sm font-bold text-[#FF6900] hover:text-orange-700 transition"
                            >
                                Lupa password?
                            </Link>
                        )}
                    </div>

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full rounded-xl border-gray-200 focus:border-[#FF6900] focus:ring-[#FF6900] shadow-sm py-3 px-4 transition-all"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                        placeholder="••••••••"
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex items-center">
                    <label className="flex items-center cursor-pointer group">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="rounded text-[#FF6900] focus:ring-[#FF6900] border-gray-300 w-5 h-5 transition"
                        />
                        <span className="ms-3 text-sm font-medium text-gray-600 group-hover:text-gray-900 transition">
                            Ingat Saya
                        </span>
                    </label>
                </div>

                <button 
                    type="submit" 
                    disabled={processing}
                    className="w-full bg-[#FF6900] hover:bg-orange-600 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-lg shadow-orange-200 hover:shadow-xl hover:shadow-orange-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {processing ? 'Memproses...' : 'Log In'}
                </button>
                
                <p className="text-center text-sm text-gray-600 font-medium">
                    Belum punya akun?{' '}
                    <Link href={route('register')} className="text-[#FF6900] hover:text-orange-700 font-bold transition">
                        Daftar sekarang
                    </Link>
                </p>
            </form>
        </GuestLayout>
    );
}
