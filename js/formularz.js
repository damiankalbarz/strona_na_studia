var key = 0;

class Dane {
    constructor(imie = "", nazwisko = "", email = "",auto="", ubezpieczenie="",opcje="") {
        this.imie = imie;
        this.nazwisko = nazwisko;
        this.email = email;
        this.ubezpieczenie = ubezpieczenie;
        this.opcje = opcje;
        this.auto = auto;
    }
}

function sprawdzPole(pole_id, obiektRegex) {
    var obiektPole = document.getElementById(pole_id);
    if (!obiektRegex.test(obiektPole.value)) return (false);
    else return (true);
}

function sprawdz_box(box_id) {
    var obiekt = document.getElementById(box_id);
    if (obiekt.checked) return true;
    else return false;
}

function zwroc_box() {
    checkboxyNames = ["fotelik", "lodowka", "linka"];
    var zd = "";
    for (var i = 0; i < 3; i++) {
        if (sprawdz_box(checkboxyNames[i])) {
            zd += " " + checkboxyNames[i] + " ";
        }
    }
    return zd;
}

function zwroc_radio(nazwa_radio) {
    var obiekt = document.getElementsByName(nazwa_radio);
    for (i = 0; i < obiekt.length; i++) {
        wybrany = obiekt[i].checked;
        if (wybrany) return obiekt[i].value;
    }
}


function zapis() {
    var user = new Dane();
    user.imie = document.getElementById("imie").value;
    user.nazwisko = document.getElementById("nazwisko").value;
    user.email = document.getElementById("email").value;
    user.ubezpieczenie = zwroc_radio("wybor");
    user.opcje = zwroc_box();
    user.auto = document.getElementById("auto").value;
    let lista = [];
    const storagedLista = localStorage.getItem("lista");
    if (storagedLista) {
        lista = JSON.parse(storagedLista);
    }
    const duplicateEmail = lista.find(u => u.email === user.email);
    if (duplicateEmail) {
        alert("Wys³ano zapytanie juz z tego emaila");
    }
    else {
        localStorage.setItem("lista", JSON.stringify([user, ...lista]));
    }
}

function pokaz(){
    var lista = JSON.parse(localStorage.getItem('lista'));
    let tresc = '';
    var temp = 1;
    if (lista == null) {     
        alert("Brak zapytan w bazie");
    } else {
        for (let i = 0; i < lista.length; i++) {
            tresc += `<tr><th> ${temp++} </th> <td> ${lista[i].imie} </td>
            <td> ${lista[i].nazwisko}  </td>   <td> ${lista[i].email} </td>
            <td> ${lista[i].auto} </td> <td> ${lista[i].ubezpieczenie} </td> 
            <td> ${lista[i].opcje} </td> </tr>`
        }
        document.querySelector('table').style.visibility = "visible";
        document.getElementById("tresc").innerHTML = tresc;
    }
}


function sprawdz() {
    var points = 0;
    obiektImie = /^[a-zA-Z]/;
    obiektNazw = /^[a-zA-Z]{2,20}$/; 
    obiektemail = /^([a-zA-Z0-9])+([.a-zA-Z0-9_-])*@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-]+)+/;
    checkboxyNames = ["fotelik", "lodowka", "linka"];

    if (!sprawdzPole("imie", obiektImie)) {
        ok = false;
        document.getElementById("imie_error").innerHTML =
            "Wpisz poprawnie imie!";
    }
    else { document.getElementById("imie_error").innerHTML = ""; points += 1; }

    if (!sprawdzPole("nazwisko", obiektNazw)) {
        ok = false;
        document.getElementById("nazw_error").innerHTML =
            "Wpisz poprawnie nazwisko!";
    }
    else { document.getElementById("nazw_error").innerHTML = ""; points += 1; }

    if (!sprawdzPole("email", obiektemail)) {
        ok = false;
        document.getElementById("email_error").innerHTML =
            "Wpisz poprawnie email!";
    }
    else { document.getElementById("email_error").innerHTML = ""; points += 1; }

    for (var i = 0; i < 3; i++) {
        if (sprawdz_box(checkboxyNames[i])) {
            ok = true;
            break;
        }
    }

    if (points == 3) {
        imie = document.getElementById("imie").value;
        nazwisko = document.getElementById("nazwisko").value;
        email = document.getElementById("email").value;
        //alert("Imie" + imie + "Nazwisko" + nazwisko + "email");
        zapis();
    }
}


function usun() {
    localStorage.clear();
    document.querySelector('table').style.visibility = "hidden";
}