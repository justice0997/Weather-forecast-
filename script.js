const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const cityNameEl = document.getElementById('city-name');
const temperatureEl = document.getElementById('temperature');
const descriptionEl = document.getElementById('description');

searchBtn.addEventListener('click', async () => {
    const city = cityInput.value.trim();
    if (!city) return;

    cityNameEl.textContent = "Loading...";
    temperatureEl.textContent = "--";
    descriptionEl.textContent = "Please wait";

    try {
        const targetUrl = `https://wttr.in/${encodeURIComponent(city)}?format=j1`;
        const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`;
        
        const response = await fetch(proxyUrl);
        if (!response.ok) throw new Error("Network response was not ok");
        
        const data = await response.json();
        
        const current = data.current_condition[0];
        const area = data.nearest_area[0].areaName[0].value;
        const country = data.nearest_area[0].country[0].value;
        
        cityNameEl.textContent = `${area}, ${country}`;
        temperatureEl.textContent = current.temp_C;
        descriptionEl.textContent = current.weatherDesc[0].value;
    } catch (err) {
        cityNameEl.textContent = "Error";
        temperatureEl.textContent = "--";
        descriptionEl.textContent = "Could not fetch weather.";
    }
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});
