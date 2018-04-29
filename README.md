# Strategy to achieve a grid style layout from config json object

The whole dashboard is a container div with ```display: table;``` attribute 

and the rows will be a row div with css ```display: table-row;``` 

and the cells will be a cell div with css ```display: table-cell;```

refer this link
https://snook.ca/archives/html_and_css/getting_your_di

The workflow would be to read the cell rows and columns and sort them as rows and cells and them into the container div 

with layout properties (like width, height, padding) derived from config json.

The trace properties would be
```json
{        name: 'FORECAST_FOR_TODAY',
         plot_title: 'WR DEMAND',
         div_id: 'dem',
         trace_num: 2,
         fetch_period: 'today_full',
         history_fetch_strategy: 'average',
         pnt_id: 'WRLDCMP.SCADA1.A0003021',
         url: createUrl(apiServerBaseAddress_g, 'WRLDCMP.SCADA1.A0003021', 'history', '', '', 60, 'snap')
}
```

The trace layout properties would be
```json
{        width: '50%',
         height: '33%',
         padding: '0',
         row: 1,
         column: 1
}
```
