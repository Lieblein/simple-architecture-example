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

Для нескольких свойств **всегда** используем useShallow и деструктурируем store.
Каждое свойство с новой строки.
С обработчиками поступаем точно также, как и с данными:
```tsx
const {
    search,
    resetFilter,
} = useShowListStore(
    useShallow(
        ({
            search,
            resetFilter,
        }) => ({
            search,
            resetFilter,
        }),
    ),
);
```

В usePresenter обычно не более 1 использования одного стора. 

Исключение - использование селекторов.
Тогда можно несколько раз изпользовать один стор:
```tsx
const {
    search,
    resetFilter,
} = useShowListStore(
    useShallow(
        ({
            search,
            resetFilter,
        }) => ({
            search,
            resetFilter,
        }),
    ),
);

const pageShows = useShowListStore(selectPageShows);
```

## Обработка событий

- Без острой необходимости не используем React useCallback.
- Названия обработчиков НЕ должны начинаться с `on` или `handle`.
- Обработчики называем по действию: `keyDown`, `clickOutside`, `remove` и т.д.


## Возвращаемое значение

- Возвращаем объект с данными и обработчиками для View.
- Даже если в объекте 1 свойство всё равно возвращаем объект. Делаем так для более простого расширения в будущем.
