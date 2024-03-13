//HTML etiketlerini sçe
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const list = document.querySelector(".grocery-list");
const container = document.querySelector(".grocery-container");
const alert = document.querySelector(".alert");
const submitBtn = document.querySelector(".submit-btn");
const clearBtn = document.querySelector(".clear-btn");

// düzenleme seçenekleri
let editElement ;
let editFlag = false; //düzenleme modunda olup olmadığını belirtir
let editID = "" ; // düzenleme yapılan öğenin benzersiz kimliği


//Olay izleyicileri

form.addEventListener("submit", addItem);
clearBtn.addEventListener("click", clearItems);

//fonksiyonlar

function displayAlert(text, action){
    console.log(text,action);
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);
    setTimeout(() => {
        alert.textContent = "";
        alert.classList.remove(`alert-${action}`);
    }, 1500);
}

function addItem(e) {
  e.preventDefault(); //sayfa yenilenmesini engeller
  const value = grocery.value;
  const id = new Date().getTime().toString();

  if (value !== "" && !editFlag) {
    const element = document.createElement("article"); // yeni article oluşturur
    let attr = document.createAttribute("data-id"); //yeni veri kimliği oluşturur
    attr.value = id;
    element.setAttributeNode(attr); //id elemente eklendi
    element.classList.add("grocery-item"); // elemente class eklendi
    element.innerHTML = `
                    <p class="tittle">${value}</p>
                    <div class="btn-container">
                        <button type="button" class="edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>
                        <button type="button" class="delete-btn"><i class="fa-solid fa-trash"></i></button>
                    </div>
        `;
    const deleteBtn = element.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", deleteItem);
    const editBtn = element.querySelector(".edit-btn");
    editBtn.addEventListener("click", editItem);



    list.appendChild(element); //kapsaycıya ekleme yapma
    displayAlert("Başarıyla Eklendi", "success");
    container.classList.add("show-container");
    grocery.value = ""; //input kısmını temizleme
  } else if(value !== "" && editFlag){
    editElement.innerHTML = value;
    displayAlert("Değer Değiştirildi" , "success");
    grocery.value = "";

  }else{


  }
}

function clearItems(){
    const items = document.querySelectorAll(".grocery-item");
    if(items.length > 0){
        items.forEach((item) => list.removeChild(item));
    }
    container.classList.remove("show-container");
    displayAlert("Liste Boş" , "danger");
}

// silme fonksiyonu
function deleteItem(e){
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    list.removeChild(element);
    displayAlert("Öğe Kaldırıldı", "danger");
} 

//düzenleme fonks
function editItem(e){
    const element = e.currentTarget.parentElement.parentElement;
    editElement = e.currentTarget.parentElement.previousElementSibling; //düzzenleme yapılan öğeyi seç
    grocery.value = editElement.innerHTML; //inputu düzenlenenle doldur
    editFlag = true;
    editID = element.dataset.id; // düzenlenen öğenin kimliği
    submitBtn.textContent = "Düzenle";
}

