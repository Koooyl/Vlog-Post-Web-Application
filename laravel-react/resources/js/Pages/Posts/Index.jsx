import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Index({ posts }) {

  const [commentInputs, setCommentInputs] = useState({});
  const [replyInputs, setReplyInputs] = useState({});
  const [showReply, setShowReply] = useState({});

  const submitComment = (e, postId) => {
    e.preventDefault();

    Inertia.post(`/posts/${postId}/comments`, {
      comment: commentInputs[postId]
    });

    setCommentInputs({
      ...commentInputs,
      [postId]: ""
    });
  };

  const submitReply = (e, postId, commentId) => {
  e.preventDefault();

  // Clear input first
  setReplyInputs({
    ...replyInputs,
    [commentId]: ""
  });

  // Then send to backend
  Inertia.post(`/posts/${post.id}/comments`, {
  comment: replyContents[commentId],
  parent_id: commentId
});

  // Optionally close the reply input
  setShowReply({
    ...showReply,
    [commentId]: false
  });
};

  return (
    
    
    <div className="min-h-screen bg-gray-100 py-10 flex justify-center">

      <div className="w-full max-w-2xl space-y-6">

        {posts.map((post) => (

          <div
            key={post.id}
            className="bg-white rounded-xl shadow p-5"
          >

            {/* USERNAME */}
            <p className="font-semibold text-gray-800 mb-2">
              {post.user.name}
            </p>

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

            
<div className="mt-4 space-y-4">
  {post.comments.map((comment) => (
    <div key={comment.id} className="space-y-2">

      {/* COMMENT */}
      <div className="bg-gray-100 px-3 py-2 rounded-lg">
        <p className="font-semibold text-sm">{comment.user.name}</p>
        <p className="text-sm">{comment.comment}</p>
      </div>

      {/* REPLY BUTTON */}
      <button
        onClick={() =>
          setShowReply((prev) => ({ ...prev, [comment.id]: !prev[comment.id] }))
        }
        className="text-sm text-blue-500"
      >
        Reply
      </button>

      {/* REPLY INPUT */}
      {showReply[comment.id] && (
        <form
          onSubmit={(e) => submitReply(e, post.id, comment.id)}
          className="flex gap-2 mt-1 ml-5"
        >
          <input
            type="text"
            value={replyInputs[comment.id] || ""}
            onChange={(e) =>
              setReplyInputs((prev) => ({
                ...prev,
                [comment.id]: e.target.value,
              }))
            }
            placeholder="Write a reply..."
            className="flex-1 border rounded-full px-3 py-1 text-sm"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm"
          >
            Reply
          </button>
        </form>
      )}

      {/* REPLIES */}
{comment.replies.length > 0 && (
  <div className="ml-11 mt-2 space-y-2">
    {comment.replies.map((reply) => (
      <div key={reply.id} className="space-y-1">
        <div className="flex gap-2 items-start">
          {/* Avatar */}
          <div className="w-7 h-7 bg-gray-300 rounded-full flex items-center justify-center text-xs font-bold">
            {reply.user.name.charAt(0)}
          </div>

          {/* Reply Content */}
          <div className="bg-gray-100 px-3 py-2 rounded-lg flex-1">
            <p className="font-semibold text-xs text-gray-800">{reply.user.name}</p>
            <p className="text-gray-700 text-xs">{reply.comment}</p>
          </div>
        </div>

        {/* Reply button under reply */}
        <button
          onClick={() =>
            setShowReply((prev) => ({
              ...prev,
              [reply.id]: !prev[reply.id]
            }))
          }
          className="text-xs text-blue-500 ml-9"
        >
          Reply
        </button>

        {/* Reply input for this reply */}
        {showReply[reply.id] && (
          <form
            onSubmit={(e) => submitReply(e, reply.id)}
            className="flex gap-2 mt-1 ml-9"
          >
            <input
              type="text"
              value={replyContents[reply.id] || ""}
              onChange={(e) =>
                setReplyContents((prev) => ({
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
      </div>
    ))}
  </div>
)}

    </div>
  ))}
</div>

            {/* ADD COMMENT */}
            <form
              onSubmit={(e) => submitComment(e, post.id)}
              className="flex gap-2 mt-4"
            >

              <input
                type="text"
                value={commentInputs[post.id] || ""}
                onChange={(e) =>
                  setCommentInputs({
                    ...commentInputs,
                    [post.id]: e.target.value
                  })
                }
                placeholder="Write a comment..."
                className="flex-1 border rounded-full px-4 py-2"
              />

              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-full"
              >
                Comment
              </button>

            </form>

          </div>

        ))}

      </div>

    </div>

  );
}