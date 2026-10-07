function todolist() {
    var currenttask = [];
    if (localStorage.getItem("currenttask")) {
        currenttask = JSON.parse(localStorage.getItem("currenttask"));
    }
    else {
        console.log("Empty");
    }





    function openfeature() {
        let allelem = document.querySelectorAll(".elem");
        let allFull = document.querySelectorAll(".fullelem");
        let back = document.querySelectorAll(".back");


        allelem.forEach((e) => {
            e.addEventListener("click", function () {
                allFull[e.id].style.display = "block";
            })
        })

        back.forEach((e) => {
            e.addEventListener("click", function () {
                allFull[e.id].style.display = "none";
            })
        })
    }
    openfeature()
    let input = document.querySelector(".addtask form input#text-input");
    let textinput = document.querySelector(".addtask form textarea");
    let current = document.querySelector(".todo-container .alltask")
    let taskcheck = document.querySelector(".mark #checkbox")
    let form = document.querySelector(".todo-container .addtask form");
    function render() {
        localStorage.setItem("currenttask", JSON.stringify(currenttask))
        let sum = "";
        currenttask.forEach(function (e, index) {
            sum += `           <div class="task" data-index="${index}">

                <div>
                    <h2>
                        ${e.task}
                        <span class="${e.imp}">Imp</span>
                    </h2>

                    <p class="task-details">${e.name}</p>
                </div>

                <button class="complete"  id=${index}>Mark as Completed</button>

            </div>`
        })

        current.innerHTML = sum


        let conf = document.querySelectorAll(".task .complete");
        conf.forEach(function (e) {
            e.addEventListener("click", function () {
                currenttask.splice(e.id, 1);
                render();
            })
        })




        let tasks = document.querySelectorAll(".task");

        tasks.forEach(function (task) {

            task.addEventListener("click", function (e) {

                if (e.target.tagName === "BUTTON") return;

                task.classList.toggle("show");

            });

        });
    }
    render();

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        currenttask.push(
            {
                task: input.value,
                name: textinput.value,
                imp: taskcheck.checked
            }
        )

        input.value = "";
        textinput.value = "";
        taskcheck.checked = "";
        render();
    })

}
todolist()


function dailygoals() {
    let daydata = JSON.parse(localStorage.getItem("daydata")) || {};

    let day = document.querySelector(".day-planner");
    let hours = Array.from({ length: 18 }, function (e, idx) { return `${6 + idx}:00-${7 + idx}:00` });
    let whole = "";
    hours.forEach(function (e, idx) {
        let savedata = daydata[idx] || "";
        whole += `<div class="day-planner-time">
                    <p>${e}</p>
                    <input  id=${idx} type="text" placeholder="..." value=${savedata}>
                </div>`

    })

    day.innerHTML = whole;
    let inp = document.querySelectorAll(".day-planner input");
    inp.forEach(function (e) {
        e.addEventListener("input", function () {
            daydata[e.id] = e.value;
            localStorage.setItem("daydata", JSON.stringify(daydata))
        })
    })
}
dailygoals()
// localStorage.clear()

function motivation() {
    let qoot = document.querySelector(".moti-quote h2");
    let auuth = document.querySelector(".moti-auth h2");

    async function fetchquote() {
        let abc = await fetch("https://dummyjson.com/quotes/random");
        let de = await abc.json();

        qoot.innerHTML = de.quote;
        auuth.innerHTML = de.author;
    }

    fetchquote();
}
motivation()
function pomo() 
{
    
let iswork = true;
let sess = document.querySelector(".time.fullelem .work");
let start = document.querySelector(".pomodoro-timer .start");
let pause = document.querySelector(".pomodoro-timer .pause");
let reset = document.querySelector(".pomodoro-timer .reset");
let timeInterval = null;
let totalmin = 30 * 60;
let timer = document.querySelector(".pomodoro-timer h1");
function update() {
    let mins = Math.floor(totalmin / 60);
    let sec = totalmin % 60;
    timer.innerHTML = `${String(mins).padStart("2", "0")}:${String(sec).padStart("2", "0")}`;
}


function starttimer() {

    clearInterval(timeInterval);

    timeInterval = setInterval(() => {
        if (totalmin > 0) {
            totalmin--;
            update();
        }
        else {

            clearInterval(timeInterval);

            if (iswork) {
                iswork = false;
                totalmin = 5 * 60;
                sess.innerHTML="Take A Break";
                sess.style.backgroundColor="#4274D9";
            }
            else {
                iswork = true;
                totalmin = 30 * 60;
                sess.innerHTML="Work-Time";
                sess.style.backgroundColor=" #76C457";
            }

            update();
        }

    }, 1000);
}
function pausetimer() {
    clearInterval(timeInterval)
}
function resettimer() {
    totalmin = 30 * 60;
    clearInterval(timeInterval)
    update();
}


start.addEventListener("click", starttimer);
pause.addEventListener("click", pausetimer);
reset.addEventListener("click", resettimer);


}
pomo()
let apikey = "4d89df3e5e674f4dba7143434260510";
let city = "Dehradun";
 
let data = null;
async function weathercallapi()
{
    let response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apikey}&q=${city}`)
  data = await response.json();
 
  timeday()

}


let dh1 =document.querySelector("header .header1 h1");
let temph2 = document.querySelector("header .header1 #temp");
let ours = document.querySelector("header .header2 h3");
let humi = document.querySelector("header .header2 #humi");
let wind= document.querySelector("header .header2 h1");
let kk = document.querySelector("header .header1 h4");


let days = [
    
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"

];

function timeday()
{
    let datess = new Date();
    let hours = datess.getHours();
let minutes = datess.getMinutes();
   let currentDay = days[datess.getDay()];
   dh1.innerHTML=currentDay;
   temph2.innerHTML=data.current.temp_c+"°C";
  if(hours>12)
    {
         ours.innerHTML = (hours%12)+":"+ String(minutes).padStart(2, "0")+"PM" 
    }
    else { ours.innerHTML = (hours%12)+":"+ String(minutes).padStart(2, "0")+"AM" };

    humi.innerHTML= "Humidity : " + data.current.humidity + "%"
    wind.innerHTML= "Wind : " + data.current.wind_kph + " km/h";
    kk.innerHTML= data.current.condition.text;
    console.log(data.current.condition.text);
} 

weathercallapi()
setInterval(timeday, 1000);
