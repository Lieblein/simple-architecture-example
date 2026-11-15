---
description: "code style для ts/tsx"
globs: "src/**/*.{ts,tsx}"
alwaysApply: false
---

# AI Rules: Соглашения по коду

- Соответствовать eslint.config.js.
- Не убирать `TODO:` комментарии, которые были добавлены до изменений через AI.
- Для типов используем `interface`. Все интерфейсы начинаются с `I`.
- При импорте типов интерфейсов добавлять `type`. Например: `import { type IShow } from '@api/show';`.
- Никогда не добавлять `type` при импорте `enum`.
