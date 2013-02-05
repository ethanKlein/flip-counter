var timer = {
  started: false,
  paused: false, 
  secondCount: 0,
  pausedSecond: 0,
  paused10Second: 0,
  pausedMinute: 0,
  setup: function() {

    $('.flip').jrumble();

    $('.start').click(function() {
      if (!timer.started) {
        timer.go();        
      } else {
        timer.reset();
      }

    }); 
    $('body').keyup(function(e){
       if(e.keyCode == 32){
          if (!timer.started) {
            timer.go();        
          } else if (!timer.paused) {
            timer.pause();
          } else {
            timer.resume();
          }
       }
    });

    $('.pause').click(function() {
      timer.pause();
    });

    $('.reset').click(function() {
      timer.reset();
    });


  },

  pause: function() {
    window.clearInterval(timer.interval3);
    window.clearInterval(timer.interval2);
    window.clearInterval(timer.interval1);

    timer.pausedSecond = parseInt($('.secondPlay .active .up .inn').text(), 10);
    timer.paused10Second = parseInt($('.minutePlay .active .up .inn').text(), 10);
    timer.pausedMinute = parseInt($('.minutePlay2 .active .up .inn').text(), 10); 

    timer.paused = true;

  },

  reset: function() {
    location.reload(true);
  },

  resume: function() {

    timer.secondInterval();

    var oneTime10Second = setTimeout(function () {
      timer.minutePlay();
      timer.second10Interval();
    }, (timer.pausedSecond + 1) * 1000);

    var oneTimeMinute = setTimeout(function () {
      timer.minutePlay2();
      timer.minuteInterval();
    }, ((timer.paused10Second) * 10000) + ((timer.pausedSecond + 1) * 1000)  );

    timer.paused = false;

  },

  secondInterval: function() {
    timer.interval3 = setInterval(function () {
        timer.secondPlay();
    }, 1000);    
  },

  second10Interval: function() {
    timer.interval2 = setInterval(function () {
        timer.minutePlay();
    }, 10000);
  },

  minuteInterval: function() {
    timer.interval1 = setInterval(function () {
        timer.minutePlay2();
    }, 60000);    
  },

  go: function() {
      if (!timer.started) {
        timer.secondPlay();
        timer.minutePlay();
        timer.minutePlay2();
        timer.started = true;
      }

      timer.secondInterval();
      timer.second10Interval();
      timer.minuteInterval();
  },

  checkEndOfCountdown: function() {

    if (timer.secondCount === 60 || timer.secondCount === 300) {
      document.getElementById('sound').play();
      $('.flip').trigger('startRumble');;  
    }

    if (timer.secondCount === 65 || timer.secondCount === 85) {
      $('.flip').trigger('stopRumble');;  
    }

    // end of the countdown (for IDEO workshop)
    if (timer.secondCount === 300) {
      timer.pause();
      setTimeout(function() {
        timer.reset();
      }, 5000);
    }    

    // var second = parseInt($('.secondPlay .active .up .inn').text(), 10); 
    // var second10 = parseInt($('.minutePlay .active .up .inn').text(), 10);
    // var minute = parseInt($('.minutePlay2 .active .up .inn').text(), 10);

    // console.log(minute + ' ' + second10 + ' ' + second);

    // if ((minute === 0) && (second10 === 0) && (second === 0)) {
    //   document.getElementById('sound').play();
    // }

  },

  secondPlay: function() {
      timer.secondCount += 1;
      $("body").removeClass("play");
      var aa = $("ul.secondPlay li.active");

      if (aa.html() == undefined) {
          aa = $("ul.secondPlay li").eq(0);
          aa.addClass("before")
              .removeClass("active")
              .next("li")
              .addClass("active")
              .closest("body")
              .addClass("play");

      }
      else if (aa.is(":last-child")) {
          $("ul.secondPlay li").removeClass("before");
          aa.addClass("before").removeClass("active");
          aa = $("ul.secondPlay li").eq(0);
          aa.addClass("active")
              .closest("body")
              .addClass("play");
      }
      else {
          $("ul.secondPlay li").removeClass("before");
          aa.addClass("before")
              .removeClass("active")
              .next("li")
              .addClass("active")
              .closest("body")
              .addClass("play");
      }
      timer.checkEndOfCountdown();
  },

  minutePlay: function() {
      $("body").removeClass("play");
      var aa = $("ul.minutePlay li.active");

      if (aa.html() == undefined) {
          aa = $("ul.minutePlay li").eq(0);
          aa.addClass("before")
              .removeClass("active")
              .next("li")
              .addClass("active")
              .closest("body")
              .addClass("play");

      }
      else if (aa.is(":last-child")) {
          $("ul.minutePlay li").removeClass("before");
          aa.addClass("before").removeClass("active");
          aa = $("ul.minutePlay li").eq(0);
          aa.addClass("active")
              .closest("body")
              .addClass("play");
      }
      else {
          $("ul.minutePlay li").removeClass("before");
          aa.addClass("before")
              .removeClass("active")
              .next("li")
              .addClass("active")
              .closest("body")
              .addClass("play");
      }
  },

  minutePlay2: function() {
      $("body").removeClass("play");
      var aa = $("ul.minutePlay2 li.active");

      if (aa.html() == undefined) {
          aa = $("ul.minutePlay2 li").eq(0);
          aa.addClass("before")
              .removeClass("active")
              .next("li")
              .addClass("active")
              .closest("body")
              .addClass("play");

      }
      else if (aa.is(":last-child")) {
          $("ul.minutePlay2 li").removeClass("before");
          aa.addClass("before").removeClass("active");
          aa = $("ul.minutePlay2 li").eq(0);
          aa.addClass("active")
              .closest("body")
              .addClass("play");
      }
      else {
          $("ul.minutePlay2 li").removeClass("before");
          aa.addClass("before")
              .removeClass("active")
              .next("li")
              .addClass("active")
              .closest("body")
              .addClass("play");
      }
  }


}

$(function() {
  timer.setup();
});