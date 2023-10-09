const firebaseApp = initializeApp({
    apiKey: "AIzaSyAkTNpJ_uiQnkJg4FTcSacf-UbYRfrhtzA",
    authDomain: "cisc472-proj.firebaseapp.com",
    databaseURL: "https://cisc472-proj-default-rtdb.firebaseio.com",
    projectId: "cisc472-proj",
    storageBucket: "cisc472-proj.appspot.com",
    messagingSenderId: "988259633725",
    appId: "1:988259633725:web:85f4540d401263bfd3f854"
});
// Your web app's Firebase configuration
/*
const signInWithGoogleButton = document.getElementById('signInWithGoogle');
const signInWithGoogle = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(googleProvider)
        .then(() => {
            window.location.assign('./profile');
        })
        .catch(error => {
            console.error(error);
        })
}

signInWithGoogleButton.addEventListener('click', signInWithGoogle);*/
//const db = getFirestore(app);
var dbref = ref(firebaseApp);
var pageState = 0; //0 is home, 1 is create table, 2 is join table which for 2 could be a modal asking for the name and password of the bracket and same with 1 yet after implementing those requirements fully wipes out the stuff for the modals ??
//need to have script that after signing in gets rid of the log in and register button and then create a log out button.
var username = " "; //document.querySelector('.namereg');
var password = " ";
var email = " ";
var loginB = false;
//const logModal = document.querySelector('.logbutton');
var fname = document.querySelector('.fname');
//var google_provider = new db.auth.GoogleAuthProvider();
//db.auth().onAuthStateCanged(user => {});
//const closelogModal = document.querySelector('.closelog');

var google_provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().onAuthStateChanged(user => {
    if (!!user) {
        startApp(user);
    } else {
        renderLogin();
    }
});

function openLog() {
    //app.auth().signInWithRedirect(google_provider);
    const modallog = document.querySelector('#modallog');
    const fname = document.querySelector('.fname');
    const pwd = document.querySelector('.pwd');
    fname.value = "";
    pwd.value = "";
    //console.log("fuck");
    document.getElementById("incorrectAlert").style.visibility = "hidden";
    modallog.showModal();
}

function canLog(result) {
    console.log(result[0]);
    for (let k = 0; k < result.length; k++) {
        console.log("reached2");
        console.log(result[k][1].Password + "//" + pwd.value);
        if ((result[k][1].Password == pwd.value) && (result[k][1].Username == fname.value)) {
            return true;

        }
        return false;
    }

}

function closeLog() {
    const modallog = document.querySelector('#modallog');
    let fname = document.querySelector('.fname');
    let pwd = document.querySelector('.pwd');
    let result = [];
    loginB = false;
    $.ajax({
        method: "GET",
        url: "https://cisc472-proj-default-rtdb.firebaseio.com/Users.json",
        contentType: "application/json",
        data: JSON,
        success: (data) => {
            for (var i in data) {
                if (data[i].Username == fname.value && data[i].Password == pwd.value) {
                    username = fname.value;
                    password = pwd.value;
                    modallog.close();
                    document.getElementById("namereg").innerHTML = username;
                    document.getElementById("logbutton").style.visibility = "hidden";
                    document.getElementById("registerbutton").style.visibility = "hidden";
                    document.getElementById("logoutbutton").style.visibility = "visible";
                    document.getElementById("createtourney").style.visibility = "visible";
                    document.getElementById("jointourney").style.visibility = "visible";
                    document.getElementById("introbody").style.visibility = "hidden";
                    document.getElementById("incorrectAlert").style.visibility = "hidden";
                } else {
                    document.getElementById("incorrectAlert").style.visibility = "visible";
                }
            }
        }
    });
    /*console.log("HERE");
    if (loginB == false) {
        document.getElementById("incorrectAlert").style.visibility = "visible";
    } else {
        username = fname.value;
        password = pwd.value;
        modallog.close();
        document.getElementById("namereg").innerHTML = username;
        document.getElementById("logbutton").style.visibility = "hidden";
        document.getElementById("registerbutton").style.visibility = "hidden";
        document.getElementById("logoutbutton").style.visibility = "visible";
        document.getElementById("createtourney").style.visibility = "visible";
        document.getElementById("jointourney").style.visibility = "visible";
        document.getElementById("introbody").style.visibility = "hidden";
        document.getElementById("incorrectAlert").style.visibility = "hidden";
    }*/
    /*
    username = fname.value;
    password = pwd.value;
    //console.log(username + " " + password);
    modallog.close();
    let obj = {
        "Username": username,
        "Password": password,
        "Email": "NA"
    };*/
}

function openReg() {
    const modalReg = document.querySelector('#modalReg');
    const fname = document.querySelector('.fnameR');
    const pwd = document.querySelector('.pwdR');
    const email = document.querySelector('.email');
    fname.value = "";
    pwd.value = "";
    email.value = "";
    //console.log("fuck");
    modalReg.showModal();
}
//https://cisc472-proj-default-rtdb.firebaseio.com/Users
function closeReg() {
    const modalReg = document.querySelector('#modalReg');
    let fname = document.querySelector('.fname');
    let pwd = document.querySelector('.pwd');
    let eml = document.querySelector('.email');
    username = fname.value;
    password = pwd.value;
    email = eml.value;
    let obj = {
        "Username": username,
        "Password": password,
        "Email": email
    };
    //console.log(username + " " + password);
    $.ajax({ method: "POST", url: "https://cisc472-proj-default-rtdb.firebaseio.com/Users.json", contentType: "application/json", data: JSON.stringify(obj), success: (data) => { console.log(data) } })

    modalReg.close();
    document.getElementById("namereg").innerHTML = username;
    document.getElementById("logbutton").style.visibility = "hidden";
    document.getElementById("registerbutton").style.visibility = "hidden";
    document.getElementById("logoutbutton").style.visibility = "visible";
    document.getElementById("createtourney").style.visibility = "visible";
    document.getElementById("jointourney").style.visibility = "visible";
    document.getElementById("introbody").style.visibility = "hidden";
}

function logoutHome() {
    username = "";
    password = "";
    email = "";
    document.getElementById("namereg").innerHTML = username;
    document.getElementById("logbutton").style.visibility = "visible";
    document.getElementById("registerbutton").style.visibility = "visible";
    document.getElementById("logoutbutton").style.visibility = "hidden";
    document.getElementById("createtourney").style.visibility = "hidden";
    document.getElementById("jointourney").style.visibility = "hidden";
    document.getElementById("introbody").style.visibility = "visible";
}



function openCreate() {
    const modalCreate = document.querySelector('#modalCreate');
    const tname = document.querySelector('.tname');
    const gname = document.querySelector('.gname');
    const nump = document.querySelector('.nump');
    const gpwd = document.querySelector('.gpwd');
    tname.value = "";
    gname.value = "";
    nump.value = "";
    gpwd.value = "";
    //console.log("fuck");
    modalCreate.showModal();
}

function closeCreate() {

    modalCreate.close();
}