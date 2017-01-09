// Initialisiert alle globalen Variablen
var currentPatient;
var currentPatientView;
var todayDate = new Date();
var todayDay = todayDate.getUTCDate();
var todayMonth = todayDate.getUTCMonth() + 1;
var todayYear = todayDate.getUTCFullYear();
var todaymsec = Date.parse(todayMonth + "/" + todayDay + "/" + todayYear);
todaymsec = todaymsec + 3600000;
var submitBtn = document.getElementById("submitBtn");
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
  userselection(currentPatient); // Um die Tabellen mit den neuen Inhalten korrekt zu laden, wird userselection nochmals aufgerufen
}

/* Schreibt die im dataforpush festgelegten Daten in den definierten Pfad "currentPatient/Medis/.../...newAppointmentKey" (... = Morgen, Mittag, Abend oder Nacht) */
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

/* Formularhandler zur Medikamentenerfassung */
function submitClick() {
  // Alle Werte aus dem Formular auslesen
  var MediBlisterPush = MediBlister.options[MediBlister.selectedIndex].text;
  var MediDosisSelectPush = MediDosisSelect.options[MediDosisSelect.selectedIndex].text;
  var MediDauerPush = MediDauer.value;
  var MediDosisPush = MediDosis.value;
  var MediFormPush = MediForm.options[MediForm.selectedIndex].text;
  var MediNamePush = MediName.value;
  console.log(todaymsec);
  // Das Formular der Tabelle myTableData zurücksetzten
  document.getElementById("MediNameFormID").value = "";
  document.getElementById("MediDosisFormID").value = "";
  document.getElementById("MediDurationFormID").value = "";
  document.getElementById("SelectMediDosisFormID").selectedIndex = 0;
  document.getElementById("SelectMediFormFormID").selectedIndex = 0;
  document.getElementById("SelectMediBlisterFormID").selectedIndex = 0;

  for (var i = 0; i < MediDauerPush; i++){
    var daymsecpush = todaymsec;
    daymsecpush = daymsecpush + i * 86400000;
    var daymsecstring = "" + daymsecpush;
    var dosispush = MediDosisPush + MediDosisSelectPush;
    addData(daymsecstring, dosispush, MediFormPush, MediNamePush, MediBlisterPush);
  }
}

/* Leert die vier Tabellen tablemorgendata, tablemittagdata, tableabenddata und tablenachtdata */
function emptytheTable (){
  // Morgen
  var tablemorgen = document.getElementById("tablemorgendata");
  var rowCount = tablemorgen.rows.length;
  for (i = rowCount-1; i >= 1; i--) {
    tablemorgen.deleteRow(i);
    console.log("Deleted Row:" + i);
  }
  // Mittag
  var tablemittag = document.getElementById("tablemittagdata");
  var rowCount = tablemittag.rows.length;
  for (i = rowCount-1; i >= 1; i--) {
    tablemittag.deleteRow(i);
    console.log("Deleted Row:" + i);
  }
  // Abend
  var tableabend = document.getElementById("tableabenddata");
  var rowCount = tableabend.rows.length;
  for (i = rowCount-1; i >= 1; i--) {
    tableabend.deleteRow(i);
    console.log("Deleted Row:" + i);
  }
  // Nacht
  var tablenacht = document.getElementById("tablenachtdata");
  var rowCount = tablenacht.rows.length;
  for (i = rowCount-1; i >= 1; i--) {
    tablenacht.deleteRow(i);
    console.log("Deleted Row:" + i);
  }
}

/* Schreibt die ausgelesenen Medikamentendaten in die entsprechenden Tabellen  */
function addRow(dayoutput, monthoutput, yearoutput, name, dosis, form, blister, timeofday, path) {
  // Quelle: http://www.mysamplecode.com/2012/04/generate-html-table-using-javascript.html
  if (timeofday == "Morgen"){
    var table = document.getElementById("tablemorgendata");
    var rowCount = table.rows.length;
    console.log(rowCount);
    var row = table.insertRow(rowCount);
    row.insertCell(0).innerHTML= '' + dayoutput + '.' + monthoutput + '.' + yearoutput + '';
    row.insertCell(1).innerHTML= name;
    row.insertCell(2).innerHTML= dosis;
    row.insertCell(3).innerHTML= form;
    row.insertCell(4).innerHTML= "<input type=button value=Delete onClick=Javacsript:deleteRow('"+path+"')>";
  } else if (timeofday == "Mittag"){
    var table = document.getElementById("tablemittagdata");
    var rowCount = table.rows.length;
    console.log(rowCount);
    var row = table.insertRow(rowCount);
    row.insertCell(0).innerHTML= '' + dayoutput + '.' + monthoutput + '.' + yearoutput + '';
    row.insertCell(1).innerHTML= name;
    row.insertCell(2).innerHTML= dosis;
    row.insertCell(3).innerHTML= form;
    row.insertCell(4).innerHTML= "<input type=button value=Delete onClick=Javacsript:deleteRow('"+path+"')>";
  } else if (timeofday == "Abend"){
    var table = document.getElementById("tableabenddata");
    var rowCount = table.rows.length;
    console.log(rowCount);
    var row = table.insertRow(rowCount);
    row.insertCell(0).innerHTML= '' + dayoutput + '.' + monthoutput + '.' + yearoutput + '';
    row.insertCell(1).innerHTML= name;
    row.insertCell(2).innerHTML= dosis;
    row.insertCell(3).innerHTML= form;
    row.insertCell(4).innerHTML= "<input type=button value=Delete onClick=Javacsript:deleteRow('"+path+"')>";
  } else if (timeofday == "Nacht"){
    var table = document.getElementById("tablenachtdata");
    var rowCount = table.rows.length;
    console.log(rowCount);
    var row = table.insertRow(rowCount);
    row.insertCell(0).innerHTML= '' + dayoutput + '.' + monthoutput + '.' + yearoutput + '';
    row.insertCell(1).innerHTML= name;
    row.insertCell(2).innerHTML= dosis;
    row.insertCell(3).innerHTML= form;
    row.insertCell(4).innerHTML= "<input type=button value=Delete onClick=Javacsript:deleteRow('"+path+"')>";
  } else {
    console.log("Error Writing in Table");
  }


}

/* Methode um das entsprechende Medikament zu löschen. Erhält den Pfad des Medikaments aus dem auf im Button hinterlegten deleteRow(path) */
function deleteRow(path){
  console.log(path);
  var deleteRowRef = firebase.database().ref().child(path);
  deleteRowRef.remove();
  userselection(currentPatient);
}

/* Wird beim Selektieren eines Patienten aus der Liste id=patientview aufgerufen. Erstellt die patientenbezogene Sicht unter id=medikamente */
function userselection(cred, name, vorname){
  document.getElementById("viewtables").style.display = "block"; // Schaltet die Tabellen tablemorgendata, tablemittagdata, tableabenddata und tablenachtdata auf sichtbar
  currentPatient = cred; // Schreibt den gewählten User in eine globale Variable, wird benötigt um das Wechseln der Views zu ermöglichen
  if(name != undefined && vorname != undefined){
    patientheader.innerText = "Patient: " + name + " " + vorname;
  }
  console.log(currentPatient);
  emptytheTable(); // Die vorhanden Tabellen werden bevor sie beschrieben werden geleert, damit sie mit neuen korrekten Daten gefüllt werden können
  getMorgen(currentPatient);
  getMittag(currentPatient);
  getAbend(currentPatient);
  getNacht(currentPatient);
}

/* Je eine Funktion um die verschriebenen Medikamente für den gewählten User pro Blisterslot (Morgen, Mittag, Abend, Nacht) aus der Firebase Datenbank ausliest (Pfad: root/user/medis/...)
Die gelesenen Daten werden für die Darstellung in einer Tabelle an die Funktion addRow() weitergeleitet */
function getMorgen(currentPatient){
  var detailsRef = firebase.database().ref().child(currentPatient + '/Medis/Morgen');
  detailsRef.orderByChild("Datum").on("child_added", snap => {
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
  detailsRef.orderByChild("Datum").on("child_added", snap => {
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
  detailsRef.orderByChild("Datum").on("child_added", snap => {
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
  detailsRef.orderByChild("Datum").on("child_added", snap => {
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
    var timeofday = "Nacht";
    var key = snap.key;
    var path = currentPatient + "/Medis/Nacht/" + key;
    addRow(dayoutput, monthoutput, yearoutput, name, dosis, form, blister, timeofday, path);
  });
}

/* Liest alle Äste vom Punkt .root der Firebase Datenbank aus (die ersten Äste sind die User).
Deren Childs (Name & Vorname) werden verwendet um den Patientview zu generieren -> userselection(cred, name, vorname) */
var testsRef = firebase.database().ref().child('/');
testsRef.on("child_added", snap => {
  var vorname = snap.child("Vorname").val();
  var name = snap.child("Name").val();
  var cred = name + vorname;
  var selecteduser = name + vorname;
  $("#Patientview").append("<li onClick=userselection('"+cred+"','"+ name+"','"+vorname+"')><a> " + name + " " + vorname + "</a></li>");
});


  pdfhochladen = function(){
    var pdfpath = document.getElementById('fileselect').files[0];
    var filename = pdfpath.name;
    console.log(pdfpath);
    console.log(filename);

    var storageRef = firebase.storage().ref().child("menueplan.png");

    storageRef.put(pdfpath).then(function(snapshot) {
      console.log('Uploaded a blob or file!');
    });
  }

  downloadpic = function(){
    var storageRef = firebase.storage().ref();
    storageRef.child('menueplan.png').getDownloadURL().then(function(url) {
      // `url` is the download URL for 'menueplan.png'

      // This can be downloaded directly:
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = function(event) {
        var blob = xhr.response;
      };
      xhr.open('GET', url);
      xhr.send();

      }).catch(function(error) {
        // Handle any errors
      });
  }
