const inputValue = document.querySelector(".inputValue");
const button = document.querySelector(".button");
const temp = document.querySelector(".temp");
const desc = document.querySelector(".para");
const wind = document.querySelector(".wind");

const weatherApi = async function () {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${inputValue.value}&units=metric&appid=108dd9a67c96f23039937fe6f3c91963`
    );
    const data = await res.json();
    displayWeather(data);
    console.log(data);
  } catch (err) {
    alert("City Not Found");
  }
};
``;

button.addEventListener("click", weatherApi);

const displayWeather = function (weather) {
  temp.textContent = `${weather.main.temp}°C`;
  desc.textContent = `${weather.weather[0].main}`;
};

inputValue.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.querySelector(".button").click();
  }
});

console.log(ali);
var ali = "ali";
