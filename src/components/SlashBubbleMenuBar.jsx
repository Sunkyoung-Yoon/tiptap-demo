import { BubbleMenu } from "@tiptap/react";
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

const SlashBubbleMenuBar = ({ editor, showMenu }) => {
  // console.log(showMenu);

  return (
    <div>
      <BubbleMenu
        editor={editor}
        tippyOptions={{
          duration: 100,
          placement: "top-start",
          zIndex: 20,
          trigger: "manual",
        }}
        shouldShow={() => showMenu}
      >
        <div className="bubble-menu">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "is-active" : ""}
          >
            bold
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
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={editor.isActive("heading2") ? "is-active" : ""}
          >
            <FaHeading />
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
          <div>
            <ColorList editor={editor} />
          </div>
        </div>
      </BubbleMenu>
    </div>
  );
};

export default SlashBubbleMenuBar;
