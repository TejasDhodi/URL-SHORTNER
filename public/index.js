console.log("Jay Shree Ram");

const aboutBtn = document.querySelector("#about");
const about = document.querySelector(".about");
const body = document.querySelector("header");
const closeBtn = document.querySelector("#close");

aboutBtn.addEventListener("click", () => {
    body.classList.add("blur")
    about.classList.add("showAbout")
})

closeBtn.addEventListener("click", () => {
    body.classList.remove("blur")
    about.classList.remove("showAbout")
})