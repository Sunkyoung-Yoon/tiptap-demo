import { useState } from "react";

const CommentInput = ({ editor, user, selectedText }) => {
  const preCommentList = localStorage.getItem("commentList");
  const commentList = preCommentList ? JSON.parse(preCommentList) : [];
  const [content, setContent] = useState("");

  const handleInputChange = (e) => {
    setContent(e.target.value);
  };

  const handleCreateComment = () => {
    const comment = {
      id: commentList.length,
      userName: user.name,
      userColor: user.color,
      content: content,
      date: new Date().toLocaleTimeString(),
      selectedText: selectedText,
    };

    localStorage.setItem(
      "commentList",
      JSON.stringify([...commentList, comment])
    );
  };

  if (!editor) {
    return null;
  }

  return (
    <>
      <div className="comment-input">
        <form onSubmit={handleCreateComment}>
          <textarea
            className="comment-textarea"
            value={content}
            onChange={handleInputChange}
            placeholder="댓글을 입력하세요..."
          />
          <button className="comment-submit-btn" type="submit">
            등록
          </button>
        </form>
      </div>
    </>
  );
};

export default CommentInput;
