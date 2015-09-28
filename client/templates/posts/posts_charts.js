/*
 * Function to draw the area chart
 */
function builtArea() {

    $('#container-area').highcharts({
        
        chart: {
            type: 'area'
        },
        
        title: {
            text: 'Comments on posts'
        },
        
        credits: {
            enabled: false
        },
        
        xAxis: {
            allowDecimals: false,
            labels: {
                formatter: function () {
                    return this.value; // clean, unformatted number for year
                }
            }
        },
        
        yAxis: {
            title: {
                text: 'Number of comments'
            },
            labels: {
                formatter: function () {
                    return this.value / 1000 + 'k';
                }
            }
        },
        
        tooltip: {
            pointFormat: '{series.name} produced <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
        },
        
        plotOptions: {
            area: {
                pointStart: 1,
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 2,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        
        series: [{
            name: 'Posts',
            data: Posts.find()
        }]
    });
}

/*
 * Call the function to built the chart when the template is rendered
 */
Template.postsCharts.rendered = function() {    
    builtArea();
}