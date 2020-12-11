let undo = document.querySelector("#undo");
let redo = document.querySelector("#redo");
let pencil = document.querySelector("#pencil");
let eraser = document.querySelector("#eraser");

let pencilOptions = document.querySelector("#pencil-options");
let eraserOptions = document.querySelector("#eraser-options");

let penColors = document.querySelectorAll(".pencil-colors div");

let pencilSize = document.querySelector("#pencilSize");
let eraserSize = document.querySelector("#eraserSize");

let myCursor = document.querySelector(".content");

let clearAll = document.querySelector(".erase-all");

let myTools = document.querySelector(".tools"); 

let myShapeButton = document.querySelector("#my-shape-btn");
let shapeOptions = document.querySelector(".shapes")

let rectbtn = document.querySelector("#rect-btn");
let trianglebtn = document.querySelector("#triangle-btn");
let circlebtn = document.querySelector("#circle-btn");
let linebtn = document.querySelector("#line-btn");

clearAll.addEventListener("click", function(){
   
    if(PointsDb.length != 0){
        ctx.clearRect(0,0,canvas.width , canvas.height);
        clearAllDb = PointsDb;
        PointsDb = [];
        line = [];
        redoPoints = [];
    }
    if(gridBtn.checked == true){
        drawGrid(800,400,"canvas");
    }
})

let pencilWidth = 1;
let eraserWidth = 30;

pencilSize.addEventListener("change" , function(e){
    let size = e.target.value;
    pencilWidth = size;
    ctx.lineWidth = pencilWidth;
})

eraserSize.addEventListener("change" , function(e){
   let size = e.target.value;
   eraserWidth = size;
   ctx.lineWidth = eraserWidth;
})
let myLastSelectedColor = "black";
for(let i=0; i<penColors.length; i++){
    penColors[i].addEventListener("click",function(){
        if(penColors[i].classList.contains("red")){
            ctx.strokeStyle = "red";
            myCursor.style.cursor = "url('./resources-master/cursor/Crosshair red.cur'), auto";
        }
        else if(penColors[i].classList.contains("yellow")){
            ctx.strokeStyle = "yellow";
            myCursor.style.cursor = "url('./resources-master/cursor/Crosshair yellow.cur'), auto";
        }
        else if(penColors[i].classList.contains("blue")){
            ctx.strokeStyle = "blue";
            myCursor.style.cursor = "url('./resources-master/cursor/Crosshair blue.cur'), auto";
        }
        else{
            ctx.strokeStyle = "black";
            myCursor.style.cursor = "url('./resources-master/cursor/Crosshair black.cur'), auto";
        }
        myLastSelectedColor = ctx.strokeStyle; 

    })
}

pencil.addEventListener("click" , function(){
    if( !pencil.classList.contains("active-tool")){
        myCursor.style.cursor = "url('./resources-master/cursor/Crosshair black.cur'), auto";
        eraser.classList.remove("active-tool");
        eraserOptions.classList.add("hide");
        pencil.classList.add("active-tool");
        ctx.strokeStyle = myLastSelectedColor;
        ctx.lineWidth = pencilWidth;
    }
    else{
        ctx.strokeStyle = myLastSelectedColor;
        ctx.lineWidth = pencilWidth;
        if(pencilOptions.classList.contains("hide")){
            pencilOptions.classList.remove("hide");
        }
        else{
            pencilOptions.classList.add("hide");
        }
    }
    shapeOptions.classList.add("hide");
    rectbtn.classList.remove("active-tool");
    trianglebtn.classList.remove("active-tool");
    circlebtn.classList.remove("active-tool");
    linebtn.classList.remove("active-tool");
})


eraser.addEventListener("click" , function(){
    myCursor.style.cursor = "url('./resources-master/cursor/eraser.cur'), auto";
    if(  !eraser.classList.contains("active-tool") ){
        pencil.classList.remove("active-tool");
        pencilOptions.classList.add("hide");
        eraser.classList.add("active-tool");
        ctx.strokeStyle = myEraserColor;
        ctx.lineWidth = eraserWidth;
    }
    else{
        if(eraserOptions.classList.contains("hide")){
            eraserOptions.classList.remove("hide");
            
        }
        else{
            eraserOptions.classList.add("hide");
        }
    }
    shapeOptions.classList.add("hide");
    rectbtn.classList.remove("active-tool");
    trianglebtn.classList.remove("active-tool");
    circlebtn.classList.remove("active-tool");
    linebtn.classList.remove("active-tool");     
})


undo.addEventListener("click",undofunc );

function undofunc(){
   
    eraserOptions.classList.add("hide")
    pencilOptions.classList.add("hide")
    console.log(ctx.strokeStyle);
    if(ctx.strokeStyle == "#ffffff"){
        eraser.classList.add("active-tool");
        pencil.classList.remove("active-tool");
    }
    else{
        pencil.classList.add("active-tool");
        eraser.classList.remove("active-tool");
    }
    if(PointsDb.length == 0 && clearAllDb.length != 0){
        PointsDb = clearAllDb;
        drawPoints();
    }

    else if(PointsDb.length){
        let latestLine = PointsDb.pop();
        redoPoints.push(latestLine);
        ctx.clearRect(0,0,canvas.width , canvas.height);
        drawPoints();
    }
    if(gridBtn.checked == true){
        drawGrid(800,400,"canvas");
    }

    if(undoVar == true){
        socket.emit("socketUndo","true");
    }
}


let myBackgroundColor = "#ffffff";
redo.addEventListener("click",function(){
    redofunc();
})

let undoVar = true;
let redoVar = true;

function redofunc(){
    
    eraserOptions.classList.add("hide");
    pencilOptions.classList.add("hide")
    console.log(ctx.strokeStyle);
    if(ctx.strokeStyle == "#ffffff"){
        pencil.classList.add("active-tool");
        eraser.classList.remove("active-tool");
    }
    else{
        eraser.classList.add("active-tool");
        pencil.classList.remove("active-tool"); 
    }
    if(redoPoints.length){
        let line = redoPoints.pop();
        PointsDb.push(line);
        for(let i=0; i<line.length; i++){
            if(line[i].tool == "eraser"){
                line[i].strokeStyle = myBackgroundColor;
            }
            ctx.lineWidth = line[i].lineWidth; 
            ctx.strokeStyle = line[i].strokeStyle;
            if(line[i].id == "md"){
                ctx.beginPath();
                ctx.moveTo(line[i].x , line[i].y);
            }
            else if(line[i].tool == "rect"){
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.rect(line[i].x, line[i].y, line[i].width, line[i].height);
                ctx.stroke();
            }
            else if(line[i].tool == "circle"){
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(line[i].x, line[i].y, line[i].radius, 0, 2 * Math.PI);
                ctx.stroke();
            }
            else if(line[i].tool == "triangle"){
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(line[i].fx, line[i].fy);
                ctx.lineTo(line[i].fx, line[i].y);
                ctx.lineTo(line[i].x,line[i].fy);
                ctx.closePath();
                ctx.stroke();
            }
            else if(line[i].tool == "line"){
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(line[i].x, line[i].y );
                ctx.lineTo(line[i].fx, line[i].fy);
                ctx.stroke();
            }
            else{
                ctx.lineTo(line[i].x , line[i].y);
                ctx.stroke();
            }
        }
    }  
    if(gridBtn.checked == true){
        drawGrid(800,400,"canvas");
    } 
    if(redoVar == true){
        socket.emit("socketUndo", "false");
    }
}


function drawPoints(){
    ctx.strokeStyle = myEraserColor;
    for(let i=0; i<PointsDb.length; i++){
        let line = PointsDb[i];
        for(let j=0; j<line.length; j++){
            ctx.lineWidth = line[j].lineWidth; 
            ctx.strokeStyle = line[j].strokeStyle;
            if(line[j].tool == "pencil"){
                if(line[j].id == "md"){
                    ctx.beginPath();
                    ctx.moveTo(line[j].x , line[j].y);
                }
                else{
                    ctx.lineTo(line[j].x , line[j].y);
                    ctx.stroke();
                }
            }
            else if(line[j].tool == "rect"){
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.rect(line[j].x, line[j].y, line[j].width, line[j].height);
                ctx.stroke();
            }
            else if(line[j].tool == "circle"){
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc( line[j].x, line[j].y, line[j].radius, 0, 2 * Math.PI);
                ctx.stroke();
            }
            else if(line[j].tool == "triangle"){
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(line[j].fx, line[j].fy );
                ctx.lineTo(line[j].fx, line[j].y);
                ctx.lineTo(line[j].x,line[j].fy);
                ctx.closePath();
                ctx.stroke();
            }
            else if(line[j].tool == "line"){
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(line[j].x, line[j].y );
                ctx.lineTo(line[j].fx, line[j].fy);
                ctx.stroke();
            }
            else{
                ctx.strokeStyle = myEraserColor;
                if(line[j].id == "md"){
                    ctx.beginPath();
                    ctx.moveTo(line[j].x , line[j].y);
                }
                else{
                    ctx.lineTo(line[j].x , line[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    if(pencil.classList.contains("active-tool")){
        ctx.strokeStyle = myLastSelectedColor;
    }
    else{
        ctx.strokeStyle = myEraserColor;
    }
    
}
// 107:

document.querySelector(".cornerBtn").addEventListener("click",function() {
    if( document.querySelector(".popupDiv").style.display=="block"){
        document.querySelector(".popupDiv").style.display="none";
        document.querySelector(".bg-color-div").style.display="none";
    }
    else{
        document.querySelector(".popupDiv").style.display="block";
    }
})
document.querySelector("#bgColorInput").addEventListener("click",function() {
    if( document.querySelector(".bg-color-div").style.display=="block")
        document.querySelector(".bg-color-div").style.display="none";
    else
        document.querySelector(".bg-color-div").style.display="block";
})
document.querySelector("#gridInput").addEventListener("click",function(){
    
});


document.querySelector(".bg-pink").addEventListener("click",function(){
    document.querySelector(".content").style.backgroundColor ="#ffc0c8";
    myEraserColor = "#ffc0c8";
    myBackgroundColor = "#ffc0c8";
    if(eraser.classList.contains("active-tool")){
        ctx.lineWidth = eraserWidth;
    }
    console.log(eraserWidth);
    console.log("old color of ctx "+ ctx.strokeStyle);
    ctx.strokeStyle = myEraserColor;
    console.log(myEraserColor + " " + ctx.strokeStyle);
    ctx.clearRect(0,0,canvas.width , canvas.height);
    drawPoints();
    if(gridBtn.checked == true){
        socket.emit("addGrid", true);
        drawGrid(800,400,"canvas");
    }
    myTools.style.backgroundColor = "ivory";
    socket.emit("bgColor",myEraserColor);

});

document.querySelector(".bg-white").addEventListener("click",function(){
    document.querySelector(".content").style.backgroundColor ="#ffffff";
    myEraserColor = "#ffffff";
    myBackgroundColor = "#ffffff";
    if(eraser.classList.contains("active-tool")){
        ctx.lineWidth = eraserWidth;
    }
    console.log(eraserWidth);
    console.log("old color of ctx "+ctx.strokeStyle);
    ctx.strokeStyle = myEraserColor;
    console.log(myEraserColor + " " + ctx.strokeStyle);
    ctx.clearRect(0,0,canvas.width , canvas.height);
    drawPoints();
    if(gridBtn.checked == true){
        socket.emit("addGrid", true);
        drawGrid(800,400,"canvas");
    }
    myTools.style.backgroundColor = "lavender";
    socket.emit("bgColor",myEraserColor);
});
document.querySelector(".bg-grey").addEventListener("click",function(){
    document.querySelector(".content").style.backgroundColor ="#d3d3d3";
    myEraserColor = "#d3d3d3";
    myBackgroundColor = "#d3d3d3";
    if(eraser.classList.contains("active-tool")){
        ctx.lineWidth = eraserWidth;
    }
    console.log("old color of ctx "+ctx.strokeStyle);
    ctx.strokeStyle = myEraserColor;
    console.log(myEraserColor + " " + ctx.strokeStyle);
    ctx.clearRect(0,0,canvas.width , canvas.height);
    drawPoints();
    if(gridBtn.checked == true){
        socket.emit("addGrid", true);
        drawGrid(800,400,"canvas");
    }
    myTools.style.backgroundColor = "mistyrose";
    socket.emit("bgColor",myEraserColor);
});
document.querySelector(".bg-skyblue").addEventListener("click",function(){
    document.querySelector(".content").style.backgroundColor="#87ceeb";
    myEraserColor = "#87ceeb";
    myBackgroundColor = "#87ceeb";
    if(eraser.classList.contains("active-tool")){
        ctx.lineWidth = eraserWidth;
    }
    console.log("old color of ctx "+ctx.strokeStyle);
    ctx.strokeStyle = myEraserColor;
    console.log(myEraserColor + " " + ctx.strokeStyle);
    ctx.clearRect(0,0,canvas.width , canvas.height);
    drawPoints();
    if(gridBtn.checked == true){
        socket.emit("addGrid", true);
        drawGrid(800,400,"canvas");
    }
    myTools.style.backgroundColor = "antiquewhite";
    socket.emit("bgColor",myBackgroundColor);
});

// ======== Shortcuts =============
document.addEventListener("keydown", function (e) {
        if ( e.ctrlKey && e.key == "z") {
            
           undofunc();
        }
        else if ( e.ctrlKey && e.key == "y") {
            redofunc();
        }
})

rectbtn.addEventListener("click",function(){
    rectbtn.classList.add("active-tool");
    pencil.classList.remove("active-tool");
    eraser.classList.remove("active-tool");
    circlebtn.classList.remove("active-tool");
    trianglebtn.classList.remove("active-tool");
    linebtn.classList.remove("active-tool");
})

circlebtn.addEventListener("click",function(){
    circlebtn.classList.add("active-tool");
    pencil.classList.remove("active-tool");
    eraser.classList.remove("active-tool");
    rectbtn.classList.remove("active-tool");
    trianglebtn.classList.remove("active-tool");
    linebtn.classList.remove("active-tool");

})

linebtn.addEventListener("click",function(){
    linebtn.classList.add("active-tool");
    pencil.classList.remove("active-tool");
    eraser.classList.remove("active-tool");
    rectbtn.classList.remove("active-tool");
    trianglebtn.classList.remove("active-tool");
    circlebtn.classList.remove("active-tool");

})

trianglebtn.addEventListener("click",function(){
    trianglebtn.classList.add("active-tool");
    pencil.classList.remove("active-tool");
    eraser.classList.remove("active-tool");
    rectbtn.classList.remove("active-tool");
    linebtn.classList.remove("active-tool");
    circlebtn.classList.remove("active-tool");

})


myShapeButton.addEventListener("click", function(){
    if(shapeOptions.classList.contains("hide")){
        shapeOptions.classList.remove("hide")    
    }
    else{
        shapeOptions.classList.add("hide");
    }
    pencilOptions.classList.add("hide");
    eraserOptions.classList.add("hide");
})


