import { useForm } from "@inertiajs/react";

export default function CommentSection({ post }) {

    const { data, setData, post: submit, reset } = useForm({
        comment: ""
    });

    function addComment(e){
        e.preventDefault();

        submit(`/comments/${post.id}`, {
            onSuccess: () => reset()
        });
    }

    return (

        <div className="mt-8">

            <h2 className="text-xl font-bold mb-4">
                Comments
            </h2>

            <form onSubmit={addComment} className="flex gap-2 mb-6">

                <input
                    value={data.comment}
                    onChange={e => setData('comment', e.target.value)}
                    className="border p-2 w-full rounded"
                    placeholder="Write a comment..."
                />

                <button className="bg-blue-500 text-white px-4 rounded">
                    Post
                </button>

            </form>

            <div className="space-y-3">

                {post.comments.map(comment => (

                    <div key={comment.id} className="border p-3 rounded">

                        <p className="text-sm text-gray-500">
                            {comment.user.name}
                        </p>

                        <p>{comment.comment}</p>

                    </div>

                ))}

            </div>

        </div>
    );
}