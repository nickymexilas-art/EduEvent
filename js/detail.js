let parametres = new URLSearchParams(window.location.search);
let idEvenement = Number(parametres.get("id"));

fetch("data/evenements.json")
    .then(function(reponse) {
        return reponse.json();
    })
    .then(function(donnees) {
        let evenement = donnees.find(function(e) {
            return e.id === idEvenement;
        });

        if (!evenement) {
            document.getElementById("detailEvenement").innerHTML =
                "<p>Aucun événement sélectionné. <a href='evenements.html'>Retour à la liste des événements</a>.</p>";
            return;
        }

        let detailHtml = `
            <img src="images/${evenement.image}" alt="${evenement.titre}">
            <div class="detail-info">
                <span class="event-tag">${evenement.categorie}</span>
                <h1>${evenement.titre}</h1>
                <time datetime="${evenement.date}">${evenement.date}</time>
                <p>${evenement.lieu}</p>
                <p>${evenement.description}</p>
                <p>Organisé par : ${evenement.organisateur}</p>
                <p class="places-restantes">Places restantes : ${evenement.placesRestantes} / ${evenement.placesTotal}</p>
            </div>
        `;

        document.getElementById("detailEvenement").innerHTML = detailHtml;
    });

document.querySelector(".authentification-formulaire").addEventListener("submit", function(evenementSoumission) {
    evenementSoumission.preventDefault();

    let nom = document.getElementById("nomF").value;
    let prenom = document.getElementById("prenomF").value;
    let email = document.getElementById("emailF").value;
    let telephone = document.getElementById("telephoneF").value;

    if (nom.length < 2) {
        alert("Le nom doit contenir au moins 2 caractères.");
        return;
    }

    if (prenom.length < 2) {
        alert("Le prénom doit contenir au moins 2 caractères.");
        return;
    }

    if (!email.includes("@")) {
        alert("Veuillez entrer une adresse email valide.");
        return;
    }

    if (telephone.length < 8) {
        alert("Veuillez entrer un numéro de téléphone valide.");
        return;
    }

    alert("Inscription réussie pour " + nom + " " + prenom + " !");
});



function affichermenu() {
    if (document.getElementById("menu").style.display == "block") {
        document.getElementById("menu").style.display = "none";
    } else {
        document.getElementById("menu").style.display = "block";
    }
} 