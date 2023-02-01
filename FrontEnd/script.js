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
      works.forEach(works => {addfigure(works, sectionGallery);
       
      });
    });
}

displayfigure();



/* fonction pour ajouter filtre*/ 


function addfilter(categories,sectionCategories){

  let Button= document.createElement('button')
  
  Button.appendChild(document.createTextNode(categories.name))
  
  sectionCategories.appendChild(Button);
}



async function displayFilter(){
  await fetch ("http://localhost:5678/api/categories")
  .then((data)=>data.json())
  .then((categories)=>{
    const sectionCategories= document.querySelector('.container')
    categories.forEach(categories=>{
      addfilter(categories,sectionCategories)      
    })

  console.log(categories)
    
})}

displayFilter()



