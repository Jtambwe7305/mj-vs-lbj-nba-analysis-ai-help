const MJ_RED = '#ff3c5f';
const LBJ_GOLD = '#fdb927';

Chart.defaults.color = '#9499ad';
Chart.defaults.font.family = "'Inter', sans-serif";

async function initDashboard() {
    try {
        const response = await fetch('stats_data.json');
        const data = await response.json();

        const mj_averages = data.jordan_averages;
        const lbj_averages = data.lebron_averages;
        const mj_totals = data.jordan_totals;
        const lbj_totals = data.lebron_totals;

        document.getElementById('mj-pts-avg').innerText = mj_averages[0].toFixed(1);
        document.getElementById('mj-ast-avg').innerText = mj_averages[1].toFixed(1);
        document.getElementById('mj-reb-avg').innerText = mj_averages[2].toFixed(1);
        document.getElementById('mj-stl-avg').innerText = mj_averages[3].toFixed(1);
        document.getElementById('mj-blk-avg').innerText = mj_averages[4].toFixed(1);


        document.getElementById('lbj-pts-avg').innerText = lbj_averages[0].toFixed(1);
        document.getElementById('lbj-ast-avg').innerText = lbj_averages[1].toFixed(1);
        document.getElementById('lbj-reb-avg').innerText = lbj_averages[2].toFixed(1);
        document.getElementById('lbj-stl-avg').innerText = lbj_averages[3].toFixed(1);
        document.getElementById('lbj-blk-avg').innerText = lbj_averages[4].toFixed(1);

        new Chart(document.getElementById('Points Total'), {
            type: 'bar',
            data: {
                labels: ['Career Points'],
                datasets: [
                    { label: 'MJ', data: [mj_totals[0]], backgroundColor: MJ_RED },
                    { label: 'LBJ', data: [lbj_totals[0]], backgroundColor: LBJ_GOLD }
                ]
            }
        });

        new Chart(document.getElementById('Assists Total'), {
            type: 'bar',
            data: {
                labels: ['Career Assists'],
                datasets: [
                    { label: 'MJ', data: [mj_totals[1]], backgroundColor: MJ_RED },
                    { label: 'LBJ', data: [lbj_totals[1]], backgroundColor: LBJ_GOLD }
                ]
            }
        });

        new Chart(document.getElementById('Rebounds Total'), {
            type: 'bar',
            data: {
                labels: ['Career Rebounds'],
                datasets: [
                    { label: 'MJ', data: [mj_totals[2]], backgroundColor: MJ_RED },
                    { label: 'LBJ', data: [lbj_totals[2]], backgroundColor: LBJ_GOLD }
                ]
            }
        });

        new Chart(document.getElementById('Steals Total'), {
            type: 'bar',
            data: {
                labels: ['Career Steals'],
                datasets: [
                    { label: 'MJ', data: [mj_totals[3]], backgroundColor: MJ_RED },
                    { label: 'LBJ', data: [lbj_totals[3]], backgroundColor: LBJ_GOLD }
                ]
            }
        });

        new Chart(document.getElementById('Blocks Total'), {
            type: 'bar',
            data: {
                labels: ['Career Blocks'],
                datasets: [
                    { label: 'MJ', data: [mj_totals[4]], backgroundColor: MJ_RED },
                    { label: 'LBJ', data: [lbj_totals[4]], backgroundColor: LBJ_GOLD }
                ]
            }
        });

        new Chart(document.getElementById('Field Goals Made Total'), {
            type: 'bar',
            data: {
                labels: ['Career Made Field Goals'],
                datasets: [
                    { label: 'MJ', data: [mj_totals[5]], backgroundColor: MJ_RED },
                    { label: 'LBJ', data: [lbj_totals[5]], backgroundColor: LBJ_GOLD }
                ]
            }
        });

        if (data.timeline) {
            const years = data.timeline.years;

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