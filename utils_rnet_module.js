var views = 0;

function eqnformat(id) {
    //re-runs mathjax rendering on text with given id. Used in all sum functions.
    //Also toggles visibility of the 'a' element each 
    //time soln btn clicked, increments the views count each time 'a' is made visible and re-sets 
    //views to zero each time a question button is clicked.
    MathJax.Hub.Queue(["Typeset",MathJax.Hub, id]);
    if(id === "q") {
        //Initialisation for new Q; reset number of views in soln btn and ensure 'a' element is hidden.
        views = 0;
        document.getElementById("btnSoln").innerHTML = "<span class='font-weight-bold'>Show/Hide Solution</span><br />Views : " + views;
        document.getElementById("a").style.visibility="hidden";
    }
    if(id === "a") {      //soln btn clicked
        if(window.getComputedStyle(document.getElementById("a")).visibility === "visible") {
            document.getElementById("a").style.visibility="hidden";
        } else {
            document.getElementById("a").style.visibility="visible";
            views += 1;
            document.getElementById("btnSoln").innerHTML = "<span class='font-weight-bold'>Show/Hide Solution</span><br />Views : " + views
        }
    }
}

function rndgen(lower, upper, dp, step, fix) {
    //Produces random numbers between limits, with set number of decimal places and selectable steps. Also,
    //decimal places can be fixed.
    //upper = largest num
    //lower = smallest num
    //dp = number of decimal places
    //step = steps between smallest digits ie if 2 dp and want in 0.02 steps, then 0.02
    //fix = number of dp's fixed. -1 if no trailing zeros wanted
    step = step * Math.pow(10, dp);
    if(fix === -1) {
      do {
        var tmp =  (Math.floor(Math.random() * ((upper * Math.pow(10, dp) / step) - 
            (lower * Math.pow(10, dp) / step) + 1) + (lower * Math.pow(10, dp) / step)) / 
            Math.pow(10, dp) * step);
      } while((tmp * Math.pow(10, dp)) % step !== 0) //Solves occasional float point maths error
      return tmp;
    } else {
      return (Math.floor(Math.random() * (upper * Math.pow(10, dp) / step - 
            lower * Math.pow(10, dp) / step + 1) + lower * Math.pow(10, dp) / step) / 
            Math.pow(10, dp) * step).toFixed(fix);
    }
}

function countDecimals(value) {
    if (Math.floor(value) !== value)
        return value.toString().split(".")[1].length || 0;
    return 0;
}
  
function dp(sum, dp, fix) {
    //Rounds 'sum' to selected number of decimal places. Decimal places can be fixed.
    //sum = number to be rounded
    //dp = number of dec places
    //fix = number of dp's fixed. -1 if no trailing zeros wanted.
    var temp = 0;
    do {
        if(fix === -1) {
        temp = Math.round((sum + Number.EPSILON) * Math.pow(10, dp)) / Math.pow(10, dp);
        } else {
        dp = fix + 2;
        temp = (Math.round((sum + Number.EPSILON) * Math.pow(10, dp)) / Math.pow(10, dp)).toFixed(fix);
        }
    } while(countDecimals(temp) > dp);  //Avoids occasional float point errors
    return temp;
}

function rgen() {
    //Gen r value 5 to 95 in 5's or 100 to 990 in 10's or 1000 to 9900 in 100's
    var sel1 = rndgen(1, 3, 0, 1, -1);
    if(sel1 === 1) {
        return rndgen(5, 95, 0, 5, -1)
    } else if(sel1 === 2) {
        return rndgen(100, 990, 0, 10, -1)
    } else {
        return rndgen(1000, 9900, 0, 100, -1)
    }
}

function irvformat(value, unit) {
    //Produces values in correct format for various uses
    //Returned as array
    //[0]- value rounded to 2 dp
    //[1]- value fixed to 2 dp
    //[2]- eng notation for mathjax format
    //[3]- units with correct eng notation
    //[4]- value rounded to 2 dp with eng notation, for js calc
    var valuefix, engnot, calc;
    if(value < 1) {
        valuefix = dp(value * 1000, 4, 2);
        value = dp(value * 1000, 2, -1);
        engnot = "\\times10^{-3}";
        if(unit === "r") {
            unit = "m\u03A9";
        } else if(unit === "i") {
            unit = "mA";
        } else if(unit === "v") {
            unit = "mV";
        } else if(unit === "p") {
            unit = "mW";
        }
        calc = value / 1000;
    } else if(value >= 1000) {
        valuefix = dp(value / 1000, 4, 2);
        value = dp(value / 1000, 2, -1)
        engnot = "\\times10^3";
        if(unit === "r") {
            unit = "k\u03A9";
        } else if(unit === "i") {
            unit = "kA";
        } else if(unit === "v") {
            unit = "kV";
        } else if(unit === "p") {
            unit = "kW";
        }
        calc = value * 1000;
    } else {
        valuefix = dp(value, 4, 2);
        value = dp(value, 2, -1);
        engnot = "";
        if(unit === "r") {
            unit = "\u03A9";
        } else if(unit === "i") {
            unit = "A";
        } else if(unit === "v") {
            unit = "V";
        } else if(unit === "p") {
            unit = "W";
        }
        calc = value;
    }
    return [value, valuefix, engnot, unit, calc];
}

function QLimitRepeats(arr, x) {
  //Ensures no repeat question until at least 50% of questions in calling module have been shown.
  //'arr' stores previous questions for calling module. 'x' is the number of questions in the calling module.
  var sum;
  do {
    sum = rndgen(1, x, 0, 1, -1);
  } while (arr.includes(sum))
  arr.push(sum);
  if (arr.length > Math.ceil(x/2)) {
    arr.shift();
  }
  return arr;
}