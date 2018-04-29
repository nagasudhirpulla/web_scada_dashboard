window.onload = function () {
    apiServerBaseAddress_g = document.getElementById("serverBaseAddressInput").value;
	var todayDate = new Date();
	document.getElementById('dateInput').value = todayDate.getFullYear() + "-" + makeTwoDigits(todayDate.getMonth() + 1) + "-" + makeTwoDigits(todayDate.getDate());
    initializePlotDiv();
    fetchForecastValues();
    workerTimerId_g = setInterval(fetchForecastValues, 60000);
};

function loadData() {
	clearInterval(workerTimerId_g);
	fetchForecastValues();
	workerTimerId_g = setInterval(fetchForecastValues, 60000);
}

function makeTwoDigits(x) {
    if (x < 10) {
        return "0" + x;
    }
    else {
        return x;
    }
}

var apiServerBaseAddress_g = 'http://wmrm0mc1:62448';
var workerTimerId_g = null;
var div_ids_g = ['dem', 'freq', 'geb', 'mseb', 'mp', 'cseb'];
/*
 The convention for trace number is: today - 0, yesterday - 0, forecast - 2
 */
var payLoadSources_g = [
    {
        name: 'FORECAST_FOR_TODAY',
        plot_title: 'WR DEMAND',
        div_id: 'dem',
        trace_num: 2,
        fetch_period: 'today_full',
        history_fetch_strategy: 'average',
        pnt_id: 'WRLDCMP.SCADA1.A0003021',
        url: createUrl(apiServerBaseAddress_g, 'WRLDCMP.SCADA1.A0003021', 'history', '', '', 60, 'snap')
    },
    {
        name: 'DEMAND_TODAY',
        plot_title: 'WR DEMAND',
        div_id: 'dem',
        trace_num: 0,
        fetch_period: 'today',
        history_fetch_strategy: 'average',
        pnt_id: 'WRLDCMP.SCADA1.A0047000',
        url: createUrl(apiServerBaseAddress_g, 'WRLDCMP.SCADA1.A0047000', 'history', '', '', 60, 'snap')
    },
    {
        name: 'DEMAND_YESTERDAY',
        plot_title: 'WR DEMAND',
        div_id: 'dem',
        trace_num: 1,
        fetch_period: 'yest',
        history_fetch_strategy: 'average',
        pnt_id: 'WRLDCMP.SCADA1.A0047000',
        url: createUrl(apiServerBaseAddress_g, 'WRLDCMP.SCADA1.A0047000', 'history', '', '', 60, 'snap')
    },
    {
        name: 'FREQ_YESTERDAY',
        plot_title: 'WR FREQUENCY',
        div_id: 'freq',
        trace_num: 1,
        fetch_period: 'yest',
        history_fetch_strategy: 'snap',
        pnt_id: 'WRLDCMP.SCADA1.A0036324',
        url: createUrl(apiServerBaseAddress_g, 'WRLDCMP.SCADA1.A0036324', 'history', '', '', 60, 'snap')
    },
    {
        name: 'FREQ_TODAY',
        plot_title: 'WR FREQUENCY',
        div_id: 'freq',
        trace_num: 0,
        fetch_period: 'today',
        history_fetch_strategy: 'snap',
        pnt_id: 'WRLDCMP.SCADA1.A0036324',
        url: createUrl(apiServerBaseAddress_g, 'WRLDCMP.SCADA1.A0036324', 'history', '', '', 60, 'snap')
    },
    {
        name: 'GUJARAT_TODAY',
        plot_title: 'GUJARAT DEMAND',
        div_id: 'geb',
        trace_num: 0,
        fetch_period: 'today',
        history_fetch_strategy: 'average',
        pnt_id: 'WRLDCMP.SCADA1.A0046957',
        url: createUrl(apiServerBaseAddress_g, 'WRLDCMP.SCADA1.A0046957', 'history', '', '', 60, 'snap')
    },
    {
        name: 'GUJARAT_YEST',
        plot_title: 'GUJARAT DEMAND',
        div_id: 'geb',
        trace_num: 1,
        fetch_period: 'yest',
        history_fetch_strategy: 'average',
        pnt_id: 'WRLDCMP.SCADA1.A0046957',
        url: createUrl(apiServerBaseAddress_g, 'WRLDCMP.SCADA1.A0046957', 'history', '', '', 60, 'snap')
    },
    {
        name: 'MAH_TODAY',
        plot_title: 'MAHARASHTRA DEMAND',
        div_id: 'mseb',
        trace_num: 0,
        fetch_period: 'today',
        history_fetch_strategy: 'average',
        pnt_id: 'WRLDCMP.SCADA1.A0046980',
        url: createUrl(apiServerBaseAddress_g, 'WRLDCMP.SCADA1.A0046980', 'history', '', '', 60, 'snap')
    },
    {
        name: 'MAH_YEST',
        plot_title: 'MAHARASHTRA DEMAND',
        div_id: 'mseb',
        trace_num: 1,
        fetch_period: 'yest',
        history_fetch_strategy: 'average',
        pnt_id: 'WRLDCMP.SCADA1.A0046980',
        url: createUrl(apiServerBaseAddress_g, 'WRLDCMP.SCADA1.A0046980', 'history', '', '', 60, 'snap')
    },
    {
        name: 'MP_TODAY',
        plot_title: 'MP DEMAND',
        div_id: 'mp',
        trace_num: 0,
        fetch_period: 'today',
        history_fetch_strategy: 'average',
        pnt_id: 'WRLDCMP.SCADA1.A0046978',
        url: createUrl(apiServerBaseAddress_g, 'WRLDCMP.SCADA1.A0046978', 'history', '', '', 60, 'snap')
    },
    {
        name: 'MP_YEST',
        plot_title: 'MP DEMAND',
        div_id: 'mp',
        trace_num: 1,
        fetch_period: 'yest',
        history_fetch_strategy: 'average',
        pnt_id: 'WRLDCMP.SCADA1.A0046978',
        url: createUrl(apiServerBaseAddress_g, 'WRLDCMP.SCADA1.A0046978', 'history', '', '', 60, 'snap')
    },
    {
        name: 'CSEB_TODAY',
        plot_title: 'CHHATTISGARH DEMAND',
        div_id: 'cseb',
        trace_num: 0,
        fetch_period: 'today',
        history_fetch_strategy: 'average',
        pnt_id: 'WRLDCMP.SCADA1.A0046945',
        url: createUrl(apiServerBaseAddress_g, 'WRLDCMP.SCADA1.A0046945', 'history', '', '', 60, 'snap')
    },
    {
        name: 'CSEB_YEST',
        plot_title: 'CHHATTISGARH DEMAND',
        div_id: 'cseb',
        trace_num: 1,
        fetch_period: 'yest',
        history_fetch_strategy: 'average',
        pnt_id: 'WRLDCMP.SCADA1.A0046945',
        url: createUrl(apiServerBaseAddress_g, 'WRLDCMP.SCADA1.A0046945', 'history', '', '', 60, 'snap')
    }];

function fetchForecastValues() {
	var todayDate = new Date();
	var isToday = true;
    // if the input date is of today, then continue, else take new value
	var inpDate = new Date(document.getElementById('dateInput').value+"T00:00:00");
	if(todayDate.getFullYear() + "-" + (todayDate.getMonth() + 1) + "-" + todayDate.getDate() != inpDate.getFullYear() + "-" + (inpDate.getMonth() + 1) + "-" + inpDate.getDate()){
		todayDate = new Date(document.getElementById('dateInput').value+"T00:00:00");
		isToday = false;
	}
	var yestDate = new Date(todayDate.getTime() - 86400000);
    var tomDate = new Date(todayDate.getTime() + 86400000);

    var todayDateStr = makeTwoDigits(todayDate.getDate()) + "/" + makeTwoDigits(todayDate.getMonth() + 1) + "/" + todayDate.getFullYear();
    var yestDateStr = makeTwoDigits(yestDate.getDate()) + "/" + makeTwoDigits(yestDate.getMonth() + 1) + "/" + yestDate.getFullYear();
    var tommDateStr = makeTwoDigits(tomDate.getDate()) + "/" + makeTwoDigits(tomDate.getMonth() + 1) + "/" + tomDate.getFullYear();
    var curTime = makeTwoDigits(todayDate.getHours()) + ":" + makeTwoDigits(todayDate.getMinutes());

    for (var i = 0; i < payLoadSources_g.length; i++) {
        var start_time_str, end_time_str = null;
        if (payLoadSources_g[i].fetch_period == 'yest') {
            start_time_str = yestDateStr + "/00:00:00";
            end_time_str = todayDateStr + "/00:00:00";
        } else if (payLoadSources_g[i].fetch_period == 'today_full') {
            start_time_str = todayDateStr + "/00:00:00";
            end_time_str = tommDateStr + "/00:00:00";
        } else {
            start_time_str = todayDateStr + "/00:00:00";
			if(isToday){
				end_time_str = todayDateStr + "/" + curTime + ":00";
			} else{
				end_time_str = tommDateStr + "/00:00:00";
			}            
        }
        payLoadSources_g[i].url = createUrl(apiServerBaseAddress_g, payLoadSources_g[i].pnt_id, 'history', start_time_str, end_time_str, 60, payLoadSources_g[i].history_fetch_strategy);
    }

    /* Get the all scada values from API start */
    async.mapSeries(payLoadSources_g, fetchScadaValue, function (err, results) {
        if (err) {
            // handle error - do nothing since the all values are not fetched
            //WriteLineConsole("All values not fetched via API due to error: " + JSON.stringify(err));
            return;
        }
        //All the values are available in the results Array
        for (var i = 0; i < results.length; i++) {
            var plotDiv = document.getElementById(payLoadSources_g[i].div_id);
			//document.getElementById(payLoadSources_g[i].div_id).layout.title = (payLoadSources_g[i]).plot_title + " " + curTime;
            // get trace number from payload object
            var trace_num = payLoadSources_g[i].trace_num;
            document.getElementById(payLoadSources_g[i].div_id).data[trace_num].y = [];
            var demObjects = results[i];
            for (var k = 0; k < demObjects.length; k++) {
                document.getElementById(payLoadSources_g[i].div_id).data[trace_num].y.push(demObjects[k].dval);
            }
        }
        // now plot all the the divs
        for (var i = 0; i < div_ids_g.length; i++) {
            Plotly.redraw(document.getElementById(div_ids_g[i]));
        }
    });
    /* Get the all scada values from API end */
}

function fetchScadaValue(urlStrObj, callback) {
    var urlStr = urlStrObj.url;
    $.ajax({
        //fetch revisions data from sever
        url: urlStr,
        type: "GET",
        success: function (data) {
            //WriteLineConsole(urlStr);
            //WriteLineConsole(JSON.stringify(data));
            callback(null, data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            WriteLineConsole(JSON.stringify(jqXHR));
            console.log(textStatus, errorThrown);
            callback(textStatus);
        }
    });
}

function initializePlotDiv() {
    var oneMinuteLabels = Array.apply(null, {length: 1440}).map(Function.call, function (k) {
        return getTimeStringFromMinutes(k);
    });

    var dem_forecast_trace = {
        x: oneMinuteLabels,
        y: [],
        line: {
            width: 2
        },
        name: 'Forecast'
    };
    var dem_trace = {
        x: oneMinuteLabels,
        y: [],
        line: {
            color: 'rgb(255,255,0)',
            width: 3
        },
        name: 'Demand'
    };
    var dem_yest_trace = {
        x: oneMinuteLabels,
        y: [],
        line: {
            color: 'rgb(255,0,0)',
            width: 2
        },
        name: 'Yesterday Demand'
    };

    var freq_yest_trace = {
        x: oneMinuteLabels,
        y: [],
        line: {
            width: 2,
            color: 'rgb(255,0,0)'
        },
        name: 'Yesterday Freq'
    };

    var freq_trace = {
        x: oneMinuteLabels,
        y: [],
        line: {
            width: 1.5,
            color: 'rgb(255,255,0)'
        },
        name: 'Today Freq'
    };

    var geb_yest_trace = {
        x: oneMinuteLabels,
        y: [],
        line: {
            width: 2,
            color: 'rgb(255,0,0)'
        },
        name: 'GUJ Yest Demand'
    };

    var geb_trace = {
        x: oneMinuteLabels,
        y: [],
        line: {
            width: 1.5,
            color: 'rgb(255,255,0)'
        },
        name: 'GUJ Demand'
    };

    var mah_yest_trace = {
        x: oneMinuteLabels,
        y: [],
        line: {
            width: 2,
            color: 'rgb(255,0,0)'
        },
        name: 'MAH Yest Demand'
    };

    var mah_trace = {
        x: oneMinuteLabels,
        y: [],
        line: {
            width: 1.5,
            color: 'rgb(255,255,0)'
        },
        name: 'MAH Demand'
    };

    var mp_yest_trace = {
        x: oneMinuteLabels,
        y: [],
        line: {
            width: 2,
            color: 'rgb(255,0,0)'
        },
        name: 'MP Yest Demand'
    };

    var mp_trace = {
        x: oneMinuteLabels,
        y: [],
        line: {
            width: 1.5,
            color: 'rgb(255,255,0)'
        },
        name: 'MP Demand'
    };

    var cseb_yest_trace = {
        x: oneMinuteLabels,
        y: [],
        line: {
            width: 2,
            color: 'rgb(255,0,0)'
        },
        name: 'CSEB Yest Demand'
    };

    var cseb_trace = {
        x: oneMinuteLabels,
        y: [],
        line: {
            width: 1.5,
            color: 'rgb(255,255,0)'
        },
        name: 'CSEB Demand'
    };


    var freq_upper_lim_trace = {
        x: ['00:00', "23:59"],
        y: [50.05, 50.05],
        line: {
            width: 1.5,
            color: 'rgb(120,120,0)',
            dash: 'line'
        },
        name: ''
    };

    var freq_lower_lim_trace = {
        x: ['00:00', "24:00"],
        y: [49.9, 49.9],
        line: {
            width: 1.5,
            color: 'rgb(120,120,0)',
            dash: 'line'
        },
        name: ''
    };

    var common_layout_opts = {
        title: "State Demands Yest Vs Today",
        plot_bgcolor: 'rgb(0,0,0)',
        paper_bgcolor: 'rgb(0,0,0)',
        xaxis: {
            dtick: 120,
            tickcolor: 'rgb(100,100,100)',
            tickfont: {
                /*size: 25,*/
                color: 'rgb(200,200,200)'
            },
            gridcolor: '#333333'
        },
        yaxis: {
            title: "MW",
            tickcolor: 'rgb(100,100,100)',
            tickfont: {
                /*size: 25,*/
                color: 'rgb(200,200,200)'
            },
            titlefont: {
                size: 20,
                color: '#000000'
            },
            gridcolor: '#333333'
        },
        margin: {l: 50, pad: 1, t: 0, r: 0},
        legend: {
            orientation: 'h',
            font: {
                size: 20,
                color: 'rgb(200,200,200)'
            }
        },
        titlefont: {
            /*size: 35,*/
            color: 'rgb(200,200,200)'
        }
    };

    /**
     * The order of traces should be
     * Today, Yest, Forecast
     */
    var trace_sets = [
        {div_id: 'dem', traces: [dem_trace, dem_yest_trace, dem_forecast_trace]},
        {div_id: 'freq', traces: [freq_trace, freq_yest_trace, freq_upper_lim_trace, freq_lower_lim_trace]},
        {div_id: 'geb', traces: [geb_trace, geb_yest_trace]},
        {div_id: 'mseb', traces: [mah_trace, mah_yest_trace]},
        {div_id: 'mp', traces: [mp_trace, mp_yest_trace]},
        {div_id: 'cseb', traces: [cseb_trace, cseb_yest_trace]}
    ];

    for (var i = 0; i < trace_sets.length; i++) {
        var demPlotDiv = document.getElementById(trace_sets[i].div_id);
        var plotData = trace_sets[i].traces;
        Plotly.newPlot(demPlotDiv, plotData, common_layout_opts);
    }

    // Coupled hover
    var plotly_hover_listener = function (eventdata) {
        if (eventdata.xvals) {
            for (var i = 0; i < trace_sets.length; i++) {
                Plotly.Fx.hover(document.getElementById(trace_sets[i].div_id), {
                    xval: eventdata.xvals[0]
                });
            }
        }
    };

    for (var i = 0; i < trace_sets.length; i++) {
        document.getElementById(trace_sets[i].div_id).on('plotly_hover', plotly_hover_listener);
    }
}

function createUrl(serverBaseAddress, pnt, historyType, strtime, endtime, secs, type) {
    var url = "";
    if (historyType == "real") {
        url = serverBaseAddress + "/api/values/" + historyType + "?pnt=" + pnt;
    } else if (historyType == "history") {
        url = serverBaseAddress + "/api/values/" + historyType + "?pnt=" + pnt + "&strtime=" + strtime + "&endtime=" + endtime + "&secs=" + secs + "&type=" + type;
    }
    //WriteLineConsole(url);
    return url;
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
function makeTwoDigits(x) {
    if (x < 10) {
        return "0" + x;
    }
    else {
        return x;
    }
}

function getTimeStringFromMinutes(m) {
    var hrs = parseInt(m / 60);
    var mins = m - hrs * 60;
    return makeTwoDigits(hrs) + ":" + makeTwoDigits(mins);
    //return makeTwoDigits(hrs) + " HRS";
}