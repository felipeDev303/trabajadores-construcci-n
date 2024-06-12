document.addEventListener("DOMContentLoaded", () => {
  const registerBtn = document.getElementById("registerBtn");
  const confirmBtn = document.getElementById("confirmBtn");
  const userGrid = document.getElementById("userGrid");
  let users = [];

  registerBtn.addEventListener("click", () => {
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const fechaNacimiento = document.getElementById("fechaNacimiento").value;
    const email = document.getElementById("email").value.trim();
    const cargo = document.getElementById("cargo").value;
    const fechaIngreso = document.getElementById("fechaIngreso").value;

    if (
      !nombre ||
      !apellido ||
      !fechaNacimiento ||
      !email ||
      !cargo ||
      !fechaIngreso
    ) {
      alert("Todos los campos son obligatorios");
      return;
    }

    if (!validateEmail(email)) {
      alert("Correo electrónico no válido");
      return;
    }

    if (users.some((user) => user.email === email)) {
      alert("El correo electrónico ya está registrado");
      return;
    }

    const ageDifference =
      new Date(fechaIngreso).getFullYear() -
      new Date(fechaNacimiento).getFullYear();
    if (ageDifference < 18) {
      alert(
        "La fecha de ingreso no puede ser menor a la fecha de nacimiento más 18 años"
      );
      return;
    }

    const modalContent = `
            Nombre: ${nombre} ${apellido}<br>
            Fecha de Nacimiento: ${fechaNacimiento}<br>
            Correo Electrónico: ${email}<br>
            Cargo: ${cargo}<br>
            Fecha de Ingreso: ${fechaIngreso}
        `;
    document.getElementById("modalContent").innerHTML = modalContent;
    $("#confirmationModal").modal("show");
  });

  confirmBtn.addEventListener("click", () => {
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const fechaNacimiento = document.getElementById("fechaNacimiento").value;
    const email = document.getElementById("email").value.trim();
    const cargo = document.getElementById("cargo").value;
    const fechaIngreso = document.getElementById("fechaIngreso").value;

    const user = {
      nombre,
      apellido,
      fechaNacimiento,
      email,
      cargo,
      fechaIngreso,
    };
    users.push(user);
    addUserToGrid(user);
    $("#confirmationModal").modal("hide");
    document.getElementById("registrationForm").reset();
  });

  function addUserToGrid(user) {
    const col = document.createElement("div");
    col.className = "col-lg-3 col-md-4 col-sm-6";
    col.innerHTML = `
            <div class="panel panel-default">
                <div class="panel-heading">${user.nombre} ${user.apellido}</div>
                <div class="panel-body">
                    <p>${user.email}</p>
                    <p>${user.cargo}</p>
                    <p>${user.fechaIngreso}</p>
                    <button class="btn btn-danger btn-sm" onclick="removeUser('${user.email}')">Eliminar</button>
                </div>
            </div>
        `;
    userGrid.appendChild(col);
  }

  window.removeUser = function (email) {
    users = users.filter((user) => user.email !== email);
    const cols = Array.from(userGrid.getElementsByClassName("col-lg-3"));
    cols.forEach((col) => {
      if (col.querySelector("p").textContent === email) {
        userGrid.removeChild(col);
      }
    });
  };

  function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
  }
});
