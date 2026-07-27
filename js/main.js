function animerCompteur(idElement,cible){
    let element = document.getElementById(idElement);
    if (!element) return;
    let compteur = 0;
    let intervalle = setInterval(function(){
    compteur = compteur + 1;
    element.textContent=compteur;

if (compteur>=cible){
    clearInterval(intervalle);
 }

},20);
}
animerCompteur("statistique1",50);
animerCompteur("statistique2",500);
animerCompteur("statistique3",20)


document.addEventListener("DOMContentLoaded", () => {
    
    const accordionHeaders = document.querySelectorAll(".accordion-header");

    accordionHeaders.forEach(header => {
        header.addEventListener("click", () => {
            const currentItem = header.parentElement;
            const content = header.nextElementSibling;
            
            
            document.querySelectorAll(".accordion-item").forEach(item => {
                if (item !== currentItem) {
                    item.classList.remove("active");
                    item.querySelector(".accordion-content").style.maxHeight = null;
                }
            });

           
            currentItem.classList.toggle("active");
            if (currentItem.classList.contains("active")) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = null;
            }
        });
    });

    const contactForm = document.getElementById("contactForm");
    
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            let isValid = true;
            
           
            const nameInput = document.getElementById("contactName");
            const emailInput = document.getElementById("contactEmail");
            const messageInput = document.getElementById("contactMessage");
            
           
            const nameError = document.getElementById("nameError");
            const emailError = document.getElementById("emailError");
            const messageError = document.getElementById("messageError");
            const formSuccess = document.getElementById("formSuccess");

           
            [nameError, emailError, messageError, formSuccess].forEach(el => el.textContent = "");
            [nameInput, emailInput, messageInput].forEach(input => input.classList.remove("input-error"));

         
            if (nameInput.value.trim().length < 3) {
                nameError.textContent = "Le nom doit contenir au moins 3 caractères.";
                nameInput.classList.add("input-error");
                isValid = false;
            }

            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                emailError.textContent = "Veuillez entrer une adresse email valide.";
                emailInput.classList.add("input-error");
                isValid = false;
            }

            
            if (messageInput.value.trim().length < 10) {
                messageError.textContent = "Votre message doit contenir au moins 10 caractères.";
                messageInput.classList.add("input-error");
                isValid = false;
            }

            
            if (isValid) {
                formSuccess.textContent = "Votre message a été envoyé avec succès ! Notre équipe vous répondra sous peu.";
                formSuccess.style.color = "green";
                contactForm.reset();
                
                
                setTimeout(() => {
                    formSuccess.textContent = "";
                }, 5000);
            }
        });
    }


    const newsletterForme = document.getElementById("newsletterForme");
    if (newsletterForme) {
        newsletterForme.addEventListener("submit", (e) => {
            e.preventDefault();

            const emailInput = document.getElementById("email");
            const message = document.getElementById("newsletterMessage");
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(emailInput.value.trim())) {
                message.textContent = "Veuillez entrer une adresse email valide.";
                message.style.color = " #8b2323";
                return;
            }

            message.textContent = "Merci ! Vous êtes maintenant abonné(e) à la newsletter.";
            message.style.color = "green";
            newsletterForme.reset();

            setTimeout(() => {
                message.textContent = "";
            }, 5000);
        });
    }
});



function affichermenu() {
    if (document.getElementById("menu").style.display == "block") {
        document.getElementById("menu").style.display = "none";
    } else {
        document.getElementById("menu").style.display = "block";
    }
}