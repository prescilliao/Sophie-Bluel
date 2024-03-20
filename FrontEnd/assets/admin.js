// token = cle api pour faire les appel fetch

// si le token est actif
if (token) {
  // login devient logout
  const logout = document.querySelector(".decoration");
  logout.innerText = "logout";
  // recuperation de tou sles elements qui ont la classe admin
  const elementAdmin = document.querySelectorAll(".admin");

  // popup1
  function openModale(modale) {
    // enleve class hidden
    modale.classList.remove("hidden");
    // recuperation div ou il y a tous les projets ainsi que le bouton ajout photo
    const popup1MiniGallery = document.querySelector(
      ".modale1 .modale-content .miniGallery"
    );
    // enleve ce quil y a dans
    popup1MiniGallery.innerHTML = "";
    // pour tout les elements dans la minigalerie
    works.forEach((work) => {
      // affiche projet + ajout d'une corbeil design dans css
      const figure = document.createElement("figure");
      const icone = document.createElement("i");
      const img = document.createElement("img");
      figure.classList.add("position");
      icone.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
      icone.classList.add("trash_icone");
      img.src = work.imageUrl;
      figure.appendChild(img);
      figure.appendChild(icone);
      popup1MiniGallery.appendChild(figure);
    });
    // tous les projets sont dans la minigallerie
  }

  elementAdmin.forEach((el) => {
    // enleve class hidden
    el.classList.remove("hidden");
    // quand on clique sur un boutton administartion ouvrir popup 1
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const popup = document.querySelector(".modale1");
      openModale(popup);
    });
  });

  // au click sur logout
  logout.addEventListener("click", (e) => {
    // suppression event par defaut
    e.preventDefault();
    // token desactiver et retour sur la page login
    localStorage.removeItem("accessToken");
    window.location.href = "./login.html";
  });

  // recuperation des croix pour fermer popup
  const close = document.querySelectorAll(".close");
  // pour chaque croix
  close.forEach((closeBtn) => {
    // au click
    closeBtn.addEventListener("click", (e) => {
      // enleve event par defaut
      e.preventDefault();
      // recupere modale 1
      const popup1 = document.querySelector(".modale1");
      // ajout class hidden
      popup1.classList.add("hidden");
      // recupere modale 2
      const popup2 = document.querySelector(".modale2");
      // ajout class hidden
      popup2.classList.add("hidden");
    });
  });
  // changement de la div en image
  const Selection = document.getElementById("enteteImage");
  const PhotoSelectionner = document.getElementById("photoAjouter");
  const Appercu = document.createElement("img");
  PhotoSelectionner.addEventListener("click", () => {});
  console.log(Selection);
  console.log(PhotoSelectionner);
  console.log(Appercu);
  //appel a l'api
  function ValideProjet() {
    // methode post
    fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // envoie des données saisie dans le formulaire a lapi
        Image: document.getElementById("addpicture").value,
        title: document.getElementById("titre").value,
        category: document.getElementById("categorie").value,
      }),
    })
      // conversion de la reponse
      .then((response) => {
        return response.json();
      })
      // traitement
      .then((data) => {
        console.log(data);
      });
  }

  // quand on clique sur une corbeille supprimer un element
  ///si api di ok on supprime
  //supprimer element dans la mini galerie et dans la galerie globale
  //sinon erreur

  // recupere bouton ajouter une photo
  const addPictureModale = document.querySelector(".AddPictureModale");
  // au click
  addPictureModale.addEventListener("click", (e) => {
    e.preventDefault();
    // recupere modale 1
    const popup1 = document.querySelector(".modale1");
    // ajout class hidden
    popup1.classList.add("hidden");
    // recupere modale2
    const popup2 = document.querySelector(".modale2");
    // enleve class hidden
    popup2.classList.remove("hidden");
  });

  //quand on clique sur la fleche retour enlever popup2 et afficher popup1
  const returnModale = document.getElementById("ArrowLeft");
  returnModale.addEventListener("click", (e) => {
    e.preventDefault();
    const popup2 = document.querySelector(".modale2");
    popup2.classList.add("hidden");
    const popup1 = document.querySelector(".modale1");
    popup1.classList.remove("hidden");
  });
}
