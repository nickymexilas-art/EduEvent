let tousLesEvenements=[]
let listeActuelle=[]
let nombreAffiches =4;

function afficherEvenements(liste){
    document.getElementById("listeEvenements").innerHTML="";
   
   
    if (liste.length === 0) {
        document.getElementById("listeEvenements").innerHTML = "<p>Aucun événement ne correspond à votre recherche.</p>";
        return;
    }
   
    liste.forEach(function(evenement){

        let carteHtml=`
        <article class="article1 ">
        <img src="images/${evenement.image}" alt="${evenement.titre}" width="150" height="auto">
        <div class="bloc2">
        <h3>${evenement.titre}</h3>
        <span class="articleEv">${evenement.categorie}</span>
         <time datetime="${evenement.date}">${evenement.date}</time>
        <p class="articleLieu">${evenement.lieu}</p>
        <a href="detail.html?id=${evenement.id}" class="btn-primary">S'inscrire</a>
        </div>
    </article>
    `;
    document.getElementById("listeEvenements").innerHTML+=carteHtml;
    });
}


fetch("data/evenements.json")
    .then(function(reponse) {
        return reponse.json();
    })
    .then(function(donnees) {
    tousLesEvenements = donnees;
    listeActuelle = tousLesEvenements;
    afficherEvenements(listeActuelle.slice(0, nombreAffiches));
 });


     document.getElementById("search").addEventListener("input", function() {
    let texteTape = document.getElementById("search").value;

    let resultats = tousLesEvenements.filter(function(evenement) {
        return evenement.titre.toLowerCase().includes(texteTape.toLowerCase());
    });

    listeActuelle = resultats;
    nombreAffiches = 4;
    afficherEvenements(listeActuelle.slice(0, nombreAffiches));
});
document.getElementById("filtreCategorie").addEventListener("change", function() {
    let categorieChoisie = document.getElementById("filtreCategorie").value;

    if (categorieChoisie === "tous") {
        listeActuelle = tousLesEvenements;
    } else {
        listeActuelle = tousLesEvenements.filter(function(evenement) {
            return evenement.categorie === categorieChoisie;
        });
    }
    nombreAffiches = 4;
    afficherEvenements(listeActuelle.slice(0, nombreAffiches));
});

document.getElementById("filtreDate").addEventListener("change", function() {
    let choixDate = document.getElementById("filtreDate").value;
    let maintenant = new Date();

    if (choixDate === "toutes") {
        listeActuelle = tousLesEvenements;
        nombreAffiches = 4;
        afficherEvenements(listeActuelle.slice(0, nombreAffiches));
        return;
    }

    listeActuelle = tousLesEvenements.filter(function(evenement) {
        let dateEvenement = new Date(evenement.date);
        let differenceJours = (dateEvenement - maintenant) / (1000 * 60 * 60 * 24);

        if (choixDate === "aujourdhui") {
            return dateEvenement.toDateString() === maintenant.toDateString();
        }
        if (choixDate === "semaine") {
            return differenceJours >= 0 && differenceJours <= 7;
        }
        if (choixDate === "mois") {
            return dateEvenement.getMonth() === maintenant.getMonth() && dateEvenement.getFullYear() === maintenant.getFullYear();
        }
    });

    nombreAffiches = 4;
    afficherEvenements(listeActuelle.slice(0, nombreAffiches));
});

document.getElementById("vueGrille").addEventListener("click", function() {
    document.getElementById("listeEvenements").classList.remove("vue-liste");
    document.getElementById("vueGrille").classList.add("active-changement");
    document.getElementById("vueListe").classList.remove("active-changement");
});

document.getElementById("vueListe").addEventListener("click", function() {
    document.getElementById("listeEvenements").classList.add("vue-liste");
    document.getElementById("vueListe").classList.add("active-changement");
    document.getElementById("vueGrille").classList.remove("active-changement");
});


document.getElementById("chargement").addEventListener("click", function() {
    nombreAffiches += 4;
    afficherEvenements(listeActuelle.slice(0, nombreAffiches));
});


/* pour le menu */
function affichermenu() {
    if (document.getElementById("menu").style.display == "block") {
        document.getElementById("menu").style.display = "none";
    } else {
        document.getElementById("menu").style.display = "block";
    }
}