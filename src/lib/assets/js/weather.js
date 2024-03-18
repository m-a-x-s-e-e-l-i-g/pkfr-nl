async function getLatLng(address) {
    if (!address) {
        return { lat: 52.16595492492291, lng: 5.384700215271523 };
    }
    const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`);
    const data = await response.json();
    if (data.results && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        return { lat: location.lat, lng: location.lng };
    } else {
        return { lat: 52.16595492492291, lng: 5.384700215271523 };
    }
}

export async function getWeatherData(address, timestamp) {
    const fourDaysFromNow = Math.floor(Date.now() / 1000) + 4 * 24 * 60 * 60;
    if (timestamp > fourDaysFromNow || !timestamp) {
        return;
    }

    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
    const { lat, lng } = await getLatLng(address);
    const url = `https://api.openweathermap.org/data/3.0/onecall/timemachine?lat=${lat}&lon=${lng}&dt=${timestamp}&units=metric&lang=nl&appid=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();
    return data;
}