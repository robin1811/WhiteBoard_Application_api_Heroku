// 107:
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
// myCursor.style.cursor = "url('./resources-master/cursor/Crosshair '" + myLastSelectedColor + "'.cur), auto";
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

// ctx.lineWidth = 20;

// let activeTool = "pencil";

pencil.addEventListener("click" , function(){
    if( !pencil.classList.contains("active-tool")){
        myCursor.style.cursor = "url('./resources-master/cursor/Crosshair black.cur'), auto";
        // myCursor.style.cursor = "url('./resources-master/cursor/Crosshair black.cur), auto";
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
})






undo.addEventListener("click",function(){
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
});

let myBackgroundColor = "#ffffff";
redo.addEventListener("click",function(){
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
            else{
                ctx.lineTo(line[i].x , line[i].y);
                ctx.stroke();
            }
        }
    }  
    if(gridBtn.checked == true){
        drawGrid(800,400,"canvas");
    } 

})

function drawPoints(){
    ctx.strokeStyle = myEraserColor;
    for(let i=0; i<PointsDb.length; i++){
        let line = PointsDb[i];
        for(let j=0; j<line.length; j++){
            ctx.lineWidth = line[j].lineWidth; 
            ctx.strokeStyle = line[j].strokeStyle;
            console.log(line[j].tool);
            if(line[j].tool == "pencil"){
                // console.log("inside pensil");
                if(line[j].id == "md"){
                    // console.log("inside md");
                    ctx.beginPath();
                    ctx.moveTo(line[j].x , line[j].y);
                }
                else{
                    ctx.lineTo(line[j].x , line[j].y);
                    ctx.stroke();
                }
            }
            else{
                ctx.strokeStyle = myEraserColor;
                if(line[j].id == "md"){
                    // console.log("inside md");
                    ctx.beginPath();
                    ctx.moveTo(line[j].x , line[j].y);
                }
                else{
                    ctx.lineTo(line[j].x , line[j].y);
                    ctx.stroke();
                }
            }
            // console.log("outside ");
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


//////////////////////////////////////


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
    console.log("old color of ctx "+ ctx.strokeStyle);
    ctx.strokeStyle = myEraserColor;
    console.log(myEraserColor + " " + ctx.strokeStyle);
    ctx.clearRect(0,0,canvas.width , canvas.height);
    drawPoints();
    if(gridBtn.checked == true){
        drawGrid(800,400,"canvas");
    }
    myTools.style.backgroundColor = "ivory";
    socket.emit("bgColor",myEraserColor);

});
document.querySelector(".bg-white").addEventListener("click",function(){
    document.querySelector(".content").style.backgroundColor ="#ffffff";
    myEraserColor = "#ffffff";
    myBackgroundColor = "#ffffff";
    console.log("old color of ctx "+ctx.strokeStyle);
    ctx.strokeStyle = myEraserColor;
    console.log(myEraserColor + " " + ctx.strokeStyle);
    ctx.clearRect(0,0,canvas.width , canvas.height);
    drawPoints();
    if(gridBtn.checked == true){
        drawGrid(800,400,"canvas");
    }
    myTools.style.backgroundColor = "lavender";
    socket.emit("bgColor",myEraserColor);
});
document.querySelector(".bg-grey").addEventListener("click",function(){
    document.querySelector(".content").style.backgroundColor ="#d3d3d3";
    myEraserColor = "#d3d3d3";
    myBackgroundColor = "#d3d3d3";
    console.log("old color of ctx "+ctx.strokeStyle);
    ctx.strokeStyle = myEraserColor;
    console.log(myEraserColor + " " + ctx.strokeStyle);
    ctx.clearRect(0,0,canvas.width , canvas.height);
    drawPoints();
    if(gridBtn.checked == true){
        drawGrid(800,400,"canvas");
    }
    myTools.style.backgroundColor = "mistyrose";
    socket.emit("bgColor",myEraserColor);
});
document.querySelector(".bg-skyblue").addEventListener("click",function(){
    document.querySelector(".content").style.backgroundColor="#87ceeb";
    myEraserColor = "#87ceeb";
    myBackgroundColor = "#87ceeb";
    console.log("old color of ctx "+ctx.strokeStyle);
    ctx.strokeStyle = myEraserColor;
    console.log(myEraserColor + " " + ctx.strokeStyle);
    ctx.clearRect(0,0,canvas.width , canvas.height);
    drawPoints();
    if(gridBtn.checked == true){
        drawGrid(800,400,"canvas");
    }
    myTools.style.backgroundColor = "antiquewhite";
    socket.emit("bgColor",myBackgroundColor);
});

// socket.emit("bgColor",myBackgroundColor);