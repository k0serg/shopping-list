(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.idb = {}));
})(this, (function (exports) {
  // Полная реализация idb.js
  // Для упрощения можно использовать CDN: https://cdn.jsdelivr.net/npm/idb @7/build/umd.min.js
}));
