<template>
  <section class="menu">
    <Draggable class="mtl-tree" ref="tree" :maxLevel="2" v-model="treeData" treeLine>
      <template #default="{ node, stat }">
        <!-- <OpenIcon v-if="stat.children.length" :open="stat.open" class="mtl-mr" @click.native="stat.open = !stat.open" /> -->
        <input class="mtl-checkbox mtl-mr" type="checkbox" v-model="stat.checked" />
        <span class="mtl-ml" @click="removeFromShowMenu(node)">{{ node.title }}</span>
      </template>
    </Draggable>
    <div class="menu-list">
      <div v-for="link in allPagesLink" :key="link.title">
        <div class="menu-item" @click="addToShowMenu(link.title)">{{ link.title }}</div>
      </div>
  </div>
  </section>
</template>

<script>
import { BaseTree, Draggable, pro, OpenIcon } from '@he-tree/vue'
// import '@he-tree/vue/style/default.css'
// import '@he-tree/vue/style/material-design.css'

export default {
  components: { Draggable, OpenIcon },
  data() {
    return {
      treeData: [
        {
          title: 'Projects',
          children: [
            {
              title: 'Frontend',
            },
            {
              title: 'Backend',
            },
          ],
        },
        { title: 'Home' },
        { title: 'Contacts' },
      ],
      allPagesLink:[
        {
          title: 'Map',
          base: true
        },
        {
          title: 'About',
          base: true
        }
      ]
    }
  },
  methods: {
    addToShowMenu(item) {
      let itemObj = {
        title: item,
        base: true
      }
      this.$refs.tree.add(itemObj)
      
      let filterLink = this.allPagesLink.filter(x => {
        if (x.title !== item) {
          return x
        }
      })
      this.allPagesLink = filterLink
    },

    removeFromShowMenu(item) {

      if (item.base) {
        let filterLink = this.treeData.filter(x=>{
          if (x.title !== item.title) {
            return x
          }
        })

        this.treeData = filterLink
      }
    }
  }
}
</script>

<style scoped>
.menu {
  display: flex;
  column-gap: 10px;
}
.menu > div {
  width: 50%;
  border: 1px solid #ccc;
  padding: 10px;
}
.menu-list {
  display: flex;
  flex-direction: column;
}
.menu-item {
  border: 1px solid #ccc;
}
</style>

<style>
.vtlist-inner {
  row-gap: 10px;
}

.tree-node-inner {
  background: #fff;
  border: 1px solid #ccc;
  padding: 10px;
}
.tree-node--with-tree-line {
	position: relative;
}
.tree-line {
	position: absolute;
	background-color: #bbb;
}
/* .tree-vline {
	width: 1px;
	top: 0;
	bottom: 0;
}
.tree-hline {
	height: 1px;
	top: 50%;
	width: 10px;
} */
.he-tree--rtl {
	direction: rtl;
}
.he-tree-drag-placeholder {
	background: #ddf2f9;
	border: 1px dashed #00d9ff;
	height: 22px;
	width: 100%;
}
.he-tree__open-icon {
	cursor: pointer;
	user-select: none;
	display: inline-block;
}
.he-tree__open-icon.open {
	transform: rotate(90deg);
}
.he-tree__open-icon svg {
	width: 1em;
}

</style>