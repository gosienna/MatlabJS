
import * as THREE from './build/three.module.js'
import {OrbitControls} from './jsm/controls/OrbitControls.js'
export {Plot2D}
//--------------------------function code area-------------------------------

class Plot2D{
    constructor(canvasID){
        //---------initialize data as empty array----------------
        this.data = []
        //---------setup scene & camera & renderer-----------
        const scene = new THREE.Scene();
        scene.background = new THREE.Color( 0x0000000 );
        //use aspecRatio to transform the ratio back to 1:1

        const aspectRatio=1
        const camera = new THREE.OrthographicCamera(-10*aspectRatio, 10*aspectRatio, 10, -10, -1000, 1000)

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
        
        //--------------------make three.js object assesble------------
        this.renderer = renderer
        this.camera = camera
        this.scene = scene
        this.orbit = orbit
        //------------------------render view-----------------
        renderer.render( scene , camera )
    }
    
    scatter(data) {
        this.data.push(data) //store the data
        let vertices=[]
        data.forEach(function(point){   
            vertices.push(point.x)
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
        this.renderer.render( this.scene , this.camera )
        
    }
    line(data,line_ID) {
        this.data.push(data) // store data
        const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
        const points = []
        //push vertice position into the points
        data.forEach(function(point){
            points.push(new THREE.Vector3(point.x,point.y,0.0))
        })
        const geometry = new THREE.BufferGeometry().setFromPoints( points );
        const line = new THREE.Line( geometry, material );
        this.line = line
        this.scene.add( this.line )
        this.renderer.render( this.scene , this.camera )      
    }
    animate(){
       
        let renderer = this.renderer
        let camera = this.camera 
        let scene = this.scene
        let line = this.line
        update();
        function update(){
            requestAnimationFrame( update );
            line.rotation.z -=0.01
            renderer.render( scene, camera );
        }
    }
    
}