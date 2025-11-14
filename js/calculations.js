/**
 * Auto-calculations for Years of Experience
 * Dynamically calculates YoE from start dates
 */

class ExperienceCalculator {
    constructor() {
        this.careerStart = new Date('2015-09-01');
        this.init();
    }

    init() {
        this.updateOverallExperience();
        this.updateSkillExperience();

        // Update once per day
        setInterval(() => {
            this.updateOverallExperience();
            this.updateSkillExperience();
        }, 24 * 60 * 60 * 1000);
    }

    /**
     * Calculate years between two dates
     * @param {Date} startDate - Start date
     * @param {Date} endDate - End date (defaults to now)
     * @returns {number} Years of experience
     */
    calculateYears(startDate, endDate = new Date()) {
        const years = (endDate - startDate) / (1000 * 60 * 60 * 24 * 365.25);
        return Math.floor(years);
    }

    /**
     * Update overall years of experience
     */
    updateOverallExperience() {
        const years = this.calculateYears(this.careerStart);

        // Update hero section
        const heroElement = document.getElementById('years-experience-hero');
        if (heroElement) {
            heroElement.textContent = years;
        }

        // Update about section
        const aboutElement = document.getElementById('years-experience');
        if (aboutElement) {
            aboutElement.textContent = years;
        }
    }

    /**
     * Update individual skill years
     */
    updateSkillExperience() {
        const techCards = document.querySelectorAll('.tech-card[data-start]');

        techCards.forEach(card => {
            const startDate = new Date(card.dataset.start);
            const endDate = card.dataset.end ? new Date(card.dataset.end) : new Date();
            const years = this.calculateYears(startDate, endDate);

            const yearsElement = card.querySelector('.tech-years');
            if (yearsElement) {
                yearsElement.textContent = `${years} year${years !== 1 ? 's' : ''}`;
            }
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ExperienceCalculator();
});
