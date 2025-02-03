import styles from "styles/slashmenubar.module.scss";

import { BubbleMenu } from "@tiptap/react";

const SlashBubbleMenuBar = ({ editor }) => {
  return (
    <div>
      <BubbleMenu
        editor={editor}
        tippyOptions={{
          duration: 100,
          placement: "bottom-start",
          trigger: "manual",
        }}
        shouldShow={() => true}
      >
        <div className={styles.slashbar}>
          <div className={styles.intro}>기본 블록</div>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={`${styles.slashbarBtn} ${
              editor.isActive("heading", { level: 1 })
                ? styles.active
                : styles.none
            }`}
          >
            <div className={`${styles.btnImage} ${styles.h1}`}></div>
            <div className={styles.btnContent}>
              <h3 className={styles.btnTitle}>제목1</h3>
              <p className={styles.btnDesc}>섹션 제목(대)</p>
            </div>
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={`${styles.slashbarBtn} ${
              editor.isActive("heading", { level: 2 })
                ? styles.active
                : styles.none
            }`}
          >
            <div className={`${styles.btnImage} ${styles.h2}`}></div>
            <div className={styles.btnContent}>
              <h3 className={styles.btnTitle}>제목2</h3>
              <p className={styles.btnDesc}>섹션 제목(중)</p>
            </div>
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={`${styles.slashbarBtn} ${
              editor.isActive("heading", { level: 3 })
                ? styles.active
                : styles.none
            }`}
          >
            <div className={`${styles.btnImage} ${styles.h3}`}></div>
            <div className={styles.btnContent}>
              <h3 className={styles.btnTitle}>제목3</h3>
              <p className={styles.btnDesc}>섹션 제목(소)</p>
            </div>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`${styles.slashbarBtn} ${
              editor.isActive("bulletList") ? styles.active : styles.none
            }`}
          >
            <div className={`${styles.btnImage} ${styles.bulleted}`}></div>
            <div className={styles.btnContent}>
              <h3 className={styles.btnTitle}>글머리 기호 목록</h3>
              <p className={styles.btnDesc}>
                간단한 글머리 기호 목록을 생성하세요.
              </p>
            </div>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`${styles.slashbarBtn} ${
              editor.isActive("orderedList") ? styles.active : styles.none
            }`}
          >
            <div className={`${styles.btnImage} ${styles.numbered}`}></div>
            <div className={styles.btnContent}>
              <h3 className={styles.btnTitle}>번호 매기기 목록</h3>
              <p className={styles.btnDesc}>번호가 매겨진 목록을 생성하세요.</p>
            </div>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`${styles.slashbarBtn} ${
              editor.isActive("blockquote") ? styles.active : styles.none
            }`}
          >
            <div className={`${styles.btnImage} ${styles.quote}`}></div>
            <div className={styles.btnContent}>
              <h3 className={styles.btnTitle}>인용</h3>
              <p className={styles.btnDesc}>인용문을 작성하세요. </p>
            </div>
          </button>
        </div>
      </BubbleMenu>
    </div>
  );
};

export default SlashBubbleMenuBar;
