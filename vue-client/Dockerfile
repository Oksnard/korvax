# Используем официальный образ Node.js как базовый
FROM node:14

# Устанавливаем рабочую директорию в контейнере /app
WORKDIR /app

# Копируем файлы package.json и package-lock.json в рабочую директорию
COPY package*.json ./

# Устанавливаем зависимости приложения
RUN npm install

# Копируем остальной код приложения в рабочую директорию
COPY . .

# Устанавливаем Vite глобально
RUN npm install -g vite

# Запускаем приложение
CMD [ "npm", "run", "dev" ]
