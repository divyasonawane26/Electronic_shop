// Electronic Shop Management System
// Now includes Search, Login/Signup, and Category Filtering

// JavaScript logic
const productList = document.getElementById("productList");
let products = JSON.parse(localStorage.getItem("products")) || [];

function renderProducts(filter = "all", searchTerm = "") {
    productList.innerHTML = "";
    products.forEach((product, index) => {
        if ((filter === "all" || product.category === filter) && product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            productList.innerHTML += `<li>
                <span>${product.name} - $${product.price} (${product.category})</span>
                <div>
                    <button class="edit-btn" onclick="editProduct(${index})">Edit</button>
                    <button class="delete-btn" onclick="deleteProduct(${index})">Delete</button>
                </div>
            </li>`;
        }
    });
}

function addProduct() {
    const name = document.getElementById("productName").value;
    const price = document.getElementById("productPrice").value;
    const category = document.getElementById("productCategory").value;
    if (!name || !price) {
        alert("Please enter both product name and price.");
        return;
    }
    products.push({ name, price, category });
    localStorage.setItem("products", JSON.stringify(products));
    renderProducts();
    document.getElementById("productName").value = "";
    document.getElementById("productPrice").value = "";
}

function editProduct(index) {
    const newName = prompt("Enter new product name:", products[index].name);
    const newPrice = prompt("Enter new product price:", products[index].price);
    if (newName && newPrice) {
        products[index] = { ...products[index], name: newName, price: newPrice };
        localStorage.setItem("products", JSON.stringify(products));
        renderProducts();
    }
}

function deleteProduct(index) {
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    renderProducts();
}

function searchProduct() {
    const searchTerm = document.getElementById("searchProduct").value;
    renderProducts("all", searchTerm);
}

function loginUser() {
    const username = document.getElementById("username").value;
    if (!username) {
        alert("Please enter a username.");
        return;
    }
    document.getElementById("loginMessage").innerText = `Welcome, ${username}!`;
}

// Initial rendering
renderProducts();
