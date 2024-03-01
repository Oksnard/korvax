const express = require('express')
const cors = require('cors');
const fs = require('fs')
const yaml = require('js-yaml')
const app = express()

// Парсить JSON в теле запроса
app.use(express.json())
app.use(cors());

// Путь к файлу с шаблоном, стилями и данными компонента
const filePath = './component.yml'

// Ручка для получения и сохранения шаблона и стилей компонента
app.get('/template', (req, res) => {
        // Читать файл с шаблоном и стилями
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                // Отправить ошибку, если не удалось прочитать файл
                res.status(500).send('Ошибка чтения файла')
            } else {
                // Парсить yml в JSON
                const component = yaml.load(data)
                // Отправить шаблон и стили компонента в JSON
                res.json({
                    template: component.template,
                    styles: component.styles
                })
            }
        })
    })

// Ручка для получения данных компонента
app.get('/data', (req, res) => {
    // Читать файл с данными компонента
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            // Отправить ошибку, если не удалось прочитать файл
            res.status(500).send('Ошибка чтения файла')
        } else {
            // Парсить yml в JSON
            const component = yaml.load(data)
            // Отправить данные компонента в JSON
            res.json(component.data)
        }
    })
})

// Запустить сервер на порту 3000
app.listen(3000, () => {
    console.log('Сервер запущен на http://localhost:3000')
})
