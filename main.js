
import {Plot2D} from './Plot2D.js'
let data=[
    {x:5,y:5},
    {x:-5,y:-5},
]

let plot0 = new Plot2D('test_scatter')
plot0.line(data,'line0')
plot0.animate()

let c = document.getElementById('test_scatter');
c.addEventListener("click", function_draw_dot);
function function_draw_dot(event){
    let rect = c.getBoundingClientRect();
    let x = event.clientX - rect.left     // Get the horizontal coordinate
    let y = event.clientY - rect.top

    x = (x - 250)*10/250
    y = (250 - y)*10/250 
    let zoom = plot0.orbit.object.zoom
    x = x/zoom
    y = y/zoom
    console.log(x,y)
    // console.log(plot0.orbit.object)

}