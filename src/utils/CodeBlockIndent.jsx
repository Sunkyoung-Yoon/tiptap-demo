import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { lowlight } from "lowlight";

import html from "highlight.js/lib/languages/xml";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import python from "highlight.js/lib/languages/python";
import cpp from "highlight.js/lib/languages/cpp";
import json from "highlight.js/lib/languages/json";
import java from "highlight.js/lib/languages/java";
import c from "highlight.js/lib/languages/c";

lowlight.registerLanguage("css", css);
lowlight.registerLanguage("js", js);
lowlight.registerLanguage("javascript", js);
lowlight.registerLanguage("jsx", js);
lowlight.registerLanguage("ts", ts);
lowlight.registerLanguage("tsx", ts);
lowlight.registerLanguage("typescript", ts);
lowlight.registerLanguage("json", json);
lowlight.registerLanguage("html", html);
lowlight.registerLanguage("xml", html);
lowlight.registerLanguage("python", python);
lowlight.registerLanguage("cpp", cpp);
lowlight.registerLanguage("c", c);
lowlight.registerLanguage("java", java);

const CustomCodeBlockLowlight = CodeBlockLowlight.extend({
  addKeyboardShortcuts() {
    return {
      Tab: () => {
        const { state } = this.editor;
        const { selection } = state;
        const { from, to } = selection;
        const { $from } = selection;

        // 현재 선택 영역의 노드 가져오기
        const nodeAtSelection = $from.node();

        if (nodeAtSelection && nodeAtSelection.type.name === "codeBlock") {
          let tr;
          // 텍스트가 드래그되었는지 확인
          const isTextSelected = selection.from < selection.to;

          if (isTextSelected) {
            // select 된 텍스트 맨 앞을 기준으로 tab을 함
            tr = state.tr.insertText("  ", from);
          } else {
            tr = state.tr.insertText("  ", from, to);
          }

          this.editor.view.dispatch(tr);
        }

        return true;
      },
      "Shift-Tab": () => {
        const { state } = this.editor;
        const { selection } = state;
        const { $from } = selection;

        const nodeAtSelection = $from.node();

        if (nodeAtSelection && nodeAtSelection.type.name === "codeBlock") {
          let tr;
          const isTextSelected = selection.from < selection.to;

          if (isTextSelected) {
            const startPos = $from.pos;
            const endPos = $from.end();

            const lineStartPos = state.doc.resolve(startPos).start();
            const lineEndPos = state.doc.resolve(endPos).end();

            const lineText = state.doc.textBetween(
              lineStartPos,
              lineEndPos,
              " "
            );

            if (lineText.startsWith("  ")) {
              tr = state.tr.delete(lineStartPos, lineStartPos + 2);
            }
          } else {
            const { $to } = selection;
            const endPos = $to.pos;

            // 들여쓰기는 최소 2칸의 여유가 있어야 함.
            if (endPos <= 1) return true;

            const endSlice = state.doc.slice(endPos - 2, endPos);
            const endText = endSlice.content.firstChild?.text;

            if (endText === "  ") {
              tr = state.tr.delete(endPos - 2, endPos);
            }
          }

          if (tr) {
            this.editor.view.dispatch(tr);
          }
        }

        return true;
      },
    };
  },
}).configure({
  lowlight,
});

export default CustomCodeBlockLowlight;
