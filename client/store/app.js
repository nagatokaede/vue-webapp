'use static';

const App = {
  namespaced: true,

  state: {
    title: 'home',
  },

  getters: {
    getTitle(state) {
      return state.title;
    },
  },

  mutations: {
    setTitle(state, payload) {
      state.title = payload;
    },
  },

  actions: {
    setTitle({ commit }, payload) {
      commit('setTitle', payload);
    },

    initTitle({ commit }) {
      commit('setTitle', 'home');
    },
  },
};

export default App;
