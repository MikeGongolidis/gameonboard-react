import {Circle} from './Circle'



export class Graph {

    constructor(n, maxWidth, maxHeight){

        this.nodes = []
        for (let i = 0; i < n; i++){
            let ranX = Math.random() * maxWidth;
            let ranY = Math.random() * maxHeight;
            let ranRad = Math.random() * 5;
            let ranSpeed = Math.random() * 5;
            this.nodes.push(new Circle(ranX,ranY,ranSpeed,ranSpeed,ranRad))
        }

    }

    draw(ctx, mousePos){
        for(let n of this.nodes){
            n.draw(ctx,mousePos);
        }
        this.resizeCanvasToDisplaySize(ctx.canvas)
        
    }

    resizeCanvasToDisplaySize(canvas) {
    
        if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
          canvas.width = window.innerWidth
          canvas.height = window.innerHeight
          return true // here you can return some usefull information like delta width and delta height instead of just true
          // this information can be used in the next redraw...
        }
    
        return false
    }
}