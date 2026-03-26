
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Show({ auth, post }) {

  const [commentContent, setCommentContent] = useState("");
  const [replyContents, setReplyContents] = useState({});
  const [showReply, setShowReply] = useState({}); // toggle reply inputs

  const submitComment = (e) => {
    e.preventDefault();

    Inertia.post(`/posts/${post.id}/comments`, {
      comment: commentContent
    });

    setCommentContent("");
  };

  const submitReply = (e, postId, commentId) => {
  e.preventDefault();

  // Grab correct input
  const replyText = replyInputs[commentId];

  // Clear input first
  setReplyInputs({
    ...replyInputs,
    [commentId]: ""
  });

  // Send to backend
  Inertia.post(`/posts/${postId}/comments`, {
    comment: replyText,
    parent_id: commentId
  });

  // Close reply input
  setShowReply({
    ...showReply,
    [commentId]: false
  });
};

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title={post.title} />

      <div className="min-h-screen bg-gray-100 py-10 flex justify-center">

  <div className="w-full max-w-2xl bg-white rounded-xl shadow p-5">

    {/* USERNAME */}
    <div className="flex items-center mb-3">
      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center font-bold text-gray-600">
        {post.user.name.charAt(0)}
      </div>

      <p className="ml-3 font-semibold text-gray-800">
        {post.user.name}
      </p>
    </div>

    {/* CONTENT */}
    <p className="text-gray-700 mb-4">
      {post.content}
    </p>

    {/* MEDIA */}
    {post.media && (
      <div className="mb-4 flex justify-center">

        {post.media.match(/\.(mp4|mov|webm|ogg)$/i) ? (
          <video
            src={`/storage/${post.media}`}
            controls
            className="rounded-lg max-h-[500px]"
          />
        ) : (
          <img
            src={`/storage/${post.media}`}
            className="rounded-lg max-h-[500px]"
          />
        )}

      </div>
    )}

    {/* COMMENTS */}
    <div className="mt-4">

      <h3 className="font-semibold text-gray-800 mb-3">
        Comments
      </h3>

      {post.comments.map((comment) => (
        <div key={comment.id} className="mb-4">

          {/* COMMENT */}
          <div className="flex gap-3">

            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-bold">
              {comment.user.name.charAt(0)}
            </div>

            <div className="bg-gray-100 px-3 py-2 rounded-lg">

              <p className="font-semibold text-sm text-gray-800">
                {comment.user.name}
              </p>

              <p className="text-gray-700 text-sm">
                {comment.comment}
              </p>

            </div>

          </div>

          {/* REPLY BUTTON */}
          <button
            onClick={() =>
              setShowReply({
                ...showReply,
                [comment.id]: !showReply[comment.id]
              })
            }
            className="text-sm text-blue-500 ml-11 mt-1"
          >
            Reply
          </button>

          {/* REPLY INPUT */}
          {showReply[reply.id] && (
            <form
                onSubmit={(e) => submitReply(e, post.id, reply.id)} // pass post.id here
                className="flex gap-2 mt-1 ml-9"
            >
                <input
                type="text"
                value={replyInputs[reply.id] || ""}
                onChange={(e) =>
                    setReplyInputs((prev) => ({
                    ...prev,
                    [reply.id]: e.target.value
                    }))
                }
                placeholder="Write a reply..."
                className="flex-1 border rounded-full px-3 py-1 text-xs"
                />
                <button
                type="submit"
                className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs"
                >
                Reply
                </button>
            </form>
            )}

          {/* REPLIES */}
          {comment.replies.length > 0 && (
            <div className="ml-11 mt-2 space-y-2">

              {comment.replies.map((reply) => (
                <div key={reply.id} className="flex gap-2">

                  <div className="w-7 h-7 bg-gray-300 rounded-full flex items-center justify-center text-xs font-bold">
                    {reply.user.name.charAt(0)}
                  </div>

                  <div className="bg-gray-100 px-3 py-2 rounded-lg">

                    <p className="font-semibold text-xs text-gray-800">
                      {reply.user.name}
                    </p>

                    <p className="text-gray-700 text-xs">
                      {reply.comment}
                    </p>

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>
      ))}

    </div>

    {/* ADD COMMENT */}
    <form
      onSubmit={submitComment}
      className="flex gap-2 mt-4"
    >

      <input
        type="text"
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
        placeholder="Write a comment..."
        className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-full"
      >
        Comment
      </button>

    </form>

  </div>

</div>
    </AuthenticatedLayout>
  );
}
