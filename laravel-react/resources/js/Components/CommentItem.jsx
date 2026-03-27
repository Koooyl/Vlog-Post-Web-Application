import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

export default function CommentItem({ comment, postId }) {

  const [replyInput, setReplyInput] = useState("");
  const [showReply, setShowReply] = useState(false);

  const submitReply = (e) => {
    e.preventDefault();

    Inertia.post(`/posts/${postId}/comments`, {
      comment: replyInput,
      parent_id: comment.id
    });

    setReplyInput("");
    setShowReply(false);
  };

  return (
    <div className="ml-5 mt-3">

      {/* COMMENT CONTENT */}
      <div className="bg-gray-100 px-3 py-2 rounded-lg">
        <p className="font-semibold text-sm">{comment.user.name}</p>
        <p className="text-sm">{comment.comment}</p>
      </div>

      {/* REPLY BUTTON */}
      <button
        onClick={() => setShowReply(!showReply)}
        className="text-xs text-blue-500 mt-1"
      >
        Reply
      </button>

      {/* REPLY INPUT */}
      {showReply && (
        <form onSubmit={submitReply} className="flex gap-2 mt-1">
          <input
            value={replyInput}
            onChange={(e) => setReplyInput(e.target.value)}
            className="border rounded-full px-3 py-1 text-xs flex-1"
            placeholder="Write a reply..."
          />

          <button className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs">
            Reply
          </button>
        </form>
      )}

      {/* RECURSIVE REPLIES */}
      {comment.replies?.map((reply) => (
        <CommentItem
          key={reply.id}
          comment={reply}
          postId={postId}
        />
      ))}

    </div>
  );
}