const CommentCard = ({ comment }) => {
  return (
    <div>
      <div className="comment-card">
        <div className="comment-card-top">
          <p>{comment.userName}</p>
          <p className="comment-card-date">{comment.date}</p>
        </div>
        <div className="comment-card-bottom">
          <p className="comment-card-selectedText">{comment.selectedText}</p>
          <p> {comment.content}</p>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
