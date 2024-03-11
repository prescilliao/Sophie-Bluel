// creation d'un tableau qui va etre utile par la suite
let works = [];
// creation d'un tableau avec une categorie par defaut
let categories = ["Tous"];
// appel a l'api
fetch("http://localhost:5678/api/works")
  // convertion des donnees en donne.json
  .then((response) => {
    return response.json();
  })

  // les donnees recu sont stoker dans le tableau works et
  // pour chaque element application de la fonction createWorks et createFilterButton
  // ainsi que application du filtre
  .then((data) => {
    works = data;
    works.forEach((element) => {
      if (!categories.includes(element.category.name)) {
        categories.push(element.category.name);
      }
    });
    createWorks(works);
    createFilterButton(categories);
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
    BoutonBox.appendChild(Bouton);
    Bouton.addEventListener("click", () => {
      Bouton.classList.add("fullbutton");
      createWorksFiltered(categorie);
    });
  });
}

// fonction qui permet de filtrer les elements du tableau works en foncton de leur
// categorie ou les afficher tous par defaut
function createWorksFiltered(categorieName) {
  let filtredWork = works.filter((work) => {
    if (categorieName === "Tous") {
      return true;
    }
    return work.category.name === categorieName;
  });
  createWorks(filtredWork);
}

// compte de Sophie
// email: sophie.bluel@test.tld
// password: S0phie
