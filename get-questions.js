
function raw() {
	
const matches = [
	{
		id: 5,
		data: [
			{id: "0", term: "192.168.1.32/27", desc: "192.168.1.48"},
			{id: "1", term: "192.168.1.64/27", desc: "192.168.1.68"},
			{id: "2", term: "192.168.1.96/27", desc: "192.168.1.121"}
		]
	}, 
	{
		id: 10,
		data: [
			{id: "0", term: "192.168.100.161/25", desc: "Host Address"},
			{id: "1", term: "192.168.1.191/26", desc: "Broadcast Address"},
			{id: "2", term: "10.10.10.128/25", desc: "Network Address"},
			{id: "3", term: "203.0.113.100/24", desc: "Host Address"},
			{id: "4", term: "172.110.12.64", desc: "Network Address"},
			{id: "5", term: "10.0.0.159/27", desc: "Broadcast Address"},
		]
	},
	{
		id: 17,
		data: [
			{id: "0", term: "Network D", desc: "192.168.0.80 /30"},
			{id: "1", term: "Network A", desc: "192.168.0.128 /25"},
			{id: "2", term: "Network B", desc: "192.168.0.0 /26"},
			{id: "3", term: "Network C", desc: "192.168.0.96 /27"},
		]
	},
	{
		id: 32,
		data: [
			{id: "0", term: "::1", desc: "loopback"},
			{id: "1", term: "FF02::1", desc: "all node multicast"},
			{id: "2", term: "FF02::1:FFAE:F85F", desc: "solicited node multicast"},
			{id: "3", term: "2001:DB8::BAF:3F57:FE94", desc: "global unicast"},
		]
	}, 
	{
		id: 38,
		data: [
			{id: "0", term: "The IPv4 packets and IPv6 packets coexist in the same network.", desc: "dual-stack"},
			{id: "0", term: "The IPv6 packet is transported inside an IPv4 packet.", desc: "tunneling"},
			{id: "0", term: "IPv6 packets are converted into IPv4 packets, and vice versa.", desc: "translation"},
		]
	},
	{
		id: 46,
		data: [
			{id: "0", term: "a link-local address", desc: "169.254.1.5"},
			{id: "1", term: "a TEST-NET address", desc: ""},
			{id: "2", term: "an experimental address", desc: "240.2.6.255"},
			{id: "3", term: "a private address", desc: "172.19.20.5"},
			{id: "4", term: "a loopback address", desc: "127.0.0.1"},
		]
	}

]
	const raw = Array.from(document.querySelectorAll('.wpProQuiz_question'))
	const type = "mcq";
	const questions = raw.map((el, index) => {
		if (index === 25) {
			const question = " Consider the following range of addresses: 2001:0DB8:BC15:00A0:0000:: 2001:0DB8:BC15:00A1:0000:: 2001:0DB8:BC15:00A2:0000:: … 2001:0DB8:BC15:00AF:0000:: The prefix-length for the range of addresses is ___ "
			const answers = ["/60"]
			const correct = ["/60"]
			return {question, answers, correct, img: null, type}
		}
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


