//GET
function createTankCard(tank) {
    var tankCard_div = document.createElement("DIV");
    tankCard_div.classList.add("tank-card");

    var tankLocation_div = document.createElement("DIV");
    tankLocation_div.classList.add("tank-location");
    var tankLocation_divNext = document.createElement("SPAN");
    tankLocation_divNext.classList.add("location1");
    tankLocation_divNext.innerHTML = "Location";
    var tankLocation_divNext2 = document.createElement("SPAN");
    tankLocation_divNext2.classList.add("location2");
    tankLocation_divNext2.innerHTML = tank.location;
    tankLocation_div.append(tankLocation_divNext);
    tankLocation_div.append(tankLocation_divNext2);

    var tankLatitude_div = document.createElement("DIV");
    tankLatitude_div.classList.add("tank-latitude");
    var tankLatitude_div1 = document.createElement("SPAN");
    tankLatitude_div1.classList.add("latitude1");
    tankLatitude_div1.innerHTML = "Latitude";
    var tankLatitude_div2 = document.createElement("SPAN");
    tankLatitude_div2.classList.add("latitude2");
    tankLatitude_div2.innerHTML = tank.latitude;
    tankLatitude_div.append(tankLatitude_div1);
    tankLatitude_div.append(tankLatitude_div2);

    var tankLongitude_div = document.createElement("DIV");
    tankLongitude_div.classList.add("tank-longitude");
    var tankLongitude_div1 = document.createElement("SPAN");
    tankLongitude_div1.classList.add("longitude1");
    tankLongitude_div1.innerHTML = "Longitude";
    var tankLongitude_div2 = document.createElement("SPAN");
    tankLongitude_div2.classList.add("longitude2");
    tankLongitude_div2.innerHTML = tank.longitude;
    tankLongitude_div.append(tankLongitude_div1);
    tankLongitude_div.append(tankLongitude_div2);

    var tankPerF_div = document.createElement("DIV");
    tankPerF_div.classList.add("tank-pf");
    var tankPerF_div1 = document.createElement("SPAN");
    tankPerF_div1.classList.add("pf1");
    tankPerF_div1.innerHTML = "Percentage Full";
    var tankPerF_div2 = document.createElement("SPAN");
    tankPerF_div2.classList.add("pf2");
    tankPerF_div2.innerHTML = tank.percentage_full;
    tankPerF_div.append(tankPerF_div1);
    tankPerF_div.append(tankPerF_div2);

    tankCard_div.append(tankLocation_div);
    tankCard_div.append(tankLatitude_div);
    tankCard_div.append(tankLongitude_div);
    tankCard_div.append(tankPerF_div);

    return tankCard_div;
}

// POST
document.getElementById("new-tank-submit").addEventListener("click", function (event) {
    event.preventDefault();
    let tankLocation = document.getElementById("new-tank-location").value;
    let tankLat = document.getElementById("new-tank-latitude").value;
    let tankLong = document.getElementById("new-tank-longitude").value;
    let tankPF = document.getElementById("new-tank-pf").value;

    let jsonBody = {
        "location": tankLocation,
        "latitude": tankLat,
        "longitude": tankLong,
        "percentage_full": tankPF,
    };

    fetch("http://127.0.0.1:5000/data", {
        method: "POST",
        body: JSON.stringify(jsonBody),
        headers: {
            "Content-type": "application/json",
        },
    })
        .then((res) => res.json)
        .then((json) => console.log(json));

    var container = document.querySelector(".container");
    container.append(createTankCard(jsonBody));
});


function getTanks() {
    return fetch("http://127.0.0.1:5000/data")
        .then((res) => res.json())
        .then((json) => json);
}

async function display() {
    let tanks = await getTanks();
    console.log(tanks);
    tanks.forEach((tank) => {
        var container = document.querySelector(".container");
        container.append(createTankCard(tank));
    });
}

var container = document.querySelector(".container");

window.onload = function () {
    console.log("Hello!");
    display();
};