// Returns whether the `js-string` built-in is supported.
function detectJsStringBuiltins() {
  let bytes = [
    0,   97,  115, 109, 1,   0,   0,  0,   1,   4,   1,   96,  0,
    0,   2,   23,  1,   14,  119, 97, 115, 109, 58,  106, 115, 45,
    115, 116, 114, 105, 110, 103, 4,  99,  97,  115, 116, 0,   0
  ];
  return WebAssembly.validate(
    new Uint8Array(bytes), {builtins: ['js-string']});
}

// Compiles a dart2wasm-generated main module from `source` which can then
// instantiatable via the `instantiate` method.
//
// `source` needs to be a `Response` object (or promise thereof) e.g. created
// via the `fetch()` JS API.
export async function compileStreaming(source) {
  const builtins = detectJsStringBuiltins()
      ? {builtins: ['js-string']} : {};
  return new CompiledApp(
      await WebAssembly.compileStreaming(source, builtins), builtins);
}

// Compiles a dart2wasm-generated wasm modules from `bytes` which is then
// instantiatable via the `instantiate` method.
export async function compile(bytes) {
  const builtins = detectJsStringBuiltins()
      ? {builtins: ['js-string']} : {};
  return new CompiledApp(await WebAssembly.compile(bytes, builtins), builtins);
}

// DEPRECATED: Please use `compile` or `compileStreaming` to get a compiled app,
// use `instantiate` method to get an instantiated app and then call
// `invokeMain` to invoke the main function.
export async function instantiate(modulePromise, importObjectPromise) {
  var moduleOrCompiledApp = await modulePromise;
  if (!(moduleOrCompiledApp instanceof CompiledApp)) {
    moduleOrCompiledApp = new CompiledApp(moduleOrCompiledApp);
  }
  const instantiatedApp = await moduleOrCompiledApp.instantiate(await importObjectPromise);
  return instantiatedApp.instantiatedModule;
}

// DEPRECATED: Please use `compile` or `compileStreaming` to get a compiled app,
// use `instantiate` method to get an instantiated app and then call
// `invokeMain` to invoke the main function.
export const invoke = (moduleInstance, ...args) => {
  moduleInstance.exports.$invokeMain(args);
}

class CompiledApp {
  constructor(module, builtins) {
    this.module = module;
    this.builtins = builtins;
  }

  // The second argument is an options object containing:
  // `loadDeferredWasm` is a JS function that takes a module name matching a
  //   wasm file produced by the dart2wasm compiler and returns the bytes to
  //   load the module. These bytes can be in either a format supported by
  //   `WebAssembly.compile` or `WebAssembly.compileStreaming`.
  async instantiate(additionalImports, {loadDeferredWasm} = {}) {
    let dartInstance;

    // Prints to the console
    function printToConsole(value) {
      if (typeof dartPrint == "function") {
        dartPrint(value);
        return;
      }
      if (typeof console == "object" && typeof console.log != "undefined") {
        console.log(value);
        return;
      }
      if (typeof print == "function") {
        print(value);
        return;
      }

      throw "Unable to print message: " + js;
    }

    // Converts a Dart List to a JS array. Any Dart objects will be converted, but
    // this will be cheap for JSValues.
    function arrayFromDartList(constructor, list) {
      const exports = dartInstance.exports;
      const read = exports.$listRead;
      const length = exports.$listLength(list);
      const array = new constructor(length);
      for (let i = 0; i < length; i++) {
        array[i] = read(list, i);
      }
      return array;
    }

    // A special symbol attached to functions that wrap Dart functions.
    const jsWrappedDartFunctionSymbol = Symbol("JSWrappedDartFunction");

    function finalizeWrapper(dartFunction, wrapped) {
      wrapped.dartFunction = dartFunction;
      wrapped[jsWrappedDartFunctionSymbol] = true;
      return wrapped;
    }

    // Imports
    const dart2wasm = {

      _1: (x0,x1,x2) => x0.set(x1,x2),
      _2: (x0,x1,x2) => x0.set(x1,x2),
      _6: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._6(f,arguments.length,x0) }),
      _7: x0 => new window.FinalizationRegistry(x0),
      _8: (x0,x1,x2,x3) => x0.register(x1,x2,x3),
      _9: (x0,x1) => x0.unregister(x1),
      _10: (x0,x1,x2) => x0.slice(x1,x2),
      _11: (x0,x1) => x0.decode(x1),
      _12: (x0,x1) => x0.segment(x1),
      _13: () => new TextDecoder(),
      _14: x0 => x0.buffer,
      _15: x0 => x0.wasmMemory,
      _16: () => globalThis.window._flutter_skwasmInstance,
      _17: x0 => x0.rasterStartMilliseconds,
      _18: x0 => x0.rasterEndMilliseconds,
      _19: x0 => x0.imageBitmaps,
      _192: x0 => x0.select(),
      _193: (x0,x1) => x0.append(x1),
      _194: x0 => x0.remove(),
      _197: x0 => x0.unlock(),
      _202: x0 => x0.getReader(),
      _211: x0 => new MutationObserver(x0),
      _222: (x0,x1,x2) => x0.addEventListener(x1,x2),
      _223: (x0,x1,x2) => x0.removeEventListener(x1,x2),
      _226: x0 => new ResizeObserver(x0),
      _229: (x0,x1) => new Intl.Segmenter(x0,x1),
      _230: x0 => x0.next(),
      _231: (x0,x1) => new Intl.v8BreakIterator(x0,x1),
      _308: x0 => x0.close(),
      _309: (x0,x1,x2,x3,x4) => ({type: x0,data: x1,premultiplyAlpha: x2,colorSpaceConversion: x3,preferAnimation: x4}),
      _310: x0 => new window.ImageDecoder(x0),
      _311: x0 => x0.close(),
      _312: x0 => ({frameIndex: x0}),
      _313: (x0,x1) => x0.decode(x1),
      _316: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._316(f,arguments.length,x0) }),
      _317: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._317(f,arguments.length,x0) }),
      _318: (x0,x1) => ({addView: x0,removeView: x1}),
      _319: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._319(f,arguments.length,x0) }),
      _320: f => finalizeWrapper(f, function() { return dartInstance.exports._320(f,arguments.length) }),
      _321: (x0,x1) => ({initializeEngine: x0,autoStart: x1}),
      _322: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._322(f,arguments.length,x0) }),
      _323: x0 => ({runApp: x0}),
      _324: x0 => new Uint8Array(x0),
      _326: x0 => x0.preventDefault(),
      _327: x0 => x0.stopPropagation(),
      _328: (x0,x1) => x0.addListener(x1),
      _329: (x0,x1) => x0.removeListener(x1),
      _330: (x0,x1) => x0.prepend(x1),
      _331: x0 => x0.remove(),
      _332: x0 => x0.disconnect(),
      _333: (x0,x1) => x0.addListener(x1),
      _334: (x0,x1) => x0.removeListener(x1),
      _336: (x0,x1) => x0.append(x1),
      _337: x0 => x0.remove(),
      _338: x0 => x0.stopPropagation(),
      _342: x0 => x0.preventDefault(),
      _343: (x0,x1) => x0.append(x1),
      _344: x0 => x0.remove(),
      _345: x0 => x0.preventDefault(),
      _350: (x0,x1) => x0.removeChild(x1),
      _351: (x0,x1) => x0.appendChild(x1),
      _352: (x0,x1,x2) => x0.insertBefore(x1,x2),
      _353: (x0,x1) => x0.appendChild(x1),
      _354: (x0,x1) => x0.transferFromImageBitmap(x1),
      _356: (x0,x1) => x0.append(x1),
      _357: (x0,x1) => x0.append(x1),
      _358: (x0,x1) => x0.append(x1),
      _359: x0 => x0.remove(),
      _360: x0 => x0.remove(),
      _361: x0 => x0.remove(),
      _362: (x0,x1) => x0.appendChild(x1),
      _363: (x0,x1) => x0.appendChild(x1),
      _364: x0 => x0.remove(),
      _365: (x0,x1) => x0.append(x1),
      _366: (x0,x1) => x0.append(x1),
      _367: x0 => x0.remove(),
      _368: (x0,x1) => x0.append(x1),
      _369: (x0,x1) => x0.append(x1),
      _370: (x0,x1,x2) => x0.insertBefore(x1,x2),
      _371: (x0,x1) => x0.append(x1),
      _372: (x0,x1,x2) => x0.insertBefore(x1,x2),
      _373: x0 => x0.remove(),
      _374: x0 => x0.remove(),
      _375: (x0,x1) => x0.append(x1),
      _376: x0 => x0.remove(),
      _377: (x0,x1) => x0.append(x1),
      _378: x0 => x0.remove(),
      _379: x0 => x0.remove(),
      _380: x0 => x0.getBoundingClientRect(),
      _381: x0 => x0.remove(),
      _394: (x0,x1) => x0.append(x1),
      _395: x0 => x0.remove(),
      _396: (x0,x1) => x0.append(x1),
      _397: (x0,x1,x2) => x0.insertBefore(x1,x2),
      _398: x0 => x0.preventDefault(),
      _399: x0 => x0.preventDefault(),
      _400: x0 => x0.preventDefault(),
      _401: x0 => x0.preventDefault(),
      _402: x0 => x0.remove(),
      _403: (x0,x1) => x0.observe(x1),
      _404: x0 => x0.disconnect(),
      _405: (x0,x1) => x0.appendChild(x1),
      _406: (x0,x1) => x0.appendChild(x1),
      _407: (x0,x1) => x0.appendChild(x1),
      _408: (x0,x1) => x0.append(x1),
      _409: x0 => x0.remove(),
      _410: (x0,x1) => x0.append(x1),
      _412: (x0,x1) => x0.appendChild(x1),
      _413: (x0,x1) => x0.append(x1),
      _414: x0 => x0.remove(),
      _415: (x0,x1) => x0.append(x1),
      _419: (x0,x1) => x0.appendChild(x1),
      _420: x0 => x0.remove(),
      _979: () => globalThis.window.flutterConfiguration,
      _980: x0 => x0.assetBase,
      _985: x0 => x0.debugShowSemanticsNodes,
      _986: x0 => x0.hostElement,
      _987: x0 => x0.multiViewEnabled,
      _988: x0 => x0.nonce,
      _990: x0 => x0.fontFallbackBaseUrl,
      _991: x0 => x0.useColorEmoji,
      _996: x0 => x0.console,
      _997: x0 => x0.devicePixelRatio,
      _998: x0 => x0.document,
      _999: x0 => x0.history,
      _1000: x0 => x0.innerHeight,
      _1001: x0 => x0.innerWidth,
      _1002: x0 => x0.location,
      _1003: x0 => x0.navigator,
      _1004: x0 => x0.visualViewport,
      _1005: x0 => x0.performance,
      _1008: (x0,x1) => x0.dispatchEvent(x1),
      _1009: (x0,x1) => x0.matchMedia(x1),
      _1011: (x0,x1) => x0.getComputedStyle(x1),
      _1012: x0 => x0.screen,
      _1013: (x0,x1) => x0.requestAnimationFrame(x1),
      _1014: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1014(f,arguments.length,x0) }),
      _1019: (x0,x1) => x0.warn(x1),
      _1022: () => globalThis.window,
      _1023: () => globalThis.Intl,
      _1024: () => globalThis.Symbol,
      _1027: x0 => x0.clipboard,
      _1028: x0 => x0.maxTouchPoints,
      _1029: x0 => x0.vendor,
      _1030: x0 => x0.language,
      _1031: x0 => x0.platform,
      _1032: x0 => x0.userAgent,
      _1033: x0 => x0.languages,
      _1034: x0 => x0.documentElement,
      _1035: (x0,x1) => x0.querySelector(x1),
      _1038: (x0,x1) => x0.createElement(x1),
      _1039: (x0,x1) => x0.execCommand(x1),
      _1043: (x0,x1) => x0.createTextNode(x1),
      _1044: (x0,x1) => x0.createEvent(x1),
      _1048: x0 => x0.head,
      _1049: x0 => x0.body,
      _1050: (x0,x1) => x0.title = x1,
      _1053: x0 => x0.activeElement,
      _1055: x0 => x0.visibilityState,
      _1057: x0 => x0.hasFocus(),
      _1058: () => globalThis.document,
      _1059: (x0,x1,x2,x3) => x0.addEventListener(x1,x2,x3),
      _1060: (x0,x1,x2,x3) => x0.addEventListener(x1,x2,x3),
      _1063: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1063(f,arguments.length,x0) }),
      _1064: x0 => x0.target,
      _1066: x0 => x0.timeStamp,
      _1067: x0 => x0.type,
      _1069: x0 => x0.preventDefault(),
      _1071: (x0,x1,x2,x3) => x0.initEvent(x1,x2,x3),
      _1078: x0 => x0.firstChild,
      _1083: x0 => x0.parentElement,
      _1085: x0 => x0.parentNode,
      _1088: (x0,x1) => x0.removeChild(x1),
      _1089: (x0,x1) => x0.removeChild(x1),
      _1090: x0 => x0.isConnected,
      _1091: (x0,x1) => x0.textContent = x1,
      _1093: (x0,x1) => x0.contains(x1),
      _1099: x0 => x0.firstElementChild,
      _1101: x0 => x0.nextElementSibling,
      _1102: x0 => x0.clientHeight,
      _1103: x0 => x0.clientWidth,
      _1104: x0 => x0.offsetHeight,
      _1105: x0 => x0.offsetWidth,
      _1106: x0 => x0.id,
      _1107: (x0,x1) => x0.id = x1,
      _1110: (x0,x1) => x0.spellcheck = x1,
      _1111: x0 => x0.tagName,
      _1112: x0 => x0.style,
      _1114: (x0,x1) => x0.append(x1),
      _1115: (x0,x1) => x0.getAttribute(x1),
      _1116: x0 => x0.getBoundingClientRect(),
      _1119: (x0,x1) => x0.closest(x1),
      _1122: (x0,x1) => x0.querySelectorAll(x1),
      _1124: x0 => x0.remove(),
      _1125: (x0,x1,x2) => x0.setAttribute(x1,x2),
      _1126: (x0,x1) => x0.removeAttribute(x1),
      _1127: (x0,x1) => x0.tabIndex = x1,
      _1129: (x0,x1) => x0.focus(x1),
      _1130: x0 => x0.scrollTop,
      _1131: (x0,x1) => x0.scrollTop = x1,
      _1132: x0 => x0.scrollLeft,
      _1133: (x0,x1) => x0.scrollLeft = x1,
      _1134: x0 => x0.classList,
      _1135: (x0,x1) => x0.className = x1,
      _1140: (x0,x1) => x0.getElementsByClassName(x1),
      _1142: x0 => x0.click(),
      _1144: (x0,x1) => x0.hasAttribute(x1),
      _1147: (x0,x1) => x0.attachShadow(x1),
      _1152: (x0,x1) => x0.getPropertyValue(x1),
      _1154: (x0,x1,x2,x3) => x0.setProperty(x1,x2,x3),
      _1156: (x0,x1) => x0.removeProperty(x1),
      _1158: x0 => x0.offsetLeft,
      _1159: x0 => x0.offsetTop,
      _1160: x0 => x0.offsetParent,
      _1162: (x0,x1) => x0.name = x1,
      _1163: x0 => x0.content,
      _1164: (x0,x1) => x0.content = x1,
      _1182: (x0,x1) => x0.nonce = x1,
      _1187: x0 => x0.now(),
      _1189: (x0,x1) => x0.width = x1,
      _1191: (x0,x1) => x0.height = x1,
      _1196: (x0,x1) => x0.getContext(x1),
      _1273: (x0,x1) => x0.fetch(x1),
      _1274: x0 => x0.status,
      _1275: x0 => x0.headers,
      _1276: x0 => x0.body,
      _1278: x0 => x0.arrayBuffer(),
      _1281: (x0,x1) => x0.get(x1),
      _1283: x0 => x0.read(),
      _1284: x0 => x0.value,
      _1285: x0 => x0.done,
      _1287: x0 => x0.name,
      _1288: x0 => x0.x,
      _1289: x0 => x0.y,
      _1292: x0 => x0.top,
      _1293: x0 => x0.right,
      _1294: x0 => x0.bottom,
      _1295: x0 => x0.left,
      _1304: x0 => x0.height,
      _1305: x0 => x0.width,
      _1306: (x0,x1) => x0.value = x1,
      _1308: (x0,x1) => x0.placeholder = x1,
      _1309: (x0,x1) => x0.name = x1,
      _1310: x0 => x0.selectionDirection,
      _1311: x0 => x0.selectionStart,
      _1312: x0 => x0.selectionEnd,
      _1315: x0 => x0.value,
      _1317: (x0,x1,x2) => x0.setSelectionRange(x1,x2),
      _1321: x0 => x0.readText(),
      _1322: (x0,x1) => x0.writeText(x1),
      _1323: x0 => x0.altKey,
      _1324: x0 => x0.code,
      _1325: x0 => x0.ctrlKey,
      _1326: x0 => x0.key,
      _1327: x0 => x0.keyCode,
      _1328: x0 => x0.location,
      _1329: x0 => x0.metaKey,
      _1330: x0 => x0.repeat,
      _1331: x0 => x0.shiftKey,
      _1332: x0 => x0.isComposing,
      _1333: (x0,x1) => x0.getModifierState(x1),
      _1335: x0 => x0.state,
      _1336: (x0,x1) => x0.go(x1),
      _1338: (x0,x1,x2,x3) => x0.pushState(x1,x2,x3),
      _1339: (x0,x1,x2,x3) => x0.replaceState(x1,x2,x3),
      _1340: x0 => x0.pathname,
      _1341: x0 => x0.search,
      _1342: x0 => x0.hash,
      _1346: x0 => x0.state,
      _1352: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._1352(f,arguments.length,x0,x1) }),
      _1354: (x0,x1,x2) => x0.observe(x1,x2),
      _1357: x0 => x0.attributeName,
      _1358: x0 => x0.type,
      _1359: x0 => x0.matches,
      _1362: x0 => x0.matches,
      _1364: x0 => x0.relatedTarget,
      _1365: x0 => x0.clientX,
      _1366: x0 => x0.clientY,
      _1367: x0 => x0.offsetX,
      _1368: x0 => x0.offsetY,
      _1371: x0 => x0.button,
      _1372: x0 => x0.buttons,
      _1373: x0 => x0.ctrlKey,
      _1374: (x0,x1) => x0.getModifierState(x1),
      _1377: x0 => x0.pointerId,
      _1378: x0 => x0.pointerType,
      _1379: x0 => x0.pressure,
      _1380: x0 => x0.tiltX,
      _1381: x0 => x0.tiltY,
      _1382: x0 => x0.getCoalescedEvents(),
      _1384: x0 => x0.deltaX,
      _1385: x0 => x0.deltaY,
      _1386: x0 => x0.wheelDeltaX,
      _1387: x0 => x0.wheelDeltaY,
      _1388: x0 => x0.deltaMode,
      _1394: x0 => x0.changedTouches,
      _1396: x0 => x0.clientX,
      _1397: x0 => x0.clientY,
      _1399: x0 => x0.data,
      _1402: (x0,x1) => x0.disabled = x1,
      _1403: (x0,x1) => x0.type = x1,
      _1404: (x0,x1) => x0.max = x1,
      _1405: (x0,x1) => x0.min = x1,
      _1406: (x0,x1) => x0.value = x1,
      _1407: x0 => x0.value,
      _1408: x0 => x0.disabled,
      _1409: (x0,x1) => x0.disabled = x1,
      _1410: (x0,x1) => x0.placeholder = x1,
      _1411: (x0,x1) => x0.name = x1,
      _1412: (x0,x1) => x0.autocomplete = x1,
      _1413: x0 => x0.selectionDirection,
      _1414: x0 => x0.selectionStart,
      _1415: x0 => x0.selectionEnd,
      _1419: (x0,x1,x2) => x0.setSelectionRange(x1,x2),
      _1424: (x0,x1) => x0.add(x1),
      _1427: (x0,x1) => x0.noValidate = x1,
      _1428: (x0,x1) => x0.method = x1,
      _1429: (x0,x1) => x0.action = x1,
      _1454: x0 => x0.orientation,
      _1455: x0 => x0.width,
      _1456: x0 => x0.height,
      _1457: (x0,x1) => x0.lock(x1),
      _1475: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._1475(f,arguments.length,x0,x1) }),
      _1486: x0 => x0.length,
      _1487: (x0,x1) => x0.item(x1),
      _1488: x0 => x0.length,
      _1489: (x0,x1) => x0.item(x1),
      _1490: x0 => x0.iterator,
      _1491: x0 => x0.Segmenter,
      _1492: x0 => x0.v8BreakIterator,
      _1495: x0 => x0.done,
      _1496: x0 => x0.value,
      _1497: x0 => x0.index,
      _1501: (x0,x1) => x0.adoptText(x1),
      _1502: x0 => x0.first(),
      _1503: x0 => x0.next(),
      _1504: x0 => x0.current(),
      _1516: x0 => x0.hostElement,
      _1517: x0 => x0.viewConstraints,
      _1519: x0 => x0.maxHeight,
      _1520: x0 => x0.maxWidth,
      _1521: x0 => x0.minHeight,
      _1522: x0 => x0.minWidth,
      _1523: x0 => x0.loader,
      _1524: () => globalThis._flutter,
      _1525: (x0,x1) => x0.didCreateEngineInitializer(x1),
      _1526: (x0,x1,x2) => x0.call(x1,x2),
      _1527: () => globalThis.Promise,
      _1528: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._1528(f,arguments.length,x0,x1) }),
      _1532: x0 => x0.length,
      _1535: x0 => x0.tracks,
      _1539: x0 => x0.image,
      _1544: x0 => x0.codedWidth,
      _1545: x0 => x0.codedHeight,
      _1548: x0 => x0.duration,
      _1552: x0 => x0.ready,
      _1553: x0 => x0.selectedTrack,
      _1554: x0 => x0.repetitionCount,
      _1555: x0 => x0.frameCount,
      _1599: (x0,x1,x2,x3) => x0.open(x1,x2,x3),
      _1600: (x0,x1,x2) => x0.setRequestHeader(x1,x2),
      _1601: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1601(f,arguments.length,x0) }),
      _1602: (x0,x1,x2) => x0.addEventListener(x1,x2),
      _1603: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1603(f,arguments.length,x0) }),
      _1604: x0 => x0.send(),
      _1605: () => new XMLHttpRequest(),
      _1623: x0 => x0.toArray(),
      _1624: x0 => x0.toUint8Array(),
      _1625: x0 => ({serverTimestamps: x0}),
      _1629: x0 => new firebase_firestore.FieldPath(x0),
      _1630: (x0,x1) => new firebase_firestore.FieldPath(x0,x1),
      _1631: (x0,x1,x2) => new firebase_firestore.FieldPath(x0,x1,x2),
      _1632: (x0,x1,x2,x3) => new firebase_firestore.FieldPath(x0,x1,x2,x3),
      _1633: (x0,x1,x2,x3,x4) => new firebase_firestore.FieldPath(x0,x1,x2,x3,x4),
      _1634: (x0,x1,x2,x3,x4,x5) => new firebase_firestore.FieldPath(x0,x1,x2,x3,x4,x5),
      _1635: (x0,x1,x2,x3,x4,x5,x6) => new firebase_firestore.FieldPath(x0,x1,x2,x3,x4,x5,x6),
      _1636: (x0,x1,x2,x3,x4,x5,x6,x7) => new firebase_firestore.FieldPath(x0,x1,x2,x3,x4,x5,x6,x7),
      _1637: (x0,x1,x2,x3,x4,x5,x6,x7,x8) => new firebase_firestore.FieldPath(x0,x1,x2,x3,x4,x5,x6,x7,x8),
      _1638: (x0,x1,x2,x3,x4,x5,x6,x7,x8,x9) => new firebase_firestore.FieldPath(x0,x1,x2,x3,x4,x5,x6,x7,x8,x9),
      _1639: () => globalThis.firebase_firestore.documentId(),
      _1640: (x0,x1) => new firebase_firestore.GeoPoint(x0,x1),
      _1641: x0 => globalThis.firebase_firestore.vector(x0),
      _1642: x0 => globalThis.firebase_firestore.Bytes.fromUint8Array(x0),
      _1644: (x0,x1) => globalThis.firebase_firestore.collection(x0,x1),
      _1646: (x0,x1) => globalThis.firebase_firestore.doc(x0,x1),
      _1651: x0 => x0.call(),
      _1659: x0 => globalThis.firebase_firestore.terminate(x0),
      _1685: (x0,x1) => ({includeMetadataChanges: x0,source: x1}),
      _1688: (x0,x1,x2,x3) => globalThis.firebase_firestore.onSnapshot(x0,x1,x2,x3),
      _1692: (x0,x1) => globalThis.firebase_firestore.query(x0,x1),
      _1693: (x0,x1) => globalThis.firebase_firestore.query(x0,x1),
      _1697: x0 => globalThis.firebase_firestore.limit(x0),
      _1698: (x0,x1) => globalThis.firebase_firestore.query(x0,x1),
      _1699: x0 => globalThis.firebase_firestore.limitToLast(x0),
      _1700: (x0,x1) => globalThis.firebase_firestore.query(x0,x1),
      _1701: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1701(f,arguments.length,x0) }),
      _1702: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1702(f,arguments.length,x0) }),
      _1703: (x0,x1) => globalThis.firebase_firestore.orderBy(x0,x1),
      _1705: (x0,x1) => globalThis.firebase_firestore.query(x0,x1),
      _1706: (x0,x1) => globalThis.firebase_firestore.query(x0,x1),
      _1707: (x0,x1) => globalThis.firebase_firestore.query(x0,x1),
      _1708: (x0,x1,x2) => globalThis.firebase_firestore.where(x0,x1,x2),
      _1709: (x0,x1) => globalThis.firebase_firestore.query(x0,x1),
      _1710: (x0,x1,x2) => globalThis.firebase_firestore.where(x0,x1,x2),
      _1711: (x0,x1) => globalThis.firebase_firestore.query(x0,x1),
      _1714: x0 => globalThis.firebase_firestore.doc(x0),
      _1717: (x0,x1) => x0.data(x1),
      _1721: x0 => x0.docChanges(),
      _1739: (x0,x1) => globalThis.firebase_firestore.getFirestore(x0,x1),
      _1740: () => globalThis.firebase_firestore.getFirestore(),
      _1741: x0 => globalThis.firebase_firestore.Timestamp.fromMillis(x0),
      _1742: x0 => globalThis.firebase_firestore.Timestamp.fromMillis(x0),
      _1743: f => finalizeWrapper(f, function() { return dartInstance.exports._1743(f,arguments.length) }),
      _1803: () => globalThis.firebase_firestore.or,
      _1804: () => globalThis.firebase_firestore.and,
      _1813: x0 => x0.path,
      _1817: () => globalThis.firebase_firestore.GeoPoint,
      _1818: x0 => x0.latitude,
      _1819: x0 => x0.longitude,
      _1821: () => globalThis.firebase_firestore.VectorValue,
      _1824: () => globalThis.firebase_firestore.Bytes,
      _1828: x0 => x0.type,
      _1830: x0 => x0.doc,
      _1832: x0 => x0.oldIndex,
      _1834: x0 => x0.newIndex,
      _1836: () => globalThis.firebase_firestore.DocumentReference,
      _1840: x0 => x0.path,
      _1850: x0 => x0.metadata,
      _1851: x0 => x0.ref,
      _1859: x0 => x0.docs,
      _1861: x0 => x0.metadata,
      _1869: () => globalThis.firebase_firestore.Timestamp,
      _1870: x0 => x0.seconds,
      _1871: x0 => x0.nanoseconds,
      _1908: x0 => x0.hasPendingWrites,
      _1910: x0 => x0.fromCache,
      _1922: () => globalThis.firebase_firestore.startAfter,
      _1923: () => globalThis.firebase_firestore.startAt,
      _1924: () => globalThis.firebase_firestore.endBefore,
      _1925: () => globalThis.firebase_firestore.endAt,
      _1938: (x0,x1) => x0.createElement(x1),
      _1952: (x0,x1,x2,x3) => x0.open(x1,x2,x3),
      _1954: (x0,x1,x2,x3,x4,x5,x6,x7) => ({apiKey: x0,authDomain: x1,databaseURL: x2,projectId: x3,storageBucket: x4,messagingSenderId: x5,measurementId: x6,appId: x7}),
      _1955: (x0,x1) => globalThis.firebase_core.initializeApp(x0,x1),
      _1956: x0 => globalThis.firebase_core.getApp(x0),
      _1957: () => globalThis.firebase_core.getApp(),
      _1960: () => globalThis.firebase_core.SDK_VERSION,
      _1967: x0 => x0.apiKey,
      _1969: x0 => x0.authDomain,
      _1971: x0 => x0.databaseURL,
      _1973: x0 => x0.projectId,
      _1975: x0 => x0.storageBucket,
      _1977: x0 => x0.messagingSenderId,
      _1979: x0 => x0.measurementId,
      _1981: x0 => x0.appId,
      _1983: x0 => x0.name,
      _1984: x0 => x0.options,
      _1985: (x0,x1) => x0.debug(x1),
      _1986: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1986(f,arguments.length,x0) }),
      _1987: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._1987(f,arguments.length,x0,x1) }),
      _1988: (x0,x1) => ({createScript: x0,createScriptURL: x1}),
      _1989: (x0,x1,x2) => x0.createPolicy(x1,x2),
      _1990: (x0,x1) => x0.createScriptURL(x1),
      _1991: (x0,x1,x2) => x0.createScript(x1,x2),
      _1992: (x0,x1) => x0.appendChild(x1),
      _1993: (x0,x1) => x0.appendChild(x1),
      _1994: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1994(f,arguments.length,x0) }),
      _2008: x0 => new Array(x0),
      _2010: x0 => x0.length,
      _2012: (x0,x1) => x0[x1],
      _2013: (x0,x1,x2) => x0[x1] = x2,
      _2016: (x0,x1,x2) => new DataView(x0,x1,x2),
      _2018: x0 => new Int8Array(x0),
      _2019: (x0,x1,x2) => new Uint8Array(x0,x1,x2),
      _2020: x0 => new Uint8Array(x0),
      _2028: x0 => new Int32Array(x0),
      _2032: x0 => new Float32Array(x0),
      _2034: x0 => new Float64Array(x0),
      _2036: (o, c) => o instanceof c,
      _2040: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._2040(f,arguments.length,x0) }),
      _2041: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._2041(f,arguments.length,x0) }),
      _2066: (decoder, codeUnits) => decoder.decode(codeUnits),
      _2067: () => new TextDecoder("utf-8", {fatal: true}),
      _2068: () => new TextDecoder("utf-8", {fatal: false}),
      _2069: x0 => new WeakRef(x0),
      _2070: x0 => x0.deref(),
      _2076: Date.now,
      _2078: s => new Date(s * 1000).getTimezoneOffset() * 60,
      _2079: s => {
        if (!/^\s*[+-]?(?:Infinity|NaN|(?:\.\d+|\d+(?:\.\d*)?)(?:[eE][+-]?\d+)?)\s*$/.test(s)) {
          return NaN;
        }
        return parseFloat(s);
      },
      _2080: () => {
        let stackString = new Error().stack.toString();
        let frames = stackString.split('\n');
        let drop = 2;
        if (frames[0] === 'Error') {
            drop += 1;
        }
        return frames.slice(drop).join('\n');
      },
      _2081: () => typeof dartUseDateNowForTicks !== "undefined",
      _2082: () => 1000 * performance.now(),
      _2083: () => Date.now(),
      _2084: () => {
        // On browsers return `globalThis.location.href`
        if (globalThis.location != null) {
          return globalThis.location.href;
        }
        return null;
      },
      _2086: () => new WeakMap(),
      _2087: (map, o) => map.get(o),
      _2088: (map, o, v) => map.set(o, v),
      _2089: () => globalThis.WeakRef,
      _2099: s => JSON.stringify(s),
      _2100: s => printToConsole(s),
      _2101: a => a.join(''),
      _2104: (s, t) => s.split(t),
      _2105: s => s.toLowerCase(),
      _2106: s => s.toUpperCase(),
      _2107: s => s.trim(),
      _2108: s => s.trimLeft(),
      _2109: s => s.trimRight(),
      _2111: (s, p, i) => s.indexOf(p, i),
      _2112: (s, p, i) => s.lastIndexOf(p, i),
      _2114: Object.is,
      _2115: s => s.toUpperCase(),
      _2116: s => s.toLowerCase(),
      _2117: (a, i) => a.push(i),
      _2121: a => a.pop(),
      _2122: (a, i) => a.splice(i, 1),
      _2124: (a, s) => a.join(s),
      _2125: (a, s, e) => a.slice(s, e),
      _2128: a => a.length,
      _2130: (a, i) => a[i],
      _2131: (a, i, v) => a[i] = v,
      _2133: (o, offsetInBytes, lengthInBytes) => {
        var dst = new ArrayBuffer(lengthInBytes);
        new Uint8Array(dst).set(new Uint8Array(o, offsetInBytes, lengthInBytes));
        return new DataView(dst);
      },
      _2134: (o, start, length) => new Uint8Array(o.buffer, o.byteOffset + start, length),
      _2135: (o, start, length) => new Int8Array(o.buffer, o.byteOffset + start, length),
      _2136: (o, start, length) => new Uint8ClampedArray(o.buffer, o.byteOffset + start, length),
      _2137: (o, start, length) => new Uint16Array(o.buffer, o.byteOffset + start, length),
      _2138: (o, start, length) => new Int16Array(o.buffer, o.byteOffset + start, length),
      _2139: (o, start, length) => new Uint32Array(o.buffer, o.byteOffset + start, length),
      _2140: (o, start, length) => new Int32Array(o.buffer, o.byteOffset + start, length),
      _2142: (o, start, length) => new BigInt64Array(o.buffer, o.byteOffset + start, length),
      _2143: (o, start, length) => new Float32Array(o.buffer, o.byteOffset + start, length),
      _2144: (o, start, length) => new Float64Array(o.buffer, o.byteOffset + start, length),
      _2145: (t, s) => t.set(s),
      _2147: (o) => new DataView(o.buffer, o.byteOffset, o.byteLength),
      _2149: o => o.buffer,
      _2150: o => o.byteOffset,
      _2151: Function.prototype.call.bind(Object.getOwnPropertyDescriptor(DataView.prototype, 'byteLength').get),
      _2152: (b, o) => new DataView(b, o),
      _2153: (b, o, l) => new DataView(b, o, l),
      _2154: Function.prototype.call.bind(DataView.prototype.getUint8),
      _2155: Function.prototype.call.bind(DataView.prototype.setUint8),
      _2156: Function.prototype.call.bind(DataView.prototype.getInt8),
      _2157: Function.prototype.call.bind(DataView.prototype.setInt8),
      _2158: Function.prototype.call.bind(DataView.prototype.getUint16),
      _2159: Function.prototype.call.bind(DataView.prototype.setUint16),
      _2160: Function.prototype.call.bind(DataView.prototype.getInt16),
      _2161: Function.prototype.call.bind(DataView.prototype.setInt16),
      _2162: Function.prototype.call.bind(DataView.prototype.getUint32),
      _2163: Function.prototype.call.bind(DataView.prototype.setUint32),
      _2164: Function.prototype.call.bind(DataView.prototype.getInt32),
      _2165: Function.prototype.call.bind(DataView.prototype.setInt32),
      _2168: Function.prototype.call.bind(DataView.prototype.getBigInt64),
      _2169: Function.prototype.call.bind(DataView.prototype.setBigInt64),
      _2170: Function.prototype.call.bind(DataView.prototype.getFloat32),
      _2171: Function.prototype.call.bind(DataView.prototype.setFloat32),
      _2172: Function.prototype.call.bind(DataView.prototype.getFloat64),
      _2173: Function.prototype.call.bind(DataView.prototype.setFloat64),
      _2186: (o, t) => o instanceof t,
      _2188: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._2188(f,arguments.length,x0) }),
      _2189: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._2189(f,arguments.length,x0) }),
      _2190: o => Object.keys(o),
      _2191: (ms, c) =>
      setTimeout(() => dartInstance.exports.$invokeCallback(c),ms),
      _2192: (handle) => clearTimeout(handle),
      _2195: (c) =>
      queueMicrotask(() => dartInstance.exports.$invokeCallback(c)),
      _2212: x0 => x0.trustedTypes,
      _2214: (x0,x1) => x0.text = x1,
      _2230: (s, m) => {
        try {
          return new RegExp(s, m);
        } catch (e) {
          return String(e);
        }
      },
      _2231: (x0,x1) => x0.exec(x1),
      _2232: (x0,x1) => x0.test(x1),
      _2233: (x0,x1) => x0.exec(x1),
      _2234: (x0,x1) => x0.exec(x1),
      _2235: x0 => x0.pop(),
      _2237: o => o === undefined,
      _2256: o => typeof o === 'function' && o[jsWrappedDartFunctionSymbol] === true,
      _2258: o => {
        const proto = Object.getPrototypeOf(o);
        return proto === Object.prototype || proto === null;
      },
      _2259: o => o instanceof RegExp,
      _2260: (l, r) => l === r,
      _2261: o => o,
      _2262: o => o,
      _2263: o => o,
      _2264: b => !!b,
      _2265: o => o.length,
      _2268: (o, i) => o[i],
      _2269: f => f.dartFunction,
      _2270: l => arrayFromDartList(Int8Array, l),
      _2271: l => arrayFromDartList(Uint8Array, l),
      _2272: l => arrayFromDartList(Uint8ClampedArray, l),
      _2273: l => arrayFromDartList(Int16Array, l),
      _2274: l => arrayFromDartList(Uint16Array, l),
      _2275: l => arrayFromDartList(Int32Array, l),
      _2276: l => arrayFromDartList(Uint32Array, l),
      _2277: l => arrayFromDartList(Float32Array, l),
      _2278: l => arrayFromDartList(Float64Array, l),
      _2279: x0 => new ArrayBuffer(x0),
      _2280: (data, length) => {
        const getValue = dartInstance.exports.$byteDataGetUint8;
        const view = new DataView(new ArrayBuffer(length));
        for (let i = 0; i < length; i++) {
          view.setUint8(i, getValue(data, i));
        }
        return view;
      },
      _2281: l => arrayFromDartList(Array, l),
      _2282: (s, length) => {
        if (length == 0) return '';
      
        const read = dartInstance.exports.$stringRead1;
        let result = '';
        let index = 0;
        const chunkLength = Math.min(length - index, 500);
        let array = new Array(chunkLength);
        while (index < length) {
          const newChunkLength = Math.min(length - index, 500);
          for (let i = 0; i < newChunkLength; i++) {
            array[i] = read(s, index++);
          }
          if (newChunkLength < chunkLength) {
            array = array.slice(0, newChunkLength);
          }
          result += String.fromCharCode(...array);
        }
        return result;
      },
      _2283: (s, length) => {
        if (length == 0) return '';
      
        const read = dartInstance.exports.$stringRead2;
        let result = '';
        let index = 0;
        const chunkLength = Math.min(length - index, 500);
        let array = new Array(chunkLength);
        while (index < length) {
          const newChunkLength = Math.min(length - index, 500);
          for (let i = 0; i < newChunkLength; i++) {
            array[i] = read(s, index++);
          }
          if (newChunkLength < chunkLength) {
            array = array.slice(0, newChunkLength);
          }
          result += String.fromCharCode(...array);
        }
        return result;
      },
      _2284: (s) => {
        let length = s.length;
        let range = 0;
        for (let i = 0; i < length; i++) {
          range |= s.codePointAt(i);
        }
        const exports = dartInstance.exports;
        if (range < 256) {
          if (length <= 10) {
            if (length == 1) {
              return exports.$stringAllocate1_1(s.codePointAt(0));
            }
            if (length == 2) {
              return exports.$stringAllocate1_2(s.codePointAt(0), s.codePointAt(1));
            }
            if (length == 3) {
              return exports.$stringAllocate1_3(s.codePointAt(0), s.codePointAt(1), s.codePointAt(2));
            }
            if (length == 4) {
              return exports.$stringAllocate1_4(s.codePointAt(0), s.codePointAt(1), s.codePointAt(2), s.codePointAt(3));
            }
            if (length == 5) {
              return exports.$stringAllocate1_5(s.codePointAt(0), s.codePointAt(1), s.codePointAt(2), s.codePointAt(3), s.codePointAt(4));
            }
            if (length == 6) {
              return exports.$stringAllocate1_6(s.codePointAt(0), s.codePointAt(1), s.codePointAt(2), s.codePointAt(3), s.codePointAt(4), s.codePointAt(5));
            }
            if (length == 7) {
              return exports.$stringAllocate1_7(s.codePointAt(0), s.codePointAt(1), s.codePointAt(2), s.codePointAt(3), s.codePointAt(4), s.codePointAt(5), s.codePointAt(6));
            }
            if (length == 8) {
              return exports.$stringAllocate1_8(s.codePointAt(0), s.codePointAt(1), s.codePointAt(2), s.codePointAt(3), s.codePointAt(4), s.codePointAt(5), s.codePointAt(6), s.codePointAt(7));
            }
            if (length == 9) {
              return exports.$stringAllocate1_9(s.codePointAt(0), s.codePointAt(1), s.codePointAt(2), s.codePointAt(3), s.codePointAt(4), s.codePointAt(5), s.codePointAt(6), s.codePointAt(7), s.codePointAt(8));
            }
            if (length == 10) {
              return exports.$stringAllocate1_10(s.codePointAt(0), s.codePointAt(1), s.codePointAt(2), s.codePointAt(3), s.codePointAt(4), s.codePointAt(5), s.codePointAt(6), s.codePointAt(7), s.codePointAt(8), s.codePointAt(9));
            }
          }
          const dartString = exports.$stringAllocate1(length);
          const write = exports.$stringWrite1;
          for (let i = 0; i < length; i++) {
            write(dartString, i, s.codePointAt(i));
          }
          return dartString;
        } else {
          const dartString = exports.$stringAllocate2(length);
          const write = exports.$stringWrite2;
          for (let i = 0; i < length; i++) {
            write(dartString, i, s.charCodeAt(i));
          }
          return dartString;
        }
      },
      _2285: () => ({}),
      _2286: () => [],
      _2287: l => new Array(l),
      _2288: () => globalThis,
      _2289: (constructor, args) => {
        const factoryFunction = constructor.bind.apply(
            constructor, [null, ...args]);
        return new factoryFunction();
      },
      _2290: (o, p) => p in o,
      _2291: (o, p) => o[p],
      _2292: (o, p, v) => o[p] = v,
      _2293: (o, m, a) => o[m].apply(o, a),
      _2295: o => String(o),
      _2296: (p, s, f) => p.then(s, f),
      _2297: o => {
        if (o === undefined) return 1;
        var type = typeof o;
        if (type === 'boolean') return 2;
        if (type === 'number') return 3;
        if (type === 'string') return 4;
        if (o instanceof Array) return 5;
        if (ArrayBuffer.isView(o)) {
          if (o instanceof Int8Array) return 6;
          if (o instanceof Uint8Array) return 7;
          if (o instanceof Uint8ClampedArray) return 8;
          if (o instanceof Int16Array) return 9;
          if (o instanceof Uint16Array) return 10;
          if (o instanceof Int32Array) return 11;
          if (o instanceof Uint32Array) return 12;
          if (o instanceof Float32Array) return 13;
          if (o instanceof Float64Array) return 14;
          if (o instanceof DataView) return 15;
        }
        if (o instanceof ArrayBuffer) return 16;
        return 17;
      },
      _2298: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const getValue = dartInstance.exports.$wasmI8ArrayGet;
        for (let i = 0; i < length; i++) {
          jsArray[jsArrayOffset + i] = getValue(wasmArray, wasmArrayOffset + i);
        }
      },
      _2299: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const setValue = dartInstance.exports.$wasmI8ArraySet;
        for (let i = 0; i < length; i++) {
          setValue(wasmArray, wasmArrayOffset + i, jsArray[jsArrayOffset + i]);
        }
      },
      _2302: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const getValue = dartInstance.exports.$wasmI32ArrayGet;
        for (let i = 0; i < length; i++) {
          jsArray[jsArrayOffset + i] = getValue(wasmArray, wasmArrayOffset + i);
        }
      },
      _2303: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const setValue = dartInstance.exports.$wasmI32ArraySet;
        for (let i = 0; i < length; i++) {
          setValue(wasmArray, wasmArrayOffset + i, jsArray[jsArrayOffset + i]);
        }
      },
      _2304: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const getValue = dartInstance.exports.$wasmF32ArrayGet;
        for (let i = 0; i < length; i++) {
          jsArray[jsArrayOffset + i] = getValue(wasmArray, wasmArrayOffset + i);
        }
      },
      _2305: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const setValue = dartInstance.exports.$wasmF32ArraySet;
        for (let i = 0; i < length; i++) {
          setValue(wasmArray, wasmArrayOffset + i, jsArray[jsArrayOffset + i]);
        }
      },
      _2306: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const getValue = dartInstance.exports.$wasmF64ArrayGet;
        for (let i = 0; i < length; i++) {
          jsArray[jsArrayOffset + i] = getValue(wasmArray, wasmArrayOffset + i);
        }
      },
      _2307: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const setValue = dartInstance.exports.$wasmF64ArraySet;
        for (let i = 0; i < length; i++) {
          setValue(wasmArray, wasmArrayOffset + i, jsArray[jsArrayOffset + i]);
        }
      },
      _2308: s => {
        if (/[[\]{}()*+?.\\^$|]/.test(s)) {
            s = s.replace(/[[\]{}()*+?.\\^$|]/g, '\\$&');
        }
        return s;
      },
      _2311: x0 => x0.index,
      _2317: x0 => x0.flags,
      _2318: x0 => x0.multiline,
      _2319: x0 => x0.ignoreCase,
      _2320: x0 => x0.unicode,
      _2321: x0 => x0.dotAll,
      _2322: (x0,x1) => x0.lastIndex = x1,
      _2324: (o, p) => o[p],
      _2325: (o, p, v) => o[p] = v,
      _2326: (o, p) => delete o[p],
      _2327: v => v.toString(),
      _2328: (d, digits) => d.toFixed(digits),
      _2332: x0 => x0.random(),
      _2333: x0 => x0.random(),
      _2337: () => globalThis.Math,
      _2377: x0 => x0.status,
      _2378: (x0,x1) => x0.responseType = x1,
      _2380: x0 => x0.response,
      _3766: (x0,x1) => x0.type = x1,
      _3774: (x0,x1) => x0.crossOrigin = x1,
      _3776: (x0,x1) => x0.text = x1,
      _4251: () => globalThis.window,
      _4316: x0 => x0.navigator,
      _4578: x0 => x0.trustedTypes,
      _4707: x0 => x0.userAgent,
      _7033: () => globalThis.document,
      _7128: x0 => x0.head,
      _13982: () => globalThis.console,
      _14011: () => globalThis.window.flutterCanvasKit,
      _14012: () => globalThis.window._flutter_skwasmInstance,
      _14013: x0 => x0.name,
      _14014: x0 => x0.message,
      _14015: x0 => x0.code,

    };

    const baseImports = {
      dart2wasm: dart2wasm,


      Math: Math,
      Date: Date,
      Object: Object,
      Array: Array,
      Reflect: Reflect,
    };

    const jsStringPolyfill = {
      "charCodeAt": (s, i) => s.charCodeAt(i),
      "compare": (s1, s2) => {
        if (s1 < s2) return -1;
        if (s1 > s2) return 1;
        return 0;
      },
      "concat": (s1, s2) => s1 + s2,
      "equals": (s1, s2) => s1 === s2,
      "fromCharCode": (i) => String.fromCharCode(i),
      "length": (s) => s.length,
      "substring": (s, a, b) => s.substring(a, b),
    };

    const deferredLibraryHelper = {
      "loadModule": async (moduleName) => {
        if (!loadDeferredWasm) {
          throw "No implementation of loadDeferredWasm provided.";
        }
        const source = await Promise.resolve(loadDeferredWasm(moduleName));
        const module = await ((source instanceof Response)
            ? WebAssembly.compileStreaming(source, this.builtins)
            : WebAssembly.compile(source, this.builtins));
        return await WebAssembly.instantiate(module, {
          ...baseImports,
          ...additionalImports,
          "wasm:js-string": jsStringPolyfill,
          "module0": dartInstance.exports,
        });
      },
    };

    dartInstance = await WebAssembly.instantiate(this.module, {
      ...baseImports,
      ...additionalImports,
      "deferredLibraryHelper": deferredLibraryHelper,
      "wasm:js-string": jsStringPolyfill,
    });

    return new InstantiatedApp(this, dartInstance);
  }
}

class InstantiatedApp {
  constructor(compiledApp, instantiatedModule) {
    this.compiledApp = compiledApp;
    this.instantiatedModule = instantiatedModule;
  }

  // Call the main function with the given arguments.
  invokeMain(...args) {
    this.instantiatedModule.exports.$invokeMain(args);
  }
}

