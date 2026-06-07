import StoreLayout from '@/Layouts/StoreLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <StoreLayout>
            <Head title="Profile Saya" />

            <div className="bg-gray-100 py-12 border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Pengaturan Profil</h1>
                </div>
            </div>

            <div className="py-12 bg-gray-50 min-h-screen">
                <div className="mx-auto max-w-7xl space-y-8 sm:px-6 lg:px-8">
                    <div className="bg-white p-6 shadow-xl shadow-gray-200/50 sm:rounded-3xl border border-gray-100 sm:p-10 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-[#FF6900]"></div>
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="bg-white p-6 shadow-xl shadow-gray-200/50 sm:rounded-3xl border border-gray-100 sm:p-10 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-[#FF6900]"></div>
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="bg-white p-6 shadow-xl shadow-gray-200/50 sm:rounded-3xl border border-red-100 sm:p-10 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-red-600"></div>
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </StoreLayout>
    );
}
