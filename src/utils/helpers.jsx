// Helper function to transform flat comments into a nested structure
export const buildCommentTree = (comments, parentId = null) => {
  return comments
    .filter((comment) => comment.parentId === parentId)
    .map((comment) => ({
      ...comment,
      replies: buildCommentTree(comments, comment.id),
    }));
};

// Helper function to convert a file to base64
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
