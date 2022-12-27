<script setup lang="ts">
import CustomInput from '@/components/CustomInput/CustomInput.vue';
import CustomCarousel from './components/CustomCarousel/CustomCarousel.vue';

const carouselSettings = [
  {
    id: '1',
  },
  {
    id: '2',
  },
];
</script>

<template>
  <main>
    <CustomInput />
    <CustomCarousel :items="carouselSettings">
      <template v-for="(item, key) in carouselSettings" :key="key" #[item.id]>
        <div class="item">{{ item }} {{ key }}</div>
      </template>
    </CustomCarousel>
  </main>
</template>

<style lang="scss" scoped>
main {
  max-width: 1048px;
  margin: 0 auto;
}

.item {
  background-color: red;
  width: 300px;
}
</style>
