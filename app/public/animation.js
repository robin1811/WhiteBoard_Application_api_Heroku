let toolbutton = document.querySelector(".tool-button");
let toolbox = document.querySelector(".toolbox");

toolbutton.addEventListener("click",function(){
    if(toolbox.classList.contains("hideAnimation")){ 
        toolbox.classList.remove("hideAnimation");
        toolbox.classList.remove("hide");
    }
    else{
        toolbox.classList.add("hideAnimation");
        setTimeout(function(){
            toolbox.classList.add("hide");
        },500);
        eraserOptions.classList.add("hide");
        pencilOptions.classList.add("hide");
    }
})
