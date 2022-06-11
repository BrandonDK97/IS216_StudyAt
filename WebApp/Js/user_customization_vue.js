// Create a new Vue instance

if(sessionStorage.getItem('email') === null){
    
    window.location.href = "../index.html"  

}

const main = Vue.createApp({

    // Data Properties
    data() {
        return {
            music:'',
            color:'',
            name:'',
            alertReason: '',
            music:  ''

        }
    },

    mounted: function() {
        this.pullSessionData()
        sessionStorage.setItem('eventStatus',false) // Initializise page event checker
    },

    methods: {
        pullSessionData() {
            this.name = sessionStorage.getItem('name') 
            if (sessionStorage.getItem('favColor') == ""){
                this.color = '#ffc891' // Default Color
                document.body.style.backgroundColor = this.color
            } else {
                this.color = sessionStorage.getItem('favColor')
                document.body.style.backgroundColor = this.color
            }
            this.music = sessionStorage.getItem('musicChoice')
        },

        changeColour(){
            this.color = document.querySelector("#userColor").value;
            document.body.style.backgroundColor = document.querySelector("#userColor").value
        },

        changeMusic(value) {
            this.music = value
        },

        pushCustomizedData(){
            // Check that all data fields are set
            if ((this.name != '') && (this.music != '')) {
                // All fields are set
                // Push data to session
                sessionStorage.setItem('name', this.name)
                sessionStorage.setItem('favColor', this.color)
                sessionStorage.setItem('musicChoice', this.music)
                sessionStorage.setItem('eventStatus', true)
            } else {
                // Not all fields are set, show alert!
                this.alertReason = true
            }
        }
    }

})

main.component('music-component', {
    data() {
        return {
            music: 'None',
        }
    },
    
    emits: ['musicname'],

    methods: {
        chooseMusic(musicName){
            this.music = musicName
        }

    },
    template: `<h4 class="uk-text-default uk-margin-top-small"> What music do you listen to when you study? </h4>
    <div class="uk-margin">
            <div class="uk-grid-column-small uk-grid-row-small uk-text-center" uk-grid>
                <div>
                    <button id="lofi" class="uk-button uk-button-primary uk-border-pill" name="music" value="lofi" v-on:click="$emit('musicname', 'lofi'); chooseMusic('Lo-Fi')"><strong>Lo-Fi</strong></button>                                            </div>
                <div>
                    <button id="rnb" class="uk-button uk-button-primary uk-border-pill" name="music" value="rnb" v-on:click="$emit('musicname', 'rnb'); chooseMusic('R&B')"><strong>R&B</strong></button>                                            </div>
                <div>
                    <button id="jazz" class="uk-button uk-button-primary uk-border-pill " name="music" value="jazz" v-on:click="$emit('musicname', 'jazz'); chooseMusic('Jazz')"><strong>Jazz</strong></button>                                            </div>
            </div>
            <h4 class="uk-text-default uk-margin-top-small"> <i>You have chosen music: <strong>{{music}}</strong></h4></i>
    </div>`
})
// Link this Vue instance with <div id="main">
main.mount("#custom")