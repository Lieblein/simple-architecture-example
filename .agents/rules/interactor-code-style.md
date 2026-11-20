---
description: "code style для Interactor из VIPER"
globs: "src/tasks/**/*.ts", "src/**/logic/tasks/**/*.ts"
alwaysApply: false
---

# AI Rules: Interactor (task)

Вся логика приложения. Самая важная и объёмная часть приложения.
Глобальная логика находится в `src/tasks/`. Например: `addNotification.ts`.
Логика, которая относится к какому-либо компоненту, находится внутри этого компонента в папке `logic/tasks/`. Например: `toggleFavorite.ts`.
**Название файла всегда глагол**.

TODO: