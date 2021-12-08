var ctx, origx, origy, sumq, suma;
function r5combo1() {
    //(r1 in series with r2//(r3 + r4))//r5
    var emf, r1, r2, r3, r4, r5, res1, res2, res3, res4, res5, res34, res234, res1234, rest, isup, i2, i34, i5, i1234, v1, v234, v3, v4;
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
        r5 = rgen();
    } while(r1 === r2 || r1 === r3 || r1 === r4 || r1 === r5 || r2 === r3 || r2 === r4 || r2 === r5 || r3 === r4 || r3 === r5 || r4 === r5 ||
            (r1 < 1000 && r2 < 1000 && r3 < 1000 && r4 < 1000 && r5 < 1000) || 
            Math.pow(Math.pow(r2, -1) + Math.pow(r3 + r4, -1), -1) < 50) //r values unique, atleast 1 >1000, r234 > 50 (avoids tiny v234)

    res1 = irvformat(r1, "r");
    res2 = irvformat(r2, "r");
    res3 = irvformat(r3, "r");
    res4 = irvformat(r4, "r");
    res5 = irvformat(r5, "r");
    res34 = irvformat(r3 + r4, "r");
    res234 = irvformat(Math.pow(Math.pow(r2, -1) + Math.pow(res34[4], -1), -1), "r");
    res1234 = irvformat(r1 + res234[4], "r");
    rest = irvformat(Math.pow(Math.pow(res1234[4], -1) + Math.pow(r5, -1), -1), "r");
    isup = irvformat(emf / rest[4], "i");
    i5 = irvformat(emf / res5[4], "i");
    i1234 = irvformat(emf / res1234[4], "i");
    v1 = irvformat(i1234[4] * r1, "v");
    v234 = irvformat(emf - v1[4], "v");
    i2 = irvformat(v234[4] / r2, "i");
    i34 = irvformat(i1234[4] - i2[4], "i");
    v3 = irvformat(i34[4] * r3, "v");
    v4 = irvformat(i34[4] * r4, "v");

    var img = document.getElementById("5rcomboa");
    ctx.drawImage(img, origx, origy, 531, 375);
    ctx.font = "bold 20px Comic Sans MS";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("EMF", origx - 5, origy + 175);
    ctx.fillText(emf + " v", origx - 5, origy + 195);
    ctx.fillText("I\u209B", origx + 160, origy + 15);
    ctx.fillText("R\u2081", origx + 260, origy + 80);
    ctx.fillText(res1[0] + " " + res1[3], origx + 260, origy + 100);
    ctx.fillText("R\u2082", origx + 190, origy + 215);
    ctx.fillText(res2[0] + " " + res2[3], origx + 190, origy + 235);
    ctx.fillText("R\u2083", origx + 330, origy + 180);
    ctx.fillText(res3[0] + " " + res3[3], origx + 330, origy + 200);
    ctx.fillText("R\u2084", origx + 330, origy + 250);
    ctx.fillText(res4[0] + " " + res4[3], origx + 330, origy + 270);
    ctx.fillText("R\u2085", origx + 460, origy + 185);
    ctx.fillText(res5[0] + " " + res5[3], origx + 460, origy + 205);

    sumq += "For the circuit shown, calculate<BR> - the total resistance (R<sub>T</sub>) to 2 decimal places in \u03A9 or k\u03A9 as ";
    sumq += "appropriate,<BR> - the supply current (I<sub>S</sub>) to 2 decimal places in A or mA as appropriate,<BR> - the potential ";
    sumq += "difference across each resistor in V or mV to 2 decimal places as appropriate and<BR> - the current flowing in each ";
    sumq += "resistor to 2 decimal places in A or mA as appropriate.";

    suma += "$$\\begin{aligned}R_{34}&=R_3+R_4\\\\[5pt]";
    suma += "&=" + res3[0] + res3[2] + "+" + res4[0] + res4[2] + "\\\\[5pt]";
    suma += "&=" + res34[1] + "\\ " + res34[3] + "\\ (2\\ dp)\\\\[5pt]";
    suma += "\\frac{1}{R_{234}}&=\\frac{1}{R_2}+\\frac{1}{R_{34}}\\\\[5pt]";
    suma += "\\frac{1}{R_{234}}&=\\frac{1}{" + res2[0] + res2[2] + "}+\\frac{1}{" + res34[0] + res34[2] + "}\\\\[5pt]";
    suma += "\\frac{1}{R_{234}}&=" + dp(1 / r2 + 1 / (r3 + r4), 7, -1) + "\\\\[5pt]";
    suma += "R_{234}&=" + res234[1] + "\\ " + res234[3] + "\\ (2\\ dp)\\\\[5pt]";
    suma += "R_{1234}&=R_1+R_{234}\\\\[5pt]";
    suma += "&=" + res1[0] + res1[2] + "+" + res234[0] + res234[2] + "\\\\[5pt]";
    suma += "&=" + res1234[1] + "\\ " + res1234[3] + "\\ (2\\ dp)\\\\[5pt]";
    suma += "\\frac{1}{R_T}&=\\frac{1}{R_{1234}}+\\frac{1}{R_5}\\\\[5pt]";
    suma += "\\frac{1}{R_T}&=\\frac{1}{" + res1234[0] + res1234[2] + "}+\\frac{1}{" + res5[0] + res5[2] + "}\\\\[5pt]";
    suma += "\\frac{1}{R_T}&=" + dp(1 / res1234[4] + 1 / res5[4], 7, -1) + "\\\\[5pt]";
    suma += "R_T&=\\underline{\\mathbf{" + rest[1] + "\\ " + rest[3] + "\\ (2\\ dp)}}\\\\[25pt]";
    suma += "I_S&=\\frac{E}{R_T}\\\\[5pt]";
    suma += "&=\\frac{" + emf + "}{" + rest[0] + rest[2] + "}\\\\[5pt]";
    suma += "&=\\underline{\\mathbf{" + isup[1] + "\\ " + isup[3] + "\\ (2\\ dp)}}\\\\[25pt]";
    suma += "V_5&=E=\\underline{\\mathbf{" + emf + "\\ V}}\\\\[25pt]";
    suma += "I_5&=\\frac{V_5}{R_5}\\\\[5pt]";
    suma += "&=\\frac{" + emf + "}{" + res5[0] + res5[2] + "}\\\\[5pt]";
    suma += "&=\\underline{\\mathbf{" + i5[1] + "\\ " + i5[3] + "\\ (2\\ dp)}}\\\\[25pt]";
    suma += "I_{1234}&=\\frac{E}{R_{1234}}\\\\[5pt]";
    suma += "&=\\frac{" + emf + "}{" + res1234[0] + res1234[2] + "}\\\\[5pt]";
    suma += "&=\\underline{\\mathbf{" + i1234[1] + "\\ " + i1234[3] + "\\ (2\\ dp)}}\\\\[25pt]";
    suma += "V_1&=I_{1234}\\times R_1\\\\[5pt]";
    suma += "&=" + i1234[0] + i1234[2] + "\\times" + res1[0] + res1[2] + "\\\\[5pt]";
    suma += "&=\\underline{\\mathbf{" + v1[1] + "\\ " + v1[3] + "\\ (2\\ dp)}}\\\\[25pt]";
    suma += "V_{234}&=E-V_1\\\\[5pt]";
    suma += "&=" + emf + "\\times" + v1[0] + v1[2] + "\\\\[5pt]";
    suma += "&=\\underline{\\mathbf{" + v234[1] + "\\ " + v234[3] + "\\ (2\\ dp)}}\\\\[25pt]";
    suma += "I_2&=\\frac{V_{234}}{R_2}\\\\[5pt]";
    suma += "&=\\frac{" + v234[0] + v234[2] + "}{" + res2[0] + res2[2] + "}\\\\[5pt]";
    suma += "&=\\underline{\\mathbf{" + i2[1] + "\\ " + i2[3] + "\\ (2\\ dp)}}\\\\[25pt]";
    suma += "I_{34}&=I_{1234}-I_2\\\\[5pt]";
    suma += "&=" + i1234[0] + i1234[2] + "-" + i2[0] + i2[2] + "\\\\[5pt]";
    suma += "&=\\underline{\\mathbf{" + i34[1] + "\\ " + i34[3] + "\\ (2\\ dp)}}\\\\[25pt]";
    suma += "V_3&=I_{34}\\times R_{3}\\\\[5pt]";
    suma += "&=" + i34[0] + i34[2] + "\\times" + res3[0] + res3[2] + "\\\\[5pt]";
    suma += "&=\\underline{\\mathbf{" + v3[1] + "\\ " + v3[3] + "\\ (2\\ dp)}}\\\\[25pt]";
    suma += "V_4&=I_{34}\\times R_{4}\\\\[5pt]";
    suma += "&=" + i34[0] + i34[2] + "\\times" + res4[0] + res4[2] + "\\\\[5pt]";
    suma += "&=\\underline{\\mathbf{" + v4[1] + "\\ " + v4[3] + "\\ (2\\ dp)}}\\end{aligned}$$";

    document.getElementById("q").innerHTML = sumq;
    document.getElementById("btnSoln").style.visibility="visible";
}