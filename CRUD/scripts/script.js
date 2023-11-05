const URL = "https://65427baaad8044116ed370d0.mockapi.io/users/";

const container = document.getElementById("results");


// Fetch
async function fetchData() {
  try {
      const response = await fetch(URL);
      const data = await response.json();
      return data;
  } catch (error) {
      throw error;
  }
}

// Función para agregar datos al contenedor
function addToContainer(data) {
  container.innerHTML = '';
  data.forEach(item => {
      container.innerHTML += `
          <li>ID: ${item.id}</li>
          <li>NAME: ${item.name}</li>
          <li>LASTNAME: ${item.lastname}</li>
          <br>
      `;
  });
}



//GET
const btnGet1 = document.getElementById("btnGet1");
const inputGet1 = document.getElementById("inputGet1Id");

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
          <li>ID: ${item.id}</li>
          <li>NAME: ${item.name}</li>
          <li>LASTNAME: ${item.lastname}</li>
          <br>
        `;
      });
      container.innerHTML = listHTML;
    } else {
      container.innerHTML = `
        <li>ID: ${data.id}</li>
        <li>NAME: ${data.name}</li>
        <li>LASTNAME: ${data.lastname}</li>
      `;
    }
  })

})



//POST
const btnPost = document.getElementById('btnPost');
const inputPostNombre = document.getElementById('inputPostNombre');
const inputPostApellido = document.getElementById('inputPostApellido');

async function postRequest(data) {
  const postURL = URL;
  const postOptions = {
      method: "POST",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify(data),
  };

  try {
      const response = await fetch(postURL, postOptions);
      const postData = await response.json();
      return postData;
  } catch (error) {
      throw error;
  }
}

  //Habilitar btn
inputPostNombre.addEventListener('input', function() {
    btnPost.disabled = false;

})

  //Evento btn Agregar
btnPost.addEventListener('click', async function() {
  const postData = {
      "name": inputPostNombre.value,
      "lastname": inputPostApellido.value,
  };

  try {
      const data = await postRequest(postData);
      console.log(data);

      // Después de completar la operación POST, se obtienen los datos actualizados
      const updatedPostData = await fetchData()
      // Actualiza la interfaz con los datos actualizados
      addToContainer(updatedPostData);

  } catch (error) {
      console.error('Error:', error);
  }
});



//PUT
const inputPutId = document.getElementById('inputPutId');
const btnPut = document.getElementById('btnPut');

  //Habilitar btn
inputPutId.addEventListener('input', function() {
  btnPut.disabled = false;
})

async function putRequest(data, id) {
  const putURL = URL + id;
  const putOptions = {
      method: "PUT",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify(data),
  };

  try {
      const response = await fetch(putURL, putOptions);
      const putData = await response.json();
      return putData;
  } catch (error) {
      throw error;
  }
}

  //Evento btn Modificar
btnPut.addEventListener('click', function() {
  const nameModifyInput = document.getElementById('nameModifyInput');
  const lastnameModifyInput = document.getElementById('lastnameModifyInput');
  const saveBtn = document.getElementById('saveBtn');
  
  saveBtn.addEventListener('click', async function() {
    const putData = {
      "name": nameModifyInput.value,
      "lastname": lastnameModifyInput.value,
  };

  try {
      const data = await putRequest(putData, inputPutId.value);
      console.log(data);

      // Después de completar la operación PUT, se obtienen los datos actualizados
      const updatedPutData = await fetchData()
      // Actualiza la interfaz con los datos actualizados
      addToContainer(updatedPutData);

  } catch (error) {
      console.error('Error:', error);
  }
  })
})



//DELETE
const btnDelete = document.getElementById('btnDelete');
const inputDelete = document.getElementById('inputDelete');

  //Habilitar btn
inputDelete.addEventListener('input', function() {
  btnDelete.disabled = false;
});

  //Evento btn borrar
btnDelete.addEventListener('click', async function() {
  const deleteURL = URL + inputDelete.value;
  const deleteOptions = {
      method: "DELETE",
      headers: { "Content-type": "application/json; charset=UTF-8" },
  };

  try {
      const deletedData = await fetch(deleteURL, deleteOptions);
      console.log(deletedData);

      // Después de eliminar, se obtienen los datos actualizados
      const updatedDeleteData = await fetchData();
      // Actualiza la interfaz con los datos actualizados
      addToContainer(updatedDeleteData);

  } catch (error) {
      console.error('Error:', error);
  }
});
