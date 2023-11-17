var sumarrseriesr = [], ctx, origx, origy, sumq, suma;
function seriesr() {
    //3 resistors in series
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
    origx = 100;
    origy = 40;
    sumarrseriesr = QLimitRepeats(sumarrseriesr, 4);   //Ensures no repeat question until at least 50% of questions shown
    var sum = sumarrseriesr[sumarrseriesr.length - 1];
    switch(sum) {
        case 1:
            var emf, r1, r2, r3, res1, res2, res3, rest, v1, v2, v3, isup;
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
            sumq += "potential difference across each resistor, each to 2 decimal places in V or mV as appropriate.";

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
            suma += "\\end{aligned}$$";
            break;
        case 2:
            // Missing info: E, R2 & V1
            var r1, r2, r3, rt, res1, res2, res3, is, emf, v1, v2, v3;
            do {
                r1 = rndgen(50, 900, 0, 5, -1);
                r2 = rndgen(50, 900, 0, 5, -1);
                r3 = rndgen(50, 900, 0, 5, -1);
                rt = r1 + r2 + r3;
                is = rndgen(30, 500, 2, 0.01, -1);
                emf = is / 1000 * rt;
            } while(r1 === r2 || r1 === r3 || r2 === r3 || rt < 500 || rt > 1500 || emf < 50 || emf > 300 || emf - dp(emf, 0, -1) !== 0)
            v1 = irvformat(dp(is / 1000 * r1, 2, -1), "v");
            v2 = irvformat(dp(is / 1000 * r2, 2, -1), "v");
            v3 = irvformat(dp(is / 1000 * r3, 2, -1), "v");
            res1 = irvformat(r1, "r");
            res2 = irvformat(r2, "r");
            res3 = irvformat(r3, "r");
            
            var img = document.getElementById("3rseriescalc");
            ctx.drawImage(img, origx + 20, origy, 281, 355);
            ctx.font = "bold 20px Comic Sans MS";
            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            ctx.fillText("EMF", origx + 15, origy + 165);
            // ctx.fillText(emf + " v", origx + 15, origy + 185);
            ctx.fillText("I\u209B", origx + 130, origy);
            ctx.fillText("R\u2081", origx + 170, origy + 80);
            ctx.fillText(res1[0] + " " + res1[3], origx + 170, origy + 100);
            ctx.fillText("R\u2082", origx + 170, origy + 165);
            // ctx.fillText(res2[0] + " " + res2[3], origx + 170, origy + 185);
            ctx.fillText("R\u2083", origx + 170, origy + 260);
            ctx.fillText(res3[0] + " " + res3[3], origx + 170, origy + 280);
            ctx.fillText("V\u2081", origx + 295, origy + 80);
            // ctx.fillText(v1[0] + " " + v1[3], origx + 295, origy + 100);
            ctx.fillText("V\u2082", origx + 295, origy + 165);
            ctx.fillText(v2[0] + " " + v2[3], origx + 295, origy + 185);
            ctx.fillText("V\u2083", origx + 295, origy + 260);
            ctx.fillText(v3[0] + " " + v3[3], origx + 295, origy + 280);

            sumq += "Calculate:<br>";
            sumq += "a. The supply current I<sub>S</sub><br>b. The potential difference across R<sub>1</sub><br>c. The EMF of the circuit.";

            suma += "$$\\begin{aligned}a.\\ I_S&=\\frac{V_3}{R_3}\\\\[5pt]";
            suma += "&=\\frac{" + v3[0] + "}{" + res3[0] + "}\\\\[5pt]";
            suma += "&=" + is + "\\times10^{-3}\\\\[5pt]";
            suma += "&=\\underline{\\mathbf{" + is + "\\ mA}}\\\\[5pt]";
            suma += "\\\\[5pt]";
            suma += "b.\\ V_1&=I_S R_1\\\\[5pt]";
            suma += "&=" + is + "\\times10^{-3}\\times" + res1[0] + "\\\\[5pt]";
            suma += "&=\\underline{\\mathbf{" + v1[0] + " " + v1[3] + "}}\\\\[5pt]";
            suma += "\\\\[5pt]";
            suma += "c.\\ E&=V_1 + V_2 + V_3\\\\[5pt]";
            suma += "&=" + v1[0] + "+" + v2[0] + "+" + v3[0] + "\\\\[5pt]";
            suma += "&=\\underline{\\mathbf{" + (v1[0] + v2[0] + v3[0]) + " " + v1[3] + "}}\\\\[5pt]";
            suma += "\\end{aligned}$$";
            break;
        case 3:
            // Missing info: E, R1 & V3
            var r1, r2, r3, rt, res1, res2, res3, is, emf, v1, v2, v3;
            do {
                r1 = rndgen(50, 900, 0, 5, -1);
                r2 = rndgen(50, 900, 0, 5, -1);
                r3 = rndgen(50, 900, 0, 5, -1);
                rt = r1 + r2 + r3;
                is = rndgen(30, 500, 2, 0.01, -1);
                emf = is / 1000 * rt;
            } while(rt < 500 || rt > 1500 || emf < 50 || emf > 300 || emf - dp(emf, 0, -1) !== 0)
            v1 = irvformat(dp(is / 1000 * r1, 2, -1), "v");
            v2 = irvformat(dp(is / 1000 * r2, 2, -1), "v");
            v3 = irvformat(dp(is / 1000 * r3, 2, -1), "v");
            res1 = irvformat(r1, "r");
            res2 = irvformat(r2, "r");
            res3 = irvformat(r3, "r");

            var img = document.getElementById("3rseriescalc");
            ctx.drawImage(img, origx + 20, origy, 281, 355);
            ctx.font = "bold 20px Comic Sans MS";
            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            ctx.fillText("EMF", origx + 15, origy + 165);
            // ctx.fillText(emf + " v", origx + 15, origy + 185);
            ctx.fillText("I\u209B", origx + 130, origy);
            ctx.fillText("R\u2081", origx + 170, origy + 80);
            // ctx.fillText(res1[0] + " " + res1[3], origx + 170, origy + 100);
            ctx.fillText("R\u2082", origx + 170, origy + 165);
            ctx.fillText(res2[0] + " " + res2[3], origx + 170, origy + 185);
            ctx.fillText("R\u2083", origx + 170, origy + 260);
            ctx.fillText(res3[0] + " " + res3[3], origx + 170, origy + 280);
            ctx.fillText("V\u2081", origx + 295, origy + 80);
            ctx.fillText(v1[0] + " " + v1[3], origx + 295, origy + 100);
            ctx.fillText("V\u2082", origx + 295, origy + 165);
            ctx.fillText(v2[0] + " " + v2[3], origx + 295, origy + 185);
            ctx.fillText("V\u2083", origx + 295, origy + 260);
            // ctx.fillText(v3[0] + " " + v3[3], origx + 295, origy + 280);

            sumq += "Calculate:<br>";
            sumq += "a. The supply current I<sub>S</sub><br>b. The potential difference across R<sub>3</sub><br>c. The EMF of the circuit.";

            suma += "$$\\begin{aligned}a.\\ I_S&=\\frac{V_2}{R_2}\\\\[5pt]";
            suma += "&=\\frac{" + v2[0] + "}{" + res2[0] + "}\\\\[5pt]";
            suma += "&=" + is + "\\times10^{-3}\\\\[5pt]";
            suma += "&=\\underline{\\mathbf{" + is + "\\ mA}}\\\\[5pt]";
            suma += "\\\\[5pt]";
            suma += "b.\\ V_3&=I_S R_3\\\\[5pt]";
            suma += "&=" + is + "\\times10^{-3}\\times" + res3[0] + "\\\\[5pt]";
            suma += "&=\\underline{\\mathbf{" + v3[0] + " " + v3[3] + "}}\\\\[5pt]";
            suma += "\\\\[5pt]";
            suma += "c.\\ E&=V_1 + V_2 + V_3\\\\[5pt]";
            suma += "&=" + v1[0] + "+" + v2[0] + "+" + v3[0] + "\\\\[5pt]";
            suma += "&=\\underline{\\mathbf{" + (v1[0] + v2[0] + v3[0]) + " " + v1[3] + "}}\\\\[5pt]";
            suma += "\\end{aligned}$$";
            break;
        case 4:
            // Missing info: E, R3 & V2
            var r1, r2, r3, rt, res1, res2, res3, is, emf, v1, v2, v3;
            do {
                r1 = rndgen(50, 900, 0, 5, -1);
                r2 = rndgen(50, 900, 0, 5, -1);
                r3 = rndgen(50, 900, 0, 5, -1);
                rt = r1 + r2 + r3;
                is = rndgen(30, 500, 2, 0.01, -1);
                emf = is / 1000 * rt;
            } while(rt < 500 || rt > 1500 || emf < 50 || emf > 300 || emf - dp(emf, 0, -1) !== 0)
            v1 = irvformat(dp(is / 1000 * r1, 2, -1), "v");
            v2 = irvformat(dp(is / 1000 * r2, 2, -1), "v");
            v3 = irvformat(dp(is / 1000 * r3, 2, -1), "v");
            res1 = irvformat(r1, "r");
            res2 = irvformat(r2, "r");
            res3 = irvformat(r3, "r");

            var img = document.getElementById("3rseriescalc");
            ctx.drawImage(img, origx + 20, origy, 281, 355);
            ctx.font = "bold 20px Comic Sans MS";
            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            ctx.fillText("EMF", origx + 15, origy + 165);
            // ctx.fillText(emf + " v", origx + 15, origy + 185);
            ctx.fillText("I\u209B", origx + 130, origy);
            ctx.fillText("R\u2081", origx + 170, origy + 80);
            ctx.fillText(res1[0] + " " + res1[3], origx + 170, origy + 100);
            ctx.fillText("R\u2082", origx + 170, origy + 165);
            ctx.fillText(res2[0] + " " + res2[3], origx + 170, origy + 185);
            ctx.fillText("R\u2083", origx + 170, origy + 260);
            // ctx.fillText(res3[0] + " " + res3[3], origx + 170, origy + 280);
            ctx.fillText("V\u2081", origx + 295, origy + 80);
            ctx.fillText(v1[0] + " " + v1[3], origx + 295, origy + 100);
            ctx.fillText("V\u2082", origx + 295, origy + 165);
            // ctx.fillText(v2[0] + " " + v2[3], origx + 295, origy + 185);
            ctx.fillText("V\u2083", origx + 295, origy + 260);
            ctx.fillText(v3[0] + " " + v3[3], origx + 295, origy + 280);

            sumq += "Calculate:<br>";
            sumq += "a. The supply current I<sub>S</sub><br>b. The potential difference across R<sub>2</sub><br>c. The EMF of the circuit.";

            suma += "$$\\begin{aligned}a.\\ I_S&=\\frac{V_1}{R_1}\\\\[5pt]";
            suma += "&=\\frac{" + v1[0] + "}{" + res1[0] + "}\\\\[5pt]";
            suma += "&=" + is + "\\times10^{-3}\\\\[5pt]";
            suma += "&=\\underline{\\mathbf{" + is + "\\ mA}}\\\\[5pt]";
            suma += "\\\\[5pt]";
            suma += "b.\\ V_2&=I_S R_2\\\\[5pt]";
            suma += "&=" + is + "\\times10^{-3}\\times" + res2[0] + "\\\\[5pt]";
            suma += "&=\\underline{\\mathbf{" + v2[0] + " " + v2[3] + "}}\\\\[5pt]";
            suma += "\\\\[5pt]";
            suma += "c.\\ E&=V_1 + V_2 + V_3\\\\[5pt]";
            suma += "&=" + v1[0] + "+" + v2[0] + "+" + v3[0] + "\\\\[5pt]";
            suma += "&=\\underline{\\mathbf{" + (v1[0] + v2[0] + v3[0]) + " " + v1[3] + "}}\\\\[5pt]";
            suma += "\\end{aligned}$$";
            break;
    }

    document.getElementById("q").innerHTML = sumq;
    document.getElementById("btnSoln").style.visibility="visible";
}