---
name: view-to-presenter
description: Конвертирует view компонент в presenter компонент
---

# AI Skill: View to Presenter Conversion

Конвертирует компонент, созданный через `yarn generate view`, в компонент, созданный через `yarn generate presenter`.

## Когда использовать

Компонент создан с `yarn generate view`, но позже потребовалась логика (state, обработчики, обращения к store). Нужно добавить presenter-слой.

## Алгоритм

### Шаг 1: Определить компонент

Найти компонент для конвертации. Это должен быть компонент со следующей структурой:

```
src/<path>/<ComponentName>/
├── index.tsx       # View без presenter
└── *.module.css    # Стили
```

### Шаг 2: Создать types.ts

Создать файл `types.ts` рядом с `index.tsx` и перенести туда IProps из `index.tsx`.

### Шаг 3: Создать logic/usePresenter.tsx

Создать папку `logic/` и файл `usePresenter.tsx`:

```typescript
import { type IProps } from '../types';

export default function usePresenter(props: Readonly<IProps>) {
    const {} = props;

    return {};
}
```

### Шаг 4: Обновить index.tsx

1. Добавить импорты в `index.tsx`:
   ```typescript
   import { type IProps } from './types';
   import usePresenter from './logic/usePresenter';
   ```
2. Добавить `const {} = usePresenter(props);`


## Примеры конвертации

### Input (было)

**view:**
```tsx
import classNames from '@utils/classNames';
import styles from './input.module.css';

interface IProps {
    className?: string;
    value: string;
    onChange: (value: string) => void;
}

export default function Input(props: Readonly<IProps>) {
    const { className, value, onChange } = props;

    return (
        <input
            className={ classNames(className, styles.input) }
            value={ value }
            onChange={ (e) => onChange(e.target.value) }
        />
    );
}
```

### Input (стало)

`types.ts`:
```typescript
export interface IProps {
    className?: string;
    value: string;
    onChange: (value: string) => void;
}
```

`logic/usePresenter.tsx`:
```typescript
import { type IProps } from '../types';

export default function usePresenter(props: Readonly<IProps>) {
    const { onChange } = props;

    const change = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return { change };
}
```

`index.tsx`:
```tsx
import classNames from '@utils/classNames';
import { type IProps } from './types';
import usePresenter from './logic/usePresenter';
import styles from './input.module.css';

export default function Input(props: Readonly<IProps>) {
    const { className, value } = props;
    const { change } = usePresenter(props);

    return (
        <input
            className={ classNames(className, styles.input) }
            value={ value }
            onChange={ change }
        />
    );
}
```
