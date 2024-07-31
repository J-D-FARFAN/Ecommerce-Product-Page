// Elementos del DOM
const cart = document.querySelector(".bx-cart");
const selectedProducts = document.querySelectorAll(".product-thumbnailEmpty");
const imageProductSelected = document.querySelectorAll(".image-thumbnailEmpty");
const productMain = document.getElementById("productMain");

const selectedProductsModal = document.querySelectorAll(".selectedProductModal");
const imageProductModal = document.querySelectorAll(".image-product-modal");
const productMainModal = document.querySelector(".bx-imagesProductsPageModalState .productMainEmpty");

const modal = document.querySelector(".bx-imagesProductsPageModalState");
const closeModal = document.querySelector(".btnCloseModalProduct");
const bgBlur = document.querySelector(".backgroundBlur");

const btnMinus = document.querySelector(".btn-minus");
const btnPlus = document.querySelector(".btn-plus");
const numberProduc = document.querySelector(".numberProduct");
let Count = parseInt(numberProduc.textContent);

const imagePaths = [
    "images/image-product-1.jpg",
    "images/image-product-2.jpg",
    "images/image-product-3.jpg",
    "images/image-product-4.jpg"
];

let currentImageIndex = 0;

// Función para abrir y cerrar el carrito
function toggleCart() {
    const sectionCart = document.querySelector(".cart-section");
    sectionCart.style.display = sectionCart.style.display === 'block' ? 'none' : 'block';
}

// Función para abrir el modal de producto si la pantalla es mayor a 900px
function openModalProduct() {
    if (window.matchMedia("(min-width: 900px)").matches) {
        modal.style.display = 'flex';
        bgBlur.style.display = 'block';
        [closeModal, bgBlur].forEach(element => element.addEventListener("click", closeModalProduct));
    }
}

// Función para cerrar el modal de producto
function closeModalProduct() {
    modal.style.display = 'none';
    bgBlur.style.display = 'none';
}

// Función para actualizar la imagen principal y las miniaturas activas
function updateMainImage(index) {
    const updateActiveThumbnail = (thumbnails, images) => {
        thumbnails.forEach((thumb, imgIndex) => {
            thumb.classList.toggle("selectedProductActive", imgIndex === index);
            images[imgIndex].classList.toggle("opacityProductSelectedActive", imgIndex === index);
        });
    };

    productMain.src = imagePaths[index];
    productMainModal.src = imagePaths[index];
    updateActiveThumbnail(selectedProducts, imageProductSelected);
    updateActiveThumbnail(selectedProductsModal, imageProductModal);
}

// Funciones de navegación de imágenes
function previousImage() {
    currentImageIndex = (currentImageIndex - 1 + imagePaths.length) % imagePaths.length;
    updateMainImage(currentImageIndex);
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % imagePaths.length;
    updateMainImage(currentImageIndex);
}

function incrementProduct() {
    numberProduc.textContent = ++Count;
}

function decrementProduct() {
    if (Count > 0) numberProduc.textContent = --Count;
}

function openMenuBurgur(){
    const navbar = document.querySelector(".navbar");
    const closeMenu = document.querySelector(".iconCloseMenu");
    navbar.style.display = "flex";
    bgBlur.style.display = "block";
    closeMenu.style.display = "flex";

    closeMenu.addEventListener("click", () =>{
        navbar.style.display = "none";
        bgBlur.style.display = "none";
        closeMenu.style.display = "none";
    })
}

// Asignación de eventos
cart.addEventListener("click", toggleCart);
productMain.addEventListener("click", openModalProduct);
btnMinus.addEventListener("click", decrementProduct);
btnPlus.addEventListener("click", incrementProduct);
document.querySelector('.iconArrow-left').addEventListener('click', previousImage);
document.querySelector('.iconArrow-right').addEventListener('click', nextImage);
document.querySelector('.iconArrow-leftMain').addEventListener('click', previousImage);
document.querySelector('.iconArrow-rightMain').addEventListener('click', nextImage);

[selectedProducts, selectedProductsModal].forEach((elements, i) => {
    elements.forEach((element, index) => {
        element.addEventListener("click", () => updateMainImage(index));
    });
});

const productInCart = document.querySelector(".createProductCart");
const productSelected = document.querySelector(".btn-addCart");
const cartEmpty = document.querySelector(".descriptionSection");

productSelected.addEventListener("click", (e) => {
    e.preventDefault();
    const count = Count;
    if (count <= 0) return;

    const priceProduct = 125.00;
    const totalPrice = priceProduct * count;
    const tplProduct = `
    <section class="contentAllProductSelected">
        <div class="contentProductSell">
            <img src="images/image-product-1-thumbnail.jpg" alt="" class="iconCartProduct">
            <section class="descriptionProduct">
                <h2 class="titleDescriptionProduct">Fall Limited Edition Sneakers</h2>
                <div class="bx-infoProduct">
                    <span class="priceProduct-and-cant">$125.00 x <span class="numberCant">${count}</span></span>
                    <span class="bx-sumPriceProduct">$<span class="sumPriceProduct">${totalPrice.toFixed(2)}</span></span>
                </div>
            </section>
            <svg class="deleteProduct" width="14" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z" fill="#C3CAD9"/></svg>
        </div>
        <button class="btn-checkout" type="submit">Checkout</button>
    </section>`;

    productInCart.innerHTML = tplProduct;
    cartEmpty.style.display = "none";
    document.querySelector(".numberProducInCart").style.display = "flex";
    document.querySelector(".numberProducInCart").textContent = count;

    Count = 0;
    numberProduc.textContent = "0";

    document.querySelector(".deleteProduct").addEventListener("click", () => {
        productInCart.innerHTML = "";
        cartEmpty.style.display = "flex";
        document.querySelector(".numberProducInCart").style.display = "none";
    });
});


const openMenu = document.querySelector(".iconMenu").addEventListener("click", openMenuBurgur);