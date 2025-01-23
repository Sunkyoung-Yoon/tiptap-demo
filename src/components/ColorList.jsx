import ColorItem from "components/ColorItem";
import { useState } from "react";

const ColorList = ({ editor }) => {
  const [view, setView] = useState(false);

  const viewHandler = () => {
    setView(!view);
  };

  if (!editor) {
    return null;
  }

  return (
    <>
      <div className="color-group">
        <label>
          <button onClick={viewHandler}>
            <input
              type="color"
              onInput={(event) =>
                editor.chain().focus().setColor(event.target.value).run()
              }
              value={editor.getAttributes("textStyle").color}
              data-testid="setColor"
            />
            {view ? "  ▲" : "  ▼"}
          </button>
        </label>
        {view && <ColorItem editor={editor} />}
      </div>
    </>
  );
};

export default ColorList;
