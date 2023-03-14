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

  // quand l'utilisateur est connecté les filtres s'enlevent 

  if(localStorage.getItem('token')){
    filter.style.display="none"
  }
  
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


var ButtonAll = document.querySelector(".filters")

ButtonAll.append(document.createTextNode("Tous"))

ButtonAll.addEventListener('click',function(){
  
  document.querySelector(".gallery").innerHTML=""

 

  displayfigure()
 
})


/* page de connexion*/ 

  const log = document.querySelector('.login')

  log.addEventListener('click',function(){
    
    location.href="login.html"

    
})


const openModal= document.querySelector(".open-link")
const closeModal = document.querySelector(".close-link")
const modal = document.querySelector(".modal")

openModal.addEventListener('click',()=>{
  modal.showModal();
  
})

closeModal.addEventListener('click',()=>{
  modal.close();
  
})



function addfiguremodal(works, sectionGallery, figId) {
  let image = document.createElement("img");
  image.src = works.imageUrl;
  image.alt = works.title;
 
const iconDiv = document.createElement("div")



  const trash = document.querySelector(".gallery2")
  const deleteIcon = document.createElement("i")




  deleteIcon.classList.add("fa-solid")
  deleteIcon.classList.add("fa-trash-can" )
  deleteIcon.setAttribute("id" , figId)

  iconDiv.append(deleteIcon)
  

  image.crossOrigin = "anonymous";

  let figure_caption = document.createElement("figcaption");
  figure_caption.appendChild(document.createTextNode("éditer"));
  let figure = document.createElement("figure");
  

  figure.append(image);
  figure.append(iconDiv)
  figure.append(figure_caption);
  sectionGallery.append(figure);
  
  
  

  deleteIcon.addEventListener('click',(event)=>{
    
    let idItem = deleteIcon.id
   deleteImage(idItem)
    
  })}



  function deleteImage(id){
    
    fetch (`http://localhost:5678/api/works/${id}`,
    {method: "DELETE",
    contentType:"application/json",
    headers:{
      "Authorization" : "Bearer " + token

    }
  })
    .then(data => data)
    .then((result) => {
      console.log('suppression effectué')
    })}


async function displaymodal() {
  await fetch("http://localhost:5678/api/works")
    .then((data) => data.json())
    .then((works) => {
      const sectionGallery = document.querySelector(".gallery2");
      
      works.forEach(works => {addfiguremodal(works, sectionGallery, works.id);
        
      });
      
     
    });
}

displaymodal()
  
//Logged page modif


const edition =document.querySelectorAll(".edition")

const login = document.getElementById("login")

const token = localStorage.getItem("token")

function afficher(){
for (item of edition)
{item.style.display=null}
login.replaceChildren(document.createTextNode("logout"))

login.addEventListener('click',()=>{
  localStorage.removeItem("token")
  window.location="index.html"
})
}
function cacher(){
  for (item of edition)
  {item.style.display="none"}
}
if (token){
  const pro = document.querySelector(".pro")
  pro.style.marginTop="100px"
  pro.style.marginBottom="70px"
  afficher()

}
else{
  cacher()
}


// Ajout d'images




// Image User 

document.querySelector("#userPic").addEventListener("change",(e)=>{
  const files = e.target.files;
  
    const picReader = new FileReader();
    picReader.addEventListener("load",function(event){
      const picFile = event.target;
      const imageUser = document.getElementById("imgUser")
      imageUser.innerHTML=`<img src="${picFile.result}" title="${picFile.name}"/>`
    })
    picReader.readAsDataURL(files[0])
    
  })
  

async function sendWork(){
  await fetch('http://localhost:5678/api/works',{
  method:"POST",
  contentType:"application/json",
  headers:{
    "Authorization" : "Bearer " + token}})

  .then((data)=>data.json())
  .then((works)=>{
   console.log(works)
  })}

  sendWork()