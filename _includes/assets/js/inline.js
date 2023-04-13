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

//animation loop
function animate() {
	requestAnimationFrame( animate );

	ARGrenderer.render( ARGScene, ARGcamera );
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  PTKrenderer.render( PTKScene, PTKcamera );
  cube2.rotation.x += 0.01;
  cube2.rotation.y += 0.01;

  ThreeDPrenderer.render( ThreeDPScene, ThreeDPcamera );
  cube3.rotation.x += 0.01;
  cube3.rotation.y += 0.01;
}
animate();
