function getDate() {
const date = new Date(2025, 10, 1); 


const startHour = 12;
const endHour = 20;


const randomTime =
  (startHour * 60 * 60 * 1000) +
  Math.random() * ((endHour - startHour) * 60 * 60 * 1000);


date.setHours(0, 0, 0, 0);
date.setTime(date.getTime() + randomTime);


const time = date.toLocaleTimeString("en-US", {
  hour: "numeric",
  minute: "2-digit",
  second: "2-digit",
  hour12: true
});

const day = date.toLocaleDateString("en-US", {
  month: "2-digit",
  day: "2-digit",
  year: "numeric"
});

const formatted = `${time} ${day}`;
	return formatted;

}

function getTime() {
const minSeconds = 30 * 60;
const maxSeconds = 50 * 60;
const randomSeconds = Math.floor(Math.random() * (maxSeconds - minSeconds + 1)) + minSeconds;

const minutes = Math.floor(randomSeconds / 60);
const seconds = randomSeconds % 60;

const formatted = `${minutes} mins ${seconds.toString().padStart(2, '0')} secs`;
	return formatted;
}



function main(lab = LAB, time, date) {
	try {
let el = Array.from(document.querySelectorAll('.li-cell')).filter(el=>el?.innerText.includes(lab));
let arr = [VM_STATE, COMPLETION_STATUS, time, CORRECT, date]
let divs = Array.from(el[0].parentElement.querySelectorAll('div')).splice(1, 5)
	for (let i = 0; i < divs.length; i ++) {
	divs[i].innerHTML = `<span>${arr[i]}</span>`
}
	} catch (err) {
		return;
	}
}

function get100() {
	try {
document.querySelector('.percent').innerText = "100%" ;
	document.querySelectorAll('.labdetail-score')[1].innerText = "100%"
	} catch (err) {
		return
	}
}

function init() {
	const LABS = Array.from(document.querySelectorAll('.lab-name')).map(el=>el.innerText);
	const times = LABS.map(el=>getTime())
	const dates = LABS.map(el=>getDate())
	const interval = setInterval(()=> {
		for (let i = 0; i < LABS.length; i++) {
			main(LABS[i], times[i], dates[i])
		}
		get100();
	}, 1000)

	return () =>  clearInterval(timer)

}




