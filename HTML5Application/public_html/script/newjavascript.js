let rowdata = [{ status: 'נמכר!', date: "15.3.21", name: "טום קרוז", phone: "054123456", city: "אשדוד", source: "אריאל", color: "green" },
    { status: 'מאחר', date: "15.3.21", name: "טום קרוז", phone: "054123456", city: "חולון", source: "אריאל", color: "yellow" },
    { status: "התקבל", date: "15.3.21", name: "טום קרוז", phone: "054123456", city: "ראשון לציון", source: "אריאל", color: "none1" },
    { status: "שיחה חוזרת", date: "15.3.21", name: "טום קרוז", phone: "054123456", city: "חולון", source: "אריאל", color: "blue" },
    { status: "לא נמכר", date: "15.3.21", name: "טום קרוז", phone: "054123456", city: "חולון", source: "אריאל", color: "red" },
    { status: "שיחה חוזרת", date: "15.3.21", name: "טום קרוז", phone: "054123456", city: "נס ציונה", source: "אריאל", color: "blue" }
];




window.onload = function() {

    loadData(rowdata);

};

function loadData(rowdata) {
    //var tableBody = document.getElementById("bodyId");
    let tabkehtml = "";
    for (let row of rowdata) {

        tabkehtml += ` <tr> <td class="right" title="${row.color}" >${row.status}</td><td>${row.date}</td><td>${row.name}</td><td>054123456</td> <td>${row.city}</td> <td class="left">${row.source}</td> </tr>`;
        console.log(`jhjh : ${row.city}`);
        console.log(`Sum is equal: ${row.city}`);
    }

    document.getElementById("bodyId").innerHTML = tabkehtml;
}

function changeText() {
    var e = document.getElementById("ddlViewBy");
    var x = document.getElementById("cars2");
    var statusText = e.options[e.selectedIndex].text;
    var statusValue = e.value;
    var cityText = x.options[x.selectedIndex].text;
    var cityValue = x.value;
    //Shows all results
    if (statusValue == 0 && cityValue == 0) {
        document.getElementById("test").innerHTML = "";
        loadData(rowdata);

    }
    //Shows results by status
    if (statusValue != 0 && cityValue == 0) {
        var resultByStatus = rowdata.filter(rowdata => rowdata.status == statusText);
        document.getElementById("test").innerHTML = "";
        loadData(resultByStatus);
    }
    //Shows results by city
    if (cityValue != 0 && statusValue == 0) {
        var resultByCity = rowdata.filter(rowdata => rowdata.city == cityText);
        document.getElementById("test").innerHTML = "";
        loadData(resultByCity);
    }
    //Shows results by city and status
    if (cityValue != 0 && statusValue != 0) {

        var resultByCityAndStatus = rowdata.filter(function(rowd) {
            return rowd.status == statusText && rowd.city == cityText;
        });
        document.getElementById("test").innerHTML = "";
        loadData(resultByCityAndStatus);
        if (resultByCityAndStatus.length == 0) {

            document.getElementById("test").innerHTML = " לא נמצא מידע עבור קבוצה :  ' " + cityText + " '  ,סטאטוס: ' " + statusText + "'";
        }

    }

}