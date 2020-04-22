/* eslint-disable max-len */
import Vue from 'vue';
import Vuex from 'vuex';
import io from 'socket.io-client';
import questionData from '../components/data/questionReal';
import evaluate from '../components/util/evaluate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    socket: io('http://localhost:3000'),

    allPlayers: [],
    normalPlayer: [],
    challenger: null,
    rank: 1,
    helperPower: null, // name point

    allQuestions: questionData,
    question: null, // question, time
    level: '',
    time: '',
    score: 0,
    playerAnswers: [], // username, answer
    canSubmit: false,

    currentPlayer: {
      username: '',
      score: 100,
      img: '',
    },
    finalScore: 0,
  },
  mutations: {
    evaluateAnswer(state) {
      evaluate(state);
    },

    setAllPlayers(state, allPlayerPayload) {
      state.allPlayers = allPlayerPayload;
    },

    updateAnswer(state, answersPayload) {
      state.playerAnswers = answersPayload;
    },

    initApp(state) {
      state.normalPlayer = state.allPlayers.slice(0, state.allPlayers.length - 1);
      state.challenger = state.allPlayers[state.allPlayers.length - 1];
    },

    changeRank(state, rank) {
      state.rank = rank;
    },

    canSubmitChange(state, questionState) {
      console.log(questionState);
      if (questionState === 'start') {
        state.canSubmit = true;
      } else {
        state.canSubmit = false;
      }
    },

    updateAllPlayer(state) {
      const newAllPlayers = [...state.normalPlayer, state.challenger];
      state.allPlayers = newAllPlayers;
    },

    changeChallenger(state, newChallengerName) {
      const newAllPlayers = [...state.normalPlayer, state.challenger];
      state.allPlayers = newAllPlayers;
      state.challenger = newAllPlayers.find((ele) => ele.username === newChallengerName);
      state.normalPlayer = newAllPlayers.filter((ele) => ele.username !== newChallengerName);
    },

    plusScore(state, payload) { // name, score
      console.log(payload, 53);
      if (payload.name === state.challenger.username) {
        state.challenger.score += +payload.score;
      } else {
        const player = state.normalPlayer.find((ele) => ele.username === payload.name);
        player.score += +payload.score;
      }
    },

    minusScore(state, payload) {
      if (payload.name === state.challenger.username) {
        state.challenger.score -= +payload.score;
      } else {
        const player = state.normalPlayer.find((ele) => ele.username === payload.name);
        player.score -= +payload.score;
      }
    },

    setHelper(state, payload) {
      if (state.helperPower !== null && state.helperPower.name === payload.name) {
        state.helperPower = null;
        return;
      }
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
      state.canSubmit = false;
      state.finalScore = 0;
      state.helperPower = null;
    },

    setCurrentPlayer(state, payload) {
      state.currentPlayer = payload;
    },

    setCurrentPlayerScore(state, payload) {
      state.currentPlayer.score = payload;
    },

    saveData(state) {
      localStorage.setItem('allQuestions', JSON.stringify(state.allQuestions));
    },

    setOldData(state) {
      const allQuestions = JSON.parse(localStorage.getItem('allQuestions'));
      if (allQuestions) {
        state.allQuestions = allQuestions;
      }
    },
  },
  actions: {
  },
  modules: {
  },
});
