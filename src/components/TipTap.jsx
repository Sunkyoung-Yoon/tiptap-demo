import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import {
  getHierarchicalIndexes,
  TableOfContents,
} from "@tiptap-pro/extension-table-of-contents";

import React, { useEffect, useState } from "react";
import BubbleMenuBar from "components/BubbleMenuBar";
import MenuBar from "components/MenuBar";
import DragHandleBar from "components/DragHandleBar";
import IsEditableMenu from "components/IsEditableMenu";
import { ToC } from "components/ToC";
import SlashBubbleMenuBar from "components/SlashBubbleMenuBar";

const MemorizedToC = React.memo(ToC);

const TipTap = () => {
  const [items, setItems] = useState([]);
  const [lastSaved] = useState(localStorage.getItem("savedData") || "");
  const [showMenu, setShowMenu] = useState(false);

  // 텍스트 입력 부분
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      TableOfContents.configure({
        getIndex: getHierarchicalIndexes,
        onUpdate(content) {
          setItems(content);
        },
      }),
      Placeholder.configure({
        placeholder: "Write something ...",
      }),
    ],
    content: lastSaved,
  });

  // 기본 세팅은 true
  const [isEditable, setIsEditable] = useState(true);

  // editor나 editable 바뀐 경우 재렌더링
  useEffect(() => {
    if (editor) {
      editor.setEditable(isEditable);
    }

    // 자동 저장
    const html = editor.getHTML();
    localStorage.setItem("savedData", html);
  }, [isEditable, editor, editor.getHTML()]);

  const editHandler = () => {
    setIsEditable(!isEditable);
  };

  const handleKeyDown = (event) => {
    if (event.key === "/") {
      setShowMenu(true);
    } else {
      setShowMenu(false);
    }
  };

  // 마우스 클릭 시 메뉴 숨기기
  const handleMouseDown = () => {
    setShowMenu(false);
  };

  if (!editor) {
    return null;
  }

  return (
    <>
      <div className="col-group">
        <div className="main">
          <IsEditableMenu isEditable={isEditable} editHandler={editHandler} />
          <MenuBar editor={editor} />
          {showMenu && (
            <SlashBubbleMenuBar editor={editor} showMenu={showMenu} />
          )}
          <BubbleMenuBar editor={editor} />
          <DragHandleBar editor={editor} />
          {/* 입력창 */}
          <EditorContent
            editor={editor}
            onKeyDown={handleKeyDown}
            onMouseDown={handleMouseDown}
          />
        </div>
        <div className="sidebar">
          <div className="sidebar-options">
            <div className="label-large">Table of contents</div>
            <div className="table-of-contents">
              <MemorizedToC editor={editor} items={items} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TipTap;
