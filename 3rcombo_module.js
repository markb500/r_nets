var ctx, origx, origy, sumq, suma;
function r3combo() {
    //r1 in series with r2//r3
    var emf, r1, r2, r3, res1, res2, res3, res23, rest, isup, v1, v23, i2, i3, p1, p2, p3;
    document.getElementById("myCanvas");
    myCanvas.height = 400;
    myCanvas.width = 600;
    myCanvas.style = "border: none;";
    ctx = myCanvas.getContext('2d');
    sumq = "";
    suma = "";
    suma+= "<br>".repeat(10);
    document.getElementById("a").innerHTML = "";
    document.getElementById("noteslink").style.visibility="visible";
    document.getElementById("noteslink").onclick = function() {
        window.open("images/20110616-1236_ElectBK1_CI_v1_6-APO.pdf#page=32", "_blank")
    }
    origx = 90;
    origy = 0;
    emf = rndgen(50, 750, 0, 5, -1);
    do {
        r1 = rgen();        //5 to 95 in 5's or 100 to 990 in 10's or 1000 to 9900 in 100's
        r2 = rgen();
        r3 = rgen();
    } while(r1 === r2 || r1 === r3 || r2 === r3 || (r1 < 1000 && r2 < 1000 && r3 < 1000) || 
            Math.pow(Math.pow(r2, -1) + Math.pow(r3, -1), -1) < 50)     //r values unique, atleast 1 >1000 and r23 > 50 (avoids tiny v23)
    
    res1 = irvformat(r1, "r");
    res2 = irvformat(r2, "r");
    res3 = irvformat(r3, "r");
    res23 = irvformat(Math.pow(Math.pow(r2, -1) + Math.pow(r3, -1), -1), "r");
    rest = irvformat(r1 + res23[4], "r");
    isup = irvformat(emf / rest[4], "i");
    v1 = irvformat(isup[4] * r1, "v");
    v23 = irvformat(emf - v1[4], "v");
    i2 = irvformat(v23[4] / r2, "i");
    i3 = irvformat(v23[4] / r3, "i");
    p1 = irvformat(Math.pow(isup[4], 2) * res1[4], "p");
    p2 = irvformat(Math.pow(v23[4], 2) / res2[4], "p");
    p3 = irvformat(v23[4] * i3[4], "p");

    var img = document.getElementById("3rcombo1");
    ctx.drawImage(img, origx, origy, 531, 375);
    ctx.font = "bold 20px Comic Sans MS";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("EMF", origx - 5, origy + 175);
    ctx.fillText(emf + " v", origx - 5, origy + 195);
    ctx.fillText("I\u209B", origx + 180, origy + 15);
    ctx.fillText("R\u2081", origx + 300, origy + 100);
    ctx.fillText(res1[0] + " " + res1[3], origx + 300, origy + 120);
    ctx.fillText("R\u2082", origx + 225, origy + 230);
    ctx.fillText(res2[0] + " " + res2[3], origx + 225, origy + 250);
    ctx.fillText("R\u2083", origx + 375, origy + 230);
    ctx.fillText(res3[0] + " " + res3[3], origx + 375, origy + 250);

    sumq += "For the circuit shown, calculate<BR> - the total resistance (R<sub>T</sub>) to 2 decimal places in \u03A9 or k\u03A9 as ";
    sumq += "appropriate,<BR> - the supply current (I<sub>S</sub>) to 2 decimal places in A or mA as appropriate,<BR> - the potential difference ";
    sumq += "across each resistor in V or mV to 2 decimal places as appropriate,<BR> - the current flowing in the 2 parallel resistors ";
    sumq += " to 2 decimal places in A or mA as appropriate and<BR> - the power dissipated in each resistor, ";
    sumq += "to 2 decimal places in mW, W or kW as appropriate.";

    suma += "$$\\begin{aligned}\\frac{1}{R_{23}}&=\\frac{1}{R_2}+\\frac{1}{R_3}\\\\[5pt]";
    suma += "\\frac{1}{R_{23}}&=\\frac{1}{" + res2[0] + res2[2] + "}+\\frac{1}{" + res3[0] + res3[2] + "}\\\\[5pt]";
    suma += "\\frac{1}{R_{23}}&=" + dp(1/r2 + 1/r3, 7, -1) + "\\\\[5pt]";
    suma += "R_{23}&=" + res23[0] + "\\ " + res23[3] + "\\ (2\\ dp)\\\\[5pt]";
    suma += "R_T&=R_1+R_{23}\\\\[5pt]";
    suma += "&=" + res1[0] + res1[2] + "+" + res23[0] + res23[2] + "\\\\[5pt]";
    suma += "&=\\underline{\\mathbf{" + rest[1] + "\\ " + rest[3] + "\\ (2\\ dp)}}\\\\[25pt]";
    suma += "I_S&=\\frac{E}{R_T}\\\\[5pt]";
    suma += "&=\\frac{" + emf + "}{" + rest[0] + rest[2] + "}\\\\[5pt]";
    suma += "&=\\underline{\\mathbf{" + isup[1] + "\\ " + isup[3] + "\\ (2\\ dp)}}\\\\[25pt]";
    suma += "V_1&=I_SR_1\\\\[5pt]";
    suma += "&=" + isup[0] + isup[2] + "\\times" + res1[0] + res1[2] + "\\\\[5pt]";
    suma += "&=\\underline{\\mathbf{" + v1[1] + "\\ " + v1[3] + "\\ (2\\ dp)}}\\\\[5pt]";
    suma += "V_{23}&=E-V_1\\\\[5pt]";
    suma += "&=" + emf + "-" + v1[0] + v1[2] + "\\\\[5pt]";
    suma += "&=\\underline{\\mathbf{" + v23[1] + "\\ " + v23[3] + "\\ (2\\ dp)}}\\\\[25pt]";
    suma += "I_2&=\\frac{V_{23}}{R_2}\\\\[5pt]";
    suma += "&=\\frac{" + v23[0] + v23[2] + "}{" + res2[0] + res2[2] + "}\\\\[5pt]";
    suma += "&=\\underline{\\mathbf{" + i2[1] + "\\ " + i2[3] + "\\ (2\\ dp)}}\\\\[5pt]";
    suma += "I_3&=\\frac{V_{23}}{R_3}\\\\[5pt]";
    suma += "&=\\frac{" + v23[0] + v23[2] + "}{" + res3[0] + res3[2] + "}\\\\[5pt]";
    suma += "&=\\underline{\\mathbf{" + i3[1] + "\\ " + i3[3] + "\\ (2\\ dp)}}\\\\[25pt]";
    suma += "P_1&={I_S}^2 R_1\\\\[5pt]";
    suma += "&={" + isup[0] + isup[2] + "}^2\\times" + res1[0] + res1[2] + "\\\\[5pt]";
    suma += "&=\\underline{\\mathbf{" + p1[1] + "\\ " + p1[3] + "\\ (2\\ dp)}}\\\\[25pt]";
    suma += "P_2&=\\frac{{V_{23}}^2}{R_2}\\\\[5pt]";
    suma += "&=\\frac{{" + v23[0] + v23[2] + "}^2}{" + res2[0] + res2[2] + "}\\\\[5pt]";
    suma += "&=\\underline{\\mathbf{" + p2[1] + "\\ " + p2[3] + "\\ (2\\ dp)}}\\\\[25pt]";
    suma += "P_3&=V_{23} I_3\\\\[5pt]";
    suma += "&=" + v23[0] + v23[2] + "\\times" + i3[0] + i3[2] + "\\\\[5pt]";
    suma += "&=\\underline{\\mathbf{" + p3[1] + "\\ " + p3[3] + "\\ (2\\ dp)}}\\\\[5pt]";
    suma += "&Note:\\ Different\\ power\\ formulas\\ used\\\\[5pt]&to\\ illustrate\\ the\\ options."
    suma += "\\end{aligned}$$";

    document.getElementById("q").innerHTML = sumq;
    document.getElementById("btnSoln").style.visibility="visible";
}