---
description: "code style для Zustand Entity из VIPER"
globs: "src/**/*.ts"
alwaysApply: false
---

# AI Rules: Хранение данных в store

Чтобы не пробрасывать данные через длнинные цепочки props компонентов, используем state manager Zustand.

## Соглашения по коду

- Храним в store минимальный набор данных. Данные вичисляемые из других данных в store не храним. Для этого пишем селекторы. Например pageShows - это данные, которые можно вычислить из shows и activePage:
```js
export const useShowListStore = create((set) => ({
    shows: [],
    activePage: 1,

    ...
}));

export const selectPageShows = ({ shows, activePage }) => getListForPage(shows, activePage, 3);
```
- Храним данные в нормализованном виде. Для нормализации используем Map, объекты не используем.
- Если необходимо мутировать данные, то используем **immer**:
```ts
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export const useNotificationStore = create()(
    immer((set) => ({
        notifications: new Map<number, INotification>(),
        removeNotification: (id: number) => {
            set((state) => {
                state.notifications.delete(id);
            });
        },
    })),
);
```
- Разделяем описание интерфейсов для state и actions:
```
interface INotificationState {
    notifications: Map<number, INotification>;
}

interface INotificationActions {
    addNotification: (message: string, type: 'error') => void;
    removeNotification: (id: number) => void;
}

type NotificationStore = INotificationState & INotificationActions;
```

## Использование в React

View слой не может забирать данные из Zustand store. Данные забирает Presenter слой через hook usePresenter.

Мы не пишем селекторы для получение отдельных свойств.
Для получения 1 свойства достаём его из store напрямую деструктуризируя:
```tsx
const shows = useShowListStore(({ shows }) => shows);
```

А вот для получения > 1 свойства всегда используем **useShallow**:
```tsx
import { useShallow } from 'zustand/shallow';

export default function usePresenter(props: Readonly<IProps>) {
    const {
        search,
        activePage,
    } = useShowListStore(
        useShallow(({
            search,
            activePage,
        }) => ({
            search,
            activePage,
        })),
    );

    return { ... };
}
```
