window.onload = function () {
    apiServerBaseAddress_g = document.getElementById("serverBaseAddressInput").value;
    var todayDate = new Date();
    var yestDate = new Date(todayDate.getTime() - 86400000);
    initializeDashboard();
    //workerTimerId_g = setInterval(fetchForecastValues, 60000);
};

function loadData() {
    clearInterval(workerTimerId_g);
    fetchForecastValues();
    workerTimerId_g = setInterval(fetchForecastValues, 60000);
}

var apiServerBaseAddress_g = 'http://wmrm0mc1:62448';
var workerTimerId_g = null;

var dashboardContainer;
var dashboard;
function initializeDashboard() {
    dashboardContainer = document.getElementById('dashboard_container');
    dashboardContainer.innerHTML = "";
    dashboard = new Dashboard();
    dashboardContainer.appendChild(dashboard.get_dashboard_div());
    var cell = new DashboardCell({width: '50%', height: '50%', dtick: 1});
    var traceObj = new LineTraceScada({server_base_address: apiServerBaseAddress_g, trace_color: 'rgb(255, 255, 0)'});
    var traceObj2 = new LineTraceScada({server_base_address: apiServerBaseAddress_g});
    cell.trace_objs.push(traceObj);
    cell.trace_objs.push(traceObj2);
    dashboard.cells.push(cell);
    var cell = new DashboardCell({width: '50%', height: '50%', dtick: 1, column: 1});
    var traceObj = new LineTraceScada(
        {
            server_base_address: apiServerBaseAddress_g,
            trace_color: 'rgb(255, 255, 0)',
            end_hrs: 0
        }
    );
    cell.trace_objs.push(traceObj);
    dashboard.cells.push(cell);
    dashboard.lay_cells();
    dashboard.refresh_cells_async(function (err, res) {
        dashboardContainer.innerHTML = dashboard.get_dashboard_div().outerHTML;
    });
    dashboard.lay_cells();
}