const MJ_RED = '#ff3c5f';
const LBJ_GOLD = '#fdb927';

// Chart Global Defaults
Chart.defaults.color = '#9499ad';
Chart.defaults.font.family = "'Inter', sans-serif";

async function initDashboard() {
    try {
        const response = await fetch('stats_data.json');
        const data = await response.json();

        // Mapping Indices: 0:PTS, 1:AST, 2:REB, 3:STL, 4:FGA, 5:3PA, 6:FG%, 7:3PT%
        const mj = data.jordan_mean;
        const lbj = data.lebron_mean;
        const mjStd = data.jordan_std;
        const lbjStd = data.lebron_std;

        // --- 1. Top Cards Update ---
        document.getElementById('mj-pts-avg').innerText = mj[0].toFixed(1);
        document.getElementById('mj-ast-avg').innerText = mj[1].toFixed(1);
        document.getElementById('mj-reb-avg').innerText = mj[2].toFixed(1);
        document.getElementById('mj-stl-avg').innerText = mj[3].toFixed(1);

        document.getElementById('lbj-pts-avg').innerText = lbj[0].toFixed(1);
        document.getElementById('lbj-ast-avg').innerText = lbj[1].toFixed(1);
        document.getElementById('lbj-reb-avg').innerText = lbj[2].toFixed(1);
        document.getElementById('lbj-stl-avg').innerText = lbj[3].toFixed(1);

        // --- 2. IMPACT CHART (New: AST, REB, STL Comparison) ---
        new Chart(document.getElementById('impactChart'), {
            type: 'bar',
            data: {
                labels: ['Assists', 'Rebounds', 'Steals'],
                datasets: [
                    { label: 'Jordan', data: [mj[1], mj[2], mj[3]], backgroundColor: MJ_RED, borderRadius: 6 },
                    { label: 'LeBron', data: [lbj[1], lbj[2], lbj[3]], backgroundColor: LBJ_GOLD, borderRadius: 6 }
                ]
            },
            options: {
                plugins: { legend: { position: 'bottom' } },
                scales: { y: { grid: { color: '#2d2f3d' } } }
            }
        });

        // --- 3. Archetype Radar ---
        new Chart(document.getElementById('archetypeRadar'), {
            type: 'radar',
            data: {
                labels: ['Scoring', 'Playmaking', 'Rebounding', 'Defense', 'Efficiency'],
                datasets: [
                    { label: 'Jordan', data: [mj[0], mj[1]*4, mj[2]*4, mj[3]*12, mj[6]*80], borderColor: MJ_RED, backgroundColor: 'rgba(255, 60, 95, 0.2)', borderWidth: 2 },
                    { label: 'LeBron', data: [lbj[0], lbj[1]*4, lbj[2]*4, lbj[3]*12, lbj[6]*80], borderColor: LBJ_GOLD, backgroundColor: 'rgba(253, 185, 39, 0.2)', borderWidth: 2 }
                ]
            },
            options: {
                elements: { line: { tension: 0.1 } },
                scales: { r: { display: false } },
                plugins: { legend: { display: false } }
            }
        });

        // --- 4. Efficiency Bars (FG% & 3PT%) ---
        new Chart(document.getElementById('efficiencyBars'), {
            type: 'bar',
            data: {
                labels: ['Field Goal %', '3PT %'],
                datasets: [
                    { label: 'MJ', data: [(mj[6]*100).toFixed(1), (mj[7]*100).toFixed(1)], backgroundColor: MJ_RED, borderRadius: 6 },
                    { label: 'LBJ', data: [(lbj[6]*100).toFixed(1), (lbj[7]*100).toFixed(1)], backgroundColor: LBJ_GOLD, borderRadius: 6 }
                ]
            },
            options: { scales: { y: { max: 100 } } }
        });

        // --- 5. Consistency Chart (Std Dev of PTS) ---
        new Chart(document.getElementById('consistencyChart'), {
            type: 'bar',
            data: {
                labels: ['PTS Consistency'],
                datasets: [
                    { label: 'MJ (Variation)', data: [mjStd[0]], backgroundColor: MJ_RED },
                    { label: 'LBJ (Variation)', data: [lbjStd[0]], backgroundColor: LBJ_GOLD }
                ]
            }
        });

        // --- 6. Evolution Charts ---
        if (data.timeline) {
            const years = data.timeline.years;
            
            // PTS Evolution
            new Chart(document.getElementById('ptsEvolution'), {
                type: 'line',
                data: {
                    labels: years,
                    datasets: [
                        { label: 'MJ', data: data.timeline.mj.pts_100, borderColor: MJ_RED, tension: 0.3, pointRadius: 0 },
                        { label: 'LBJ', data: data.timeline.lbj.pts_100, borderColor: LBJ_GOLD, tension: 0.3, pointRadius: 0 }
                    ]
                }
            });

            // 3PA Evolution
            new Chart(document.getElementById('threeEvolution'), {
                type: 'line',
                data: {
                    labels: years,
                    datasets: [
                        { label: 'MJ', data: data.timeline.mj['3pa_100'], borderColor: MJ_RED, tension: 0.3, pointRadius: 0 },
                        { label: 'LBJ', data: data.timeline.lbj['3pa_100'], borderColor: LBJ_GOLD, tension: 0.3, pointRadius: 0 }
                    ]
                }
            });
        }
    } catch (e) {
        console.error("Dashboard Sync Error:", e);
    }
}

initDashboard();