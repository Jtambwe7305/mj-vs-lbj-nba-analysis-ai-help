const MJ_RED = '#ff3c5f';
const LBJ_GOLD = '#fdb927';

Chart.defaults.color = '#9499ad';
Chart.defaults.font.family = "'Inter', sans-serif";

async function initDashboard() {
    try {
        const response = await fetch('stats_data.json');
        const data = await response.json();

        const mj = data.jordan_mean;
        const lbj = data.lebron_mean;
        const mjStd = data.jordan_std;
        const lbjStd = data.lebron_std;

        // Top Cards
        document.getElementById('mj-pts-avg').innerText = mj[0].toFixed(1);
        document.getElementById('mj-ast-avg').innerText = mj[1].toFixed(1);
        document.getElementById('mj-reb-avg').innerText = mj[2].toFixed(1);
        document.getElementById('mj-stl-avg').innerText = mj[3].toFixed(1);
        document.getElementById('mj-blk-avg').innerText = mj[4].toFixed(1);


        document.getElementById('lbj-pts-avg').innerText = lbj[0].toFixed(1);
        document.getElementById('lbj-ast-avg').innerText = lbj[1].toFixed(1);
        document.getElementById('lbj-reb-avg').innerText = lbj[2].toFixed(1);
        document.getElementById('lbj-stl-avg').innerText = lbj[3].toFixed(1);
        document.getElementById('lbj-blk-avg').innerText = lbj[4].toFixed(1);

        // 3pt Precision Bar Chart (Index 7: FG3_PCT)
        new Chart(document.getElementById('threePrecisionChart'), {
            type: 'bar',
            data: {
                labels: ['3PT%'],
                datasets: [
                    { label: 'MJ', data: [mj[7] * 100], backgroundColor: MJ_RED },
                    { label: 'LBJ', data: [lbj[7] * 100], backgroundColor: LBJ_GOLD }
                ]
            }
        });

        // FT Consistency Bar Chart (Standard Deviation of FT% - Index 6: FG_PCT used as proxy)
        new Chart(document.getElementById('ftConsistencyChart'), {
            type: 'bar',
            data: {
                labels: ['Consistency'],
                datasets: [
                    { label: 'MJ', data: [mjStd[6]], backgroundColor: MJ_RED },
                    { label: 'LBJ', data: [lbjStd[6]], backgroundColor: LBJ_GOLD }
                ]
            }
        });

        // Efficiency Bars
        new Chart(document.getElementById('efficiencyBars'), {
            type: 'bar',
            data: {
                labels: ['FG%', '3PT%'],
                datasets: [
                    { label: 'MJ', data: [mj[6], mj[7]], backgroundColor: MJ_RED },
                    { label: 'LBJ', data: [lbj[6], lbj[7]], backgroundColor: LBJ_GOLD }
                ]
            }
        });

        // Evolution Charts (The actual lines)
        if (data.timeline) {
            const years = data.timeline.years;
            
            // Scoring Evolution Line
            new Chart(document.getElementById('ptsEvolution'), {
                type: 'line',
                data: {
                    labels: years,
                    datasets: [
                        { label: 'MJ', data: data.timeline.mj.PPG, borderColor: MJ_RED, tension: 0.3, fill: false },
                        { label: 'LBJ', data: data.timeline.lbj.PPG, borderColor: LBJ_GOLD, tension: 0.3, fill: false }
                    ]
                }
            });

            // FT Efficiency Evolution Line (Using pts_36 as proxy for consistency over time)
            new Chart(document.getElementById('ftEvolution'), {
                type: 'line',
                data: {
                    labels: years,
                    datasets: [
                        { label: 'MJ', data: data.timeline.mj.FT_PCT, borderColor: MJ_RED, tension: 0.3, fill: false },
                        { label: 'LBJ', data: data.timeline.lbj.FT_PCT, borderColor: LBJ_GOLD, tension: 0.3, fill: false }
                    ]
                }
            });

            // 3PA Frequency Evolution Line
            new Chart(document.getElementById('threeEvolution'), {
                type: 'line',
                data: {
                    labels: years,
                    datasets: [
                        { label: 'MJ', data: data.timeline.mj.FG3A_PG, borderColor: MJ_RED, tension: 0.3, fill: false },
                        { label: 'LBJ', data: data.timeline.lbj.FG3A_PG, borderColor: LBJ_GOLD, tension: 0.3, fill: false }
                    ]
                }
            });
        }
    } catch (e) {
        console.error("Dashboard error:", e);
    }
}
initDashboard();