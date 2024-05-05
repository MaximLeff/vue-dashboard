<template>
  <section class="menu">
    <Draggable class="mtl-tree" ref="tree" :maxLevel="2" v-model="this.showMenu" treeLine>
      <template #default="{ node, stat }">
        <!-- <OpenIcon v-if="stat.children.length" :open="stat.open" class="mtl-mr" @click.native="stat.open = !stat.open" /> -->
        <input class="mtl-checkbox mtl-mr" type="checkbox" v-model="stat.checked" />
        <div class="mtl-ml" >{{ node.title }}</div>
        <div class="menu-page-link">{{ node.url }}</div>
        <div class="menu-page-link-target" v-if="node.target">new tab</div>
        <div class="menu-link-remove" @click.prevent="removeFromShowMenu(node)">
          <button v-if="node.customLink">Remove</button>
          <button v-else>Hide</button>
        </div>
        <button v-if="node.customLink">Settings</button>
      </template>
    </Draggable>


    <div class="menu-list vtlist-inner">
      <div class="menu-item tree-node-inner" v-for="item in allPagesLink" :key="item.title">
        <div>{{ item.title }}</div>
        <div class="menu-page-link">{{ item.url }}</div>
        <button @click="addToShowMenu(item)">Show</button>
      </div>
    </div>


    <form class="menu-add-link" @submit.prevent="onSubmit">
      <div class="menu-add-link-item">
        <label for="link-title">Link title</label>
        <input v-model="addLink.title" type="text" id="link-title">
      </div>
      <div class="menu-add-link-item">
        <label for="link-url">Link url</label>
        <input v-model="addLink.url" type="text" id="link-url">
      </div>
      <div class="menu-add-link-item">
        <label for="link-target">Open link in new tab</label>
        <input v-model="addLink.target" type="checkbox" id="link-target">
      </div>
      <div class="menu-add-link-item">
        <button v-if="this.addLink.title && this.addLink.url" @click="addCustomLink">Add</button>
        <div v-if="this.errors.coincidenceTitle">Такое название уже используется</div>
      </div>
    </form>
  </section>

</template>

<script>
import { BaseTree, Draggable, pro, OpenIcon } from '@he-tree/vue'
import store from '@/store'
// import '@he-tree/vue/style/default.css'
// import '@he-tree/vue/style/material-design.css'

export default {
  components: { Draggable, OpenIcon },
  data() {
    return {
      showLinks: [
        {
          title: 'Projects',
          url: '/projects',
          children: [
            {
              title: 'Frontend',
              url: '/frontend',
            },
            {
              title: 'Backend',
              url: '/backend',
            },
          ],
        },
        { 
          title: 'Home',
          url: '/',
        },
        { 
          title: 'Contacts',
          url: '/contacts'
        },
      ],
      allPagesLink:[
        {
          title: 'Map',
          url: '/map'
        },
        {
          title: 'About',
          url: '/about'
        }
      ],
      addLink:[
        {
          title: 0,
          url: 0,
          target: false,
        }
      ],
      errors: [
        {
          coincidenceTitle: false
        }
      ]
    }
  },
  methods: {
    addToShowMenu(item, customLink, customLinkTarget) {
      this.errors.coincidenceTitle = false
      this.showLinks.filter(x=>{
        if (x.children) {
          x.children.filter(y => {
            return x.title
          })
        }

        if (x.title === item.title) this.errors.coincidenceTitle = true
      })

      if (!this.errors.coincidenceTitle) {
        let itemObj = {
            title: item.title,
            url: item.url
          }
        if (customLink) {
          itemObj.customLink = true
        }
        if (customLinkTarget) {
          itemObj.target = true
        }
      
        this.$refs.tree.add(itemObj)
        
        let filterLink = this.allPagesLink.filter(x => {
          if (x.title !== item.title) {
            return x
          }
        })
        this.allPagesLink = filterLink
      }
    },

    addCustomLink(){
      let customLink = true
      let customLinkTarget = this.addLink.target
      this.addToShowMenu(this.addLink, customLink, customLinkTarget)
    },

    removeFromShowMenu(item) {
      let filterLink = this.showLinks.filter(a=>{
        if (a.title !== item.title) {
          if (!a.children) {
            return a
          } else {
            let b = a.children.filter(c=> {
              if(c.title !== item.title) {
                return c
              }
            })
            a.children = b
            return a
          }
        }
      })

      this.showLinks = filterLink
      if (!item.customLink) this.allPagesLink.push(item)
    },
  },

  computed: {
    showMenu () {
      return this.$store.getters.showLinks
    },
  },
}
</script>

<style scoped>
button {
  margin-top: 10px;
}
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
#link-target {
  -webkit-appearance: auto;
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
.tree-node-inner input {
  margin: 0;
  position: absolute;
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