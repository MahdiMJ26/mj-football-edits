```javascript
// اطلاعات بازیکن‌ها
const players = {
    "messi.html": {
        name: "EDIT MESSI",
        description: "EDIT MESSI",
        image: "./messi.jpg"
    },

    "ronaldo.html": {
        name: "EDIT RONALDO",
        description: "EDIT RONALDO",
        image: "./ronaldo.jpg"
    },

    "mbappe.html": {
        name: "EDIT MBAPPE",
        description: "EDIT MBAPPE",
        image: "./mbappe.jpg"
    },

    "neymar.html": {
        name: "EDIT NEYMAR",
        description: "EDIT NEYMAR",
        image: "./neymar.jpg"
    },

    "haaland.html": {
        name: "EDIT HAALAND",
        description: "EDIT HAALAND",
        image: "./haaland.jpg"
    },

    "bellingham.html": {
        name: "EDIT BELLINGHAM",
        description: "EDIT BELLINGHAM",
        image: "./bellingham.jpg"
    }
};

// تشخیص صفحه فعلی
const currentFile = window.location.pathname
    .split("/")
    .pop()
    .toLowerCase();

const player = players[currentFile];

// نمایش اطلاعات بازیکن
if (player) {
    document.title = player.name + " | MJ FOOTBALL EDITS";

    const playerName = document.getElementById("player-name");
    const playerDescription = document.getElementById("player-description");

    if (playerName) {
        playerName.textContent = player.name;
    }

    if (playerDescription) {
        playerDescription.textContent = player.description;
    }

    // تنظیم عکس بازیکن
    const playerPhoto = document.querySelector(".player-photo");

    if (playerPhoto) {
        playerPhoto.src = player.image;
        playerPhoto.alt = player.name;

        playerPhoto.onerror = function () {
            console.error("عکس پیدا نشد:", player.image);
            playerPhoto.style.display = "none";

            const errorMessage = document.createElement("p");
            errorMessage.textContent = "عکس بازیکن پیدا نشد: " + player.image;
            errorMessage.style.color = "#ff6b6b";
            errorMessage.style.textAlign = "center";

            playerPhoto.insertAdjacentElement("afterend", errorMessage);
        };
    }
}

// لودینگ صفحه اصلی
document.addEventListener("DOMContentLoaded", function () {
    const intro = document.getElementById("intro");

    if (intro) {
        setTimeout(function () {
            intro.classList.add("hide");
        }, 5000);
    }
});
```
