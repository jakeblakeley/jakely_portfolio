//netlify
if (window.netlifyIdentity) {
  window.netlifyIdentity.on("init", user => {
    if (!user) {
      window.netlifyIdentity.on("login", () => {
        document.location.href = "/admin/";
      });
    }
  });
}

  /* ============================== */
 /*   3D models + Interactions     */
/* ============================== */
//three.js setup
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

THREE.ColorManagement.enabled = true;
// THREE.toneMapping = THREE.ACESFilmicToneMapping;
// THREE.outputEncoding = THREE.sRGBEncoding;

//gltf loader
const LoaderForGLTF = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://unpkg.com/three@0.151.3/examples/jsm/libs/draco/');
LoaderForGLTF.setDRACOLoader( dracoLoader );

//AR Glasses model
const ARGScene = new THREE.Scene();
const ARGFrameWidth = 560;
const ARGFrameHeight = 480;
const ARGcamera = new THREE.PerspectiveCamera( 35, ARGFrameWidth / ARGFrameHeight, 0.1, 1000 );
const ARGrenderer = new THREE.WebGLRenderer( { alpha: true, antialias: true } );
ARGrenderer.setPixelRatio( window.devicePixelRatio );
ARGrenderer.setSize( ARGFrameWidth, ARGFrameHeight );
ARGrenderer.outputEncoding = THREE.sRGBEncoding
document.getElementById("ARglassesModel").appendChild( ARGrenderer.domElement );

var cube;
LoaderForGLTF.load(
  "../static/img/glasses.gltf",
  gltf => {
    cube = gltf.scene;
    ARGScene.add( gltf.scene );
  }
);
const directionalLight = new THREE.DirectionalLight( 0xffffff, 15 );
const light = new THREE.HemisphereLight( 0x00FFFF, 0x0088CC, 3 );
ARGScene.add( light );
ARGScene.add( directionalLight );
ARGcamera.position.z = 10;

//AR Glasses HDR environment map for reflections
new RGBELoader().load("../static/img/birchwood_1k.hdr", ( _texture )=>{
  _texture.mapping = THREE.EquirectangularReflectionMapping; //THREE.CubeReflectionMapping; //THREE.EquirectangularReflectionMapping;
  ARGScene.environment = _texture; 
  ARGScene.environment.needsUpdate = true;
});

//P-Toolkit model
const PTKScene = new THREE.Scene();
const PTKFrameWidth = 320;
const PTKFrameHeight = 650;
const PTKcamera = new THREE.PerspectiveCamera( 50, PTKFrameWidth / PTKFrameHeight, 0.1, 1000 );
const PTKrenderer = new THREE.WebGLRenderer( { alpha: true, antialias: true } );
PTKrenderer.setPixelRatio( window.devicePixelRatio );
PTKrenderer.setSize( PTKFrameWidth, PTKFrameHeight );
PTKrenderer.outputEncoding = THREE.sRGBEncoding;
document.getElementById("PToolkitModel").appendChild( PTKrenderer.domElement );
var cube2;
LoaderForGLTF.load(
  "../static/img/PToolkit.gltf",
  gltf => {
    cube2 = gltf.scene;
    PTKScene.add( gltf.scene );
  }
);
const ambientLight = new THREE.AmbientLight( 0xffffff, 1 );
PTKScene.add( ambientLight );
PTKcamera.position.z = 3;

//3D photos model
const ThreeDPScene = new THREE.Scene();
const ThreeDPFrameWidth = 320;
const ThreeDPFrameHeight = 560;
const ThreeDPcamera = new THREE.PerspectiveCamera( 35, ThreeDPFrameWidth / ThreeDPFrameHeight, 0.1, 1000 );
const ThreeDPrenderer = new THREE.WebGLRenderer( { alpha: true, antialias: true } );
ThreeDPrenderer.setPixelRatio( window.devicePixelRatio );
ThreeDPrenderer.setSize( ThreeDPFrameWidth, ThreeDPFrameHeight );
ThreeDPrenderer.outputEncoding = THREE.sRGBEncoding
document.getElementById("ThreeDPhotosModel").appendChild( ThreeDPrenderer.domElement );
var cube3;
LoaderForGLTF.load(
  "../static/img/Caicos.gltf",
  gltf => {
    cube3 = gltf.scene;
    ThreeDPScene.add( gltf.scene );
  }
);
ThreeDPcamera.position.z = 4;

//get mouse position for animation
var rotateY = 0;
var rotateXOffset = 0;
document.addEventListener('mousemove', (event) => {
  const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

  //y value
  const mousePercentWidth = event.clientX / windowWidth;
  rotateY = mapRange(mousePercentWidth, 0, 1, -0.4, 0.4);

  //x value to be added to scroll position
  const mousePercentHeight = event.clientY / windowHeight;
  rotateXOffset = mapRange(mousePercentHeight, 0, 1, -0.1, 0.1);
});

//get scroll position for animation
var ARGRotateValueX = 0;
var PTKRotateValueX = 0;
var ThreeDRotateValueX = 0;
window.addEventListener("scroll", function() {
  ARGRotateValueX = getElementScrollPosition("ARglassesModel");
  PTKRotateValueX = getElementScrollPosition("PToolkitModel");
  ThreeDRotateValueX = getElementScrollPosition("ThreeDPhotosModel");
});

function getElementScrollPosition(id){
  const windowHeight = window.innerHeight;
  const elementScrollCenter = document.getElementById(id);
  const elementRect = elementScrollCenter.getBoundingClientRect();
  const scrollPercent = elementRect.bottom / (elementRect.height + windowHeight);
  const scrollPercentRemap = mapRange(scrollPercent, 1, 0, -0.4, 0.4);
  const scrollPercentClamped = Math.min(Math.max(scrollPercentRemap, -0.4), 0.4);
  return scrollPercentClamped * 1.5;
}

//animation loop
function animate() {
  //render
	requestAnimationFrame( animate );
	ARGrenderer.render( ARGScene, ARGcamera );
  PTKrenderer.render( PTKScene, PTKcamera );
  ThreeDPrenderer.render( ThreeDPScene, ThreeDPcamera );

  //rotate left/right based on mouse position
  if(cube) cube.rotation.y = rotateY;
  if(cube2) cube2.rotation.y = rotateY;
  if(cube3) cube3.rotation.y = rotateY;

  //rotate up/down based on scroll position + mouse position
  if(cube) cube.rotation.x = ARGRotateValueX + rotateXOffset;
  if(cube2) cube2.rotation.x = PTKRotateValueX + rotateXOffset;
  if(cube3) cube3.rotation.x = ThreeDRotateValueX + rotateXOffset;
}
animate();

function mapRange(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

//fit text
/**
 * fitty v2.3.6 - Snugly resizes text to fit its parent container
 * Copyright (c) 2022 Rik Schennink <rik@pqina.nl> (https://pqina.nl/)
 */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).fitty=t()}(this,(function(){"use strict";return function(e){if(e){var t=function(e){return[].slice.call(e)},n=0,i=1,r=2,o=3,l=[],u=null,a="requestAnimationFrame"in e?function(){e.cancelAnimationFrame(u),u=e.requestAnimationFrame((function(){return f(l.filter((function(e){return e.dirty&&e.active})))}))}:function(){},c=function(e){return function(){l.forEach((function(t){return t.dirty=e})),a()}},f=function(e){e.filter((function(e){return!e.styleComputed})).forEach((function(e){e.styleComputed=m(e)})),e.filter(y).forEach(v);var t=e.filter(p);t.forEach(d),t.forEach((function(e){v(e),s(e)})),t.forEach(S)},s=function(e){return e.dirty=n},d=function(e){e.availableWidth=e.element.parentNode.clientWidth,e.currentWidth=e.element.scrollWidth,e.previousFontSize=e.currentFontSize,e.currentFontSize=Math.min(Math.max(e.minSize,e.availableWidth/e.currentWidth*e.previousFontSize),e.maxSize),e.whiteSpace=e.multiLine&&e.currentFontSize===e.minSize?"normal":"nowrap"},p=function(e){return e.dirty!==r||e.dirty===r&&e.element.parentNode.clientWidth!==e.availableWidth},m=function(t){var n=e.getComputedStyle(t.element,null);return t.currentFontSize=parseFloat(n.getPropertyValue("font-size")),t.display=n.getPropertyValue("display"),t.whiteSpace=n.getPropertyValue("white-space"),!0},y=function(e){var t=!1;return!e.preStyleTestCompleted&&(/inline-/.test(e.display)||(t=!0,e.display="inline-block"),"nowrap"!==e.whiteSpace&&(t=!0,e.whiteSpace="nowrap"),e.preStyleTestCompleted=!0,t)},v=function(e){e.element.style.whiteSpace=e.whiteSpace,e.element.style.display=e.display,e.element.style.fontSize=e.currentFontSize+"px"},S=function(e){e.element.dispatchEvent(new CustomEvent("fit",{detail:{oldValue:e.previousFontSize,newValue:e.currentFontSize,scaleFactor:e.currentFontSize/e.previousFontSize}}))},h=function(e,t){return function(){e.dirty=t,e.active&&a()}},b=function(e){return function(){l=l.filter((function(t){return t.element!==e.element})),e.observeMutations&&e.observer.disconnect(),e.element.style.whiteSpace=e.originalStyle.whiteSpace,e.element.style.display=e.originalStyle.display,e.element.style.fontSize=e.originalStyle.fontSize}},w=function(e){return function(){e.active||(e.active=!0,a())}},z=function(e){return function(){return e.active=!1}},F=function(e){e.observeMutations&&(e.observer=new MutationObserver(h(e,i)),e.observer.observe(e.element,e.observeMutations))},g={minSize:16,maxSize:512,multiLine:!0,observeMutations:"MutationObserver"in e&&{subtree:!0,childList:!0,characterData:!0}},W=null,E=function(){e.clearTimeout(W),W=e.setTimeout(c(r),C.observeWindowDelay)},M=["resize","orientationchange"];return Object.defineProperty(C,"observeWindow",{set:function(t){var n="".concat(t?"add":"remove","EventListener");M.forEach((function(t){e[n](t,E)}))}}),C.observeWindow=!0,C.observeWindowDelay=100,C.fitAll=c(o),C}function x(e,t){var n=Object.assign({},g,t),i=e.map((function(e){var t=Object.assign({},n,{element:e,active:!0});return function(e){e.originalStyle={whiteSpace:e.element.style.whiteSpace,display:e.element.style.display,fontSize:e.element.style.fontSize},F(e),e.newbie=!0,e.dirty=!0,l.push(e)}(t),{element:e,fit:h(t,o),unfreeze:w(t),freeze:z(t),unsubscribe:b(t)}}));return a(),i}function C(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return"string"==typeof e?x(t(document.querySelectorAll(e)),n):x([e],n)[0]}}("undefined"==typeof window?null:window)}));

fitty('#ARGtext');
fitty('#PTKtext');
fitty('#ThreeDtext');
fitty('#aboutText');