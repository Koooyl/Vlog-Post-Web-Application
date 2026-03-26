import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";

export default function Index({ auth, posts }) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="All Posts" />

      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">All Posts</h1>

        {posts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          posts.map(post => (
            <div key={post.id} className="mb-6 p-4 border rounded">
              <Link href={`/posts/${post.id}`} className="text-xl font-semibold">
                {post.title}
              </Link>
              <p className="text-gray-700">{post.content}</p>
            </div>
          ))
        )}
      </div>
    </AuthenticatedLayout>
  );
}