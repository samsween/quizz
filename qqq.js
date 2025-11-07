

function raw() {
	const raw = Array.from(document.querySelectorAll('.wpProQuiz_question'))
	const questions = raw.map(el=>{
		if (el.querySelectorAll('ul > li').length < 2) {
			const q = el.querySelector('.wpProQuiz_question_text').innerText;
			const a = ["Select this to get it right"];
			const c = ["Select this to get it right"];
			const i = el.querySelector('img')?.src;
			return {question: q, answers: a, correct: c, img: i }
		} else {
			const question = el.querySelector('.wpProQuiz_question_text').innerText;
			const answers = Array.from(el.querySelectorAll('ul > li')).map(e=>e?.innerText);
			const correct = Array.from(el.querySelectorAll('.wpProQuiz_answerCorrect')).map(el=>el?.innerText)
			const img = el.querySelector('img')?.src;
			return {question, answers, correct, img: img ?? null}
		}
		
		})
	console.log(questions)

}


