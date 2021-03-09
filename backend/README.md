# Проект Mesto бэкенд

### Описание

Бэкенд для проекта Mesto. 
- Стек технологий: Node.js, ExpressJS, MongoDb. 
- Централизованная обработка ошибок.
- Валидация приходящих на сервер данных (celebrate).
- Все роуты кроме /signin и /signup защищены авторизацией.
- Подключен CORS.

### Роуты:

- POST /signin - авторизация
- POST /signup - регистрация
- GET /users - список пользователей
- GET /users/me - текущий пользователь
- GET /users/:userId - пользователь с заданным id
- PATCH /users/me - редактирование данных текущего пользователя
- PATCH /users/me/avatar - редактирование аватара текущего пользователя
- GET /cards - список карточек
- POST /cards - добавление новой карточки
- DELETE /cards/:cardId - удаление карточки с заданным id
- PUT /cards/:cardId/likes - поставить лайк карточке с заданным id
- DELETE /cards/:cardId/likes - удалить лайк у карточки с заданным id

### Запуск проекта

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload
