const API_URL_add = 'http://localhost:3001/api/add/products';
const show = 'http://localhost:3001/api/show/products';

class ProductManager {
  constructor() {
    this.tableBody = document.getElementById("table-body");
    this.modal = document.getElementById("myModal");
    this.productForm = document.getElementById("product-form");

    document.getElementById("addProduct").addEventListener("click", () => this.displayModal());
    document.getElementsByClassName("close")[0].addEventListener("click", () => this.closeModal());
    this.productForm.addEventListener("submit", event => this.handleFormSubmission(event));
    window.addEventListener("load", () => this.populateTableFromDatabase());
  }

  displayModal() {
    this.modal.style.display = "block";
  }

  closeModal() {
    this.modal.style.display = "none";
  }

  async addProductToDatabase(productDetails) {
    try {
      const response = await fetch(API_URL_add, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productDetails),
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      alert('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error.message);
      alert('Failed to add product. Please try again.');
    }
  }

  async populateTableFromDatabase() {
    try {
      const response = await fetch(show);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const products = await response.json();
      this.updateTable(products);
    } catch (error) {
      console.error('Error fetching products:', error.message);
      alert('Failed to fetch products. Please try again.');
    }
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
      <td>${product._id}</td>
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

  async handleFormSubmission(event) {
    event.preventDefault();

    const productDetails = {
      productName: document.getElementById("product-name").value,
      productTitle: document.getElementById("product-title").value,
      productDescription: document.getElementById("product-description").value,
      productVendor: document.getElementById("product-vendor").value,
      inStock: parseInt(document.getElementById("in-stock").value),
      buyingPrice: parseFloat(document.getElementById("buying-price").value),
      salePrice: parseFloat(document.getElementById("sale-price").value),
      purchaseQuantity: parseInt(document.getElementById("purchase-quantity").value),
      productType: document.getElementById("product-type").value,
      shippingRates: document.getElementById("shipping-rates").value,
      refillLimit: parseInt(document.getElementById("refill-limit").value),
      productLocationAddress: document.getElementById("product-location-address").value,
    };

    await this.addProductToDatabase(productDetails);
    this.productForm.reset();
    this.closeModal();
    await this.populateTableFromDatabase();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const productManager = new ProductManager();
});
