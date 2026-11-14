# simple architecture example

[DEMO](https://Lieblein.github.io/simple-architecture-example/)

Пример имплементации VIPER архитектуры, переложенной на React приложение. Архитектура опирается на идеи Роберта Мартина из «The Clean Architecture».

Разложим VIPER на модули приложения:

| понятие | описание |
| ------ | ------ |
| View | = JSX без какой либо логики |
| Interactor | = tasks = бизнесс-логика приложения. Не зависит от выбора фреймворка для View или state manager-а для Entity. |
| Presenter | = hook usePresenter. Логика компонента. Готовит для компонента данные, обрабатывает события компонента. Не содержит бизнесс-логику. |
| Entity | = store. Хранилище данных. Zustand store. Не содержит бизнесс-логику. |
| Router (wip) | Глобальные переходы между крупноблочными View страниц. |

*wip = work in progress. Эту часть мы ещй не реализовали.

Подробное описание смотри в AGENTS.md.

## yarn scripts

| script | описание |
| ------ | ------ |
| `yarn start` | запуск приложения |
| `yarn build` | сборка продакшн версии приложения, формирует папку `dist` |
| `yarn lint` | проверка style guide для ts/tsx |
| `yarn stylelint` | проверка style guide для стилей |
| `yarn mock` | запуск mock-сервера |
| `yarn generate` | создание компонентов по шаблону |
