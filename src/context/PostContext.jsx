// src/context/PostContext.jsx
import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const PostContext = createContext({
  posts: [],
  comments: [],
  createPost: () => {},
  updatePost: () => false,
  deletePost: () => false,
  likePost: () => {},
  createComment: () => {},
  updateComment: () => false,
  deleteComment: () => false,
  getPostComments: () => [],
  getPaginatedPosts: () => [],
  getTotalPages: () => 0,
});

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const storedPosts = localStorage.getItem("posts");
    const storedComments = localStorage.getItem("comments");

    if (storedPosts) setPosts(JSON.parse(storedPosts));
    if (storedComments) setComments(JSON.parse(storedComments));
  }, []);

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  const createPost = (text, image) => {
    if (!currentUser) return;

    const newPost = {
      id: Date.now().toString(),
      userId: currentUser.id,
      text,
      image,
      createdAt: Date.now(),
      likes: [],
    };

    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  const updatePost = (postId, text, image) => {
    if (!currentUser) return false;

    const postIndex = posts.findIndex((p) => p.id === postId);
    if (postIndex === -1) return false;

    const post = posts[postIndex];
    if (post.userId !== currentUser.id) return false;

    const updatedPost = { ...post, text, image };
    const updatedPosts = [...posts];
    updatedPosts[postIndex] = updatedPost;

    setPosts(updatedPosts);
    return true;
  };

  const deletePost = (postId) => {
    if (!currentUser) return false;

    const post = posts.find((p) => p.id === postId);
    if (!post || post.userId !== currentUser.id) return false;

    setPosts(posts.filter((p) => p.id !== postId));
    setComments(comments.filter((c) => c.postId !== postId));

    return true;
  };

  const likePost = (postId) => {
    if (!currentUser) return;

    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          const userLiked = post.likes.includes(currentUser.id);

          return {
            ...post,
            likes: userLiked
              ? post.likes.filter((id) => id !== currentUser.id)
              : [...post.likes, currentUser.id],
          };
        }
        return post;
      })
    );
  };

  const createComment = (postId, text, parentId) => {
    if (!currentUser) return;

    const newComment = {
      id: Date.now().toString(),
      postId,
      userId: currentUser.id,
      text,
      parentId,
      createdAt: Date.now(),
    };

    setComments((prevComments) => [...prevComments, newComment]);
  };

  const updateComment = (commentId, text) => {
    if (!currentUser) return false;

    const index = comments.findIndex((c) => c.id === commentId);
    if (index === -1 || comments[index].userId !== currentUser.id) return false;

    const updatedComments = [...comments];
    updatedComments[index] = { ...comments[index], text };

    setComments(updatedComments);
    return true;
  };

  const deleteComment = (commentId) => {
    if (!currentUser) return false;

    const comment = comments.find((c) => c.id === commentId);
    if (!comment || comment.userId !== currentUser.id) return false;

    const deleteWithReplies = (id) => {
      const replies = comments.filter((c) => c.parentId === id);
      replies.forEach((reply) => deleteWithReplies(reply.id));
      setComments((prev) => prev.filter((c) => c.id !== id));
    };

    deleteWithReplies(commentId);
    return true;
  };

  const getPostComments = (postId) => {
    const postComments = comments.filter((c) => c.postId === postId);
    const topLevel = postComments.filter((c) => c.parentId === null);

    const buildTree = (comment) => {
      const replies = postComments
        .filter((c) => c.parentId === comment.id)
        .map(buildTree);

      return { ...comment, replies: replies.length ? replies : undefined };
    };

    return topLevel.map(buildTree);
  };

  const getPaginatedPosts = (page, limit) => {
    const start = (page - 1) * limit;
    const end = start + limit;
    return posts.slice(start, end);
  };

  const getTotalPages = (limit) => Math.ceil(posts.length / limit);

  return (
    <PostContext.Provider
      value={{
        posts,
        comments,
        createPost,
        updatePost,
        deletePost,
        likePost,
        createComment,
        updateComment,
        deleteComment,
        getPostComments,
        getPaginatedPosts,
        getTotalPages,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
