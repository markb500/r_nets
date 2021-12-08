var ctx, origx, origy, sumq, suma;
function r6combo1() {
    //r1 in series with r2//((r3 + r6)//(r4 + r5))
    var emf, r1, r2, r3, r4, r5, r6, res1, res2, res3, res4, res5, res6, res45, res3456, res23456, rest, isup, v1;
    var v23456, i2, i3456, v3, v45, v6, i4, i5, p6;
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
        res45 = irvformat(Math.pow(Math.pow(r4, -1) + Math.pow(r5, -1), -1), "r");
        res3456 = irvformat(r3 + res45[4] + r6, "r");
        res23456 = irvformat(Math.pow(Math.pow(r2, -1) + Math.pow(res3456[4], -1), -1), "r");
        rest = irvformat(r1 + res23456[4], "r");
        isup = irvformat(emf / rest[4], "i");
        v1 = irvformat(isup[4] * r1, "v");
        v23456 = irvformat(emf - v1[4], "v");
        i2 = irvformat(v23456[4] / r2, "i");
        i3456 = irvformat(isup[4] - i2[4], "i");
        v3 = irvformat(i3456[4] * r3, "v");
        v45 = irvformat(i3456[4] * res45[4], "v");
        v6 = irvformat(i3456[4] * r6, "v");
        i4 = irvformat(v45[4] / r4, "i");
        i5 = irvformat(v45[4] / r5, "i");
        p6 = irvformat(v6[4] * i3456[4], "p");
    } while(i3456[4] <= 0)

    var img = document.getElementById("6rcomboa");
    ctx.drawImage(img, origx, origy, 531, 375);
    ctx.font = "bold 20px Comic Sans MS";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("EMF", origx - 5, origy + 175);
    ctx.fillText(emf + " v", origx - 5, origy + 195);
    ctx.fillText("I\u209B", origx + 160, origy + 15);
    ctx.fillText("R\u2081", origx + 395, origy + 80);
    ctx.fillText(res1[0] + " " + res1[3], origx + 395, origy + 100);
    ctx.fillText("R\u2082", origx + 195, origy + 230);
    ctx.fillText(res2[0] + " " + res2[3], origx + 195, origy + 250);
    ctx.fillText("R\u2083", origx + 395, origy + 160);
    ctx.fillText(res3[0] + " " + res3[3], origx + 395, origy + 180);
    ctx.fillText("R\u2084", origx + 330, origy + 230);
    ctx.fillText(res4[0] + " " + res4[3], origx + 330, origy + 250);
    ctx.fillText("R\u2085", origx + 460, origy + 230);
    ctx.fillText(res5[0] + " " + res5[3], origx + 460, origy + 250);
    ctx.fillText("R\u2086", origx + 395, origy + 305);
    ctx.fillText(res6[0] + " " + res6[3], origx + 395, origy + 325);

    sumq += "For the circuit shown, calculate<BR> - the total resistance (R<sub>T</sub>) to 2 decimal places in \u03A9 or k\u03A9 as ";
    sumq += "appropriate,<BR> - the supply current (I<sub>S</sub>) to 2 decimal places in A or mA as appropriate,<BR> - the potential ";
    sumq += "difference across each resistor in V or mV to 2 decimal places as appropriate,<BR> - the current flowing in each ";
    sumq += "resistor to 2 decimal places in A or mA as appropriate and <BR> - the power dissipated in R<sub>6</sub>";
    sumq += ", to 2 decimal places in mW, W or kW as appropriate.";

    suma += "$$\\begin{aligned}\\frac{1}{R_{45}}&=\\frac{1}{R_4}+\\frac{1}{R_5}\\\\[5pt]";
    suma += "\\frac{1}{R_{45}}&=\\frac{1}{" + res4[0] + res4[2] + "}+\\frac{1}{" + res5[0] + res5[2] + "}\\\\[5pt]";
    suma += "\\frac{1}{R_{45}}&=" + dp(1 / r4 + 1 / r5, 7, -1) + "\\\\[5pt]";
    suma += "R_{45}&=" + res45[1] + "\\ " + res45[3] + "\\ (2\\ dp)\\\\[5pt]";
    suma += "R_{3456}&=R_3+R_{45}+R_6\\\\[5pt]";
    suma += "&=" + res3[0] + res3[2] + "+" + res45[0] + res45[2] + "+" + res6[0] + res6[2] + "\\\\[5pt]";
    suma += "&=" + res3456[1] + "\\ " + res3456[3] + "\\\\[5pt]";
    suma += "\\frac{1}{R_{23456}}&=\\frac{1}{R_2}+\\frac{1}{R_{3456}}\\\\[5pt]";
    suma += "\\frac{1}{R_{23456}}&=\\frac{1}{" + res2[0] + res2[2] + "}+\\frac{1}{" + res3456[0] + res3456[2] + "}\\\\[5pt]";
    suma += "\\frac{1}{R_{23456}}&=" + dp(1 / r2 + 1 / res3456[4], 7, -1) + "\\\\[5pt]";
    suma += "R_{23456}&=" + res23456[1] + "\\ " + res23456[3] + "\\ (2\\ dp)\\\\[5pt]";
    suma += "R_T&=R_1+R_{23456}\\\\[5pt]";
    suma += "&=" + res1[0] + res1[2] + "+" + res23456[0] + res23456[2] + "\\\\[5pt]";
    suma += "&=\\underline{\\mathbf{" + rest[1] + "\\ " + rest[3] + "\\ (2\\ dp)}}\\\\[25pt]";
    suma += "I_S&=\\frac{E}{R_T}\\\\[5pt]";
    suma += "&=\\frac{" + emf + "}{" + rest[0] + rest[2] + "}\\\\[5pt]";
    suma += "&=\\underline{\\mathbf{" + isup[1] + "\\ " + isup[3] + "\\ (2\\ dp)}}\\\\[25pt]";
    suma += "V_1&=I_S\\times R_1\\\\[5pt]";
    suma += "&=" + isup[0] + isup[2] + "\\times" + res1[0] + res1[2] + "\\\\[5pt]";
    suma += "&=\\underline{\\mathbf{" + v1[1] + "\\ " + v1[3] + "\\ (2\\ dp)}}\\\\[25pt]";
    suma += "V_{23456}&=E-V_1\\\\[5pt]";
    suma += "&=" + emf + "-" + v1[0] + v1[2] + "\\\\[5pt]";
    suma += "&=\\underline{\\mathbf{" + v23456[1] + "\\ " + v23456[3] + "\\ (2\\ dp)}}\\\\[25pt]";
    suma += "I_2&=\\frac{V_{23456}}{R_2}\\\\[5pt]";
    suma += "&=\\frac{" + v23456[0] + v23456[2] + "}{" + res2[0] + res2[2] + "}\\\\[5pt]";
    suma += "&=\\underline{\\mathbf{" + i2[1] + "\\ " + i2[3] + "\\ (2\\ dp)}}\\\\[25pt]";
    suma += "I_{3456}&=\\frac{V_{23456}}{R_{3456}}\\\\[5pt]";
    suma += "&=\\frac{" + v23456[0] + v23456[2] + "}{" + res3456[0] + res3456[2] + "}\\\\[5pt]";
    suma += "&=\\underline{\\mathbf{" + i3456[1] + "\\ " + i3456[3] + "\\ (2\\ dp)}}\\\\[25pt]";
    suma += "V_3&=I_{3456}\\times R_3\\\\[5pt]";
    suma += "&=" + i3456[0] + i3456[2] + "\\times" + res3[0] + res3[2] + "\\\\[5pt]";
    suma += "&=\\underline{\\mathbf{" + v3[1] + "\\ " + v3[3] + "\\ (2\\ dp)}}\\\\[25pt]";
    suma += "V_{45}&=I_{3456}\\times R_{45}\\\\[5pt]";
    suma += "&=" + i3456[0] + i3456[2] + "\\times" + res45[0] + res45[2] + "\\\\[5pt]";
    suma += "&=\\underline{\\mathbf{" + v45[1] + "\\ " + v45[3] + "\\ (2\\ dp)}}\\\\[25pt]";
    suma += "V_6&=I_{3456}\\times R_6\\\\[5pt]";
    suma += "&=" + i3456[0] + i3456[2] + "\\times" + res6[0] + res6[2] + "\\\\[5pt]";
    suma += "&=\\underline{\\mathbf{" + v6[1] + "\\ " + v6[3] + "\\ (2\\ dp)}}\\\\[25pt]";
    suma += "I_4&=\\frac{V_{45}}{R_4}\\\\[5pt]";
    suma += "&=\\frac{" + v45[0] + v45[2] + "}{" + res4[0] + res4[2] + "}\\\\[5pt]";
    suma += "&=\\underline{\\mathbf{" + i4[1] + "\\ " + i4[3] + "\\ (2\\ dp)}}\\\\[25pt]";
    suma += "I_5&=\\frac{V_{45}}{R_5}\\\\[5pt]";
    suma += "&=\\frac{" + v45[0] + v45[2] + "}{" + res5[0] + res5[2] + "}\\\\[5pt]";
    suma += "&=\\underline{\\mathbf{" + i5[1] + "\\ " + i5[3] + "\\ (2\\ dp)}}\\\\[25pt]";
    suma += "P_6&=V_6\\times I_{3456}\\\\[5pt]";
    suma += "&=" + v6[0] + v6[2] + "\\times" + i3456[0] + i3456[2] + "\\\\[5pt]";
    suma += "&=\\underline{\\mathbf{" + p6[1] + "\\ " + p6[3] + "\\ (2\\ dp)}}";
    suma += "\\end{aligned}$$";

    document.getElementById("q").innerHTML = sumq;
    document.getElementById("btnSoln").style.visibility="visible";
}