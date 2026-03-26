<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class ReplyController extends Controller
{
    public function store(Request $request, Comment $comment)
    {
        $request->validate([
            'content' => 'required|string|max:1000'
        ]);

        $comment->replies()->create([
            'user_id' => auth()->id(),
            'content' => $request->content
        ]);

        return redirect()->back()->with('success', 'Reply added successfully');
    }
}