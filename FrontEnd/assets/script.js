// recuperation du token stocker
const token = localStorage.getItem("accessToken");
// creation d'un tableau vide qui va prendre plus tard les données donné par l'api
let works = [];
// creation d'un tableau avec une categorie par defaut
let categories = ["Tous"];
// appel a l'api pour recuperer les projets
fetch("http://localhost:5678/api/works")
  // convertion des donnees en donne.json
  .then((response) => {
    return response.json();
  })

  // les donnees recu sont stoker dans le tableau works et
  // pour chaque element = application de la fonction createWorks et createFilterButton
  // ainsi que application du filtre
  .then((data) => {
    works = data;
    works.forEach((element) => {
      if (!categories.includes(element.category.name)) {
        categories.push(element.category.name);
      }
    });
    createWorks(works);
    if (!token) {
      createFilterButton(categories);
    }
  });

// fonction qui permet de structurer chaque element du tableau works
function createWorks(works) {
  const Projets = document.querySelector(".gallery");
  Projets.innerHTML = "";
  works.forEach((element) => {
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
}

// fonction qui permet de creer dynamiquement les boutons qui vont servir pour le filtre
function createFilterButton(categories) {
  const BoutonBox = document.querySelector(".containerbouton");
  categories.forEach((categorie) => {
    const Bouton = document.createElement("button");
    Bouton.innerHTML = categorie;
    Bouton.classList.add("style");
    Bouton.classList.add("filterbutton");
    if (categorie === "Tous") {
      Bouton.classList.add("fullbutton");
    }
    BoutonBox.appendChild(Bouton);
    Bouton.addEventListener("click", () => {
      createWorksFiltered(categorie);
      addFocusColor(Bouton);
    });
  });
}

function addFocusColor(buttonClique) {
  //recuperer tous les element boutton
  const buttons = document.querySelectorAll(".filterbutton");
  //parcourir tous les boutons et retirer la classe fullbutton
  buttons.forEach((button) => {
    // retirer la classe fullbutton de tous les boutons
    button.classList.remove("fullbutton");
  });
  //ajouter la couleur de focus au bouton cliqué
  buttonClique.classList.add("fullbutton");
}

// fonction qui permet de filtrer les elements du tableau works en foncton de leur
// categorie ou les afficher tous par defaut
function createWorksFiltered(categorieName) {
  let filtredWork = works.filter((work) => {
    // si la categorie = tous alors tous les projets afficher
    if (categorieName === "Tous") {
      return true;
    }
    // si non afficher par categorie en focntion du bouton clicker et
    // donc de la cateorie selectionner
    return work.category.name === categorieName;
  });
  // fonction qui permet d'afficher les projets
  createWorks(filtredWork);
}
