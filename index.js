import SEBEUsecase from '#src/usecase.js';

const QUESTION1 = '1';
const QUESTION2 = '2';

const args = process.argv.slice(2);
const question = args[0];

const usecase = new SEBEUsecase();
if (question === QUESTION1) {
  usecase.questionOne();
} else if (question === QUESTION2) {
  usecase.questionTwo();
} else {
  console.log("Argument must be either '1' or '2'.");
}
