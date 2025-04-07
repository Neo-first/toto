//--------------------------//
//--------- SCRIPT ---------//
//-- Conceptualisation
// 1er Après remplissage du formulaire et en cliquant sur suivant, le block du formulaire disparait et
// un autre réapparait avec l'affichage des options :
//  Nombre de personnes
//  Le choix de la chambre (2 hôtels)
//  Date depart et arrivee
//  + les différentes options (Repas + Chauffeur + Visite guidée)
//  Après le remplissage des données, une vérification des champs s'effectuent et le formulaire est envoyé dans une deuxième modale
// en cliquant sur le bouton.
// Si certaines conditions ne sont pas remplies, un message d'erreur apparait en spécifiant les champs à modifier.
//---------------------------//
//---  A AJOUTER LOCALSTORAGE POUR GARDER EN CACHE DES DONNEES SAISIES DE L'UTILISATEUR
//-----------------------------------------------------------------------------//
//-- Sources documentation :
// (isNaN) : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/isNaN
//
//-----------------------------------------------------------------------------//
// --- Sélecteurs HTML Block et le bouton ---
let formBlock = document.getElementById("formBlock");
let btnform = document.getElementById("nextForm");
let blockOptions = document.querySelector(".form-JS");
let resultatForm = document.getElementById("result");
//-----------------------------------------------------------------------------//
// --- Sélecteurs HTML Utilisateurs ---
const lastname = document.getElementById("nom");
const firstname = document.getElementById("prenom");
const streetNumber = document.getElementById("numberstreet");
const streetAddress = document.getElementById("street");
const codePostal = document.getElementById("codepostal");
const city = document.getElementById("ville");
const courriel = document.getElementById("email");
const phone = document.getElementById("phone");
//-----------------------------------------------------------------------------//
// --- Variable d'état pour suivre l'action du bouton ---
let OptionVisible = false;
let SendFormulaire = false;
//-----------------------------------------------------------------------------//
// --- 1ère étape : Affichage de la section des options et action du bouton ---
btnform.addEventListener("click", function(event) {

    // Empêche le rechargement de la page
    event.preventDefault();

    if (!OptionVisible && !SendFormulaire) {
        // Afficher la section des options
        let formContentOption = `
            <h2>Vos options</h2>
            <form action="" class="options-hotel">
                <div class="row-form">
                    <label for="nb-user">Combien de personnes seront présentes ?</label>
                    <select name="nbuser" id="nb-user">
                        <option value="">Nombre de personnes:</option>
                        <option value="userone">1</option>
                        <option value="usertwo">2</option>
                    </select>
                </div>
                <div class="row-form">
                    <label for="room">Choisissez votre chambre :</label>
                    <div class="room-choix">
                        <label for="roomigloo">Igloo</label>
                        <input type="radio" name="choix" value="iglooroom">
                        <label for="roomlapone">Lapone</label>
                        <input type="radio" name="choix" value="laponeroom">
                    </div>
                </div>
                <div class="row-form">
                    <div class="departure-choix">
                        <label for="datedeparture">Date de départ :</label>
                        <input type="date" name="date">
                    </div>
                    <div class="arrive-choix">
                        <label for="datearrive">Date d'arrivée :</label>
                        <input type="date" name="date">
                    </div>
                </div>
                <div class="row-form">
                    <label for="chauffeur">Chauffeur</label>
                    <input type="checkbox" name="optionsejour" value="chauffeur">
                </div>
                <div class="row-form">
                    <h3>Choix des repas</h3>
                    <div class="optionrepas">
                        <label for="petitdej">Petit déjeuner</label>
                        <input type="checkbox" name="optionsejour" value="petitdej">
                    </div>
                    <div class="optionrepas">
                        <label for="repasmidi">Repas du midi</label>
                        <input type="checkbox" name="optionsejour" value="midirepas">
                    </div>
                    <div class="optionrepas">
                        <label for="repasoir">Repas du soir</label>
                        <input type="checkbox" name="optionsejour" value="soirrepas">
                    </div>
                    <div class="optionrepas">
                        <label for="repasponctuel">Repas ponctuel</label>
                        <input type="checkbox" name="optionsejour" value="ponctuelrepas">
                    </div>
                </div>
                <div class="row-form">
                    <label for="repasponctuel">Visite guidée du domaine et du parc</label>
                    <input type="checkbox" name="visitedomaineparc" value="domaineparc"> 
                </div>
            </form>
        `;
        //CONTENU HTML
        blockOptions.innerHTML = formContentOption;
        //Affiche le block
        blockOptions.style.display = "block";
        //Enleve le block
        formBlock.style.display = "none";
        //Remplace le texte du bouton
        btnform.textContent = "Envoyer";

        // Permet de passer à la suite du formulaire
        OptionVisible = true;

    } else if (!SendFormulaire) {
        
        //Vide le formulaire
        let contentHTML = "";
        // Vérification des champs et affichage des résultats
        let isValid = true;
        //----------------------------------------------------------------------------------------//
        //-- LANCEMENT DES FUNCTIONS
        contentHTML += VerifIdentity();
        contentHTML += VerifNumberStreet();
        contentHTML += VerifStreet();
        contentHTML += CodePostal();
        contentHTML += VerifVille();
        contentHTML += VerifMail();
        contentHTML += telUser();
        //--------------------------------------------------------------------------------------//
        // Vérification si des erreurs sont présentes
        if (contentHTML.includes("Erreur")) {
            isValid = false;
        }
        // Affichage des résultats
        if (isValid) {
            //Ajout du text après l'envoi du formulaire
            resultatForm.innerHTML = `<p>Formulaire envoyé avec succès !</p>` + contentHTML;
            //Afficher modal resultat
            resultatForm.style.display = "block"; // Afficher les résultats
             //Masquer modal option
            blockOptions.style.display = "none";
        } else {
            //Message erreur
            resultatForm.innerHTML = `<p class="error">Il y a des erreurs dans le formulaire.</p>` + contentHTML;
            // Afficher les résultats des erreurs
            resultatForm.style.display = "block";
        }

        //Permet de ne pas revenir sur la modal précedente
        SendFormulaire = true;
        btnform.textContent = "Envoyer"; 
    }
});
//-----------------------------------------------------------------------------//
//--- Function Verification Nom et Prenom  
function VerifIdentity() {

    //Vide le contenu html
    let contentHTML = "";

    if (firstname.value.length >= 2 && firstname.value.length <= 50) {
        contentHTML += `<p>Votre prénom : ${firstname.value}</p>`;
    } else {
        contentHTML += `<p>Erreur : Le prénom doit contenir entre 2 et 50 caractères.</p>`;
    }
    if (lastname.value.length >= 2 && lastname.value.length <= 50) {
        contentHTML += `<p>Votre nom : ${lastname.value}</p>`;
    } else {
        contentHTML += `<p>Erreur : Le nom doit contenir entre 2 et 50 caractères.</p>`;
    }
    return contentHTML;
}
//-----------------------------------------------------------------------------//
//--- Function Verification Adresse
function VerifNumberStreet() {

    //Vide le contenu html
    let contentHTML = "";

    if (!isNaN(streetNumber.value) && streetNumber.value !== "") {
        contentHTML += `<p>Numéro de rue : ${streetNumber.value}</p>`;
    } else {
        contentHTML += `<p>Erreur : Le numéro de rue doit être un chiffre et ne doit pas être vide.</p>`;
    }
    return contentHTML;
}
//-----------------------------------------------------------------------------//
//--- Function Verification Rue
function VerifStreet() {

    //Vide le contenu html
    let contentHTML = "";

    if (streetAddress.value.length <= 150 && streetAddress.value !== "") {
        contentHTML += `<p>Votre adresse : ${streetAddress.value}</p>`;
    } else {
        contentHTML += `<p>Erreur : Votre adresse ne doit pas être vide et ne doit pas dépasser 150 caractères.</p>`;
    }
    return contentHTML;
}
//-----------------------------------------------------------------------------//
//--- Function Verification Code postal
function CodePostal() {

    //Vide le contenu html
    let contentHTML = "";
    //Permet de tester la valeur
    const value = codePostal.value;
    //Regex 5 chiffres
    const regexPostal = /^[0-9]{5}$/;

    if (regexPostal.test(value)) {
        contentHTML += `<p>Code postal : ${value}</p>`;
    } else {
        contentHTML += `<p>Erreur : Le code postal doit contenir exactement 5 chiffres.</p>`;
    }
    return contentHTML;
}
//-----------------------------------------------------------------------------//
//--- Function Verification Ville
function VerifVille() {

    //Vide le contenu html
    let contentHTML = "";

    if (city.value.length <= 100 && city.value !== "") {
        contentHTML += `<p>Votre ville : ${city.value}</p>`;
    } else {
        contentHTML += `<p>Erreur : Votre ville ne doit pas dépasser 100 caractères et ne doit pas être vide.</p>`;
    }
    return contentHTML;
}
//-----------------------------------------------------------------------------//
//--- Function Verification Adresse mail
function VerifMail() {
    
    //Vide le contenu html
    let contentHTML = "";
    //Permet de tester la valeur
    const value = courriel.value;
    //Regex mail
    const regexMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (regexMail.test(value)) {
        contentHTML += `<p>Adresse email : ${value}</p>`;
    } else {
        contentHTML += `<p>Erreur : Merci de renseigner une adresse email valide.</p>`;
    }
    return contentHTML;
}
//-----------------------------------------------------------------------------//
//--- Function Verification Numero de telephone
function telUser() {

    //Vide le contenu html
    let contentHTML = "";
    //Permet de tester la valeur
    const value = phone.value;
    //REGEX phone 10
    const regexPhone = /^[0-9]{10,14}$/;

    if (regexPhone.test(value)) {
        contentHTML += `<p>Téléphone : ${value}</p>`;
    } else {
        contentHTML += `<p>Erreur : Le numéro de téléphone doit contenir 10 chiffres.</p>`;
    }
    return contentHTML;
}
//-----------------------------------------------------------------------------//