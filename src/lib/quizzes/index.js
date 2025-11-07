
import { questions as buildNetwork } from '$lib/BUILDNETWORK';
import { questions as communicateQuestions } from '$lib/COMMUNICATE';
import { questions as ipQuestions } from '$lib/IPADDR';
import { questions as networkQuestions } from '$lib/NETWORK';
import { questions as ethernetQuestions } from '$lib/ETHERNET';
import {questions as finalQuestions} from "$lib/FINAL";


const ethernet = {
  title: 'Ethernet',
  slug: 'ethernet-basics',
  description: 'Learn about Ethernet standards, speeds, and cables.',
  image: null,
  questions: ethernetQuestions
};

const buildNetworkQuiz = {
  title: 'Building a Network',
  slug: 'build-network',
  description: 'Learn how to plan and assemble a small business network.',
  image: null,
  questions: buildNetwork
};

const communicateQuiz = {
  title: 'Communicate Effectively',
  slug: 'communicate',
  description: 'Networking fundamentals and communication protocols.',
  image: null,
  questions: communicateQuestions
};

const ipQuiz = {
  title: 'IP Addressing',
  slug: 'ip-addressing',
  description: 'Understand IPv4 addressing, subnetting, and masks.',
  image: null,
  questions: ipQuestions
};

const networkQuiz = {
  title: 'Network Basics',
  slug: 'network-basics',
  description: 'The core principles of how networks connect and operate.',
  image: null,
  questions: networkQuestions
};

const finalQuiz = {
  title: 'Final QuiZ',
  slug: 'final-quiz',
  description: 'All questions for final exam',
  image: null,
  questions: finalQuestions
};

export const quizzes = {
  [ethernet.slug]: ethernet,
  [buildNetworkQuiz.slug]: buildNetworkQuiz,
  [communicateQuiz.slug]: communicateQuiz,
  [ipQuiz.slug]: ipQuiz,
  [networkQuiz.slug]: networkQuiz,
  [finalQuiz.slug]: finalQuiz
};

export function getQuiz(slug) {
  return quizzes[slug];
}

export function listQuizzes() {
  return Object.values(quizzes);
}
