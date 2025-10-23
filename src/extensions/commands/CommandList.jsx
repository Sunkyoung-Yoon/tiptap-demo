// src/extensions/commands/CommandList.jsx
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import "styles/commands.scss"; // 아래 SCSS

const CommandList = forwardRef(function CommandList(
  { items = [], command },
  ref
) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // items 바뀌면 선택 초기화
  useEffect(() => {
    setSelectedIndex(0);
  }, [items]);

  const selectItem = (index) => {
    const item = items[index];
    if (item) command(item);
  };

  const upHandler = () =>
    setSelectedIndex((i) => (i + items.length - 1) % items.length);
  const downHandler = () =>
    setSelectedIndex((i) => (i + 1) % items.length);
  const enterHandler = () => selectItem(selectedIndex);

  // 외부에서 onKeyDown을 호출할 수 있도록 노출
  useImperativeHandle(ref, () => ({
    onKeyDown({ event }) {
      if (event.key === "ArrowUp") {
        event.preventDefault();
        event.stopPropagation();
        upHandler();
        return true;
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        event.stopPropagation();
        downHandler();
        return true;
      }
      if (event.key === "Enter") {
        event.preventDefault();
        event.stopPropagation();
        enterHandler();
        return true;
      }
      return false;
    },
  }));

 return (
    <div className="dropdown-menu" onMouseDown={(e) => e.stopPropagation()}>
      {items.length ? (
        items.map((item, index) => (
          <button
            key={`${item.title}-${index}`}
            className={index === selectedIndex ? "is-selected" : ""}
            onClick={() => selectItem(index)}
            onMouseEnter={() => setSelectedIndex(index)}
            type="button"
          >
            {/* 아이콘 */}
            {item.icon ? <span className="cmd-icon">{item.icon}</span> : null}

            {/* 텍스트 그룹 */}
            <span className="cmd-texts">
              <span className="cmd-title">{item.title}</span>
              {item.subtitle ? (
                <span className="cmd-subtitle">{item.subtitle}</span>
              ) : null}
            </span>
          </button>
        ))
      ) : (
        <div className="item">No result</div>
      )}
    </div>
  );
});

export default CommandList;
