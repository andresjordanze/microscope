
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  Template.postsCharts.onRendered(function() {
    /*var chart = nv.models.lineChart()
      .useInteractiveGuideline(true)  //We want nice looking tooltips and a guideline!
      .showLegend(true)       //Show the legend, allowing users to turn on/off line series.
      .showYAxis(true)        //Show the y-axis
      .showXAxis(true)        //Show the x-axis*/
    var chart = nv.models.discreteBarChart() 
      .x(function(d) { return d.x })
      .y(function(d) { return d.y })
      .staggerLabels(true)
      .tooltips(false)
      .showValues(true)
    ;

    nv.addGraph(function() {
      chart.xAxis.axisLabel('Post number').tickFormat(d3.format('d'));
      chart.yAxis.axisLabel('Comments').tickFormat(d3.format('d'));
      d3.select('#chart svg').datum(
        [{ values: Posts.find().fetch(), key: 'Comments' }]
      ).call(chart);
      nv.utils.windowResize(function() { chart.update(); });
      return chart;
    });

    this.autorun(function () {
      d3.select('#chart svg').datum(
        [{ values: Posts.find().fetch(), key: 'Comments' }]
      ).call(chart);
      chart.update();
    });

  });

  Template.postsCharts.events({
    'click #addDataButton': function() {
      var age = getRandomInt(13, 89);
      var lastPost = Posts.find();
      var count = lastPost.count();
      console.log(count);
      if (count>0) {
        Post.insert({x:(count + 1), y:age});
      } else {
        Post.insert({x:1, y:age});
      }
    },
    'click #removeDataButton': function() {
      var lastPost = Posts.findOne({}, {fields:{x:1},sort:{x:-1},limit:1,reactive:false});
      if (lastPost) {
        Posts.remove(lastPost._id);
      }
    }
  });