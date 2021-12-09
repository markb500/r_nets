var ctx, origx, origy, sumq, suma;
function r6combo2() {
    //r1 in series with r2//((r3 + r6)//(r4 + r5))
    var emf, r1, r2, r3, r4, r5, r6, res1, res2, res3, res4, res5, res6, res34, res234, res12345, rest, isup, v6;
    var v12345, i1, i5, i234, v2, v34, i3, i4, p4;
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
    do{
        do {
            r1 = rgen();        //5 to 95 in 5's or 100 to 990 in 10's or 1000 to 9900 in 100's
            r2 = rgen();
            r3 = rgen();
            r4 = rgen();
            r5 = rgen();
            r6 = rgen();
        } while(r1 === r2 || r1 === r3 || r1 === r4 || r1 === r5 || r1 === r6 || r2 === r3 || r2 === r4 || r2 === r5 || r2 === r6 || 
                r3 === r4 || r3 === r5 || r3 === r6 || r4 === r5 || r4 === r6 || r5 === r6 ||
                (r1 < 1000 && r2 < 1000 && r3 < 1000 && r4 < 1000 && r5 < 1000 && r6 < 1000)) //r values unique, atleast 1 >1000
    
        res1 = irvformat(r1, "r");
        res2 = irvformat(r2, "r");
        res3 = irvformat(r3, "r");
        res4 = irvformat(r4, "r");
        res5 = irvformat(r5, "r");
        res6 = irvformat(r6, "r");
        res34 = irvformat(Math.pow(Math.pow(r3, -1) + Math.pow(r4, -1), -1), "r");
        res234 = irvformat(r2 + res34[4], "r");
        res12345 = irvformat(Math.pow(Math.pow(r1, -1) + Math.pow(res234[4], -1) + Math.pow(r5, -1), -1), "r");
        rest = irvformat(r6 + res12345[4], "r");
        isup = irvformat(emf / rest[4], "i");
        v6 = irvformat(isup[4] * r6, "v");
        v12345 = irvformat(emf - v6[4], "v");
        i1 = irvformat(v12345[4] / r1, "i");
        i5 = irvformat(v12345[4] / r5, "i");
        i234 = irvformat(v12345[4] / res234[4], "i");
        v2 = irvformat(i234[4] * r2, "v");
        v34 = irvformat(i234[4] * res34[4], "v");
        i3 = irvformat(v34[4] / r3, "i");
        i4 = irvformat(v34[4] / r4, "i");
        p4 = irvformat(v34[4] * i4[4], "p");
    } while(v12345[4] <= 0)

    var img = document.getElementById("6rcombob");
    ctx.drawImage(img, origx, origy, 531, 375);
    ctx.font = "bold 20px Comic Sans MS";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("EMF", origx - 5, origy + 175);
    ctx.fillText(emf + " v", origx - 5, origy + 195);
    ctx.fillText("I\u209B", origx + 130, origy + 15);
    ctx.fillText("R\u2081", origx + 145, origy + 160);
    ctx.fillText(res1[0] + " " + res1[3], origx + 145, origy + 180);
    ctx.fillText("R\u2082", origx + 310, origy + 80);
    ctx.fillText(res2[0] + " " + res2[3], origx + 310, origy + 100);
    ctx.fillText("R\u2083", origx + 260, origy + 160);
    ctx.fillText(res3[0] + " " + res3[3], origx + 260, origy + 180);
    ctx.fillText("R\u2084", origx + 365, origy + 160);
    ctx.fillText(res4[0] + " " + res4[3], origx + 365, origy + 180);
    ctx.fillText("R\u2085", origx + 470, origy + 160);
    ctx.fillText(res5[0] + " " + res5[3], origx + 470, origy + 180);
    ctx.fillText("R\u2086", origx + 310, origy + 240);
    ctx.fillText(res6[0] + " " + res6[3], origx + 310, origy + 260);

    sumq += "For the circuit shown, calculate<BR> - the total resistance (R<sub>T</sub>) to 2 decimal places in \u03A9 or k\u03A9 as ";
    sumq += "appropriate,<BR> - the supply current (I<sub>S</sub>) to 2 decimal places in A or mA as appropriate,<BR> - the potential ";
    sumq += "difference across each resistor in V or mV to 2 decimal places as appropriate,<BR> - the current flowing in each ";
    sumq += "resistor to 2 decimal places in A or mA as appropriate and <BR> - the power dissipated in R<sub>4</sub>";
    sumq += ", to 2 decimal places in mW, W or kW as appropriate.";

    suma += "$$\\begin{aligned}\\frac{1}{R_{34}}&=\\frac{1}{R_3}+\\frac{1}{R_4}\\\\[5pt]";
    suma += "\\frac{1}{R_{34}}&=\\frac{1}{" + res3[0] + res3[2] + "}+\\frac{1}{" + res4[0] + res4[2] + "}\\\\[5pt]";
    suma += "\\frac{1}{R_{34}}&=" + dp(1 / r3 + 1 / r4, 7, -1) + "\\\\[5pt]";
    suma += "R_{34}&=" + res34[1] + "\\ " + res34[3] + "\\ (2\\ dp)\\\\[5pt]";
    suma += "R_{234}&=R_2+R_{34}\\\\[5pt]";
    suma += "&=" + res2[0] + res2[2] + "+" + res34[0] + res34[2] + "\\\\[5pt]";
    suma += "&=" + res234[1] + "\\ " + res234[3] + "\\ (2\\ dp)\\\\[5pt]";
    suma += "\\frac{1}{R_{12345}}&=\\frac{1}{R_1}+\\frac{1}{R_{234}}+\\frac{1}{R_5}\\\\[5pt]";
    suma += "\\frac{1}{R_{12345}}&=\\frac{1}{" + res1[0] + res1[2] + "}+\\frac{1}{" + res234[0] + res234[2] + 
                                                        "}+\\frac{1}{" + res5[0] + res5[2] + "}\\\\[5pt]";
    suma += "\\frac{1}{R_{12345}}&=" + dp(1 / r1 + 1 / res234[4] + 1 / r5, 7, -1) + "\\\\[5pt]";
    suma += "R_{12345}&=" + res12345[1] + "\\ " + res12345[3] + "\\ (2\\ dp)\\\\[5pt]";
    suma += "R_T&=R_{12345}+R_6\\\\[5pt]";
    suma += "&=" + res12345[0] + res12345[2] + "+" + res6[0] + res6[2] + "\\\\[5pt]";
    suma += "&=\\underline{\\mathbf{" + rest[1] + "\\ " + rest[3] + "\\ (2\\ dp)}}\\\\[25pt]";
    suma += "I_S&=\\frac{E}{R_T}\\\\[5pt]";
    suma += "&=\\frac{" + emf + "}{" + rest[0] + rest[2] + "}\\\\[5pt]";
    suma += "&=\\underline{\\mathbf{" + isup[1] + "\\ " + isup[3] + "\\ (2\\ dp)}}\\\\[25pt]";
    suma += "V_6&=I_SR_6\\\\[5pt]";
    suma += "&=" + isup[0] + isup[2] + "\\times" + res6[0] + res6[2] + "\\\\[5pt]";
    suma += "&=\\underline{\\mathbf{" + v6[1] + "\\ " + v6[3] + "\\ (2\\ dp)}}\\\\[25pt]";
    suma += "V_{12345}&=E-V_6\\\\[5pt]";
    suma += "&=" + emf + "-" + v6[0] + v6[2] + "\\\\[5pt]";
    suma += "&=\\underline{\\mathbf{" + v12345[1] + "\\ " + v12345[3] + "\\ (2\\ dp)}}\\\\[25pt]";
    suma += "I_1&=\\frac{V_{12345}}{R_1}\\\\[5pt]";
    suma += "&=\\frac{" + v12345[0] + v12345[2] + "}{" + res1[0] + res1[2] + "}\\\\[5pt]";
    suma += "&=\\underline{\\mathbf{" + i1[1] + "\\ " + i1[3] + "\\ (2\\ dp)}}\\\\[25pt]";
    suma += "I_5&=\\frac{V_{12345}}{R_5}\\\\[5pt]";
    suma += "&=\\frac{" + v12345[0] + v12345[2] + "}{" + res5[0] + res5[2] + "}\\\\[5pt]";
    suma += "&=\\underline{\\mathbf{" + i5[1] + "\\ " + i5[3] + "\\ (2\\ dp)}}\\\\[25pt]";
    suma += "I_{234}&=\\frac{V_{12345}}{R_{234}}\\\\[5pt]";
    suma += "&=\\frac{" + v12345[0] + v12345[2] + "}{" + res234[0] + res234[2] + "}\\\\[5pt]";
    suma += "&=\\underline{\\mathbf{" + i234[1] + "\\ " + i234[3] + "\\ (2\\ dp)}}\\\\[25pt]";
    suma += "V_2&=I_{234}R_2\\\\[5pt]";
    suma += "&=" + i234[0] + i234[2] + "\\times" + res2[0] + res2[2] + "\\\\[5pt]";
    suma += "&=\\underline{\\mathbf{" + v2[1] + "\\ " + v2[3] + "\\ (2\\ dp)}}\\\\[25pt]";
    suma += "V_{34}&=I_{234}R_{34}\\\\[5pt]";
    suma += "&=" + i234[0] + i234[2] + "\\times" + res34[0] + res34[2] + "\\\\[5pt]";
    suma += "&=\\underline{\\mathbf{" + v34[1] + "\\ " + v34[3] + "\\ (2\\ dp)}}\\\\[25pt]";
    suma += "I_3&=\\frac{V_{34}}{R_3}\\\\[5pt]";
    suma += "&=\\frac{" + v34[0] + v34[2] + "}{" + res3[0] + res3[2] + "}\\\\[5pt]";
    suma += "&=\\underline{\\mathbf{" + i3[1] + "\\ " + i3[3] + "\\ (2\\ dp)}}\\\\[25pt]";
    suma += "I_4&=\\frac{V_{34}}{R_4}\\\\[5pt]";
    suma += "&=\\frac{" + v34[0] + v34[2] + "}{" + res4[0] + res4[2] + "}\\\\[5pt]";
    suma += "&=\\underline{\\mathbf{" + i4[1] + "\\ " + i4[3] + "\\ (2\\ dp)}}\\\\[25pt]";
    suma += "P_4&=V_4I_4\\\\[5pt]";
    suma += "&=" + v34[0] + v34[2] + "\\times" + i4[0] + i4[2] + "\\\\[5pt]";
    suma += "&=\\underline{\\mathbf{" + p4[1] + "\\ " + p4[3] + "\\ (2\\ dp)}}\\\\[25pt]";
    suma += "\\end{aligned}$$";

    document.getElementById("q").innerHTML = sumq;
    document.getElementById("btnSoln").style.visibility="visible";
}