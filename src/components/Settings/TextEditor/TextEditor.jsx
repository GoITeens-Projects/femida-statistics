

import { FaBold, FaItalic, FaUnderline } from 'react-icons/fa';
import { IoCode, IoLink } from 'react-icons/io5';
import { MdFormatQuote } from 'react-icons/md';
import { BsFillEmojiSmileFill } from 'react-icons/bs';
import { FiAtSign } from 'react-icons/fi';
import { FaHashtag } from 'react-icons/fa6';
import { PiBracketsCurlyBold } from 'react-icons/pi';
import { useEffect, useRef, useState } from 'react';

import styles from "./TextEditor.module.css"
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";



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
      ["blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  return (
    <div>
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
















































// const textMethods = {
//   bold(str) {
//     return '**' + str + '**';
//   },
//   italic(str) {
//     return '*' + str + '*';
//   },
//   underline(str) {
//     return '__' + str + '__';
//   },
//   code(str) {
//     return '``` \n' + str + '```';
//   },
//   quote(str) {
//     return '\n >>> ' + str;
//   },
// };

// const TextEditor = () => {
//   const textareaRef = useRef(null);
//   // const selection = ;
//   const [selectedText, setSelectedText] = useState('');

//   const editText = e => {
//     e.preventDefault();
//     const textMethod = e.currentTarget.dataset.method;
//     const selection = document.getSelection();
//     // const selectedText = textareaRef.current.value.substring(
//     //   textareaRef.current.selectionStart,
//     //   textareaRef.current.selectionEnd
//     // );
//     // console.log(selectedText);
//     console.log(selection, selection.toString());
//     console.log(selection.baseNode.parentNode?.dataset);
//     if (!textMethod) return;
//     if (
//       selection.baseNode.nodeName !== '#text' ||
//       !selection.baseNode.parentNode?.dataset?.textareaField
//     )
//       return;
//     const fullStr = selection.baseNode.parentNode.innerHTML.split('');

//     fullStr.splice(
//       selection.extentOffset > selection.baseOffset
//         ? selection.baseOffset
//         : selection.extentOffset,
//       selection.toString().length,
//       ...textMethods[textMethod](selection.toString()).split('')
//     );
//     console.log(fullStr);
//     selection.baseNode.parentNode.innerHTML = fullStr.join('');
//   };
//   const setFocus = e => {
//     e.target && e.target.focus();
//   };
//   return (
//     <div className={css.editor}>
//       <ul className={css.editorList}>
//         <li className={css.editorItem} data-method="bold" onClick={editText}>
//           <FaBold />
//         </li>
//         <li className={css.editorItem} data-method="italic" onClick={editText}>
//           <FaItalic />
//         </li>
//         <li
//           className={css.editorItem}
//           data-method="underline"
//           onClick={editText}
//         >
//           <FaUnderline />
//         </li>
//         <li className={css.editorItem} data-method="code" onClick={editText}>
//           <IoCode />
//         </li>
//         <li className={css.editorItem} data-method="quote" onClick={editText}>
//           <MdFormatQuote />
//         </li>
//         <li className={css.editorItem}>
//           <IoLink />
//         </li>
//         <li className={css.editorItem}>
//           <BsFillEmojiSmileFill />
//         </li>
//         <li className={css.editorItem}>
//           <FiAtSign />
//         </li>
//         <li className={css.editorItem}>
//           <FaHashtag />
//         </li>
//         <li className={css.editorItem}>
//           <PiBracketsCurlyBold />
//         </li>
//       </ul>
//       {/* <textarea className={css.editorInput} ref={textareaRef}></textarea> */}
//       <div
//         className={css.editorInput}
//         ref={textareaRef}
//         contentEditable="true"
//         onBlur={setFocus}
//         data-textarea-field={true}
//       >
//         hahahalalala
//       </div>
//     </div>
//   );
// };

// export default TextEditor;
