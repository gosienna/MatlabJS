
import * as THREE from './build/three.module.js'
import {OrbitControls} from './jsm/controls/OrbitControls.js'
export {Scatter2D}
//--------------------------function code area-------------------------------

class Scatter2D{
    init(data,canvasID){
        //---------setup scene & camera-----------
        const scene = new THREE.Scene();
        scene.background = new THREE.Color( 0x0000000 );
        //use aspecRatio to transform the ratio back to 1:1

        const aspectRatio=1
        const camera = new THREE.OrthographicCamera(-100*aspectRatio, 100*aspectRatio, 100, -100, -1000, 1000)

        let targetCanvas=document.getElementById(canvasID)
        const renderer = new THREE.WebGLRenderer( { antialias: true,canvas: targetCanvas});
        
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
        this.scene=scene
        
        //-----------------------draw data--------------------
         this.draw_data(data)

        //------------------------render view-----------------
        function render() {
        
            requestAnimationFrame( render );
            renderer.render( scene, camera);

        }
        render();
    }
    draw_data(data) {
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
        this.scene.add(cloud);
    }

}