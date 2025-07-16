import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './GiftManageModal.module.css';
import Shadow from 'components/Shadow/Shadow';
import importIcon from './Group 498.svg';
import { fetchGiftManage, patchGift, createGift } from '../../../../../../redux/gift/operation';
import { PacmanLoader } from 'react-spinners';

export const GiftManageModal = ({ giftId, onClose }) => {
  const dispatch = useDispatch();
  const isCreating = giftId == null;

const {
  currentGift,
  loadingCurrent: loading,
  errorCurrent: error,
  creating,
  patching
} = useSelector(state => state.gifts);
const saving = creating || patching;

  // локальні стани форми
  const [imageSrc, setImageSrc] = useState(importIcon);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  const [localStatus, setLocalStatus] = useState(true);
  const [localType, setLocalType] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [onlyForStudents, setOnlyForStudents] = useState(false);

  const [titleError, setTitleError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [imageError, setImageError] = useState(false);

  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  // fetch з бекенду тільки для редагування
  useEffect(() => {
    if (!isCreating && giftId) {
      dispatch(fetchGiftManage(giftId));
    }
  }, [dispatch, giftId, isCreating]);

  // оновлення локального стану при завантаженні або при створенні
  useEffect(() => {
    if (isCreating) {
      setTitle('');
      setDescription('');
      setPrice('');
      setOnlyForStudents(false);
      setLocalType(true);
      setLocalStatus(true);
      setImageSrc(importIcon);
      setSelectedFile(null);
    } else if (currentGift) {
      setLocalStatus(currentGift.status?.available ?? false);
      setLocalType(currentGift.isVirtual ?? true);
      setTitle(currentGift.title ?? '');
      setDescription(currentGift.description ?? '');
      setPrice(currentGift.toReceive?.presentXpPrice ?? '');
      setOnlyForStudents(currentGift.onlyForStudents ?? false);
      if (currentGift.image) setImageSrc(currentGift.image);
    }
  }, [isCreating, currentGift]);

  // автозбільшення textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [description]);

  // обробники
  const openFileDialog = () => fileInputRef.current?.click();

const onFileChange = e => {
  const file = e.target.files?.[0];
  if (!file) return;
  setSelectedFile(file);
  setImageError(false); // ⬅️ знімає червону обводку
  const reader = new FileReader();
  reader.onload = () => setImageSrc(reader.result);
  reader.readAsDataURL(file);
};

  const handleStatusChange = (newStatus) => {
    setLocalStatus(newStatus);
  };

  const handleTypeChange = (newType) => {
    setLocalType(newType);
  };

const handleSave = () => {
 let hasError = false;

  // Перевірка поля "Назва подарунку"
  if (!title.trim()) {
    setTitleError(true);
    hasError = true;
  } else {
    setTitleError(false);
  }

  // Перевірка поля "XP"
  if (!price.toString().trim()) {
    setPriceError(true);
    hasError = true;
  } else {
    setPriceError(false);
  }
  if (imageSrc === importIcon) {
  setImageError(true);
  hasError = true;
} else {
  setImageError(false);
}

  if (hasError) return; // Якщо є помилки — не надсилаємо запит

  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);
  formData.append('presentXpPrice', price);
  formData.append('onlyForStudents', onlyForStudents);
  formData.append('isVirtual', localType);
  formData.append('status', localStatus);

  if (selectedFile) {
    formData.append('image', selectedFile);
  }

  const action = giftId && currentGift
    ? patchGift({ id: currentGift.id, formData })
    : createGift(formData);

  dispatch(action)
    .unwrap()
     .then(() => {
    onClose();
    window.location.reload();
  })
    .catch(err => console.error(err));
};

  return (
    <>
      <div className={styles.overlay} onClick={onClose}>
        <div className={styles.modal} onClick={e => e.stopPropagation()}>
       

         
<div className={styles.body}>
  {saving ? (
    <div  className={styles.loaderWrapper}>
      <PacmanLoader color="#6EABD4" size={50} speedMultiplier={1.5} />
    </div>
  ) : loading && !isCreating ? (
    <div  className={styles.loaderWrapper}>
      <PacmanLoader color="#6EABD4" size={50} speedMultiplier={1.5} />
    </div>
  ) : error ? (
    <p className={styles.Error}>{error}</p>
  ) : (
    <>
     <h5 className={styles.Title}>
            {isCreating ? 'Створення нового подарунку' : 'Редагування подарунку'}
          </h5>
     <div className={styles.body}>
            {loading && !isCreating && <p>Завантаження...</p>}
            {error && <p className={styles.Error}>{error}</p>}

            {!loading && !error && (
              <div className={styles.Columns}>
                <div className={styles.LeftColumn}>
                  <div className={styles.Container}>
                    <label className={styles.TitleInput}>
                      Назва подарунку
                     <input
  className={`${styles.Input} ${titleError ? styles.InputError : ''}`}
  type="text"
  value={title}
  onChange={e => {
    setTitle(e.target.value);
    if (titleError && e.target.value.trim()) setTitleError(false);
  }}
/>
{titleError && <p className={styles.ErrorMsg}>Обов’язкове поле</p>}
                    </label>
                  </div>

                  <div className={styles.Container}>
                    <label className={styles.TitleInput}>
                      Опис подарунку
                      <textarea
                        ref={textareaRef}
                        className={styles.TextareaDescription}
                        value={description}
                        rows={1}
                        onChange={e => setDescription(e.target.value)}
                      />
                    </label>
                  </div>

                  <div className={styles.Container}>
                    <label className={styles.TitleInput}>
                      Вартість в ХР
                     <input
  className={`${styles.Input} ${priceError ? styles.InputError : ''}`}
  type="number"
  value={price}
  onChange={e => {
    setPrice(e.target.value);
    if (priceError && e.target.value > 0) setPriceError(false);
  }}
/>
{priceError && <p className={styles.ErrorMsg}>Обов’язкове поле</p>}
                  
                    </label>
                  </div>

               <div className={styles.ContainerImport}>
  <p className={styles.TitleInput}>Зображення</p>
  <div className={styles.ImageBox}>
    {imageSrc === importIcon ? (
      <img
        src={importIcon}
        alt="Завантажити з пристрою"
        className={`${styles.ImportPictures} ${imageError ? styles.ErrorBorder : ''}`}
        onClick={openFileDialog}
      />
    ) : (
      <>
        <img
          src={imageSrc}
          alt="Gift"
          className={`${styles.ImportPictures} ${imageError ? styles.ErrorBorder : ''}`}
          onClick={() => setPreviewOpen(true)}
        />
        <button
          type="button"
          className={styles.ReplaceBtn}
          onClick={openFileDialog}
        >
          Замінити&nbsp;фото?
        </button>
      </>
    )}
  </div>

  {/* Це текст під картинкою */}
  {imageError && <p className={styles.Error}>Обов’язкове поле</p>}

  <input
    type="file"
    accept="image/*"
    ref={fileInputRef}
    style={{ display: 'none' }}
    onChange={onFileChange}
  />
</div>
                </div>

                <div className={styles.RightColumn}>
                  <div className={styles.Container}>
                    <label className={styles.TitleInput}>Тип подарунку</label>
                    <div className={styles.RadioGroup}>
                      {[{ label: 'Віртуальний', value: true }, { label: 'Фізичний', value: false }].map(({ label, value }) => (
                        <label key={label} className={styles.RadioOption}>
                          <input
                            type="radio"
                            name={`type-${giftId ?? 'new'}`}
                            className={styles.customRadio}
                            value={value.toString()}
                            checked={localType === value}
                            onChange={() => handleTypeChange(value)}
                          />
                          <span className={styles.RadioLabel}>{label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className={styles.Container}>
                    <label className={styles.TitleInput}>Статус подарунку</label>
                    <div className={styles.RadioGroup}>
                      {[{ label: 'Доступний', value: true }, { label: 'Недоступний', value: false }].map(({ label, value }) => (
                        <label key={label} className={styles.RadioOption}>
                          <input
                            type="radio"
                            name={`status-${giftId ?? 'new'}`}
                            className={styles.customRadio}
                            value={value.toString()}
                            checked={localStatus === value}
                            onChange={() => handleStatusChange(value)}
                          />
                          <span className={styles.RadioLabel}>{label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className={styles.ButtonsRow}>
                    <button className={styles.CloseButton} onClick={onClose}>
                      Скасувати
                    </button>
                    <button className={styles.SaveButton} onClick={handleSave}>
                      Зберегти
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
    </>
  
  )}
</div>
        
        </div>
      </div>

      {previewOpen && (
        <div className={styles.ImageOverlay} onClick={() => setPreviewOpen(false)}>
          <img src={imageSrc} alt="" className={styles.ImageFull} />
        </div>
      )}
    </>
  );
};
