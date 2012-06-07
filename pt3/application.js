function rgb2hsb(rgb) {
  var x, f, i, hue, sat, val;
  rgb[0]/=255;
  rgb[1]/=255;
  rgb[2]/=255;
  x = Math.min(Math.min(rgb[0], rgb[1]), rgb[2]);
  val = Math.max(Math.max(rgb[0], rgb[1]), rgb[2]);
  if (x==val){
  return(new Array(undefined,0,val*100));
  }
  f = (rgb[0] == x) ? rgb[1]-rgb[2] : ((rgb[1] == x) ? rgb[2]-rgb[0] : rgb[0]-rgb[1]);
  i = (rgb[0] == x) ? 3 : ((rgb[1] == x) ? 5 : 1);
  hue = Math.floor((i-f/(val-x))*60)%360;
  sat = Math.floor(((val-x)/val)*100);
  val = Math.floor(val*100);
  return(new Array(hue,sat,val));
}

jQuery(document).ready(function($) {
  $('.event').bind('click', function() {
    // console.log($(this));
    var $data = $(this).attr('data-text') + " #" + $(this).attr('data-htag');
    window.open('http://twitter.com/share?source=tweetbutton&text=' + encodeURIComponent($data + " #praticg12 #conf1"),'','width=500,height=170,personalbar=0,toolbar=0,scrollbars=1,resizable=1');
  });

  // ---------------------------------------------------------------------------------------------------------------
  //
  // Generate Circle function
  //
  // ---------------------------------------------------------------------------------------------------------------
  var generateCircle = function (options) {
      var paper = Raphael("test");

      paper.customAttributes.segment = function (x, y, r, a1, a2) {
          var flag = (a2 - a1) > 180,
              clr = (a2 - a1) / 360;
          a1 = (a1 % 360) * Math.PI / 180;
          a2 = (a2 % 360) * Math.PI / 180;

          var rgb = new Array();
          rgb[0] = options.color >> 16;
          rgb[1]= options.color >> 8 & 0xFF;
          rgb[2] = options.color & 0xFF;
          var hsb=(rgb2hsb(rgb));

          return {
              path: [["M", x, y], ["l", r * Math.cos(a1), r * Math.sin(a1)], ["A", r, r, 0, +flag, 1, x + r * Math.cos(a2), y + r * Math.sin(a2)], ["z"]],
              fill: "hsb("+hsb+")"
          };
      };

      function animate(ms) {
          var start = 0,
              val;
          for (i = 0; i < ii; i++) {
              val = 360 / total * options.data[i];
              paths[i].animate({segment: [options.cx, options.cy, options.r, start, start += val]}, ms || 1500, "bounce");
              paths[i].angle = start - val / 2;
          }
      }

      var paths = paper.set(),
          total,
          start,
          bg = paper.circle(options.cx, options.cy, 0).attr({stroke: "#"+options.color, "stroke-width": 7.95, "stroke-miterlimit":10});
      options.data = options.data.sort(function (a, b) { return b - a; });

      total = 0;
      for (var i = 0, ii = options.data.length; i < ii; i++) {
          total += options.data[i];
      }
      start = 0;
      for (i = 0; i < ii; i++) {
          var val = 360 / total * options.data[i];
          (function (i, val) {
              paths.push(paper.path().attr({segment: [options.cx, options.cy, 1, start, start + val], stroke: "#"+options.color}));
          })(i, val);
          start += val;
      }
      bg.animate({r: options.r}, 1000, "bounce");
      animate(1000);
  };
  // ---------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------

  // Get datas
  var twitter_search = "https://search.twitter.com/search.json?callback=?&q="+encodeURIComponent("#praticg12 #conf1")+"&amp;rpp=1000&amp;include_entities=true&amp;result_type=mixed";
  var tweets_data = {};

  var loadApplication = function() {
    $.getJSON(twitter_search, function(data) {

      $.each(data.results, function(key, val) {
        tweets_data = val.text;
      });

      generateCircle({data: [40, 92, 10, 24, 52, 78, 99, 82, 5], color: "FF0642", cx: 140.312, cy: 219.614, r: 102.215 });
      generateCircle({data: [21, 92, 24, 52, 99, 82, 27], color: "0074FF", cx: 414.756, cy: 459.354, r: 72.541 });
      generateCircle({data: [2, 92, 78, 99, 82, 27], color: "8BD0EC", cx: 363.541, cy: 405.216, r: 150 });
      generateCircle({data: [4, 92, 24, 52, 78, 99, 10, 27], color: "F792A6", cx: 183.975, cy: 264.418, r: 168.41 });
      // <circle fill="none" stroke="#F792A6" stroke-width="6.7612" stroke-miterlimit="10" cx="183.975" cy="264.418" r="168.41"></circle>
      // <circle fill="none" stroke="#FF0642" stroke-width="1.1357" stroke-miterlimit="10" cx="140.312" cy="219.614" r="102.215" class="event" data-htag="++"></circle>
      // <circle fill="none" stroke="#0074FF" stroke-width="4.5429" stroke-miterlimit="10" cx="414.756" cy="459.354" r="72.541"></circle>

      // $('<ul/>', {
      //   'class': 'my-new-list',
      //   html: tweets_data.join('')
      // }).appendTo('#test');
      console.log(tweets_data);
    })
    .success(function() { console.log("second success"); })
    .error(function() { alert("Error: can't load twitter datas"); })
    .complete(function() { console.log("complete"); });
  };

  loadApplication();
  setInterval(function() {loadApplication()}, 20000);

});