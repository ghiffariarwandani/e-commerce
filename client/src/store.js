import Vue from 'vue'
import Vuex from 'vuex'
import ax from './apis/server'
import Swal from 'sweetalert2'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isUser:{
      id: '',
      username: '',
      email: '',
      address:  '',
      phone:  '',
      totalPayment: 0,
      isAdmin: false
    },
    isLogin: true,
    products: [],
    product: {},
    isLoginForm: false,
    carts: [],
    cartsPaid: []
  },
  getters: {
    isLogin: state => state.isLogin,
    isLoginForm: state => state.isLoginForm
  },
  mutations: {
    setIsLogin(state, payload) {
      state.isLogin = payload
    },
    setProduct(state, payload) {
      state.products = payload
    },
    setDetailProduct(state, payload) {
      state.product = payload
    },
    setIsLoginForm(state, payload) {
      state.isLoginForm = payload
    },
    setIsUser(state, payload) {
      state.isUser.id = payload.id
      state.isUser.username = payload.username
      state.isUser.email = payload.email
      state.isUser.address = payload.address
      state.isUser.phone= payload.phone
    },
    setCarts(state, payload) {
      state.carts = payload
    },
    setTotalPayment(state, payload){
      state.isUser.totalPayment = payload

    },
    pushCarts(state, payload) {
      state.carts.push(payload)
    },
    removeFromCart(state, payload) {
      state.carts = state.carts.filter(el =>  el.id != payload)
    },
    pushCartsPaid(state, payload) {
      state.cartsPaid.push(payload)
    },
    setCartsPaid(state, payload) {
      state.cartsPaid = payload
    },
    removeCartsWhenCheckout(state, payload) {
      state.carts = []
    }
  },
  actions: {
    login({ commit, state }, payload) {
      ax.post('/user/signin', payload) 
        .then(({ data }) => {
          Swal.fire({
            type: 'success',
            title: 'Welcome',
            text: `happy shopping ${data.username}`,
            showConfirmButton: false,
            timer: 1500
          })
          localStorage.setItem('token', data.token)
          localStorage.setItem('username', data.username)
          localStorage.setItem('userId', data.id)
          commit('setIsUser', data)
          commit('setIsLogin', true)
          commit('setIsLoginForm', false)
          setTimeout(() => { router.push('/') }, 1500)
        })
        .catch(err => {
          Swal.fire({
            type: 'error',
            title: '',
            text: 'wrong password / email',
            showConfirmButton: false,
            timer: 1500
          })
        })
    },
    register({ commit, state }, payload) {
      ax.post('/user/signup', payload)
        .then(({
          data
        }) => {
          Swal.fire({
            type: 'success',
            title: `Success register! Please login`,
            showConfirmButton: false,
            timer: 1500
          })
          setTimeout(() => {
            router.push('/login')
          }, 1500)
        })
        .catch(err => {
          console.log(err.response);
          Swal.fire({
            type: 'error',
            title: "",
            text: `username / email telah digunakan`
          })
        })
    },
    fetchProduct({ commit }, payload) {
      ax.get('/product')
        .then(({ data }) => {
          commit('setProduct', data)
        })
        .catch(console.log)
    },
    detailProduct({ commit }, payload){
      ax.get(`/product/${payload}`)
        .then(({ data }) => {
          commit('setDetailProduct', data)
        })
        .catch(console.log)
    },
    addToCart({ commit }, payload) {
      ax.defaults.headers.common.token = localStorage.token
      ax.post('/cart', payload)
        .then(({ data }) => {
          commit('pushCarts', data)
          Swal.fire({
            type:'success',
            title: 'success added to cart',
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch(console.log)
      let currentQuantity = payload.product.quantity - 1
      ax.patch(`/product/${payload.product._id}`, {currentQuantity})
        .then(data => {
          console.log('updated');
        })
        .catch(console.log)
    },
    fetchCarts({ commit }, payload) {
      let totalPayment = 0
      ax.defaults.headers.common.token = localStorage.token
      ax.get('/cart', payload)
        .then(({ data }) => {
          data.forEach(el => totalPayment += el.totalPrice)
          commit('setTotalPayment', totalPayment)
          commit('setCarts', data)
        })
        .catch(console.log)
    },
    deleteCart({ state, commit }, payload) {
      let totalPayment = state.isUser.totalPayment
      ax.defaults.headers.common.token = localStorage.token
      ax.delete(`/cart/${payload}`)
        .then(({ data }) => {
          totalPayment -= data.totalPrice
          commit('setTotalPayment', totalPayment)
          commit('removeFromCart', data._id)
        })
        .catch(console.log)
    },
    setUserData({ commit }) {
      const { userId } = localStorage;
      ax.defaults.headers.common.token = localStorage.token;
      if (userId) {
        ax.get(`user/${userId}`)
          .then(({ data }) => {
            commit('setIsUser', data);
          })
          .catch((err) => {
            if (err.response.data === 'jwt expired') {
              localStorage.clear();
              router.push('/');
            }
          });
      }
    },
    createTransaction({ commit, state }, payload) {
      console.log(payload);
      ax.defaults.headers.common.token = localStorage.token
      ax.post('/transaction', payload.carts)
        .then(({data}) => {
          commit('pushCartsPaid', data)
          commit('removeCartsWhenCheckout')
        })
        .catch(console.log)

      ax.defaults.headers.common.token = localStorage.token
      ax.delete(`/cart/deleteall`)
        .then(() => {
          console.log('deleted');
        })
        .catch(console.log)

      payload.carts.forEach(el => {
        ax.defaults.headers.common.token = localStorage.token
          ax.patch(`/product/${el.ProductId._id}`, {currentQuantity: el.ProductId.quantity})
            .then(() => console.log('update quantity'))
            .catch(console.log)
      })
    },
    fetchTransaction({ commit }, payload) {
      ax.defaults.headers.common.token = localStorage.token
      ax.get('/transaction')
        .then(({data}) => {
          commit('setCartsPaid', data)
        })
        .catch(console.log)
    },
    setDelivered({ commit, dispatch }, payload) {
      ax.defaults.headers.common.token = localStorage.token
      ax.patch(`/transaction/${payload}/?status=completed`)
        .then(({data}) => {
          dispatch('fetchTransaction')
          Swal.fire({
            type: 'success',
            title: 'thank! dont forget to give a rate'
          })
        })
        .catch(console.log)
    }
  }
})