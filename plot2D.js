
import * as THREE from './build/three.module.js'
import {OrbitControls} from './jsm/controls/OrbitControls.js'
//------------------------parameters for testing----------------------------
let data=[{x:0,y:0},
      {x:1,y:0},
      {x:1,y:1},
      {x:0,y:1}]
let id_canvas="canvas1"

//--------------------------function code area-------------------------------


//---------setup scene & camera-----------
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0x0000000 );

const camera = new THREE.OrthographicCamera(-100, 100, 100, -100, -1000, 1000)

//camera.position.z = 10

const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const orbit = new OrbitControls( camera, renderer.domElement );
//let the object can be zoom in and out
orbit.enableZoom = true;

//---------add content into scene---------
//add grid
const size = 100;
const divisions = 100;
const colorCenterLine = 0x444444
const colorGrid = 0x444444
const gridHelper = new THREE.GridHelper( size, divisions , colorCenterLine, colorGrid);
//the default is grid over xz plain, rotate along x axis to turn grid into xy plain
gridHelper.rotation.x = Math.PI/2;
scene.add( gridHelper );

/* //add cube
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial(
    {color: 0x00ff00,
    wireframe: true}
);
const cube = new THREE.Mesh( geometry, material );
scene.add( cube ); */
//add point
function createPoints() {
    let vertices=new Float32Array( [
        -1.0, -1.0,  
        1.0, -1.0,  
        1.0,  1.0,  
        -1.0, 1.0,  
        3.0,  0.0,  
    ] );
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 2 ) );
    var texture=new THREE.TextureLoader().load("circle.png");
    const material = new THREE.PointsMaterial( { color: 0xffffff,
                                                 size:5,
                                                 transparent: true,
                                                 blending: THREE.AdditiveBlending,
                                                 map: texture,} );
        
    var cloud = new THREE.Points(geometry, material);
    scene.add(cloud);
}

createPoints()




//------------render view---------------
function render() {

    requestAnimationFrame( render );
    renderer.render( scene, camera );

}


//adjust canvas size to automatically fill up the window
window.addEventListener( 'resize', function () {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}, false );

render();
