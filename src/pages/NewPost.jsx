import { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { PostContext } from "../context/PostContext";
import "./NewPost.css";

const NewPost = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  const fileInputRef = useRef(null);
  const { createPost } = useContext(PostContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!text.trim() && !image) {
      setError("Please add some text or an image to your post");
      return;
    }

    createPost(text, image);
    navigate("/");
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setImage(reader.result);
        setError("");
      }
    };
    reader.onerror = () => {
      setError("Failed to read the image");
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="new-post-container">
      <h1 className="new-post-title">Create New Post</h1>

      <div className="new-post-card">
        {error && <div className="new-post-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="new-post-textarea-container">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What's on your mind?"
              className="new-post-textarea"
              rows={4}
            />
          </div>

          {image && (
            <div className="new-post-image-preview">
              <img src={image} alt="Preview" className="preview-image" />
              <button
                type="button"
                onClick={removeImage}
                className="remove-image-btn"
              >
                ×
              </button>
            </div>
          )}

          <div className="new-post-actions">
            <div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="file-input"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="add-image-btn"
              >
                Add Image
              </button>
            </div>

            <div className="post-submit-actions">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="cancel-btn"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="submit-btn"
                disabled={!text.trim() && !image}
              >
                Post
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPost;
