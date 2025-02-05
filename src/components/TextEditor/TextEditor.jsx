import css from './TextEditor.module.css';
import { Editor } from '@monaco-editor/react';
import { FaBold, FaItalic, FaUnderline } from 'react-icons/fa';
import { IoCode, IoLink } from 'react-icons/io5';
import { MdFormatQuote } from 'react-icons/md';
import { BsFillEmojiSmileFill } from 'react-icons/bs';
import { FiAtSign } from 'react-icons/fi';
import { FaHashtag } from 'react-icons/fa6';
import { PiBracketsCurlyBold } from 'react-icons/pi';
import { useEffect, useRef, useState } from 'react';

const textMethods = {
  bold(str) {
    return '**' + str + '**';
  },
  italic(str) {
    return '*' + str + '*';
  },
  underline(str) {
    return '__' + str + '__';
  },
  code(str) {
    return '``` \n' + str + '```';
  },
  quote(str) {
    return '\n >>> ' + str;
  },
};

const TextEditor = () => {
  const textareaRef = useRef(null);
  // const selection = ;
  const [selectedText, setSelectedText] = useState('');

  const editText = e => {
    e.preventDefault();
    const textMethod = e.currentTarget.dataset.method;
    const selection = document.getSelection();
    // const selectedText = textareaRef.current.value.substring(
    //   textareaRef.current.selectionStart,
    //   textareaRef.current.selectionEnd
    // );
    // console.log(selectedText);
    console.log(selection, selection.toString());
    console.log(selection.baseNode.parentNode?.dataset);
    if (!textMethod) return;
    if (
      selection.baseNode.nodeName !== '#text' ||
      !selection.baseNode.parentNode?.dataset?.textareaField
    )
      return;
    const fullStr = selection.baseNode.parentNode.innerHTML.split('');

    fullStr.splice(
      selection.extentOffset > selection.baseOffset
        ? selection.baseOffset
        : selection.extentOffset,
      selection.toString().length,
      ...textMethods[textMethod](selection.toString()).split('')
    );
    console.log(fullStr);
    selection.baseNode.parentNode.innerHTML = fullStr.join('');
  };
  const setFocus = e => {
    e.target && e.target.focus();
  };
  return (
    <div className={css.editor}>
      <ul className={css.editorList}>
        <li className={css.editorItem} data-method="bold" onClick={editText}>
          <FaBold />
        </li>
        <li className={css.editorItem} data-method="italic" onClick={editText}>
          <FaItalic />
        </li>
        <li
          className={css.editorItem}
          data-method="underline"
          onClick={editText}
        >
          <FaUnderline />
        </li>
        <li className={css.editorItem} data-method="code" onClick={editText}>
          <IoCode />
        </li>
        <li className={css.editorItem} data-method="quote" onClick={editText}>
          <MdFormatQuote />
        </li>
        <li className={css.editorItem}>
          <IoLink />
        </li>
        <li className={css.editorItem}>
          <BsFillEmojiSmileFill />
        </li>
        <li className={css.editorItem}>
          <FiAtSign />
        </li>
        <li className={css.editorItem}>
          <FaHashtag />
        </li>
        <li className={css.editorItem}>
          <PiBracketsCurlyBold />
        </li>
      </ul>
      {/* <textarea className={css.editorInput} ref={textareaRef}></textarea> */}
      <div
        className={css.editorInput}
        ref={textareaRef}
        contentEditable="true"
        onBlur={setFocus}
        data-textarea-field={true}
      >
        hahahalalala
      </div>
    </div>
  );
};

export default TextEditor;
