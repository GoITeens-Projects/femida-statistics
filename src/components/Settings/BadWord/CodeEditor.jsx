import { useState, useEffect, useRef } from "react";



import styles from "./BadWord.module.css";
import * as monaco from "monaco-editor";



export const CodeEditor = ({ value, setEditorInstance }) => {
    const editorRef = useRef(null);

    useEffect(() => {
        // Отримуємо збережену тему з localStorage
        const savedTheme = localStorage.getItem("theme");
        // Встановлюємо тему редактора на основі значення
        const editorTheme = savedTheme === "light" ? "vs" : "vs-dark";

        // Створюємо інстанс редактора
        const editor = monaco.editor.create(editorRef.current, {
            value: value || "",
            language: "plaintext",
            theme: editorTheme,
            automaticLayout: true,
            minimap: { enabled: false },
        });

        // Передаємо редактор через колбек
        setEditorInstance(editor);

        // Очищення ресурсу при розмонтуванні
        return () => {
            editor.dispose();
        };
    }, [value, setEditorInstance]);

    return <div ref={editorRef} className={styles.EditorContainer}></div>;
};