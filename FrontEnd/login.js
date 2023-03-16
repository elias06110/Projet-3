const passwordError = document.getElementById("password-error")  
const userError = document.getElementById("user-error")

const pro = document.querySelector('.projects')

pro.addEventListener('click',function(){
    window.location="index.html"

}
)

const connexion = document.getElementById("form")

async function login(user) {

    const myheaders = new Headers ({
		'Content-Type': 'application/json;charset=utf-8',
		'accept': 'application/json'
	});

	const httpOptions = {
		method: "POST",
		headers: myheaders,
		body: JSON.stringify(user)
	};

	const url = "http://localhost:5678/api/users/login";
	const response = await fetch(url,httpOptions);
	return response;
}

connexion.onsubmit= async (e)=>{

    e.preventDefault();


    let form =document.getElementsByTagName('form')
    const formData = new FormData(form[0]);
    const userinfo = {
        "email": formData.get("email"),
        "password":formData.get("password")
    }
    try {
        const response = await login(userinfo)
        let data = ''
        switch (response.status) {
            case 200:  
            data = await response.json()
            localStorage.setItem("token",data["token"])
            window.location.href="index.html"   

                break;
            case 401:  
            console.log("mot de passe incorrect")
                
                    passwordError.appendChild(document.createTextNode("Mot de passe incorrect"))
                return;
                
            case 404:  
               
            
            userError.appendChild(document.createTextNode("Utilisateur inexistant"))     
                return;
            default:
                throw new Error()
        }
        
    } catch (error) {
        console.log(new Error("erreur d'authentification"))
        
        
    }}





/*('submit',function(e){
    e.preventDefault();

    const formData = new FormData(connexion);
    const data = Object.fromEntries(formData)
    

})*/ 

/* email: sophie.bluel@test.tld password: S0phie */ 










   




   
  

    
    
