import { computePosition, flip, shift } from "@floating-ui/dom";
import { posToDOMRect } from "@tiptap/core";
import { ReactRenderer } from "@tiptap/react";

import CommandList from "extensions/commands/CommandList";
import { getFilteredItems } from "extensions/commands/items";

const updatePosition = (editor, element) => {
  const virtualElement = {
    getBoundingClientRect: () =>
      posToDOMRect(
        editor.view,
        editor.state.selection.from,
        editor.state.selection.to
      ),
  };

  computePosition(virtualElement, element, {
    placement: "bottom-start",
    strategy: "absolute",
    middleware: [shift(), flip()],
  }).then(({ x, y, strategy }) => {
    element.style.width = "max-content";
    element.style.position = strategy;
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
  });
};

export default {
  // '/' 입력 시 자동으로 실행되도록 설정
  char: "/",
  allowSpaces: true,
  startOfLine: false,

  // 텍스트 기반 검색
  items: ({ query }) => [...getFilteredItems({ query })],

  render: () => {
    let component;

    return {
      onStart: (props) => {
        component = new ReactRenderer(CommandList, {
          props,
          editor: props.editor,
        });

        if (!props.clientRect) return;

        component.element.style.position = "absolute";
        document.body.appendChild(component.element);

        updatePosition(props.editor, component.element);
      },

      onUpdate(props) {
        component.updateProps(props);
        if (!props.clientRect) return;
        updatePosition(props.editor, component.element);
      },

      onKeyDown(props) {
        // ESC 키로 닫기
        if (props.event.key === "Escape") {
          component.destroy();
          component.element.remove();
          return true;
        }
        // 화살표 키, Enter 지원
        return component.ref?.onKeyDown(props);
      },

      onExit() {
        component.destroy();
        component.element.remove();
      },
    };
  },
};
