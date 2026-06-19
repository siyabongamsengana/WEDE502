// ========================
// GALLERY LIGHTBOX
// ========================

var galleryImages = document.querySelectorAll(".gallery-item img");
var lightbox = document.getElementById("lightbox");
var lightboxImg = document.getElementById("lightbox-img");

if (lightbox) {

  for (var i = 0; i < galleryImages.length; i++) {
    galleryImages[i].addEventListener("click", function () {
      lightbox.style.display = "flex";
      lightboxImg.src = this.src;

      setTimeout(function () {
        lightbox.classList.add("active");
      }, 10);
    });
  }

  lightbox.addEventListener("click", function () {
    lightbox.classList.remove("active");

    setTimeout(function () {
      lightbox.style.display = "none";
    }, 300);
  });

}

// ========================
// ENQUIRY FORM VALIDATION
// ========================

var enquiryForm = document.getElementById('enquiryForm');

if (enquiryForm) {

  enquiryForm.addEventListener('submit', function (e) {
    e.preventDefault();

    var fullName = document.getElementById('fullName').value.trim();
    var email = document.getElementById('email').value.trim();
    var phone = document.getElementById('phone').value.trim();
    var serviceType = document.getElementById('serviceType').value;
    var eventDate = document.getElementById('eventDate').value;
    var guests = document.getElementById('guests').value.trim();

    document.getElementById('nameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('phoneError').textContent = '';
    document.getElementById('serviceError').textContent = '';
    document.getElementById('dateError').textContent = '';
    document.getElementById('guestsError').textContent = '';

    var isValid = true;

    if (fullName === '') {
      document.getElementById('nameError').textContent = 'Please enter your full name.';
      isValid = false;
    } else if (fullName.length < 3) {
      document.getElementById('nameError').textContent = 'Name must be at least 3 characters.';
      isValid = false;
    }

    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
      document.getElementById('emailError').textContent = 'Please enter your email address.';
      isValid = false;
    } else if (!emailPattern.test(email)) {
      document.getElementById('emailError').textContent = 'Please enter a valid email address.';
      isValid = false;
    }

    var phonePattern = /^[0-9]{10}$/;
    if (phone === '') {
      document.getElementById('phoneError').textContent = 'Please enter your phone number.';
      isValid = false;
    } else if (!phonePattern.test(phone)) {
      document.getElementById('phoneError').textContent = 'Phone number must be 10 digits.';
      isValid = false;
    }

    if (serviceType === '') {
      document.getElementById('serviceError').textContent = 'Please select an event type.';
      isValid = false;
    }

    if (eventDate === '') {
      document.getElementById('dateError').textContent = 'Please select your event date.';
      isValid = false;
    } else {
      var today = new Date();
      var selected = new Date(eventDate);
      today.setHours(0, 0, 0, 0);
      if (selected <= today) {
        document.getElementById('dateError').textContent = 'Event date must be in the future.';
        isValid = false;
      }
    }

    if (guests === '') {
      document.getElementById('guestsError').textContent = 'Please enter number of guests.';
      isValid = false;
    } else if (guests < 1) {
      document.getElementById('guestsError').textContent = 'Number of guests must be at least 1.';
      isValid = false;
    }

    if (isValid) {
      showEnquiryResponse(serviceType, guests, eventDate);
    }

  });

}

function showEnquiryResponse(serviceType, guests, eventDate) {

  var pricing = {
    wedding: 350,
    corporate: 250,
    party: 200,
    funeral: 180,
    general: 150
  };

  var pricePerPerson = pricing[serviceType];
  var totalEstimate = pricePerPerson * guests;

  var serviceNames = {
    wedding: 'Wedding',
    corporate: 'Corporate Event',
    party: 'Private Party',
    funeral: 'Funeral',
    general: 'General Event'
  };

  var serviceName = serviceNames[serviceType];

  var responseHTML =
    '<strong>Event Type:</strong> ' + serviceName + '<br>' +
    '<strong>Event Date:</strong> ' + eventDate + '<br>' +
    '<strong>Number of Guests:</strong> ' + guests + '<br>' +
    '<strong>Estimated Price Per Person:</strong> R' + pricePerPerson + '<br>' +
    '<strong>Total Estimate:</strong> R' + totalEstimate.toLocaleString();

  document.getElementById('responseDetails').innerHTML = responseHTML;

  enquiryForm.style.display = 'none';
  document.getElementById('enquiryResponse').style.display = 'block';

}


// ========================
// CONTACT FORM VALIDATION
// ========================

var contactForm = document.getElementById('contactForm');

if (contactForm) {

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get values
    var contactName = document.getElementById('contactName').value.trim();
    var contactEmail = document.getElementById('contactEmail').value.trim();
    var contactPhone = document.getElementById('contactPhone').value.trim();
    var messageType = document.getElementById('messageType').value;
    var contactMessage = document.getElementById('contactMessage').value.trim();

    // Clear old errors
    document.getElementById('contactNameError').textContent = '';
    document.getElementById('contactEmailError').textContent = '';
    document.getElementById('contactPhoneError').textContent = '';
    document.getElementById('messageTypeError').textContent = '';
    document.getElementById('contactMessageError').textContent = '';

    var isValid = true;

    // Validate name
    if (contactName === '') {
      document.getElementById('contactNameError').textContent = 'Please enter your full name.';
      isValid = false;
    } else if (contactName.length < 3) {
      document.getElementById('contactNameError').textContent = 'Name must be at least 3 characters.';
      isValid = false;
    }

    // Validate email
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (contactEmail === '') {
      document.getElementById('contactEmailError').textContent = 'Please enter your email address.';
      isValid = false;
    } else if (!emailPattern.test(contactEmail)) {
      document.getElementById('contactEmailError').textContent = 'Please enter a valid email address.';
      isValid = false;
    }

    // Validate phone
    var phonePattern = /^[0-9]{10}$/;
    if (contactPhone === '') {
      document.getElementById('contactPhoneError').textContent = 'Please enter your phone number.';
      isValid = false;
    } else if (!phonePattern.test(contactPhone)) {
      document.getElementById('contactPhoneError').textContent = 'Phone number must be 10 digits.';
      isValid = false;
    }

    // Validate message type
    if (messageType === '') {
      document.getElementById('messageTypeError').textContent = 'Please select a message type.';
      isValid = false;
    }

    // Validate message
    if (contactMessage === '') {
      document.getElementById('contactMessageError').textContent = 'Please enter your message.';
      isValid = false;
    } else if (contactMessage.length < 10) {
      document.getElementById('contactMessageError').textContent = 'Message must be at least 10 characters.';
      isValid = false;
    }

    // If all valid — send email and show response
    if (isValid) {
      sendContactEmail(contactName, contactEmail, contactPhone, messageType, contactMessage);
    }

  });

}

function sendContactEmail(name, email, phone, messageType, message) {

  // Build mailto link
  var subject = 'Website Contact Form - ' + messageType;
  var body = 'Name: ' + name + '%0D%0A' +
             'Email: ' + email + '%0D%0A' +
             'Phone: ' + phone + '%0D%0A' +
             'Message Type: ' + messageType + '%0D%0A' +
             'Message: ' + message;

  var mailtoLink = 'mailto:info@prestigecatering.co.za?subject=' + subject + '&body=' + body;

  // Open email client
  window.location.href = mailtoLink;

  // Show success response
  var responseHTML =
    '<strong>Name:</strong> ' + name + '<br>' +
    '<strong>Email:</strong> '
    var responseHTML =
    '<strong>Name:</strong> ' + name + '<br>' +
    '<strong>Email:</strong> ' + email + '<br>' +
    '<strong>Phone:</strong> ' + phone + '<br>' +
    '<strong>Message Type:</strong> ' + messageType + '<br>' +
    '<strong>Message:</strong> ' + message;

  document.getElementById('contactResponseDetails').innerHTML = responseHTML;

  contactForm.style.display = 'none';
  document.getElementById('contactResponse').style.display = 'block';

}



// ========================
// SERVICES FILTER
// ========================

function filterServices(category) {

  // Get all service sections
  var services = document.querySelectorAll('.service-detail');

  // Get all filter buttons
  var buttons = document.querySelectorAll('.filter-btn');

  // Remove active class from all buttons
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove('active-filter');
  }

  // Add active class to clicked button
  event.target.classList.add('active-filter');

  // Show or hide services based on category
  for (var i = 0; i < services.length; i++) {
    if (category === 'all') {
      services[i].style.display = 'block';
    } else if (services[i].getAttribute('data-category') === category) {
      services[i].style.display = 'block';
    } else {
      services[i].style.display = 'none';
    }
  }

}