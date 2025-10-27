# Seat Reservation System

API для бронирования мест на мероприятия.

## Технологии

- **Node.js** + **TypeScript**
- **Fastify**
- **Drizzle ORM**
- **PostgreSQL**
- **Docker**

## API Endpoints

### Создание события
```
POST /api/events
Content-Type: application/json

{
  "name": "Concert",
  "totalSeats": 100
}
```

### Бронирование места
```
POST /api/bookings/reserve
Content-Type: application/json

{
  "eventId": 1,
  "userId": "user123"
}
```

### Системные endpoints
```
GET /health - проверка здоровья сервиса
GET / - информация об API
```

## Установка и запуск

### Быстрый старт (Docker)

1. Клонируйте репозиторий
```bash
git clone https://github.com/darterss/Seat-Reservation-System.git
cd Seat-Reservation-System
```

2. Запустите
```bash
docker compose up
```

Эта команда автоматически:
- Запустит PostgreSQL базу данных
- Выполнит миграции базы данных
- Запустит приложение
- Настроит все необходимые зависимости

Приложение будет доступно по адресу: http://localhost:3000

## Тестирование

### 1. Проверка работоспособности
```bash
curl http://localhost:3000/health
```

### 2. Создание события
```bash
curl -X POST http://localhost:3000/api/events \
  -H "Content-Type: application/json" \
  -d '{"name": "Concert", "totalSeats": 50}'
```

### 3. Бронирование места
```bash
curl -X POST http://localhost:3000/api/bookings/reserve \
  -H "Content-Type: application/json" \
  -d '{"eventId": 1, "userId": "user123"}'
```

### 4. Попытка повторного бронирования (должна вернуть ошибку)
```bash
curl -X POST http://localhost:3000/api/bookings/reserve \
  -H "Content-Type: application/json" \
  -d '{"eventId": 1, "userId": "user123"}'
```

### Ручной запуск

1. Клонируйте репозиторий
```bash
git clone https://github.com/darterss/Seat-Reservation-System.git
cd seat-reservation-system
```

2. Установите зависимости и скомпилируйте проект:
```bash
npm install
npm run build
```

3. Запустите PostgreSQL:
```bash
docker compose up -d postgres
```

4. Сгенерируйте и выполните миграции:
```bash
npm run db:generate
export DB_USER=user
npm run db:migrate
```

5. Запустите приложение:
```bash
npm run dev
```

## Требования к окружению

- Node.js 18+
- Docker & Docker Compose
