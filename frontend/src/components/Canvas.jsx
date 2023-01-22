import { useRef, useEffect } from "react";
import {Graph} from './Graph'


const graph = new Graph(1500,window.innerWidth,window.innerHeight);


export function Canvas(){


    const canvasRef = useRef(null);



    useEffect(() => {

        let mousePos = {x:0,y:0};

        const listener = window.addEventListener("mousemove", (e) => {
          mousePos = {x:e.clientX,y:e.clientY};
        });

        const canvas = canvasRef.current;
        const c = canvas.getContext('2d');

        let animationFrameId;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;


        const render = () => {
            c.clearRect(0, 0, c.canvas.width, c.canvas.height);
            graph.draw(c,mousePos);
            animationFrameId = window.requestAnimationFrame(render);
        }
        render();

        return () => {
            window.removeEventListener(window, listener);
            window.cancelAnimationFrame(animationFrameId);
          };

      }, [graph.draw])

    return (
        <>
        <canvas ref={canvasRef} className="bg-indigo-200 dark:bg-[#242424] transition-colors duration-500 fixed top-0 left-0 -z-50"></canvas>
        </>

    )
}
