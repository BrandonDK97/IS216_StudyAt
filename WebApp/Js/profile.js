if(sessionStorage.getItem('email') === null){
    window.location.href = "../index.html"  
}

newSession = sessionStorage
// We apply changes to notes, profile picture, name and music preference
var app = Vue.createApp({
    data() {
        return {
            background: "",
            favColor: "",
            email: "",
            name: "",
            numGoals: 0,
            numTask: 0,
            totalTime: "",
            musicPref: "",
            notes: [],   // FORMAT : ARRAY OF OBJECTS = [ {title: x, subject: y, content: z}, {....}, ]
            sessions: [],
            titles:[],
            image : "",
            icons: ["https://cdn-icons-png.flaticon.com/512/3135/3135715.png","https://emoji.slack-edge.com/T02A01TADLL/beer_parrot/92d334369580ffb6.gif","https://emoji.slack-edge.com/T02A01TADLL/song_flip/5bda734ecd82a440.gif","https://emoji.slack-edge.com/T02A01TADLL/kim_shake-angry/df16fbabf1838372.gif","https://emoji.slack-edge.com/T02A01TADLL/salmonrou/1830a16da063d0dd.jpg","https://emoji.slack-edge.com/T02A01TADLL/cute-caleb/ae840c6c0149c3e6.jpg","https://emoji.slack-edge.com/T02A01TADLL/calebee/d78791623f7b9dd1.png","https://emoji.slack-edge.com/T02A01TADLL/screenshot-2021-08-25-120218/02eae34663bc57f8.png"],
        }
    },

    created: function() {
        this.background = sessionStorage.getItem("background");
        this.name = sessionStorage.getItem("name");
        this.email = sessionStorage.getItem("email");
        this.favColor = sessionStorage.getItem("favColor");
        this.notes = JSON.parse(sessionStorage.getItem("notes"));
        this.totalTime = sessionStorage.getItem("totalTime")
        this.numGoals = sessionStorage.getItem("numGoals")
        this.titles = this.notes.map(prop => prop.title.toLowerCase())
        this.musicPref = sessionStorage.getItem("musicChoice")
        this.image = sessionStorage.getItem("image")
    },

    computed: {
        convertToHours(){
            let hours = (this.totalTime/60/60).toFixed(2)
            return hours
        },
    },

    methods:{
        addNewNote() {
            /*
            Create new note tab with data.subj = noteTitle
            Create div with id = noteTitle - this holds the note content textarea (2 components total)
            */
            let noteTitle = prompt("What do you want to name your new note?")
            // Set up duplicate prevention later
            if (noteTitle) {
                if(!this.titles.includes(noteTitle.toLowerCase())){
                    var Obj = {
                        "subject": "IS216",
                        "title" : `${noteTitle.toLowerCase()}`,
                        "content" : "Your New Note!"
                    }
                    this.notes.push(Obj)
                    this.titles.push(noteTitle)
                    newSession.notes = JSON.stringify(this.notes)
                    console.log(newSession.notes)
                    document.dispatchEvent(new Event('updateRequest'));
                }
                else{
                    UIkit.notification({
                        message: `<span uk-icon=\'icon: warning\'></span> This note already exists!`,
                        status: "danger",
                        pos: "top-center",
                        timeout:1500
                    })
                }
            }else{
                UIkit.notification({
                message: `Cancelled!`,
                status: "danger",
                pos: "top-center",
                timeout:1500
                })
            }
        },

        goBack() {
            const back = document.getElementById("backBtn")
            back.classList.remove("backBtn")
            back.classList.add("backBtnHide")
        
            const subject = document.querySelector(".activeSubject")
            if(subject != undefined){
                subject.classList.remove("activeSubject")
            }
            showAllSubjects()
        },

        deletenote(){
            UIkit.modal.prompt('Which note do you want to delete?', '').then(function (name) {
                console.log('Prompted:', name)
                if(name){
                    console.log("not null")
                    vm.delete2(name)
                }
                else{
                    UIkit.notification({
                        message: `Cancelled!`,
                        status: "primary",
                        pos: "top-center",
                        timeout:1500
                    })
                }
            });
        },

        delete2(name){
            console.log("check:" + name)
            let name2 = name.toLowerCase()
            console.log(name)
            if(this.titles.includes(name2)){
                console.log("exists")
                this.notes = this.notes.filter(note => note.title != name2)
                this.titles = this.titles.filter(title => title != name2)
                console.log("deleted")
                newSession.notes = JSON.stringify(this.notes)
                console.log(newSession.notes)
                document.dispatchEvent(new Event('updateRequest'));
                UIkit.notification({
                    message: `Note deleted!`,
                    status: "success",
                    pos: "top-center",
                    timeout:1500
                })
            }
            else{
                UIkit.notification({
                    message: `This note does not exist!`,
                    status: "warning",
                    pos: "top-center",
                    timeout:1500
                })
            }
        },

        changeImg(img){
            this.image = img
            console.log("changed!")
            UIkit.notification({
                message: `Changed Profile Picture!`,
                status: "success",
                pos: "top-center",
                timeout:1500
            })
            newSession.image = this.image
            document.dispatchEvent(new Event('updateRequest'));

        },

        changeName(){
            newname = document.getElementById("namechange").value
            console.log(newname)
            if(!newname){
                UIkit.notification({
                    message: `Field is blank!`,
                    status: "warning",
                    pos: "top-center",
                    timeout:1500
                })
            }
            else{
                this.name = newname
                UIkit.notification({
                    message: `Name successfully changed!`,
                    status: "success",
                    pos: "top-center",
                    timeout:1500
                })
                newSession.name = this.name
                document.dispatchEvent(new Event('updateRequest'));
            }
        },

        changeMusicPref(music){
            this.musicPref = music
            newSession.musicChoice = this.musicPref
            UIkit.notification({
                message: `Music preference successfully changed!`,
                status: "success",
                pos: "top-center",
                timeout:1500
            })
            document.dispatchEvent(new Event('updateRequest'));
        },

        changeColour(){
            newColour = document.getElementById("colourpicker").value
            console.log(newColour)
            this.favColor = newColour
            newSession.favColor = this.favColor
            UIkit.notification({
                message: `Colour successfully changed!`,
                status: "success",
                pos: "top-center",
                timeout:1500
            })
            document.dispatchEvent(new Event('updateRequest'));
        },

        updateContentSession(title){
            let target = document.getElementById(title)
            let targetNote = this.notes.find(o => o.title === title);
            
            targetNote.content = target.children[0].value
            newSession.notes = JSON.stringify(this.notes)

            document.dispatchEvent(new Event('updateRequest'));
        },
    },
})

app.component("note-component",{
    props: ["title","content"],

    template:
    `
        <div :id= "title" class = "subjectContent">
            <textarea class="uk-textarea noteContent">{{content}}</textarea>
        </div>
    `
})

app.component("button-component",{
    props:["data_subj"],

    template:
    `
    <button style="margin-right:0.5em" class="uk-button uk-button-default uk-background-default" onclick=showSubject(this.dataset.subj) :data-subj=data_subj>{{data_subj}}</button>
    `

})

app.component("image-change",{
    props:["image"],

    template:
    `
    <button @click="$emit('change')" class="uk-button uk-background-default"><img :src=image style="width:5em; height:5em;"></button>
    `

})
const vm = app.mount('#app')

// tab functions - cant vue emit hell
function hideAllSubjects(noteTitle) {
    const subjects = document.querySelector(".subjects")
    for (i = 1; i < subjects.children.length; i++) {
    let subj = subjects.children[i]
    if (subj.dataset.subj != noteTitle) {
        subj.classList.add("hideSubject")
        }
    }
}

function showSubject(noteTitle) {
    hideAllSubjects(noteTitle)

    const back = document.getElementById("backBtn")
    back.classList.add("backBtn")
    back.classList.remove("backBtnHide")

    const target = document.getElementById(noteTitle)  // targets the content div
    target.classList.add("activeSubject")

    let txtarea = target.getElementsByClassName("noteContent").item(0)
    txtarea.classList.add("activeNote")
}

function showAllSubjects() {
    const subjects = document.querySelector(".subjects")
    for (i = 1; i < subjects.children.length; i++) {
        let subj = subjects.children[i]
        subj.classList.remove("hideSubject")
    }
}