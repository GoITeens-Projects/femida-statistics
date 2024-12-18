import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSettings } from "../../redux/settings/operation"; // Дія для отримання налаштувань
import { badWord } from "../../redux/badword/operation"; // Дія для збереження нових слів
import styles from "./BadWord.module.css";
import * as monaco from "monaco-editor";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Shadow from "components/Shadow/Shadow";
import { MdDeleteForever } from "react-icons/md";
import { CiBoxList } from "react-icons/ci";

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