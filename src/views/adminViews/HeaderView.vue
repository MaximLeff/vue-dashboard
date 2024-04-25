<template>
  <main>
    <section>
      <div class="item">
        <input type="file" id="logo">
        <label for="logo">Logo</label>
      </div>
    </section>

    <section>
      <div>
        Menu
        <div class="item">item_1</div>
        <div class="item">item_2</div>
      </div>
    </section>


    <section class="menu">
      <div 
        v-for="category in categories" :key="category.id"
        class="droppable"
        @drop="onDrop($event, category.id)"
        @dragover.prevent
        @dragenter.prevent
      >
        {{ category.title }}

        <div 
          v-for="item in items.filter(x => x.categoryId === category.id)" 
          class="item draggable"
          @dragstart="onDragstart($event, item)"
          draggable="true"
        >{{ item.title }}</div>
      </div>
    </section>
  </main>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'HeaderView',
  setup() {
    const items = ref([
      {
        id: 0,
        title: 'Home',
        categoryId: 1
      },
      {
        id: 1,
        title: 'About',
        categoryId: 1
      },
      {
        id: 2,
        title: 'Contact us',
        categoryId: 1
      },
    ])
    const categories = ref([
      {
        id: 0,
        title: 'Show links'
      },
      {
        id: 1,
        title: 'Hide links'
      },
    ])

    function onDragstart(e, item) {
      e.dataTransfer.dropEffect = 'move'
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setData('itemId', item.id.toString())
    }
    function onDrop(e, categoryId) {
      const itemId = parseInt(e.dataTransfer.getData('itemId'))
      items.value = items.value.map(x=> {
        if(x.id == itemId) {
          x.categoryId = categoryId
        }
        return x
      })
    }

    return {
      items,
      categories,
      onDragstart,
      onDrop
    }
  }
}
</script>

<style scoped>
.menu {
  display: flex;
  gap: 20px;
}
.droppable {
  display: flex;
  flex-direction: column;
  gap: 10px;
  outline: 1px solid #ccc;
  padding: 20px;
  width: 100%;
  border-radius: var(--brs);
}

.draggable {
  padding: 5px;
  border: 1px solid #ccc;
  background: #fff;
  border-radius: var(--brs);
}
</style>