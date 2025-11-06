

function raw() {
	const raw = Array.from(document.querySelectorAll('.wpProQuiz_question')).filter(el=>{
		return Array.from(el.querySelectorAll('ul > li')).length >= 2
	})
	const questions = raw.map(el=>{
		const question = el.querySelector('.wpProQuiz_question_text').innerText;
		const answers = Array.from(el.querySelectorAll('ul > li')).map(e=>e?.innerText);
		const correct = Array.from(el.querySelectorAll('.wpProQuiz_answerCorrect')).map(el=>el?.innerText)
		const img = el.querySelector('img')?.src;
		return {question, answers, correct, img: img ?? null}
		})
	console.log(questions)

}


