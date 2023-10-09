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

//const db = getFirestore(app);
var dbref = ref(firebaseApp);
var pageState = 0; //0 is home, 1 is create table, 2 is join table which for 2 could be a modal asking for the name and password of the bracket and same with 1 yet after implementing those requirements fully wipes out the stuff for the modals ??
//need to have script that after signing in gets rid of the log in and register button and then create a log out button.
var username = " "; //document.querySelector('.namereg');
var password = " ";
var email = " ";
//const logModal = document.querySelector('.logbutton');
var fname = document.querySelector('.fname');
//var google_provider = new db.auth.GoogleAuthProvider();
//db.auth().onAuthStateCanged(user => {});
//const closelogModal = document.querySelector('.closelog');

function openLog() {
    //app.auth().signInWithRedirect(google_provider);
    const modallog = document.querySelector('#modallog');
    const fname = document.querySelector('.fname');
    const pwd = document.querySelector('.pwd');
    fname.value = "";
    pwd.value = "";
    //console.log("fuck");
    modallog.showModal();
}

function closeLog() {
    const modallog = document.querySelector('#modallog');
    let fname = document.querySelector('.fname');
    let pwd = document.querySelector('.pwd');
    let result = [];
    $.ajax({
        method: "GET",
        url: "https://cisc472-proj-default-rtdb.firebaseio.com/Users.json",
        contentType: "application/json",
        data: JSON,
        success: (data) => {
            for (var i in data) {
                result.push([i, data[i]]);
            }
            console.log(result);
        }
    });
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
    document.getElementById("namereg").innerHTML = username;
    document.getElementById("logbutton").style.visibility = "hidden";
    document.getElementById("registerbutton").style.visibility = "hidden";
    document.getElementById("logoutbutton").style.visibility = "visible";
    document.getElementById("createtourney").style.visibility = "visible";
    document.getElementById("jointourney").style.visibility = "visible";
    document.getElementById("introbody").style.visibility = "hidden";
}

function openReg() {
    const modalReg = document.querySelector('#modalReg');
    const fname = document.querySelector('.fname');
    const pwd = document.querySelector('.pwd');
    fname.value = "";
    pwd.value = "";
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
    document.getElementById("namereg").innerHTML = username;
    document.getElementById("logbutton").style.visibility = "visible";
    document.getElementById("registerbutton").style.visibility = "visible";
    document.getElementById("logoutbutton").style.visibility = "hidden";
    document.getElementById("createtourney").style.visibility = "hidden";
    document.getElementById("jointourney").style.visibility = "hidden";
    document.getElementById("introbody").style.visibility = "visible";
}

function canLog() {
    return true;
}

function openCreate() {
    const modalCreate = document.querySelector('#modalCreate');
    const fname = document.querySelector('.fname');
    const pwd = document.querySelector('.pwd');
    fname.value = "";
    pwd.value = "";
    //console.log("fuck");
    modalCreate.showModal();
}