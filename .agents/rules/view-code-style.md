---
description: "code style для View из VIPER"
globs: "src/**/*.tsx"
alwaysApply: false
---

# AI Rules: Создание компонентов

`Алгоритм создания нового компонента` из шаблона описан в **AGENTS.md**.

## Основной принцип разделения отвественности

JSX-компонент без логики. Получает данные и колбэки из usePresenter или через props.

**Ответственность:** отображение данных и вызов переданных колбэков.

**Можно:**
- использовать hook usePresenter,
- получать данные из props,
- conditional rendering.

**Нельзя**:
- использовать hooks, кроме usePresenter и useRef,
- подключаться к store,
- содержать какую-либо логику,
- определять колбэки (это ответственность usePresenter).

---

## CSS-стили

Стили находятся в соседнем файле. Мы используем CSS Modules.

В JSX пишем camelCase, в CSS пишем kebab-case.

Пример:
```tsx
import styles from './my-list.module.css';

export default function MyList() {
    return (
        <ul className={ styles.myList }>
            ...
        </ul>
    );
}
```
`+`
```css
.my-list {
    ...
}
```

Большинство компонентов должны иметь среди props **className**.
Так родительский компонент сможет влиять на стили дочернего компонента.
className из родительского компонента никогда не заменяет классы самого компонента, он их расширяет через `@utils/classNames`.
Подробней в AI rules css-code-style.md, .
```ts
interface IProps {
    className?: string;
}
```

Для объединения разных классов нужно использовать самописную утилиту **classNames**.
Пример:
```tsx
import classNames from '@utils/classNames';
import styles from './my-list.module.css';

interface IProps {
    className?: string;
}

export default function MyList(props: Readonly<IProps>) {
    const { className } = props;

    return (
        <ul className={ classNames(className, styles.myList, { [styles.empty]: isEmpty }) }>
            ...
        </ul>
    );
}
```

---

## Соглашения по именованию

| Элемент | Соглашение | Пример |
|---------|------------|--------|
| Папка | PascalCase | `ShowCard/` |
| View файл | `index.tsx` | `index.tsx` |
| Стили | kebab-case + `*.module.css` | `show-card.module.css` |
| Интерфейс пропсов | `IProps` | `interface IProps { ... }` |
| Presenter хук | `usePresenter.tsx` | `usePresenter.tsx` |

---

## Соглашения по коду

- Соответствовать eslint.config.js
- Экспорт компонентов всегда default export
- Иммутабельность пропсов `Readonly<IProps>`
- Обработчики в props начинаются с `on`. Например onChange, onClick, onSave и т. д.
- Если на html элементе > 1 аттрибута, то все атрибуты с новой строки
- conditional rendering с новой строки

### Conditional rendering

Все условия с новой строки:
```tsx
    {
        pageShows.length === 0 &&
        isLoading &&
        <ul className={ styles.showList }>
            ...
        </ul>
    }
```

Вариант if-else:
```tsx
    {
        isLoading
            ? <Loader />
            : <ul className={ styles.showList }>
                ...
            </ul>
    }
```

---

## Создание компонентов

### Вариант 1: Генератор

```bash
yarn generate <view|presenter> <название-компонента> <путь-относительно-src>

# Примеры:
yarn generate view button components
yarn generate presenter show-card pages/ShowListPage
```

### Вариант 2: Ручное создание

Следовать структуре директорий и соглашениям по именованию из **AGENTS.md**.

---

TODO: примеры кода