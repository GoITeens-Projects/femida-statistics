import Shadow from "components/Shadow/Shadow";
import styles from "./FromContainer.module.css";
import { CiBoxList } from "react-icons/ci";


export const FormContainer = ({
    addedWords,
    inputValue,
    onInputChange,
    onAddWord,
    onHandleDeleteWord,
    onOpenModal,
}) => {
    const handleInputKeyPress = (event) => {
        if (event.key === "Enter" && inputValue.trim()) {
            onAddWord(inputValue);
            onInputChange(""); // Очищення інпуту після додавання
        }
    };

    return (
        <div className={styles.FromContainer}>
            <Shadow
                leftFirst={-7}
                widthFirst={5}
                heightSecond={5}
                rightSecond={3}
                bottomSecond={-7}
                backgroundBoth={'#6EABD4'}
                borderColorBoth={'#558DB2'}
            />
            <label className={styles.LabelFormBadWords}>Налаштування фільтрування</label>

            <div className={styles.InputContainer}>
                <div className={styles.WordCards}>
                    {addedWords.slice(0, 10).map((word, index) => (
                        <div key={index} className={styles.WordCard}>
                            {word}
                            <svg
                                className={styles.DeleteIcon}
                                onClick={() => onHandleDeleteWord(word)}
                                width="25"
                                height="25"
                                viewBox="0 0 6 6"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M1.5 4.49976L4.49996 1.49979"
                                    stroke="#678F95"
                                    strokeWidth="0.5"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M4.5 4.49976L1.50004 1.49979"
                                    stroke="#678F95"
                                    strokeWidth="0.5"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </div>
                    ))}
                    {addedWords.length > 10 && (
                        <div className={styles.BadWordListContainer} onClick={onOpenModal}>
                            <p className={styles.BadWordListText}>+ ще {addedWords.length - 10}</p>
                            <CiBoxList className={styles.IconBoxList} />
                        </div>
                    )}
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => onInputChange(e.target.value)}
                        onKeyDown={handleInputKeyPress}
                        className={styles.InputInsideContainer}
                        placeholder="Введіть слово..."
                    />
                </div>
            </div>
        </div>
    );
};
