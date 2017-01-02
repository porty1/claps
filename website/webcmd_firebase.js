var currentPatient;
var todayDate = new Date();
var todayDay = todayDate.getDate();
var todayMonth = todayDate.getMonth() + 1;
var todayYear = todayDate.getFullYear();
var todaymsec = Date.parse(todayMonth + "/" + todayDay + "/" + todayYear);
todaymsec = todaymsec + 3600000;
console.log(todaymsec);


var submitBtn = document.getElementById("submitBtn");

// Add Medi
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
  console.log(DayPush);


  for (var i = 0; i < MediDauerPush; i++){

    var daymsecpush = todaymsec;
    daymsecpush = daymsecpush + i * 86400000;
    var daymsecstring = "" + daymsecpush;
    var dosispush = MediDosisPush + MediDosisSelectPush;


    addData(daymsecstring, dosispush, MediFormPush, MediNamePush, MediBlisterPush);
  }

}

function emptytheTable (){
  var table = document.getElementById("myTableData");
  var rowCount = table.rows.length;
  console.log("adsf" + rowCount);
  for (i = rowCount-1; i >= 2; i--) {
    table.deleteRow(i);
    console.log("Deleted Row:" + i);
  }

}

function addRow(dayoutput, monthoutput, yearoutput, name, dosis, form, blister, timeofday, path) {

  // http://www.mysamplecode.com/2012/04/generate-html-table-using-javascript.html

  var table = document.getElementById("myTableData");

  var rowCount = table.rows.length;
  console.log(rowCount);
  var row = table.insertRow(rowCount);

  row.insertCell(0).innerHTML= '' + dayoutput + '.' + monthoutput + '.' + yearoutput + '';
  row.insertCell(1).innerHTML= name;
  row.insertCell(2).innerHTML= dosis;
  row.insertCell(3).innerHTML= form;
  row.insertCell(4).innerHTML= blister;
  row.insertCell(5).innerHTML= timeofday;
  row.insertCell(6).innerHTML= "<input type=button value=Delete onClick=Javacsript:deleteRow('"+path+"')>";

}


function deleteRow(path){

  console.log(path);
  var deleteRowRef = firebase.database().ref().child(path);
  deleteRowRef.remove();
  userselection(currentPatient);
}

function userselection(cred){

  currentPatient = cred;
  patientheader.innerText = "Patient: " + currentPatient;
  console.log(currentPatient);
  emptytheTable();

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
    var nmbdatummsec = parseInt(datum);
    var datumoutput = new Date(nmbdatummsec);
    var dayoutput = datumoutput.getDate();
    var monthoutput = datumoutput.getMonth() + 1;
    var yearoutput = datumoutput.getFullYear();
    var dauer = snap.child("Dauer").val();
    var dosis = snap.child("Dosis").val();
    var form = snap.child("Form").val();
    var name = snap.child("Name").val();
    var timeofday = "Morgen";
    var key = snap.key;
    var path = currentPatient + "/Medis/Morgen/" + key;

    addRow(dayoutput, monthoutput, yearoutput, name, dosis, form, blister, timeofday, path);

  });
}
function getMittag(currentPatient){
  var detailsRef = firebase.database().ref().child(currentPatient + '/Medis/Mittag');
  detailsRef.on("child_added", snap => {
    var blister = snap.child("Blister").val();
    var datum = snap.child("Datum").val();
    var nmbdatummsec = parseInt(datum);
    var datumoutput = new Date(nmbdatummsec);
    var dayoutput = datumoutput.getDate();
    var monthoutput = datumoutput.getMonth() + 1;
    var yearoutput = datumoutput.getFullYear();
    var dauer = snap.child("Dauer").val();
    var dosis = snap.child("Dosis").val();
    var form = snap.child("Form").val();
    var name = snap.child("Name").val();
    var timeofday = "Mittag";
    var key = snap.key;
    var path = currentPatient + "/Medis/Mittag/" + key;

    addRow(dayoutput, monthoutput, yearoutput, name, dosis, form, blister, timeofday, path);

  });
}
function getAbend(currentPatient){
  var detailsRef = firebase.database().ref().child(currentPatient + '/Medis/Abend');
  detailsRef.on("child_added", snap => {
    var blister = snap.child("Blister").val();
    var datum = snap.child("Datum").val();
    var nmbdatummsec = parseInt(datum);
    var datumoutput = new Date(nmbdatummsec);
    var dayoutput = datumoutput.getDate();
    var monthoutput = datumoutput.getMonth() + 1;
    var yearoutput = datumoutput.getFullYear();
    var dauer = snap.child("Dauer").val();
    var dosis = snap.child("Dosis").val();
    var form = snap.child("Form").val();
    var name = snap.child("Name").val();
    var timeofday = "Abend";
    var key = snap.key;
    var path = currentPatient + "/Medis/Abend/" + key;

    addRow(dayoutput, monthoutput, yearoutput, name, dosis, form, blister, timeofday, path);

  });
}
function getNacht(currentPatient){
  var detailsRef = firebase.database().ref().child(currentPatient + '/Medis/Nacht');
  detailsRef.on("child_added", snap => {
    var blister = snap.child("Blister").val();
    var datum = snap.child("Datum").val();
    var datumoutput = new Date(nmbdatummsec);
    var dayoutput = datumoutput.getDate();
    var monthoutput = datumoutput.getMonth() + 1;
    var yearoutput = datumoutput.getFullYear();
    var dauer = snap.child("Dauer").val();
    var dosis = snap.child("Dosis").val();
    var form = snap.child("Form").val();
    var name = snap.child("Name").val();
    var timeofday = "Nacht";
    var key = snap.key;
    var path = currentPatient + "/Medis/Nacht/" + key;

    addRow(dayoutput, monthoutput, yearoutput, name, dosis, form, blister, timeofday, path);

  });
}



var testsRef = firebase.database().ref().child('/');
testsRef.on("child_added", snap => {
  var vorname = snap.child("Vorname").val();
  var name = snap.child("Name").val();
  var cred = name + vorname;
  $("#Patientview").append("<li onClick=userselection('"+cred+"')><a> " + name + " " + vorname + "</a></li>");
});