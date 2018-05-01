window.onload = function () {
    apiServerBaseAddress_g = document.getElementById("serverBaseAddressInput").value;
    initializeDashboard();
    refreshDashboardData();
    workerTimerId_g = setInterval(refreshDashboardData, 60000);

};

function refreshDashboardData() {
    dashboard.refresh_cells_async(function (err) {

    });
}

function loadData() {
    clearInterval(workerTimerId_g);
    refreshDashboardData();
    workerTimerId_g = setInterval(refreshDashboardData, 60000);
}

var apiServerBaseAddress_g = 'http://wmrm0mc1:62448';
var workerTimerId_g = null;

var dashboardContainer;
var dashboard;
function initializeDashboard() {
    dashboardContainer = document.getElementById('dashboard_container');
    dashboardContainer.innerHTML = "";

    // create cells from dashboardConfig
    var cellObjs = [];
    for (var cellIter = 0; cellIter < dashboardConfig.cell_props.length; cellIter++) {
        // get the trace objects of this cell
        var traceObjects = [];
        for (var traceIter = 0; traceIter < dashboardConfig.cell_props[cellIter].trace_props.length; traceIter++) {
            traceObjects.push(new LineTraceScada(dashboardConfig.cell_props[cellIter].trace_props[traceIter]));
        }
        dashboardConfig.cell_props[cellIter].trace_objs = traceObjects;
        cellObjs.push(new DashboardCell(dashboardConfig.cell_props[cellIter]));
    }
    dashboard = new Dashboard({cells: cellObjs});
    dashboardContainer.appendChild(dashboard.get_dashboard_div());
    dashboard.lay_cells();
    dashboard.refresh_cells_async(function (err, res) {

    });
}

function toggleToolbar(){
	var hoverContainers = document.getElementsByClassName("modebar modebar--hover");
	for(var i = 0; i < hoverContainers.length; i++){
		var hoverContainer = hoverContainers[i];
		var currDisplay = hoverContainer.style.display;
		if(currDisplay != "none"){
			hoverContainer.style.display = "none";
		}else{
			hoverContainer.style.display = "";
		}
	}
}
