import { createStore } from 'vuex'
export default createStore({
  state: {
    //estados
    sidebarVisible: '',
    sidebarUnfoldable: false,
    user: null,
    rol: null,
    testeonombre: "Valor Inicial",
    idOperation: null
  },
  //metodos que nos sirven para modificar los estados (sync)
  mutations: {
    toggleSidebar(state) {
      state.sidebarVisible = !state.sidebarVisible
    },
    toggleUnfoldable(state) {
      state.sidebarUnfoldable = !state.sidebarUnfoldable
    },
    updateSidebarVisible(state, payload) {
      state.sidebarVisible = payload.value
    },
    setUser(state, value) {
      state.user = value
    },
    setRol(state, value) {
      state.rol = value
    },
    setTesteo(state, value){
      state.testeonombre = value
    }
  },
  actions: {
    async login({ commit }, { email, password }) {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_APP_API}/login/users/sign_in`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          },
        )

        if (res.ok) {
          const user = await res.json()
          localStorage.setItem('token', user.token)
          localStorage.setItem('userName', user.userName)
          localStorage.setItem('rol', user.rol)
          commit('setUser', localStorage.getItem('token'))  
          commit('setTesteo', email)
          return user
        } else {
          const err = await res.json()
          return err
        }
      } catch (error) {
        console.log(error)
      }
    },
    async verifyToken() {
      try {
        const res = await fetch(
         `${import.meta.env.VITE_APP_API}/login/users/verify-token`,
          {
            method: 'GET',
            headers: {
              'x-token': localStorage.getItem('token'),
              Accept: '*/*',
            },
          },
        )
        const data = await res.json()
        return data
      } catch (error) {
        console.log(error)
      }
    },
  },
  modules: {},
})