import "styles/styles.scss";
import DragHandle from "@tiptap-pro/extension-drag-handle-react";
import React from "react";

const DragHandleBar = ({ editor }) => {
  return (
    <>
      <DragHandle editor={editor}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 9h16.5m-16.5 6.75h16.5"
          />
        </svg>
      </DragHandle>
    </>
  );
};

export default DragHandleBar;
