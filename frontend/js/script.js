const menuBtn = document.getElementById("menu-btn");
const menuPage = document.getElementById("menu-page");

menuBtn.addEventListener("click", () => {
    if (menuPage.classList.contains("hidden")) {
        menuPage.classList.remove("hidden");
    } else {
        menuPage.classList.add("hidden");
    }
});

const accountNameLink = document.getElementById("account-name");
if (accountNameLink) {
    const accountInfoModal = document.getElementById("account-info-modal");
    accountNameLink.addEventListener("click", () => {
        if (accountInfoModal.classList.contains("hidden")) {
            accountInfoModal.classList.remove("hidden");
        } else {
            accountInfoModal.classList.add("hidden");
        }
    });
}


// Also change password 
const changeLink = document.getElementById("show-password");
const passPage = document.getElementById("password-container");

if (changeLink) {
    changeLink.addEventListener("click", function () {
        if (passPage.classList.contains("hidden")) {
            passPage.classList.remove("hidden");
        } else {
            passPage.classList.add("hidden");
        }
        console.log("clicked");
    });
}