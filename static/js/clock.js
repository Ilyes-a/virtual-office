document.addEventListener('DOMContentLoaded', function() {
    function updateClock() {
        fetch('/clock/time/')
            .then(response => response.json())
            .then(data => {
                document.getElementById('clock-display').textContent = data.time;
            })
            .catch(error => console.error('Erreur récupération heure:', error));
    }

    updateClock();
    setInterval(updateClock, 1000);

    // Chronomètre
    let chronoTime = 0; 
    let chronoInterval;
    const chronoDisplay = document.getElementById('chrono-display');

    function formatChrono(time) {
        let minutes = Math.floor(time / 60000);
        let seconds = Math.floor((time % 60000) / 1000);
        let centièmes = Math.floor((time % 1000) / 10); 
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(centièmes).padStart(2, '0')}`;
    }

    document.getElementById('start-chrono').addEventListener('click', function() {
        if (!chronoInterval) {
            let startTime = Date.now() - chronoTime;
            chronoInterval = setInterval(() => {
                chronoTime = Date.now() - startTime;
                chronoDisplay.textContent = formatChrono(chronoTime);
            }, 10); 
        }
    });

    document.getElementById('stop-chrono').addEventListener('click', function() {
        clearInterval(chronoInterval);
        chronoInterval = null;
    });

    document.getElementById('reset-chrono').addEventListener('click', function() {
        chronoTime = 0;
        chronoDisplay.textContent = "00:00:00";
        clearInterval(chronoInterval);
        chronoInterval = null;
    });

   
    let timerInterval;
    document.getElementById('start-timer').addEventListener('click', function() {
        let durationInMinutes = parseInt(document.getElementById('timer-input').value, 10);
        if (isNaN(durationInMinutes) || durationInMinutes <= 0) return;

        let durationInSeconds = durationInMinutes * 60; 
        let endTime = Date.now() + durationInSeconds * 1000;
        let timerDisplay = document.getElementById('timer-display');

        timerInterval = setInterval(() => {
            let remaining = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
            timerDisplay.textContent = new Date(remaining * 1000).toISOString().substr(14, 5);

            if (remaining <= 0) {
                clearInterval(timerInterval);
                alert("Minuteur terminé !");
            }
        }, 1000);
    });

    // Stop et Reset pour le Minuteur
    document.getElementById('stop-timer').addEventListener('click', function() {
        clearInterval(timerInterval);
        timerInterval = null;
    });

    document.getElementById('reset-timer').addEventListener('click', function() {
        clearInterval(timerInterval);
        timerInterval = null;
        document.getElementById('timer-display').textContent = "00:00";
        document.getElementById('timer-input').value = '';
    });

    // Navigation entre les sections
    function showSection(sectionId) {
        document.querySelectorAll('.section').forEach(section => {
            section.classList.add('hidden');
        });
        document.getElementById(sectionId).classList.remove('hidden');
    }

    document.getElementById('show-clock').addEventListener('click', () => showSection('clock-container'));
    document.getElementById('show-chrono').addEventListener('click', () => showSection('chrono-container'));
    document.getElementById('show-timer').addEventListener('click', () => showSection('timer-container'));

    // Afficher l'horloge par défaut
    showSection('clock-container');
});
