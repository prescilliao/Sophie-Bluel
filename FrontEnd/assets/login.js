btnConnect.addEventListener("click", function (e) {
  e.preventDefault();
  //a toi de gerer la connexion
  //recuperer les valeur des champs
  console.log(document.getElementById("email").value);
  console.log(document.getElementById("password").value);
  //envoyer les valeurs au serveur
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
      }
      alert("Utilisateur ou mdp incorrect");
    })
    .then((data) => {
      console.log(data);
    });
});
