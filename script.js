document.addEventListener('DOMContentLoaded', function() {
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Hero Carousel
    const carouselItems = document.querySelectorAll('.carousel-item');
    let currentItem = 0;
    
    function showNextItem() {
        carouselItems[currentItem].classList.remove('active');
        currentItem = (currentItem + 1) % carouselItems.length;
        carouselItems[currentItem].classList.add('active');
    }
    
    // Start carousel
    carouselItems[0].classList.add('active');
    setInterval(showNextItem, 5000);

    // Typing Effect
    const typingText = document.querySelector('.typing-text');
    typingText.style.background = "linear-gradient(90deg, #6a0dad, #1e90ff)";
typingText.style.webkitBackgroundClip = "text";
typingText.style.webkitTextFillColor = "transparent";
    const text = "Açaí do Cerrado";
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            typingText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 150);
        } else {
            setTimeout(() => {
                typingText.textContent = '';
                i = 0;
                typeWriter();
            }, 3000);
        }
    }
    
    typeWriter();

    // Menu Category Tabs
    const categoryBtns = document.querySelectorAll('.category-btn');
    const menuCategories = document.querySelectorAll('.menu-category');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons and categories
            categoryBtns.forEach(b => b.classList.remove('active'));
            menuCategories.forEach(cat => cat.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding category
            const category = this.getAttribute('data-category');
            document.getElementById(category).classList.add('active');
        });
    });

    // Initialize first category as active
    categoryBtns[0].click();

    // Scroll Reveal Animation
    const sections = document.querySelectorAll('section');
    
    function checkScroll() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('animated');
            }
        });
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Run once on page load

    // Modal Functionality
    const modal = document.getElementById('itemModal');
    const closeModalBtn = document.querySelector('.close-modal');
    const menuItems = document.querySelectorAll('.menu-item');
    
    // Sample menu data (in a real app, this would come from a database)
    const menuData = {
        1: {
            title: "Açaí Tradicional",
            description: "Açaí puro batido na hora, acompanhado de banana e granola.",
            price: "R$ 15,00",
            ingredients: [
                "Açaí 100% natural",
                "Banana",
                "Granola caseira"
            ],
            image: "https://placehold.co/500x400"
        },
        2: {
            title: "Açaí Especial",
            description: "Açaí com morango, leite condensado e paçoca triturada.",
            price: "R$ 18,00",
            ingredients: [
                "Açaí 100% natural",
                "Morango fresco",
                "Leite condensado",
                "Paçoca triturada"
            ],
            image: "https://placehold.co/500x400"
        }
    };
    
    // Open modal when clicking a menu item
    document.querySelectorAll('.btn-details').forEach(btn => {
        btn.addEventListener('click', function() {
            const itemId = this.getAttribute('data-item');
            const itemData = menuData[itemId];
            
            if (itemData) {
                document.getElementById('modalTitle').textContent = itemData.title;
                document.getElementById('modalDescription').textContent = itemData.description;
                document.getElementById('modalPrice').textContent = itemData.price;
                
                const ingredientsList = document.getElementById('modalIngredients');
                ingredientsList.innerHTML = '';
                itemData.ingredients.forEach(ingredient => {
                    const li = document.createElement('li');
                    li.textContent = ingredient;
                    ingredientsList.appendChild(li);
                });
                
                document.getElementById('modalImg').src = itemData.image;
                document.getElementById('modalImg').alt = itemData.title;
                
                // Set WhatsApp and iFood links with item info
                const whatsappBtns = document.querySelectorAll('.btn-order.whatsapp');
                whatsappBtns.forEach(btn => {
                    btn.setAttribute('href', `https://wa.me/5511999999999?text=Olá, gostaria de pedir: ${encodeURIComponent(itemData.title)}`);
                });
                
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close modal
    closeModalBtn.addEventListener('click', function() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', { name, email, phone, message });
            
            // Show success message
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            
            // Reset form
            contactForm.reset();
        });
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// WhatsApp Button Animation
function animateWhatsAppButton() {
    const whatsappBtn = document.querySelector('.whatsapp-float .whatsapp-btn');
    let scale = 1;
    let growing = true;
    
    setInterval(() => {
        if (growing) {
            scale += 0.01;
            if (scale >= 1.1) growing = false;
        } else {
            scale -= 0.01;
            if (scale <= 1) growing = true;
        }
        
        whatsappBtn.style.transform = `scale(${scale})`;
    }, 50);
}

// Adiciona funcionalidade aos botões de pedido
document.querySelectorAll('.btn-order.whatsapp').forEach(btn => {
    btn.addEventListener('click', function() {
        const phone = this.getAttribute('data-phone');
        const text = encodeURIComponent(this.getAttribute('data-text'));
        const whatsappUrl = `https://wa.me/${phone}?text=${text}`;
        
        window.open(whatsappUrl, '_blank');
    });
});

// Initialize animations
window.addEventListener('load', function() {
    animateWhatsAppButton();
});
