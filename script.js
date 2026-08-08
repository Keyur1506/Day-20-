/*=========================================================
                EDUNOVA INSTITUTE
                FINAL COMMON SCRIPT
=========================================================*/

document.addEventListener("DOMContentLoaded", function () {

    "use strict";


    /*=====================================================
                    BASIC ELEMENTS
    =====================================================*/

    const header =
        document.querySelector(".header");

    const navbar =
        document.getElementById("navbar");

    const menuBtn =
        document.getElementById("menuBtn");

    const scrollTopBtn =
        document.getElementById("scrollTop");


    /*=====================================================
                    AOS ANIMATION
    =====================================================*/

    if (typeof AOS !== "undefined") {

        AOS.init({

            duration: 800,

            easing: "ease-in-out",

            once: true,

            offset: 80

        });

    }


    /*=====================================================
                    STICKY HEADER
    =====================================================*/

    function handleHeader() {

        if (!header) return;

        if (window.scrollY > 60) {

            header.classList.add("sticky");

        } else {

            header.classList.remove("sticky");

        }

    }

    window.addEventListener(
        "scroll",
        handleHeader
    );

    handleHeader();


    /*=====================================================
                    MOBILE NAVBAR
    =====================================================*/

    function openMenu() {

        if (!navbar) return;

        navbar.classList.add("active");

        if (menuBtn) {

            menuBtn.classList.add("active");

            menuBtn.innerHTML =
                '<i class="fa-solid fa-xmark"></i>';

            menuBtn.setAttribute(
                "aria-expanded",
                "true"
            );

        }

        document.body.classList.add(
            "menu-open"
        );

    }


    function closeMenu() {

        if (!navbar) return;

        navbar.classList.remove("active");

        if (menuBtn) {

            menuBtn.classList.remove("active");

            menuBtn.innerHTML =
                '<i class="fa-solid fa-bars"></i>';

            menuBtn.setAttribute(
                "aria-expanded",
                "false"
            );

        }

        document.body.classList.remove(
            "menu-open"
        );

    }


    if (menuBtn && navbar) {

        menuBtn.addEventListener(
            "click",
            function () {

                if (
                    navbar.classList.contains("active")
                ) {

                    closeMenu();

                } else {

                    openMenu();

                }

            }
        );

    }


    /*=====================================================
                    NAVBAR LINKS
    =====================================================*/

    const navLinks =
        document.querySelectorAll(
            "#navbar a"
        );


    navLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                closeMenu();

            }
        );

    });


    /*=====================================================
                    ESCAPE CLOSE MENU
    =====================================================*/

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                closeMenu();

                closeAllPopups();

            }

        }
    );


    /*=====================================================
                    CLOSE MENU ON RESIZE
    =====================================================*/

    window.addEventListener(
        "resize",
        function () {

            if (
                window.innerWidth > 992
            ) {

                closeMenu();

            }

        }
    );


    /*=====================================================
                    ACTIVE PAGE NAVIGATION
    =====================================================*/

    const currentFile =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    navLinks.forEach(function (link) {

        const href =
            link.getAttribute("href");


        if (!href) return;


        const linkFile =
            href
                .split("/")
                .pop()
                .split("#")[0]
                .toLowerCase();


        link.classList.remove("active");


        if (
            linkFile === currentFile
        ) {

            link.classList.add("active");

        }


        /* index.html / empty path */

        if (
            (
                currentFile === "" ||
                currentFile === "index.html"
            ) &&
            linkFile === "index.html"
        ) {

            link.classList.add("active");

        }

    });


    /*=====================================================
                    SMOOTH SCROLL
    =====================================================*/

    const hashLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    hashLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const targetId =
                    this.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) return;


                event.preventDefault();


                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;


                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.pageYOffset -
                    headerHeight;


                window.scrollTo({

                    top: targetPosition,

                    behavior: "smooth"

                });

            }
        );

    });


    /*=====================================================
                    SCROLL TO TOP
    =====================================================*/

    function updateScrollTop() {

        if (!scrollTopBtn) return;


        if (window.scrollY > 400) {

            scrollTopBtn.classList.add(
                "show"
            );

        } else {

            scrollTopBtn.classList.remove(
                "show"
            );

        }

    }


    window.addEventListener(
        "scroll",
        updateScrollTop
    );


    updateScrollTop();


    if (scrollTopBtn) {

        scrollTopBtn.addEventListener(
            "click",
            function () {

                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }
        );

    }


    /*=====================================================
                SCROLL ACTIVE SECTION
                ONLY FOR INDEX PAGE
    =====================================================*/

    const pageSections =
        document.querySelectorAll(
            "section[id]"
        );


    function updateSectionNav() {

        if (!pageSections.length) return;


        let currentSection = "";


        pageSections.forEach(
            function (section) {

                const sectionTop =
                    section.offsetTop - 180;


                if (
                    window.scrollY >= sectionTop
                ) {

                    currentSection =
                        section.getAttribute(
                            "id"
                        );

                }

            }
        );


        navLinks.forEach(
            function (link) {

                const href =
                    link.getAttribute("href");


                if (!href) return;


                if (
                    href.startsWith("#")
                ) {

                    link.classList.remove(
                        "active"
                    );


                    if (
                        href ===
                        "#" + currentSection
                    ) {

                        link.classList.add(
                            "active"
                        );

                    }

                }

            }
        );

    }


    window.addEventListener(
        "scroll",
        updateSectionNav
    );


    /*=====================================================
                    PHONE INPUT
    =====================================================*/

    const phoneInputs =
        document.querySelectorAll(
            'input[type="tel"]'
        );


    phoneInputs.forEach(
        function (input) {

            input.addEventListener(
                "input",
                function () {

                    this.value =
                        this.value
                            .replace(
                                /\D/g,
                                ""
                            )
                            .slice(
                                0,
                                10
                            );

                }
            );

        }
    );


    /*=====================================================
                    FORM VALIDATION
    =====================================================*/

    const forms =
        document.querySelectorAll(
            "form"
        );


    forms.forEach(
        function (form) {

            const phone =
                form.querySelector(
                    'input[type="tel"]'
                );


            form.addEventListener(
                "submit",
                function (event) {

                    if (!form.checkValidity()) {

                        event.preventDefault();

                        form.reportValidity();

                        return;

                    }


                    if (phone) {

                        const phoneValue =
                            phone.value.trim();


                        if (
                            phoneValue.length !== 10
                        ) {

                            event.preventDefault();


                            phone.setCustomValidity(
                                "Please enter a valid 10 digit mobile number."
                            );


                            phone.reportValidity();


                            phone.setCustomValidity(
                                ""
                            );


                            return;

                        }

                    }

                }
            );

        }
    );


    /*=====================================================
                    CONTACT FORM
    =====================================================*/

    const contactForms =
        document.querySelectorAll(
            "#contactForm, .contact-form"
        );


    contactForms.forEach(
        function (form) {

            form.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();


                    if (!form.checkValidity()) {

                        form.reportValidity();

                        return;

                    }


                    /*-----------------------------------------------
                        MOBILE KEYBOARD FORCE HIDE
                    -----------------------------------------------*/

                    hideMobileKeyboard();

                    form.reset();

                    /* Give Android Chrome time to close the IME
                       before showing the success popup. */
                    setTimeout(function () {

                        hideMobileKeyboard();
                        showSuccessPopup();

                    }, 180);

                }
            );

        }
    );


    /*=====================================================
                    MOBILE KEYBOARD FORCE HIDE
    =====================================================*/

    function hideMobileKeyboard() {

        const active = document.activeElement;

        /* First remove focus from the field that opened the IME. */
        if (active && typeof active.blur === "function") {
            active.blur();
        }

        /* Chrome/Android Virtual Keyboard API. */
        if (
            navigator.virtualKeyboard &&
            typeof navigator.virtualKeyboard.hide === "function"
        ) {
            try {
                navigator.virtualKeyboard.hide();
            } catch (error) {
                console.log("Virtual keyboard hide:", error);
            }
        }

        /* Remove focus from any input/textarea that may still
           hold focus after the submit event. */
        document.querySelectorAll(
            "input, textarea, select, button"
        ).forEach(function (element) {

            if (document.activeElement === element) {
                element.blur();
            }

        });

    }


    /*=====================================================
                    SUCCESS POPUP
    =====================================================*/

    const popup =
        document.getElementById("popup");


    const popupOverlay =
        document.getElementById(
            "popupOverlay"
        );


    const popupClose =
        document.getElementById(
            "popupClose"
        );


    const oldPopupClose =
        document.getElementById(
            "closePopup"
        );


    const popupOk =
        document.getElementById(
            "popupOk"
        );


    function showSuccessPopup() {

        hideMobileKeyboard();

        if (popup) {

            popup.classList.add("show");

            popup.style.display =
                "flex";

        }


        if (popupOverlay) {

            popupOverlay.classList.add(
                "show"
            );

            popupOverlay.style.display =
                "flex";

        }


        document.body.classList.add(
            "popup-open"
        );

    }


    function closeSuccessPopup() {

        if (popup) {

            popup.classList.remove(
                "show"
            );

            popup.style.display =
                "none";

        }


        if (popupOverlay) {

            popupOverlay.classList.remove(
                "show"
            );

            popupOverlay.style.display =
                "none";

        }


        document.body.classList.remove(
            "popup-open"
        );

    }


    function closeAllPopups() {

        closeSuccessPopup();

        const extraPopups =
            document.querySelectorAll(
                ".modal.active, .lightbox.active, .gallery-modal.active"
            );


        extraPopups.forEach(
            function (item) {

                item.classList.remove(
                    "active"
                );

            }
        );

    }


    if (popupClose) {

        popupClose.addEventListener(
            "click",
            closeSuccessPopup
        );

    }


    if (oldPopupClose) {

        oldPopupClose.addEventListener(
            "click",
            closeSuccessPopup
        );

    }


    if (popupOk) {

        popupOk.addEventListener(
            "click",
            closeSuccessPopup
        );

    }


    if (popupOverlay) {

        popupOverlay.addEventListener(
            "click",
            closeSuccessPopup
        );

    }


    /*=====================================================
                    GALLERY LIGHTBOX
    =====================================================*/

    const galleryItems =
        document.querySelectorAll(
            ".gallery-item"
        );


    if (galleryItems.length) {

        let lightbox =
            document.getElementById(
                "galleryLightbox"
            );


        /*-----------------------------------------------
                CREATE LIGHTBOX AUTOMATICALLY
        -----------------------------------------------*/

        if (!lightbox) {

            lightbox =
                document.createElement(
                    "div"
                );


            lightbox.id =
                "galleryLightbox";


            lightbox.className =
                "gallery-lightbox";


            lightbox.innerHTML = `

                <button
                    type="button"
                    class="gallery-lightbox-close"
                    id="galleryLightboxClose"
                    aria-label="Close image"
                >
                    <i class="fa-solid fa-xmark"></i>
                </button>

                <button
                    type="button"
                    class="gallery-lightbox-prev"
                    id="galleryLightboxPrev"
                    aria-label="Previous image"
                >
                    <i class="fa-solid fa-chevron-left"></i>
                </button>

                <div class="gallery-lightbox-content">

                    <img
                        id="galleryLightboxImage"
                        src=""
                        alt="Gallery image"
                    >

                    <h3 id="galleryLightboxTitle"></h3>

                </div>

                <button
                    type="button"
                    class="gallery-lightbox-next"
                    id="galleryLightboxNext"
                    aria-label="Next image"
                >
                    <i class="fa-solid fa-chevron-right"></i>
                </button>

            `;


            document.body.appendChild(
                lightbox
            );

        }


        const lightboxImage =
            document.getElementById(
                "galleryLightboxImage"
            );


        const lightboxTitle =
            document.getElementById(
                "galleryLightboxTitle"
            );


        const lightboxClose =
            document.getElementById(
                "galleryLightboxClose"
            );


        const lightboxPrev =
            document.getElementById(
                "galleryLightboxPrev"
            );


        const lightboxNext =
            document.getElementById(
                "galleryLightboxNext"
            );


        let currentGalleryIndex = 0;


        function openGallery(index) {

            const item =
                galleryItems[index];


            if (!item) return;


            const image =
                item.querySelector(
                    "img"
                );


            const title =
                item.querySelector(
                    "h3"
                );


            if (
                !image ||
                !lightboxImage
            ) return;


            currentGalleryIndex =
                index;


            lightboxImage.src =
                image.src;


            lightboxImage.alt =
                image.alt || "Gallery image";


            if (lightboxTitle) {

                lightboxTitle.textContent =
                    title
                        ? title.textContent
                        : image.alt;

            }


            lightbox.classList.add(
                "active"
            );


            document.body.classList.add(
                "popup-open"
            );

        }


        function closeGallery() {

            if (!lightbox) return;


            lightbox.classList.remove(
                "active"
            );


            document.body.classList.remove(
                "popup-open"
            );

        }


        function nextGallery() {

            currentGalleryIndex++;


            if (
                currentGalleryIndex >=
                galleryItems.length
            ) {

                currentGalleryIndex = 0;

            }


            openGallery(
                currentGalleryIndex
            );

        }


        function previousGallery() {

            currentGalleryIndex--;


            if (
                currentGalleryIndex < 0
            ) {

                currentGalleryIndex =
                    galleryItems.length - 1;

            }


            openGallery(
                currentGalleryIndex
            );

        }


        galleryItems.forEach(
            function (item, index) {

                item.addEventListener(
                    "click",
                    function () {

                        openGallery(index);

                    }
                );

            }
        );


        if (lightboxClose) {

            lightboxClose.addEventListener(
                "click",
                closeGallery
            );

        }


        if (lightboxNext) {

            lightboxNext.addEventListener(
                "click",
                nextGallery
            );

        }


        if (lightboxPrev) {

            lightboxPrev.addEventListener(
                "click",
                previousGallery
            );

        }


        if (lightbox) {

            lightbox.addEventListener(
                "click",
                function (event) {

                    if (
                        event.target ===
                        lightbox
                    ) {

                        closeGallery();

                    }

                }
            );

        }


        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    !lightbox ||
                    !lightbox.classList.contains(
                        "active"
                    )
                ) {

                    return;

                }


                if (
                    event.key === "ArrowRight"
                ) {

                    nextGallery();

                }


                if (
                    event.key === "ArrowLeft"
                ) {

                    previousGallery();

                }

            }
        );

    }


    /*=====================================================
                    FAQ ACCORDION
    =====================================================*/

    const faqBoxes =
        document.querySelectorAll(
            ".faq-box"
        );


    faqBoxes.forEach(
        function (box) {

            const heading =
                box.querySelector("h3");


            const answer =
                box.querySelector("p");


            if (
                !heading ||
                !answer
            ) {

                return;

            }


            heading.addEventListener(
                "click",
                function () {

                    box.classList.toggle(
                        "active"
                    );

                }
            );

        }
    );


    /*=====================================================
                    COURSE CARDS
    =====================================================*/

    const courseCards =
        document.querySelectorAll(
            ".course-card"
        );


    courseCards.forEach(
        function (card) {

            const buttons =
                card.querySelectorAll(
                    "a.btn, button"
                );


            buttons.forEach(
                function (button) {

                    const text =
                        button.textContent
                            .trim()
                            .toLowerCase();


                    if (
                        text.includes("enroll") ||
                        text.includes("apply") ||
                        text.includes("join")
                    ) {

                        button.addEventListener(
                            "click",
                            function () {

                                const courseName =
                                    card.querySelector(
                                        "h3"
                                    );


                                if (
                                    courseName &&
                                    !button.hasAttribute(
                                        "href"
                                    )
                                ) {

                                    const courseInput =
                                        document.querySelector(
                                            "#course"
                                        );


                                    if (
                                        courseInput
                                    ) {

                                        courseInput.value =
                                            courseName.textContent.trim();

                                    }

                                }

                            }
                        );

                    }

                }
            );

        }
    );


    /*=====================================================
                    COUNTER ANIMATION
    =====================================================*/

    const counters =
        document.querySelectorAll(
            ".counter, .stat-number, .stat-box h3"
        );


    const counterObserver =
        new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(
                    function (entry) {

                        if (
                            !entry.isIntersecting
                        ) {

                            return;

                        }


                        const counter =
                            entry.target;


                        if (
                            counter.dataset.started ===
                            "true"
                        ) {

                            return;

                        }


                        counter.dataset.started =
                            "true";


                        const original =
                            counter.textContent.trim();


                        const number =
                            parseInt(
                                original.replace(
                                    /[^0-9]/g,
                                    ""
                                ),
                                10
                            );


                        if (
                            isNaN(number)
                        ) {

                            return;

                        }


                        const suffix =
                            original.replace(
                                /[0-9]/g,
                                ""
                            );


                        let current = 0;


                        const duration =
                            1200;


                        const startTime =
                            performance.now();


                        function animateCounter(
                            currentTime
                        ) {

                            const progress =
                                Math.min(
                                    (
                                        currentTime -
                                        startTime
                                    ) /
                                    duration,
                                    1
                                );


                            current =
                                Math.floor(
                                    progress *
                                    number
                                );


                            counter.textContent =
                                current +
                                suffix;


                            if (
                                progress < 1
                            ) {

                                requestAnimationFrame(
                                    animateCounter
                                );

                            } else {

                                counter.textContent =
                                    number +
                                    suffix;

                            }

                        }


                        requestAnimationFrame(
                            animateCounter
                        );


                        observer.unobserve(
                            counter
                        );

                    }
                );

            },
            {
                threshold: 0.5
            }
        );


    counters.forEach(
        function (counter) {

            counterObserver.observe(
                counter
            );

        }
    );


    /*=====================================================
                    IMAGE FALLBACK
    =====================================================*/

    const allImages =
        document.querySelectorAll(
            "img"
        );


    allImages.forEach(
        function (image) {

            image.addEventListener(
                "error",
                function () {

                    this.classList.add(
                        "image-error"
                    );

                }
            );

        }
    );


    /*=====================================================
                    BODY CLICK
    =====================================================*/

    document.addEventListener(
        "click",
        function (event) {

            /*
                Prevent accidental empty # links
                except actual section links.
            */

            const link =
                event.target.closest(
                    'a[href="#"]'
                );


            if (link) {

                event.preventDefault();

            }

        }
    );


    /*=====================================================
                    FINAL STATUS
    =====================================================*/

    console.log(
        "EduNova Institute - All common JS loaded successfully."
    );

});

// =========================================
// CLOSE POPUP
// =========================================

const closePopup = document.getElementById("closePopup");

if (closePopup) {

    closePopup.addEventListener("click", function () {

        const popup = document.getElementById("popup");

        if (popup) {

            popup.classList.remove("show");

            popup.style.display = "none";

        }

    });

}


// =========================================
// CLOSE POPUP WHEN CLICK OUTSIDE
// =========================================

const popup = document.getElementById("popup");

if (popup) {

    popup.addEventListener("click", function (e) {

        if (e.target === popup) {

            popup.classList.remove("show");

            popup.style.display = "none";

        }

    });

}