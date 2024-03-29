// token = cle api pour faire les appel fetch

// si le token est actif
if (token) {
  // appel api
  fetch("http://localhost:5678/api/categories")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // pour chaque données
      data.forEach((category) => {
        // creation element option
        const option = document.createElement("option");
        // valeur de option = id de category
        option.value = category.id;
        option.innerText = category.name;
        // option est enfant de de la balise ou on trouve les catgories
        document.querySelector("#categorie").appendChild(option);
      });
    });

  // login devient logout
  const logout = document.querySelector(".decoration");
  logout.innerText = "logout";
  // recuperation de tou sles elements qui ont la classe admin
  const elementAdmin = document.querySelectorAll(".admin");

  // popup1
  function openModale(modale) {
    // enleve class hidden
    modale.classList.remove("hidden");
    createWorksMiniGalery(works);
  }

  function createWorksMiniGalery(worksMini) {
    const popup1MiniGallery = document.querySelector(
      ".modale1 .modale-content .miniGallery"
    );
    // enleve ce quil y a dans
    popup1MiniGallery.innerHTML = "";
    // tous les projets sont dans la minigallerie
    worksMini.forEach((work) => {
      // affiche projet + ajout d'une corbeil design dans css
      const figure = document.createElement("figure");
      const icone = document.createElement("i");
      const img = document.createElement("img");
      figure.classList.add("position");
      icone.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
      icone.classList.add("trash_icone");
      // au click sur l'icone corbeille
      icone.addEventListener("click", (e) => {
        // supression effet par defaut
        e.preventDefault();
        // appel api + appel id de l'element selectionner
        fetch("http://localhost:5678/api/works/" + work.id, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => {
          // si response a status 204
          if (response.status === 204) {
            // filtrer les projets
            works = works.filter((workItem) => workItem.id !== work.id);
            createWorks(works);
            createWorksMiniGalery(works);
          }
          //sinon afficher erreur
          if (response.status !== 204) {
            alert("Une erreur s'est produite lors de la supression");
          }
          //TODO
        });
      });
      img.src = work.imageUrl;
      figure.appendChild(img);
      figure.appendChild(icone);
      popup1MiniGallery.appendChild(figure);
    });
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
      closeModale();
    });
  });

  // fermeture modale au click en dehors de la modale
  const modaleBackgroud = document.querySelectorAll(".modale");
  modaleBackgroud.forEach((modale) => {
    modale.addEventListener("click", (e) => {
      if (e.target === modale) {
        closeModale();
      }
    });
  });

  function closeModale() {
    // recupere modale 1
    const popup1 = document.querySelector(".modale1");
    // ajout class hidden
    popup1.classList.add("hidden");
    // recupere modale 2
    const popup2 = document.querySelector(".modale2");
    // ajout class hidden
    popup2.classList.add("hidden");
  }

  //au clic ajouter photo
  //selection de sa photo
  //afficher la photo en masquant les indication et le bouton
  var imageValide = false;
  var titleValide = false;

  document.querySelector("#addpicture").addEventListener("change", (e) => {
    e.preventDefault();
    //recupere l'image
    //e.target.files.item(0) === e.target.files[0]
    const imageFile = e.target.files[0];
    //creer un objet url via la fonction URL.createObjectURL
    const imageUrl = URL.createObjectURL(imageFile);

    // creer une balise img
    let img = document.createElement("img");
    // source img
    img.src = imageUrl;
    img.classList.add("heightPicture");
    // placement dynanique de l'img dans div
    document.querySelector("#showPicture").appendChild(img);
    //masque les element
    document.querySelector("#enteteImage").classList.add("hidden");
    document.querySelector("#showPicture").classList.remove("hidden");
    imageValide = true;
    activateButton();
  });

  document.querySelector("#titre").addEventListener("change", (e) => {
    e.preventDefault();
    if (e.target.value === "") {
      // si champ de text est vide alors est faux
      titleValide = false;
      // si non vrai
    } else {
      titleValide = true;
    }
    activateButton();
  });

  //faire devenir le bouton valider vert
  function activateButton() {
    // si image et titre valide alors
    if (imageValide && titleValide) {
      // bouton actif
      document.querySelector("#check").disabled = false;
      document.querySelector("#check").classList.remove("disabled");
    } else {
      // si non bouton desactiver
      document.querySelector("#check").disabled = true;
      document.querySelector("#check").classList.add("disabled");
    }
  }
  //si les champ sont valide activer le bouton au clique sinon ne rien faire

  document.querySelector("#check").addEventListener("click", (e) => {
    e.preventDefault();
    // formData permet de construitre un ensemble de paire cle (les champs du formulaire)
    const formData = new FormData();
    //recupere les valeurs
    formData.append("title", document.querySelector("#titre").value);
    // le numéro 123456 est converti immédiatement en chaîne "123456"
    formData.append("category", document.querySelector("#categorie").value);
    formData.append("image", document.querySelector("#addpicture").files[0]);
    //envoie les valeurs a l'api
    fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => {
        //si l'api repond ok
        if (response.status === 201) {
          return response.json();
        }
        //sinon afficher une erreur
        else {
          alert("erreur");
        }
        //TODO
      })
      .then((data) => {
        //ajouter l'image dans les deux galeries
        works.push(data);
        createWorks(works);
        createWorksMiniGalery(works);
        closeModale();
        //vide le formulaire
        document.querySelector("#formAddPicture").reset();
        document.querySelector("#enteteImage").classList.remove("hidden");
        document.querySelector("#showPicture").classList.add("hidden");
        document.querySelector("#showPicture").innerHTML = "";
      });
  });

  // un fichier image est selectionner
  // un titre est saisie
  // une categorie est selectionner

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
