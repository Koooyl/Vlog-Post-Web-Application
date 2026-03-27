import { useState, useRef } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PhotoIcon, VideoCameraIcon, XMarkIcon } from "@heroicons/react/24/solid";

export default function Create({ auth }) {
  // STAY: Ang iyong original states
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mediaFile, setMediaFile] = useState(null);
  
  // UI States
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Trigger file selection for both icons
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMediaFile(file); // STAY
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const removeMedia = () => {
    setMediaFile(null); // STAY
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const submitPost = (e) => {
    e.preventDefault();
    setIsUploading(true);

    const formData = new FormData();
    formData.append("title", title); // STAY
    formData.append("content", content); // STAY
    if (mediaFile) formData.append("media", mediaFile); // STAY

    Inertia.post("/posts", formData, {
      forceFormData: true,
      onSuccess: () => {
        setTitle(""); // STAY
        setContent(""); // STAY
        removeMedia();
        setIsUploading(false);
      },
      onError: () => setIsUploading(false),
      onFinish: () => setIsUploading(false),
    });
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Create Post" />

      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          
          {/* HEADER */}
          <div className="px-6 py-4 border-b border-gray-100 text-center">
            <h1 className="text-xl font-bold text-gray-800">Create Post</h1>
          </div>

          <form onSubmit={submitPost} className="p-4 space-y-4">
            {/* USER INFO */}
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-11 h-11 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold shadow-md">
                {auth.user.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-gray-800 leading-tight">{auth.user.name}</p>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest bg-gray-100 px-2 py-0.5 rounded">Public</span>
              </div>
            </div>

            {/* TITLE INPUT (STAY) */}
            <input
              type="text"
              placeholder="Post Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border-none focus:ring-0 text-xl font-bold text-gray-800 placeholder-gray-400 p-0"
              required
            />

            {/* CONTENT AREA (STAY) */}
            <textarea
              placeholder={`What's on your mind, ${auth.user.name.split(' ')[0]}?`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border-none focus:ring-0 text-lg text-gray-700 placeholder-gray-400 min-h-[120px] resize-none p-0"
              required
            />

            {/* MEDIA PREVIEW */}
            {previewUrl && (
              <div className="relative rounded-xl border border-gray-200 overflow-hidden bg-black shadow-inner">
                <button
                  type="button"
                  onClick={removeMedia}
                  className="absolute top-3 right-3 z-20 p-1.5 bg-gray-900/60 hover:bg-gray-900/80 backdrop-blur-md rounded-full text-white transition"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
                
                {mediaFile?.type.startsWith("video") ? (
                  <video src={previewUrl} controls className="w-full max-h-[400px]" />
                ) : (
                  <img src={previewUrl} alt="Preview" className="w-full object-contain max-h-[400px]" />
                )}
              </div>
            )}

            {/* ACTION BAR - FIXED VIDEO ICON */}
            <div className="border-2 border-gray-100 rounded-xl p-3 flex items-center justify-between bg-gray-50/50">
              <span className="text-sm font-bold text-gray-600 ml-2">Add to your post</span>
              <div className="flex items-center">
                <button type="button" onClick={triggerFileInput} className="p-2 hover:bg-white rounded-full transition-all group">
                  <PhotoIcon className="w-7 h-7 text-green-500 group-hover:scale-110" />
                </button>
                <button type="button" onClick={triggerFileInput} className="p-2 hover:bg-white rounded-full transition-all group">
                  <VideoCameraIcon className="w-7 h-7 text-red-500 group-hover:scale-110" />
                </button>
              </div>
            </div>

            {/* HIDDEN FILE INPUT (STAY) */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*,video/*"
              className="hidden"
            />

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={isUploading || (!content.trim() && !mediaFile)}
              className={`w-full py-3 rounded-xl font-bold text-white transition-all duration-200 shadow-md flex justify-center items-center
                ${isUploading || (!content.trim() && !mediaFile) 
                  ? 'bg-blue-300 cursor-not-allowed shadow-none' 
                  : 'bg-blue-600 hover:bg-blue-700 active:scale-[0.98]'}`}
            >
              {isUploading ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-3 border-2 border-white border-t-transparent rounded-full" viewBox="0 0 24 24"></svg>
                  Publishing...
                </>
              ) : "Publish"}
            </button>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}