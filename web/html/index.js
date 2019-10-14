function showHide() {
    const spoiler_div = document.getElementById("spoiler")
    if (spoiler_div.style.display === "none") {
        spoiler_div.style.display = "block"
    } else {
        spoiler_div.style.display = "none"
    }
}


function toggleAddElement() {
    const spoiler_div = document.getElementById("add-element")
    if (spoiler_div.style.display === "none") {
        spoiler_div.style.display = "block"
    } else {
        spoiler_div.style.display = "none"
    }

    readSelectOptions()
}


function readSelectOptions() {


    var selection = document.getElementById("asset-selection")
    var length = selection.options.length;


    for (i = length; i > 0; i--) {
        selection.options[i] = null;
    }


    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var items = JSON.parse(this.responseText)


            for (var element of items) {
                var opt = document.createElement("option")
                opt.appendChild(document.createTextNode(element.name))
                opt.value = element.id
                selection.appendChild(opt)
            }

        }
    }
    xhttp.open("GET", "http://127.0.0.1:8080/item/available", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    json = xhttp.send();




}

function insertIntoTable(loanJson) {
    //erst rest einfügen, wenn erfolgreich dann in table

    var table = document.getElementById("borrow-table")

    var row = table.insertRow(-1)
    var cells = []
    for (let i = 0; i <= 7; i++) {
        cells[i] = row.insertCell(i)
    }

    cells[0].innerHTML = loanJson.item.name 
    cells[1].innerHTML = loanJson.startDate
    cells[2].innerHTML = loanJson.dueDate
    cells[3].innerHTML = loanJson.name
    cells[4].innerHTML = loanJson.surname
    cells[5].innerHTML = loanJson.cell
    cells[6].innerHTML = loanJson.lib
    cells[7].innerHTML = "<input type=\"checkbox\" id=" + table.rows.length + "><br>"

    checkStatus()
}


function readAllLoanesFromDB() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var loans = JSON.parse(this.responseText)
            for (loan of loans) {
                insertIntoTable(loan)
            }
        }
    }
    xhttp.open("GET", "http://127.0.0.1:8080/loan", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    json = xhttp.send();


}





function saveNewElement() {
    var sel = document.getElementById("asset-selection")
    var itemValue = sel.options[sel.selectedIndex].value
    var itemText = sel.options[sel.selectedIndex].text
    var startDate = document.getElementById("start-date").value
    var dueDate = document.getElementById("due-date").value
    var name = document.getElementById("name").value
    var surname = document.getElementById("surname").value
    var cell = document.getElementById("cell").value
    var lib = document.getElementById("lib").value

    console.log(itemValue + " " + itemText)


    if (item == "- Gegenstand -" || name == "" || surname == "" || cell == "" || lib == "") {
        alert("Eingaben unvollständig! ")
        console.log(item + " " + name + " " + surname + " " + cell + " " + lib)
    } else if (startDate > dueDate) {
        alert("Fälligkeitsdatum kann nicht vor Ausleihdatum sein.")
    } else {


        var loan = {
            "item": { "name": itemText, "id": itemValue },
            "startDate": startDate,
            "dueDate": dueDate,
            "name": name,
            "surname": surname,
            "cell": cell,
            "lib": lib
        }

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            console.log(this.responseText)
            if (this.readyState == 4 && this.status == 200) {
                alert("Erfolgreich gespeichert.")
                console.log("Response: " + this.responseText);

                readAllLoanesFromDB()
                readSelectOptions()
            }
           
        };
        xhttp.open("POST", "http://127.0.0.1:8080/loan", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify(loan))
        console.log(JSON.stringify(loan))
       
    }

}


function checkStatus() {
    //überfällige ausleihen auslesen
    //ausleihen insgesamt auslesen

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var status = JSON.parse(this.responseText)

            var amountActive = status[0]
            var amountOverdue = status[1]
        
            var statusBorder = document.getElementById("inner-status")
            var overdue = document.getElementById("overdue")
            var active = document.getElementById("active")
        
            overdue.textContent = amountOverdue
            active.textContent = amountActive
        
            if (amountOverdue > 0) {
                statusBorder.style.borderColor = "red"
            } else {
                statusBorder.style.borderColor = "green"
            }
        }
    }
    xhttp.open("GET", "http://127.0.0.1:8080/loan/status", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();


}

document.addEventListener("DOMContentLoaded", function main() {
    console.log(document.getElementById("name").value == "")
    checkStatus();
    readAllLoanesFromDB();
    readSelectOptions();

});


// Maske für neue Gegenstände erstellen / löschen (aufpassen auf DB konsistenz)
// Ausleihen