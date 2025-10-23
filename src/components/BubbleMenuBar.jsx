import { BubbleMenu } from "@tiptap/react/menus";
import {
  FaBold,
  FaHeading,
  FaItalic,
  FaListOl,
  FaListUl,
  FaQuoteLeft,
  FaStrikethrough,
  FaUnderline,
} from "react-icons/fa";
import ColorList from "components/ColorList";
import CommentInput from "components/CommentInput";
import { useState } from "react";

const BubbleMenuBar = ({ editor, user }) => {
  const { from, to } = editor.state.selection;
  const selectedText = editor.state.doc.textBetween(from, to, " ");

  const [showCommentInput, setShowCommentInput] = useState(false);

  const commentInputHandler = () => {
    setShowCommentInput(!showCommentInput);
  };

  if (!editor) {
    return null;
  }

  return (
    <div>
      <BubbleMenu
        editor={editor}
        tippyOptions={{
          duration: 100,
          placement: "bottom-start",
        }}
      >
        <div className="bubble-menu">
          <div className="comment">
            <label>
              <button onClick={commentInputHandler}>
                <p>댓글</p>
              </button>
            </label>
          </div>
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "is-active" : ""}
          >
            <FaBold />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "is-active" : ""}
          >
            <FaItalic />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive("strike") ? "is-active" : ""}
          >
            <FaStrikethrough />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={editor.isActive("underline") ? "is-active" : ""}
          >
            <FaUnderline />
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={editor.isActive("heading1") ? "is-active" : ""}
          >
            <FaHeading className="heading1" />
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={editor.isActive("heading2") ? "is-active" : ""}
          >
            <FaHeading className="heading2" />
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={editor.isActive("heading3") ? "is-active" : ""}
          >
            <FaHeading className="heading3" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "is-active" : ""}
          >
            <FaListUl />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive("orderedList") ? "is-active" : ""}
          >
            <FaListOl />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive("blockquote") ? "is-active" : ""}
          >
            <FaQuoteLeft />
          </button>
          <div className="color-list">
            <ColorList editor={editor} />
          </div>
        </div>
        <div>
          {showCommentInput && (
            <CommentInput
              editor={editor}
              user={user}
              selectedText={selectedText}
            />
          )}
        </div>
      </BubbleMenu>
    </div>
  );
};

export default BubbleMenuBar;
