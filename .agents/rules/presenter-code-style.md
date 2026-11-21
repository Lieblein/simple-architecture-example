---
description: "code style для Presenter (usePresenter hook) из VIPER"
globs: "src/**/logic/*.tsx"
alwaysApply: false
---

# AI Rules: Presenter (usePresenter)

Presenter — это hook `usePresenter`, который готовит данные и обрабатывает события для View. Не содержит логику.

## Соглашения

- Название файла: `usePresenter.tsx`.
- Расположение: папка `logic/` рядом с View смотри **AGENTS.md**.
- Экспорт: `export default function usePresenter`
- Единственный аргумент: `props: Readonly<IProps>`. Всегда передаём все props, даже если используем только часть. Так проще потом расширять.
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

**Один и тот же стор используется не более одного раза** в `usePresenter.tsx`. Это же правило действует для hooks, работающих с тем же стором.

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

## Использование useMemo

Использовать useMemo в usePresenter можно. Но usePresenter не должен содержать логику.

В GenreMultipleSelect usePresenter логика вынесена в task getOptions.
```tsx
    const options = useMemo(
        () => getOptions(availableGenres, value),
        [availableGenres, value],
    );
```

В Notifications usePresenter в useMemo преобразуется формат данных. Это не логика.
```tsx
    const notifications = useMemo(
        () => Array.from(notificationMap.values()),
        [notificationMap],
    );
```

## Обработка событий

- Без острой необходимости не используем React useCallback.
- Названия обработчиков НЕ должны начинаться с `handle`.
- Обработчик должен начинаться с `on`.
- Обработчики называем по действию: `onKeyDown`, `onClickOutside`, `onRemove` и т.д.

## Возвращаемое значение

- Возвращаем объект с данными и обработчиками для View.
- Даже если в объекте 1 свойство всё равно возвращаем объект. Делаем так для более простого расширения в будущем.

## Пример хорошо реализованного usePresenter

// TODO: найти пример лучше, чтобы было с props
```tsx
import { useShallow } from 'zustand/shallow';
import useShowListStore from '@store/showListStore';
import searchShows from './tasks/searchShows';

export default function usePresenter() {
    const {
        filter,
        pagination,
        shows,
        isLoading,
    } = useShowListStore(
        useShallow(({
            filter,
            pagination,
            shows,
            isLoading,
        }) => ({
            filter,
            pagination,
            shows,
            isLoading,
        })),
    );

    const onChangeActivePage = (page: number) => {
        searchShows({
            query: filter.search,
            genres: filter.selectedGenres,
            page,
        });
    };

    return {
        pagination,
        isLoading,
        pageShows: shows,
        onChangeActivePage,
    };
}
```

Хорошие практики:
- нет никакой логики, только мостик для данных и обработчик,
- использование `useShallow`,
- `onChangeActivePage` названа правильно, не содержит логику, только вызывает task.
