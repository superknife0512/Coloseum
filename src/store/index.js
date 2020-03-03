import Vue from 'vue';
import Vuex from 'vuex';
import playerData from '../components/data/player';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    allPlayers: playerData,
    normalPlayer: [],
    challenger: null,
  },
  mutations: {
    initApp(state) {
      state.normalPlayer = state.allPlayers.slice(0, playerData.length - 1);
      state.challenger = state.allPlayers[playerData.length - 1];
    },
  },
  actions: {
  },
  modules: {
  },
});
