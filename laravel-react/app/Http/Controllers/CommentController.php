<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    // Store comment or reply
     public function store(Request $request, Post $post)
    {
        $request->validate([
            'comment' => 'required|string',
            'parent_id' => 'nullable|exists:comments,id', // this allows replies
        ]);

        // Create the comment or reply
        $newComment = Comment::create([
            'post_id' => $post->id,
            'user_id' => auth()->id(),
            'comment' => $request->comment,
            'parent_id' => $request->parent_id ?? null, // handle reply
        ]);

        return back(); // or return Inertia::render() if using Inertia
    }

}