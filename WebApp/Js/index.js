gsap.registerPlugin(ScrollTrigger);

// Setup
const scroller = document.querySelector('.scroller');

const bodyScrollBar = Scrollbar.init(scroller, { damping: 0.1, delegateTo: document, alwaysShowTracks: true });

ScrollTrigger.scrollerProxy(".scroller", {
    scrollTop(value) {
        if (arguments.length) {
            bodyScrollBar.scrollTop = value;
        }
        return bodyScrollBar.scrollTop;
    }
});

bodyScrollBar.addListener(ScrollTrigger.update);

gsap.to(".bglinear", {
    scrollTrigger: {
        trigger: ".page2",
        scrub: "true",
        start: "10% bottom",
        end: "80% 80%"
    },
    backgroundImage: "linear-gradient(270deg,#fff 50%,#000 50%)",
    duration: 10
});
gsap.to(".bglinear", {
    scrollTrigger: {
        trigger: ".page2",
        scrub: "true",
        start: "10% 80%",
        end: "80% 80%"
    },

    //scale: 5.5,
    letterSpacing: "10px",
    duration: 3
});

gsap.to('.bglinear', {
    scrollTrigger: {
        trigger: '.page3',
        scrub: 'true',
        start: '10% bottom',
        end: "80% 80%"
    },
    backgroundImage: "linear-gradient(90deg,#000 100%,#fff 100%)",
    duration: 10
});

gsap.to(".bglinear", {
    scrollTrigger: {
        trigger: ".page3",
        scrub: "true",
        start: "10% 80%",
        end: "80% 80%"
    },
});


// Redirection
function rdSignUp() {
    window.location.href = '../views/signup.html';
}

function rdLogin() {
    window.location.href = '../views/login.html';
}