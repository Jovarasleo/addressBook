const buttonAdd = document.querySelector("#app .addButton");
const addressPhone = document.querySelector("#app .addressPhone");
const addressName = document.querySelector("#app .addressName");
const output = document.querySelector("#app .output");
const searchOutput = document.querySelector("#app .search");
const search = document.querySelector("#app input[name='addressSearch']");
let addressArray = [];
//loading contacts from localStorage

function draw(addressArray) {
  output.innerHTML = null;
  addressArray.forEach((address, index) => {
    const createSpanName = document.createElement("span");
    const createSpanNumber = document.createElement("span");
    const createDiv = document.createElement("div");
    createDiv.classList.add("contact_container");
    const createInnerDiv = document.createElement("div");
    createInnerDiv.classList.add("container--modify");
    const createInputName = document.createElement("input");
    createInputName.placeholder = "Vardas";
    const createInputNumber = document.createElement("input");
    createInputNumber.placeholder = "Numeris";
    const createDelButton = document.createElement("button");
    const createSaveButton = document.createElement("button");
    const createFavButton = document.createElement("span");
    const createModContactBtn = document.createElement("span");
    createFavButton.innerHTML = '<i class="far fa-star"></i>';
    createModContactBtn.innerHTML = '<i class="fas fa-ellipsis-v"></i>';
    createModContactBtn.classList.add("modifyButton");
    createDelButton.append("Remove");
    createSaveButton.append("Save");
    createSpanName.append(address.name);
    createSpanNumber.append(address.phone);
    createInnerDiv.append(
      createSpanNumber,
      createInputName,
      createInputNumber,
      createDelButton,
      createSaveButton
    );
    createDiv.append(
      createSpanName,
      createFavButton,
      createModContactBtn,
      createInnerDiv
    );
    output.appendChild(createDiv);
    createInnerDiv.style.display = "none";
    createModContactBtn.addEventListener("click", () => {
      if (createInnerDiv.style.display == "none") {
        createInnerDiv.style.display = "block";
      } else {
        createInnerDiv.style.display = "none";
      }
    });
    if (address.fav) {
      createFavButton.classList.add("favourite");
      createFavButton.innerHTML = '<i class="fas fa-star"></i>';
    }
    createDelButton.addEventListener("click", () => {
      addressArray.splice(index, 1);
      localStorage.setItem("users", JSON.stringify(addressArray));
      draw(addressArray);
    });
    createSaveButton.addEventListener("click", () => {
      editName = createInputName.value;
      if (editName != null && editName != "") {
        address.name = editName;
        draw(addressArray);
      }
      editNumber = createInputNumber.value;
      if (editNumber != null && editNumber != "") {
        address.phone = editNumber;
        draw(addressArray);
      }
    });
    createFavButton.addEventListener("click", () => {
      createDiv.classList.add("favourite");
      if (!address.fav) {
        address.fav = true;
      } else address.fav = false;
      draw(addressArray);
    });
    localStorage.setItem("users", JSON.stringify(addressArray));
  });
}
window.addEventListener("load", () => {
  if (localStorage.getItem("users")) {
    console.log("hello");
    addressArray = JSON.parse(localStorage.getItem("users"));
    console.log(addressArray);
    draw(addressArray);
  }
});
//adding new contact
buttonAdd.addEventListener("click", () => {
  let Addname = addressName.value;
  let Addphone = addressPhone.value;
  console.log(Addphone, Addname);
  if (Addname != "" && Addphone != "") {
    addressArray.push({ name: Addname, phone: Addphone });
    draw(addressArray);
  }
});
//searching for contact from array
search.addEventListener("input", (event) => {
  console.log(event.target.value);
  let match = event.target.value.toLowerCase();
  let filteredArray = addressArray.filter((address) => {
    let nameLower = address.name.toLowerCase();
    if (address.phone.includes(match) || nameLower.includes(match)) {
      return address;
    }
  });
  draw(filteredArray);
});
