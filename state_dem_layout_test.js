var trace1 = {
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    y: [10, 15, 13, 17, 46, 82, 34, 94, 75, 62],
    type: 'scatter'
};

var trace2 = {
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    y: [16, 5, 11, 9, 15, 32, 58, 41, 97, 84],
    type: 'scatter'
};

var layout = {
    margin: {
        l: 0,
        r: 20,
        b: 0,
        t: 40,
        pad: 1
    },
    paper_bgcolor: '#000000',
    plot_bgcolor: '#000000',
    yaxis: {
        showgrid: true,
        gridcolor: '#333333'
    },
    xaxis: {
        showgrid: true,
        gridcolor: '#aaaaaa'
    },
    legend: {
        orientation: 'h'
    },
    title: 'Some Title',
    titlefont: {
        color: 'rgb(200,200,200)'
    }
};

var data = [trace1, trace2];

Plotly.newPlot('dem', data, layout);
Plotly.newPlot('freq', data, layout);
Plotly.newPlot('mp', data, layout);
Plotly.newPlot('mseb', data, layout);
Plotly.newPlot('geb', data, layout);
Plotly.newPlot('cseb', data, layout);

graph = document.getElementById('dem');
graph1 = document.getElementById('freq');
graph2 = document.getElementById('mp');
graph3 = document.getElementById('mseb');
graph4 = document.getElementById('geb');
graph5 = document.getElementById('cseb');

graphList = [graph, graph1, graph2, graph3, graph4, graph5];

plotly_hover_listener = function (eventdata) {
    if (eventdata.xvals) {
        for (var i = 0; i < graphList.length; i++) {
            Plotly.Fx.hover(graphList[i], {
                xval: eventdata.xvals[0]
            });
        }
    }
};

for (var i = 0; i < graphList.length; i++) {
    graphList[i].on('plotly_hover', plotly_hover_listener);
}