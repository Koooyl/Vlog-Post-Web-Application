import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Create({ auth }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mediaFile, setMediaFile] = useState(null);

  const submitPost = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (mediaFile) formData.append("media", mediaFile);

    Inertia.post("/posts", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Create Post</h1>
        <form onSubmit={submitPost} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <input
            type="file"
            onChange={(e) => setMediaFile(e.target.files[0])}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Publish
          </button>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}