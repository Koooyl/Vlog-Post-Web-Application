import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

export default function CommentItem({ comment, postId, level = 0 }) {
  const [replyInput, setReplyInput] = useState("");
  const [showReply, setShowReply] = useState(false);

  const submitReply = (e) => {
    e.preventDefault();

    Inertia.post(`/posts/${postId}/comments`, {
      comment: replyInput,
      parent_id: comment.id,
    });

    setReplyInput("");
    setShowReply(false);
  };

  const replyIndent = 2; // rem indent per nested level

  return (
    <div className={`mt-4 ${level === 0 ? "" : "ml-8"}`}> 
      {/* WRAPPER PARA SA MAIN COMMENT ROW */}
      <div className="flex items-start">
        {/* AVATAR */}
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              {comment.user.profile_image ? (
                  <img src={`/storage/${comment.user.profile_image}`} className="w-full h-full object-cover" />
              ) : (
                  <span className="text-xs font-bold">{comment.user.name.charAt(0)}</span>
              )}
          </div>
        </div>

        {/* COMMENT CONTENT */}
        <div className="flex-1 ml-3">
          <div className="bg-gray-100 hover:bg-gray-200 transition p-3 rounded-2xl relative">
            <p className="font-semibold text-sm text-gray-800">{comment.user.name}</p>
            <p className="text-sm text-gray-700">{comment.comment}</p>
            {comment.created_at && (
              <span className="text-xs text-gray-400 absolute bottom-1 right-3">
                {new Date(comment.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            )}
          </div>

          {/* ACTIONS */}
          <div className="flex space-x-4 mt-1 text-xs text-gray-500">
            <button className="hover:underline">Like</button>
            <button onClick={() => setShowReply(!showReply)} className="hover:underline">Reply</button>
          </div>

          {/* REPLY INPUT BOX */}
          {showReply && (
            <form onSubmit={submitReply} className="flex gap-2 mt-2">
              <input
                value={replyInput}
                onChange={(e) => setReplyInput(e.target.value)}
                className="border rounded-full px-3 py-1 text-sm flex-1 focus:outline-none focus:ring-1 focus:ring-blue-400"
                placeholder="Write a reply..."
              />
              <button className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">Reply</button>
            </form>
          )}
        </div>
      </div>

      {/* 2. RECURSIVE REPLIES - ILABAS SA CONTENT COLUMN PARA PANTAY ANG ALIGNMENT */}
      <div className="mt-1">
        {comment.replies?.map((reply) => (
          <CommentItem
            key={reply.id}
            comment={reply}
            postId={postId}
            level={level + 1} // Limitahan ang visual indent
          />
        ))}
      </div>
    </div>
  );
}