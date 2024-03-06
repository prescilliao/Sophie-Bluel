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
      Titre.textContent = element.title;
      Projets.appendChild(Projet);
      Projet.appendChild(Image);
      Projet.appendChild(Titre);
    });
  });
