import { useState, useContext, useEffect } from "react";
import { PostContext } from "../context/PostContext";
import Post from "../components/Post";
import Pagination from "../components/Pagination";
import "./Home.css";

const POSTS_PER_PAGE = 10;

const Home = () => {
  const { getPaginatedPosts, getTotalPages } = useContext(PostContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);

  // Load users from localStorage
  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  const posts = getPaginatedPosts(currentPage, POSTS_PER_PAGE);
  const totalPages = getTotalPages(POSTS_PER_PAGE);

  return (
    <div className="home-container">
      <h1 className="home-title">Feed</h1>

      {posts.length === 0 ? (
        <div className="empty-feed">
          <p>No posts yet. Be the first to post!</p>
        </div>
      ) : (
        <>
          {posts.map((post) => (
            <Post key={post.id} post={post} users={users} />
          ))}

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Home;
