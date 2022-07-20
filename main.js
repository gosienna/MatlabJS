
import {Plot2D} from './Plot2D.js'
let data=[
    {x:0,y:0},
    {x:1,y:0},
    {x:1,y:1},
    {x:0,y:1}]

let plot0 = new Plot2D('test_scatter')
plot0.scatter(data)
plot0.line(data)