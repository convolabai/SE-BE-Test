import { questionOne } from '#src/question-1/index.js';
import { questionTwo } from './src/question-2/index.js';

const QUESTION1 = '1';
const QUESTION2 = '2';

const args = process.argv.slice(2);
const question = args[0];

if (question === QUESTION1) {
  questionOne();
} else if (question === QUESTION2) {
  questionTwo();
} else {
  console.log("Argument must be either '1' or '2'.");
}
