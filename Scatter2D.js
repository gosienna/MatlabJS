
import * as THREE from './build/three.module.js'
import {OrbitControls} from './jsm/controls/OrbitControls.js'
//------------------------parameters for testing----------------------------
let data=[{x:0,y:0},
      {x:1,y:0},
      {x:1,y:1},
      {x:0,y:1}]


//--------------------------function code area-------------------------------


//---------setup scene & camera-----------
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0x0000000 );
//use aspecRatio to transform the ratio back to 1:1

const aspectRatio=1
const camera = new THREE.OrthographicCamera(-100*aspectRatio, 100*aspectRatio, 100, -100, -1000, 1000)

// camera.position.z = 10
let c=document.getElementById("s")

console.log(c)
const renderer = new THREE.WebGLRenderer( { antialias: true,canvas: c});
/* renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight ); */
renderer.setPixelRatio( 1 );
renderer.setSize( 500, 500);

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

function createPoints() {
    let vertices=[]
    data.forEach(function(point){   
        vertices.push(point.x,)
        vertices.push(point.y)
    })
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array(vertices), 2 ) );
    var texture=new THREE.TextureLoader().load("circle.png");
    const material = new THREE.PointsMaterial( { color: 0xffffff,
                                                 size:10,
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
    renderer.render( scene, camera);

}



window.addEventListener( 'resize', function () {

    // camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( 500, 500 );

}, false );

render();
