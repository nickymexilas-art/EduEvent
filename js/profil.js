
function affichermenu() {
    const menu = document.getElementById("menu");
    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}


document.addEventListener('DOMContentLoaded', async () => {

    const authSection = document.getElementById('authentification-section');
    const profileSection = document.getElementById('profile-section');
    
    const toggleLogin = document.getElementById('changement-connexion');
    const toggleRegister = document.getElementById('changement-register');
    const loginForm = document.getElementById('connexion-forme');
    const registerForm = document.getElementById('register-forme');
    
    const regPhotoInput = document.getElementById('reg-photo');
    const previewContainer = document.getElementById('apercu-bloc3');
    const regPreview = document.getElementById('reg-apercu');
    
    const studentPhoto = document.getElementById('student-photo');
    const updatePhotoInput = document.getElementById('update-photo');
    const studentName = document.getElementById('student-name');
    const studentFaculty = document.getElementById('student-faculty');
    const studentProgram = document.getElementById('student-program');
    const studentLevel = document.getElementById('student-level');
    const studentYear = document.getElementById('student-year');
    const btnLogout = document.getElementById('btn-logout');
    const eventsList = document.getElementById('tableau-liste');

    
    let allEvents = []; 
    try {
        const response = await fetch('data/evenements.json');
        if (!response.ok) throw new Error('Erreur HTTP ' + response.status);
        const data = await response.json();
        // Mapper les champs
        allEvents = data.map(evenement => ({
            id: evenement.id,
            title: evenement.titre,
            date: evenement.date,
            location: evenement.lieu,
            image: 'images/' + evenement.image,
            category: evenement.categorie,
            placesTotal: evenement.placesTotal,
            placesRestantes: evenement.placesRestantes,
            description: evenement.description,
            organizer: evenement.organisateur
        }));
        
        const stored = localStorage.getItem('userEvents');
        if (!stored || JSON.parse(stored).length === 0) {
            localStorage.setItem('userEvents', JSON.stringify(allEvents));
        }
    } catch (error) {
        console.error('Erreur de chargement des événements:', error);
        allEvents = [];
        localStorage.setItem('userEvents', JSON.stringify([]));
    }

    // 
    toggleLogin.addEventListener('click', () => {
        toggleLogin.classList.add('active-changement');
        toggleRegister.classList.remove('active-changement');
        loginForm.classList.remove('masque');
        registerForm.classList.add('masque');
    });
    toggleRegister.addEventListener('click', () => {
        toggleRegister.classList.add('active-changement');
        toggleLogin.classList.remove('active-changement');
        registerForm.classList.remove('masque');
        loginForm.classList.add('masque');
    });

    
    regPhotoInput.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                regPreview.src = e.target.result;
                previewContainer.classList.remove('masque');
            };
            reader.readAsDataURL(file);
        }
    });

    
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const password = document.getElementById('reg-password').value;
        if (password.length < 6) {
            showError('reg-password', 'Le mot de passe doit contenir au moins 6 caractères.');
            return;
        }
        const studentData = {
            name: document.getElementById('reg-name').value,
            email: document.getElementById('reg-email').value,
            faculty: document.getElementById('reg-faculty').value,
            program: document.getElementById('reg-program').value,
            level: document.getElementById('reg-level').value,
            year: document.getElementById('reg-year').value,
            photo: regPreview.src || 'https://via.placeholder.com/150'
        };
        localStorage.setItem('registeredStudent', JSON.stringify(studentData));
        localStorage.setItem('activeStudent', JSON.stringify(studentData));

        
        if (allEvents.length > 0) {
            localStorage.setItem('userEvents', JSON.stringify(allEvents));
        } else {
            localStorage.setItem('userEvents', JSON.stringify([]));
        }

        initDashboard(studentData);
    });

    
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const storedStudent = localStorage.getItem('registeredStudent');
        if (storedStudent) {
            const student = JSON.parse(storedStudent);
            if (student.email === email) {
                localStorage.setItem('activeStudent', JSON.stringify(student));
                initDashboard(student);
            } else {
                showError('login-email', 'Identifiants inconnus (Simulé: utilisez l\'email d\'inscription).');
            }
        } else {
            showError('login-email', 'Aucun compte trouvé. Veuillez vous inscrire.');
        }
    });

    
    updatePhotoInput.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                studentPhoto.src = e.target.result;
                const storedStudent = JSON.parse(localStorage.getItem('activeStudent'));
                if (storedStudent) {
                    storedStudent.photo = e.target.result;
                    localStorage.setItem('activeStudent', JSON.stringify(storedStudent));
                    localStorage.setItem('registeredStudent', JSON.stringify(storedStudent));
                }
            };
            reader.readAsDataURL(file);
        }
    });

    
    btnLogout.addEventListener('click', () => {
        localStorage.removeItem('activeStudent');
        authSection.classList.remove('masque');
        profileSection.classList.add('masque');
        registerForm.reset();
        loginForm.reset();
        previewContainer.classList.add('masque');
        regPreview.src = '';
        loginForm.classList.remove('masque');
        registerForm.classList.add('masque');
        toggleLogin.classList.add('active-changement');
        toggleRegister.classList.remove('active-changement');
    });

    
    function initDashboard(student) {
        authSection.classList.add('masque');
        profileSection.classList.remove('masque');
        studentName.textContent = student.name;
        studentFaculty.textContent = student.faculty;
        studentProgram.textContent = student.program;
        studentLevel.textContent = student.level;
        studentYear.textContent = student.year;
        studentPhoto.src = student.photo || 'https://via.placeholder.com/150';
        renderEvents();
    }

    
    function renderEvents() {
        eventsList.innerHTML = '';
        let userEvents = JSON.parse(localStorage.getItem('userEvents')) || [];
        if (userEvents.length === 0) {
            eventsList.innerHTML = `
                <p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 20px;">
                    Vous n'êtes inscrit à aucun événement pour le moment.
                </p>
            `;
            return;
        }
        userEvents.forEach((evenement, index) => {
            const eventCard = document.createElement('div');
            eventCard.className = 'event-card scale-up';
            const dateObj = new Date(evenement.date);
            const formattedDate = dateObj.toLocaleDateString('fr-FR', {
                day: 'numeric', month: 'long', year: 'numeric'
            });
            eventCard.innerHTML = `
                <div class="event-image-wrapper">
                    <img src="${evenement.image}" alt="${evenement.title}" class="event-image">
                </div>
                <div class="event-info">
                    <h3>${evenement.title}</h3>
                    <p class="event-date">📅 ${formattedDate}</p>
                    <p class="event-location">📍 ${evenement.location}</p>
                    <span class="badge-status">Inscrit</span>
                    <button class="btn-danger btn-cancel" data-index="${index}" style="margin-top: 15px; padding: 6px; font-size: 0.85rem;">
                        Annuler l'inscription
                    </button>
                </div>
            `;
            eventsList.appendChild(eventCard);
        });
        eventsList.querySelectorAll('.btn-cancel').forEach(button => {
            button.addEventListener('click', (e) => {
                const indexToRemove = e.target.getAttribute('data-index');
                cancelRegistration(indexToRemove);
            });
        });
    }

    function cancelRegistration(index) {
        let userEvents = JSON.parse(localStorage.getItem('userEvents'));
        userEvents.splice(index, 1);
        localStorage.setItem('userEvents', JSON.stringify(userEvents));
        renderEvents();
    }

    
    function showError(inputId, message) {
        const inputElement = document.getElementById(inputId);
        if (inputElement) {
            const formGroup = inputElement.closest('.forme-groupe');
            const errorSpan = formGroup.querySelector('.error-msg');
            if (errorSpan) {
                errorSpan.textContent = message;
                errorSpan.style.display = 'block';
                inputElement.style.borderColor = 'var(--danger-color)';
                inputElement.addEventListener('input', () => {
                    errorSpan.textContent = '';
                    errorSpan.style.display = 'none';
                    inputElement.style.borderColor = 'var(--border-color)';
                }, { once: true });
            }
        }
    }

    
    const connectedStudent = localStorage.getItem('activeStudent');
    if (connectedStudent) {
        // On s'assure que userEvents existe (si vide, on le remplit)
        const storedEvents = localStorage.getItem('userEvents');
        if (!storedEvents || JSON.parse(storedEvents).length === 0) {
            if (allEvents.length > 0) {
                localStorage.setItem('userEvents', JSON.stringify(allEvents));
            }
        }
        initDashboard(JSON.parse(connectedStudent));
    }
});



