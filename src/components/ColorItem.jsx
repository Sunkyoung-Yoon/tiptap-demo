const ColorItem = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <>
      <div className="color-item">
        <button
          onClick={() => editor.chain().focus().setColor("#333333").run()}
          className={
            editor.isActive("textStyle", { color: "#333333" })
              ? "is-active"
              : ""
          }
          data-testid="setDefault"
          style={{ color: "#333333" }}
        >
          A
        </button>
        <button
          onClick={() => editor.chain().focus().setColor("#A0A0A0").run()}
          className={
            editor.isActive("textStyle", { color: "#A0A0A0" })
              ? "is-active"
              : ""
          }
          data-testid="setGray"
          style={{ color: "#A0A0A0" }}
        >
          A
        </button>
        <button
          onClick={() => editor.chain().focus().setColor("#C19A6B").run()}
          className={
            editor.isActive("textStyle", { color: "#C19A6B" })
              ? "is-active"
              : ""
          }
          data-testid="setBrown"
          style={{ color: "#C19A6B" }}
        >
          A
        </button>
        <button
          onClick={() => editor.chain().focus().setColor("#F4A300").run()}
          className={
            editor.isActive("textStyle", { color: "#F4A300" })
              ? "is-active"
              : ""
          }
          data-testid="setOrange"
          style={{ color: "#F4A300" }}
        >
          A
        </button>
        <button
          onClick={() => editor.chain().focus().setColor("#F4C500").run()}
          className={
            editor.isActive("textStyle", { color: "#F4C500" })
              ? "is-active"
              : ""
          }
          data-testid="setYellow"
          style={{ color: "#F4C500" }}
        >
          A
        </button>
        <button
          onClick={() => editor.chain().focus().setColor("#4CAF50").run()}
          className={
            editor.isActive("textStyle", { color: "#4CAF50" })
              ? "is-active"
              : ""
          }
          data-testid="setGreen"
          style={{ color: "#4CAF50" }}
        >
          A
        </button>
        <button
          onClick={() => editor.chain().focus().setColor("#2196F3").run()}
          className={
            editor.isActive("textStyle", { color: "#2196F3" })
              ? "is-active"
              : ""
          }
          data-testid="setBlue"
          style={{ color: "#2196F3" }}
        >
          A
        </button>
        <button
          onClick={() => editor.chain().focus().setColor("#9C27B0").run()}
          className={
            editor.isActive("textStyle", { color: "#9C27B0" })
              ? "is-active"
              : ""
          }
          data-testid="setPurple"
          style={{ color: "#9C27B0" }}
        >
          A
        </button>
        <button
          onClick={() => editor.chain().focus().setColor("#E91E63").run()}
          className={
            editor.isActive("textStyle", { color: "#E91E63" })
              ? "is-active"
              : ""
          }
          data-testid="setPink"
          style={{ color: "#E91E63" }}
        >
          A
        </button>
        <button
          onClick={() => editor.chain().focus().setColor("#F44336").run()}
          className={
            editor.isActive("textStyle", { color: "#F44336" })
              ? "is-active"
              : ""
          }
          data-testid="setRed"
          style={{ color: "#F44336" }}
        >
          A
        </button>
      </div>
    </>
  );
};

export default ColorItem;
