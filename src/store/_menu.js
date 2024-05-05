import { createStore } from 'vuex'

const storeMenu = createStore({
	state: {
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
		allPagesLink: [
			{
				title: 'Map',
				url: '/map'
			},
			{
				title: 'About',
				url: '/about'
			}
		],
		addLink: [
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
	},


	// Геттеры - возвращают состояние
	getters: {
		// 	user(state) {
		// 		return state.user
		// 	}
		showLinks: () => {
			console.log('test')
			// return state.showLinks
		}
	},


	// Мутации - установка данных в состояние -синхронны-
	mutations: {
		// 	SET_LOGGED_IN(state, value) {
		// 		state.user.loggedIn = value;
		// 	},
		// 	SET_USER(state, data) {
		// 		state.user.data = data;
		// 	}
	},


	// Действия - инициирование мутации -асинхронны-
	actions: {
		addToShowMenu(item, customLink, customLinkTarget) {
			this.errors.coincidenceTitle = false
			this.treeData.filter(x => {
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

		// 	async register(context, { email, password, name }) {
		// 		const response = await createUserWithEmailAndPassword(auth, email, password)
		// 		if (response) {
		// 			context.commit('SET_USER', response.user)
		// 			response.user.updateProfile({ displayName: name })
		// 		} else {
		// 			throw new Error('Unable to register user')
		// 		}
		// 	},

		// 	async logIn(context, { email, password }) {
		// 		const response = await signInWithEmailAndPassword(auth, email, password)
		// 		if (response) {
		// 			context.commit('SET_USER', response.user)
		// 		} else {
		// 			throw new Error('login failed')
		// 		}
		// 	},

		// 	async logOut(context) {
		// 		await signOut(auth)
		// 		context.commit('SET_USER', null)
		// 	},

		// 	async fetchUser(context, user) {
		// 		context.commit("SET_LOGGED_IN", user !== null);
		// 		if (user) {
		// 			context.commit("SET_USER", {
		// 				displayName: user.displayName,
		// 				email: user.email
		// 			});
		// 		} else {
		// 			context.commit("SET_USER", null);
		// 		}
		// 	}
	}
})

export default storeMenu;