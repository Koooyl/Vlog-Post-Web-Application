<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{
    // GET all posts (Inertia page)
    public function index()
    {
        $posts = Post::with(['user', 'comments.user', 'comments.replies.user'])->get();

        return Inertia::render('Posts/Index', [
            'posts' => $posts
        ]);
    }

    // Show create post form (Inertia page)
    // Show form (optional for React)
    public function create()
    {
        return inertia('Posts/Create');
    }


    // Show edit post form (Inertia page)
    public function edit($id)
    {
        $post = Post::with(['user', 'comments.user', 'comments.replies.user'])->findOrFail($id);

        return Inertia::render('Posts/Edit', [
            'post' => $post
        ]);
    }

        // CREATE post
         // Store new post with media
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'media' => 'nullable|file|mimes:jpg,jpeg,png,gif,mp4,mov,avi|max:10240',
        ]);

        $mediaPath = null;

        if ($request->hasFile('media')) {
            $mediaPath = $request->file('media')->store('posts', 'public');
        }

        $post = Post::create([
            'user_id' => auth()->id(),
            'title' => $request->title,
            'content' => $request->content,
            'media' => $mediaPath,
        ]);

        return redirect()->route('posts.show', $post->id)
                         ->with('success', 'Post created successfully');
    }

    // Show single post
    public function show($id)
{
    $post = Post::with(['user', 'comments' => function ($q) {
        $q->whereNull('parent_id')->with(['user','replies.user']);
    }])->findOrFail($id);

    return inertia('Posts/Show', ['post' => $post]);
}

    // DELETE post
    public function destroy($id)
    {
        $post = Post::findOrFail($id);

        if ($post->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

        $post->delete();

        return redirect()->route('posts.index')->with('success', 'Post deleted successfully');
    }
}