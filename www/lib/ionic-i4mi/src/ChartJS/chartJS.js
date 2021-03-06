var ChartJS = function(config, vals)
{
  $config = config;


  // Change value from weekly

  if ($config['labels'] == "Day"){
      $config['labels'] = ['2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22'];
  }


  if ($config['labels'] == 'Week'){
      $config['labels'] = ['Mon', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
  }

  if ($config['labels'] == "Month "){
      $config['month'] = 2;
      $config['year'] = 2016;
      $config['labels'] = "";
  }

  if ($config['labels'] == "Year"){
      $config['labels'] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  }
  if($config['labels'] == "Custom"){
    $config['labels'] = vals;
  }
  console.log($config['labels']);
}

ChartJS.prototype.line = function() {
  new Chartist.Line($config['name'], {
    labels: $config['labels'],
    series: [
        [12, 9, 7, 8, 5, 9, 9],
        [2, 1, 3.5, 7, 3, 9, 9],
        [1, 3, 4, 5, 6, 9, 9]
      ]
    }, {
    fullWidth: $config["fullWidth"],
    low: 0,
    showArea: $config["showArea"],
    chartPadding: {
      right: 40
    }
  });
};

//Change
ChartJS.prototype.bar = function(series) {
  var data = {
    labels: $config['labels'],
    series: [
      series
    ]
  };

  var options = {
    seriesBarDistance: 10
  };

  var responsiveOptions = [
    ['screen and (max-width: 640px)', {
      seriesBarDistance: 5,
      axisX: {
        labelInterpolationFnc: function (value) {
          return value[0];
        }
      }
    }]
  ];

  new Chartist.Bar($config['name'], data, options, responsiveOptions);
};

ChartJS.prototype.pie = function(data) {
  var sum = function(a, b) { return a + b };
  new Chartist.Pie('.ct-chartPie', data, {
    labelInterpolationFnc: function(value) {
      return Math.round(value / data.series.reduce(sum) * 100) + '%';
    }
  });

};
