# Resistor Network Revision Questions

ES-module refactor of the original R_Nets revision app (same topics and calculation logic).

## Quick start

Serve over HTTP (ES modules need a server, not `file://`):

```bash
cd "R_Nets"
npx serve .
# or: python3 -m http.server 8080
```

## Structure

```
R_Nets/
├── index.html
├── SolnWin.html
├── css/main.css
├── js/
│   ├── app.js
│   ├── registry.js
│   ├── utils.js
│   └── generators/   # seriesr, parallelr, r3combo, …
├── images/
└── rnetHelp/
```

## Topics

Series R, Parallel R, 3R–6R combination networks. Each button generates a new randomised question with a step-by-step MathJax solution.

## Teacher solution window

- **Separate solution window** button, or legacy secret code `chpz`
- Solutions update in that window when a new question is generated

## Notes

- Circuit diagrams are drawn on canvas from the original PNG templates plus value labels.
- Training notes links open the course PDF at the relevant page where configured.
