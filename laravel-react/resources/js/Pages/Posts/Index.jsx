import { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CommentItem from "@/Components/CommentItem";
import { formatDistanceToNow } from "date-fns";
import { GlobeAmericasIcon, ChatBubbleLeftIcon, EllipsisHorizontalIcon } from "@heroicons/react/24/outline";

export default function Index({ auth, posts }) {
  // State para sa comment inputs ng bawat post
  const [commentInputs, setCommentInputs] = useState({});
  // State para pilitin ang re-render ng "time ago" bawat minuto
  const [, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((tick) => tick + 1);
    }, 60000); // Refresh UI every 60 seconds
    return () => clearInterval(interval);
  }, []);

  const submitComment = (e, postId) => {
    e.preventDefault();

    Inertia.post(`/posts/${postId}/comments`, {
      comment: commentInputs[postId],
    }, {
      preserveScroll: true,
      onSuccess: () => {
        setCommentInputs({
          ...commentInputs,
          [postId]: "",
        });
      },
    });
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Home" />

      <div className="min-h-screen bg-gray-100 py-10 flex justify-center px-4">
        <div className="w-full max-w-2xl space-y-6">
          
          {posts.length === 0 && (
            <div className="text-center text-gray-500 py-16 bg-white rounded-xl shadow-sm border border-gray-200 font-medium">
              No posts yet. Start the conversation!
            </div>
          )}

          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              
              {/* POST HEADER */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {/* User Avatar */}
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold text-white shadow-sm ring-2 ring-white overflow-hidden">
                    {post.user.profile_image ? (
                      <img src={`/storage/${post.user.profile_image}`} className="w-full h-full object-cover" />
                    ) : (
                      post.user.name.charAt(0)
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 leading-tight hover:underline cursor-pointer">
                      {post.user.name}
                    </p>
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      {/* REAL-TIME TIME AGO */}
                      <span title={new Date(post.created_at).toLocaleString()}>
                        {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                      </span>
                      <span>•</span>
                      <GlobeAmericasIcon className="w-3 h-3" />
                    </div>
                  </div>
                </div>
                {/* Optional Menu Icon */}
                <button className="p-2 hover:bg-gray-100 rounded-full transition">
                  <EllipsisHorizontalIcon className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              {/* POST BODY */}
              <div className="px-4 pb-4 space-y-2">
                {/* POST TITLE (Para sa Lead Programmer) */}
                {post.title && (
                  <h2 className="text-xl font-extrabold text-gray-900 leading-tight tracking-tight">
                    {post.title}
                  </h2>
                )}
                
                {/* POST CONTENT */}
                <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                  {post.content}
                </p>
              </div>

              {/* MEDIA SECTION */}
              {post.media && (
                <div className="bg-black/5 flex justify-center border-y border-gray-100 overflow-hidden">
                  {post.media.match(/\.(mp4|mov|webm|ogg)$/i) ? (
                    <video
                      src={`/storage/${post.media}`}
                      controls
                      className="max-h-[550px] w-full"
                    />
                  ) : (
                    <img
                      src={`/storage/${post.media}`}
                      className="max-h-[550px] w-full object-contain"
                      alt={post.title || "Post media"}
                    />
                  )}
                </div>
              )}

              {/* INTERACTIONS STATS */}
              <div className="px-4 py-3 flex justify-between items-center text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                   {/* Placeholder for Likes icon if needed */}
                </div>
                <div className="hover:underline cursor-pointer">
                  {post.comments?.length || 0} comments
                </div>
              </div>

              {/* ACTION BUTTONS (Like/Comment/Share bar) */}
              <div className="px-4 border-y border-gray-100 flex justify-around py-1">
                <button className="flex-1 flex items-center justify-center space-x-2 py-2 hover:bg-gray-100 rounded-lg transition font-semibold text-gray-600">
                  <ChatBubbleLeftIcon className="w-5 h-5" />
                  <span>Comment</span>
                </button>
              </div>

              {/* COMMENTS SECTION */}
              <div className="p-4 bg-gray-50/40">
                <div className="space-y-4">
                  {post.comments?.map((comment) => (
                    <CommentItem 
                      key={comment.id} 
                      comment={comment} 
                      postId={post.id} 
                      level={0} 
                    />
                  ))}
                </div>

                {/* COMMENT INPUT BOX */}
                <form
                  onSubmit={(e) => submitComment(e, post.id)}
                  className="flex items-start gap-2 mt-4"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-white shadow-sm overflow-hidden">
                    {auth.user.profile_image ? (
                      <img src={`/storage/${auth.user.profile_image}`} className="w-full h-full object-cover" />
                    ) : (
                      auth.user.name.charAt(0)
                    )}
                  </div>
                  <div className="flex-1 relative group">
                    <input
                      type="text"
                      value={commentInputs[post.id] || ""}
                      onChange={(e) =>
                        setCommentInputs({
                          ...commentInputs,
                          [post.id]: e.target.value,
                        })
                      }
                      placeholder="Write a comment..."
                      className="w-full border-gray-200 rounded-2xl px-4 py-2 text-sm focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm group-hover:bg-gray-50 transition-colors"
                    />
                    <button 
                      type="submit"
                      disabled={!commentInputs[post.id]?.trim()}
                      className="absolute right-2 top-1.5 text-blue-600 font-bold text-sm hover:bg-blue-50 p-1 px-3 rounded-lg transition disabled:opacity-0 disabled:pointer-events-none"
                    >
                      Post
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}