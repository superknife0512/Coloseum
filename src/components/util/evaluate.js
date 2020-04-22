
function levelToNumber(level) {
  switch (level) {
    case 'easy':
      return 1;
    case 'normal':
      return 2;
    case 'hard':
      return 3;
    default:
      return 4;
  }
}

function getFalseNumberAndCorrectNumber(state, listOfAnswers) {
  const falseAnswers = listOfAnswers.filter((ele) => ele.answer !== state.question.correctAns);
  const correctAnswers = listOfAnswers.filter((ele) => ele.answer === state.question.correctAns);
  return {
    correctNumber: correctAnswers.length,
    falseNumber: falseAnswers.length,
  };
}

/* eslint-disable max-len */
export default (state) => {
  const levelNumber = levelToNumber(state.level);
  let falseNumber = 1;
  let correctNumber = 1;

  const sortedNormalPlayer = [...state.normalPlayer].sort((a, b) => b.score - a.score);
  const blockedPlayer = sortedNormalPlayer[0];
  const supportPlayer = sortedNormalPlayer[sortedNormalPlayer.length - 1];

  console.log('blocked: ', blockedPlayer);
  console.log('support: ', supportPlayer);

  const challengerPower = state.challenger.power;

  const normalAnswers = state.playerAnswers.filter((ele) => ele.username !== state.challenger.username);

  const challengerAnswer = state.playerAnswers.find((ele) => ele.username === state.challenger.username);

  const supportAnswer = state.playerAnswers.find((ele) => ele.username === supportPlayer.username);
  const isChallengerCorrect = challengerAnswer.answer === state.question.correctAns;
  const isSupportCorrect = supportAnswer.answer === state.question.correctAns;

  if (!state.helperPower || state.helperPower.name === 'steal') {
    correctNumber += getFalseNumberAndCorrectNumber(state, normalAnswers).correctNumber;
    falseNumber += getFalseNumberAndCorrectNumber(state, normalAnswers).falseNumber;
    const additionalScore = state.helperPower?.name === 'steal' ? challengerPower.steal : 0;
    if (isChallengerCorrect) { // challenger is correct
      state.finalScore = (falseNumber * state.score) - additionalScore;
    } else {
      state.finalScore = -(levelNumber * correctNumber * 5 + additionalScore);
    }
    if (state.helperPower?.name === 'steal') {
      challengerPower.steal += 11;
    }
  } else if (state.helperPower.name === 'shield') {
    state.finalScore = -challengerPower.shield;
    challengerPower.shield += 8;
  } else if (state.helperPower.name === 'link') { // inferno chain
    const normalAnswerWithoutBlockedPlayer = normalAnswers.filter((ele) => ele.username !== blockedPlayer.username);
    correctNumber += getFalseNumberAndCorrectNumber(state, normalAnswerWithoutBlockedPlayer).correctNumber;
    falseNumber += getFalseNumberAndCorrectNumber(state, normalAnswerWithoutBlockedPlayer).falseNumber;
    if (isChallengerCorrect) {
      state.finalScore = falseNumber * state.score - challengerPower.link;
    } else {
      state.finalScore = -(levelNumber * correctNumber * 5 + challengerPower.link);
    }
    challengerPower.link += 5;
  } else if (state.helperPower.name === 'support') {
    const normalAnswerWithoutSupportPlayer = normalAnswers.filter((ele) => ele.username !== supportPlayer.username);
    console.log('74', normalAnswerWithoutSupportPlayer);
    correctNumber += getFalseNumberAndCorrectNumber(state, normalAnswerWithoutSupportPlayer).correctNumber;
    falseNumber += getFalseNumberAndCorrectNumber(state, normalAnswerWithoutSupportPlayer).falseNumber;
    if (isSupportCorrect || isChallengerCorrect) {
      state.finalScore = Math.round(((falseNumber * state.score) - challengerPower.support) / 2);
    } else {
      console.log('No one true');
      state.finalScore = -Math.round((levelNumber * correctNumber * 5 + challengerPower.support) / 2);
    }
    challengerPower.support += 7;
  }
  state.challenger = {
    ...state.challenger,
    power: { ...challengerPower },
  };
};
