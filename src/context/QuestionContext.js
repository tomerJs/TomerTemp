import createDataContext from './createDataContext';

const questionReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ANSWER':
      const {question, userAnswer} = action.payload
      const answer = {
        questionId: question.id,
        number: question.number,
        name: question.name,
        parentQuestion: question.parentQuestion,
        question: question.message,
        type: question.type,
        answer: question.type === 'TEXT' ? question.answers[0] : question.answers[userAnswer].answer,
        value: question.type === 'TEXT' ? userAnswer.toString() : userAnswer,
      }
      state.userAnswers.set(question.number, answer)
      return {
        ...state,
      }
    case 'DELETE_ANSWER':
      state.userAnswers.forEach((userAnswer, key) => {
        if (userAnswer.number === action.questionNumber || userAnswer.parentQuestion === action.questionNumber) {
          state.userAnswers.delete(userAnswer.number)
        }
      })
      return {
        ...state,
      }
    case 'RESET_ANSWERS':
      return {
        ...state,
        userAnswers: new Map(),
      }
    default:
      return state;
  }
};

const addAnswer = (dispatch) => (question, userAnswer) => {
  dispatch({
    type: 'ADD_ANSWER',
    payload: {
      question,
      userAnswer,
    },
  });
};


const removeAnswer = (dispatch) => (questionNumber) => {
  dispatch({
    type: 'DELETE_ANSWER',
    questionNumber,
  });
}

const resetAnswers = (dispatch) => () => {
  dispatch({
    type: 'RESET_ANSWERS',
  });
}

export const { Context, Provider } = createDataContext(
  questionReducer,
  { addAnswer, removeAnswer, resetAnswers },
  { userAnswers: new Map() }
);
