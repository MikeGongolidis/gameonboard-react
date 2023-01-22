export class Circle {

    constructor(x,y,dx,dy,radius){
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius
    }


    draw(ctx,mousePos){

        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${this.mouseProximity(mousePos)})`;
        if(this.mouseProximity(mousePos) === 0){
            this.move(ctx)
        }
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
        ctx.fill();

    }

    mouseProximity(mousePos){
        let distance = (Math.sqrt((this.x-mousePos.x)**2 + (this.y-mousePos.y)**2))


        if(distance < 50){
            return 1
        }else if(distance >= 50 && distance < 70){
            return 0.2
        }else if(distance >= 70 && distance < 90){
            return 0.1
        }else if(distance >= 90 && distance < 120){
            return 0.05
        }
        return 0.0
    }

    move(ctx){


        if(Math.random() - 0.7 > 0){
            if(Math.random() - 0.5 > 0){
                this.dx = -this.dx;
            }else{
                this.dy = -this.dy
            }
        }

        if (this.x > ctx.canvas.width - this.radius || this.x < 0+this.radius){
            this.dx = -this.dx;
        }
        if (this.y > ctx.canvas.height - this.radius || this.y < 0+this.radius){
            this.dy = -this.dy;
        }
        this.x+=this.dx;
        this.y+=this.dy;
    }

}