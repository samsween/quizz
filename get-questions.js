
function raw() {
	
const matches = [
	{
		id: 131,
		data: [
			{id: "0", term: "This network portion of the address is assigned by the provider.", desc: "global routing"},
			{id: "1", term: "This part of the address is used by an organization to identify subnets.", desc: "subnet ID"},
			{id: "2", term: "This part of the address is the equivalent to the host portion of an IPv4 address.", desc: "interface ID"},
		]
	},
	{
		id: 133,
		data: [
			{id: "0", term: "low latency", desc: "Cut-through"},
			{id: "1", term: "may forward runt frames", desc: "Cut-through"},
			{id: "2", term: "begins forwarding when the destination address is received", desc: "Cut-through"},
			{id: "3", term: "always stores the entire frame", desc: "Store-and-forward"},
			{id: "4", term: "checks the CRC before forwarding", desc: "Store-and-forward"},
			{id: "5", term: "checks the frame length before forwarding", desc: "Store-and-forward"},
		]
	},
	{
		id: 136,
		data: [
			{id: "0", term: "Network A", desc: "192.168.0.128 /25"},
			{id: "1", term: "Network B", desc: "192.168.0.0 /26"},
			{id: "2", term: "Network C", desc: "192.168.0.96 /27"},
			{id: "3", term: "Network D", desc: "192.168.0.80/30"},
		]	
	},
		{
		id: 147,
		data: [
			{id: "0", term: "Network A", desc: "192.168.0.128 /25"},
			{id: "1", term: "Network B", desc: "192.168.0.0 /26"},
			{id: "2", term: "Network C", desc: "192.168.0.96 /27"},
			{id: "3", term: "Network D", desc: "192.168.0.80/30"},
		]	
	},
	{
		id: 149,
		data: [
			{id: "0", term: "FTP", desc: "TCP"},
			{id: "1", term: "HTTP", desc: "TCP"},
			{id: "2", term: "SMTP", desc: "TCP"},
			{id: "3", term: "DHCP", desc: "UDP"},
			{id: "4", term: "TFTP", desc: "UDP"},
		]
	},
	{
		id: 152,
		data: [
			{id: "0", term: "FTP", desc: "TCP"},
			{id: "1", term: "HTTP", desc: "TCP"},
			{id: "2", term: "SMTP", desc: "TCP"},
			{id: "3", term: "DHCP", desc: "UDP"},
			{id: "4", term: "TFTP", desc: "UDP"},
		]
	},
	{
		id: 58,
		data: [
			{id: "0", term: "electrical threats", desc: "voltage spikes, insufficient supply voltage (brownouts), unconditioned power (noise), and total power loss"},
			{id: "1", term: "hardware threats", desc: "physical damage to servers, routers, switches, cabling plant, and workstations"},
			{id: "2", term: "environmental threats", desc: "temperature extremes (too hot or too cold) or humidity extremes (too wet or too dry)"},
			{id: "3", term: "maintenance threats", desc: "poor handling of key electrical components (electrostatic discharge), lack of critical spare parts, poor cabling, and poor labeling"},
		]
	},
	{
		id: 96,
		data: [
			{id: "0", term: "no dedicated server is required ", desc: "peer-to-peer network"},
			{id: "1", term: "client and server roles are set on a per request basis", desc: "peer-to-peer network"},
			{id: "2", term: "requires a specific user interface", desc: "peer-to-peer aplication"},
			{id: "3", term: "a background service is required", desc: "peer-to-peer aplication"},
		]
	},
	{
		id: 99,
		data: [
			{id: "0", term: "addressing", desc: "This field helps to direct the frame toward its destination."},
			{id: "1", term: "error detection", desc: "This field checks if the frame has been damaged during the transfer."},
			{id: "2", term: "type", desc: "This field is used by the LLC to identify the Layer 3 protocol."},
			{id: "3", term: "frame start", desc: "This field identifies the beginning of a frame."},
		]
	},
	{
		id: 101,
		data: [
			{id: "0", term: "prevents access by port number", desc: "application filtering"},
			{id: "1", term: "prevents access based on IP or MAC address", desc: "packet filtering"},
			{id: "2", term: "prevents unsolicited incoming sessions", desc: "stateful packet inspection"},
			{id: "3", term: "prevents access to websites", desc: "URL filtering"},
		]
	},
	{
		id: 110,
		data: [
			{id: "0", term: "contained in the Layer 3 header", desc: "IP address"},
			{id: "1", term: "separated into a network portion and a unique identifier", desc: "IP address"},
			{id: "2", term: "32 or 128 bits", desc: "IP address"},
			{id: "3", term: "contained in the Layer 2 header", desc: "MAC address"},
			{id: "4", term: "separated into OUI and a unique identifier", desc: "MAC address"},
			{id: "5", term: "48 bits", desc: "MAC address"},
		]
	},
	{
		id: 158,
		data: [
			{id: "0", term: "802.2 header", desc: "Layer 2"},
			{id: "1", term: "FCS (frame check sequence)", desc: "Layer 2"},
			{id: "2", term: "destination MAC address", desc: "Layer 2"},
			{id: "3", term: "source IP address", desc: "Layer 3"},
			{id: "4", term: "TTL", desc: "Layer 3"},
			{id: "5", term: "destination port number", desc: "Layer 4"},
			{id: "6", term: "Acknowledgement number", desc: "Layer 4"},
		]
	},
	{
		id: 17,
		data: [
			{id: "0", term: "message encapsulation", desc: "the process of placing one message format inside another message format"},
			{id: "1", term: "message sizing", desc: "the process of breaking up a long message into individual pieces before being sent over the network"},
			{id: "2", term: "message encoding", desc: "the process of converting information from one format into another acceptable for transmission"},
		]
	},
	{
		id: 20,
		data: [
			{id: "0", term: "number of bytes a destination device can accept and process at one time", desc: "window size"},
			{id: "1", term: "used to identify missing segments of data", desc: "sequence numbers"},
			{id: "2", term: "method of managing segments of data loss", desc: "retransmission"},
			{id: "3", term: "received by a sender before transmitting more segments in a session", desc: "acknowledgment"},
		]
	},
	{
		id: 24, 
		data: [
			{id: "0", term: "location of a desktop PC in a classroom", desc: "physical topology diagram"},
			{id: "1", term: "path of cables that connect rooms to wiring closets", desc: "physical topology diagram"},
			{id: "2", term: "IP address of a server", desc: "logical topology diagram"},
		]
	},
	{
		id: 30,
		data: [
			{id: "0", term: "an experimental address", desc: "240.2.6.255"},
			{id: "1", term: "a link-local address", desc: "169.254.1.5"},
			{id: "2", term: "a public address", desc: "198.133.219.2"},
			{id: "3", term: "a loopback address", desc: "127.0.0.1"},
		]
	},
		{
		id: 151,
		data: [
			{id: "0", term: "no dedicated server is required ", desc: "peer-to-peer network"},
			{id: "1", term: "client and server roles are set on a per request basis", desc: "peer-to-peer network"},
			{id: "2", term: "requires a specific user interface", desc: "peer-to-peer aplication"},
			{id: "3", term: "a background service is required", desc: "peer-to-peer aplication"},
		]
	},
	

]
	const raw = Array.from(document.querySelectorAll('.wpProQuiz_question'))
	const type = "mcq";
	const questions = raw.map((el, index) => {
		try {
		if (index === 153) {
			const question = "Which connector is used with twisted-pair cabling in an Ethernet LAN?"
			const answers = ["LC conector", "SC conector", "BNC", "RJ 11", "RJ 45"]
			const correct = ["RJ 45"]
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
	} catch (err) {
		const question = el.querySelector('.wpProQuiz_question_text').innerText;
			const answers = Array.from(el.querySelectorAll('ul > li')).map(e => e?.innerText);
			const correct = Array.from(el.querySelectorAll('.wpProQuiz_answerCorrect')).map(el => el?.innerText)
			const img = el.querySelector('img')?.src;
			return { question, answers, correct, img: img ?? null, type }
	}

	})
	console.log(questions)

}


