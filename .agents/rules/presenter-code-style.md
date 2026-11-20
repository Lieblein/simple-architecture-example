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
- Единственный аргумент: `props: Readonly<IProps>`. Всегда передаём все props, даже если используем только часть. Так проще потом расширять логику.
- IProps: импортируется из `./types`

## Получение данных из store

Presenter получает данные из Zustand store. View не должен обращаться к store напрямую.

Одно свойство деструктурируем store:
```tsx
const shows = useShowListStore(({ shows }) => shows);
```

Для нескольких свойств **всегда** используем useShallow:
```tsx
const {
    filter,
    pagination,
} = useShowListStore(
    useShallow(
        ({
            filter,
            pagination,
        }) => ({
            filter,
            pagination,
        }),
    ),
);
```

**Один и тот же стор используется не более одного раза** в `usePresenter.tsx`. Это же правило действует для tasks и hooks, работающих с тем же стором.

Исключение — использование селекторов. Тогда тот же стор можно использовать ещё раз через селектор:
```tsx
// Один стор — один вызов с useShallow
const {
    filter,
    pagination,
} = useShowListStore(
    useShallow(
        ({
            filter,
            pagination,
        }) => ({
            filter,
            pagination,
        }),
    ),
);

// Тот же стор ещё раз — только через селектор
const pageShows = useShowListStore(selectPageShows);
```

**Разные сторы** можно использовать независимо:
```tsx
const shows = useShowListStore(({ shows }) => shows);
const favoriteShows = useFavoritesStore(({ favoriteShows }) => favoriteShows);
```

## Обработка событий

- Без острой необходимости не используем React useCallback.
- Названия обработчиков НЕ должны начинаться с `handle`.
- Обработчик должен начинаться с `on`.
- Обработчики называем по действию: `onKeyDown`, `onClickOutside`, `remove` и т.д.


## Возвращаемое значение

- Возвращаем объект с данными и обработчиками для View.
- Даже если в объекте 1 свойство всё равно возвращаем объект. Делаем так для более простого расширения в будущем.

TODO: примеры кода