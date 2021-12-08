var ctx, origx, origy, sumq, suma;
function seriesr() {
    //3 resistors in series
    var sum, emf, r1, r2, r3, isup, p1, p2, p3;
    document.getElementById("myCanvas");
    myCanvas.height = 400;
    myCanvas.width = 500;
    myCanvas.style = "border: none;";
    ctx = myCanvas.getContext('2d');
    sumq = "";
    suma = "";
    document.getElementById("a").innerHTML = "";
    document.getElementById("noteslink").style.visibility="visible";
    document.getElementById("noteslink").onclick = function() {
        window.open("images/20110616-1236_ElectBK1_CI_v1_6-APO.pdf#page=32", "_blank")
    }
    origx = 200;
    origy = 40;
    emf = rndgen(50, 750, 0, 5, -1);
    do {
        r1 = rgen();        //5 to 95 in 5's or 100 to 990 in 10's or 1000 to 9900 in 100's
        r2 = rgen();
        r3 = rgen();
    } while(r1 === r2 || r1 === r3 || r2 === r3 || r1 < 1000 && r2 < 1000 && r3 < 1000)     //r values unique and atleast 1 >1000

    //irvformat(value, unit("r", "i" or "v")) returns 
    //array(value 2 dp, value fixed 2 dp, eng notation mathjax, unit with eng notation, rounded value for js calcs)
    res1 = irvformat(r1, "r");
    res2 = irvformat(r2, "r");
    res3 = irvformat(r3, "r");
    rest = irvformat(r1 + r2 + r3, "r");
    isup = irvformat(emf / rest[4], "i");
    v1 = irvformat(isup[4] * r1, "v");
    v2 = irvformat(isup[4] * r2, "v");
    v3 = irvformat(isup[4] * r3, "v");
    p1 = irvformat(Math.pow(isup[4], 2) * res1[4], "p");
    p2 = irvformat(Math.pow(v2[4], 2) / res2[4], "p");
    p3 = irvformat(v3[4] * isup[4], "p");

    var img = document.getElementById("3rseries");
    ctx.drawImage(img, origx + 20, origy, 281, 355);
    ctx.font = "bold 20px Comic Sans MS";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("EMF", origx + 15, origy + 165);
    ctx.fillText(emf + " v", origx + 15, origy + 185);
    ctx.fillText("I\u209B", origx + 130, origy);
    ctx.fillText("R\u2081", origx + 170, origy + 80);
    ctx.fillText(res1[0] + " " + res1[3], origx + 170, origy + 100);
    ctx.fillText("R\u2082", origx + 170, origy + 165);
    ctx.fillText(res2[0] + " " + res2[3], origx + 170, origy + 185);
    ctx.fillText("R\u2083", origx + 170, origy + 260);
    ctx.fillText(res3[0] + " " + res3[3], origx + 170, origy + 280);

    sumq += "For the circuit shown, calculate<BR> - the total resistance (R<sub>T</sub>) to 2 decimal places in \u03A9 or k\u03A9 as ";
    sumq += "appropriate,<BR> - the supply current (I<sub>S</sub>) in mA to 2 decimal places,<BR> - the ";
    sumq += "potential difference across each resistor, each to 2 decimal places in V or mV as appropriate and<BR> - the power ";
    sumq += "dissipated in each resistor, to 2 decimal places in mW, W or kW as appropriate.";

    suma += "$$\\begin{aligned}R_T&=R_1+R_2+R_3\\\\[5pt]";
    suma += "&=" + res1[0] + res1[2] + "+" + res2[0] + res2[2] + "+" + res3[0] + res3[2] + "\\\\[5pt]"; 
    suma += "&=\\underline{\\mathbf{" + rest[1] + "\\ " + rest[3] + "}}\\\\[25pt]";
    suma += "I_S&=\\frac{E}{R_T}\\\\[5pt]";
    suma += "&=\\frac{" + emf + "}{" + rest[0] + rest[2] + "}\\\\[5pt]";
    suma += "&=\\underline{\\mathbf{" + isup[1] + "\\ " + isup[3] + "\\ (2\\ dp)}}\\\\[25pt]";
    suma += "I_1&=I_2=I_3=I_S=\\underline{\\mathbf{" + isup[1] + "\\ " + isup[3] + "}}\\\\[25pt]";
    suma += "V_1&=I_S R_1=" + isup[0] + isup[2] + "\\times" + res1[0] + res1[2] + "=\\underline{\\mathbf{" + 
                v1[1] + "\\ " + v1[3] + "\\ (2\\ dp)}}\\\\[5pt]";
    suma += "V_2&=I_S R_2=" + isup[0] + isup[2] + "\\times" + res2[0] + res2[2] + "=\\underline{\\mathbf{" + 
                v2[1] + "\\ " + v2[3] + "\\ (2\\ dp)}}\\\\[5pt]";
    suma += "V_3&=I_S R_3=" + isup[0] + isup[2] + "\\times" + res3[0] + res3[2] + "=\\underline{\\mathbf{" + 
                v3[1] + "\\ " + v3[3] + "\\ (2\\ dp)}}\\\\[25pt]";
    suma += "P_1&={I_1}^2 R_1\\\\[5pt]";
    suma += "&={" + isup[0] + isup[2] + "}^2\\times" + res1[0] + res1[2] + "\\\\[5pt]";
    suma += "&=\\underline{\\mathbf{" + p1[1] + "\\ " + p1[3] + "\\ (2\\ dp)}}\\\\[25pt]";
    suma += "P_2&=\\frac{{V_{2}}^2}{R_2}\\\\[5pt]";
    suma += "&=\\frac{{" + v2[0] + v2[2] + "}^2}{" + res2[0] + res2[2] + "}\\\\[5pt]";
    suma += "&=\\underline{\\mathbf{" + p2[1] + "\\ " + p2[3] + "\\ (2\\ dp)}}\\\\[25pt]";
    suma += "P_3&=V_{3} I_3\\\\[5pt]";
    suma += "&=" + v3[0] + v3[2] + "\\times" + isup[0] + isup[2] + "\\\\[5pt]";
    suma += "&=\\underline{\\mathbf{" + p3[1] + "\\ " + p3[3] + "\\ (2\\ dp)}}\\\\[5pt]";
    suma += "&Note:\\ Different\\ power\\ formulas\\ used\\\\[5pt]&to\\ illustrate\\ the\\ options."
    suma += "\\end{aligned}$$";

    document.getElementById("q").innerHTML = sumq;
    document.getElementById("btnSoln").style.visibility="visible";
}