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
import { ActionSettings } from 'components/Settings/ActionSettings/ActionSettings';

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
  const [days, setDays] = useState(0); // Стан для днів
  const [hours, setHours] = useState(0); // Стан для годин
  const [minutes, setMinutes] = useState(0); // Стан для хвилин
  const [selectedAction, setSelectedAction] = useState('null'); // Стан для вибору дії
  const [isCheckedAdmin, setIsChecked] = useState(false); // Стан для перевірки адмінських прав
  const [isDeleteMessage, setIsDeleteMessage] = useState(false); // Стан для видалення повідомлень
  const [thisTargetRoles, setThisTargetRoles] = useState([]);
  const [thisTargetChannels, setThisTargetChannels] = useState([]);

  const parseMuteTime = timeInMs => {
    const totalMinutes = Math.floor(timeInMs / 60000);
    const days = Math.floor(totalMinutes / (24 * 60));
    const hours = Math.floor((totalMinutes % (24 * 60)) / 60);
    const minutes = totalMinutes % 60;

    return { days, hours, minutes };
  };

  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  useEffect(() => {
    if (settings?.settings?.scamLinks?.targetLinks) {
      setTags(settings.settings.scamLinks.targetLinks);
    }
    if (settings?.settings?.badwords?.actions?.mute?.muteTimeMs) {
      const { days, hours, minutes } = parseMuteTime(
        settings.settings.badwords.actions.mute.muteTimeMs
      );
      setDays(days);
      setHours(hours);
      setMinutes(minutes);
    }
    if (settings?.settings?.scamLinks?.actions) {
      const { enabled, giveWarn, deleteMsg, ignoreAdmins, notifyUser } =
        settings.settings.scamLinks.actions;

      const isMuteEnabled =
        settings?.settings?.scamLinks?.actions?.mute?.enabled;
      const isGiveWarnEnabled =
        settings?.settings?.scamLinks?.actions?.giveWarn;

      if (isMuteEnabled) {
        setSelectedAction('mute');
      } else if (isGiveWarnEnabled) {
        setSelectedAction('warning');
      } else {
        setSelectedAction('null');
      }
      setIsDeleteMessage(!!deleteMsg); // Встановлення стану для видалення повідомлень
      setIsChecked(!!ignoreAdmins); // Встановлення стану для адміністраторів
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
    const muteTimeMs =
      (days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60) * 1000; // Розрахунок часу муту у мілісекундах
    const isMuteEnabled = selectedAction === 'mute';
    const isGiveWarn = selectedAction === 'warning';

    dispatch(
      PatchSettings({
        settings: {
          scamLinks: {
            targetLinks: tags,
            actions: {
              mute: {
                enabled: isMuteEnabled,
                muteTimeMs,
              },
              giveWarn: isGiveWarn,
              deleteMsg: isDeleteMessage,
              // giveWarn: iisGi
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
      <ActionSettings
        onDaysChange={setDays}
        onHoursChange={setHours}
        onMinutesChange={setMinutes}
        onSelectedActionChange={setSelectedAction}
        onIsCheckedAdminChange={setIsChecked}
        onIsDeleteMessageChange={setIsDeleteMessage}
        onIsDeleteMessage={isDeleteMessage}
        onSelectedAction={selectedAction}
        onDays={days}
        onHours={hours}
        onMinutes={minutes}
        onIsCheckedAdmin={isCheckedAdmin}
        onThisTargetRoles={thisTargetRoles}
        onThisTargetChannels={thisTargetChannels}
        onSetTargetRoles={setThisTargetRoles}
        onSetTargetChannels={setThisTargetChannels}
      />
    </div>
  );
};

export default LinksPage;
