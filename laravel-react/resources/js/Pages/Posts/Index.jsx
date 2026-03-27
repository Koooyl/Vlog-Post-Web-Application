import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import CommentItem from "@/Components/CommentItem";


export default function Index({ posts }) {

  

  const [commentInputs, setCommentInputs] = useState({});
  const [replyInputs, setReplyInputs] = useState({});
  const [showReply, setShowReply] = useState({});
  const [replyContents, setReplyContents] = useState({});
  

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

  Inertia.post(`/posts/${postId}/comments`, {
    comment: replyInputs[commentId],
    parent_id: commentId
  }, {
    onSuccess: () => {
      setReplyInputs({
        ...replyInputs,
        [commentId]: ""
      });

      setShowReply({
        ...showReply,
        [commentId]: false
      });
    }
  });
};

  return (
    
    
    <div className="min-h-screen bg-gray-100 py-10 flex justify-center">

      <div className="w-full max-w-2xl space-y-6">
              {posts.length === 0 && (
          <div className="text-center text-gray-500 py-10 bg-white rounded-xl shadow">
            No posts yet
          </div>
        )}

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

        <div className="mt-4 space-y-4">
          {post.comments?.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              postId={post.id}
            />
          ))}
        </div>

      </div>

    ))}

  </div>

</div>

  );
}