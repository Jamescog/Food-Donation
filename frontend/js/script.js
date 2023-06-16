const menuBtn = document.getElementById("menu-btn");
const menuPage = document.getElementById("menu-page");

menuBtn.addEventListener("click", () => {
    if (menuPage.classList.contains("hidden")) {
        menuPage.classList.remove("hidden");
    } else {
        menuPage.classList.add("hidden");
    }
})