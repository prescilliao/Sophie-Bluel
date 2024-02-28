// div où il faut placer les projets
const ContentGallery = document.querySelector(".gallery");
const BoutonTous = document.getElementById("boutonAll");
const Boutonobjets = document.getElementById("boutonobjets");
const BoutonAppartement = document.getElementById("boutonrappartements");
const Boutonhotel = document.getElementById("boutonhotel");

// fonction qui permet de recupérer les données des projets et les affiches
function All() {
  ContentGallery.innerHTML = "";
  const works = fetch("http://localhost:5678/api/works")
    .then((works) => works.json())
    .then((datas) => {
      datas.forEach((data) => {
        const Projet = `<figure>
				<img src=${data.imageUrl} alt=${data.title}>
				<figcaption>${data.title}</figcaption>
			  </figure>`;
        ContentGallery.innerHTML += Projet;
      });
    });
}
All();

BoutonTous.addEventListener("click", () => {
  All();
});

// fonction qui permet de recupérer
function Objet() {
  // supression du contenu deja present
  ContentGallery.innerHTML = "";
  // appel des données
  fetch("http://localhost:5678/api/works")
    // conversion des données en json
    .then((response) => response.json())
    // traitement des données
    .then((works) => {
      // objetsWorks va filtrer les données en
      // fonction de la category des données = a objets
      const objetsWorks = works.filter((work) => {
        return work.category.name === "Objets";
      });
      // affichage des données avec la category Objets
      objetsWorks.forEach((data) => {
        const Projet = `<figure>
				<img src=${data.imageUrl} alt=${data.title}>
				<figcaption>${data.title}</figcaption>
			  </figure>`;
        ContentGallery.innerHTML += Projet;
      });
    });
}

//  au click joue la fonction Objet
Boutonobjets.addEventListener("click", () => {
  Objet();
});

function appartement() {
  ContentGallery.innerHTML = "";
  fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((works) => {
      const appartementWorks = works.filter((work) => {
        return work.category.name === "Appartements";
      });
      appartementWorks.forEach((data) => {
        const Projet = `<figure>
				<img src=${data.imageUrl} alt=${data.title}>
				<figcaption>${data.title}</figcaption>
			  </figure>`;
        ContentGallery.innerHTML += Projet;
      });
    });
}

BoutonAppartement.addEventListener("click", () => {
  appartement();
});

function hotel() {
  ContentGallery.innerHTML = "";
  fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((works) => {
      const hotelWorks = works.filter((work) => {
        return work.category.name === "Hotels & restaurants";
      });
      hotelWorks.forEach((data) => {
        const Projet = `<figure>
				<img src=${data.imageUrl} alt=${data.title}>
				<figcaption>${data.title}</figcaption>
			  </figure>`;
        ContentGallery.innerHTML += Projet;
      });
    });
}

Boutonhotel.addEventListener("click", () => {
  hotel();
});
