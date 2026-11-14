---
description: "code style для Presenter (usePresenter hook) из VIPER"
globs: "src/**/logic/*.tsx"
alwaysApply: false
---

# AI Rules: Presenter (usePresenter)

Presenter — это hook `usePresenter`, который готовит данные и обрабатывает события для View. Не содержит бизнес-логику.

## Соглашения

- Название файла: `usePresenter.tsx`.
- Расположение: папка `logic/` рядом с View смотри **AGENTS.md**.
- Экспорт: `export default function usePresenter`
- Единственный аргумент: `props: Readonly<IProps>`
- IProps: импортируется из `./types`

## Получение данных из store

Presenter получает данные из Zustand store. View не должен обращаться к store напрямую.

```tsx
// Одно свойство
const shows = useShowListStore(({ shows }) => shows);

// Несколько свойств — используем useShallow
const {
    search,
    activePage,
} = useShowListStore(
    useShallow(
        ({
            search,
            activePage,
        }) => ({
            search,
            activePage,
        }),
    ),
);

// Селекторы для вычисляемых данных
const pageShows = useShowListStore(useShallow(selectPageShows));
```

## Обработка событий

- Без острой необходимости не используем React useCallback.
- Названия обработчиков не должны начинаться с `on` или `handle`.


## Возвращаемое значение

- Возвращаем объект с данными и обработчиками для View.
- Даже если в объекте 1 свойство всё равно возвращаем объект. Делаем так для более простого расширения в будущем.


## Что НЕ должен делать Presenter

- **Бизнес-логика** (запросы к API, валидация с бизнес-правилами) — это Interactor/tasks
- **UI-рендеринг** — это View
- **Хранение состояния** — это Entity (Zustand store)
