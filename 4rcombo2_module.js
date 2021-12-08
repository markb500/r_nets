var ctx, origx, origy, sumq, suma;
function r4combo2() {
    //(r1 in series with r2//r3)//r4
    var emf, r1, r2, r3, res1, res2, res3, res4, res23, res123, rest, isup, i2, i3, i4, i123, v1, v23, p3;
    document.getElementById("myCanvas");
    myCanvas.height = 400;
    myCanvas.width = 615;
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
        r4 = rgen();
    } while(r1 === r2 || r1 === r3 || r1 === r4 || r2 === r3 || r2 === r4 || r3 === r4 || 
            (r1 < 1000 && r2 < 1000 && r3 < 1000) && r4 < 1000 || 
            Math.pow(Math.pow(r2, -1) + Math.pow(r3, -1), -1) < 50)     //r values unique, atleast 1 >1000 and r23 > 50 (avoids tiny v23)
    
    res1 = irvformat(r1, "r");
    res2 = irvformat(r2, "r");
    res3 = irvformat(r3, "r");
    res4 = irvformat(r4, "r");
    res23 = irvformat(Math.pow(Math.pow(r2, -1) + Math.pow(r3, -1), -1), "r");
    res123 = irvformat(r1 + res23[4], "r");
    rest = irvformat(Math.pow(Math.pow(res123[4], -1) + Math.pow(r4, -1), -1), "r");
    isup = irvformat(emf / rest[4], "i");
    i4 = irvformat(emf / r4, "i");
    i123 = irvformat(isup[4] - i4[4], "i");
    v1 = irvformat(i123[4] * r1, "v");
    v23 = irvformat(emf - v1[4], "v");
    i2 = irvformat(v23[4] / res2[4], "i");
    i3 = irvformat(v23[4] / res3[4], "i");
    p3 = irvformat(v23[4] * i3[4], "p");

    var img = document.getElementById("4rcombob");
    ctx.drawImage(img, origx, origy, 531, 375);
    ctx.font = "bold 20px Comic Sans MS";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("EMF", origx - 5, origy + 175);
    ctx.fillText(emf + " v", origx - 5, origy + 195);
    ctx.fillText("I\u209B", origx + 160, origy + 15);
    ctx.fillText("R\u2081", origx + 260, origy + 80);
    ctx.fillText(res1[0] + " " + res1[3], origx + 260, origy + 100);
    ctx.fillText("R\u2082", origx + 195, origy + 215);
    ctx.fillText(res2[0] + " " + res2[3], origx + 195, origy + 235);
    ctx.fillText("R\u2083", origx + 330, origy + 215);
    ctx.fillText(res3[0] + " " + res3[3], origx + 330, origy + 235);
    ctx.fillText("R\u2084", origx + 460, origy + 185);
    ctx.fillText(res4[0] + " " + res4[3], origx + 460, origy + 205);

    sumq += "For the circuit shown, calculate<BR> - the total resistance (R<sub>T</sub>) to 2 decimal places in \u03A9 or k\u03A9 as ";
    sumq += "appropriate,<BR> - the supply current (I<sub>S</sub>) to 2 decimal places in A or mA as appropriate,<BR> - the potential ";
    sumq += "difference across each resistor in V or mV to 2 decimal places as appropriate,<BR> - the current flowing in each ";
    sumq += "resistor to 2 decimal places in A or mA as appropriate and<BR> - the power dissipated in R<sub>3</sub>";
    sumq += ", to 2 decimal places in mW, W or kW as appropriate.";

    suma += "$$\\begin{aligned}\\frac{1}{R_{23}}&=\\frac{1}{R_2}+\\frac{1}{R_3}\\\\[5pt]";
    suma += "\\frac{1}{R_{23}}&=\\frac{1}{" + res2[0] + res2[2] + "}+\\frac{1}{" + res3[0] + res3[2] + "}\\\\[5pt]";
    suma += "\\frac{1}{R_{23}}&=" + dp(1 / r2 + 1 / r3, 7, -1) + "\\ (2\\ dp)\\\\[5pt]";
    suma += "R_{23}&=" + res23[1] + "\\ " + res23[3] + "\\ (2\\ dp)\\\\[5pt]";
    suma += "R_{123}&=R_1+R_{23}\\\\[5pt]";
    suma += "&=" + res1[0] + res1[2] + "+" + res23[0] + res23[2] + "\\\\[5pt]";
    suma += "&=" + res123[1] + "\\ " + res123[3] + "\\ (2\\ dp)\\\\[5pt]";
    suma += "\\frac{1}{R_T}&=\\frac{1}{R_{123}}+\\frac{1}{R_4}\\\\[5pt]";
    suma += "\\frac{1}{R_T}&=\\frac{1}{" + res123[0] + res123[2] + "}+\\frac{1}{" + res4[0] + res4[2] + "}\\\\[5pt]";
    suma += "\\frac{1}{R_T}&=" + dp(1 / (res123[4]) + 1 / r4, 7, -1) + "\\\\[5pt]";
    suma += "R_T&=\\underline{\\mathbf{" + rest[1] + "\\ " + rest[3] + "\\ (2\\ dp)}}\\\\[25pt]";
    suma += "I_S&=\\frac{E}{R_T}\\\\[5pt]";
    suma += "&=\\frac{" + emf + "}{" + rest[0] + rest[2] + "}\\\\[5pt]";
    suma += "&=\\underline{\\mathbf{" + isup[1] + "\\ " + isup[3] + "}}\\\\[25pt]";
    suma += "V_4&=E=\\underline{\\mathbf{" + emf + "\\ v}}\\\\[25pt]";
    suma += "I_4&=\\frac{V_4}{R_4}\\\\[5pt]";
    suma += "&=\\frac{" + emf + "}{" + res4[0] + res4[2] + "}\\\\[5pt]";
    suma += "&=\\underline{\\mathbf{" + i4[1] + "\\ " + i4[3] + "\\ (2\\ dp)}}\\\\[25pt]";
    suma += "I_{123}&=I_S-I_4\\\\[5pt]";
    suma += "&=" + isup[0] + isup[2] + "-" + i4[0] + i4[2] + "\\\\[5pt]";
    suma += "&=\\underline{\\mathbf{" + i123[1] + "\\ " + i123[3] + "\\ (2\\ dp)}}\\\\[25pt]";
    suma += "V_1&=I_{123}\\times R_1\\\\[5pt]";
    suma += "&=" + i123[0] + i123[2] + "\\times" + res1[0] + res1[2] + "\\\\[5pt]";
    suma += "&=\\underline{\\mathbf{" + v1[1] + "\\ " + v1[3] + "\\ (2\\ dp)}}\\\\[5pt]";
    suma += "V_{23}&=I_{123}\\times R_{23}\\\\[5pt]";
    suma += "&=" + i123[0] + i123[2] + "\\times" + res23[0] + res23[2] + "\\\\[5pt]";
    suma += "&=\\underline{\\mathbf{" + v23[1] + "\\ " + v23[3] + "\\ (2\\ dp)}}\\\\[25pt]";
    suma += "I_2&=\\frac{V_{23}}{R_2}\\\\[5pt]";
    suma += "&=\\frac{" + v23[0] + v23[2] + "}{" + res2[0] + res2[2] + "}\\\\[5pt]";
    suma += "&=\\underline{\\mathbf{" + i2[1] + "\\ " + i2[3] + "\\ (2\\ dp)}}\\\\[5pt]";
    suma += "I_3&=\\frac{V_{23}}{R_3}\\\\[5pt]";
    suma += "&=\\frac{" + v23[0] + v23[2] + "}{" + res3[0] + res3[2] + "}\\\\[5pt]";
    suma += "&=\\underline{\\mathbf{" + i3[1] + "\\ " + i3[3] + "\\ (2\\ dp)}}\\\\[25pt]";
    suma += "P_3&=V_{23}\\times I_3\\\\[5pt]";
    suma += "&=" + v23[0] + v23[2] + "\\times" + i3[0] + i3[2] + "\\\\[5pt]";
    suma += "&=\\underline{\\mathbf{" + p3[1] + "\\ " + p3[3] + "\\ (2\\ dp)}}";
    suma += "\\end{aligned}$$";

    document.getElementById("q").innerHTML = sumq;
    document.getElementById("btnSoln").style.visibility="visible";
}