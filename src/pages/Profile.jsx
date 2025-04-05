import { useState, useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { PostContext } from "../context/PostContext";
import Post from "../components/Post";
import "./Profile.css";

const Profile = () => {
  const { currentUser, updateProfilePicture } = useContext(AuthContext);
  const { posts } = useContext(PostContext);

  const [users, setUsers] = useState([]);
  const fileInputRef = useRef(null); //

  // Load users from localStorage
  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  // Filter posts by current user
  const userPosts = posts.filter((post) => post.userId === currentUser?.id);

  const handleProfilePictureClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Convert image to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        updateProfilePicture(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  if (!currentUser) return null;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div
          className="profile-picture-container"
          onClick={handleProfilePictureClick}
        >
          {currentUser.profilePicture ? (
            <img
              src={currentUser.profilePicture}
              alt={currentUser.name}
              className="profile-picture"
            />
          ) : (
            <div className="profile-picture-placeholder">
              {currentUser.name.charAt(0)}
            </div>
          )}
          <div className="profile-picture-overlay">
            <span>Change Photo</span>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="profile-picture-input"
          />
        </div>

        <div className="profile-info">
          <h1 className="profile-name">{currentUser.name}</h1>
          <p className="profile-email">{currentUser.email}</p>
          <p className="profile-stats">
            {userPosts.length} {userPosts.length === 1 ? "post" : "posts"}
          </p>
        </div>
      </div>

      <h2 className="profile-posts-title">Your Posts</h2>

      {userPosts.length === 0 ? (
        <div className="empty-posts">
          <p>You haven't posted anything yet.</p>
        </div>
      ) : (
        userPosts.map((post) => (
          <Post key={post.id} post={post} users={users} />
        ))
      )}
    </div>
  );
};

export default Profile;
