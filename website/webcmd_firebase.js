var currentPatient;
var todayDate = new Date();
var todayDay = todayDate.getDate();
var todayMonth = todayDate.getMonth() + 1;
var todayYear = todayDate.getFullYear();
var todaymsec = Date.parse(todayMonth + "/" + todayDay + "/" + todayYear);
todaymsec = todaymsec + 3600000;
console.log(todaymsec);


var submitBtn = document.getElementById("submitBtn");

// Add Appointment
var MediBlister = document.getElementById("SelectMediBlisterFormID");
var MediForm = document.getElementById("SelectMediFormFormID");
var MediDauer = document.getElementById("MediDurationFormID");
var MediDosis = document.getElementById("MediDosisFormID");
var MediDosisSelect = document.getElementById("SelectMediDosisFormID");
var MediName = document.getElementById("MediNameFormID");

var patientheader = document.getElementById("patientheader");


function addData(daymsecstring, dosispush, MediFormPush, MediNamePush, MediBlisterPush) {

  /* 0-0-0-1: Nacht */
  if (MediBlisterPush == "0-0-0-1"){
    var dataforpush = {
      Datum: daymsecstring,
      Dosis: dosispush,
      Form: MediFormPush,
      Name: MediNamePush,
      Blister: MediBlisterPush,
      Zeit: "23:00"
    };
    var nachtnewAppointmentKey = firebase.database().ref().child(currentPatient + '/Medis').push().key;
    var nachtupdatedata = {};
    nachtupdatedata[currentPatient + '/Medis/Nacht/' + nachtnewAppointmentKey] = dataforpush;
    addNacht(nachtupdatedata);
  }
  /* 0-0-1-0: Abend */
  else if (MediBlisterPush == "0-0-1-0") {
    var dataforpush = {
      Datum: daymsecstring,
      Dosis: dosispush,
      Form: MediFormPush,
      Name: MediNamePush,
      Blister: MediBlisterPush,
      Zeit: "18:00"
    };
    var abendnewAppointmentKey = firebase.database().ref().child(currentPatient + '/Medis').push().key;
    var abendupdatedata = {};
    abendupdatedata[currentPatient + '/Medis/Abend/' + abendnewAppointmentKey] = dataforpush;
    addAbend(abendupdatedata);
  }
  /* 0-0-1-1: Abend, Nacht */
  else if (MediBlisterPush == "0-0-1-1") {
    /* Abend */
    var dataforpush = {
      Datum: daymsecstring,
      Dosis: dosispush,
      Form: MediFormPush,
      Name: MediNamePush,
      Blister: MediBlisterPush,
      Zeit: "18:00"
    };
    var abendnewAppointmentKey = firebase.database().ref().child(currentPatient + '/Medis').push().key;
    var abendupdatedata = {};
    abendupdatedata[currentPatient + '/Medis/Abend/' + abendnewAppointmentKey] = dataforpush;
    addAbend(abendupdatedata);
    /* Nacht */
    var dataforpush = {
      Datum: daymsecstring,
      Dosis: dosispush,
      Form: MediFormPush,
      Name: MediNamePush,
      Blister: MediBlisterPush,
      Zeit: "23:00"
    };
    var nachtnewAppointmentKey = firebase.database().ref().child(currentPatient + '/Medis').push().key;
    var nachtupdatedata = {};
    nachtupdatedata[currentPatient + '/Medis/Nacht/' + nachtnewAppointmentKey] = dataforpush;
    addNacht(nachtupdatedata);
  }
  /* 0-1-0-0: Mittag */
  else if (MediBlisterPush == "0-1-0-0") {
    var dataforpush = {
      Datum: daymsecstring,
      Dosis: dosispush,
      Form: MediFormPush,
      Name: MediNamePush,
      Blister: MediBlisterPush,
      Zeit: "12:00"
    };
    var mittagnewAppointmentKey = firebase.database().ref().child(currentPatient + '/Medis').push().key;
    var mittagupdatedata = {};
    mittagupdatedata[currentPatient + '/Medis/Mittag/' + mittagnewAppointmentKey] = dataforpush;
    addMittag(mittagupdatedata);
  }
  /* 0-1-0-1: Mittag, Nacht */
  else if (MediBlisterPush == "0-1-0-1") {
    /* Mittag */
    var dataforpush = {
      Datum: daymsecstring,
      Dosis: dosispush,
      Form: MediFormPush,
      Name: MediNamePush,
      Blister: MediBlisterPush,
      Zeit: "12:00"
    };
    var mittagnewAppointmentKey = firebase.database().ref().child(currentPatient + '/Medis').push().key;
    var mittagupdatedata = {};
    mittagupdatedata[currentPatient + '/Medis/Mittag/' + mittagnewAppointmentKey] = dataforpush;
    addMittag(mittagupdatedata);
    /* Nacht */
    var dataforpush = {
      Datum: daymsecstring,
      Dosis: dosispush,
      Form: MediFormPush,
      Name: MediNamePush,
      Blister: MediBlisterPush,
      Zeit: "23:00"
    };
    var nachtnewAppointmentKey = firebase.database().ref().child(currentPatient + '/Medis').push().key;
    var nachtupdatedata = {};
    nachtupdatedata[currentPatient + '/Medis/Nacht/' + nachtnewAppointmentKey] = dataforpush;
    addNacht(nachtupdatedata);
  }
  /* 0-1-1-0: Mittag, Abend */
  else if (MediBlisterPush == "0-1-1-0") {
    /* Mittag */
    var dataforpush = {
      Datum: daymsecstring,
      Dosis: dosispush,
      Form: MediFormPush,
      Name: MediNamePush,
      Blister: MediBlisterPush,
      Zeit: "12:00"
    };
    var mittagnewAppointmentKey = firebase.database().ref().child(currentPatient + '/Medis').push().key;
    var mittagupdatedata = {};
    mittagupdatedata[currentPatient + '/Medis/Mittag/' + mittagnewAppointmentKey] = dataforpush;
    addMittag(mittagupdatedata);
    /* Abend */
    var dataforpush = {
      Datum: daymsecstring,
      Dosis: dosispush,
      Form: MediFormPush,
      Name: MediNamePush,
      Blister: MediBlisterPush,
      Zeit: "18:00"
    };
    var abendnewAppointmentKey = firebase.database().ref().child(currentPatient + '/Medis').push().key;
    var abendupdatedata = {};
    abendupdatedata[currentPatient + '/Medis/Abend/' + abendnewAppointmentKey] = dataforpush;
    addAbend(abendupdatedata);
  }
  /* 0-1-1-1: Mittag, Abend, Nacht */
  else if (MediBlisterPush == "0-1-1-1") {
    /* Mittag */
    var dataforpush = {
      Datum: daymsecstring,
      Dosis: dosispush,
      Form: MediFormPush,
      Name: MediNamePush,
      Blister: MediBlisterPush,
      Zeit: "12:00"
    };
    var mittagnewAppointmentKey = firebase.database().ref().child(currentPatient + '/Medis').push().key;
    var mittagupdatedata = {};
    mittagupdatedata[currentPatient + '/Medis/Mittag/' + mittagnewAppointmentKey] = dataforpush;
    addMittag(mittagupdatedata);
    /* Abend */
    var dataforpush = {
      Datum: daymsecstring,
      Dosis: dosispush,
      Form: MediFormPush,
      Name: MediNamePush,
      Blister: MediBlisterPush,
      Zeit: "18:00"
    };
    var abendnewAppointmentKey = firebase.database().ref().child(currentPatient + '/Medis').push().key;
    var abendupdatedata = {};
    abendupdatedata[currentPatient + '/Medis/Abend/' + abendnewAppointmentKey] = dataforpush;
    addAbend(abendupdatedata);
    /* Nacht */
    var dataforpush = {
      Datum: daymsecstring,
      Dosis: dosispush,
      Form: MediFormPush,
      Name: MediNamePush,
      Blister: MediBlisterPush,
      Zeit: "23:00"
    };
    var nachtnewAppointmentKey = firebase.database().ref().child(currentPatient + '/Medis').push().key;
    var nachtupdatedata = {};
    nachtupdatedata[currentPatient + '/Medis/Nacht/' + nachtnewAppointmentKey] = dataforpush;
    addNacht(nachtupdatedata);
  }
  /* 1-0-0-0: Morgen */
  else if (MediBlisterPush == "1-0-0-0") {
    console.log("1-0-0-0");
    var dataforpush = {
      Datum: daymsecstring,
      Dosis: dosispush,
      Form: MediFormPush,
      Name: MediNamePush,
      Blister: MediBlisterPush,
      Zeit: "08:00"
    };
    var morgennewAppointmentKey = firebase.database().ref().child(currentPatient + '/Medis').push().key;
    var morgenupdatedata = {};
    morgenupdatedata[currentPatient + '/Medis/Morgen/' + morgennewAppointmentKey] = dataforpush;
    addMorgen(morgenupdatedata);
  }
  /* 1-0-0-1: Morgen, Nacht */
  else if (MediBlisterPush == "1-0-0-1") {
    console.log("1-0-0-1");
    /* Morgen */
    var dataforpush = {
      Datum: daymsecstring,
      Dosis: dosispush,
      Form: MediFormPush,
      Name: MediNamePush,
      Blister: MediBlisterPush,
      Zeit: "08:00"
    };
    var morgennewAppointmentKey = firebase.database().ref().child(currentPatient + '/Medis').push().key;
    var morgenupdatedata = {};
    morgenupdatedata[currentPatient + '/Medis/Morgen/' + morgennewAppointmentKey] = dataforpush;
    addMorgen(morgenupdatedata);
    /* Nacht */
    var dataforpush = {
      Datum: daymsecstring,
      Dosis: dosispush,
      Form: MediFormPush,
      Name: MediNamePush,
      Blister: MediBlisterPush,
      Zeit: "23:00"
    };
    var nachtnewAppointmentKey = firebase.database().ref().child(currentPatient + '/Medis').push().key;
    var nachtupdatedata = {};
    nachtupdatedata[currentPatient + '/Medis/Nacht/' + nachtnewAppointmentKey] = dataforpush;
    addNacht(nachtupdatedata);
  }
  /* 1-0-1-0: Morgen, Abend */
  else if (MediBlisterPush == "1-0-1-0") {
    console.log("1-0-1-0");
    /* Morgen */
    var dataforpush = {
      Datum: daymsecstring,
      Dosis: dosispush,
      Form: MediFormPush,
      Name: MediNamePush,
      Blister: MediBlisterPush,
      Zeit: "08:00"
    };
    var morgennewAppointmentKey = firebase.database().ref().child(currentPatient + '/Medis').push().key;
    var morgenupdatedata = {};
    morgenupdatedata[currentPatient + '/Medis/Morgen/' + morgennewAppointmentKey] = dataforpush;
    addMorgen(morgenupdatedata);
    /* Abend */
    var dataforpush = {
      Datum: daymsecstring,
      Dosis: dosispush,
      Form: MediFormPush,
      Name: MediNamePush,
      Blister: MediBlisterPush,
      Zeit: "18:00"
    };
    var abendnewAppointmentKey = firebase.database().ref().child(currentPatient + '/Medis').push().key;
    var abendupdatedata = {};
    abendupdatedata[currentPatient + '/Medis/Abend/' + abendnewAppointmentKey] = dataforpush;
    addAbend(abendupdatedata);
  }
  /* 1-0-1-1: Morgen, Abend, Nacht */
  else if (MediBlisterPush == "1-0-1-1") {
    console.log("1-0-1-1");
    /* Morgen */
    var dataforpush = {
      Datum: daymsecstring,
      Dosis: dosispush,
      Form: MediFormPush,
      Name: MediNamePush,
      Blister: MediBlisterPush,
      Zeit: "08:00"
    };
    var morgennewAppointmentKey = firebase.database().ref().child(currentPatient + '/Medis').push().key;
    var morgenupdatedata = {};
    morgenupdatedata[currentPatient + '/Medis/Morgen/' + morgennewAppointmentKey] = dataforpush;
    addMorgen(morgenupdatedata);
    /* Abend */
    var dataforpush = {
      Datum: daymsecstring,
      Dosis: dosispush,
      Form: MediFormPush,
      Name: MediNamePush,
      Blister: MediBlisterPush,
      Zeit: "18:00"
    };
    var abendnewAppointmentKey = firebase.database().ref().child(currentPatient + '/Medis').push().key;
    var abendupdatedata = {};
    abendupdatedata[currentPatient + '/Medis/Abend/' + abendnewAppointmentKey] = dataforpush;
    addAbend(abendupdatedata);
    /* Nacht */
    var dataforpush = {
      Datum: daymsecstring,
      Dosis: dosispush,
      Form: MediFormPush,
      Name: MediNamePush,
      Blister: MediBlisterPush,
      Zeit: "23:00"
    };
    var nachtnewAppointmentKey = firebase.database().ref().child(currentPatient + '/Medis').push().key;
    var nachtupdatedata = {};
    nachtupdatedata[currentPatient + '/Medis/Nacht/' + nachtnewAppointmentKey] = dataforpush;
    addNacht(nachtupdatedata);
  }
  /* 1-1-0-0: Morgen, Mittag */
  else if (MediBlisterPush == "1-1-0-0") {
    console.log("1-1-0-0");
    /* Morgen */
    var dataforpush = {
      Datum: daymsecstring,
      Dosis: dosispush,
      Form: MediFormPush,
      Name: MediNamePush,
      Blister: MediBlisterPush,
      Zeit: "08:00"
    };
    var morgennewAppointmentKey = firebase.database().ref().child(currentPatient + '/Medis').push().key;
    var morgenupdatedata = {};
    morgenupdatedata[currentPatient + '/Medis/Morgen/' + morgennewAppointmentKey] = dataforpush;
    addMorgen(morgenupdatedata);
    /* Mittag */
    var dataforpush = {
      Datum: daymsecstring,
      Dosis: dosispush,
      Form: MediFormPush,
      Name: MediNamePush,
      Blister: MediBlisterPush,
      Zeit: "12:00"
    };
    var mittagnewAppointmentKey = firebase.database().ref().child(currentPatient + '/Medis').push().key;
    var mittagupdatedata = {};
    mittagupdatedata[currentPatient + '/Medis/Mittag/' + mittagnewAppointmentKey] = dataforpush;
    addMittag(mittagupdatedata);
  }
  /* 1-1-0-1: Morgen, Mittag, Nacht */
  else if (MediBlisterPush == "1-1-0-1") {
    console.log("1-1-0-1");
    /* Morgen */
    var dataforpush = {
      Datum: daymsecstring,
      Dosis: dosispush,
      Form: MediFormPush,
      Name: MediNamePush,
      Blister: MediBlisterPush,
      Zeit: "08:00"
    };
    var morgennewAppointmentKey = firebase.database().ref().child(currentPatient + '/Medis').push().key;
    var morgenupdatedata = {};
    morgenupdatedata[currentPatient + '/Medis/Morgen/' + morgennewAppointmentKey] = dataforpush;
    addMorgen(morgenupdatedata);
    /* Mittag */
    var dataforpush = {
      Datum: daymsecstring,
      Dosis: dosispush,
      Form: MediFormPush,
      Name: MediNamePush,
      Blister: MediBlisterPush,
      Zeit: "12:00"
    };
    var mittagnewAppointmentKey = firebase.database().ref().child(currentPatient + '/Medis').push().key;
    var mittagupdatedata = {};
    mittagupdatedata[currentPatient + '/Medis/Mittag/' + mittagnewAppointmentKey] = dataforpush;
    addMittag(mittagupdatedata);
    /* Nacht */
    var dataforpush = {
      Datum: daymsecstring,
      Dosis: dosispush,
      Form: MediFormPush,
      Name: MediNamePush,
      Blister: MediBlisterPush,
      Zeit: "23:00"
    };
    var nachtnewAppointmentKey = firebase.database().ref().child(currentPatient + '/Medis').push().key;
    var nachtupdatedata = {};
    nachtupdatedata[currentPatient + '/Medis/Nacht/' + nachtnewAppointmentKey] = dataforpush;
    addNacht(nachtupdatedata);
  }
  /* 1-1-1-0: Morgen, Mittag, Abend */
  else if (MediBlisterPush == "1-1-1-0") {
    console.log("1-1-1-0");
    /* Morgen */
    var dataforpush = {
      Datum: daymsecstring,
      Dosis: dosispush,
      Form: MediFormPush,
      Name: MediNamePush,
      Blister: MediBlisterPush,
      Zeit: "08:00"
    };
    var morgennewAppointmentKey = firebase.database().ref().child(currentPatient + '/Medis').push().key;
    var morgenupdatedata = {};
    morgenupdatedata[currentPatient + '/Medis/Morgen/' + morgennewAppointmentKey] = dataforpush;
    addMorgen(morgenupdatedata);
    /* Mittag */
    var dataforpush = {
      Datum: daymsecstring,
      Dosis: dosispush,
      Form: MediFormPush,
      Name: MediNamePush,
      Blister: MediBlisterPush,
      Zeit: "12:00"
    };
    var mittagnewAppointmentKey = firebase.database().ref().child(currentPatient + '/Medis').push().key;
    var mittagupdatedata = {};
    mittagupdatedata[currentPatient + '/Medis/Mittag/' + mittagnewAppointmentKey] = dataforpush;
    addMittag(mittagupdatedata);
    /* Abend */
    var dataforpush = {
      Datum: daymsecstring,
      Dosis: dosispush,
      Form: MediFormPush,
      Name: MediNamePush,
      Blister: MediBlisterPush,
      Zeit: "18:00"
    };
    var abendnewAppointmentKey = firebase.database().ref().child(currentPatient + '/Medis').push().key;
    var abendupdatedata = {};
    abendupdatedata[currentPatient + '/Medis/Abend/' + abendnewAppointmentKey] = dataforpush;
    addAbend(abendupdatedata);
  }
  /* 1-1-1-1: Morgen, Mittag, Abend, Nacht */
  else if (MediBlisterPush == "1-1-1-1") {
    console.log("1-1-1-1");
    /* Morgen */
    var dataforpush = {
      Datum: daymsecstring,
      Dosis: dosispush,
      Form: MediFormPush,
      Name: MediNamePush,
      Blister: MediBlisterPush,
      Zeit: "08:00"
    };
    var morgennewAppointmentKey = firebase.database().ref().child(currentPatient + '/Medis').push().key;
    var morgenupdatedata = {};
    morgenupdatedata[currentPatient + '/Medis/Morgen/' + morgennewAppointmentKey] = dataforpush;
    addMorgen(morgenupdatedata);
    /* Mittag */
    var dataforpush = {
      Datum: daymsecstring,
      Dosis: dosispush,
      Form: MediFormPush,
      Name: MediNamePush,
      Blister: MediBlisterPush,
      Zeit: "12:00"
    };
    var mittagnewAppointmentKey = firebase.database().ref().child(currentPatient + '/Medis').push().key;
    var mittagupdatedata = {};
    mittagupdatedata[currentPatient + '/Medis/Mittag/' + mittagnewAppointmentKey] = dataforpush;
    addMittag(mittagupdatedata);
    /* Abend */
    var dataforpush = {
      Datum: daymsecstring,
      Dosis: dosispush,
      Form: MediFormPush,
      Name: MediNamePush,
      Blister: MediBlisterPush,
      Zeit: "18:00"
    };
    var abendnewAppointmentKey = firebase.database().ref().child(currentPatient + '/Medis').push().key;
    var abendupdatedata = {};
    abendupdatedata[currentPatient + '/Medis/Abend/' + abendnewAppointmentKey] = dataforpush;
    addAbend(abendupdatedata);
    /* Nacht */
    var dataforpush = {
      Datum: daymsecstring,
      Dosis: dosispush,
      Form: MediFormPush,
      Name: MediNamePush,
      Blister: MediBlisterPush,
      Zeit: "23:00"
    };
    var nachtnewAppointmentKey = firebase.database().ref().child(currentPatient + '/Medis').push().key;
    var nachtupdatedata = {};
    nachtupdatedata[currentPatient + '/Medis/Nacht/' + nachtnewAppointmentKey] = dataforpush;
    addNacht(nachtupdatedata);
  }
  else {
    console.log("error");
  }
}

function addMorgen(morgenupdatedata){
  return firebase.database().ref().update(morgenupdatedata);
}
function addMittag(mittagupdatedata){
  return firebase.database().ref().update(mittagupdatedata);
}
function addAbend(abendupdatedata){
  return firebase.database().ref().update(abendupdatedata);
}
function addNacht(nachtupdatedata){
  return firebase.database().ref().update(nachtupdatedata);
}

function submitClick() {

  console.log("test");
  var MediBlisterPush = MediBlister.options[MediBlister.selectedIndex].text;
  var MediDosisSelectPush = MediDosisSelect.options[MediDosisSelect.selectedIndex].text;
  var MediDauerPush = MediDauer.value;
  var MediDosisPush = MediDosis.value;
  var MediFormPush = MediForm.options[MediForm.selectedIndex].text;
  var MediNamePush = MediName.value;
  console.log(todaymsec);
  var DayPush = new Date(todaymsec);
  /* var MonthPush = todayDate.getMonth() + 1;
  var YearPush = todayDate.getFullYear(); */
  console.log(DayPush);
  /* alert(MonthPush);
  alert(YearPush); */

  for (var i = 0; i < MediDauerPush; i++){
    // DayPush = DayPush + i;
    var daymsecpush = todaymsec;
    daymsecpush = daymsecpush + i * 86400000;
    var daymsecstring = "" + daymsecpush;
    var dosispush = MediDosisPush + MediDosisSelectPush;
    /* var dataforpush = {
      Datum: daymsecstring,
      Dosis: MediDosisPush + MediDosisSelectPush,
      Form: MediFormPush,
      Name: MediNamePush,
      Blister: MediBlisterPush
    }; */

    addData(daymsecstring, dosispush, MediFormPush, MediNamePush, MediBlisterPush);
    /*var newAppointmentKey = firebase.database().ref().child(currentPatient + '/Medis').push().key;
    var updatedata = {};
    updatedata[currentPatient + '/Medis/Nacht/' + newAppointmentKey] = dataforpush;
    return firebase.database().ref().update(updatedata);*/
  }
   // location.reload();
}


function userselection(cred){

  currentPatient = cred;
  patientheader.innerText = "Patient: " + currentPatient;
  console.log(currentPatient);

  getMorgen(currentPatient);
  getMittag(currentPatient);
  getAbend(currentPatient);
  getNacht(currentPatient);

  }

function getMorgen(currentPatient){
  var detailsRef = firebase.database().ref().child(currentPatient + '/Medis/Morgen');
  detailsRef.on("child_added", snap => {
    var blister = snap.child("Blister").val();
    var datum = snap.child("Datum").val();
    var datumoutput = new Date(datum);
    var dayoutput = datumoutput.getDate();
    var monthoutput = datumoutput.getMonth() + 1;
    var yearoutput = datumoutput.getFullYear();
    var dauer = snap.child("Dauer").val();
    var dosis = snap.child("Dosis").val();
    var form = snap.child("Form").val();
    var name = snap.child("Name").val();
    $("#Mediview").append(
      "<tr id='tablemorgen'><td> " +
      dayoutput + "." + monthoutput + "." + yearoutput + "</td><td>" +
      name + "</td><td>" +
      dosis + "</td><td>" +
      form +"</td><td>" +
      blister + "</td><td>" +
      dauer +
      " Tage </td><td bgcolor=white><img src='bearbeiten.jpg' width='20px' height='20px'><img src='löschen.png' width='20px' height='20px'></td></tr>");
    });
}
function getMittag(currentPatient){
  var detailsRef = firebase.database().ref().child(currentPatient + '/Medis/Mittag');
  detailsRef.on("child_added", snap => {
    var blister = snap.child("Blister").val();
    var datum = snap.child("Datum").val();
    var datumoutput = new Date(datum);
    var dayoutput = datumoutput.getDate();
    var monthoutput = datumoutput.getMonth() + 1;
    var yearoutput = datumoutput.getFullYear();
    var dauer = snap.child("Dauer").val();
    var dosis = snap.child("Dosis").val();
    var form = snap.child("Form").val();
    var name = snap.child("Name").val();
    $("#Mediview").append(
      "<tr id='tablemittag'><td> " +
      dayoutput + "." + monthoutput + "." + yearoutput + "</td><td>" +
      name + "</td><td>" +
      dosis + "</td><td>" +
      form +"</td><td>" +
      blister + "</td><td>" +
      dauer +
      " Tage </td><td bgcolor=white><img src='bearbeiten.jpg' width='20px' height='20px'><img src='löschen.png' width='20px' height='20px'></td></tr>");
    });
}
function getAbend(currentPatient){
  var detailsRef = firebase.database().ref().child(currentPatient + '/Medis/Abend');
  detailsRef.on("child_added", snap => {
    var blister = snap.child("Blister").val();
    var datum = snap.child("Datum").val();
    var datumoutput = new Date(datum);
    var dayoutput = datumoutput.getDate();
    var monthoutput = datumoutput.getMonth() + 1;
    var yearoutput = datumoutput.getFullYear();
    var dauer = snap.child("Dauer").val();
    var dosis = snap.child("Dosis").val();
    var form = snap.child("Form").val();
    var name = snap.child("Name").val();
    $("#Mediview").append(
      "<tr id='tableabend'><td> " +
      dayoutput + "." + monthoutput + "." + yearoutput + "</td><td>" +
      name + "</td><td>" +
      dosis + "</td><td>" +
      form +"</td><td>" +
      blister + "</td><td>" +
      dauer +
      " Tage </td><td bgcolor=white><img src='bearbeiten.jpg' width='20px' height='20px'><img src='löschen.png' width='20px' height='20px'></td></tr>");
    });
}
function getNacht(currentPatient){
  var detailsRef = firebase.database().ref().child(currentPatient + '/Medis/Nacht');
  detailsRef.on("child_added", snap => {
    var blister = snap.child("Blister").val();
    var datum = snap.child("Datum").val();
    var datumoutput = new Date(datum);
    var dayoutput = datumoutput.getDate();
    var monthoutput = datumoutput.getMonth() + 1;
    var yearoutput = datumoutput.getFullYear();
    var dauer = snap.child("Dauer").val();
    var dosis = snap.child("Dosis").val();
    var form = snap.child("Form").val();
    var name = snap.child("Name").val();
    $("#Mediview").append(
      "<tr id='tablenacht'><td> " +
      dayoutput + "." + monthoutput + "." + yearoutput + "</td><td>" +
      name + "</td><td>" +
      dosis + "</td><td>" +
      form +"</td><td>" +
      blister + "</td><td>" +
      dauer +
      " Tage </td><td bgcolor=white><img src='bearbeiten.jpg' width='20px' height='20px'><img src='löschen.png' width='20px' height='20px'></td></tr>");
    });
}



  var testsRef = firebase.database().ref().child('/');
  testsRef.on("child_added", snap => {
    var vorname = snap.child("Vorname").val();
    var name = snap.child("Name").val();
    var cred = name + vorname;
    $("#Patientview").append("<li onClick=userselection('"+cred+"')><a> " + name + " " + vorname + "</a></li>");
  });

  /*var detailsRef = firebase.database().ref().child(currentPatient + '/Medis/Morgen');
  detailsRef.on("child_added", snap => {
  var blister = snap.child("Blister").val();
  var datum = snap.child("Datum").val();
  var dauer = snap.child("Dauer").val();
  var dosis = snap.child("Dosis").val();
  var form = snap.child("Form").val();
  var name = snap.child("Name").val();
  alert(name);
  $("#Mediview").append(
  "<tr><td> " +
  datum + "</td><td>" +
  name + "</td><td>" +
  dosis + "</td><td>" +
  form +"</td><td>" +
  blister + "</td><td>" +
  dauer +
  " Tage </td><td bgcolor=white><img src='bearbeiten.jpg' width='20px' height='20px'><img src='löschen.png' width='20px' height='20px'></td></tr>");
});
*/
