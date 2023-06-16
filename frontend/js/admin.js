const sidebarBtn = document.getElementById("sm-menu-bar");
const xsSidebarBtn = document.getElementById("sm-menu-bar-sm");
const sidebarPage = document.getElementById("small-sidebar");
const sidebarClose = document.getElementById("sidebar-close");
const sidebarOverlay = document.getElementById("sidebar-overlay");

sidebarBtn.addEventListener("click", () => {
    if (sidebarPage.classList.contains("hidden")) {
        sidebarPage.classList.remove("hidden");
        sidebarOverlay.classList.remove("hidden");
    }
})
sidebarClose.addEventListener("click", () => {
    sidebarPage.classList.add("hidden");
    sidebarOverlay.classList.add("hidden");
})

sidebarOverlay.addEventListener("click", function () {
    sidebarPage.classList.add("hidden");
    sidebarOverlay.classList.add("hidden");
})

const changeLink = document.getElementById("changeLink");
const passPage = document.getElementById("password-page");

if (changeLink) {
    changeLink.addEventListener("click", function () {
        if (passPage.classList.contains("hidden")) {
            passPage.classList.remove("hidden");
        } else {
            passPage.classList.add("hidden");
        }
    });
}