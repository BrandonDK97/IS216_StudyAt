//Redirection
if (sessionStorage.getItem('email') === null) {
    window.location.href = "../index.html"
}

//Interaction
interact('.draggable')
    .draggable({
        // enable inertial throwing
        inertia: true,
        // keep the element within the area of it's parent
        listeners: {
            // call this function on every dragmove event
            move: dragMoveListener,

            // call this function on every dragend event
            end(event) {

            }
        }
    })
    .on('doubletap', function(event) {
        event.currentTarget.classList.toggle('switch-bg')
        event.preventDefault()
    })

interact('.dragComponent')
    .draggable({
        // enable inertial throwing
        inertia: true,
        // keep the element within the area of it's parent
        listeners: {
            // call this function on every dragmove event
            move: dragMoveListener,

            // call this function on every dragend event
            end(event) {

            }
        }
    })

function dragMoveListener(event) {
    var target = event.target
        // keep the dragged position in the data-x/data-y attributes
    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

    // translate the element
    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

    // update the posiion attributes
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
}
//End Interaction

//S3 Video Fetch
var videoBucketName = 'studyat';

AWS.config.region = 'ap-southeast-1'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'ap-southeast-1:c3ce4e8c-9c4e-4276-b827-67c3861b4835',
});


var s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    params: { Bucket: videoBucketName }
});

function videoChange(val) {
    if (val == "default") {
        document.getElementById('room').style.backgroundSize = "auto";
        document.getElementById('videos').style.display = "none";
    } else {
        document.getElementById('room').style.backgroundSize = "0 0";
        document.getElementById('videos').style.display = "initial";
        s3.getObject({
                Bucket: "studyat",
                Key: val
            },
            (err, data) => {
                function Uint8ToString(u8a) {
                    var CHUNK_SZ = 0x8000;
                    var c = [];
                    for (var i = 0; i < u8a.length; i += CHUNK_SZ) {
                        c.push(String.fromCharCode.apply(null, u8a.subarray(i, i + CHUNK_SZ)));
                    }
                    return c.join("");
                }

                var b64encoded = btoa(Uint8ToString(data.Body));
                document.getElementById('rainVid').src = "data:video/mp4;base64," + b64encoded;
            }
        );

    }
}
//End S3 Video Fetch


//Session Management
sessionArr = []
newSession = {}

if (sessionStorage.getItem('firstTime') == 'true') {
    UIkit.modal('#tut1').show()
}

function startSession() {

    TimeMe.initialize({
        currentPageName: "my-room-page", // current page
    });

    sessionArr = JSON.parse(sessionStorage.getItem('sessions'));

    var today = new Date();
    var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear()


    newSession = {
        'goalReached': false,
        'totalTime': 0,
        'date': date,
        'taskCompleted': 0
    }

    var found = false;
    for (var i = 0; i < sessionArr.length; i++) {
        if (sessionArr[i].date == date) {
            found = true
            var e = sessionArr[i]
            newSession.goalReached = e.goalReached
            newSession.totalTime = e.totalTime
            newSession.date = e.date
            newSession.taskCompleted = e.taskCompleted
            sessionArr.splice(i, 1)
            break;
        }
    }

    if (!found) {
        sessionStorage.setItem('mySessionTasks', 0)
        sessionStorage.setItem('goalReached', 'false');
    }

}

window.onbeforeunload = function(event) {
    newSession.totalTime += TimeMe.getTimeOnCurrentPageInSeconds();

    if (sessionStorage.getItem('goalReached') == "true") {
        newSession.goalReached = true
    }

    newSession.taskCompleted += parseInt(sessionStorage.getItem('mySessionTasks'));

    sessionArr.push(newSession);
    var totalTimeOfAllSessions = 0
    sessionArr.forEach(sess => {
        totalTimeOfAllSessions += Number(sess.totalTime)
    });
    sessionStorage.setItem('sessions', JSON.stringify(sessionArr));
    sessionStorage.setItem('totalTime', totalTimeOfAllSessions)
}

// Every 5 seconds, this event will refresh
var logInterval = false
const interval = setInterval(function() {
        logInterval = true
    }, 5000)
    // When a user clicks and the event is ready, it will update firestore.
document.addEventListener('click', function() {
        if (logInterval == true) {
            document.dispatchEvent(new Event('updateRequest'));
            logInterval = false
        }
    })
    //End Session Management

//Custom BG
var choice = sessionStorage.getItem('favColor');
const pattern = trianglify({
    width: window.innerWidth,
    height: window.innerHeight,
    xColors: ['#000000', choice, '#FFFFFF']
}).toCanvas()

var dataUrl = pattern.toDataURL('image/png', (err, png) => {})
document.getElementById('room').style.backgroundImage = "url('" + dataUrl + "')";
//End Custom BG

//Start Pomodoro Animated Text
var typed_strings = document.querySelector('.text-slider-items').innerText;
var typed = new Typed(".text-slider", {
    strings: typed_strings.split(", "),
    typeSpeed: 50,
    loop: true,
    backDelay: 900,
    backSpeed: 30
});

function animate(quote, goal) {
    if (typed && typed.constructor === Typed) {
        typed.destroy();
    }

    if (quote == 'ongoing') {
        typed_strings = "Don't give up, You can do it!, Stay focused"
    } else if (quote == "break") {
        typed_strings = "Take a break, You deserve it, Grab a snack";
    }
    typed = new Typed(".text-slider", {
        strings: typed_strings.split(", "),
        typeSpeed: 50,
        loop: true,
        backDelay: 900,
        backSpeed: 30
    });
}
//End Pomodoro Animated Text


//START Light|Dark Mode
function changeMode() {
    //Declare Variables
    var innerIcon = document.getElementById('innerIcon');
    var todo = document.getElementById('todoList');
    var clock = document.getElementById('clock');
    var background = document.getElementById('background');
    var bar = document.getElementById('featureBar');
    var setting = document.getElementById('setting');
    var goalSetter = document.getElementById('goalSetter');
    var icon = document.getElementById('icon');
    var pomodoro = document.getElementById('pomodoro-wrapper');
    var spotify = document.getElementById('spotifyembed');
    var change = document.getElementById('change');

    if (innerIcon.classList.contains('fa-sun')) {
        todo.classList.add('uk-light', 'uk-background-secondary')
        clock.classList.add('uk-light', 'uk-background-secondary')
        background.classList.add('uk-light', 'uk-background-secondary')
        bar.classList.add('uk-light', 'uk-background-secondary')
        setting.classList.add('uk-light', 'uk-background-secondary')
        goalSetter.classList.add('uk-light', 'uk-background-secondary')
        icon.classList.add('uk-light', 'uk-background-secondary')
        pomodoro.classList.add('uk-light', 'uk-background-secondary')
        spotify.classList.add('uk-light', 'uk-background-secondary')
        change.classList.add('uk-light', 'uk-background-secondary')
        innerIcon.classList.remove('fa-sun');
        innerIcon.classList.add('fa-moon');
    } else {
        todo.classList.remove('uk-light', 'uk-background-secondary')
        clock.classList.remove('uk-light', 'uk-background-secondary')
        background.classList.remove('uk-light', 'uk-background-secondary')
        bar.classList.remove('uk-light', 'uk-background-secondary')
        setting.classList.remove('uk-light', 'uk-background-secondary')
        goalSetter.classList.remove('uk-light', 'uk-background-secondary')
        icon.classList.remove('uk-light', 'uk-background-secondary')
        pomodoro.classList.remove('uk-light', 'uk-background-secondary')
        spotify.classList.remove('uk-light', 'uk-background-secondary')
        change.classList.remove('uk-light', 'uk-background-secondary')
        innerIcon.classList.remove('fa-moon');
        innerIcon.classList.add('fa-sun');
    }
}
//END Light|Dark Mode


//Additional Resize Listeners
window.addEventListener('resize', resize);
window.addEventListener('fullscreenchange', resize);

function resize() {
    var dataUrl = pattern.toDataURL('image/png', (err, png) => {})
    document.getElementById('room').style.backgroundImage = "url('" + dataUrl + "')";
}