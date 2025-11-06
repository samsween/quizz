function getAnswers() {
	let data = []
	const questions = Array.from(document.querySelectorAll('.question-box'));
	const t = questions.map(el=>{
		const q = el.querySelector('p').innerText
		const answer = el.querySelector('li > span').innerText;
		return {
			question: q,
			answer	
		}
		
	})
	return t;

}



function setAnswers() {

	const data = [
  {
    "question": "What is the length of the hypotenuse?",
    "answer": "34"
  },
  {
    "question": "What is the length of the side opposite∠X?",
    "answer": "16"
  },
  {
    "question": "What is the length of the side adjacent to ∠Z?",
    "answer": "16"
  },
  {
    "question": "What is the ratio for Sine?",
    "answer": "Opp/Hyp)"
  },
  {
    "question": "What is the ratio for Tangent",
    "answer": "Opp/Adj"
  },
  {
    "question": "What is the ratio for Cosine?",
    "answer": "Adj/Hyp"
  },
  {
    "question": "What is the correct ratio?",
    "answer": "40/41"
  },
  {
    "question": "What is the correct ratio?",
    "answer": "7/24"
  },
  {
    "question": "What is the correct ratio?",
    "answer": "16/12"
  },
  {
    "question": "What is the correct ratio?",
    "answer": "8/10"
  },
  {
    "question": "What is the correct equation to solve for x ?",
    "answer": "tan( 46 ) = 17/x"
  },
  {
    "question": "What is the correct equation to solve for x ?",
    "answer": "tan (58) = 11/x"
  },
  {
    "question": "What is the correct equation to solve for x?",
    "answer": "sin (45) = 13/x"
  },
  {
    "question": "Which is the correct applied ratio?",
    "answer": "A"
  },
  {
    "question": "Which is the correct applied ratio?",
    "answer": "C"
  },
  {
    "question": "Which is the correct applied ratio?",
    "answer": "B"
  },
  {
    "question": "Which is the correct applied ratio?",
    "answer": "C"
  },
  {
    "question": "Find the value of tan X.",
    "answer": "3/4"
  },
  {
    "question": "Find the measure of the indicated angle (?) round to the nearest tenth.",
    "answer": "55.2"
  },
  {
    "question": "Use inverse trig ratios (SOH CAH TOA) to solve for the missing angle",
    "answer": "57°"
  }
]
	setInterval(()=>{
		const question = document.querySelector('.question-text-color').innerText;
		const answers = Array.from(document.querySelectorAll('#optionText'));
		data.forEach(d=>{
			if (d.question.includes(question)) {
				answers.forEach(a=>{
					if (a === d.answer) {
						a.click()
					}
				})
			}
		})
	}, 5000)
}
