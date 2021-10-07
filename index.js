const buttonAdd = document.querySelector(".addButton");
const addressPhone = document.querySelector(".addressPhone");
const addressName = document.querySelector("#app .addressName");
const output = document.querySelector(".output");
let addressArray = [];

buttonAdd.addEventListener("click", () => {
  output.innerHTML = null;
  let Addname = addressName.value;
  let Addphone = addressPhone.value;
  addressArray.push({ name: Addname, phone: Addphone });
  console.log(addressArray);
  addressArray.forEach((address, index) => {
    console.log(index);
    const createSpanName = document.createElement("span");
    const createSpanNumber = document.createElement("span");
    const createDiv = document.createElement("div");
    const createInputName = document.createElement("input");
    const createDelButton = document.createElement("button");
    const createSaveButton = document.createElement("button");
    createDelButton.classList.add("delButton");
    createDelButton.append("Remove");
    createSaveButton.append("Save");
    createSpanName.append(address.name);
    createSpanNumber.append(address.phone);
    createDiv.append(
      createSpanName,
      createSpanNumber,
      createInputName,
      createDelButton,
      createSaveButton
    );
    output.appendChild(createDiv);

    createDelButton.addEventListener("click", () => {
      createDiv.remove();
      addressArray.splice(index, 1);
    });
    createSaveButton.addEventListener("click", () => {
      Addname = createInputName.value;
      if (Addname != null && Addname != "") {
        address.name = Addname;
      }
    });
  });
});
