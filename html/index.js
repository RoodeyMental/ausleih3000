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
    // optionen von rest auslesen
    assets = ["HDMI - VGA Adapter", "Whiteboard Marker Rot", "DP - VGA Adapter"]
    var selection = document.getElementById("asset-selection")
    for (var element of assets) {
        var opt = document.createElement("option")
        opt.appendChild(document.createTextNode(element))
        opt.value = element
        selection.appendChild(opt)
    }
}

function insertIntoTable() {
    //erst rest einfügen, wenn erfolgreich dann in table

    elements = [1, "h", 2, 3, 4, 5, 6]
    var table = document.getElementById("borrow-table")
    if (elements.length === 7) {
        var row = table.insertRow(-1)
        var cells = []
        for (let i = 0; i <= 7; i++) {
            cells[i] = row.insertCell(i)
        }
        cells[7].innerHTML = "<input type=\"checkbox\" id=" + table.rows.length + "><br>"
        for (let i = 0; i <= 6; i++) {
            cells[i].innerHTML = elements[i]
        }
    } else {
        console.log("not ok")


    }
    checkStatus()
}

function saveNewElement() {
    //neues element in Tabelle einfügen insertIntoTable, aus input auslesen
    //rest einfügen wird in insertIntoTable Methode übernommen
}

function checkStatus() {
    //überfällige ausleihen auslesen
    //ausleihen insgesamt auslesen
    var amountActive = 10
    var amountOverdue = 1

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

document.addEventListener("DOMContentLoaded", function main() {
    checkStatus();
});