const appointmentForm = document.getElementById("appointmentForm");
const dateInput = document.getElementById("date");

// Prevent past dates
const today = new Date();
const localToday = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
).toISOString().split("T")[0];
dateInput.min = localToday;

// Validation helpers
function showError(input, message) {
    const formGroup = input.closest(".form-group");
    let error = formGroup.querySelector(".error-message");
    if (!error) {
        error = document.createElement("span");
        error.className = "error-message";
        formGroup.appendChild(error);
    }
    error.textContent = message;
    input.classList.add("invalid");
}

function clearError(input) {
    const formGroup = input.closest(".form-group");
    const error = formGroup.querySelector(".error-message");
    if (error) error.remove();
    input.classList.remove("invalid");
}

function validateName(name) {
    return name.trim().length >= 2;
}

function validatePhone(phone) {
    // Kenyan phone: 07xxxxxxxx, 01xxxxxxxx, +2547xxxxxxxx, +2541xxxxxxxx
    const kenyanPhone = /^(\+254|0)(7|1)\d{8}$/;
    return kenyanPhone.test(phone.replace(/\s+/g, ""));
}

function validateEmail(email) {
    if (!email) return true; // optional
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateDate(dateStr) {
    if (!dateStr) return false;
    const selected = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selected >= today;
}

function validateTime(hour, minute, ampm) {
    return hour && minute && ampm;
}

function validateService(service) {
    return service !== "";
}

function clearAllErrors() {
    document.querySelectorAll(".error-message").forEach(e => e.remove());
    document.querySelectorAll(".invalid").forEach(e => e.classList.remove("invalid"));
}

function validateForm() {
    clearAllErrors();
    let isValid = true;

    const name = document.getElementById("name");
    const phone = document.getElementById("phone");
    const email = document.getElementById("email");
    const service = document.getElementById("service");
    const date = document.getElementById("date");
    const hour = document.getElementById("hour");
    const minute = document.getElementById("minute");
    const ampm = document.getElementById("ampm");

    if (!validateName(name.value)) {
        showError(name, "Please enter your full name (at least 2 characters)");
        isValid = false;
    }

    if (!validatePhone(phone.value)) {
        showError(phone, "Enter a valid Kenyan phone number (e.g., 0712345678 or +254712345678)");
        isValid = false;
    }

    if (!validateEmail(email.value)) {
        showError(email, "Enter a valid email address");
        isValid = false;
    }

    if (!validateService(service.value)) {
        showError(service, "Please select a service");
        isValid = false;
    }

    if (!validateDate(date.value)) {
        showError(date, "Please select a valid future date");
        isValid = false;
    }

    if (!validateTime(hour.value, minute.value, ampm.value)) {
        const timeGroup = hour.closest(".form-group");
        let error = timeGroup.querySelector(".error-message");
        if (!error) {
            error = document.createElement("span");
            error.className = "error-message";
            timeGroup.appendChild(error);
        }
        error.textContent = "Please select a complete time (hour, minute, AM/PM)";
        hour.classList.add("invalid");
        minute.classList.add("invalid");
        ampm.classList.add("invalid");
        isValid = false;
    }

    return isValid;
}

// Real-time validation on blur
["name", "phone", "email", "service", "date", "hour", "minute", "ampm"].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
        el.addEventListener("blur", () => {
            clearError(el);
            if (id === "name" && !validateName(el.value)) showError(el, "Please enter your full name (at least 2 characters)");
            if (id === "phone" && !validatePhone(el.value)) showError(el, "Enter a valid Kenyan phone number");
            if (id === "email" && el.value && !validateEmail(el.value)) showError(el, "Enter a valid email address");
            if (id === "service" && !validateService(el.value)) showError(el, "Please select a service");
            if (id === "date" && !validateDate(el.value)) showError(el, "Please select a valid future date");
        });
        el.addEventListener("input", () => {
            if (el.classList.contains("invalid")) clearError(el);
        });
    }
});

appointmentForm.addEventListener("submit", function(event) {
    event.preventDefault();

    if (!validateForm()) {
        const firstInvalid = document.querySelector(".invalid");
        if (firstInvalid) firstInvalid.focus();
        return;
    }

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const service = document.getElementById("service").value;
    const date = document.getElementById("date").value;
    const hour = document.getElementById("hour").value;
    const minute = document.getElementById("minute").value;
    const ampm = document.getElementById("ampm").value;
    const time = `${hour}:${minute} ${ampm}`;
    const message = document.getElementById("message").value.trim();

    const whatsappNumber = "254111312937";

    const whatsappMessage =
        " *MARIE BEAUTY STUDIO - APPOINTMENT REQUEST* \n\n" +
        " *Client Name:* " + name + "\n" +
        " *Phone Number:* " + phone + "\n" +
        " *Email:* " + (email || "Not provided") + "\n" +
        " *Service:* " + service + "\n" +
        " *Preferred Date:* " + date + "\n" +
        " *Preferred Time:* " + time + "\n" +
        " *Additional Information:* " + (message || "None") +
        "\n\nPlease confirm my appointment. Thank you!";

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappURL = "https://wa.me/" + whatsappNumber + "?text=" + encodedMessage;

    window.open(whatsappURL, "_blank");
});
