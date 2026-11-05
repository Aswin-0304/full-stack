import React, { useState, useEffect } from "react";

function PostComposer({ user }) {
  const role = user?.role;
  const username = user?.username;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  // Load posts once on mount
  useEffect(() => {
    try {
      const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
      setPosts(savedPosts);
    } catch (err) {
      console.error("Failed to load posts:", err);
      setPosts([]);
    }
  }, []);

  const persistPosts = (updatedPosts) => {
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  const canCreate = role === "Admin" || role === "Editor";

  // Admins can modify any post; Editors can only modify posts they authored.
  const canModify = (post) =>
    role === "Admin" || (role === "Editor" && post.author === username);

  const createPost = () => {
    if (!title.trim() || !content.trim()) {
      alert("Fill all fields");
      return;
    }

    const newPost = {
      id: Date.now(),
      title: title.trim(),
      content: content.trim(),
      author: username || role,
      role,
      createdAt: new Date().toISOString(),
    };

    persistPosts([newPost, ...posts]);

    setTitle("");
    setContent("");
  };

  const deletePost = (id) => {
    if (!window.confirm("Delete this post?")) return;
    persistPosts(posts.filter((post) => post.id !== id));
    if (editingId === id) cancelEdit();
  };

  const startEdit = (post) => {
    setEditingId(post.id);
    setEditTitle(post.title);
    setEditContent(post.content);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditContent("");
  };

  const saveEdit = (id) => {
    if (!editTitle.trim() || !editContent.trim()) {
      alert("Fill all fields");
      return;
    }

    persistPosts(
      posts.map((post) =>
        post.id === id
          ? { ...post, title: editTitle.trim(), content: editContent.trim() }
          : post
      )
    );

    cancelEdit();
  };

  return (
    <div className="post-card">
      <h2>Post Composer</h2>

      {canCreate && (
        <>
          <input
            type="text"
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Write something..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button onClick={createPost}>Create Post</button>
        </>
      )}

      <h3>All Posts</h3>

      {posts.length === 0 && <p className="no-posts">No posts yet.</p>}

      {posts.map((post) => (
        <div key={post.id} className="single-post">
          {editingId === post.id ? (
            <>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />
              <div className="post-actions">
                <button onClick={() => saveEdit(post.id)}>Save</button>
                <button className="secondary" onClick={cancelEdit}>
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <h4>{post.title}</h4>
              <p>{post.content}</p>
              <small>Author: {post.author}</small>

              {canModify(post) && (
                <div className="post-actions">
                  <button onClick={() => startEdit(post)}>Edit</button>
                  <button
                    className="danger"
                    onClick={() => deletePost(post.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default PostComposer;
