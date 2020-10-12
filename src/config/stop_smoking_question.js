import { AFTER_FIRST_QUESTIONNAIRE, AFTER_YEARS } from '../helpers/constants';
import { YES_NO_RESPONSES } from './questionnaire';

const QUESTION_TEXT = 'A l’issue de votre utilisation de Smokecheck, envisagez-vous:'
const WITHOUT_REDUCTION_ANSWER = 'De poursuivre votre consommation sans réduction'
const WITH_REDUCTION_ANSWER = 'De poursuivre en réduisant la consommation'
const STOP_SMOKING_ANSWER = 'L’arrêt total du tabac'

export const STOP_SMOKING_QUESTION_AFTER_FIRST_QUESTIONNAIRE = {
  app_point: AFTER_FIRST_QUESTIONNAIRE,
  question_text: QUESTION_TEXT,
  answers: [
    {
      answer: WITHOUT_REDUCTION_ANSWER,
      value: 0,
    },
    {
      answer: WITH_REDUCTION_ANSWER,
      value: 1,
    },
    {
      answer: STOP_SMOKING_ANSWER,
      value: 2,
    },
  ],
}

// After 2 months and after 1 year add the 2 questions
export const STOP_SMOKING_QUESTION_AFTER_TWO_MONTHS = {
  app_point: AFTER_YEARS,
  question_text: 'Depuis votre utilisation de Smokecheck, avez-vous :',
  answers: [
    {
      answer: 'Poursuivi votre consommation sans réduction ?',
      value: 0,
    },
    {
      answer: 'Poursuivi en réduisant la consommation de cigarettes ?',
      value: 1,
    },
    {
      answer: 'Arrêté complètement ?',
      value: 2,
    },
  ],
}


export const STOP_SMOKING_QUESTION_SMOKECHECK = {
  app_point: AFTER_YEARS,
  question_text: 'Si vous avez réduit ou arrêté, diriez-vous que Smokecheck y à contribuer ?',
  answers: YES_NO_RESPONSES
}

// If answer is 1 or 2, we ask the second question

// This is deprecated
export const STOP_SMOKING_QUESTION_AFTER_YEARS = {
  app_point: AFTER_YEARS,
  question_text: QUESTION_TEXT,
  answers: [
    {
      answer: WITHOUT_REDUCTION_ANSWER,
      value: 0,
    },
    {
      answer: WITH_REDUCTION_ANSWER,
      value: 1,
    },
    {
      answer: STOP_SMOKING_ANSWER,
      value: 2,
    },
    {
      answer: 'Vous avez arrêté de fumer depuis que vous utilisez Smokecheck',
      value: 3,
    },
  ],
}
