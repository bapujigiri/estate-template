// script.js - Common JavaScript for Dalwara Real Estate Website

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainNav = document.getElementById('mainNav');

if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener('click', function () {
        mainNav.classList.toggle('active');
        mobileMenuBtn.innerHTML = mainNav.classList.contains('active') ?
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('#mainNav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            mainNav.classList.remove('active');
            if (mobileMenuBtn) {
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
}

// Highlight current page in navigation
document.addEventListener('DOMContentLoaded', function () {
    // Highlight current page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('#mainNav a');

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (currentPage === linkHref) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Phone number click interaction
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const phoneNumber = this.getAttribute('href').replace('tel:', '');
            alert(`Calling ${phoneNumber}...\n\nIn a real implementation, this would initiate a phone call.`);
        });
    });

    // Email click interaction
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const emailAddress = this.getAttribute('href').replace('mailto:', '');
            alert(`Opening email client to send message to ${emailAddress}...\n\nIn a real implementation, this would open the default email client.`);
        });
    });
});

// Contact form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        const firstName = document.getElementById('firstName')?.value;
        const lastName = document.getElementById('lastName')?.value;
        const email = document.getElementById('email')?.value;
        const subject = document.getElementById('subject')?.value || 'general inquiry';

        // Show success message
        if (firstName && lastName && email) {
            alert(`Thank you ${firstName} ${lastName}! Your message has been sent successfully. We will contact you at ${email} regarding your ${subject} inquiry within 24 hours.`);
        } else {
            alert('Thank you! Your message has been sent successfully. We will contact you shortly.');
        }

        // Reset form
        contactForm.reset();
    });
}

// Property inquiry form submission
const inquiryForm = document.getElementById('propertyInquiryForm');
if (inquiryForm) {
    inquiryForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('inquiryName')?.value;
        const email = document.getElementById('inquiryEmail')?.value;
        const date = document.getElementById('inquiryDate')?.value;

        // Format date for display
        let dateDisplay = 'not specified';
        if (date) {
            const dateObj = new Date(date);
            dateDisplay = dateObj.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }

        // Show success message
        if (name && email) {
            alert(`Thank you ${name}! Your viewing request has been submitted successfully. We will contact you at ${email} to confirm your appointment for ${dateDisplay}.`);
        } else {
            alert('Thank you! Your viewing request has been submitted successfully. We will contact you shortly.');
        }

        // Reset form
        inquiryForm.reset();
    });
}

// Brochure download functionality
const downloadBtn = document.getElementById('downloadBrochure');
if (downloadBtn) {
    downloadBtn.addEventListener('click', function () {
        alert('Downloading property brochure...\n\nIn a real implementation, this would download a PDF file with detailed property information, floor plans, and high-resolution images.');

        // Simulate download
        setTimeout(() => {
            alert('Property brochure downloaded successfully!');
        }, 1500);
    });
}

// Set minimum date for viewing date input to today
const dateInput = document.getElementById('inquiryDate');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

// Property card hover effects
const propertyCards = document.querySelectorAll('.property-card');
propertyCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px)';
        this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
    });
});

// Image gallery functionality for property details page
const thumbnails = document.querySelectorAll('.thumbnail');
const mainImage = document.getElementById('mainImage');

if (thumbnails.length > 0 && mainImage) {
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function () {
            // Update main image
            const newSrc = this.getAttribute('data-image');
            mainImage.setAttribute('src', newSrc);

            // Update active thumbnail
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Property search form submission
const searchForm = document.querySelector('.search-form');
if (searchForm) {
    searchForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const propertyType = document.getElementById('property-type')?.value;
        const location = document.getElementById('location')?.value;
        const priceRange = document.getElementById('price-range')?.value;
        const bedrooms = document.getElementById('bedrooms')?.value;

        alert(`Searching for properties with filters:\nType: ${propertyType}\nLocation: ${location}\nPrice: ${priceRange}\nBedrooms: ${bedrooms}`);
    });
}

// Property filter functionality for properties page
const filterForm = document.getElementById('propertyFilters');
if (filterForm) {
    const propertyCards = document.querySelectorAll('.property-card');
    const resultsCount = document.getElementById('resultsCount');

    // Function to filter properties
    function filterProperties() {
        const propertyType = document.getElementById('propertyType')?.value || 'all';
        const location = document.getElementById('location')?.value || 'all';
        const bedrooms = document.getElementById('bedrooms')?.value || 'any';
        const priceRange = document.getElementById('priceRange')?.value || 'any';
        const propertyStatus = document.getElementById('propertyStatus')?.value || 'all';

        let visibleCount = 0;

        if (propertyCards.length > 0) {
            propertyCards.forEach(card => {
                const type = card.getAttribute('data-type');
                const cardLocation = card.getAttribute('data-location');
                const cardBedrooms = parseInt(card.getAttribute('data-bedrooms'));
                const cardPrice = parseFloat(card.getAttribute('data-price'));
                const cardStatus = card.getAttribute('data-status');

                let showCard = true;

                // Filter by property type
                if (propertyType !== 'all' && propertyType !== type) {
                    showCard = false;
                }

                // Filter by location
                if (location !== 'all' && location !== cardLocation) {
                    showCard = false;
                }

                // Filter by bedrooms
                if (bedrooms !== 'any' && cardBedrooms < parseInt(bedrooms)) {
                    showCard = false;
                }

                // Filter by price range
                if (priceRange !== 'any') {
                    const [min, max] = priceRange === '1000+' ? [1000000, Infinity] : priceRange.split('-').map(val => parseFloat(val) * 1000);

                    if (cardPrice < min || (max !== Infinity && cardPrice > max)) {
                        showCard = false;
                    }
                }

                // Filter by status
                if (propertyStatus !== 'all' && propertyStatus !== cardStatus) {
                    showCard = false;
                }

                // Show/hide card based on filters
                if (showCard) {
                    card.style.display = 'flex';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });
        }

        // Update results count
        if (resultsCount) {
            resultsCount.textContent = `Showing ${visibleCount} propert${visibleCount === 1 ? 'y' : 'ies'}`;
        }
    }

    // Event listeners for filters
    filterForm.addEventListener('submit', function (e) {
        e.preventDefault();
        filterProperties();
    });

    // Reset filters
    const resetFiltersBtn = document.getElementById('resetFilters');
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', function () {
            filterForm.reset();
            filterProperties();
        });
    }

    // Initialize filters on page load
    filterProperties();
}

// View toggle functionality for properties page
const gridViewBtn = document.getElementById('gridViewBtn');
const listViewBtn = document.getElementById('listViewBtn');
const propertiesGrid = document.getElementById('propertiesGrid');

if (gridViewBtn && listViewBtn && propertiesGrid) {
    gridViewBtn.addEventListener('click', function () {
        this.classList.add('active');
        listViewBtn.classList.remove('active');
        propertiesGrid.classList.remove('list-view');
    });

    listViewBtn.addEventListener('click', function () {
        this.classList.add('active');
        gridViewBtn.classList.remove('active');
        propertiesGrid.classList.add('list-view');
    });
}

// FAQ Accordion functionality for contact page
const faqQuestions = document.querySelectorAll('.faq-question');
if (faqQuestions.length > 0) {
    faqQuestions.forEach(question => {
        question.addEventListener('click', function () {
            const answer = this.nextElementSibling;
            const isActive = this.classList.contains('active');

            // Close all other FAQ items
            faqQuestions.forEach(q => {
                q.classList.remove('active');
                q.nextElementSibling.classList.remove('active');
            });

            // Toggle current FAQ item if it wasn't active
            if (!isActive) {
                this.classList.add('active');
                answer.classList.add('active');
            }
        });
    });

    // Open first FAQ by default
    faqQuestions[0].click();
}


//                          PopUp Modal Functions
// Property Inquiry Popup Functionality
document.addEventListener('DOMContentLoaded', function () {
    const inquiryPopup = document.getElementById('inquiryPopup');
    const closePopup = document.getElementById('closePopup');
    const popupInquiryForm = document.getElementById('popupInquiryForm');

    // Show popup after 3 seconds
    setTimeout(function () {
        inquiryPopup.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }, 4000);

    // Close popup when clicking close button
    closePopup.addEventListener('click', function () {
        inquiryPopup.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scrolling
    });

    // Close popup when clicking outside the popup
    inquiryPopup.addEventListener('click', function (e) {
        if (e.target === inquiryPopup) {
            inquiryPopup.classList.remove('active');
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
    });

    // Close popup with Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && inquiryPopup.classList.contains('active')) {
            inquiryPopup.classList.remove('active');
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
    });

    // Popup form submission
    popupInquiryForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        const fullName = document.getElementById('popupFullName').value;
        const phone = document.getElementById('popupPhone').value;
        const email = document.getElementById('popupEmail').value;
        const contactTime = document.getElementById('popupContactTime').value;
        const message = document.getElementById('popupMessage').value;

        // Format contact time for display
        let contactTimeDisplay = 'Not specified';
        if (contactTime) {
            const timeMap = {
                'morning': 'Morning (9 AM - 12 PM)',
                'afternoon': 'Afternoon (12 PM - 4 PM)',
                'evening': 'Evening (4 PM - 7 PM)'
            };
            contactTimeDisplay = timeMap[contactTime] || contactTime;
        }

        // Show success message
        alert(`Thank you ${fullName}! Your property inquiry has been submitted successfully.\n\nWe will contact you at ${phone} ${email ? 'or ' + email : ''} during ${contactTimeDisplay.toLowerCase()}.\n\nOur representative will get in touch with you within 24 hours.`);

        // Reset form
        popupInquiryForm.reset();

        // Close popup
        inquiryPopup.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scrolling
    });

    // Store popup state in localStorage to show only once per session
    const popupShown = sessionStorage.getItem('inquiryPopupShown');
    if (popupShown) {
        // Don't show popup automatically if already shown in this session
        clearTimeout(popupTimeout);
    } else {
        // Mark as shown for this session
        sessionStorage.setItem('inquiryPopupShown', 'true');
    }
});