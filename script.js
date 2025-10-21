/*
  Quiz logic for the presentation handout.

  The quiz shows one question at a time. When a user selects an answer,
  immediate feedback is displayed explaining why the answer is correct or
  incorrect. After reading the feedback, the user can proceed to the next
  question. When all questions are answered, the final score is shown.
*/

// Define the quiz questions, options, correct answer index and explanations.
const questions = [
  {
    question:
      'On his first day in office, which Trump policy did President Biden revoke?',
    options: [
      'The travel ban targeting several Muslim-majority and African countries',
      'Deferred Action for Childhood Arrivals (DACA)',
      '287(g) agreements deputizing local police',
      'The denaturalization program for Americans',
    ],
    answer: 0,
    explanation:
      'Biden revoked the Trump‑era “travel ban,” instructing the State Department to resume visa processing for the affected countries.',
  },
  {
    question:
      'Which program, also known as “Remain in Mexico,” did President Biden terminate to restore asylum procedures?',
    options: [
      'Deferred Action for Childhood Arrivals (DACA)',
      'Migrant Protection Protocols (MPP)',
      'CHNV humanitarian parole program',
      '“Travel Ban 2.0”',
    ],
    answer: 1,
    explanation:
      'The Migrant Protection Protocols (MPP) required asylum seekers to wait in Mexico. Biden suspended new enrollments and formally terminated the program.',
  },
  {
    question:
      'Under President Biden’s enforcement guidance, immigration authorities were instructed to prioritize deportations against:',
    options: [
      'All undocumented immigrants regardless of circumstance',
      'Serious criminals, national-security threats and recent border crossers',
      'Only families traveling together',
      'Students on F‑1 visas',
    ],
    answer: 1,
    explanation:
      'Biden refocused interior enforcement on aggravated felons, gang members, national‑security threats and recent border crossers, moving away from a blanket deportation approach.',
  },
  {
    question:
      'Which of the following best describes the humanitarian programs expanded or protected by the Biden administration?',
    options: [
      'Expanding travel bans and visa limits',
      'Bolstering Temporary Protected Status (TPS) and parole programs such as CHNV and Uniting for Ukraine',
      'Instituting mass workplace raids',
      'Implementing a denaturalization task force',
    ],
    answer: 1,
    explanation:
      'Biden preserved and expanded humanitarian relief by designating additional countries for TPS and creating parole programs like CHNV and Uniting for Ukraine, offering legal status and work permits to those fleeing crises.',
  },
  {
    question:
      'President Trump’s January 20, 2025 “Protecting the American People Against Invasion” order declared that:',
    options: [
      'Only criminals were a priority for removal',
      'All removable noncitizens were priorities for enforcement and removal',
      'The border wall would be dismantled',
      'Asylum seekers could continue using the CBP One app',
    ],
    answer: 1,
    explanation:
      'The “Invasion” order rescinded Biden’s enforcement priorities and declared that every removable noncitizen—not just criminals—would be subject to enforcement and deportation.',
  },
  {
    question:
      'Trump’s “Securing Our Borders” order, issued in late January 2025, reinstated which pair of hard‑line policies?',
    options: [
      'Continuation of DACA and TPS',
      'Border wall construction and the Migrant Protection Protocols (MPP)',
      'Expansion of humanitarian parole programs',
      'The Title 42 public‑health expulsions and Uniting for Ukraine',
    ],
    answer: 1,
    explanation:
      'The order reactivated construction of the southern border wall and revived the Migrant Protection Protocols (MPP), sending asylum seekers back to Mexico to await hearings.',
  },
  {
    question:
      'On June 4 2025, President Trump issued “Travel Ban 2.0” targeting how many countries?',
    options: ['Five countries', 'Ten countries', 'Nineteen countries', 'Fifty countries'],
    answer: 2,
    explanation:
      'The proclamation imposed a travel ban on nationals from 12 countries and partial restrictions on seven others, affecting a total of 19 countries.',
  },
  {
    question:
      'In September 2025, a proclamation on H‑1B specialty occupation visas proposed what extraordinary requirement?',
    options: [
      'A \$10,000 government filing fee per petition',
      'A \$25,000 surcharge per petition',
      'A \$100,000 fee per petition for the worker to be allowed entry',
      'No additional fee – it eliminated filing fees altogether',
    ],
    answer: 2,
    explanation:
      'The proclamation required employers to pay a \$100,000 fee for each H‑1B petition, dramatically increasing the cost of hiring foreign workers and drawing legal challenges.',
  },
  {
    question:
      'Under President Trump’s 2025 directives, what happened to humanitarian parole programs such as CHNV and Uniting for Ukraine?',
    options: [
      'They were expanded to include more countries',
      'They were maintained without changes',
      'They were terminated, putting recent parolees at risk of losing status',
      'They were converted into asylum grants',
    ],
    answer: 2,
    explanation:
      'The Trump administration ended humanitarian parole initiatives like CHNV and Uniting for Ukraine, terminating lawful entry for hundreds of thousands of parolees.',
  },
  {
    question:
      'Which statute did Trump invoke in his order titled “Guaranteeing the States Protection Against Invasion” to suspend asylum seekers’ entry?',
    options: [
      'INA §212(f)',
      'Deferred Action for Childhood Arrivals (DACA)',
      'Public Charge Rule',
      'The Refugee Act of 1980',
    ],
    answer: 0,
    explanation:
      'Trump relied on INA §212(f) to bar the entry of all asylum seekers at the border, claiming that uncontrolled migration constituted an “invasion.”',
  },
];

// State variables
let currentQuestionIndex = 0;
let score = 0;

// Grab the quiz container element
const quizContainer = document.getElementById('quiz-container');

/**
 * Render the current question and its options.
 */
function renderQuestion() {
  const q = questions[currentQuestionIndex];
  // Clear previous content
  quizContainer.innerHTML = '';

  // Create question element
  const questionEl = document.createElement('div');
  questionEl.className = 'quiz-question';
  questionEl.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}: ${q.question}`;
  quizContainer.appendChild(questionEl);

  // Create options list
  const optionsList = document.createElement('ul');
  optionsList.className = 'quiz-options';

  q.options.forEach((option, index) => {
    const listItem = document.createElement('li');
    const button = document.createElement('button');
    button.textContent = option;
    button.onclick = () => handleAnswer(index);
    listItem.appendChild(button);
    optionsList.appendChild(listItem);
  });

  quizContainer.appendChild(optionsList);
}

/**
 * Handle the user selecting an answer. Provide feedback and then allow the
 * user to proceed to the next question.
 *
 * @param {number} selectedIndex – The index of the option clicked by the user.
 */
function handleAnswer(selectedIndex) {
  const q = questions[currentQuestionIndex];
  // Disable all option buttons after answering
  const buttons = quizContainer.querySelectorAll('button');
  buttons.forEach((btn) => (btn.disabled = true));

  // Determine correctness
  const isCorrect = selectedIndex === q.answer;
  if (isCorrect) {
    score++;
  }

  // Add styling to show which answer was chosen and which is correct
  buttons.forEach((btn, idx) => {
    if (idx === q.answer) {
      btn.classList.add('correct');
    }
    if (idx === selectedIndex && !isCorrect) {
      btn.classList.add('incorrect');
    }
  });

  // Display feedback message
  const feedback = document.createElement('div');
  feedback.className = 'feedback ' + (isCorrect ? 'correct' : 'incorrect');
  feedback.textContent = isCorrect
    ? `Correct! ${q.explanation}`
    : `Incorrect. ${q.explanation}`;
  quizContainer.appendChild(feedback);

  // Create Next or Finish button
  const nextBtn = document.createElement('button');
  nextBtn.className = 'next-button';
  nextBtn.textContent = currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'See Results';
  nextBtn.onclick = () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      renderQuestion();
    } else {
      renderResults();
    }
  };
  quizContainer.appendChild(nextBtn);
}

/**
 * Render the final results after all questions have been answered.
 */
function renderResults() {
  quizContainer.innerHTML = '';
  const resultsEl = document.createElement('div');
  resultsEl.className = 'quiz-question';
  resultsEl.textContent = `You scored ${score} out of ${questions.length}.`;
  quizContainer.appendChild(resultsEl);

  const thankYou = document.createElement('p');
  thankYou.style.marginTop = '1rem';
  thankYou.textContent = 'Thanks for participating!';
  quizContainer.appendChild(thankYou);
}

// Initialize quiz on page load
renderQuestion();