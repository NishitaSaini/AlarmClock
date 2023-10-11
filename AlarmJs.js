const currentTime = document.querySelector("#timer-display");
const selectMenu = document.querySelectorAll("select");
const setAlarm = document.getElementById('setBtn');
let ring = new Audio("Alarm Clock.mp3");
let alarmCount = 0;
let alarmListArr = [];
let alrmTime;
let alarmTime;

//showing current time(Digital clock)
setInterval(() =>{
	//getting hours, mins, secs
	let date = new Date(),
		h = date.getHours(),
		m = date.getMinutes(),
		s = date.getSeconds(),
		ampm = "AM";

		if(h >= 12){
			h = h-12;
			ampm = "PM";
		}
		//if hour value is 0, set this values to 12
		h = h == 0 ? h = 12 : h;
		//adding 0 before hr, min and sec if their value is less than 10
		h = h < 10 ? "0" + h : h;
		m = m < 10 ? "0" + m : m;
		s = s < 10 ? "0" + s : s;

		// currentTime.innerText = h + ":" + m + ":" +s + " " + ampm;
		currentTime.innerText = `${h}:${m}:${s} ${ampm}`;
		if(alrmTime == `${h}:${m} ${ampm}`){
			console.log("Alarm is ringing"); 
			// alert("Alarm is ringing");
            ring.load();
            ring.play();
			document.querySelector("#stopAlarm").style.visibility = "visible";
		}
},1000);

//hour, minute and AM/PM options for alarm
for(let i=12; i>0; i--){
	i = i<10 ? "0" + i : i;
	let option = `<option value="${i}"> ${i} </option>`;
	selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}
for(let i=59; i>=0; i--){
	i = i<10 ? "0" + i : i;
	let option = `<option value="${i}">${i}</option>`;
	// console.log(option);
	selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}
for(let i=2; i>0;i--){
    let ampm = i== 1? "AM":"PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

//working on set alarm button
function Alarm(){
	document.querySelector("#alarms").innerText = "Alarms";
	let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
	// console.log(time);
	alrmTime = time;
	if(time.includes("hour") || time.includes("minute") || time.includes("ampm")){
		alert("Please select a valid time");
	}
	
	else{
		alarmCount++;
		document.querySelector("#alarmList").innerHTML += 
        `<div class="alarmLog" id="alarm${alarmCount}">
        <span id="span${alarmCount}">${time}</span>
        <button class="btn-delete" id="${alarmCount}" onClick="deleteAlarm(this.id)">Delete</button>
        </div>`;

        alarmTime = `${selectMenu[0].value}:${selectMenu[1].value}:00 ${selectMenu[2].value}`;
        alarmListArr.push(alarmTime);
        console.log(document.querySelector("btn-delete").value);
    }
}
    setAlarm.addEventListener('click', Alarm);



//delete alarm
function deleteAlarm(click_id){
	var element = document.getElementById("alarm"+click_id);
    var deleteIndex = alarmListArr.indexOf(document.querySelector("#span"+click_id).innerText);
    alarmListArr.splice(deleteIndex,1);
    element.remove();
}    

function stopAlarm(){
    ring.pause();
    document.querySelector("#stopAlarm").style.visibility= "hidden";
}



