
var currentPatient;
var todayDate = new Date();

/*
Calendar cal = Calendar.getInstance();
cal.set(Calendar.DAY_OF_MONTH, 1);
cal.set(Calendar.MONTH,1);
cal.set(Calendar.YEAR, 2012);
*/


var submitBtn = document.getElementById("submitBtn");

// Add Appointment
var MediBlister = document.getElementById("SelectMediBlisterFormID");
var MediForm = document.getElementById("SelectMediFormFormID");
var MediDauer = document.getElementById("MediDurationFormID");
var MediDosis = document.getElementById("MediDosisFormID");
var MediDosisSelect = document.getElementById("SelectMediDosisFormID");
var MediName = document.getElementById("MediNameFormID");

var patientheader = document.getElementById("patientheader");

function addData(dataforpush, MediBlisterPush) {
  if (MediBlisterPush == "0-0-0-1"){
    var newAppointmentKey = firebase.database().ref().child(currentPatient + '/Medis').push().key;
    var updatedata = {};
    updatedata[currentPatient + '/Medis/Nacht/' + newAppointmentKey] = dataforpush;
    return firebase.database().ref().update(updatedata);
  } else if (MediBlisterPush == "0-0-1-0") {
    var newAppointmentKey = firebase.database().ref().child(currentPatient + '/Medis').push().key;
    var updatedata = {};
    updatedata[currentPatient + '/Medis/Abend/' + newAppointmentKey] = dataforpush;
    return firebase.database().ref().update(updatedata);
  }else if (MediBlisterPush == "0-1-0-0") {
    var newAppointmentKey = firebase.database().ref().child(currentPatient + '/Medis').push().key;
    var updatedata = {};
    updatedata[currentPatient + '/Medis/Mittag/' + newAppointmentKey] = dataforpush;
    return firebase.database().ref().update(updatedata);
  } else if (MediBlisterPush == "1-0-0-0") {
    var newAppointmentKey = firebase.database().ref().child(currentPatient + '/Medis').push().key;
    var updatedata = {};
    updatedata[currentPatient + '/Medis/Morgen/' + newAppointmentKey] = dataforpush;
    return firebase.database().ref().update(updatedata);
  } else {
    console.log("error");
  }
}

function submitClick() {

  alert("test");
  var MediBlisterPush = MediBlister.options[MediBlister.selectedIndex].text;
  var MediDosisSelectPush = MediDosisSelect.options[MediDosisSelect.selectedIndex].text;
  var MediDauerPush = MediDauer.value;
  var MediDosisPush = MediDosis.value;
  var MediFormPush = MediForm.options[MediForm.selectedIndex].text;
  var MediNamePush = MediName.value;
  var DayPush = todayDate.getDate();
  var MonthPush = todayDate.getMonth() + 1;
  var YearPush = todayDate.getFullYear();
  alert(DayPush);
  alert(MonthPush);
  alert(YearPush);

  for (var i = 0; i < MediDauerPush; i++){
    DayPush = DayPush + i;
    var dataforpush = {
      Datum: DayPush + "." + MonthPush,
      Dosis: MediDosisPush + MediDosisSelectPush,
      Form: MediFormPush,
      Name: MediNamePush
    };
    addData(dataforpush, MediBlisterPush);
    /*var newAppointmentKey = firebase.database().ref().child(currentPatient + '/Medis').push().key;
    var updatedata = {};
    updatedata[currentPatient + '/Medis/Nacht/' + newAppointmentKey] = dataforpush;
    return firebase.database().ref().update(updatedata);*/
  }
}


function userselection(cred){

  currentPatient = cred;
  patientheader.innerText = "Patient: " + currentPatient;
  console.log(currentPatient);

  var detailsRef = firebase.database().ref().child(currentPatient + '/Medis/Morgen');
        detailsRef.on("child_added", snap => {
            var blister = snap.child("Blister").val();
            var datum = snap.child("Datum").val();
            var dauer = snap.child("Dauer").val();
            var dosis = snap.child("Dosis").val();
            var form = snap.child("Form").val();
            var name = snap.child("Name").val();
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
}


var testsRef = firebase.database().ref().child('/');
  testsRef.on("child_added", snap => {
      var vorname = snap.child("Vorname").val();
      var name = snap.child("Name").val();
      var cred = name + vorname;
      $("#Patientview").append("<li onClick=userselection('"+cred+"')><a> " + name + " " + vorname + "</a></li>");
    });

var detailsRef = firebase.database().ref().child(currentPatient + '/Medis/Morgen');
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
