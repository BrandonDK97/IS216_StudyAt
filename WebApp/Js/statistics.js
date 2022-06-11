if (sessionStorage.getItem('email') === null) {
    window.location.href = "../index.html"
}

var app = Vue.createApp({
    data() {
        return {
            displayed: "daily",
            month: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            day: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            DateToday: "",
            totaltimeToday: 0,
            totaltasksToday: 0,
            goalToday: false,
            totalTaskComplete: 0,
            totalGoalsComplete: 0
        }
    },

    methods: {
        display(view) {
            let current = this.displayed + "Graph"
            let target = view + "Graph"
            document.getElementById(current).style.display = "none"
            document.getElementById(target).style.display = "block"
            this.displayed = view
        }
    },

    computed: {
        // for current date for "today" tab
        dateDay() {
            let today = new Date()
            let date = this.day[today.getDay()] + ", " + this.month[today.getMonth()] + " " + today.getDate();
            return date
        },
    },

    created: function () {
        let today = new Date()
        this.DateToday = today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear()

        for (session of JSON.parse(sessionStorage.sessions)) {
            if (session.date == this.DateToday) {
                let time = 0
                time = (session.totalTime / 60 / 60)
                time = time.toFixed(2)
                this.totaltimeToday = time

                if (!session.taskCompleted == undefined) {
                    this.totaltasksToday += session.taskCompleted
                }
            }
        }
        this.goalToday = session.goalReached
        this.totalTaskComplete = sessionStorage.getItem("numTasks")
        this.totalGoalsComplete = sessionStorage.getItem("numGoals")
    },

})
vm = app.mount("#app")


// Plotly Graphs for Statistics

//Finding average value for Y
function getAverageY(graph) {
    allYValues = graph.y.map(function (num, idx) {
        return num
    });
    if (allYValues.length) {
        sum = allYValues.reduce(function (a, b) {
            return a + b;
        });
        avg = sum / allYValues.length;
    }
    return avg;
}

//Get real data from user sessions
function getDataFromUser() {

    var config = {
        responsive: true,
        modeBarButtonsToRemove: ['toImage', 'pan2d', 'select2d', 'lasso2d', 'zoom2d'],
    }

    sessions = sessionStorage.getItem('sessions');
    sessArr = JSON.parse(sessions);
    var xArr = []
    var yArr = []
    for (let sess of sessArr) {
        date = sess.date;
        dateArr = date.split('-')
        newDate = dateArr[2] + "-" + dateArr[1] + "-" + dateArr[0]
        console.log(newDate)
        xArr.push(newDate)
        yArr.push(parseFloat(((sess.totalTime) / 60) / 60))
    }

    var monthlyData = {
        x: xArr,
        y: yArr,
        mode: 'lines',
        type: 'scatter',
        name: "Monthly Usage Time(hrs)"
    }
    
    let monthdata = [monthlyData]

    var layout = {
        title: 'Usage Time(hrs) this Month',
        font: { size: 18 },
        xaxis: {
            type: 'date',
            fixedrange: true
        },
        yaxis: {
            fixedrange: true
        },
        shapes: [{  // creating average line
            type: 'line',
            xref: 'paper',
            x0: 0,
            y0: getAverageY(monthlyData),
            x1: 1,
            y1: getAverageY(monthlyData),
            line: {
                color: 'green',
                width: 2,
                dash: 'dot',
            },
        }],
    };

    Plotly.newPlot('monthlyGraph', monthdata, layout, config)

    weeklyData = {
        x: ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
        y: yArr,
        type: 'bar',
        name: "Weekly Usage Time(hrs)",
        marker: {
            color: 'rgb(142,124,195)',
            opacity: 0.5,
        }
    }

    let weekData = [weeklyData]

    var layout2 = {
        title: 'Weekly Usage Time(hrs)',
        font: { size: 18 },
        xaxis: {
            tickangle: 0,
            fixedrange: true
        },
        yaxis: {
            fixedrange: true
        },
        shapes: [{ // creating average line
            type: 'line',
            xref: 'paper',
            x0: 0,
            y0: getAverageY(weeklyData),
            x1: 1,
            y1: getAverageY(weeklyData),
            line: {
                color: 'green',
                width: 2,
                dash: 'dot',

            },
        }]
    };

    Plotly.newPlot('weeklyGraph', weekData, layout2, config)
}

// // dummy monthly usage stats
// let dummy1 = {
//     x: ['2021-11-01', '2021-11-02', '2021-11-03', '2021-11-04', '2021-11-05', '2021-11-06', '2021-11-07', '2021-11-08', '2021-11-09', '2021-11-10', '2021-11-11', '2021-11-12', '2021-11-13', '2021-11-14', '2021-11-15', '2021-11-16', '2021-11-17', '2021-11-18', '2021-11-19', '2021-11-20', '2021-11-21', '2021-11-22', '2021-11-23', '2021-11-24', '2021-11-25', '2021-11-26', '2021-11-27', '2021-11-28', '2021-11-29', '2021-11-30', '2021-11-31'],
//     y: [4.3, 8.2, 4.1, 5.6, 3, 0.2, 0.3, 0.4, 4.1, 5, 4.6, 0.2, 8.5, 9.1, 2.7, 2.7, 17, 11.3, 5.5, 6.5, 16.9, 12, 6.1, 6.6, 7.9, 10.8, 14.8, 11, 4.4, 1.3, 1.1],
//     mode: 'lines',
//     type: 'scatter',
//     name: "Monthly Usage Time(hrs)",

// }

// let data = [dummy1]

// var layout = {
//     title: 'Usage Time(hrs) this Month',
//     font: { size: 18 },
//     xaxis: {
//         type: 'date',
//         fixedrange: true
//     },
//     yaxis: {
//         fixedrange: true
//     },
//     shapes: [{  // creating average line
//         type: 'line',
//         xref: 'paper',
//         x0: 0,
//         y0: getAverageY(dummy1),
//         x1: 1,
//         y1: getAverageY(dummy1),
//         line: {
//             color: 'green',
//             width: 2,
//             dash: 'dot',
//         },
//     }],
// };


// Plotly.newPlot('monthlyGraph', data, layout, config)

// // WEEKLY usage stats
// let dummy2 = {
//     x: ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
//     y: [3, 5, 4, 8, 2, 1, 0],
//     type: 'bar',
//     name: "Weekly Usage Time(hrs)",
//     marker: {
//         color: 'rgb(142,124,195)',
//         opacity: 0.5,
//     }
// }

// let data2 = [dummy2]

// var layout2 = {
//     title: 'Weekly Usage Time(hrs)',
//     font: { size: 18 },
//     xaxis: {
//         tickangle: 0,
//         fixedrange: true
//     },
//     yaxis: {
//         fixedrange: true
//     },
//     shapes: [{ // creating average line
//         type: 'line',
//         xref: 'paper',
//         x0: 0,
//         y0: getAverageY(dummy2),
//         x1: 1,
//         y1: getAverageY(dummy2),
//         line: {
//             color: 'green',
//             width: 2,
//             dash: 'dot',

//         },
//     }]
// };

var config = {
    responsive: true,
    modeBarButtonsToRemove: ['toImage', 'pan2d', 'select2d', 'lasso2d', 'zoom2d'],
}

// Plotly.newPlot('weeklyGraph', data2, layout2, config)

// Plotly does not allow resizing of hidden elements as the computed size is not available when hidden, config - responsive:true allows the graph to resize dynamically when window is being resized. However, hidden graphs will NOT be resized via this method.

// Hence we add in an event listener which calls for the graph to automatically resize when being shown
let weekbtn = document.getElementById("weeklyBtn")
weekbtn.addEventListener("click", function () { Plotly.relayout('weeklyGraph', { autosize: true }); })
let monthbtn = document.getElementById("monthlyBtn")
monthbtn.addEventListener("click", function () { Plotly.relayout('monthlyGraph', { autosize: true }); })

// simple javascript to change the elements shown
function change(target) {
    if (target == "lifetasks") {
        document.getElementById(target).style = "display:block;"
        document.getElementById("lifegoals").style = "display:none;"
    }
    else if (target == "lifegoals") {
        document.getElementById(target).style = "display:block;"
        document.getElementById("lifetasks").style = "display:none;"
    }

}