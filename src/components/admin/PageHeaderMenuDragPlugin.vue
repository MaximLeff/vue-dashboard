<template>
  <section class="menu">
    <Draggable class="mtl-tree" ref="tree" :maxLevel="2" v-model="treeData" treeLine>
      <template #default="{ node, stat }">
        <!-- <OpenIcon v-if="stat.children.length" :open="stat.open" class="mtl-mr" @click.native="stat.open = !stat.open" /> -->
        <input class="mtl-checkbox mtl-mr" type="checkbox" v-model="stat.checked" />
        <div class="mtl-ml" @click="removeFromShowMenu(node)">{{ node.title }}</div>
        <div class="menu-page-link">{{ node.link }}</div>
      </template>
    </Draggable>
    <div class="menu-list">
      <div class="menu-item" v-for="item in allPagesLink" :key="item.title">
        <div @click="addToShowMenu(item)">{{ item.title }}</div>
        <div class="menu-page-link">{{ item.link }}</div>
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
          link: '/projects',
          children: [
            {
              title: 'Frontend',
              link: '/frontend',
            },
            {
              title: 'Backend',
              link: '/backend',
            },
          ],
        },
        { 
          title: 'Home',
          link: '/',
        },
        { 
          title: 'Contacts',
          link: '/contacts'
        },
      ],
      allPagesLink:[
        {
          title: 'Map',
          link: '/map',
          base: true
        },
        {
          title: 'About',
          link: '/about',
          base: true
        }
      ]
    }
  },
  methods: {
    addToShowMenu(item) {
      let itemObj = {
        title: item.title,
        link: item.link,
        base: true,
      }
      this.$refs.tree.add(itemObj)
      
      let filterLink = this.allPagesLink.filter(x => {
        if (x.title !== item.title) {
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
        this.allPagesLink.push(item)
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
.menu-page-link {
  opacity: 0.3;
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