// compte de Sophie
// email: sophie.bluel@test.tld
// password: S0phie

// console.log(document.getElementById("email").value);
// console.log(document.getElementById("password").value);

btnConnect.addEventListener("click", function (e) {
  // desactiver le raffraichissement de la page et le chanmement d'url
  e.preventDefault();
  // methode post
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    }),
  })
    // convertir donnees en donnes json
    .then((response) => {
      if (response.status === 200) {
        return response.json();
        // afficher un message d'erreur si infos saisies fausses
      } else {
        // ajout d'un message d'erreur
        const MessageErreur = document.querySelector(".erreur");
        MessageErreur.textContent = "Email ou Mot de Passe incorrect";
        MessageErreur.classList.add("erreur");
        // lancer nouvelle erreur
        throw new Error("Email ou Mot de Passe incorrect");
      }
    })
    // redirection vers indexedDB.html + stockage du token
    .then((data) => {
      localStorage.setItem("accessToken", data.token);
      window.location.href = "./index.html";
    });
});
