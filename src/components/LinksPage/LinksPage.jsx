import styles from './LinksPage.module.css';
import { ChevronDown, X, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Shadow from 'components/Shadow/Shadow';
import { SettingsNavigation } from 'components/Settings/SettingsNavigation/SettingsNavigation';
import { CodeEditor } from 'components/Settings/BadWord/CodeEditor';
import { Modal } from 'components/Settings/BadWord/ModalCodeEditor';
import { PatchSettings } from '../../redux/settings/operation';
import { selectSettingsData } from '../../redux/settings/selectors';
import { toast, Bounce } from 'react-toastify';
import { fetchSettings } from '../../redux/settings/operation';
import { UnsavedChangesModal } from 'components/Settings/BadWord/UnsavedChangesModal';
import { useNavigate } from 'react-router-dom';
import TextEditor from 'components/Settings/TextEditor/TextEditor';

const LinksPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const settings = useSelector(selectSettingsData);
  const [isChangesSaved, setIsChangesSaved] = useState(true);
  const [isOpenDropDown, setIsOpenDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Оберіть опцію');
  //   !tags:
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageContent, setMessageContent] = useState('');
  const maxVisibleTags = 7;
  //   !
  const options = [
    'Ролі модераторів',
    'Ролі адміністраторів',
    'Ще щось за потреби',
  ];
  const [editorInstance, setEditorInstance] = useState(null);
  console.log(messageContent);

  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  useEffect(() => {
    if (settings?.settings?.scamLinks?.targetLinks) {
      setTags(settings.settings.scamLinks.targetLinks);
    }
  }, [settings]);
  //   console.log(settings.settings.scamLinks.targetLinks);
  const handleSelectDropdown = option => {
    setSelectedOption(option);
    setIsOpenDropdown(false);
  };

  const addTag = () => {
    if (inputValue.trim() && !tags.includes(inputValue.trim())) {
      setTags([...tags, inputValue.trim()]);
      setInputValue('');
    }
  };

  const removeTag = tagToRemove => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addTag();
    }
  };

  const handleSaveModal = () => {
    if (editorInstance) {
      const content = editorInstance.getValue();
      const updatedBadWords = content
        .split('\n')
        .map(word => word.trim())
        .filter(Boolean);

      setTags(updatedBadWords);
    }

    setTimeout(() => {
      setIsModalOpen(false);
    }, 300);
  };

  const handleSaveData = () => {
    dispatch(
      PatchSettings({
        settings: {
          scamLinks: {
            targetLinks: tags,
            actions: {
              notifyUser: {
                messageFn: messageContent,
              },
            },
          },
        },
      })
    );
    console.log('secuess');
    toast.success('Данні успішно збережено', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      theme: 'light',
      transition: Bounce,
    });
  };

  const handleBackClick = () => {
    console.log(tags.length);
    if (
      settings.settings.scamLinks.targetLinks.length !== tags.length ||
      messageContent !==
        settings.settings.scamLinks.actions.notifyUser.messageFn
    ) {
      // console.log('slslslsl');
      setIsChangesSaved(false);
    } else {
      navigate('/settings');
    }
  };

  return (
    <div className={styles.scamLinks}>
      <SettingsNavigation
        onHandleSave={handleSaveData}
        onHandleBackClick={handleBackClick}
      />
      {isChangesSaved === false && (
        <UnsavedChangesModal
          onClose={() => {
            setIsChangesSaved(true);
            navigate('/settings');
          }}
          onSave={() => {
            handleSaveData();
            navigate('/settings');
          }}
        />
      )}
      <h2 className={styles.scamLinksTitle}>Посилання</h2>
      <div className={styles.scamLinksBox}>
        <div className={styles.workStrategyBox}>
          <h3 className={styles.workStrategyTitle}>Стратегія роботи</h3>
          <div className={styles.dropdown}>
            <button
              className={styles['dropdown-button']}
              onClick={() => setIsOpenDropdown(!isOpenDropDown)}
            >
              <span>{selectedOption}</span>
              <ChevronDown
                className={`${styles.icon} ${
                  isOpenDropDown ? `${styles.rotate}` : ''
                }`}
              />
            </button>
            {isOpenDropDown && (
              <ul className={styles['dropdown-menu']}>
                {options.map((option, index) => (
                  <li key={index} onClick={() => handleSelectDropdown(option)}>
                    {option}
                  </li>
                ))}
              </ul>
            )}
            <Shadow
              leftFirst={-6}
              widthFirst={5}
              heightSecond={5}
              rightSecond={2}
              bottomSecond={-6}
              backgroundBoth={'var(--shadow-secondary-border)'}
              borderColorBoth={'var(--chart-accent-color)'}
            />
          </div>
        </div>
        <div className={styles.forbiddenLinksBox}>
          <h3 className={styles.forbiddenLinksTitle}>
            Заборонені посилання та домени
          </h3>
          <div className={styles['tag-input']}>
            <div className={styles['tags-container']}>
              {tags.slice(0, maxVisibleTags).map((tag, index) => (
                <div className={styles.tag} key={index}>
                  <p className={styles.tagText}>{tag}</p>
                  <X
                    className={styles['remove-icon']}
                    onClick={() => removeTag(tag)}
                  />
                </div>
              ))}
              {tags.length > maxVisibleTags && (
                <button
                  className="more-button"
                  onClick={() => setIsModalOpen(true)}
                >
                  + {tags.length - maxVisibleTags} посилань
                </button>
              )}
              <input
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Введіть слово..."
              />
              <button className={styles['add-button']} onClick={addTag}>
                <Plus />
              </button>
              {isModalOpen && (
                <Modal
                  onClose={() => setIsModalOpen(false)}
                  onSave={handleSaveModal}
                >
                  <h2 className={styles.TitleBadWords}>
                    Редагування поганих слів
                  </h2>
                  <CodeEditor
                    value={tags.join('\n') || ''}
                    setEditorInstance={setEditorInstance}
                  />
                </Modal>
              )}
            </div>
            <Shadow
              leftFirst={-8}
              widthFirst={5}
              heightSecond={5}
              rightSecond={4}
              bottomSecond={-8}
              backgroundBoth={'var(--shadow-secondary-border)'}
              borderColorBoth={'var(--chart-accent-color)'}
            />
          </div>
        </div>
      </div>
      <TextEditor
        onChange={setMessageContent}
        initialContent={
          settings?.settings?.scamLinks?.actions?.notifyUser?.messageFn || ''
        }
      />
    </div>
  );
};

export default LinksPage;
