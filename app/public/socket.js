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
        // document.querySelector(".content").style.backgroundColor = "#ffc0c8";
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
  // socket.on("mySocketUndo",function(data){
    //   if(undoCount == data){
      //     undo.click();
      //     undoCount = undoCount + 1;
      //   }
      // })
      
      // socket.on("mySocketRedo",function(data){
        //   if(undoRedoCount == data){
          //     redo.click();
          //     undoRedoCount = undoRedoCount - 1;
          //   }
          // })
          
  let undoCount = 1;
  let redoCount = 1;
  socket.on("mySocketUndo",function(data){
    if(data == "true" && undoCount == 1){
      undo.click();
      undoCount = undoCount + 1;
      redoCount = 1;
    }
    else if(data == "false" && redoCount == 1){
      redo.click();
      redoCount = redoCount + 1;
      undoCount = 1;
    }
    else{
      // undoRedoCount = undoRedoCount - 1;
    }
  })