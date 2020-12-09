let myTop = 0;
let count = 0;
let myFlag = true;
let stickyAdd = document.querySelector("#sticky");

stickyAdd.addEventListener("click", function(){
    if(count < 3){
        let sticky = document.createElement("div");
        sticky.classList.add("sticky");
    
        let stickyHeader = document.createElement("div");
        stickyHeader.classList.add("sticky-header");
    
        let minimize = document.createElement("div");
        minimize.classList.add("minimize");
    
        let close = document.createElement("div");
        close.classList.add("close");
    
        let stickyContent = document.createElement("div");
        stickyContent.classList.add("sticky-content");
    
        let textBox = document.createElement("textarea");
        textBox.setAttribute("class" , "stickybox");
        textBox.setAttribute("rows" , "10");
        textBox.setAttribute("cols" , "30");
    
        stickyContent.appendChild(textBox);
        stickyHeader.appendChild(minimize);
        stickyHeader.appendChild(close);
        sticky.appendChild(stickyHeader);
        sticky.appendChild(stickyContent);
    
        document.body.appendChild(sticky);
        if(myTop == 0){
            myTop = 14;
            sticky.style.top = myTop + "%";
            count = count + 1; 
            console.log(myTop);
        }
        else{
            if(count < 3){
                count = count + 1;
                if(myFlag){
                    myTop = (Number)(myTop + 22);
                }
                else{
                    myFlag = true;
                }
                console.log(myTop);
                sticky.style.top = myTop + "%";
            }
        }
    

        let initialX;
        let initialY;
        let isStickHold = false;
        
        stickyHeader.addEventListener("mousedown",function(e){
            isStickHold = true;
            initialX = e.x;
            initialY = e.y;
        })

        stickyHeader.addEventListener("mousemove",function(e){
            if(isStickHold){
                let finalX = e.x;
                let finalY = e.y;
                let dy = finalY - initialY;
                let dx = finalX - initialX;

                let{top , left} = sticky.getBoundingClientRect();

                sticky.style.top = top + dy + "px";
                sticky.style.left = left + dx + "px";

                initialX = finalX;
                initialY = finalY;
            }
        })

        stickyHeader.addEventListener("mouseup",function(e){
            isStickHold  = false;
        })
        


        minimize.addEventListener("click" , function(){
            textBox.style.display = textBox.style.display == "none" ? "block" : "none";
        })
        
        close.addEventListener("click" , function(){
            myTop = sticky.style.top; 
            myTop = myTop.substring(0,2);
            myTop = parseInt(myTop, 10)
            sticky.remove();
            count = count - 1;
            myFlag = false;
        })
}
 })
