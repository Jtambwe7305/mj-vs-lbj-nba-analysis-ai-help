// Global Defaults
Chart.defaults.color = '#a0a0a0';
Chart.defaults.font.family = "'Roboto', sans-serif";

const MJ_COLOR = 'rgba(206, 17, 65, 0.8)'; // Bulls Red
const MJ_BORDER = 'rgba(206, 17, 65, 1)';
const LBJ_COLOR = 'rgba(85, 37, 131, 0.8)'; // Lakers Purple
const LBJ_BORDER = 'rgba(85, 37, 131, 1)';

// 1. Radar Chart: Player Archetype (Data from Summary Table)
const ctxArchetype = document.getElementById('archetypeChart').getContext('2d');
new Chart(ctxArchetype, {
    type: 'radar',
    data: {
        labels: ['Scoring (PTS)', 'Playmaking (AST)', 'Rebounding (REB)', 'Defense (STL)', 'Volume (FGA)'],
        datasets: [{
            label: 'Michael Jordan',
            // Data normalized roughly to a 0-100 scale based on max values in history for visualization
            data: [95, 65, 70, 95, 98], 
            backgroundColor: 'rgba(206, 17, 65, 0.2)',
            borderColor: MJ_BORDER,
            pointBackgroundColor: MJ_BORDER,
            borderWidth: 2
        }, {
            label: 'LeBron James',
            data: [85, 90, 85, 60, 78],
            backgroundColor: 'rgba(85, 37, 131, 0.2)',
            borderColor: LBJ_BORDER,
            pointBackgroundColor: LBJ_BORDER,
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            r: {
                angleLines: { color: '#333' },
                grid: { color: '#333' },
                pointLabels: { color: '#fff', font: { size: 12 } },
                suggestedMin: 0,
                suggestedMax: 100,
                ticks: { display: false }
            }
        },
        plugins: {
            legend: { position: 'bottom' }
        }
    }
});

// 2. Bar Chart: Efficiency (Data from Notebook Output)
const ctxEff = document.getElementById('efficiencyChart').getContext('2d');
new Chart(ctxEff, {
    type: 'bar',
    data: {
        labels: ['Field Goal %', '3-Point %'],
        datasets: [{
            label: 'Michael Jordan',
            data: [49, 28], // From notebook average
            backgroundColor: MJ_COLOR,
            borderColor: MJ_BORDER,
            borderWidth: 1
        }, {
            label: 'LeBron James',
            data: [51, 35], // From notebook average
            backgroundColor: LBJ_COLOR,
            borderColor: LBJ_BORDER,
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                grid: { color: '#333' },
                max: 60
            },
            x: { grid: { display: false } }
        },
        plugins: {
            legend: { position: 'bottom' }
        }
    }
});

// 3. Line Chart: 3-Point Volume Evolution (Data from Notebook Output)
// We simplify the years to "Year 1, Year 2" for direct comparison
const careerLength = 15; // Comparing first 15 years for parity
const years = Array.from({length: careerLength}, (_, i) => `Year ${i + 1}`);

// MJ Data extracted from the 3PT table
const mj3PA = [0.9, 2.1, 1.0, 0.8, 1.6, 4.0, 1.6, 1.7, 3.9, 2.5, 4.4, 5.0, 2.1, 1.3, 0.9];
// LBJ Data extracted from the 3PT table (first 15 years)
const lbj3PA = [3.4, 4.4, 5.4, 4.7, 5.7, 6.1, 6.3, 4.4, 3.1, 4.3, 5.1, 6.6, 5.0, 5.9, 6.5];

const ctxVol = document.getElementById('volumeChart').getContext('2d');
new Chart(ctxVol, {
    type: 'line',
    data: {
        labels: years,
        datasets: [{
            label: 'Jordan (3PA per 100)',
            data: mj3PA,
            borderColor: MJ_BORDER,
            backgroundColor: MJ_COLOR,
            tension: 0.4,
            borderWidth: 3
        }, {
            label: 'LeBron (3PA per 100)',
            data: lbj3PA,
            borderColor: LBJ_BORDER,
            backgroundColor: LBJ_COLOR,
            tension: 0.4,
            borderWidth: 3
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                grid: { color: '#333' },
                title: { display: true, text: 'Attempts Per 100 Possessions' }
            },
            x: { grid: { color: '#333' } }
        },
        plugins: {
            legend: { position: 'top' }
        }
    }
});