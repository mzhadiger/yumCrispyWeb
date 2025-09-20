'use strict';



/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
    for (let i = 0, len = elements.length; i < len; i++) {
        elements[i].addEventListener(eventType, callback);
    }
}



/**
 * MOBILE NAV
 */

const navbar = document.querySelector("[data-navbar]");
const navbarTogglers = document.querySelectorAll("[data-nav-toggler]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const togglerNav = function () {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
}

addEventOnElements(navbarTogglers, "click", togglerNav);

const closeNav = function () {
    navbar.classList.remove("active");
    overlay.classList.remove("active");
}

addEventOnElements(navbarLinks, "click", closeNav);



/**
 * HEADER & BACK TOP BTN
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
    header.classList[window.scrollY > 50 ? "add" : "remove"]("active");
    backTopBtn.classList[window.scrollY > 50 ? "add" : "remove"]("active");
});




/**
 * RESERVATION FORM HANDLING WITH VALIDATION AND EXCEL SUPPORT (TEST)
 */

const reservationForm = document.querySelector(".booking-form");

// Pre-fill date format with dots as user types
const dateInput = document.querySelector("input[name='date");
dateInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if(value.length > 2) value = value.slice(0, 2) + "." + value.slice(2);
    if(value.length > 5) value = value.slice(0, 5) + "." + value.slice(5);
    e.target.value = value;
});


reservationForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.querySelector("input[name='name']").value.trim();
    const timeInput = document.querySelector("input[name='time']")

    let date = dateInput.value.trim();
    let time = timeInput.value.trim();
    
    // Name validation
    if (!name.match(/^[A-Za-z]+$/)) {
        alert("Please enter a valid name with only letters and spaces.");
        return;
    }

    // Date validation (DD.MM.YYYY)
    const datePattern = /^([0-2][0-9]|3[0-1])\.(0[1-9]|1[0-2])\.(\d{4})$/;
    const dateMatch = date.match(datePattern);
    if(!dateMatch || date.length > 10) {
        alert("Please enter a valid date in DD.MM.YYYY format.");
        return;
    }

    const day = parseInt(dateMatch[1], 10);
    const month = parseInt(dateMatch[2], 10);
    const year = parseInt(dateMatch[3], 10);
    const currentYear = new Date().getFullYear();

    if(year > currentYear) {
        alert("The year cannot be in the future.");
        return;
    }

    const timePattern = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;
    if(!time.match(timePattern)) {
        alert("Please enter a valid time in HH:MM format (24-hour). Example: 14:30");
        return;
    }

    const reservationData = {
        name, 
        date,
        time,
    };

    // Exporting to Excel-like CSV format
    const csvContent = `Name,Date,Time\n${name},${date},${time}`;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "reservation.csv";
    link.click();
    
    alert(`Thank you, ${name}! Your reservation for ${date} at ${time} has been saved and exported.`);

    // Reset the form after submission
    reservationForm.reset();
});



























