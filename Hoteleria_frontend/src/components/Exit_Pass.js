
import React, { useState } from "react";
import "./Exit_Pass.css";

const Exit_Pass = () => {
  const [formData, setFormData] = useState({
    idOutletPass: 1,
    nameCustomer: "",
    date: "",
    idAssignedRoom: "",
    guestsCount: "",
    keyRoom: false,
    cashierName: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const formatDateToServer = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };
  
  const handleDelete = () => {
    // Pedir al usuario que ingrese el ID del documento que desea eliminar
    const idToDelete = window.prompt("Ingresa el ID del documento que deseas eliminar:");
  
    if (idToDelete) { // Comprueba si el usuario ingresó un valor
      fetch(`http://localhost:8080/outletPass/delete/${idToDelete}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.status === 204) {
            // La solicitud se completó con éxito (sin contenido)
            alert("El documento se ha eliminado con éxito.");
            // Puedes redirigir o actualizar la página si es necesario
          } else {
            // La solicitud no se completó con éxito
            alert("Hubo un error al eliminar el documento.");
          }
        })
        .catch((error) => {
          // Error de red o de la solicitud
          console.error('Error:', error);
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedDate = formatDateToServer(formData.date);

    const dataToSend = {
      ...formData,
      date: formattedDate,
    };

    fetch("http://localhost:8080/outletPass/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response message from the backend:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <div className="row m-3">
        <img src="your_image_url_here" alt="Your Image" className="IMG" />
        <h1 className="Titulo_Exit_Pass">PASE DE SALIDA</h1>
        <a className="nav-link active col-md-1">DESCARGAR</a>
        <a className="nav-link active col-md-2">CORREO</a>
        <button type="submit" className="btn btn-primary col-md-1">
          Guardar
        </button>
      </div>

      <nav className="navbar navbar-formatos navbar-expand-lg justify-content-center mx-auto p-2">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-start"
            id="navbarNav"
          >
            <ul className="navbar-nav fw-bold">
              <li className="nav-item">
                <a className="nav-link active text-white">Check Out</a>
              </li>
            </ul>
          </div>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav fw-bold">
              <li className="nav-item">
                <a className="nav-link active text-white" href="#">
                  View Other Formats
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <hr className="border border-dark" />

      <section className="Seccion-Pass col-md-7 offset-md-3 d-flex align-items-center justify-content-center">
        <div className="container-Exit-pass m-3">
          <form className="row g-3" onSubmit={handleSubmit}>
            <div className="card col-md-6 offset-md-3 d-flex align-items-center justify-content-center border border-dark">
              <div className="card-body">
                <h4 className="card-title">Pase de salida</h4>
              </div>
            </div>
            <div className="col-md-12">
              <label htmlFor="nameCustomer" className="form-label-Nombre">
                Nombre de el cliente
              </label>
              <input
                type="text"
                className="form-control form-control-nombre border-top-0 border-end-0 border-start-0 border-dark"
                id="nameCustomer"
                name="nameCustomer"
                value={formData.nameCustomer}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4 border border-dark">
              <label htmlFor="date" className="form-label">
                Fecha:
              </label>
              <input
                type="date"
                className="form-control form-control-nombre border-0"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4 border border-dark">
              <label htmlFor="idAssignedRoom" className="form-label">
                Numero de habitacion
              </label>
              <input
                type="number"
                className="form-control form-control-nombre border-0"
                id="idAssignedRoom"
                name="idAssignedRoom"
                value={formData.idAssignedRoom}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4 border border-dark">
              <label htmlFor="guestsCount" className="form-label">
                Numero de huespedes
              </label>
              <input
                type="number"
                className="form-control form-control-nombre border-0"
                id="guestsCount"
                name="guestsCount"
                value={formData.guestsCount}
                onChange={handleChange}
              />
            </div>
            <label className="form-label">¿Dejo su llave?</label>
            <select
              className="form-select-Key form-select-md mg-3 form-control border border-dark"
              aria-label=".form-select-lg example"
              name="keyRoom"
              value={formData.keyRoom}
              onChange={handleChange}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            <div className="col-md-6">
              <label htmlFor="cashierName" className="form-label">
                Nombre de el cajero
              </label>
              <input
                type="text"
                className="form-control form-control-nombre border-top-0 border-end-0 border-start-0 border-dark"
                id="cashierName"
                name="cashierName"
                value={formData.cashierName}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputPassword4" className="form-label">
                Sello de cajero
              </label>
              <input
                type="text"
                className="form-control form-control-nombre border-top-0 border-end-0 border-start-0 border-dark"
                id="inputPassword4"
              />
            </div>
            <button type="submit" className="btn btn-primary btn-hotel">
              <i className="bi bi-check-circle"></i> Guardar
            </button>
            <button
              type="button"
              className="btn btn-warning btn-delete"
              onClick={() => handleDelete(formData.idOutletPass)}
            >
              <i className="bi bi-trash"></i> Borrar
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Exit_Pass;
=======
import React from "react";
import "./Exit_Pass.css";

const Exit_Pass = () => {
    return(
      <>
      <div className="row m-3">
        <img className="IMG"></img>
        <h1 className="Titulo_Exit_Pass">Pase de Salida</h1>
          <a class="nav-link active col-md-1">Descargar</a>
          <a class="nav-link active col-md-2">Correo Electronico</a>
          <a class="nav-link active col-md-1">Guardar</a>
      </div>



      <nav class="navbar navbar-formatos navbar-expand-lg justify-content-center mx-auto p-2">
        <div class="container-fluid ">
        
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-start" id="navbarNav">
            <ul class="navbar-nav fw-bold">
              <li class="nav-item">
                <a class="nav-link active text-white">Check Out</a>
              </li>
            </ul>
          </div>
          <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul class="navbar-nav fw-bold">
              <li class="nav-item">
              <a class="nav-link active text-white" href="#">Ver Otros Formatos</a>
              </li>
            </ul>
          </div>

        </div>
      </nav>
      <hr className=" border-dark" ></hr>
      
      <section className="Seccion-Pass col-md-7 offset-md-3 d-flex align-items-center justify-content-center">

          <div className="container-Exit-pass m-3">

            <form class="row g-3">

              <div class="card col-md-6 offset-md-3 d-flex align-items-center justify-content-center border-dark">
                <div class="card-body">
                  <h4 class="card-title ">PASE DE SALIDA</h4>
                </div>
              </div>

              <div class="col-md-12">
                <label for="input" class="form-label-Nombre">NOMBRE DE HÚESPED</label>
                <input type="text" class="form-control form-control-nombre border-top-0 border-end-0 border-start-0 border-dark" id="input"></input>
              </div>
              <div class="col-md-4 border-end border-start border-bottom border-dark">
                <label for="input" class="form-label">FECHA:</label>
                <input type="date" class="form-control form-control-nombre border-0 " id="input"></input>
              </div>
              <div class="col-md-4 border-end border-bottom border-dark">
                <label for="input" class="form-label">NÚMERO DE HABITACIÓN</label>
                <input type="number" class="form-control form-control-nombre border-0 " id="input"></input>
              </div>
              <div class="col-md-4 border-end border-bottom border-dark">
                <label for="input" class="form-label">NÚMERO DE PERSONAS</label>
                <input type="number" class="form-control form-control-nombre border-0 " id="input"></input>
              </div>
              <label for="input" class="form-label">¿Dejó su llave?</label>
              <select class="form-select-Key form-select-md mg-3 form-control border-dark" aria-label=".form-select-lg example">
                <option selected="1">Si</option>
                <option value="2">No</option>
              </select>
              <div class="col-md-6">
                <label for="input" class="form-label">FIRMA DEL CAJERO</label>
                <input type="text" class="form-control form-control-nombre border-top-0 border-end-0 border-start-0 border-dark" id="input"></input>
              </div>
              <div class="col-md-6">
                <label for="input" class="form-label">SELLO DE CAJAS</label>
                <input type="text" class="form-control form-control-nombre border-top-0 border-end-0 border-start-0 border-dark" id="inputPassword4"></input>
              </div>
            </form>
          </div>
        </section></>
    
    )
}

export default Exit_Pass;
//<Route path="/exitPass" element={<Exit_Pass/>}/>
//import Exit_Pass from "./components/Exit_Pass";