window.onload = function () {
    apiServerBaseAddress_g = document.getElementById("serverBaseAddressInput").value;
	var todayDate = new Date();
	var yestDate = new Date(todayDate.getTime() - 86400000);
	initializePlotDiv();
    fetchForecastValues();
    workerTimerId_g = setInterval(fetchForecastValues, 60000);
};

function loadData() {
	clearInterval(workerTimerId_g);
	fetchForecastValues();
	workerTimerId_g = setInterval(fetchForecastValues, 60000);
}

var apiServerBaseAddress_g = 'http://wmrm0mc1:62448';
var workerTimerId_g = null;