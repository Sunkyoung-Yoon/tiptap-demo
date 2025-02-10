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
import FileHandler from "@tiptap-pro/extension-file-handler";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import CustomCodeBlockLowlight from "utils/CodeBlockIndent";
import { Indent } from "utils/Indent";
import "highlight.js/styles/stackoverflow-dark.min.css";
import CommentList from "components/CommentList";
import { useUser } from "hooks/useUser";

const MemorizedToC = React.memo(ToC);

const TipTap = () => {
  const [items, setItems] = useState([]);
  const lastdata = JSON.parse(localStorage.getItem("savedData"));
  const lastSaved = lastdata ? lastdata : null;
  const [showMenu, setShowMenu] = useState(false);

  const user = useUser();

  // 텍스트 입력 부분
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Underline,
      TextStyle,
      Color,
      CustomCodeBlockLowlight,
      Indent,
      TableOfContents.configure({
        getIndex: getHierarchicalIndexes,
        onUpdate(content) {
          setItems(content);
        },
      }),
      Image,
      Link.configure({
        openOnClick: true, // 링크 클릭 시 새 창에서 열기
        linkOnPaste: false, // URL 붙여넣기 시 자동 링크 생성 방지
      }),
      FileHandler.configure({
        allowedMimeTypes: [
          "image/png",
          "image/jpeg",
          "image/gif",
          "image/webp",
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "text/plain",
        ],
        onDrop: (currentEditor, files, pos) => {
          files.forEach((file) => {
            const fileReader = new FileReader();
            const mimeType = file.type;

            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
              // 이미지 파일 처리
              if (mimeType.startsWith("image/")) {
                currentEditor
                  .chain()
                  .insertContentAt(pos, {
                    type: "image",
                    attrs: {
                      src: fileReader.result,
                    },
                  })
                  .focus()
                  .run();
              } else {
                // 기타 파일 (pdf, docs, txt 등) 처리
                // ** download는 추후 서버와 연동 후 구현 예정
                currentEditor
                  .chain()
                  .insertContentAt(pos, {
                    type: "text",
                    text: file.name,
                    marks: [
                      {
                        type: "link",
                        attrs: {
                          href: fileReader.result,
                          download: file.name,
                        },
                      },
                    ],
                  })
                  .focus()
                  .run();
              }
            };
          });
        },
        onPaste: (currentEditor, files, htmlContent) => {
          files.forEach((file) => {
            if (htmlContent) {
              console.log(htmlContent);
              return false;
            }

            const fileReader = new FileReader();
            const mimeType = file.type;

            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
              if (mimeType.startsWith("image/")) {
                // 이미지 파일 처리
                currentEditor
                  .chain()
                  .insertContentAt(currentEditor.state.selection.anchor, {
                    type: "image",
                    attrs: {
                      src: fileReader.result,
                    },
                  })
                  .focus()
                  .run();
              } else {
                // 기타 파일 처리 (링크로 삽입)
                // ** download는 추후 서버와 연동 후 구현 예정
                currentEditor
                  .chain()
                  .insertContentAt(currentEditor.state.selection.anchor, {
                    type: "text",
                    text: file.name,
                    marks: [
                      {
                        type: "link",
                        attrs: {
                          href: fileReader.result,
                          download: file.name,
                          type: file.type,
                        },
                      },
                    ],
                  })
                  .focus()
                  .run();
              }
            };
          });
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
    const jsonContent = editor.getJSON();
    localStorage.setItem("savedData", JSON.stringify(jsonContent));
  }, [isEditable, editor, editor.getJSON()]);

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
        <div className="sidebar">
          <div className="sidebar-options-left">
            <div className="label-large">Table of contents</div>
            <div className="table-of-contents">
              <MemorizedToC editor={editor} items={items} />
            </div>
          </div>
        </div>
        <div className="main">
          <IsEditableMenu isEditable={isEditable} editHandler={editHandler} />
          <MenuBar editor={editor} />
          <div>{showMenu && <SlashBubbleMenuBar editor={editor} />}</div>
          <div>
            {!showMenu && <BubbleMenuBar editor={editor} user={user} />}
          </div>
          <DragHandleBar editor={editor} />
          {/* 입력창 */}
          <EditorContent
            editor={editor}
            onKeyDown={handleKeyDown}
            onMouseDown={handleMouseDown}
          />
        </div>
        <div className="sidebar">
          <div className="sidebar-options-right">
            <div className="label-large">Comments</div>
            <div className="comemnt">
              <CommentList />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TipTap;
