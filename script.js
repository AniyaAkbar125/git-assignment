

"use strict";


/* =========================================================
   1. PAGE LOADER
========================================================= */

window.addEventListener("load", function () {

    const loader = document.getElementById("loader");

    if (loader) {

        setTimeout(function () {

            loader.classList.add("hide");

        }, 800);

    }

});


/* =========================================================
   2. NAVBAR SCROLL EFFECT
========================================================= */

const navbar = document.getElementById("navbar");

function handleNavbarScroll() {

    if (!navbar) return;

    if (window.scrollY > 60) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

}

window.addEventListener("scroll", handleNavbarScroll);

handleNavbarScroll();


/* =========================================================
   3. MOBILE MENU
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", function () {

        navMenu.classList.toggle("open");

        const icon = menuToggle.querySelector("i");

        if (navMenu.classList.contains("open")) {

            icon.classList.remove("bi-list");
            icon.classList.add("bi-x");

            document.body.classList.add("no-scroll");

        } else {

            icon.classList.remove("bi-x");
            icon.classList.add("bi-list");

            document.body.classList.remove("no-scroll");

        }

    });


    /* Close menu when link is clicked */

    const navLinks = navMenu.querySelectorAll(".nav-link");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            navMenu.classList.remove("open");

            const icon = menuToggle.querySelector("i");

            icon.classList.remove("bi-x");
            icon.classList.add("bi-list");

            document.body.classList.remove("no-scroll");

        });

    });

}


/* =========================================================
   4. ACTIVE NAVIGATION LINK
========================================================= */

const sections = document.querySelectorAll("section[id]");
const links = document.querySelectorAll(".nav-link");

function updateActiveLink() {

    let currentSection = "";

    sections.forEach(function (section) {

        const sectionTop = section.offsetTop - 180;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection = section.getAttribute("id");

        }

    });


    links.forEach(function (link) {

        link.classList.remove("active");

        const href = link.getAttribute("href");

        if (href === "#" + currentSection) {

            link.classList.add("active");

        }

    });

}

window.addEventListener("scroll", updateActiveLink);

updateActiveLink();


/* =========================================================
   5. SMOOTH SCROLL
========================================================= */

const smoothLinks = document.querySelectorAll('a[href^="#"]');

smoothLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");

        if (
            !targetId ||
            targetId === "#" ||
            targetId.length <= 1
        ) {

            return;

        }

        const target = document.querySelector(targetId);

        if (target) {

            event.preventDefault();

            const navbarHeight =
                navbar ? navbar.offsetHeight : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.pageYOffset -
                navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        }

    });

});


/* =========================================================
   6. ANIMATED COUNTERS
========================================================= */

const counters = document.querySelectorAll(".counter");

let countersStarted = false;


function startCounters() {

    if (countersStarted) return;

    countersStarted = true;

    counters.forEach(function (counter) {

        const target =
            Number(counter.getAttribute("data-target"));

        let current = 0;

        const duration = 1800;

        const startTime = performance.now();


        function updateCounter(currentTime) {

            const elapsed =
                currentTime - startTime;

            const progress =
                Math.min(elapsed / duration, 1);

            /* Smooth easing */

            const easedProgress =
                1 - Math.pow(1 - progress, 3);

            current =
                Math.floor(target * easedProgress);

            counter.textContent = current;


            if (progress < 1) {

                requestAnimationFrame(updateCounter);

            } else {

                counter.textContent = target;

            }

        }

        requestAnimationFrame(updateCounter);

    });

}


/* Start counters when statistics section appears */

const statsSection =
    document.querySelector(".stats-section");


if (statsSection) {

    const statsObserver =
        new IntersectionObserver(

            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        startCounters();

                        statsObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.3
            }

        );

    statsObserver.observe(statsSection);

}


/* =========================================================
   7. SCROLL REVEAL ANIMATION
========================================================= */

const revealElements = document.querySelectorAll(
    ".section-heading, " +
    ".about-image, " +
    ".about-content, " +
    ".technology-card, " +
    ".feature-box, " +
    ".stat-item, " +
    ".cta-box"
);


revealElements.forEach(function (element) {

    element.classList.add("reveal");

});


const revealObserver =
    new IntersectionObserver(

        function (entries, observer) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach(function (element) {

    revealObserver.observe(element);

});


/* =========================================================
   8. STAGGER TECHNOLOGY CARDS
========================================================= */

const technologyCards =
    document.querySelectorAll(".technology-card");


technologyCards.forEach(function (card, index) {

    card.style.transitionDelay =
        `${index * 0.12}s`;

});


/* =========================================================
   9. STAGGER FEATURE BOXES
========================================================= */

const featureBoxes =
    document.querySelectorAll(".feature-box");


featureBoxes.forEach(function (box, index) {

    box.style.transitionDelay =
        `${index * 0.1}s`;

});


/* =========================================================
   10. BACK TO TOP BUTTON
========================================================= */

const backToTop =
    document.getElementById("backToTop");


if (backToTop) {

    function handleBackToTop() {

        if (window.scrollY > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    }


    window.addEventListener(
        "scroll",
        handleBackToTop
    );


    backToTop.addEventListener(
        "click",
        function () {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}


/* =========================================================
   11. PARALLAX EFFECT
========================================================= */

const heroBackground =
    document.querySelector(".hero-background");


window.addEventListener("scroll", function () {

    if (!heroBackground) return;

    if (window.innerWidth > 700) {

        const scrollValue =
            window.scrollY * 0.15;

        heroBackground.style.transform =
            `scale(1.05) translateY(${scrollValue}px)`;

    }

});


/* =========================================================
   12. MOUSE MOVEMENT EFFECT
========================================================= */

const heroVisual =
    document.querySelector(".hero-visual");


const futureCard =
    document.querySelector(".future-card");


if (heroVisual && futureCard) {

    heroVisual.addEventListener(
        "mousemove",
        function (event) {

            if (window.innerWidth <= 700) {
                return;
            }

            const rect =
                heroVisual.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateX =
                ((y - centerY) / centerY) * -4;

            const rotateY =
                ((x - centerX) / centerX) * 4;

            futureCard.style.transform =
                `rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 rotate(2deg)`;

        }
    );


    heroVisual.addEventListener(
        "mouseleave",
        function () {

            futureCard.style.transform =
                "rotate(4deg)";

        }
    );

}


/* =========================================================
   13. IMAGE ERROR HANDLING
========================================================= */

const allImages =
    document.querySelectorAll("img");


allImages.forEach(function (image) {

    image.addEventListener(
        "error",
        function () {

            this.style.background =
                "linear-gradient(135deg, #8b5cf6, #06b6d4)";

            this.style.minHeight = "200px";

            this.removeAttribute("src");

        }
    );

});


/* =========================================================
   14. CURRENT YEAR
========================================================= */

const currentYear =
    document.getElementById("currentYear");


if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =========================================================
   15. BUTTON RIPPLE EFFECT
========================================================= */

const buttons =
    document.querySelectorAll(".btn");


buttons.forEach(function (button) {

    button.addEventListener(
        "click",
        function (event) {

            const ripple =
                document.createElement("span");

            ripple.classList.add("ripple");

            const rect =
                button.getBoundingClientRect();

            const size =
                Math.max(
                    rect.width,
                    rect.height
                );

            ripple.style.width =
                `${size}px`;

            ripple.style.height =
                `${size}px`;

            ripple.style.left =
                `${event.clientX - rect.left - size / 2}px`;

            ripple.style.top =
                `${event.clientY - rect.top - size / 2}px`;

            button.appendChild(ripple);


            setTimeout(function () {

                ripple.remove();

            }, 600);

        }
    );

});


/* =========================================================
   16. CONSOLE MESSAGE
========================================================= */

console.log(
    "%c AUREVIA ",
    "background:#8b5cf6;color:white;font-size:20px;font-weight:bold;padding:8px 15px;border-radius:8px;"
);

console.log(
    "Innovate Today. Shape Tomorrow."
);


/* =========================================================
   17. PAGE READY MESSAGE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        document.body.classList.add("page-ready");

    }
);