class ProductManager {
  constructor() {
    this.tableBody = document.getElementById("table-body");
    this.loggedInUserEmail = localStorage.getItem("loggedInUser");
    this.modal = document.getElementById("myModal");
    this.productForm = document.getElementById("product-form");

    document.getElementById("addProduct").addEventListener("click", () => this.displayModal());
    document.getElementsByClassName("close")[0].addEventListener("click", () => this.closeModal());
    this.productForm.addEventListener("submit", event => this.handleFormSubmission(event));
    window.addEventListener("load", () => this.populateTableFromStorage());
  }

  displayModal() {
    this.modal.style.display = "block";
  }

  closeModal() {
    this.modal.style.display = "none";
  }

  addProductToTable(productDetails) {
    if (!this.loggedInUserEmail) {
      alert("Please log in to add products.");
      return;
    }

    let userProducts = JSON.parse(localStorage.getItem(this.loggedInUserEmail)) || [];

    const existingProductIndex = userProducts.findIndex(p => p.id === productDetails.id);

    if (existingProductIndex !== -1) {
      userProducts[existingProductIndex] = productDetails;
    } else {
      userProducts.push(productDetails);
    }

    localStorage.setItem(this.loggedInUserEmail, JSON.stringify(userProducts));

    this.updateTable(userProducts);

    // Alert message when product is added
    alert("Product added successfully!");
  }

  populateTableFromStorage() {
    if (!this.loggedInUserEmail) {
      alert("Please log in to view products.");
      return;
    }

    const userProducts = JSON.parse(localStorage.getItem(this.loggedInUserEmail)) || [];
    this.updateTable(userProducts);
  }

  updateTable(products) {
    this.clearTable();
    products.forEach(product => {
      const row = this.createTableRow(product);
      this.tableBody.appendChild(row);
    });
  }

  clearTable() {
    this.tableBody.innerHTML = "";
  }

  createTableRow(product) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="fixed"><input type="checkbox"></td>
      <td>${product.id}</td>
      <td>${product.productName}</td>
      <td>${product.productTitle}</td>
      <td>${product.productDescription}</td>
      <td>${product.productVendor}</td>
      <td>${product.inStock}</td>
      <td>${product.buyingPrice}</td>
      <td>${product.salePrice}</td>
      <td>${product.purchaseQuantity}</td>
      <td>${product.productType}</td>
      <td>${product.shippingRates}</td>
      <td>${product.refillLimit}</td>
      <td>${product.productLocationAddress}</td>
      <td style="display: flex" >
        <button class="button-edit-product"><i class="fas fa-edit"></i> Edit</button>
        <button class="button-delete-product"><i class="fas fa-trash-alt"></i> Delete</button>
      </td>
    `;
    return row;
  }

  handleFormSubmission(event) {
    event.preventDefault();

    const productDetails = {
      id: document.getElementById("product-id").value,
      productName: document.getElementById("product-name").value,
      productTitle: document.getElementById("product-title").value,
      productDescription: document.getElementById("product-description").value,
      productVendor: document.getElementById("product-vendor").value,
      inStock: document.getElementById("in-stock").value,
      buyingPrice: document.getElementById("buying-price").value,
      salePrice: document.getElementById("sale-price").value,
      purchaseQuantity: document.getElementById("purchase-quantity").value,
      productType: document.getElementById("product-type").value,
      shippingRates: document.getElementById("shipping-rates").value,
      refillLimit: document.getElementById("refill-limit").value,
      productLocationAddress: document.getElementById("product-location-address").value,
    };

    this.addProductToTable(productDetails);
    this.productForm.reset();
    this.closeModal();
  }
}

// Usage
document.addEventListener("DOMContentLoaded", () => {
  const productManager = new ProductManager();
});
