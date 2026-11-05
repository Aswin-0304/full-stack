import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, deletePost } from "../features/posts/postsSlice";

function Posts() {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts.posts);

  const platforms = useSelector(
    (state) => state.platforms.platforms
  );

  const [selectedPlatform, setSelectedPlatform] =
    useState("Instagram");

  const [postText, setPostText] = useState("");

  const handlePublish = () => {
    if (!postText.trim()) {
      alert("Please type something before publishing.");
      return;
    }

    const newPost = {
      id: Date.now(),
      content: postText,
      platform: selectedPlatform,
    };

    dispatch(addPost(newPost));

    setPostText("");
  };

  const getPlatformClass = (platform) => {
    if (platform === "Instagram") return "instagram";
    if (platform === "Facebook") return "facebook";
    if (platform === "LinkedIn") return "linkedin";
    if (platform === "X / Twitter") return "twitter";
    if (platform === "YouTube") return "youtube";
    if (platform === "Threads") return "threads";

    return "custom";
  };

  return (
    <>
      <div className="card">
        <div className="card-heading">
          <div>
            <p className="eyebrow">CREATE</p>
            <h2>Create a Post</h2>
          </div>

          <span
            className={`platform-badge ${getPlatformClass(
              selectedPlatform
            )}`}
          >
            {selectedPlatform}
          </span>
        </div>

        <div className="form-group">
          <label>Select Platform</label>

          <select
            value={selectedPlatform}
            onChange={(event) =>
              setSelectedPlatform(event.target.value)
            }
          >
            {platforms.map((platform) => (
              <option key={platform} value={platform}>
                {platform}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Post Content</label>

          <textarea
            value={postText}
            onChange={(event) =>
              setPostText(event.target.value)
            }
            placeholder={`What do you want to post on ${selectedPlatform}?`}
            maxLength="280"
          />

          <div className="character-count">
            {postText.length} / 280
          </div>
        </div>

        <button
          className="publish-btn"
          onClick={handlePublish}
        >
          Publish to {selectedPlatform}
        </button>
      </div>

      <div className="card">
        <div className="card-heading">
          <div>
            <p className="eyebrow">MANAGE</p>
            <h2>Your Posts</h2>
          </div>

          <span className="post-count">
            {posts.length} Posts
          </span>
        </div>

        {posts.length === 0 ? (
          <div className="empty-state">
            <h3>No posts yet</h3>
            <p>Create your first post using the form above.</p>
          </div>
        ) : (
          <div className="posts-list">
            {posts.map((post) => (
              <div className="post-item" key={post.id}>
                <div className="post-information">
                  <span
                    className={`platform-badge ${getPlatformClass(
                      post.platform
                    )}`}
                  >
                    {post.platform}
                  </span>

                  <p>{post.content}</p>
                </div>

                <button
                  className="delete-btn"
                  onClick={() =>
                    dispatch(deletePost(post.id))
                  }
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Posts;