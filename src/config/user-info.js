export default [
  {
    id: 0,
    name: 'gender',
    message: 'Êtes-vous ?',
    answers: [
      {
        answer: 'Un homme',
        image: require('../../assets/male.png'),
        value: 0,
      }, {
        answer: 'Une femme',
        image: require('../../assets/Female.png'),
        value: 1,
      },
    ],
    type: 'CHOICE',
  },
  {
    id: 1,
    name: 'birthDate',
    message: 'Quelle est votre date de naissance ?',
    answers: [],
    type: 'DATE',
  }, {
    id: 2,
    name: 'smoker',
    message: 'Êtes-vous ?',
    answers: [
      {
        answer: 'Un fumeur',
        image: require('../../assets/smoker.png'),
        value: 1,
      }, {
        answer: 'Un ancien fumeur',
        image: require('../../assets/nonsmoker.png'),
        value: 0,
      }, {
        answer: 'Une fumeuse',
        image: require('../../assets/smoker.png'),
        value: 1,
      }, {
        answer: 'Une ancienne fumeuse',
        image: require('../../assets/nonsmoker.png'),
        value: 0,
      },
    ],
    type: 'CHOICE-GENDER',
  },
  {
    id: 3,
    name: 'dateOfStopSmoking',
    message: 'Depuis quand avez-vous cessé de fumer ?',
    type: 'DATE',
  }, {
    id: 4,
    name: 'numberOfYearTabacco',
    message: 'Vous fumez ou avez fumé pendant combien d\'années en tout?',
    answers: [
      {
        answer: '0 à 9 ans',
        value: 1,
      },
      {
        answer: '10 à 19 ans',
        value: 2,
      },
      {
        answer: '20 à 29 ans',
        value: 3,
      },
      {
        answer: '30 ans ou plus',
        value: 4,
      },
    ],
    type: 'SELECT',
  },
  {
    id: 5,
    name: 'numberOfCigarettePerDay',
    message: 'Nombre de cigarettes par jour ?',
    answers: [
      {
        answer: '10 ou moins',
        value: 1,
      },
      {
        answer: '11 à 20',
        value: 2,
      },
      {
        answer: '21 à 30',
        value: 3,
      },
      {
        answer: '31 à 40',
        value: 4,
      },
      {
        answer: '41 ou plus',
        value: 5,
      },
    ],
    type: 'SELECT',
  },
  {
    id: 6,
    name: 'smokerDesireToStopSmoking',
    message: 'Concernant l’arrêt du tabac',
    answers: [
      {
        answer: 'Vous ne souhaitez pas arrêter',
        value: 'Vous ne souhaitez pas arrêter',
      },
      {
        answer: 'Vous hésitez à arrêter',
        value: 'Vous hésitez à arrêter',
      },
      {
        answer: 'Vous envisagez de réduire votre consommation',
        value: 'Vous envisagez de réduire votre consommation',
      },
      {
        answer: 'Vous avez arrêté il y a moins d’1 mois',
        value: 'Vous avez arrêté il y a moins d’1 mois',
      },
      {
        answer: 'Vous avez arrêté il y a moins d’1 an',
        value: 'Vous avez arrêté il y a moins d’1 an',
      },
      {
        answer: 'Vous avez arrêté il y a plus d’1 an',
        value: 'Vous avez arrêté il y a plus d’1 an',
      }],
    type: 'SELECT',
  },
  {
    id: 7,
    name: 'city',
    message: 'Dans quelle ville habitez-vous?',
    value: '',
    maxLength: 50,
    type: 'TEXT',
  },
]
