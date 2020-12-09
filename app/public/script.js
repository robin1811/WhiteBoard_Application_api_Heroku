//101: 
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let myEraserColor = "white";
// 101:
// 103:
let {top : topOffSet} = canvas.getBoundingClientRect();
// 103:
// section to enlarge canvas:
// 104:
canvas.height = window.innerHeight-topOffSet;
canvas.width = window.innerWidth;

window.addEventListener("resize",function(){
    canvas.height = window.innerHeight-topOffSet;
    canvas.width = window.innerWidth;
    drawPoints();
})

// 104: NOw added Images in tools
// section below for drawing on canvas:
// 102:
let isPenDown = false;
// 105:
    let PointsDb = [];
    let line = [];
    let redoPoints = [];
    let clearAllDb = [];
// 105:

canvas.addEventListener("mousedown",function(e){
    // console.log(e);

    // socket.emit("mousedown", "I am drawing !!!");

    if(redoPoints.length){
        redoPoints = [];
    }
    isPenDown = true;
    let x = e.x;
    let y = e.y-topOffSet;
    // console.log(x,y);
    // let x1 = e.clientX;
    // let y2 = e.clientY;
    // console.log(x1,y2);
    ctx.beginPath();
    ctx.moveTo(x,y);
    // ctx.stroke();  
    // 106:
    let point = {}
    console.log(ctx.strokeStyle);
    if(ctx.strokeStyle == "#ff0000" || ctx.strokeStyle == "#ffff00" || ctx.strokeStyle == "#0000ff" || ctx.strokeStyle == "#000000" ){
        point = {
            id :"md",
            tool : "pencil",
            x : x,
            y : y,
            strokeStyle : ctx.strokeStyle,
            lineWidth : ctx.lineWidth
        }
        // console.log("inside md if");
    }
    else{
        if(gridBtn.checked == true){
            drawGrid(800,400,"canvas");
        }
      
        point = {
            id :"md",
            tool : "eraser",
            x : x,
            y : y,
            strokeStyle : ctx.strokeStyle,
            lineWidth : ctx.lineWidth
        }
        // console.log("inside md else");
    }
        line.push(point);
        socket.emit("mousedown", point);
    // 106:
})

canvas.addEventListener("mousemove", function(e){
    // console.log(e);
    if(isPenDown){
        let x = e.x;
        let y = e.y-topOffSet;
        ctx.lineTo(x,y)
        ctx.stroke();
            // 106:
            let point = {}
            if(ctx.strokeStyle == "#ff0000" || ctx.strokeStyle == "#ffff00" || ctx.strokeStyle == "#0000ff" || ctx.strokeStyle == "#000000" ){
                point = {
                    id :"mm",
                    tool : "pencil",
                    x : x,
                    y : y,
                    strokeStyle : ctx.strokeStyle,
                    lineWidth : ctx.lineWidth
                }
            }
            else{
                if(gridBtn.checked == true){
                    drawGrid(800,400,"canvas");
                }
                point = {
                    id :"mm",
                    tool : "eraser",
                    x : x,
                    y : y,
                    strokeStyle : ctx.strokeStyle,
                    lineWidth : ctx.lineWidth
                }
            }
            line.push(point);
            socket.emit("mousemove", point);
        // 106:
    }
})

canvas.addEventListener("mouseup",function(e){
    isPenDown = false;
    PointsDb.push(line);
    line = [];
    console.log(PointsDb);
})
// 102:

