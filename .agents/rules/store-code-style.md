---
description: "code style для Zustand Entity из VIPER"
globs: "src/**/*.ts"
alwaysApply: false
---

# AI Rules: Хранение данных в store

Чтобы не пробрасывать данные через длнинные цепочки props компонентов, используем state manager Zustand.

Данные в Zustand - Entity слой из VIPER. Можно получать данные и записывать, вся остальная логика в Interactor слое = tasks.

## Соглашения по коду

- Храним в store минимальный набор данных. Данные вичисляемые из других данных в store не храним. Для этого пишем селекторы. Например pageShows - это данные, которые можно вычислить из shows и activePage:
```js
export const useShowListStore = create((set) => ({
    shows: [],
    activePage: 1,

    ...
}));

export const selectPageShows = ({ shows, activePage }) => getListForPage(shows, activePage, itemsPerPage);
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
```ts
interface INotificationState {
    notifications: Map<number, INotification>;
}

interface INotificationActions {
    addNotification: (message: string, type: 'error') => void;
    removeNotification: (id: number) => void;
}

type NotificationStore = INotificationState & INotificationActions;
```

## Пример хорошо реализованного store

Эталонным примером может служить `notificationStore.ts`:
```ts
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { type INotification } from '@ui/notification';

interface INotificationState {
    notifications: Map<number, INotification>;
}

interface INotificationActions {
    setNotification: (notification: INotification) => void;
    removeNotification: (id: number) => void;
}

type NotificationStore = INotificationState & INotificationActions;

const useNotificationStore = create<NotificationStore>()(
    immer((set) => ({
        notifications: new Map<number, INotification>(),

        setNotification: (notification: INotification) => {
            set((state) => {
                state.notifications.set(notification.id, notification);
            });
        },

        removeNotification: (id: number) => {
            set((state) => {
                state.notifications.delete(id);
            });
        },
    })),
);

export default useNotificationStore;
```

Хорошие практики:
- Нет лишних данных. Храним только список нотификаций и больше ничего.
- Методы `setNotification` и `removeNotification` не содержат никакой логики, а только записывают данные в store.
- Cписок нотификаций харним как `Map`. Данные в нормализованном виде. Проше получать информацию по конкретной нотификации, удалять нотификацию, обновлять данные по нотификации.
- Используем `immer`, чтобы на каждое изменение в данных не создавать новый `Map`. Не стоит добавлять `immer` в каждый store, только при необходимости упрощения мутаций. Если хочется воспользоваться `lodash/cloneDeep`, `structuredClone` или spreed-оператором, это значит нужно подключать `immer`.
- Правильно определены интерфейсы и тип.
- Красивый перевод строк, без длинных нечитабельных строк в функциях.

## Флаги isLoading / isFetching

Флаги isLoading / isFetching можно хранить в store только, когда они нужны глобально.
В остальных случаях стоит хранить эти флаги в состоянии hooks. Смотри AGENTS.md, раздел [Часто используемые hooks](https://github.com/Lieblein/simple-architecture-example/tree/master/AGENTS.md#часто-используемые-hooks).

Когда можно:
- флаг влияет на отображение разных компонентов,
- источник действия отделён от компонента с прелоадером. Например фильтр запускает загрузку данных, а прелоадер нужно отображать в компоненте списка.

Когда нельзя:
- прелоадер там же, где источник действия,
- флаг используется в одном компоненте,
- флаг используется в разных компонентах, но для разных действий. Тогда в каждом компоненте нужен свой hook.

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
