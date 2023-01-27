let apikey = `817a52ab614fe91ff157bbe2e4fd4a00`;

window.addEventListener("load", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      let lon = position.coords.longitude;
      let lat = position.coords.latitude;
      let apikey = `817a52ab614fe91ff157bbe2e4fd4a00`;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apikey}`;
      fetch(url)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          weatherReport(data);
        });
    });
  }
});

document.getElementById("searchCityBtn").addEventListener("click", () => {
  let place = document.getElementById("inputCity").value;
  console.log(place);
});

function weatherReport(data) {
  var urlCast =
    `https://api.openweathermap.org/data/2.5/weather?q=${data.name}&` +
    `appid=${apikey}`;
  fetch(urlCast)
    .then((res) => {
      return res.json();
    })
    .then((foreCastData) => {
      console.log(foreCastData);

      hourlyForeCast(foreCastData);
      dayForCast(foreCastData);
      document.getElementById("city").innerText =
        data.name + " , " + data.sys.country;

      document.getElementById("temperature").innerText =
        Math.floor(data.main.temp - 273) + "°C";

      document.getElementById("clouds").innerText = data.weather[0].description;

      let icon = data.weather[0].icon;
      let iconUrl = "https://api.openweathermap.org/img/w/" + icon + ".png";

      document.getElementById("imgWeather").src = iconUrl;
    });
}

function hourlyForeCast(foreCastData) {
  document.querySelector(".tempList").innerHTML = "";
  for (let i = 0; i < 5; i++) {
    let date = new Date(foreCastData.dt * 1000);
    let hourR = document.createElement("div");
    hourR.setAttribute("class", "next");
    let div = document.createElement("div");
    let time = document.createElement("p");
    time.setAttribute("class", "time");
    time.innerText = date
      .toLocaleTimeString(undefined, "Asia/Kolkata")
      .replace(":00", "");

    let temp = document.createElement("p");
    temp.innerText =
      Math.floor(foreCastData.main.temp_max - 273) +
      "°C" +
      "/" +
      Math.floor(foreCastData.main.temp_min - 273) +
      "°C";

    div.appendChild(time);
    div.appendChild(temp);

    let desc = document.createElement("p");
    desc.setAttribute("class", "desc");
    desc.innerText = foreCastData.weather[0].description;

    hourR.appendChild(div);
    hourR.appendChild(desc);
    document.querySelector(".tempList");
    // appendChild(hourR);
  }
}

function dayForCast(foreCastData) {
  document.querySelector(".weekF").innerHTML = "";

  for (let i = 8; i < foreCastData.length; i += 8);

  let div = document.createElement("div");
  div.setAttribute("class", "dayF");

  let day = document.createElement("p");
  day.setAttribute("class", "date");
  day.innerText = new Date(foreCastData.dt * 1000).toDateString(
    undefined,
    "Asia/Kolkata"
  );
  //   console.log(day.innerText);
  div.appendChild(day);

  let temp = document.createElement("p");
  temp.setAttribute("class", "date");
  temp.innerText =
    Math.floor(foreCastData.main.temp_min - 273) +
    "°C" +
    "/" +
    Math.floor(foreCastData.main.temp_min - 273) +
    "°C";

  div.appendChild(temp);
  let description = document.createElement;
  ("p");
  //   description.setAttribute("class", "description");
  description.innerText = foreCastData.weather[0].description;

  //   console.log(description.innerText);
  //   div.appendChild(description);
  //   document.querySelector("weekF").appendChild(div);
}

// way to fetch api using header
//   const options = {
//     method: "GET",
//     headers: {
//       "X-Api-Key": "3bTzvZV1uyxhEziGzp7+mQ==gsfUIkuXfJiMQPWQ",
//     },
//   };

// fetc

// ("https://api.api-ninjas.com/v1/weather?city=Delhi", options);
