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

//AR Glasses model
const ARGScene = new THREE.Scene();
const ARGFrameWidth = 560;
const ARGFrameHeight = 480;
const ARGcamera = new THREE.PerspectiveCamera( 75, ARGFrameWidth / ARGFrameHeight, 0.1, 1000 );

const ARGrenderer = new THREE.WebGLRenderer( { alpha: true } );
ARGrenderer.setSize( ARGFrameWidth, ARGFrameHeight );
document.getElementById("ARglassesModel").appendChild( ARGrenderer.domElement );

const ARGgeometry = new THREE.BoxGeometry( 1, 1, 1 );
const ARGmaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( ARGgeometry, ARGmaterial );
ARGScene.add( cube );

ARGcamera.position.z = 1.5;

//P-Toolkit model
const PTKScene = new THREE.Scene();
const PTKFrameWidth = 320;
const PTKFrameHeight = 650;
const PTKcamera = new THREE.PerspectiveCamera( 75, PTKFrameWidth / PTKFrameHeight, 0.1, 1000 );

const PTKrenderer = new THREE.WebGLRenderer( { alpha: true } );
PTKrenderer.setSize( PTKFrameWidth, PTKFrameHeight );
document.getElementById("PToolkitModel").appendChild( PTKrenderer.domElement );

const PTKgeometry = new THREE.BoxGeometry( 1, 1, 1 );
const PTKmaterial = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
const cube2 = new THREE.Mesh( PTKgeometry, PTKmaterial );
PTKScene.add( cube2 );

PTKcamera.position.z = 2;

//3D photos model
const ThreeDPScene = new THREE.Scene();
const ThreeDPFrameWidth = 320;
const ThreeDPFrameHeight = 560;
const ThreeDPcamera = new THREE.PerspectiveCamera( 75, ThreeDPFrameWidth / ThreeDPFrameHeight, 0.1, 1000 );

const ThreeDPrenderer = new THREE.WebGLRenderer( { alpha: true } );
ThreeDPrenderer.setSize( ThreeDPFrameWidth, ThreeDPFrameHeight );
document.getElementById("ThreeDPhotosModel").appendChild( ThreeDPrenderer.domElement );

const ThreeDPgeometry = new THREE.BoxGeometry( 1, 1, 1 );
const ThreeDPmaterial = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
const cube3 = new THREE.Mesh( ThreeDPgeometry, ThreeDPmaterial );
ThreeDPScene.add( cube3 );

ThreeDPcamera.position.z = 2;

//get mouse position for animation
var rotateY = 0;
var rotateXOffset = 0;
document.addEventListener('mousemove', (event) => {
  const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

  //y value
  const mousePercentWidth = event.clientX / windowWidth;
  rotateY = mapRange(mousePercentWidth, 0, 1, -0.5, 0.5);

  //x value to be added to scroll position
  const mousePercentHeight = event.clientY / windowHeight;
  rotateXOffset = mapRange(mousePercentHeight, 0, 1, -0.15, 0.15);
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
  cube.rotation.y = rotateY;
  cube2.rotation.y = rotateY;
  cube3.rotation.y = rotateY;

  //rotate up/down based on scroll position + mouse position
  cube.rotation.x = ARGRotateValueX + rotateXOffset;
  cube2.rotation.x = PTKRotateValueX + rotateXOffset;
  cube3.rotation.x = ThreeDRotateValueX + rotateXOffset;
}
animate();

function mapRange(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}
