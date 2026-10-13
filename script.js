function validateInput(input) {
    let valid = input.checkValidity();

    if (input.id === "confirmPassword") {
        let password = document.getElementById("password");
        valid = valid && input.value === password.value;
    }

    input.classList.remove("is-valid", "is-invalid");
    input.classList.add(valid ? "is-valid" : "is-invalid");

    return valid;
}

function setupForm(formId, resultId) {
    const form = document.getElementById(formId);
    if (!form) return;

    const result = document.getElementById(resultId);

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        let valid = true;

        const inputs = form.querySelectorAll(
            "input:not([type=radio]):not([type=checkbox]), textarea, select"
        );

        inputs.forEach(function(input) {
            if (!validateInput(input)) {
                valid = false;
            }
        });

        const gender = form.querySelector("input[name=gender]:checked");
        if (formId === "registrationForm" && !gender) {
            valid = false;
        }

        if (valid) {
            result.textContent = "Form submitted successfully!";
            result.style.color = "green";
        } else {
            result.textContent = "Please correct the errors.";
            result.style.color = "red";
        }
    });

    form.addEventListener("reset", function() {
        form.querySelectorAll(".is-valid, .is-invalid").forEach(function(input) {
            input.classList.remove("is-valid", "is-invalid");
        });
        result.textContent = "";
    });
}

setupForm("feedbackForm", "feedbackResult");
setupForm("registrationForm", "registrationResult");