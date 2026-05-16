const slider = document.querySelector("[data-slider]");

if (slider) {
  const slides = Array.from(slider.querySelectorAll(".hero-slide"));
  const dots = Array.from(document.querySelectorAll(".slider-dot"));
  let currentIndex = 0;

  const showSlide = (index) => {
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("active", slideIndex === index);
    });

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("active", dotIndex === index);
    });

    currentIndex = index;
  };

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => showSlide(index));
  });

  setInterval(() => {
    const nextIndex = (currentIndex + 1) % slides.length;
    showSlide(nextIndex);
  }, 2000);
}

const helpForm = document.querySelector("#help-form");

if (helpForm) {
  helpForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const apiUrl = helpForm.dataset.apiUrl;
    const submitButton = helpForm.querySelector('button[type="submit"]');

    if (!apiUrl) {
      alert("Form backend is not connected yet. Add the Render API URL in contact.html.");
      return;
    }

    const formData = new FormData(helpForm);
    const payload = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      village: formData.get("village"),
      crop: formData.get("crop"),
      issueType: formData.get("issue-type"),
      stage: formData.get("stage"),
      message: formData.get("message"),
    };

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      helpForm.reset();
      alert("Inquiry sent successfully.");
    } catch (error) {
      alert("Could not send inquiry. Please try again.");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Send Inquiry";
    }
  });
}
