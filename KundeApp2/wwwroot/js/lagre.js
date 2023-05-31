function validerOgLagreKunde() {
    const fornavnOK = validerFornavn($("#fornavn").val());
    const etternavnOK = validerEtternavn($("#etternavn").val());
    const adresseOK = validerAdresse($("#adresse").val());
    const postnrOK = validerPostnr($("#postnr").val());
    const poststedOK = validerPoststed($("#poststed").val());
    if (fornavnOK && etternavnOK && adresseOK && postnrOK && poststedOK) {
        lagreKunde();
    }
}

function lagreKunde() {
    const kunde = {
        fornavn: $("#fornavn").val(),
        etternavn: $("#etternavn").val(),
        adresse: $("#adresse").val(),
        postnr: $("#postnr").val(),
        poststed: $("#poststed").val()
    }
    const url = "Kunde/Lagre";
    $.post(url, kunde, function () {
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
};