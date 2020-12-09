let imageUpload = document.querySelector("#photo-upload");
let upload = document.querySelector("#upload");
let download = document.querySelector("#download");


download.addEventListener("click", function(){
    let filePath = canvas.toDataURL("image/png");
    let aTag = document.createElement("a");

    aTag.setAttribute("download" , "canvas.png");
    aTag.setAttribute("href",filePath);
    aTag.click();
    aTag.remove();
})


upload.addEventListener("click",function(){
    imageUpload.click();
})


imageUpload.addEventListener("change", function(){

    // console.log(imageUpload.files);
    // console.log(imageUpload.files[0]);
    let fileObject = imageUpload.files[0];

    let filePath = URL.createObjectURL(fileObject);

    // console.log(URL.createObjectURL(fileObject));

    let img = document.createElement("img");
    img.setAttribute("src" , filePath);
    img.classList.add("photo");
        


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
    // console.log(img);

        stickyHeader.appendChild(minimize);
        stickyHeader.appendChild(close);
        stickyContent.appendChild(img);
        sticky.appendChild(stickyHeader);
        sticky.appendChild(stickyContent);

        document.body.appendChild(sticky);

        sticky.style.top = "25%";
        sticky.style.left = "25%";


        let myPhoto = document.querySelector(".photo");


        var reader = new FileReader();
        reader.readAsDataURL(fileObject);
        reader.onload = function (e) {
    
            var image = new Image();
            image.src = e.target.result;
            image.onload = function () {
                var height = this.height;
                var width = this.width;
                if (height < 1080 || width < 1920) {
                    if(height <= 400 && width <= 400){
                        myPhoto.style.height = "200px";
                        console.log(myPhoto.style.height);
                        // myPhoto.style.width = 400 + "px";
                    }
                    else if (height <= 800 && width <= 800){
                        myPhoto.style.height = "250px";
                        console.log(myPhoto.style.height);
                    }
                    else if(height <= 1080 && width <= 1920){
                        myPhoto.style.height = "300px";
                        console.log(myPhoto.style.height);
                    }
                    else{
                        myPhoto.style.height = "4 00px";
                    }
                  return false;
                }
                alert("Uploaded image has invalid Height and Width.");
                return true;
        }};


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
            img.style.display = img.style.display == "none" ? "block" : "none";
        })
        close.addEventListener("click" , function(){
            sticky.remove(); 
        })
})




// let myImage = document.createElement("div");
// myImage.classList.add("my-image");
// myImage.appendChild(img);
// document.body.appendChild(myImage);

// let myIitialX;
// let myInitialY;
// let isImgHold = false;

// myImage.addEventListener("mousedown",function(e){
//     isImgHold = true;
//     myInitialX = e.x;
//     myInitialY = e.y;
// })

// myImage.addEventListener("mousemove",function(e){
//     if(isImgHold){
//         let finalX = e.x;
//         let finalY = e.y;
//         let dy = finalY - myInitialY;
//         let dx = finalX - myInitialX;

//         let{top , left} = sticky.getBoundingClientRect();

//         sticky.style.top = top + dy + "px";
//         sticky.style.left = left + dx + "px";

//         myInitialX = finalX;
//         myInitialY = finalY;
//     }
// })

// myImage.addEventListener("mouseup",function(e){
//     isImgHold  = false;
// })


// // document.body.appendChild(img);