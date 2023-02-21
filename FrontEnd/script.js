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

/* fonction qui affiche les filtres */ 

async function displayFilter(){
  await fetch ("http://localhost:5678/api/categories")
  .then((data)=>data.json())
  .then((category)=>{
   
   category.forEach(category=>{
      addfilter(category.name)      
    })
    
    
})}


displayFilter()


/* fonction qui ajoute les filtres */ 


function addfilter(name){

  const filter = document.getElementById("filters_category")
  
  
  
  let button =   document.createElement("button")

  button.classList.add("filters")

  button.type= "button"

  button.append(document.createTextNode(name))

  filter.append(button)
  
  

  
  /* bouttons de filtres*/ 

  
  button.addEventListener("click",function(){
    fetch ("http://localhost:5678/api/works")
    .then((data)=>data.json())
    .then((works)=>{
      const WorksFilter = works.filter(function(works){
        return works.category.name === name
      })
      
      const sectionGallery = document.querySelector(".gallery");

      document.querySelector(".gallery").innerHTML=""
      
      WorksFilter.forEach(WorksFiltre=>{addfigure(WorksFiltre,sectionGallery, works)})
    
    })  
})}


/* Boutton "tous */


const ButtonAll = document.querySelector(".filters")

ButtonAll.append(document.createTextNode("Tous"))

ButtonAll.addEventListener('click',function(){
  
  document.querySelector(".gallery").innerHTML=""

  displayfigure()
 
})


/* page de connexion*/ 

  const log = document.querySelector('.login')

  log.addEventListener('click',function(){
    
    window.location="login.html"
})


const pro = document.querySelector('.projects')

pro.addEventListener('click',function(){
  
  window.location="index.html"

})


  function login(){
    const connect = document.querySelector('connexion')

    connect.addEventListener('click',function(){
      console.log('hello')
    })
  }

  
   
  


 
  

 