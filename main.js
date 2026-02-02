document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Dashboard Fake Interactivity
    const stateFilter = document.getElementById('state-filter');
    const yearFilter = document.getElementById('year-filter');
    const kpiValues = document.querySelectorAll('.kpi-value');

    // Fake data map to simulate changes
    const fakeDataMod = {
        'Maharashtra': 1.1,
        'Uttar Pradesh': 0.9,
        'Karnataka': 1.05,
        'All': 1.0
    };

    function updateDashboard() {
        if (!stateFilter) return;
        
        const state = stateFilter.value;
        const modifier = fakeDataMod[state] || 1.0;

        // Animate numbers lightly
        kpiValues.forEach(kpi => {
            const originalValue = parseFloat(kpi.getAttribute('data-value'));
            if (!isNaN(originalValue)) {
                // Formatting based on size
                let newValue = originalValue * modifier;
                if(newValue > 1000) {
                     kpi.innerText = Math.round(newValue).toLocaleString();
                } else {
                     kpi.innerText = newValue.toFixed(1) + '%';
                }
                
                // Add a visual flash effect
                kpi.style.opacity = 0.5;
                setTimeout(() => kpi.style.opacity = 1, 300);
            }
        });

        console.log(`Filter changed: State=${state}, Year=${yearFilter.value}`);
    }

    if (stateFilter) {
        stateFilter.addEventListener('change', updateDashboard);
    }
    if (yearFilter) {
        yearFilter.addEventListener('change', updateDashboard);
    }
});
