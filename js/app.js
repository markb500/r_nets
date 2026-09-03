// js/app.js — Resistor Network Revision
import { registry } from './registry.js';
import {
  eqnformat,
  loadImages,
  removeLeadbr
} from './utils.js';

let currentSumData = null;
let solutionShowing = false;
let solnWin = null;
let viewCount = 0;

function $(id) {
  return document.getElementById(id);
}

function setSolutionExpanded(expanded) {
  const btn = $('btnSoln');
  if (btn) btn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
}

function updateDiagramDescription(show, forSolution) {
  const descEl = $('diagramDesc');
  if (!descEl) return;
  let text = '';
  if (show && currentSumData && currentSumData.canvas) {
    const c = currentSumData.canvas;
    text = forSolution
      ? c.solutionDescription || c.description || ''
      : c.description || '';
  }
  if (text) {
    descEl.textContent = text;
    descEl.hidden = false;
  } else {
    descEl.textContent = '';
    descEl.hidden = true;
  }
}

function drawCanvas(canvas, drawFn) {
  if (!canvas || typeof drawFn !== 'function') return;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFn(ctx);
}

function updateViewCount() {
  const el = $('viewCount');
  if (el) el.textContent = String(viewCount);
}


function getSelectedBackground() {
  const sel = $('colourSelect');
  return sel && sel.value ? sel.value : '#ffffff';
}

function applyBackgroundToSolnWin() {
  if (!solnWin || solnWin.closed) return;
  try {
    const bg = getSelectedBackground();
    if (solnWin.document && solnWin.document.body) {
      solnWin.document.body.style.backgroundColor = bg;
    }
  } catch (err) {
    console.warn('Could not set SolnWin background:', err);
  }
}

function pushSolutionWindow() {
  if (!solnWin || solnWin.closed || !currentSumData) return;
  applyBackgroundToSolnWin();
  try {
    const a2 = solnWin.document.getElementById('a2');
    if (!a2) return;
    a2.innerHTML = removeLeadbr(currentSumData.solution || '');
    if (solnWin.eqnformat) solnWin.eqnformat('a2');
    else if (solnWin.MathJax && solnWin.MathJax.Hub) {
      solnWin.MathJax.Hub.Queue(['Typeset', solnWin.MathJax.Hub, 'a2']);
    }
  } catch (e) {
    /* cross-window timing */
  }
}

function openSolutionWindow() {
  solnWin = window.open('SolnWin.html', 'SolnWin', 'resizable=yes,scrollbars=yes');
  if (solnWin) {
    solnWin.addEventListener('load', () => {
      applyBackgroundToSolnWin();
      pushSolutionWindow();
    });
    setTimeout(() => {
      applyBackgroundToSolnWin();
      pushSolutionWindow();
    }, 400);
  }
}

function generateQuestion(topic) {
  const qEl = $('q');
  const aEl = $('a');
  const canvas = $('myCanvas');
  const btnSoln = $('btnSoln');
  const notes = $('noteslink');

  solutionShowing = false;
  setSolutionExpanded(false);
  viewCount = 0;
  updateViewCount();

  if (aEl) {
    aEl.innerHTML = '';
    aEl.style.visibility = 'hidden';
  }
  if (canvas) {
    canvas.width = 0.5;
    canvas.height = 0.5;
    canvas.style.visibility = 'hidden';
  }
  updateDiagramDescription(false);

  try {
    const gen = registry.get(topic);
    currentSumData = gen.generate();
  } catch (err) {
    console.error('generateQuestion failed:', topic, err);
    if (qEl) {
      qEl.textContent =
        'Could not generate question for “' + topic + '”. See the browser console for details.';
    }
    currentSumData = null;
    if (btnSoln) btnSoln.style.visibility = 'hidden';
    return;
  }

  if (qEl) qEl.innerHTML = currentSumData.question || '';
  eqnformat('q');

  if (notes) {
    if (currentSumData.notesLink) {
      notes.style.visibility = 'visible';
      notes.onclick = (e) => {
        e.preventDefault();
        window.open(currentSumData.notesLink, '_blank');
      };
    } else {
      notes.style.visibility = 'hidden';
      notes.onclick = null;
    }
  }

  if (currentSumData.canvas && typeof currentSumData.canvas.draw === 'function') {
    if (canvas) {
      canvas.width = currentSumData.canvas.width || 500;
      canvas.height = currentSumData.canvas.height || 400;
      canvas.style.visibility = 'visible';
      // Question diagrams show with the question (not withSolution-only)
      if (!currentSumData.canvas.withSolution) {
        drawCanvas(canvas, currentSumData.canvas.draw);
        updateDiagramDescription(true, false);
      } else {
        canvas.width = 0.5;
        canvas.height = 0.5;
        canvas.style.visibility = 'hidden';
      }
    }
  }

  if (btnSoln) btnSoln.style.visibility = 'visible';
  pushSolutionWindow();
}

function toggleSolution() {
  if (!currentSumData) return;
  const aDiv = $('a');
  const canvas = $('myCanvas');
  if (!aDiv) return;

  if (!solutionShowing) {
    aDiv.innerHTML = currentSumData.solution || '';
    aDiv.style.visibility = 'visible';
    solutionShowing = true;
    setSolutionExpanded(true);
    viewCount += 1;
    updateViewCount();
    eqnformat('a');

    if (
      currentSumData.canvas &&
      currentSumData.canvas.withSolution &&
      typeof currentSumData.canvas.draw === 'function' &&
      canvas
    ) {
      canvas.width = currentSumData.canvas.width || 500;
      canvas.height = currentSumData.canvas.height || 400;
      canvas.style.visibility = 'visible';
      drawCanvas(canvas, currentSumData.canvas.draw);
    }
    updateDiagramDescription(true, true);
  } else {
    aDiv.innerHTML = '';
    aDiv.style.visibility = 'hidden';
    solutionShowing = false;
    setSolutionExpanded(false);

    if (currentSumData.canvas && currentSumData.canvas.withSolution && canvas) {
      canvas.width = 0.5;
      canvas.height = 0.5;
      canvas.style.visibility = 'hidden';
      updateDiagramDescription(false);
    } else if (currentSumData.canvas && !currentSumData.canvas.withSolution) {
      updateDiagramDescription(true, false);
    } else {
      updateDiagramDescription(false);
    }
  }
}

function wireTopicButtons() {
  document.querySelectorAll('[data-topic]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-topic]').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      generateQuestion(btn.getAttribute('data-topic'));
    });
  });
}

function wireSecretCode() {
  const pressed = [];
  const secretCode = 'chpz';
  window.addEventListener('keyup', (e) => {
    pressed.push(e.key);
    pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);
    if (pressed.join('').includes(secretCode)) openSolutionWindow();
  });
}

async function init() {
  try {
    await loadImages();
  } catch (err) {
    console.error('Image preload failed:', err);
  }
  wireTopicButtons();
  wireSecretCode();

  const btnSoln = $('btnSoln');
  if (btnSoln) {
    btnSoln.addEventListener('click', toggleSolution);
    setSolutionExpanded(false);
  }

  const btnSolnWin = $('btnStaffSoln');
  if (btnSolnWin) btnSolnWin.addEventListener('click', openSolutionWindow);

  const bg = $('colourSelect');
  if (bg) {
    bg.addEventListener('change', () => {
      document.body.style.backgroundColor = bg.value;
      applyBackgroundToSolnWin();
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
