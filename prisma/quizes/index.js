
import { questions as buildNetwork } from './BUILDNETWORK.js';
import { questions as communicateQuestions } from './COMMUNICATE.js';
import { questions as ipQuestions } from './IPADDR.js';
import { questions as networkQuestions } from './NETWORK.js';
import { questions as ethernetQuestions } from './ETHERNET.js';
import {questions as finalQuestions} from "./FINAL.js";


const ethernet = {
  title: 'Checkpoint Exam: Ethernet Concepts Exam',
  slug: 'ethernet-basics',
  description: 'Learn about Ethernet standards, speeds, and cables.',
  image: null,
  questions: ethernetQuestions
};

const buildNetworkQuiz = {
  title: 'Checkpoint Exam: Building and Securing a Small Network',
  slug: 'build-network',
  description: 'Learn how to plan and assemble a small business network.',
  image: null,
  questions: buildNetwork
};

const communicateQuiz = {
  title: 'Checkpoint Exam: Communicating Between Networks Exam',
  slug: 'communicate',
  description: 'Networking fundamentals and communication protocols.',
  image: null,
  questions: communicateQuestions
};

const ipQuiz = {
  title: 'Checkpoint Exam: IP Addressing Exam',
  slug: 'ip-addressing',
  description: 'Understand IPv4 addressing, subnetting, and masks.',
  image: null,
  questions: ipQuestions
};

const networkQuiz = {
  title: 'Checkpoint Exam: Network Application Communications Exam',
  slug: 'network-basics',
  description: 'The core principles of how networks connect and operate.',
  image: null,
  questions: networkQuestions
};

export const finalQuiz = {
  title: 'Final QuiZ',
  slug: 'final-quiz',
  description: 'All questions for final exam',
  image: null,
  questions: finalQuestions
};

export const quizzes = {
  // [ethernet.slug]: ethernet,
  [communicateQuiz.slug]: communicateQuiz,
  [ipQuiz.slug]: ipQuiz,
  [networkQuiz.slug]: networkQuiz,
  [buildNetworkQuiz.slug]: buildNetworkQuiz,
  // [finalQuiz.slug]: finalQuiz
};

export function getQuiz(slug) {
  return quizzes[slug];
}

export function listQuizzes() {
  return Object.values(quizzes);
}
