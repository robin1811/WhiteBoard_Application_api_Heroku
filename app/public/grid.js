var drawGrid = function(w, h, id) {
   
    var data = '<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"> \
        <defs> \
            <pattern id="smallGrid" width="8" height="8" patternUnits="userSpaceOnUse"> \
                <path d="M 8 0 L 0 0 0 8" fill="none" stroke="gray" stroke-width="0.5" /> \
            </pattern> \
            <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse"> \
                <rect width="80" height="80" fill="url(#grid)" /> \
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="gray" stroke-width="1" /> \
            </pattern> \
        </defs> \
        <rect width="100%" height="100%" fill="url(#grid)" /> \
    </svg>';

    var DOMURL = window.URL || window.webkitURL || window;
    
    var img = new Image();
    var svg = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
    var url = DOMURL.createObjectURL(svg);
    
    img.onload = function () {
      ctx.drawImage(img, 0, 0);
      DOMURL.revokeObjectURL(url);
    }
    img.src = url;
}



// drawGrid(1400, 700, "canvas");
// drawGrid(1200, 600, "canvas"); 
// drawGrid(1000, 500, "canvas");
// drawGrid(400, 200, "canvas");
// drawGrid(800, 400, "canvas");
let gridBtn = document.querySelector("#gridInput");
gridBtn.addEventListener("click",function(){
    if(gridBtn.checked == true){
        drawGrid(800,400,"canvas");
        drawPoints();
    }
    else{
        ctx.clearRect(0,0,canvas.width , canvas.height);
        drawPoints();
    }
    // drawGrid(800, 400, "canvas");
})
// document.querySelector(".bg-sm-grid").addEventListener("click",function(){
   
// })
// document.querySelector(".bg-md-grid").addEventListener("click",function(){
// })
// document.querySelector(".bg-lg-grid").addEventListener("click",function(){
// })
// document.querySelector(".bg-xl-grid").addEventListener("click",function(){
// })