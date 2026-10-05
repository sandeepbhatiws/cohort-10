const getWeather = async() => {
    var city = document.getElementById('city').value;

    var weatherData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0f2fb94282ad6a3dbf2387c407b74806&units=metric`)
    
    weatherData = await weatherData.json();

    document.getElementById('temperature').innerText = weatherData.main.temp+'°';
    document.getElementById('weather').innerText = weatherData.weather[0].main;
    document.getElementById('city_name').innerText = weatherData.name;

    document.getElementById('humidity').innerText = weatherData.main.humidity+'%';
    document.getElementById('wind').innerText = weatherData.wind.speed+' km/h';
    document.getElementById('feels_like').innerText = weatherData.main.feels_like+'°';

    const timestamp = weatherData.sys.sunrise; // Unix timestamp (seconds)
    const time = new Date(timestamp * 1000).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });

    document.getElementById('sunrise').innerText = time;

}

//https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric`;