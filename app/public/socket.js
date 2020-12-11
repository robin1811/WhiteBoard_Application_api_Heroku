socket.on("md", function (point) {

    let myStrokeStyle = ctx.strokeStyle;
    let myWidth = ctx.lineWidth;
    
    ctx.strokeStyle = point.strokeStyle;
    ctx.lineWidth = point.lineWidth;
    ctx.beginPath();
    ctx.moveTo(point.x, point.y);
  
    ctx.lineWidth = myWidth;
    ctx.strokeStyle = myStrokeStyle;
    line.push(point);
  });
  
  socket.on("mm", function (point) {
  
    let myStrokeStyle = ctx.strokeStyle;
    let myWidth = ctx.lineWidth;
  
    ctx.strokeStyle = point.strokeStyle;
    ctx.lineWidth = point.lineWidth;
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
  
    ctx.lineWidth = myWidth;
    ctx.strokeStyle = myStrokeStyle;
    line.push(point);
  });
  socket.on("mu", function (point) {
    PointsDb.push(line);
    line = [];
  });
let count1 = 1;
let count2= 1;
let count3 = 1;
let count4 = 1;

  socket.on("myBackgroundColor" , function(myBackgroundColor){
    ctx.strokeStyle = myBackgroundColor;
    console.log("THIS IS MY COLOR = " + myBackgroundColor);
    if(myBackgroundColor == "#ffc0c8" && count1 == 1){
        document.querySelector(".bg-pink").click();
        count1 = count1 + 1; count2 = 1; count3 = 1; count4 = 1;   
    }
    else if(myBackgroundColor == "#ffffff" && count2 == 1){
        document.querySelector(".content").style.backgroundColor = "#ffffff"
        document.querySelector(".bg-white").click();
        count1 = 1; count2 = count2 + 1; count3 = 1; count4 = 1;
    }
    else if(myBackgroundColor == "#d3d3d3" && count3 == 1){
        document.querySelector(".content").style.backgroundColor = "#d3d3d3"
        document.querySelector(".bg-grey").click();
        count1 = 1; count2 = 1; count3 = count3 + 1; count4 = 1;
    }
    else if(myBackgroundColor == "#87ceeb" && count4 == 1){
        document.querySelector(".content").style.backgroundColor = "#87ceeb"
        document.querySelector(".bg-skyblue").click();
        count1 = 1; count2 = 1; count3 = 1; count4 = count4 + 1;
    }

  });
  socket.on("Grid", function(data){
    if(data == "add grid"){
      if(gridBtn.checked != true){
        gridBtn.click();
      } 
    }
    else{
      if(gridBtn.checked == true){
        gridBtn.click();
      }
    }
  })
  socket.on("mySocketUndo",function(data){
    if(data == "true"){
      undoVar = false;
      undo.click();
    }
    else{
      redoVar = false;
      redo.click();
    }
  })


  socket.on("myrectangle",function(point){
    let myStrokeStyle = ctx.strokeStyle;
    let myWidth = ctx.lineWidth;
    
    ctx.strokeStyle = "black"
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.rect(point.x,point.y,point.width,point.height);
    ctx.stroke();

    ctx.lineWidth = myWidth;
    ctx.strokeStyle = myStrokeStyle;
    line.push(point);
  })
  socket.on("mycircle",function(point){
    let myStrokeStyle = ctx.strokeStyle;
    let myWidth = ctx.lineWidth;
    
    ctx.strokeStyle = "black"
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.arc(point.x ,point.y, point.radius, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.lineWidth = myWidth;
    ctx.strokeStyle = myStrokeStyle;
    line.push(point);
  })
  socket.on("mytriangle",function(point){
    let myStrokeStyle = ctx.strokeStyle;
    let myWidth = ctx.lineWidth;
    
    ctx.strokeStyle = "black"
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(point.fx, point.fy );
    ctx.lineTo(point.fx, point.y);
    ctx.lineTo(point.x,point.fy);
    ctx.closePath();
    ctx.stroke();

    ctx.lineWidth = myWidth;
    ctx.strokeStyle = myStrokeStyle;
    line.push(point);
  })
  socket.on("myline",function(point){
    let myStrokeStyle = ctx.strokeStyle;
    let myWidth = ctx.lineWidth;
    
    ctx.strokeStyle = "black"
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(point.x,point.y)
    ctx.lineTo(point.fx, point.fy);
    ctx.stroke();

    ctx.lineWidth = myWidth;
    ctx.strokeStyle = myStrokeStyle;
    line.push(point);
  })