/*fonction pour ajouter une figure */

function addfigure(works, sectionGallery) {
  let image = document.createElement("img");
  image.src = works.imageUrl;
  image.alt = works.title;

  image.crossOrigin = "anonymous";

  let figure_caption = document.createElement("figcaption");
  figure_caption.appendChild(document.createTextNode(works.title));
  let figure = document.createElement("figure");

  figure.append(image);
  figure.append(figure_caption);
  sectionGallery.append(figure);
}

/*fonction qui appelle l'api et affiche les figures 
dans la gallerie en appelant la fonction addfigure*/

async function displayfigure() {
  await fetch("http://localhost:5678/api/works")
    .then((data) => data.json())
    .then((works) => {
      const sectionGallery = document.querySelector(".gallery");
      works.forEach((works) => {
        addfigure(works, sectionGallery);
        afficheBoutons();
      });
    });
}

displayfigure();

/* fonction qui affiche les filtres */

async function displayFilter() {
  await fetch("http://localhost:5678/api/categories")
    .then((data) => data.json())
    .then((category) => {
      addGallery(category);
      category.forEach((category) => {
        addfilter(category.name);
      });
    });
}

displayFilter();

/* fonction qui ajoute les filtres */

function addfilter(name) {
  const filter = document.querySelector(".filtres");

  let button = document.createElement("button");

  button.classList.add("filters");

  button.type = "button";

  button.append(document.createTextNode(name));
  filter.append(button);

  // quand l'utilisateur est connecté les filtres s'enlevent

  if (sessionStorage.getItem("token")) {
    filter.style.display = "none";
  }

  /* bouttons de filtres*/

  button.addEventListener("click", function () {
    fetch("http://localhost:5678/api/works")
      .then((data) => data.json())
      .then((works) => {
        const WorksFilter = works.filter(function (works) {
          return works.category.name === name;
        });
        const sectionGallery = document.querySelector(".gallery");
        document.querySelector(".gallery").innerHTML = "";
        WorksFilter.forEach((WorksFiltre) => {
          addfigure(WorksFiltre, sectionGallery, works);
         
        });
      });
  });
}

/* Boutton "tous */

var ButtonAll = document.querySelector(".all");

ButtonAll.addEventListener("click", function () {
  document.querySelector(".gallery").innerHTML = "";
  displayfigure();
});

// Afficher mes boutons modifier//

const strInfoToken = window.sessionStorage.getItem("token");
let infoToken = JSON.parse(strInfoToken);

function afficheBoutons() {
  if (strInfoToken === null) {
    document.querySelector(".btn-modif1").style.display = "none";
    document.querySelector(".btn-modif2").style.display = "none";
    document.querySelector(".btn-modif3").style.display = "none";
    document.querySelector(".barre-noir").style.display = "none";
    document.querySelector("a").innerText = "login";
    const login = document.querySelector("a");
    login.addEventListener("click", function () {
      window.location.href = "login.html";
    });
  } else {
    document.querySelector(".filtres").style.display = "none";
    document.querySelector("a").innerText = "logout";
    const logout = document.querySelector("a");
    logout.addEventListener("click", function () {
      window.sessionStorage.removeItem("token");
      window.location.href = "index.html";
    });
  }
}

//Sert à afficher la modal//
function showModal(show = true) {
  const modal1 = document.querySelector(".modal1");
  if (!show) {
    modal1.classList.add("hide");
  } else {
    modal1.classList.remove("hide");
  }
}
//Sert à afficher la deuxième modal//
function showModal2(show = true) {
  const modal2 = document.querySelector(".modal2");
  if (!show) {
    modal2.classList.add("hide");
  } else {
    modal2.classList.remove("hide");
  }
}
// modal de suppression //
document.querySelector(".btn-modif3").addEventListener("click", function () {
  showModal(true);
});
document.querySelector(".modal1").addEventListener("click", function () {
  showModal(false);
});
document
  .querySelector(".modal-content")
  .addEventListener("click", function (e) {
    e.stopPropagation();
  });
document.querySelector(".fermerbt").addEventListener("click", function (e) {
  e.preventDefault();
  showModal(false);
});
// modal d'ajout //
document.querySelector(".bouton-ajout").addEventListener("click", function () {
  showModal2(true);
  showModal(false)
});
document.querySelector(".modal2").addEventListener("click", function () {
  showModal2(false);
  showModal(false);
});
document
  .querySelector(".modal2-content")
  .addEventListener("click", function (e) {
    e.stopPropagation();
  });
document.querySelector(".fermerbt2").addEventListener("click", function (e) {
  e.preventDefault();
  showModal2(false);
  showModal(false);
});
document.querySelector(".retour").addEventListener("click", function (e) {
  e.preventDefault();
  showModal2(false);
  showModal(true);
});

//Charge les projets dans la modal//

function addfiguremodal(works, sectionGallery, figId) {
  let image = document.createElement("img");
  image.src = works.imageUrl;
  image.alt = works.title;

  const trash = document.querySelector(".modal-body");

  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fa-solid");
  deleteIcon.classList.add("fa-trash-can");

  deleteIcon.setAttribute("id", figId);

  trash.append(deleteIcon);

  image.crossOrigin = "anonymous";
  let image_div = document.createElement("div");
  image_div.append(deleteIcon);
  image_div.classList.add("divTrash");

  let figure_caption = document.createElement("figcaption");
  figure_caption.appendChild(document.createTextNode("éditer"));
  let figure = document.createElement("figure");

  figure.append(image);
  figure.append(image_div);
  figure.append(figure_caption);
  sectionGallery.append(figure);

  // Poubelle pour supprimer images

  deleteIcon.addEventListener("click", () => {
    let idItem = deleteIcon.id;
    deleteImage(idItem);
  });
}

function deleteImage(id, e) {
  fetch(`http://localhost:5678/api/works/${id}`, {
    method: "DELETE",
    contentType: "application/json",
    headers: {
      Authorization: "Bearer " + infoToken.token,
    },
  })
    .then((data) => data)
    .then((result) => {
      console.log("suppression effectué");
    });
}

async function displaymodal() {
  await fetch("http://localhost:5678/api/works")
    .then((data) => data.json())
    .then((works) => {
      const sectionGallery = document.querySelector(".modal-body");
      works.forEach((works) => {
        addfiguremodal(works, sectionGallery, works.id);
      });
    });
}

displaymodal();

// Ajout projet //

function addGallery(works) {
  const id = works.id;
  const name = works.name;
  works.forEach(function (category) {
    const listeElement = document.querySelector("select");
    const categorieListe = document.createElement("option");
    categorieListe.innerHTML = category.name;
    categorieListe.value = category.id;

    listeElement.appendChild(categorieListe);
  });
  const ajoutTravaux = document.querySelector(".modal2-content");
  ajoutTravaux.addEventListener("submit", function (event) {
    event.preventDefault();

    const chargeUtile = new FormData();
    chargeUtile.append("image", image.files[0]);
    chargeUtile.append("title", title.value);
    chargeUtile.append("category", category.value);
    console.log("image element :", chargeUtile);

    fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: { Authorization: "Bearer " + infoToken.token },
      body: chargeUtile,
    })
      .then((response) => response.json())
      .then((data) => {
        // Verification des données de l'api //
        console.log("dataAdd :", data);
        if (data.error) {
          throw data.error;
        }
        // Rafraichissement des listes de projets //
        projets.push(data);
        loadInfosGallery(projets);
        loadModalBody(projets);
        // Réinitialisation du formulaire //
        document.querySelector(".modal2-content").reset();
        verifieChampsOk();
        showImageForm(false);
      })
      .catch((error) => {
        console.log("error :", error);
      });
  });
}

function showImageForm(show = true) {
  const form = document.querySelector(".contenueImg");
  const divImage = document.getElementById("imgSelect");
  if (!show) {
    form.classList.remove("hide");
    divImage.classList.add("hide");
  } else {
    form.classList.add("hide");
    divImage.classList.remove("hide");
  }
}

// Verifie que mes champs sont rempli//
function verifieChampsOk(show = true) {
  const inputImage = document.querySelector("[name='imageInput']").files[0];
  const inputTitre = document.querySelector("#title").value;
  const inputCategory = document.querySelector("#category").value;

  if (inputImage !== undefined && inputTitre !== "" && inputCategory !== "") {
    document.querySelector(".bouton-valider").disabled = false;
  } else {
    document.querySelector(".bouton-valider").disabled = true;
  }
  console.log("inputtest", inputImage, inputCategory, inputTitre);
}
// Sert à afficher l'image et changer l'apparence du bouton valider//
function changerBouton() {
  const changeBouton1 = document.getElementById("image");
  changeBouton1.addEventListener("change", function (event) {
    event.preventDefault();
    const image = document.querySelector("[name='imageInput']").files[0];
    const img = document.querySelector(".imageSelectionnee");
    img.src = URL.createObjectURL(image);
    showImageForm(true);
    typeFile();
    verifieImage();
    verifieChampsOk();
  });
  const changeBouton2 = document.getElementById("title");
  changeBouton2.addEventListener("change", function () {
    verifieChampsOk();
  });
  const changeBouton3 = document.getElementById("category");
  changeBouton3.addEventListener("change", function () {
    verifieChampsOk();
  });
  document
    .querySelector(".imageSelectionnee")
    .addEventListener("click", function () {
      document.querySelector("[name='imageInput']").click();
    });
}
changerBouton();

function verifieImage() {
  let fileInput = document.getElementById("image");
  if (fileInput.files.length > 0) {
    const fileSize = fileInput.files.item(0).size;
    const fileMb = fileSize / 1024 ** 2;
    //alert(fileMb);
    if (fileMb > 4) {
      alert("Veuillez selectionner un autre fichier de 4Mo max.");
      fileInput.value = "";
      showImageForm(false);
    }
  }
}

// Sert a verifier le type de fichier//
function typeFile() {
  let nomFichier = document.getElementById("image").value;
  // Sert a trouver l'indice de mon point dans le nom du fichier//
  const indexPoint = nomFichier.lastIndexOf(".") + 1;
  // Retourne les caractere entre l'indice et la fin du nom et la met en minuscule//
  const typeFichier = nomFichier
    .substr(indexPoint, nomFichier.length)
    .toLowerCase();
  //Verifie si mon fichier contient jpg ou png apres le point dans le nom//
  if (typeFichier == "jpg" || typeFichier == "png") {
  } else {
    alert("Seulement les fichier jpg et png sont accepter!");
    showImageForm(false);
    nomFichier = document.getElementById("image");
    nomFichier.value = "";
  }
}
