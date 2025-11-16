
function raw() {
	
const matches = [
	{
		id: 5,
		data: [
				{id: "1", term: "security policy weakness", desc: "The network administrator did not fully consider the implications of unauthorized users accessing the network."},
				{id: "2", term: "configuration weakness", desc: "When implementing an access list on a router, a network engineer did not filter a type of malicous traffic."},
				{id: "3", term: "technological weakness", desc: "A nework engineer is examining the operating system of a network device for vulnerabilities."},
				{id: "4", term: "step 4", desc: "Client send ACK"},
			]
	},
	{
		id: 6,
		data: [
				{id: "1", term: "information theft", desc: "Obtaining trade secret documents illegally"},
				{id: "2", term: "identity theft", desc: "Pretending to be someone else by using stolen personal information to apply for a credit card"},
				{id: "3", term: "data loss", desc: "Installing cirus code to destroy surveillance recordings for certain days"},
				{id: "4", term: "disruption of service", desc: "Preventing users from accessing a website by sending a large number of link requests in a short period"},
			]
	}, 
	{
		id: 11, 
		data: [
			{id: "1", term: "packet filtering", desc: "prevents or allows access based on the IP or MAC addresses of the source and destination"},
			{id: "2", term: "URL filtering", desc: "prevents or allows access based on web addresses or keywords"},
			{id: "3", term: "stateful packet inspection", desc: "prevents or allows access based on whether the traffic is in response to requests from internal hosts"},
			{id: "4", term: "application filtering", desc: "prevents or allows access based on the port numbers used in the request"},
		]
	},
	{
		id: 15,
		data: [
			{id: "1", term: "Step 1", desc: "Create a local user"},
			{id: "2", term: "Step 2", desc: "Generate RSA keys."},
			{id: "1", term: "Step 3", desc: "Configure a domain name"},
			{id: "1", term: "Step 4", desc: "use the login local command"},
			{id: "1", term: "Step 5", desc: "use the transport input ssh command"},
		]
	}

]
	const raw = Array.from(document.querySelectorAll('.wpProQuiz_question'))
	const type = "mcq";
	const questions = raw.map((el, index) => {
		if (el.querySelectorAll('ul > li').length < 2 || el.innerHTML.includes("table")) {
			const q = el.querySelector('.wpProQuiz_question_text').innerText;
			const i = el.querySelector('img')?.src;
			return { prompt: q, pairs: matches.filter(m=>(m.id-1) === index)[0].data, img: index === 16 ? i : null, type: "match" }
		} else {
			const question = el.querySelector('.wpProQuiz_question_text').innerText;
			const answers = Array.from(el.querySelectorAll('ul > li')).map(e => e?.innerText);
			const correct = Array.from(el.querySelectorAll('.wpProQuiz_answerCorrect')).map(el => el?.innerText)
			const img = el.querySelector('img')?.src;
			return { question, answers, correct, img: img ?? null, type }
		}

	})
	console.log(questions)

}


