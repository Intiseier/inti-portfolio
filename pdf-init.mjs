// Loads the self-hosted PDF.js build (ES module) and exposes it as
// window.pdfjsLib for script.js, which only touches it on user click —
// long after this deferred module has run.
import * as pdfjsLib from './vendor/pdf.min.mjs';

pdfjsLib.GlobalWorkerOptions.workerSrc = 'vendor/pdf.worker.min.mjs';
window.pdfjsLib = pdfjsLib;
