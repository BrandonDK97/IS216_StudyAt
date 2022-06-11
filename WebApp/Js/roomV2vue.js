

const app = Vue.createApp({

    data() {
        return {
            favColor: "",
            firstTime: '',
            goal: "",
            notes: [],
            showNotes: []
        }
    },
    methods: {
        showRoom() {
            word = document.getElementById('lWords');
            UIkit.util.ready(function () {

                var bar = document.getElementById('js_progressbar');
                var animate = setInterval(function () {

                    bar.value += 10;

                    if (bar.value == 30) {
                        word.innerText = "Grabbing some donuts..";
                    }
                    if (bar.value == 50) {
                        word.innerText = "Reading some motivational quotes..";
                    }
                    if (bar.value >= bar.max) {
                        clearInterval(animate);
                        loader.style.display = "none";
                        room.style.display = "flex";
                    }

                }, 1000);
            });
        },
        applyCSS() {
            let nodeId = "pomodoro-wrapper-style";
            let style = document.getElementById(nodeId);
            if (!style) {
                style = document.createElement("style");
                style.id = nodeId;
                style.type = "text/css";
                var el = document.getElementById('app')
                el.appendChild(style);
            }
            let cssRule = `#pomodoro-wrapper:before { background-color: ${this.favColor}}`;
            style.innerHTML = cssRule;
        },
        split() {
            if (this.firstTime === 'true') {
                sessionStorage.setItem('firstTime', 'true');
            } else {
                this.enterRoom()
            }
        },
        enterRoom() {
            this.firstTime = false
            sessionStorage.setItem('firstTime', 'false');
            this.showRoom()
        },
        onEnter() {
            document.getElementById('goalSetter').style.display = 'none';
        },

        pushNote(note) {
            if (!this.showNotes.includes(note)) {
                var idx = this.notes.indexOf(note);
                this.notes.splice(idx, 1);
                this.showNotes.push(note)
            }
        },

        removeNote(note) {
            if (!this.notes.includes(note)) {
                var idx = this.showNotes.indexOf(note);
                this.showNotes.splice(idx, 1);
                this.notes.push(note)
            }
        }
    },
    mounted: function () {
        if (sessionStorage.getItem('email') === null) {
            window.location.replace = "../Views/login.html"
        }
        this.firstTime = sessionStorage.getItem('firstTime');
        this.favColor = sessionStorage.getItem('favColor');
        this.notes = JSON.parse(sessionStorage.getItem('notes'));
        this.applyCSS()
        this.split()
    }
})

app.component('clock-component', {
    data() {
        return {
            hr: '',
            _min: 0,
            sec: 0,
            ampm: '',
            hms: '',
            currentDate: ''
        }
    },
    methods: {
        updateTime() {
            var dateInfo = new Date();

            /* time */
            this.hr,
                this._min = (dateInfo.getMinutes() < 10) ? "0" + dateInfo.getMinutes() : dateInfo.getMinutes(),
                this.sec = (dateInfo.getSeconds() < 10) ? "0" + dateInfo.getSeconds() : dateInfo.getSeconds(),
                this.ampm = (dateInfo.getHours() >= 12) ? "PM" : "AM";

            // replace 0 with 12 at midnight, subtract 12 from hour if 13–23
            if (dateInfo.getHours() == 0) {
                this.hr = 12;
            } else if (dateInfo.getHours() > 12) {
                this.hr = dateInfo.getHours() - 12;
            } else {
                this.hr = dateInfo.getHours();
            }

            var currentTime = this.hr + ":" + this._min + ":" + this.sec;

            // print time
            this.hms = currentTime;

            /* date */
            var dow = [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
            ],
                month = [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December"
                ],
                day = dateInfo.getDate();

            // store date
            this.currentDate = dow[dateInfo.getDay()] + ", " + month[dateInfo.getMonth()] + " " + day;
        }
    },
    created: function () {
        setInterval(() => {
            this.updateTime();
        }, 1000)
    },
    template: ` <div id='clock'
        class="time uk-animation-fade uk-border-rounded uk-box-shadow-small uk-background-default uk-position-top-right uk-margin-small-right uk-margin-small-top uk-width-1-6 dragComponent">
        <span class='hms'>{{hms}}</span>
        <span class='ampm'>{{ampm}}</span>
        <br>
        <span class='date'>{{currentDate}}</span>
                </div>`
})

app.component('todolist-component', {
    data() {
        return {
            input: "",
            tasks: [],
            placeholder: "New task?",
            clearList: []
        }
    },
    methods: {
        addTask() {
            if (this.tasks.length >= 5) {
                this.tasks = this.tasks
            }
            else {
                if (this.input.length != 0) {
                    this.tasks.push(this.input)
                    this.input = "";
                    this.placeholder = "New task?"
                } else {
                    this.placeholder = "What's a task if it's empty?"
                }
            }
        },
        clearTask(task) {
            idx = this.tasks.indexOf(task)
            this.clearList.push(idx)
        },
        clearAllTasks() {
            arr = this.clearList;
            arr.sort(function (a, b) { return b - a });
            for (idx of arr) {
                this.tasks.splice(idx, 1);
            }

            curNum = parseInt(sessionStorage.getItem('numTasks'));
            sessionStorage.setItem('numTasks', curNum + this.clearList.length);
            if (sessionStorage.getItem('mySessionTasks') == null) {
                sessionStorage.setItem('mySessionTasks', 0);
            }
            curSessionNum = parseInt(sessionStorage.getItem('mySessionTasks'));
            sessionStorage.setItem('mySessionTasks', curSessionNum + this.clearList.length);
            this.clearList = [];
        }
    },
    template: `<div id='todoList'
        class='uk-animation-fade uk-border-rounded uk-box-shadow-small uk-background-default uk-position-center-left uk-margin-small-left uk-width-1-4 dragComponent'>
        <i uk-toggle='target: #todoList' class="fas fa-times" style='float:right;margin-right:10px;margin-top:2px;cursor:pointer'></i>
        <form>
            <fieldset class="todo-list">
                <legend class="todo-list__title uk-text-bold uk-text-center uk-h5">My Todo List</legend>
                <label v-for='task in tasks' class="todo-list__label uk-animation fade">
                    <input @click='clearTask(task)'  type='checkbox'>
                    <i class="check"></i>
                    <span>{{task}}</span>
                </label>
            </fieldset>
        </form>
        <span class='uk-text-danger uk-text-default uk-text-bold' v-show='input != "" && tasks.length == 5'>5 tasks at a time, what's the hurry?</span>
        <input class="uk-input" id='taskInput' maxlength="35" v-model='input' type="text" :placeholder='placeholder'>
        <button @click='addTask()' class="uk-button uk-button-default uk-width-1-1">Add Task</button>
        <button @click='clearAllTasks()' class='uk-button uk-button-default uk-width-1-1'>Clear All Task</button>
    </div>`
})


app.component('pomodoro-component', {
    props: ['goal'],
    data() {
        return {
            mm: 5,
            ss: 0,
            timeWrd: "5:00",
            idle: true,
            goalAchieved: false,
            quote1: "Let's get started",
            quote2: "Work hard",
            quote3: "Play harder"
        }
    },
    methods: {
        startTimer() {
            this.idle = false
            if (this.mm != 0) {
                this.quote1 = "Stay focused"
                this.quote2 = "Don't give up"
                this.quote3 = "You can do this!"
                this.mm--
                this.ss = 60
                window.animate('ongoing', this.goal)
                this.startCountDown()
            } else {
                this.quote1 = "Take a break"
                this.quote2 = "You deserve it"
                this.quote3 = "Grab a snack"
                window.animate('break', this.goal)
                this.idle = true
                if (this.goalAchieved == false && this.goal != "") {
                    if (confirm('Did you achieve your goal of ' + this.goal + '?')) {
                        curNum = parseInt(sessionStorage.getItem('numGoals'));
                        sessionStorage.setItem('goalReached', 'true');
                        sessionStorage.setItem('numGoals', curNum + 1);
                        this.goalAchieved = true
                        this.goal = "";
                        document.dispatchEvent(new Event('updateRequest'));
                    }
                } else {
                    // Do nothing!
                }
            }
        },
        startCountDown() {
            if (this.ss != 0) {
                this.ss -= 1
                setTimeout(() => {
                    this.startCountDown()
                }, 1000)
            } else {
                this.startTimer()
            }
        },
        endTimer() {
            this.mm = 0
            this.ss = 0
            this.idle = true
        }
    },
    computed: {
        timeWord() {
            if (this.mm.toString().length == 1) {
                var mm = "0" + this.mm;
                if (this.ss.toString().length == 1) {
                    var ss = "0" + this.ss
                } else {
                    var ss = this.ss
                }
            } else {
                var mm = this.mm;
                if (this.ss.toString().length == 1) {
                    var ss = "0" + this.ss
                } else {
                    var ss = this.ss
                }
            }
            var val = mm + ":" + ss;
            this.timeWrd = val
            return val
        },
        stopBtn() {
            if (this.idle) {
                return true
            } else {
                return false
            }
        }
    },
    template: `<div class="uk-width-1-1 uk-position-center">
        <div class="uk-border-rounded uk-box-shadow-small uk-background-default uk-overlay uk-overlay-default"
            id="pomodoro-wrapper">
            <div class='uk-background-default uk-padding-remove uk-border-rounded'>
                <div class="pomodoro-audio">
                <span class="text-slider-items" style='display: none'> 
                    {{quote2}},
                    {{quote3}},
                    {{quote1}},
                    {{goal}}
                </span>
    
                <strong id='text' class="text-slider" style="color: black !important;"></strong>
                </div>
            </div>

            <div id="timer">
                {{timeWord}}
            </div>
            <div class='uk-button uk-form-select' data-uk-form-select>
                <span></span>
                <select v-if='idle' v-model='mm' name="time" id="time">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
            </div>
            <br>
            <button v-if='idle' @click='startTimer()' class="pomodoro-button" id="pom-start">Start</button>
            <button @click='endTimer()' v-bind:disabled='stopBtn' class="pomodoro-button" id="pom-stop" style="margin-left:5px;">Stop</button>
        </div>
    </div>`
})

app.component('setting-component', {
    template: ` <div id='setting'
                class='uk-animation-fade uk-border-rounded uk-box-shadow-small uk-dark uk-background-default uk-position-bottom-right uk-margin-medium-bottom uk-margin-small-right uk-padding-small'>
                <a href="profile.html"><i class="fas fa-users-cog"></i> <span
                        class="fWord">Profile
                        Settings</span></a>
                </div>`
})

app.component('icon-component', {
    template: `<div id='icon'
                class='uk-animation-fade uk-border-rounded uk-box-shadow-small uk-background-default uk-position-top-left uk-margin-small-top uk-margin-small-left uk-padding-small'>
                <section class="bglinear">
                    <span>STUDYAT.</span>
                </section>
            </div>`
})

app.mount('#app');
