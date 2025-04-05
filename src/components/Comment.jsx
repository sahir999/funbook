import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { PostContext } from "../context/PostContext";
import "./Comment.css";

const Comment = ({ comment, users, postId }) => {
  const { currentUser } = useContext(AuthContext);
  const { updateComment, deleteComment, createComment } =
    useContext(PostContext);

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text);
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");

  const author = users.find((user) => user.id === comment.userId);
  const isAuthor = currentUser?.id === comment.userId;

  const handleUpdate = () => {
    if (editText.trim()) {
      updateComment(comment.id, editText);
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      deleteComment(comment.id);
    }
  };

  const handleReply = (e) => {
    e.preventDefault();
    if (replyText.trim()) {
      createComment(postId, replyText, comment.id);
      setReplyText("");
      setIsReplying(false);
    }
  };

  return (
    <div className="comment">
      <div className="comment-container">
        {author?.profilePicture ? (
          <img
            src={author.profilePicture}
            alt={author.name}
            className="comment-author-img"
          />
        ) : (
          <div className="comment-author-placeholder">
            {author?.name.charAt(0)}
          </div>
        )}

        <div className="comment-content">
          <div className="comment-bubble">
            <div className="comment-author-name">{author?.name}</div>

            {isEditing ? (
              <div className="comment-edit">
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="comment-edit-textarea"
                  rows={2}
                />
                <div className="comment-edit-actions">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="comment-edit-cancel"
                  >
                    Cancel
                  </button>
                  <button onClick={handleUpdate} className="comment-edit-save">
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <p className="comment-text">{comment.text}</p>
            )}
          </div>
          <div className="comment-meta">
            <span className="comment-date">
              {new Date(comment.createdAt).toLocaleString()}
            </span>
            <button
              onClick={() => setIsReplying(!isReplying)}
              className="comment-reply-btn"
            >
              Reply
            </button>

            {isAuthor && (
              <>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="comment-edit-btn"
                >
                  Edit
                </button>
                <button onClick={handleDelete} className="comment-delete-btn">
                  Delete
                </button>
              </>
            )}
          </div>
          {isReplying && (
            <form onSubmit={handleReply}>
              <div className="reply-input-container">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write a reply..."
                  className="reply-input"
                />
                <button
                  type="submit"
                  className="reply-submit"
                  disabled={!replyText.trim()}
                >
                  Reply
                </button>
              </div>
            </form>
          )}
          {/* reply section of comments */}
          {comment.replies && comment.replies.length > 0 && (
            <div
              style={{
                padding: "10px",
                marginTop: "10px",
              }}
            >
              {comment.replies.map((reply) => (
                <Comment
                  key={reply.id}
                  comment={reply}
                  users={users}
                  postId={postId}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
