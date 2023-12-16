<template>
  <div>
    <h2>Chọn các mục</h2>
    <ul>
      <li v-for="(item, index) in items" :key="index">
        <input type="checkbox" v-model="item.checked" />
        <img :src="item.imageUrl" alt="Item Image" />
        {{ item.label }}
      </li>
    </ul>
    <p>Đã chọn: {{ selectedItems }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { label: 'Mục 1', imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYQK8bVbO1yuylDuLLloKVbsRnFmC1bDnWaA&usqp=CAU", checked: false },
        { label: 'Mục 2', imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYQK8bVbO1yuylDuLLloKVbsRnFmC1bDnWaA&usqp=CAU", checked: false },
        // Thêm các mục khác tương tự ở đây
      ],
    };
  },
  computed: {
    selectedItems() {
      return this.items.filter((item) => item.checked).map((item) => item.label);
    },
  },
};
</script>
