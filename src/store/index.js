import Vue from 'vue';
import Vuex from 'vuex';
import playerData from '../components/data/player';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    allPlayers: playerData,
    normalPlayer: [],
    challenger: null,
    helperPower: null,
  },
  mutations: {
    initApp(state) {
      state.normalPlayer = state.allPlayers.slice(0, playerData.length - 1);
      state.challenger = state.allPlayers[playerData.length - 1];
    },

    changeChallenger(state, newChallengerName) {
      const newAllPlayers = [...state.normalPlayer, state.challenger];
      state.allPlayers = newAllPlayers;
      state.challenger = newAllPlayers.find((ele) => ele.username === newChallengerName);
      state.normalPlayer = newAllPlayers.filter((ele) => ele.username !== newChallengerName);
    },

    plusScore(state, payload) {
      if (payload.name === state.challenger.username) {
        state.challenger.point += +payload.score;
      } else {
        const player = state.normalPlayer.find((ele) => ele.username === payload.name);
        player.point += +payload.score;
      }
    },

    minusScore(state, payload) {
      if (payload.name === state.challenger.username) {
        state.challenger.point -= +payload.score;
      } else {
        const player = state.normalPlayer.find((ele) => ele.username === payload.name);
        player.point -= +payload.score;
      }
    },

    setHelper(state, payload) {
      state.helperPower = payload;
    },
  },
  actions: {
  },
  modules: {
  },
});
