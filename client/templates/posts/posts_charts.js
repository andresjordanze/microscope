
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  Template.postsCharts.onRendered(function() {
    /*var chart = nv.models.lineChart()
      .useInteractiveGuideline(true)  //We want nice looking tooltips and a guideline!
      .transitionDuration(350)  //how fast do you want the lines to transition?
      .showLegend(true)       //Show the legend, allowing users to turn on/off line series.
      .showYAxis(true)        //Show the y-axis
      .showXAxis(true)        //Show the x-axis*/
    var chart = nv.models.discreteBarChart() 
      .x(function(d) { return d.x })
      .y(function(d) { return d.y })
      .staggerLabels(true)
      .tooltips(false)
      .showValues(true)
      .transitionDuration(350)
    ;

    nv.addGraph(function() {
      chart.xAxis.axisLabel('Post number').tickFormat(d3.format('d'));
      chart.yAxis.axisLabel('Comments').tickFormat(d3.format('d'));
      d3.select('#chart svg').datum(
        [{ values: People.find().fetch(), key: 'Comments' }]
      ).call(chart);
      nv.utils.windowResize(function() { chart.update(); });
      return chart;
    });

    this.autorun(function () {
      d3.select('#chart svg').datum(
        [{ values: People.find().fetch(), key: 'Comments' }]
      ).call(chart);
      chart.update();
    });

  });

  Template.postsCharts.events({
    'click #addDataButton': function() {
      var age = getRandomInt(13, 89);
      var lastPerson = People.find();
      var count = lastPerson.count();
      console.log(count);
      if (count>0) {
        People.insert({x:(count + 1), y:age});
      } else {
        People.insert({x:1, y:age});
      }
    },
    'click #removeDataButton': function() {
      var lastPerson = People.findOne({}, {fields:{x:1},sort:{x:-1},limit:1,reactive:false});
      if (lastPerson) {
        People.remove(lastPerson._id);
      }
    }
  });