const buttonAdd = document.querySelector("#app .addButton");
const addressPhone = document.querySelector("#app .addressPhone");
const addressName = document.querySelector("#app .addressName");
const addressLastName = document.querySelector("#app .addressLastName");
const addressEmail = document.querySelector("#app .addressEmail");
const output = document.querySelector("#app .output");
const searchOutput = document.querySelector("#app .search");
const search = document.querySelector("#app input[name='addressSearch']");
const deleteCheckedBtn = document.querySelector("#app .delButton");
const newAddressBtn = document.querySelector("#app .newContact")
const formDiv = document.querySelector("#app .newContact__form")
let addressArray = [];
//loading contacts from localStorage
function show(element){ 
  if (element.style.display == "none") {
    element.style.display = "grid";
} else {
  element.style.display = "none";
}}
search.addEventListener("input", () => {
  draw();
})
function draw() {
  output.innerHTML = null;
  addressArray.filter((address)=>{
      {if (address.name.includes(search.value, 0))
        {return address}}}).forEach((address, index) => {
    const createSpanName = document.createElement("span");
    const createSpanLastName = document.createElement("span");
    const createSpanNumber = document.createElement("span");
    const createSpanEmail = document.createElement("span");
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
    const createAllignmentDiv = document.createElement("div")
    const createNameDiv = document.createElement("div")
    const createCheckBox = document.createElement("input")
    createCheckBox.setAttribute("type", "checkbox"); 
    createCheckBox.setAttribute("value", false); 
    createCheckBox.classList.add("checkbox")
    createFavButton.innerHTML = '<i class="far fa-star"></i>';
    createModContactBtn.innerHTML = '<i class="fas fa-ellipsis-v"></i>';
    createModContactBtn.classList.add("modifyButton");
    createDelButton.append("Remove");
    createSaveButton.append("Save");
    createAllignmentDiv.classList.add("container--options")
    createAllignmentDiv.append(
      createFavButton,
      createModContactBtn,createCheckBox,
    )
    createNameDiv.append(      createSpanName,
      createSpanLastName,)
    createSpanName.append(`${address.name} `);
    createSpanLastName.append(address.lastName);
    createSpanNumber.append(address.phone);
    createSpanEmail.append(address.email);
    createInnerDiv.append(
      createSpanNumber,
      createSpanEmail,
      createInputName,
      createInputNumber,
      createDelButton,
      createSaveButton
    );
    createDiv.append(
      createNameDiv,
      createAllignmentDiv,
      createInnerDiv
    );
    output.appendChild(createDiv);
    // hiding 
    createInnerDiv.style.display = "none";
    createModContactBtn.addEventListener("click", () => {
      show(createInnerDiv)
    });
    if (address.fav) {
      createFavButton.classList.add("favourite");
      createFavButton.innerHTML = '<i class="fas fa-star"></i>';
    }
    // delete function
    createDelButton.addEventListener("click", () => {
      addressArray.splice(index, 1);
      localStorage.setItem("users", JSON.stringify(addressArray));
      draw();
    });
    // edit address
    createSaveButton.addEventListener("click", () => {
      editName = createInputName.value;
      if (editName != null && editName != "") {
        address.name = editName;
        draw();
      }
      editNumber = createInputNumber.value;
      if (editNumber != null && editNumber != "") {
        address.phone = editNumber;
        draw();
      }
    });
    // favourite address
    createFavButton.addEventListener("click", () => {
      createDiv.classList.add("favourite");
      if (!address.fav) {
        address.fav = true;
      } else address.fav = false;
      draw();
    });
  });
  localStorage.setItem("users", JSON.stringify(addressArray));
}
//show on load
window.addEventListener("load", () => {
  if (localStorage.getItem("users")) {
    console.log("hello");
    addressArray = JSON.parse(localStorage.getItem("users"));
    console.log(addressArray);
    draw();
  }
});
//adding new contact
buttonAdd.addEventListener("click", () => {
  let Addname = addressName.value;
  let Addphone = addressPhone.value;
  let AddLastName = addressLastName.value;
  let AddEmail = addressEmail.value;
  console.log(Addphone, Addname);
  if (Addname != "" && Addphone != "") {
    addressArray.push({
      name: Addname,
      lastName: AddLastName,
      phone: Addphone,
      email: AddEmail,
    });
    draw();
  }
});
//searching for contact from array
// search.addEventListener("input", (event) => {
//   console.log(event.target.value);
//   let match = event.target.value.toLowerCase();
//   let filteredArray = addressArray.filter((address) => {
//     let nameLower = address.name.toLowerCase();
//     if (address.phone.includes(match, 0) || nameLower.includes(match, 0)) {
//       return address;}
//   });
//   draw(filteredArray);
// });
// deletes checked items
deleteCheckedBtn.addEventListener("click",() => {
  let boxes = document.querySelectorAll("#app .checkbox");
  let boxesArr = Array.from(boxes)
  for (i = boxesArr.length - 1; i>=0; i--){
    if(boxesArr[i].checked) {
    addressArray.splice(i, 1);
    }}
  draw()
});

// Add new address form (hide or show)
newAddressBtn.addEventListener("click", () => {
  show(formDiv)
});