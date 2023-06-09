﻿$(function(){
    hentAlleKunder();
});

function hentAlleKunder() {
    $.get("kunde/hentAlle", function (kunder) {
        formaterKunder(kunder);
    }) 
    .fail(function (feil) {
        if (feil.status == 401) {  
            window.location.href = 'loggInn.html'; // ikke logget inn, redirect til loggInn.html
        }
        else {
            $("#feil").html("Feil på server - prøv igjen senere");
        }
    });
}

function formaterKunder(kunder) {
    let ut = "<table class='table table-striped'>" +
        "<tr>" +
        "<th>Fornavn</th><th>Etternavn</th><th>Adresse</th><th>Postnr</th><th>Poststed</th><th></th><th></th>" +
        "</tr>";
    for (let kunde of kunder) {
        ut += "<tr>" + 
            "<td>" + kunde.fornavn + "</td>" +
            "<td>" + kunde.etternavn + "</td>" +
            "<td>" + kunde.adresse + "</td>" +
            "<td>" + kunde.postnr + "</td>" +
            "<td>" + kunde.poststed + "</td>" +
            "<td> <a class='btn btn-primary' href='endre.html?id="+kunde.id+"'>Endre</a></td>"+
            "<td> <button class='btn btn-danger' onclick='slettKunde("+kunde.id+")'>Slett</button></td>"+
            "</tr>";
    }
    ut += "</table>";
    $("#kundene").html(ut);
}

function slettKunde(id) {
    const url = "Kunde/Slett?id="+id;
    
    $.get(url, function () {
        window.location.href = 'index.html';
    })
    .fail(function (feil) {
        if (feil.status == 401) {  // ikke logget inn, redirect til loggInn.html
            window.location.href = 'loggInn.html';
        }
        else {
            $("#feil").html("Feil på server - prøv igjen senere");
        }
    });
}