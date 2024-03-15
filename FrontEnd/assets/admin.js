// token = cle api pour faire les appel fetch
if (token) {
  const logout = document.querySelector(".decoration");
  logout.innerText = "logout";
  const elementAdmin = document.querySelectorAll(".admin");

  //prepare contenu popu1

  function openModale(modale) {
    modale.classList.remove("hidden");
    const popup1MiniGallery = document.querySelector(
      ".modale1 .modale-content .miniGallery"
    );
    popup1MiniGallery.innerHTML = "";
    works.forEach((work) => {
      const figure = document.createElement("figure");
      const img = document.createElement("img");
      img.src = work.imageUrl;
      figure.appendChild(img);
      popup1MiniGallery.appendChild(figure);
    });
  }

  //prepare contenu popu2

  elementAdmin.forEach((el) => {
    el.classList.remove("hidden");
    // quand on clique sur un boutton administartion ouvrir popup 1
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const popup = document.querySelector(".modale1");
      openModale(popup);
    });
  });

  logout.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("accessToken");
    window.location.href = "./login.html";
  });

  // quand on clique sur la croix fermer masquer popup
  const close = document.querySelectorAll(".close");
  close.forEach((closeBtn) => {
    closeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const popup1 = document.querySelector(".modale1");
      popup1.classList.add("hidden");
      const popup2 = document.querySelector(".modale2");
      popup2.classList.add("hidden");
    });
  });

  // quand on clique sur un une corbeille supprimer un element

  //appel a l'api
  ///si api di ok on supprine
  //supprimer elemenr dans la mini galerie et dans la galerie globale
  //sinon erreur

  // quand on clique sur ajouter une photo afficher popup 2
  const addPictureModale = document.querySelector(".AddPictureModale");
  addPictureModale.addEventListener("click", (e) => {
    e.preventDefault();
    const popup1 = document.querySelector(".modale1");
    popup1.classList.add("hidden");
    const popup2 = document.querySelector(".modale2");
    popup2.classList.remove("hidden");
  });
  //quand on clique sur la fleche retour afficher popup1
}
