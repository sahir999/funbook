import { useContext } from "react";
import { PostContext } from "../context/PostContext";
import Comment from "./Comment";
import "./CommentList.css";
const CommentList = ({ postId, users }) => {
  const { getPostComments } = useContext(PostContext);

  const comments = getPostComments(postId);

  return (
    <div className="comment-list">
      {comments.length === 0 ? (
        <p className="no-comments">No comments yet</p>
      ) : (
        comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            users={users}
            postId={postId}
          />
        ))
      )}
    </div>
  );
};

export default CommentList;
