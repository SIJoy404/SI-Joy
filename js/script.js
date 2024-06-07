document.addEventListener("DOMContentLoaded", function () {
  const nav = document.querySelector(".nav"),
    navList = nav.querySelectorAll("li"),
    totalNavItem = navList.length,
    allSection = document.querySelectorAll(".section"),
    totalSection = allSection.length,
    navTogglerBtn = document.querySelector(".nav-toggler"),
    aside = document.querySelector(".aside"),
    logoElement = document.getElementById("logo");

  // Function to scroll the section to the top
  function scrollToTop(section) {
    section.scrollTop = 0;
    console.log("Scrolling to top of section:", section.id);
    section.scrollIntoView({ behavior: "smooth" });
  }

  // Function to activate a section and deactivate others
  function activateSection(targetSection) {
    allSection.forEach((section) => {
      section.classList.remove("active");
    });
    targetSection.classList.add("active");
  }

  // Function to activate a nav link and deactivate others
  function activateNavLink(link) {
    navList.forEach((navItem) => {
      navItem.querySelector("a").classList.remove("active");
    });
    link.classList.add("active");
  }

  // Function to show a section based on the element clicked
  function showSection(element) {
    const target = element.getAttribute("href").split("#")[1];
    const targetSection = document.querySelector("#" + target);
    if (targetSection) {
      activateSection(targetSection);
      scrollToTop(targetSection);
    } else {
      console.error(
        "Target section not found for href:",
        element.getAttribute("href")
      );
    }
  }

  // Function to add click event listener to nav links
  function addNavClickListener(navLink, j) {
    navLink.addEventListener("click", function (e) {
      e.preventDefault();
      allSection.forEach((section) => {
        section.classList.remove("back-section");
      });
      navList.forEach((navItem, j) => {
        if (navItem.querySelector("a").classList.contains("active")) {
          allSection[j].classList.add("back-section");
        }
        navItem.querySelector("a").classList.remove("active");
      });
      this.classList.add("active");
      showSection(this);
      if (window.innerWidth < 1200) {
        asideSectionTogglerBtn();
      }
    });
  }

  // Function to toggle aside section
  function asideSectionTogglerBtn() {
    aside.classList.toggle("open");
    navTogglerBtn.classList.toggle("open");
    allSection.forEach((section) => {
      section.classList.toggle("open");
    });
  }

  // scrolling to any section
  function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      console.log(section);
      activateSection(section);
      const sectionLink = document.querySelector(
        'nav a[href="#' + sectionId + '"]'
      );
      activateNavLink(sectionLink);
      scrollToTop(section);
    } else {
      console.error('Section with id "' + sectionId + '" not found');
    }
  }

  // Add event listeners to all nav links
  navList.forEach((navItem, i) => {
    const navLink = navItem.querySelector("a");
    addNavClickListener(navLink, i);
  });

  // Scroll to the home section when the logo is clicked
  if (logoElement) {
    logoElement.addEventListener("click", function () {
      const homeSection = document.getElementById("home");
      if (homeSection) {
        activateSection(homeSection);
        const homeNavLink = document.querySelector('nav a[href="#home"]');
        if (homeNavLink) {
          activateNavLink(homeNavLink);
        }
        scrollToTop(homeSection);
      } else {
        console.error("Home section not found");
      }
    });
  } else {
    console.error("Logo element not found");
  }

  // Add event listener to nav toggler button
  navTogglerBtn.addEventListener("click", asideSectionTogglerBtn);

  //Button LinkUp

  const buttonToContact = document.getElementById("contact-btn");
  const section = document.getElementById("contact");

  console.log(buttonToContact + section + "link");

  buttonToContact.addEventListener("click", function () {
    scrollToSection("contact");
  });

  // CV Download

  const cvButton = document.getElementById("cvDownload");

  cvButton.addEventListener("click", function () {
    const pdfUrl = "CV/Joy_Cv_V_2.pdf";
    const pdfFilename = "SI_Joy_CV.pdf";
    downloadPdf(pdfUrl, pdfFilename);
  });

  function downloadPdf(pdfUrl, pdfFilename) {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = pdfFilename;
    link.click();
  }

  // Hire-Me Button Link -> Contact

  const buttonToContact1 = document.getElementById("hire-me");
  const section1 = document.getElementById("contact");

  console.log(buttonToContact1 + section1 + "link");

  buttonToContact1.addEventListener("click", function () {
    scrollToSection("contact");
  });

  /***************Typed Animation***************** */

  var typed = new Typed(".typing", {
    strings: [
      "Web Designer",
      "Web Developer",
      "UI/UX Designer",
      "Web Scraper",
      "App Designer",
      "App Developer",
    ],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true,
  });

  var typed = new Typed(".typing-2", {
    strings: [
      "Web Designer",
      "Web Developer",
      "UI/UX Designer",
      "Web Scraper",
      "App Designer",
      "App Developer",
    ],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true,
  });

  /***********Clear Form***************** */

  const contactForm = document.getElementById("contactForm");

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Collect form data
    const formData = new FormData(contactForm);

    // Send form data via AJAX
    fetch(contactForm.action, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log("Success:", data);

          // Clear input fields after successful submission
          clearFormInputs(contactForm);

          // Optionally, show a success message to the user
          alert("Email sent successfully!");
        } else {
          console.error("Error:", data);

          // Optionally, show an error message to the user
          alert("There was an error sending the email.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);

        // Optionally, show an error message to the user
        alert("There was an error sending the email.");
      });
  });

  function clearFormInputs(form) {
    const inputs = form.querySelectorAll("input, textarea");
    inputs.forEach((input) => {
      input.value = ""; // Clear input value
    });
  }

  // Smooth scrolling for all anchor links with href starting with #
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      scrollToSection(targetId);
    });
  });
});
