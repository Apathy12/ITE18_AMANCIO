const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');

const currentTheme = localStorage.getItem('theme') || 'light';
body.classList.toggle('dark-theme', currentTheme === 'dark');
updateThemeIcon();

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    const isDark = body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon();
});

function updateThemeIcon() {
    const isDark = body.classList.contains('dark-theme');
    themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
}

function toggleEdit(elementId) {
    const element = document.getElementById(elementId);
    const editBtn = element.parentElement.querySelector('.edit-btn');
    const isEditing = element.contentEditable === 'true';

    if (isEditing) {
        element.contentEditable = 'false';
        element.classList.remove('editing');
        editBtn.innerHTML = '<i class="fas fa-edit"></i> Edit';
        editBtn.classList.remove('save-mode');
        
        localStorage.setItem(elementId, element.innerHTML);
    } else {
        element.contentEditable = 'true';
        element.classList.add('editing');
        editBtn.innerHTML = '<i class="fas fa-save"></i> Save';
        editBtn.classList.add('save-mode');
        element.focus();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const editableElements = document.querySelectorAll('.editable-content');
    editableElements.forEach(element => {
        const savedContent = localStorage.getItem(element.id);
        if (savedContent) {
            element.innerHTML = savedContent;
        }
    });
});

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-bar');
            skillBars.forEach(bar => {
                const level = bar.getAttribute('data-level');
                bar.style.width = level + '%';
            });
        }
    });
}, observerOptions);

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    observer.observe(skillsSection);
}


