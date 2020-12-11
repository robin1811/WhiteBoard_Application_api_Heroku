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

    let lmousex = 0;
    let lmousey = 0;
    let fmousex = 0 
    let fmousey = 0;
    let rectmousedown = false;
    let width = 0;
    let height = 0;
    let radius = 0;


function selectedPencilMD(e){
    if(redoPoints.length){
        redoPoints = [];
    }
    isPenDown = true;
    let x = e.x;
    let y = e.y-topOffSet;

    ctx.beginPath();
    ctx.moveTo(x,y);

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

    }
        line.push(point);
        socket.emit("mousedown", point);
};

function selectedPencilMM(e){
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
}


canvas.addEventListener("mousedown",function(e){
    if(rectbtn.classList.contains("active-tool")){
        rectmousedown = true;
        lmousex = e.x;
        lmousey = e.y-topOffSet;

    }
    else if(circlebtn.classList.contains("active-tool")){
        rectmousedown = true;
        lmousex = e.x;
        lmousey = e.y-topOffSet;
    }
    else if(trianglebtn.classList.contains("active-tool")){
        rectmousedown = true;
        lmousex = e.x;
        lmousey = e.y-topOffSet;
    }
    else if(linebtn.classList.contains("active-tool")){
        rectmousedown = true;
        lmousex = e.x;
        lmousey = e.y-topOffSet;
    }
    else{
        selectedPencilMD(e);
        
    }
})


canvas.addEventListener("mousemove", function(e){
    if(rectbtn.classList.contains("active-tool")){
        if(rectmousedown){
            ctx.lineWidth = 2;
            ctx.beginPath();
            
            fmousex = e.x;
            fmousey = e.y-topOffSet;
            
            width = fmousex - lmousex;
            height = fmousey- lmousey;
            
            ctx.clearRect( 0 , 0,canvas.width,canvas.height);
            ctx.rect(lmousex,lmousey,width,height);

            ctx.stroke();
            drawPoints();   
            ctx.strokeStyle = 'black';
            if(gridBtn.checked == true){
                drawGrid(800,400,"canvas");
            }
        }
    }
    else if(circlebtn.classList.contains("active-tool")){
        if(rectmousedown){
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'black';
            ctx.beginPath();
            
            fmousex = e.x;
            fmousey = e.y-topOffSet;
            width = fmousex - lmousex;
            height = fmousey- lmousey;

            let length = width * width;
            let breath = height * height;
            let diameter = Math.sqrt(length + breath);
            radius = diameter/2;
            
            
            ctx.clearRect( 0 , 0,canvas.width,canvas.height);
            ctx.arc(lmousex ,lmousey, radius, 0, 2 * Math.PI);

            ctx.stroke();
            drawPoints();  
            if(gridBtn.checked == true){
                drawGrid(800,400,"canvas");
            } 
        }
    }
    else if(trianglebtn.classList.contains("active-tool")){
        if(rectmousedown){
            ctx.lineWidth = 2;
            ctx.beginPath();
            
            fmousex = e.x;
            fmousey = e.y-topOffSet;
            
            ctx.clearRect( 0 , 0,canvas.width,canvas.height);
            ctx.moveTo(fmousex, fmousey );
            ctx.lineTo(fmousex, lmousey);
            ctx.lineTo(lmousex,fmousey);
            ctx.closePath();
            
            
            ctx.stroke();
            drawPoints();   
            ctx.strokeStyle = 'black';
            if(gridBtn.checked == true){
                drawGrid(800,400,"canvas");
            }
        }
    }
    else if(linebtn.classList.contains("active-tool")){
        if(rectmousedown){
            ctx.lineWidth = 2;
            ctx.beginPath();
            
            fmousex = e.x;
            fmousey = e.y-topOffSet;
            
            ctx.clearRect( 0 , 0,canvas.width,canvas.height);
            ctx.moveTo(lmousex,lmousey)
            ctx.lineTo(fmousex, fmousey);

            ctx.stroke();
            drawPoints();   
            ctx.strokeStyle = 'black';
            if(gridBtn.checked == true){
                drawGrid(800,400,"canvas");
            }
        }
    }
    else{
        selectedPencilMM(e);
    }
})

canvas.addEventListener("mouseup",function(e){
    if(rectbtn.classList.contains("active-tool")){
        let point = {
            tool : "rect",
            x : lmousex,
            y : lmousey,
            width : width,
            height : height,
            strokeStyle : "black",
            // lineWidth : 2
        }
        line.push(point);
        socket.emit("rectangle",point);
        if(gridBtn.checked == true){
            drawGrid(800,400,"canvas");
        }
    }
    else if(circlebtn.classList.contains("active-tool")){
        let point = {
            tool : "circle",
            x : lmousex,
            y : lmousey,
            width : width,
            height : height,
            strokeStyle : "black",
            radius : radius
            // lineWidth : 2
        }
        line.push(point);
        socket.emit("circle",point);
    }
    else if(trianglebtn.classList.contains("active-tool")){
        let point = {
            tool : "triangle",
            x : lmousex,
            y : lmousey,
            fx : fmousex,
            fy : fmousey,
            strokeStyle : "black"
            // lineWidth : 2
        }
        line.push(point);
        socket.emit("triangle",point);
    }
    else if(linebtn.classList.contains("active-tool")){
        let point = {
            tool : "line",
            x : lmousex,
            y : lmousey,
            fx : fmousex,
            fy : fmousey,
            strokeStyle : "black"
            // lineWidth : 2
        }
        line.push(point);
        socket.emit("line",point);
    }
    if(gridBtn.checked == true){
        drawGrid(800,400,"canvas");
    }
    isPenDown = false;
    rectmousedown = false;
    PointsDb.push(line);
    socket.emit("mouseup", "mouse is up");
    line = [];
    drawPoints();   
    console.log(PointsDb);
})
// 102:

