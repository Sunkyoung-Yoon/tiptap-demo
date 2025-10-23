// src/extensions/commands/items.js

// COMMAND_ITEMS: 기존 SlashBubbleMenu UI와 동작 동일하게 구성
export const COMMAND_ITEMS = [
  {
    title: "제목1",
    subtitle: "섹션 제목(대)",
    icon: "H1",
    command: ({ editor, range }) =>
      editor.chain().focus().deleteRange(range).setNode("heading", { level: 1 }).run(),
  },
  {
    title: "제목2",
    subtitle: "섹션 제목(중)",
    icon: "H2",
    command: ({ editor, range }) =>
      editor.chain().focus().deleteRange(range).setNode("heading", { level: 2 }).run(),
  },
  {
    title: "제목3",
    subtitle: "섹션 제목(소)",
    icon: "H3",
    command: ({ editor, range }) =>
      editor.chain().focus().deleteRange(range).setNode("heading", { level: 3 }).run(),
  },
  {
    title: "글머리 기호 목록",
    subtitle: "간단한 목록",
    icon: "•",
    command: ({ editor, range }) =>
      editor.chain().focus().deleteRange(range).toggleBulletList().run(),
  },
  {
    title: "번호 목록",
    subtitle: "순서 있는 목록",
    icon: "1.",
    command: ({ editor, range }) =>
      editor.chain().focus().deleteRange(range).toggleOrderedList().run(),
  },
  {
    title: "인용",
    subtitle: "인용문 삽입",
    icon: "❝",
    command: ({ editor, range }) =>
      editor.chain().focus().deleteRange(range).toggleBlockquote().run(),
  },
];

// Suggestion.items()용 필터 함수
export function getFilteredItems({ query }) {
  console.log('query',query);
  const q = (query || "").trim().toLowerCase();
  console.log('q', q);
  if (!q) return COMMAND_ITEMS;
  return COMMAND_ITEMS.filter(
    (i) =>
      i.title.toLowerCase().includes(q) ||
      (i.subtitle && i.subtitle.toLowerCase().includes(q))
  );
}
