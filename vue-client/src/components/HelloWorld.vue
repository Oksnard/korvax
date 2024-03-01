<template>
  <component :is="component" v-bind="data" />
</template>

<script setup>
import { ref, shallowRef, defineComponent } from "vue";
import axios from 'axios';

// Данные для компонента
const data = ref(null)
const template = ref(null)
const styles = ref(null)
// Определение компонента
const component = shallowRef(null)

const fetchData = async () => {
  try {
    // Делаем GET запрос к роуту /data
    const response = await axios.get('http://localhost:3000/data');
    // Сохраняем полученные данные в data
    data.value = JSON.parse(response.data);
  } catch (error) {
    // Обрабатываем ошибку
    console.error(error);
  }
}
// Метод для получения шаблона и стилей компонента из API
const fetchTemplate = async () => {
  try {
    // Делаем GET запрос к роуту /template
    const response = await axios.get('http://localhost:3000/template');
    // Сохраняем полученный шаблон и стили в template и style
    template.value = response.data.template;
    styles.value = response.data.styles;
  } catch (error) {
    // Обрабатываем ошибку
    console.error(error);
  }
}
// Метод для создания определения компонента на основе шаблона и стилей
const createComponent = () => {
  component.value = defineComponent({
    template: template.value,
    data() {
      return data.value;
    },
    mounted() {
      // const css = document.createElement('style');
      // css.type='text/css';
      // css.setAttributeNode( document.createAttribute('scoped'));
      // css.appendChild(document.createTextNode(styles.value));
      // this.$el.appendChild(css);

      // или

      // Создаем тэг стилей и заполняем нашими стилями
      const styleElement = document.createElement('style');
      styleElement.textContent = styles.value;

      // Вставляем стили в head документа
      document.head.appendChild(styleElement);
    }
  });


}

// При создании приложения получаем данные и шаблон компонента из API
await fetchData();
await fetchTemplate();
// Создаем определение компонента на основе полученных данных
createComponent();
</script>
