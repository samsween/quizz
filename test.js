// Real questions in format {question, answer}[]
function getAnswers(realQuestions) {
	const question = document.querySelector('.question-text-color').innerText;
	for (let i = 0; i < realQuestions.length; i++) {
		if (realQuestions[i].question === question) {
			const aa = Array.from(document.querySelectorAll('#optionText')).filter(el=>el.innerText === realQuestions[i].answer)	
			aa[0].click()
		}	
	}
}



async function main(questions) {
	while (true) {
		getAnswers(questions);
		await new Promise(r=>setTimeout(r, 3000))
	}

}

