import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { useRef, useState } from 'react';
import { CameraIcon, PencilSquareIcon, XMarkIcon } from '@heroicons/react/24/solid';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }) {
    const user = usePage().props.auth.user;
    const fileInput = useRef();
    const [preview, setPreview] = useState(user.profile_image ? `/storage/${user.profile_image}` : null);

    // State para sa toggle ng Edit Bio mode
    const [isEditingBio, setIsEditingBio] = useState(false);

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
        profile_image: null,
        _method: 'patch', 
        bio: user.bio || '',
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('profile_image', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('profile.update'), {
            preserveScroll: true,
            onSuccess: () => setIsEditingBio(false), // Isara ang textarea pagka-save
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-bold text-gray-900">Profile Information</h2>
                <p className="mt-1 text-sm text-gray-600">Update your account's profile information and avatar.</p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                {/* PROFILE PICTURE UPLOAD */}
                <div className="flex items-center space-x-6">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-100 shadow-sm bg-gray-100 flex items-center justify-center">
                            {preview ? (
                                <img src={preview} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-3xl font-bold text-blue-600">{user.name.charAt(0)}</span>
                            )}
                        </div>
                        <button
                            type="button"
                            onClick={() => fileInput.current.click()}
                            className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full text-white shadow-lg hover:bg-blue-700 transition"
                        >
                            <CameraIcon className="w-4 h-4" />
                        </button>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-700">Your Avatar</h4>
                        <p className="text-xs text-gray-500">JPG, PNG or GIF. Max 2MB.</p>
                        <input
                            type="file"
                            ref={fileInput}
                            className="hidden"
                            onChange={handleFileChange}
                            accept="image/*"
                        />
                        <InputError className="mt-2" message={errors.profile_image} />
                    </div>
                </div>

                {/* BIO SECTION - VIEW & EDIT MODE */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <div className="flex justify-between items-center mb-2">
                        <InputLabel htmlFor="bio" value="Bio" className="text-blue-600 font-bold" />
                        <button 
                            type="button"
                            onClick={() => setIsEditingBio(!isEditingBio)}
                            className="text-xs flex items-center gap-1 text-blue-600 hover:text-blue-800 font-semibold bg-blue-50 px-2 py-1 rounded-md transition"
                        >
                            {isEditingBio ? (
                                <><XMarkIcon className="w-3 h-3" /> Cancel</>
                            ) : (
                                <><PencilSquareIcon className="w-3 h-3" /> Edit Bio</>
                            )}
                        </button>
                    </div>

                    {isEditingBio ? (
                        <textarea
                            id="bio"
                            className="mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg shadow-sm text-sm resize-none"
                            value={data.bio}
                            onChange={(e) => setData('bio', e.target.value)}
                            rows="3"
                            placeholder="Tell us about yourself..."
                            autoFocus
                        />
                    ) : (
                        <div className="py-2">
                            <p className={`text-sm ${data.bio ? 'text-gray-800' : 'text-gray-400 italic'}`}>
                                {data.bio || "No bio yet. Click edit to add something about yourself!"}
                            </p>
                        </div>
                    )}

                    <InputError className="mt-2" message={errors.bio} />
                </div>

                {/* NAME INPUT */}
                <div>
                    <InputLabel htmlFor="name" value="Name" />
                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        autoComplete="name"
                    />
                    <InputError className="mt-2" message={errors.name} />
                </div>

                {/* EMAIL INPUT */}
                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />
                    <InputError className="mt-2" message={errors.email} />
                </div>

                {/* ACTIONS */}
                <div className="flex items-center gap-4 border-t pt-6">
                    <PrimaryButton disabled={processing} className="bg-blue-600 hover:bg-blue-700">
                        Save Changes
                    </PrimaryButton>
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-green-600 font-medium">Successfully saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}