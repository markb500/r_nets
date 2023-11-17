var sumarrparallelr = [], ctx, origx, origy, sumq, suma;
function parallelr() {
    //3 resistors in parallel
    document.getElementById("myCanvas");
    myCanvas.height = 400;
    myCanvas.width = 600;
    myCanvas.style = "border: none;";
    ctx = myCanvas.getContext('2d');
    origx = 90;
    origy = 0;
    sumq = "";
    suma = "";
    suma+= "<br>".repeat(10);
    document.getElementById("a").innerHTML = "";
    document.getElementById("noteslink").style.visibility="visible";
    document.getElementById("noteslink").onclick = function() {
        window.open("images/20110616-1236_ElectBK1_CI_v1_6-APO.pdf#page=43", "_blank")
    }
    sumarrparallelr = QLimitRepeats(sumarrparallelr, 4);   //Ensures no repeat question until at least 50% of questions shown
    var sum = sumarrparallelr[sumarrparallelr.length - 1];
    switch(sum) {
        case 1:
            var emf, r1, r2, r3, rt, res1, res2, res3, rest, isup, i1, i2, i3;
            emf = rndgen(50, 750, 0, 5, -1);
            do {
                r1 = rgen();        //5 to 95 in 5's or 100 to 990 in 10's or 1000 to 9900 in 100's
                r2 = rgen();
                r3 = rgen();
            } while(r1 === r2 || r1 === r3 || r2 === r3 || (r1 < 1000 && r2 < 1000 && r3 < 1000))     //r values unique and atleast 1 >1000
            rt = Math.pow(Math.pow(r1, -1) + Math.pow(r2, -1) + Math.pow(r3, -1), -1);
            
            res1 = irvformat(r1, "r");
            res2 = irvformat(r2, "r");
            res3 = irvformat(r3, "r");
            rest = irvformat(rt, "r");
            isup = irvformat(emf / rt, "i");
            i1 = irvformat(emf / r1, "i");
            i2 = irvformat(emf / r2, "i");
            i3 = irvformat(emf / r3, "i");
            
            var img = document.getElementById("3rparallel");
            ctx.drawImage(img, origx, origy, 531, 375);
            ctx.font = "bold 20px Comic Sans MS";
            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            ctx.fillText("EMF", origx - 5, origy + 175);
            ctx.fillText(emf + " v", origx - 5, origy + 195);
            ctx.fillText("I\u209B", origx + 180, origy + 15);
            ctx.fillText("R\u2081", origx + 155, origy + 175);
            ctx.fillText(res1[0] + " " + res1[3], origx + 155, origy + 195);
            ctx.fillText("R\u2082", origx + 300, origy + 175);
            ctx.fillText(res2[0] + " " + res2[3], origx + 300, origy + 195);
            ctx.fillText("R\u2083", origx + 440, origy + 175);
            ctx.fillText(res3[0] + " " + res3[3], origx + 440, origy + 195);

            sumq += "For the circuit shown, calculate<BR> - the total resistance (R<sub>T</sub>) to 2 decimal places in \u03A9 or k\u03A9 as ";
            sumq += "appropriate,<BR> - the supply current (I<sub>S</sub>) to 2 decimal places in A or mA as appropriate,<BR> - the current ";
            sumq += "flowing through each resistor in A or mA as appropriate, to 2 decimal places.";

            suma += "$$\\begin{aligned}\\frac{1}{R_T}&=\\frac{1}{R_1}+\\frac{1}{R_2}+\\frac{1}{R_3}\\\\[5pt]";
            suma += "\\frac{1}{R_T}&=\\frac{1}{" + res1[0] + res1[2] + "}+\\frac{1}{" + res2[0] + res2[2] + "}+\\frac{1}{" + 
                                                                                                res3[0] + res3[2] + "}\\\\[5pt]";
            suma += "\\frac{1}{R_T}&=" + dp((1/r1) + (1/r2) + (1/r3), 7, -1) + "\\\\[5pt]";
            suma += "R_T&=\\underline{\\mathbf{" + rest[1] + "\\ " + rest[3] + "\\ (2\\ dp)}}\\\\[25pt]";
            suma += "I_S&=\\frac{E}{R_T}=\\frac{" + emf + "}{" + rest[0] + rest[2] + "}=\\underline{\\mathbf{" + isup[1] + "\\ " + 
                                                                                                isup[3] + "\\ (2\\ dp)}}\\\\[25pt]";
            suma += "V_1&=V_2=V_3=EMF=\\underline{\\mathbf{" + emf + "\\ V}}\\\\[25pt]";
            suma += "I_1&=\\frac{V_1}{R_1}=\\frac{" + emf + "}{" + res1[0] + res1[2] + "}=\\underline{\\mathbf{" + i1[1] + "\\ " + 
                                                                                                i1[3] + "\\ (2\\ dp)}}\\\\[5pt]";
            suma += "I_2&=\\frac{V_2}{R_2}=\\frac{" + emf + "}{" + res2[0] + res2[2] + "}=\\underline{\\mathbf{" + i2[1] + "\\ " + 
                                                                                                i2[3] + "\\ (2\\ dp)}}\\\\[5pt]";
            suma += "I_3&=\\frac{V_3}{R_3}=\\frac{" + emf + "}{" + res3[0] + res3[2] + "}=\\underline{\\mathbf{" + i3[1] + "\\ " + 
                                                                                                i3[3] + "\\ (2\\ dp)}}\\\\[25pt]";
            suma += "\\end{aligned}$$";
            break;
        case 2:
            // Missing info: E, R3 & I2
            var r1, r2, r3, rt, res1, res2, res3, rest, is, emf, i1, i2, i3;
            do {
                r1 = rndgen(50, 900, 0, 5, -1);
                r2 = rndgen(50, 900, 0, 5, -1);
                r3 = rndgen(50, 900, 0, 5, -1);
                rt = (1 / ((1 / r1) + (1 / r2) + (1 / r3)));
                emf = rndgen(50, 200, 0, 5, -1);
                is = emf / rt;
            } while(r1 === r2 || r1 === r3 || r2 === r3 || rt < 15 || rt > 300 || is < 0.5 || is > 12 || is - dp(is, 2, -1) !== 0)
            i1 = irvformat(dp(emf / r1, 5, -1), "i");
            i2 = irvformat(dp(emf / r2, 5, -1), "i");
            i3 = irvformat(dp(emf / r3, 5, -1), "i");
            is = irvformat(is, "i");
            res1 = irvformat(r1, "r");
            res2 = irvformat(r2, "r");
            res3 = irvformat(r3, "r");
            rest = irvformat(rt, "r");
            
            var img = document.getElementById("3rparallelcalc");
            ctx.drawImage(img, origx, origy, 531, 375);
            ctx.font = "bold 20px Comic Sans MS";
            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            ctx.fillText("EMF", origx - 5, origy + 175);
            // ctx.fillText(emf + " v", origx - 5, origy + 195);
            ctx.fillText("I\u209B", origx + 180, origy + 15);
            ctx.fillText("R\u2081", origx + 155, origy + 175);
            ctx.fillText(res1[0] + " " + res1[3], origx + 155, origy + 195);
            ctx.fillText("R\u2082", origx + 300, origy + 175);
            ctx.fillText(res2[0] + " " + res2[3], origx + 300, origy + 195);
            ctx.fillText("R\u2083", origx + 440, origy + 175);
            // ctx.fillText(res3[0] + " " + res3[3], origx + 440, origy + 195);
            ctx.fillText("I\u2081", origx + 145, origy + 100);
            ctx.fillText(i1[0] + " " + i1[3], origx + 145, origy + 120);
            ctx.fillText("I\u2082", origx + 290, origy + 100);
            // ctx.fillText(i2[0] + " " + i2[3], origx + 290, origy + 120);
            ctx.fillText("I\u2083", origx + 430, origy + 100);
            ctx.fillText(i3[0] + " " + i3[3], origx + 430, origy + 120);

            sumq += "Calculate:<br>";
            sumq += "a. The EMF of the circuit<br>b. The current flowing through R<sub>2</sub><br>c. The supply current, I<sub>S</sub>";
            
            suma += "$$\\begin{aligned}a.\\ E&=I_1 \\times R_1\\\\[5pt]";
            suma += "&=" + i1[0] + i1[2] + " \\times " + res1[0] + "\\\\[5pt]";
            suma += "&=\\underline{\\mathbf{" + dp(i1[4] * res1[0], 0, -1) + "\\ V}}\\\\[20pt]";
            suma += "b.\\ I_2&=\\frac{E}{R_2}\\\\[5pt]";
            suma += "&=\\frac{" + emf + "}{" + res2[0] + "}\\\\[5pt]";
            suma += "&=\\underline{\\mathbf{" + i2[0] + "\\ " + i2[3] + "}}\\\\[20pt]";
            suma += "c.\\ I_S&=I_1 + I_2 + I_3\\\\[5pt]";
            suma += "&=" + i1[0] + i1[2] + "+" + i2[0] + i2[2] + "+" + i3[0] + i3[2] + "\\\\[5pt]";
            suma += "&=\\underline{\\mathbf{" + is[0] + "\\ " + is[3] + "}}\\\\[5pt]";
            suma += "\\end{aligned}$$";
            break;
        case 3:
            // Missing info: E, R1 & I3
            var r1, r2, r3, rt, res1, res2, res3, rest, is, emf, i1, i2, i3;
            do {
                r1 = rndgen(50, 900, 0, 5, -1);
                r2 = rndgen(50, 900, 0, 5, -1);
                r3 = rndgen(50, 900, 0, 5, -1);
                rt = (1 / ((1 / r1) + (1 / r2) + (1 / r3)));
                emf = rndgen(50, 200, 0, 5, -1);
                is = emf / rt;
            } while(r1 === r2 || r1 === r3 || r2 === r3 || rt < 15 || rt > 300 || is < 0.5 || is > 12 || is - dp(is, 2, -1) !== 0)
            i1 = irvformat(dp(emf / r1, 5, -1), "i");
            i2 = irvformat(dp(emf / r2, 5, -1), "i");
            i3 = irvformat(dp(emf / r3, 5, -1), "i");
            is = irvformat(is, "i");
            res1 = irvformat(r1, "r");
            res2 = irvformat(r2, "r");
            res3 = irvformat(r3, "r");
            rest = irvformat(rt, "r");
            
            var img = document.getElementById("3rparallelcalc");
            ctx.drawImage(img, origx, origy, 531, 375);
            ctx.font = "bold 20px Comic Sans MS";
            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            ctx.fillText("EMF", origx - 5, origy + 175);
            // ctx.fillText(emf + " v", origx - 5, origy + 195);
            ctx.fillText("I\u209B", origx + 180, origy + 15);
            ctx.fillText("R\u2081", origx + 155, origy + 175);
            // ctx.fillText(res1[0] + " " + res1[3], origx + 155, origy + 195);
            ctx.fillText("R\u2082", origx + 300, origy + 175);
            ctx.fillText(res2[0] + " " + res2[3], origx + 300, origy + 195);
            ctx.fillText("R\u2083", origx + 440, origy + 175);
            ctx.fillText(res3[0] + " " + res3[3], origx + 440, origy + 195);
            ctx.fillText("I\u2081", origx + 145, origy + 100);
            ctx.fillText(i1[0] + " " + i1[3], origx + 145, origy + 120);
            ctx.fillText("I\u2082", origx + 290, origy + 100);
            ctx.fillText(i2[0] + " " + i2[3], origx + 290, origy + 120);
            ctx.fillText("I\u2083", origx + 430, origy + 100);
            // ctx.fillText(i3[0] + " " + i3[3], origx + 430, origy + 120);

            sumq += "Calculate:<br>";
            sumq += "a. The EMF of the circuit<br>b. The current flowing through R<sub>3</sub><br>c. The supply current, I<sub>S</sub>";
            
            suma += "$$\\begin{aligned}a.\\ E&=I_2 \\times R_2\\\\[5pt]";
            suma += "&=" + i2[0] + i2[2] + " \\times " + res2[0] + "\\\\[5pt]";
            suma += "&=\\underline{\\mathbf{" + dp(i2[4] * res2[0], 0, -1) + "\\ V}}\\\\[20pt]";
            suma += "b.\\ I_3&=\\frac{E}{R_3}\\\\[5pt]";
            suma += "&=\\frac{" + emf + "}{" + res3[0] + "}\\\\[5pt]";
            suma += "&=\\underline{\\mathbf{" + i3[0] + "\\ " + i3[3] + "}}\\\\[20pt]";
            suma += "c.\\ I_S&=I_1 + I_2 + I_3\\\\[5pt]";
            suma += "&=" + i1[0] + i1[2] + "+" + i2[0] + i2[2] + "+" + i3[0] + i3[2] + "\\\\[5pt]";
            suma += "&=\\underline{\\mathbf{" + is[0] + "\\ " + is[3] + "}}\\\\[5pt]";
            suma += "\\end{aligned}$$";
            break;
        case 4:
            // Missing info: E, R2 & I1
            var r1, r2, r3, rt, res1, res2, res3, rest, is, emf, i1, i2, i3;
            do {
                r1 = rndgen(50, 900, 0, 5, -1);
                r2 = rndgen(50, 900, 0, 5, -1);
                r3 = rndgen(50, 900, 0, 5, -1);
                rt = (1 / ((1 / r1) + (1 / r2) + (1 / r3)));
                emf = rndgen(50, 200, 0, 5, -1);
                is = emf / rt;
            } while(r1 === r2 || r1 === r3 || r2 === r3 || rt < 15 || rt > 300 || is < 0.5 || is > 12 || is - dp(is, 2, -1) !== 0)
            i1 = irvformat(dp(emf / r1, 5, -1), "i");
            i2 = irvformat(dp(emf / r2, 5, -1), "i");
            i3 = irvformat(dp(emf / r3, 5, -1), "i");
            is = irvformat(is, "i");
            res1 = irvformat(r1, "r");
            res2 = irvformat(r2, "r");
            res3 = irvformat(r3, "r");
            rest = irvformat(rt, "r");
            
            var img = document.getElementById("3rparallelcalc");
            ctx.drawImage(img, origx, origy, 531, 375);
            ctx.font = "bold 20px Comic Sans MS";
            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            ctx.fillText("EMF", origx - 5, origy + 175);
            // ctx.fillText(emf + " v", origx - 5, origy + 195);
            ctx.fillText("I\u209B", origx + 180, origy + 15);
            ctx.fillText("R\u2081", origx + 155, origy + 175);
            ctx.fillText(res1[0] + " " + res1[3], origx + 155, origy + 195);
            ctx.fillText("R\u2082", origx + 300, origy + 175);
            // ctx.fillText(res2[0] + " " + res2[3], origx + 300, origy + 195);
            ctx.fillText("R\u2083", origx + 440, origy + 175);
            ctx.fillText(res3[0] + " " + res3[3], origx + 440, origy + 195);
            ctx.fillText("I\u2081", origx + 145, origy + 100);
            // ctx.fillText(i1[0] + " " + i1[3], origx + 145, origy + 120);
            ctx.fillText("I\u2082", origx + 290, origy + 100);
            ctx.fillText(i2[0] + " " + i2[3], origx + 290, origy + 120);
            ctx.fillText("I\u2083", origx + 430, origy + 100);
            ctx.fillText(i3[0] + " " + i3[3], origx + 430, origy + 120);

            sumq += "Calculate:<br>";
            sumq += "a. The EMF of the circuit<br>b. The current flowing through R<sub>1</sub><br>c. The supply current, I<sub>S</sub>";
            
            suma += "$$\\begin{aligned}a.\\ E&=I_3 \\times R_3\\\\[5pt]";
            suma += "&=" + i3[0] + i3[2] + " \\times " + res3[0] + "\\\\[5pt]";
            suma += "&=\\underline{\\mathbf{" + dp(i3[4] * res3[0], 0, -1) + "\\ V}}\\\\[20pt]";
            suma += "b.\\ I_1&=\\frac{E}{R_1}\\\\[5pt]";
            suma += "&=\\frac{" + emf + "}{" + res1[0] + "}\\\\[5pt]";
            suma += "&=\\underline{\\mathbf{" + i1[0] + "\\ " + i1[3] + "}}\\\\[20pt]";
            suma += "c.\\ I_S&=I_1 + I_2 + I_3\\\\[5pt]";
            suma += "&=" + i1[0] + i1[2] + "+" + i2[0] + i2[2] + "+" + i3[0] + i3[2] + "\\\\[5pt]";
            suma += "&=\\underline{\\mathbf{" + is[0] + "\\ " + is[3] + "}}\\\\[5pt]";
            suma += "\\end{aligned}$$";
            break;
    }

    document.getElementById("q").innerHTML = sumq;
    document.getElementById("btnSoln").style.visibility="visible";
}