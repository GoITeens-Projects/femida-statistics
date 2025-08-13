# MessageBubble Component

Компонент для відображення повідомлень у стилі месенджера з підтримкою вхідних та вихідних повідомлень.

## Особливості

- 🎨 Сучасний дизайн з градієнтами та тінями
- 📱 Повністю адаптивний дизайн
- 🌙 Підтримка темної теми
- ✨ Плавні анімації та переходи
- 🎯 Хвостики повідомлень для кращої візуалізації
- 🔧 Легко налаштовується

## Використання

### Базове використання

```jsx
import MessageBubble from './components/MessageBubble';

function App() {
  return (
    <div>
      <MessageBubble 
        message="Привіт! Як справи?" 
        type="incoming" 
      />
      <MessageBubble 
        message="Все добре, дякую!" 
        type="outgoing" 
      />
    </div>
  );
}
```

### Приклад з чатом

```jsx
import React, { useState } from 'react';
import MessageBubble from './components/MessageBubble';

function Chat() {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Привіт!', type: 'incoming' },
    { id: 2, text: 'Привіт! Як справи?', type: 'outgoing' }
  ]);

  return (
    <div className="chat-container">
      {messages.map(msg => (
        <MessageBubble
          key={msg.id}
          message={msg.text}
          type={msg.type}
        />
      ))}
    </div>
  );
}
```

## Props

| Prop | Тип | За замовчуванням | Опис |
|------|-----|------------------|------|
| `message` | `string` | - | Текст повідомлення (обов'язковий) |
| `type` | `'incoming' \| 'outgoing'` | `'incoming'` | Тип повідомлення |
| `className` | `string` | `''` | Додаткові CSS класи |

## Типи повідомлень

### `incoming` (вхідні)
- Розташовуються зліва
- Сірий фон з градієнтом
- Темний текст
- Хвостик зліва знизу

### `outgoing` (вихідні)
- Розташовуються справа
- Синій фон з градієнтом
- Білий текст
- Хвостик справа знизу

## Стилізація

Компонент використовує CSS модулі. Основні класи:

- `.messageContainer` - контейнер повідомлення
- `.messageBubble` - бульбашка повідомлення
- `.messageText` - текст повідомлення
- `.incoming` - модифікатор для вхідних повідомлень
- `.outgoing` - модифікатор для вихідних повідомлень

### Кастомізація

Ви можете перевизначити стилі, передавши власний `className`:

```jsx
<MessageBubble 
  message="Кастомне повідомлення" 
  type="outgoing"
  className="my-custom-message"
/>
```

```css
.my-custom-message .messageBubble {
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
}
```

## Адаптивність

Компонент автоматично адаптується до різних розмірів екрану:

- **Desktop**: максимальна ширина 70%
- **Tablet** (≤768px): максимальна ширина 85%
- **Mobile** (≤480px): максимальна ширина 90%

## Темна тема

Компонент автоматично підтримує темну тему через `prefers-color-scheme: dark`:

- Вхідні повідомлення: темно-сірий фон
- Вихідні повідомлення: залишаються синіми
- Покращені тіні для кращої видимості

## Анімації

- **Поява**: плавна анімація з прозорості та зсуву
- **Ховер**: підняття та посилення тіні
- **Переходи**: плавні переходи для всіх змін

## Приклад повного чату

Дивіться `MessageBubbleExample.jsx` для повного прикладу реалізації чату з:
- Відображенням списку повідомлень
- Полем вводу нових повідомлень
- Автоматичним скролом
- Обробкою клавіші Enter

## Браузерна підтримка

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- iOS Safari 14+
- Android Chrome 88+