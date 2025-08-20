

// import { FaBold, FaItalic, FaUnderline } from 'react-icons/fa';
// import { IoCode, IoLink } from 'react-icons/io5';
// import { MdFormatQuote } from 'react-icons/md';
// import { BsFillEmojiSmileFill } from 'react-icons/bs';
// import { FiAtSign } from 'react-icons/fi';
// import { FaHashtag } from 'react-icons/fa6';
// import { PiBracketsCurlyBold } from 'react-icons/pi';
import { useEffect, useRef, useState } from 'react';

import styles from "./TextEditor.module.css"
// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";



import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Підключаємо стилі

const TextEditor = ({ onChange, initialContent = "" }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    setContent(discordToHtml(initialContent));
  }, [initialContent]);

  const parseContent = (html) => {
    let tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    const traverse = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent;
      }

      let formattedText = "";
      for (let child of node.childNodes) {
        let childText = traverse(child);

        if (child.nodeName === "STRONG" && child.childNodes[0]?.nodeName === "EM") {
          childText = `**_${childText}_**`;
        } else if (child.nodeName === "U" && child.childNodes[0]?.nodeName === "EM") {
          childText = `__*${childText}*__`;
        } else if (child.nodeName === "U" && child.childNodes[0]?.nodeName === "STRONG") {
          childText = `__**${childText}**__`;
        } else if (child.nodeName === "STRONG") {
          childText = `**${childText}**`;
        } else if (child.nodeName === "EM") {
          childText = `*${childText}*`;
        } else if (child.nodeName === "U") {
          childText = `__${childText}__`;
        } else if (child.nodeName === "S") {
          childText = `~~${childText}~~`;
        }
        formattedText += childText;
      }
      return formattedText;
    };
    return traverse(tempDiv);
  };

  const discordToHtml = (text) => {
    return text
      .replace(/\*\*_([^*]+)_\*\*/g, "<strong><em>$1</em></strong>")
      .replace(/__(\*\*([^*]+)\*\__)__/g, "<u><strong>$2</strong></u>")
      .replace(/__(\*([^*]+)\*)__/g, "<u><em>$2</em></u>")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/__(.*?)__/g, "<u>$1</u>")
      .replace(/~~(.*?)~~/g, "<s>$1</s>");
  };

  const handleChange = (value) => {
    setContent(value);
    const discordFormatted = parseContent(value);
    onChange(discordFormatted);
  };

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],

      ["clean"],
    ],
  };

  return (
    <div className={styles.Container}>
      <h1 className={styles.Title}>Поле для повідомлення участнику</h1>
     <style>{`
  .ql-toolbar.ql-snow button {
    width: clamp(30px, 2.8vw, 58px) !important;
    height: clamp(30px, 2.8vw, 58px) !important;
    padding: clamp(5px, 1vw, 14px) !important;
  }
  .ql-toolbar.ql-snow button svg {
    width: 100% !important;
    height: 100% !important;
  }
  .ql-snow .ql-editor {
    font-size: clamp(14px,1.02vw,24px) !important;
  }
`}</style>

      <ReactQuill
        value={content}
        onChange={handleChange}
        modules={modules}
        className={styles.editor}
        
      />
    </div>
  );
};

export default TextEditor;



