<script setup>
import PageHeaderMenu from '@/components/admin/PageHeaderMenu.vue'
import PageHeaderMenuDragPlugin from '@/components/admin/PageHeaderMenuDragPlugin.vue';
</script>

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

    <PageHeaderMenu />
    <PageHeaderMenuDragPlugin />
  </main>
</template>
