
function raw() {
	
const matches = [{
	id: 14, data: [
		{ id: '0', term: "packets with destination of 172.17.6.15", desc: "FastEthernet0/0" },
		{ id: "1", term: "packets with destination of 172.17.14.8", desc: "FastEthernet0/1" },
		{ id: "2", term: "packets with destination of 172.17.12.10", desc: "FastEthernet1/0" },
		{ id: "3", term: "packets with destination of 172.17.10.5", desc: "FastEthernet1/1" },
		{ id: "4", term: "packets with destination of 172.17.8.20", desc: "Serial0/0/0" }

	]
}, {
	id: 30, data: [
		{ id: "0", term: "displays a message after accessing the router", desc: "Router(config)# banner motd #" },
		{ id: "1", term: "provides security on the console", desc: "Router(config-line)# password class" },
		{ id: "2", term: "configures a name on the router", desc: "Router(config)# hostname CL1" },
	]
},
{
	id: 32, data: [
		{ id: "0", term: "remote access method that uses encryption", desc: "SSH" },
		{ id: "1", term: "preferred out-of-band access method", desc: "console" },
		{ id: "2", term: "remote access via a dialup connection", desc: "AUX" },
		{ id: "3", term: "unsecure remote access", desc: "Telnet" },

	]
},
{
	id: 33, data: [
		{ id: "0", term: "Phase 1", desc: "Perform the POST and load the bootstrap program" },
		{ id: "1", term: "Phase 2", desc: "locate and load the startup configuration file" },
		{ id: "2", term: "Phase 3", desc: "locate and load the Cisco IOS software" },

	]
},
{
	id: 34, data: [
		{ id: "0", term: "service password-encryption", desc: "R1(config)#" },
		{ id: "1", term: "enable", desc: "R1>" },
		{ id: "2", term: "copy running-config startup-config", desc: "R1#" },
		{ id: "3", term: "login", desc: "R1(config-line)#" },
		{ id: "4", term: "ip address 192.168.4.4 255.255.255.0", desc: "R1(config-if)#" },
	]
},
{
	id: 40, data: [
		{ id: "0", term: "R1>", desc: "enable" },
		{ id: "1", term: "R1#", desc: "copy running-config startup-config" },
		{ id: "2", term: "R1(config-line)#", desc: "login" },
		{ id: "3", term: "R1(config)#", desc: "interface fastethernet 0/0" },
	]
}]
	const raw = Array.from(document.querySelectorAll('.wpProQuiz_question'))
	const type = "mcq";
	const questions = raw.map((el, index) => {
		if (el.querySelectorAll('ul > li').length < 2) {
			const q = el.querySelector('.wpProQuiz_question_text').innerText;
			const i = el.querySelector('img')?.src;
			return { prompt: q, pairs: matches.filter(m=>m.id === index)[0].data, img: index === 14 ? i : null, type: "match" }
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


