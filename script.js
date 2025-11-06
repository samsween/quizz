function getQuestionContent() {
	const answers = document.getElementById('content-question-start').querySelectorAll('li');
	const answersText = Array.from(answers).map(a => a.innerText.replaceAll("\n", ""))
	const question = document.getElementById('content-question-start').querySelector('p');
	const questionText = question.innerText;
	return { questionText, answersText }
}

const LETTERS = ["A", "B", "C", "D"]

const getCorrectAnswer = async () => {
	clickChoice(LETTERS[Math.floor(Math.random() * LETTERS.length)])
	clickConfirm()
	await new Promise(r => setTimeout(r, 500))
	const correct = Array.from(document.querySelectorAll('.answer-choice.correct')).map(el => el.innerText);
	return { correct }
}

async function waitForSelector(selector, timeout) {
	let runtime = 0
	while (document.querySelector(selector)?.length == 0 || runtime >= timeout) {
		await wait(100);
		runtime++;
	}
	return document.querySelector(selector);
}

function clickChoice(choice) {
	const btns = Array.from(document.querySelectorAll(".choice-link"));
	const correct = btns.filter(b => {
		if (b.querySelector('span').innerText == choice) {
			return b;
		}

	})
	correct[0]?.click()
}

function clickConfirm() {
	document.getElementById('confirm-choice').click()
}


const getAllData = async () => {
	let question = getQuestionContent().questionText
	let answer = await getCorrectAnswer();
	return { question, answer: answer.correct }
}

async function getQuestionCorrect(answers) {
	const data = getQuestionContent();
	for (const ans of answers) {
		if (ans.question === data.questionText) {
			for (const aa of ans.answer) {
				clickChoice(aa)
				await wait(100)
			}
		}
	}
	//answers.forEach(a => {
	//	if (a.question === data.questionText) {
	//		a.answer.forEach(aa => { clickChoice(aa); console.log() })
	//	}
	//})

}


async function getAnswers(lab) {
	const data = [];

	// loop while at least one .choice-link exists
	while (document.getElementById('quiz').parentElement.style.display !== "none") {
		const d = await getAllData();
		data.push(d);

		const continueBtn = document.querySelector('.continue');
		if (!continueBtn) break;          // avoid null click
		continueBtn.click();              // no need to await

		await new Promise(r => setTimeout(r, 500));
	}

	await reset(lab);
	await getAllCorrect(data)
}
async function getAllCorrect(answers) {
	// loop while at least one .choice-link exists
	while (document.getElementById('quiz').parentElement.style.display !== "none") {
		const d = await getQuestionContent();
		const correct = answers.filter(a => a.question === d.questionText)[0];
		await clickChoice(correct.answer)
		await clickConfirm();
		await new Promise(r => setTimeout(r, 500))
		const continueBtn = document.querySelector('.continue');
		if (!continueBtn) break;          // avoid null click
		continueBtn.click();              // no need to await

		// give the UI time to update / navigate
		await new Promise(r => setTimeout(r, 500));
	}

}

async function wait(time) {
	await new Promise(r => setTimeout(r, time))
}

async function reset(lab) {
	document.querySelector('.back').click();
	await wait(1500)
	Array.from(document.querySelectorAll('li')).forEach(el => { if (el?.ariaLabel?.includes(`Lesson ${lab}:`)) { el.querySelector('.clickable').querySelector('a').click() } })
	await wait(2500)
	document.querySelectorAll('.reset-link')[1]?.click()
	await wait(2500)
	document.querySelectorAll('.confirm-reset-btn')[1]?.click()
	await wait(1000)
	document.querySelector('.recommended-action').querySelector('a').click()
	await wait(500)
}


async function main() {
	const labs = new Array(16).fill('').map((_, i)=>i + 1);
	for (const lab of labs) {
		await reset(lab);
		await getAnswers(lab)
	}

}
