import CommentCard from "./CommentCard";

const CommnetList = () => {
  const commentList = localStorage.getItem("commentList");
  let parsedList = [];

  try {
    parsedList = commentList ? JSON.parse(commentList) : [];
    if (!Array.isArray(parsedList)) {
      parsedList = []; // JSON 구조가 배열이 아니면 빈 배열로 초기화
    }
  } catch (error) {
    // 파싱 안되는 경우
    console.error("Failed to parse commentList:", error);
    parsedList = [];
  }

  const renderedList = parsedList.map((comment) => (
    <CommentCard key={comment.id} comment={comment} />
  ));

  return (
    <div className="comment-list">
      {renderedList.length > 0 ? renderedList : <p>댓글이 없습니다.</p>}
    </div>
  );
};

export default CommnetList;
