import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { PostContext } from "../context/PostContext";
import CommentList from "./CommentList";
import "./Post.css";

const Post = ({ post, users }) => {
  const { currentUser } = useContext(AuthContext);
  const { likePost, deletePost, updatePost, createComment } =
    useContext(PostContext);

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(post.text);
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);

  const author = users.find((user) => user.id === post.userId);
  const isAuthor = currentUser?.id === post.userId;
  const hasLiked = post.likes.includes(currentUser?.id || "");

  const handleLike = () => {
    likePost(post.id);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deletePost(post.id);
    }
  };

  const handleUpdate = () => {
    if (editText.trim()) {
      updatePost(post.id, editText, post.image);
      setIsEditing(false);
    }
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      createComment(post.id, commentText, null);
      setCommentText("");
    }
  };

  return (
    <div className="post">
      {/* Post Header */}
      <div className="post-header">
        {author?.profilePicture ? (
          <img
            src={author.profilePicture || "/placeholder.svg"}
            alt={author.name}
            className="post-author-img"
          />
        ) : (
          <div className="post-author-placeholder">
            {author?.name.charAt(0)}
          </div>
        )}
        <div className="post-author-info">
          <div className="post-author-name">{author?.name}</div>
          <div className="post-date">
            {new Date(post.createdAt).toLocaleString()}
          </div>
        </div>

        {isAuthor && (
          <div className="post-actions">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="post-edit-btn"
            >
              Edit
            </button>
            <button onClick={handleDelete} className="post-delete-btn">
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Post Content */}
      {isEditing ? (
        <div className="post-edit">
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="post-edit-textarea"
            rows={3}
          />
          <div className="post-edit-actions">
            <button
              onClick={() => setIsEditing(false)}
              className="post-edit-cancel"
            >
              Cancel
            </button>
            <button onClick={handleUpdate} className="post-edit-save">
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="post-content">
          <p className="post-text">{post.text}</p>
          {post.image && (
            <img src={post.image} alt="Post" className="post-image" />
          )}
        </div>
      )}

      {/* Post Actions */}
      <div className="post-interaction">
        <button
          onClick={handleLike}
          className={`post-like-btn ${hasLiked ? "liked" : ""}`}
        >
          {hasLiked ? "❤️" : "🤍"} {post.likes.length}{" "}
          {post.likes.length === 1 ? "Like" : "Likes"}
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          className="post-comment-btn"
        >
          💬 Comments
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="post-comments">
          <form onSubmit={handleComment} className="comment-form">
            <div className="comment-input-container">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment..."
                className="comment-input"
              />
              <button
                type="submit"
                className="comment-submit"
                disabled={!commentText.trim()}
              >
                Post
              </button>
            </div>
          </form>

          <CommentList postId={post.id} users={users} />
        </div>
      )}
    </div>
  );
};

export default Post;
