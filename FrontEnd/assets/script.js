// recuperer les donnes via l'api
fetch("http://localhost:5678/api/works")
  // convertir donnees en donnes json
  .then((response) => {
    return response.json();
  })
  // retour des donnees
  .then((data) => {
    // pour chaque element du tableau
    data.forEach((element) => {
      // recuperation de la div
      const Projets = document.querySelector(".gallery");
      // creation du code dans js au lieu du html (pour chaque element du tableau data)
      const Projet = document.createElement("figure");
      const Image = document.createElement("img");
      const Titre = document.createElement("figcaption");
      Image.src = element.imageUrl;
      Image.alt = element.title;
      Titre.textContent = element.title;
      Projets.appendChild(Projet);
      Projet.appendChild(Image);
      Projet.appendChild(Titre);
    });
  });

// recuperation de la div ou il y aura les boutons du filtre
const BoutonBox = document.querySelector(".containerbouton");

// creation du bouton Tous
const BoutonTous = document.createElement("button");
BoutonTous.innerHTML = "Tous";
BoutonTous.classList.add("style");
BoutonTous.classList.add("paddingOne");

BoutonTous.addEventListener("click", () => {
  alert("tous");
});

// creation du bouton Objets
const BoutonObjet = document.createElement("button");
BoutonObjet.innerHTML = "Objets";
BoutonObjet.classList.add("style");
BoutonObjet.classList.add("paddingOne");

BoutonObjet.addEventListener("click", () => {
  alert("objet");
});

// cration du bouton Appartement
const BoutonAppartement = document.createElement("button");
BoutonAppartement.innerHTML = "Appartements";
BoutonAppartement.classList.add("style");
BoutonAppartement.classList.add("paddingTwo");

BoutonAppartement.addEventListener("click", () => {
  alert("appart");
});

// creation du bouton Hotel et restaurant
const BoutonHotelRestaurant = document.createElement("button");
BoutonHotelRestaurant.innerHTML = "Hotels & restaurants";
BoutonHotelRestaurant.classList.add("style");
BoutonHotelRestaurant.classList.add("paddingTwo");

BoutonHotelRestaurant.addEventListener("click", () => {
  alert("hotel et restau");
});

// ajout des boutons dans la div
BoutonBox.appendChild(BoutonTous);
BoutonBox.appendChild(BoutonObjet);
BoutonBox.appendChild(BoutonAppartement);
BoutonBox.appendChild(BoutonHotelRestaurant);

// filtrage en fonction des categories/id
