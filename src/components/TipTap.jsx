import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import { Color } from "@tiptap/extension-color";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
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

const MemorizedToC = React.memo(ToC);

const TipTap = () => {
  const [items, setItems] = useState([]);

  // 텍스트 입력 부분
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Document,
      Paragraph,
      Text,
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
  });

  // 기본 세팅은 true
  const [isEditable, setIsEditable] = useState(true);

  // 에디터(텍스트)나 체크박스 변화시 재렌더링
  useEffect(() => {
    if (editor) {
      editor.setEditable(isEditable);
    }
  }, [isEditable, editor]);

  const editHandler = () => {
    setIsEditable(!isEditable);
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
          <BubbleMenuBar editor={editor} />
          <DragHandleBar editor={editor} />
          {/* 입력창 */}
          <EditorContent editor={editor} />
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
