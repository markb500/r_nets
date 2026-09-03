// js/registry.js
import * as seriesr from './generators/seriesr.js';
import * as parallelr from './generators/parallelr.js';
import * as r3combo from './generators/r3combo.js';
import * as r4combo1 from './generators/r4combo1.js';
import * as r4combo2 from './generators/r4combo2.js';
import * as r5combo1 from './generators/r5combo1.js';
import * as r6combo1 from './generators/r6combo1.js';
import * as r6combo2 from './generators/r6combo2.js';

export const registry = {
  seriesr,
  parallelr,
  r3combo,
  r4combo1,
  r4combo2,
  r5combo1,
  r6combo1,
  r6combo2,

  get(topic) {
    const gen = this[topic];
    if (!gen || typeof gen.generate !== 'function') {
      throw new Error('No generator for: ' + topic);
    }
    return gen;
  }
};

window.registry = registry;
