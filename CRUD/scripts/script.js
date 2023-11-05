const URL = "https://65427baaad8044116ed370d0.mockapi.io/users/";

const btnGet1 = document.getElementById("btnGet1");
const inputGet1 = document.getElementById("inputGet1Id");
const container = document.getElementById("results");


btnGet1.addEventListener('click', function() {
    let getURL = URL + inputGet1.value;
    let getOptions = {
        method: "GET", headers: {"Content-type": "application/json; charset=UTF-8"}
    };

    fetch(getURL, getOptions)
    .then(response => response.json())
    .then(data => {
      if (inputGet1.value === "") {
        let listHTML = '';
        data.forEach(item => {
          listHTML += `
            <li>Id: ${item.id}</li>
            <li>Name: ${item.name}</li>
            <li>LastName: ${item.lastname}</li>
            <br>
          `;
        });
        container.innerHTML = listHTML;
      } else {
        container.innerHTML = `
          <li>Id: ${data.id}</li>
          <li>Name: ${data.name}</li>
          <li>LastName: ${data.lastname}</li>
        `;
      }
    })

})

const btnPost = document.getElementById('btnPost');
const inputPostNombre = document.getElementById('inputPostNombre');
const inputPostApellido = document.getElementById('inputPostApellido');


inputPostNombre.addEventListener('input', function() {
    btnPost.disabled = false;

})

btnPost.addEventListener('click', function() {
    postURL = URL
    let postBody = {"name": `${inputPostNombre.value}`, "lastname": `${inputPostApellido.value}`}
    let postOptions = {
        method: "POST",
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify(postBody)
    };

    fetch(URL, postOptions) 
    .then(response => response.json())
    .then(data => {
        data.forEach(element => {
            container.innerHTML = `
            <li>Id: ${item.id}</li>
            <li>Name: ${item.name}</li>
            <li>LastName: ${item.lastname}</li>
            <br>            
            `
        });

    })  
        
})





