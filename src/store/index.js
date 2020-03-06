/* eslint-disable max-len */
import Vue from 'vue';
import Vuex from 'vuex';
import playerData from '../components/data/player';
import questionData from '../components/data/questions';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    allPlayers: playerData,
    normalPlayer: [],
    challenger: null,
    rank: 1,
    helperPower: null,

    allQuestions: questionData,
    question: null, // question, time
    level: '',
    time: '',
    score: 0,
  },
  mutations: {
    initApp(state) {
      state.normalPlayer = state.allPlayers.slice(0, playerData.length - 1);
      state.challenger = state.allPlayers[playerData.length - 1];
    },

    changeRank(state, rank) {
      state.rank = rank;
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

    selectQuestion(state, payload) {
      const questionsWithType = state.allQuestions.filter((ele) => ele.level === payload.questionLevel);
      state.question = { ...questionsWithType[0] };
      state.allQuestions = state.allQuestions.filter((ele) => ele.id !== state.question.id);
      state.level = payload.questionLevel;
      state.time = payload.time;
    },

    setScore(state, score) {
      state.score = score;
    },

    clearQuestion(state) {
      state.question = null; // question, time
      state.level = '';
      state.time = '';
      state.score = 0;
    },
  },
  actions: {
  },
  modules: {
  },
});
