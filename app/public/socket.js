socket.on("md", function (point) {

    let myStrokeStyle = ctx.strokeStyle;
    let myWidth = ctx.lineWidth;
    
    ctx.strokeStyle = point.strokeStyle;
    ctx.lineWidth = point.lineWidth;
    ctx.beginPath();
    ctx.moveTo(point.x, point.y);
  
    ctx.lineWidth = myWidth;
    ctx.strokeStyle = myStrokeStyle;
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
  });
// let count=1;
  socket.on("myBackgroundColor" , function(myBackgroundColor){
    ctx.strokeStyle = myBackgroundColor;
    console.log("THIS IS MY COLOR = " + myBackgroundColor);
    if(myBackgroundColor == "#ffc0c8"){
        document.querySelector(".content").style.backgroundColor = "#ffc0c8";
    }
    else if(myBackgroundColor == "#ffffff"){
        document.querySelector(".content").style.backgroundColor = "#ffffff"
        // document.querySelector(".bg-white").click();
    }
    else if(myBackgroundColor == "#d3d3d3"){
        document.querySelector(".content").style.backgroundColor = "#d3d3d3"
        // document.querySelector(".bg-grey").click();
    }
    else if(myBackgroundColor == "#87ceeb"){
        document.querySelector(".content").style.backgroundColor = "#87ceeb"
        // document.querySelector(".bg-skyblue").click();
    }

  });
