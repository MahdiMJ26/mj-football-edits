(() => {
    "use strict";

    // اطلاعات ۶ صفحه قدیمی بازیکنان
    const playerPages = {
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

    function setupPlayerPage() {
        const currentFile = window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();

        const player = playerPages[currentFile];

        if (!player) return;

        document.title = `${player.name} | MJ FOOTBALL EDITS`;

        const nameElement = document.getElementById("player-name");
        const descriptionElement =
            document.getElementById("player-description");
        const photo = document.querySelector(".player-photo");

        if (nameElement) {
            nameElement.textContent = player.name;
        }

        if (descriptionElement) {
            descriptionElement.textContent = player.description;
        }

        if (photo) {
            photo.onerror = function () {
                console.error("عکس بازیکن پیدا نشد:", player.image);
                photo.alt = "عکس بازیکن در دسترس نیست";
            };

            photo.src = player.image;
            photo.alt = player.name;
        }
    }

    function setupIntro() {
        const intro = document.getElementById("intro");

        if (!intro) return;

        window.setTimeout(() => {
            intro.classList.add("hide");
        }, 5000);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => {
            setupPlayerPage();
            setupIntro();
        });
    } else {
        setupPlayerPage();
        setupIntro();
    }
})();
