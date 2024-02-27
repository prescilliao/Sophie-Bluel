// div où il faut placer les projets
const ContentGallery = document.querySelector(".gallery");

// fonction qui permet de recupérer les données des projets et les affiches
function Gallery() {
  const works = fetch("http://localhost:5678/api/works")
    .then((works) => works.json())
    .then((datas) => {
      datas.forEach((data) => {
        const Projet = `<figure>
				<img src=${data.imageUrl} alt=${data.title}>
				<figcaption>${data.title}</figcaption>
			  </figure>`;
        ContentGallery.innerHTML += Projet;
        console.log(datas);
      });
    });
}

Gallery();
