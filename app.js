Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3OWFiYTk2YS05ODNjLTRhOGMtYjAxMi1hZTZlNTBiZjhhNjciLCJpZCI6MjIwMjE2LCJpYXQiOjE3MTc1Nzc1MjZ9.YlTuNHJxUCMwExzJ6lFkXv2whLH8llfgBtPSBtCpzFE';
var viewer = new Cesium.Viewer('cesiumContainer');

var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

var openWeatherApiKey = '6e625337939dcb6a3496cdd2cc67145a';

handler.setInputAction(function (movement) {
    var cartesian = viewer.camera.pickEllipsoid(movement.position, viewer.scene.globe.ellipsoid);
    if (cartesian) {
        var cartographic = Cesium.Ellipsoid.WGS84.cartesianToCartographic(cartesian);
        var latitude = Cesium.Math.toDegrees(cartographic.latitude);
        var longitude = Cesium.Math.toDegrees(cartographic.longitude);
        console.log('Latitude: ' + latitude + ', Longitude: ' + longitude);
        fetchTemperature(latitude, longitude);
    } else {
        console.log('No cartesian coordinates found for the clicked position.');
    }
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);

function fetchTemperature(latitude, longitude) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${openWeatherApiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const temperature = data.main.temp;
            const location = data.name || `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`;
            displayTemperature(location, temperature);
        })
        .catch(error => console.error('Error fetching temperature data:', error));
}

function displayTemperature(location, temperature) {
    const temperatureDiv = document.getElementById('temperature');
    temperatureDiv.innerHTML = `Temperature at ${location}: ${temperature} °C`;
}
