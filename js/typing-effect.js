/**
 * Typing Effect for Hero Section
 * Creates a dynamic typing animation cycling through role titles
 */

class TypingEffect {
    constructor(element, texts, options = {}) {
        this.element = element;
        this.texts = texts;
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;

        // Options with defaults
        this.typeSpeed = options.typeSpeed || 100;
        this.deleteSpeed = options.deleteSpeed || 50;
        this.pauseDuration = options.pauseDuration || 2000;
        this.deletePauseDuration = options.deletePauseDuration || 1000;

        this.init();
    }

    init() {
        if (this.element) {
            this.type();
        }
    }

    type() {
        const currentText = this.texts[this.currentTextIndex];

        if (this.isDeleting) {
            // Deleting characters
            this.element.textContent = currentText.substring(0, this.currentCharIndex - 1);
            this.currentCharIndex--;

            // When deletion is complete
            if (this.currentCharIndex === 0) {
                this.isDeleting = false;
                this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
                setTimeout(() => this.type(), 500);
                return;
            }
        } else {
            // Typing characters
            this.element.textContent = currentText.substring(0, this.currentCharIndex + 1);
            this.currentCharIndex++;

            // When typing is complete
            if (this.currentCharIndex === currentText.length) {
                this.isDeleting = true;
                setTimeout(() => this.type(), this.pauseDuration);
                return;
            }
        }

        // Continue typing/deleting
        const speed = this.isDeleting ? this.deleteSpeed : this.typeSpeed;
        setTimeout(() => this.type(), speed);
    }
}

// Initialize typing effect when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const typingElement = document.getElementById('typing-text');

    const roles = [
        'Backend Developer',
        'Python Specialist',
        'Team Lead',
        'CI/CD Expert'
    ];

    new TypingEffect(typingElement, roles, {
        typeSpeed: 80,
        deleteSpeed: 40,
        pauseDuration: 2000,
        deletePauseDuration: 1000
    });
});
