import styles from "styles/menubar.module.scss";

const MenuBar = ({ editor }) => {
  return (
    <div className={styles.toolbar}>
      {/*heading*/}
      <div className={styles.itemBox}>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`${styles.toolbarBtn} ${styles.h1} ${
            editor.isActive("heading", { level: 2 })
              ? styles.active
              : styles.none
          }`}
        ></button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={`${styles.toolbarBtn} ${styles.h2} ${
            editor.isActive("heading", { level: 3 })
              ? styles.active
              : styles.none
          }`}
        ></button>
      </div>
      {/*text formatting*/}
      <div className={styles.line} />
      <div className={styles.itemBox}>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`${styles.toolbarBtn} ${styles.bold} ${
            editor.isActive("bold") ? styles.active : styles.none
          }`}
        />
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`${styles.toolbarBtn} ${styles.italic} ${
            editor.isActive("italic") ? styles.active : styles.none
          }`}
        ></button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`${styles.toolbarBtn} ${styles.underline} ${
            editor.isActive("underline") ? styles.active : styles.none
          }`}
        ></button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`${styles.toolbarBtn} ${styles.strike} ${
            editor.isActive("strike") ? styles.active : styles.none
          }`}
        ></button>
      </div>
      <div className={`${styles.line} `} />
      <div className={styles.itemBox}>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`${styles.toolbarBtn} ${styles.bulleted} ${
            editor.isActive("bulletList") ? styles.active : styles.none
          }`}
        ></button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`${styles.toolbarBtn} ${styles.numbered} ${
            editor.isActive("orderedList") ? styles.active : styles.none
          }`}
        ></button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`${styles.toolbarBtn} ${styles.quote} ${
            editor.isActive("blockquote") ? styles.active : styles.none
          }`}
        ></button>
      </div>
      <div className={styles.line} />
      <div className={styles.itemBox}>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          className={`${styles.toolbarBtn} ${styles.undo} ${
            editor.isActive("blockquote") ? styles.active : styles.none
          }`}
        ></button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          className={`${styles.toolbarBtn} ${styles.redo} ${
            editor.isActive("blockquote") ? styles.active : styles.none
          }`}
        ></button>
      </div>
      <div className={styles.line} />
      <div className={styles.itemBox}>
        <input type="file" id="file-upload" className={styles.file} />
        <label
          htmlFor="file-upload"
          className={`${styles.toolbarBtn} ${styles.fileLabel}`}
        />
      </div>
    </div>
  );
};

export default MenuBar;
