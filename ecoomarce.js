let a = document.querySelector(".signbtn");
let b = document.querySelector(".btnlgn");
a.style.border = "0.10rem solid black";
a.style.borderRadius = "0.6rem";
a.addEventListener("click", function() {
    if (b.style.display === "none" || b.style.display === "") {
        a.addEventListener("click", function() {
            if (b.style.display === "none" || b.style.display === "") {
                b.style.width = "40%";
                b.style.height = "max-content";
                b.style.backgroundColor = "white";
                b.style.position = "fixed";
                b.style.left = "50%";
                b.style.top = "50%";
                b.style.transform = "translate(-50%, -50%)";
                b.style.zIndex = "30";
                b.style.display = "flex";
                b.style.alignItems = "center";
                b.style.justifyContent = "center";
                b.style.flexDirection = "column";
                b.style.gap = "2rem";
                b.style.border = "none";
                b.style.borderRadius = "2rem";
            } else {
                b.style.display = "none";
            }
        });
    } else {
        b.style.display = "none";
    }
});