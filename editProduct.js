class ProductEditor {
  constructor() {
    this.tableBody = document.getElementById("table-body");
    this.editModal = document.getElementById("editModal");
    this.editProductForm = document.getElementById("edit-product-form");

    this.tableBody.addEventListener("click", event => this.handleEditButtonClick(event));
    this.editProductForm.addEventListener("submit", event => this.handleFormSubmission(event));
    this.registerCloseEvents();
  }

  openEditModal(productId) {
    const productRow = this.findProductRow(productId);
    if (!productRow) {
      console.error(`Product with ID ${productId} not found.`);
      return;
    }
    this.fillEditForm(productRow);
    this.editModal.style.display = "block";
  }

  findProductRow(productId) {
    const tableRows = this.tableBody.querySelectorAll("tr");
    return [...tableRows].find(row => row.cells[1].textContent === productId);
  }

  fillEditForm(productRow) {
    const editForm = this.editProductForm;
    const elements = editForm.elements;
    elements["edit-product-id"].value = productRow.cells[1].textContent;
    elements["edit-product-name"].value = productRow.cells[2].textContent;
    elements["edit-product-title"].value = productRow.cells[3].textContent;
    elements["edit-product-description"].value = productRow.cells[4].textContent;
    elements["edit-product-vendor"].value = productRow.cells[5].textContent;
    elements["edit-in-stock"].value = productRow.cells[6].textContent;
    elements["edit-buying-price"].value = productRow.cells[7].textContent;
    elements["edit-sale-price"].value = productRow.cells[8].textContent;
    elements["edit-purchase-quantity"].value = productRow.cells[9].textContent;
    elements["edit-product-type"].value = productRow.cells[10].textContent;
    elements["edit-shipping-rates"].value = productRow.cells[11].textContent;
    elements["edit-refill-limit"].value = productRow.cells[12].textContent;
    elements["edit-product-location-address"].value = productRow.cells[13].textContent;
  }

  updateProductInLocalStorage(updatedProduct) {
    const loggedInUserEmail = localStorage.getItem("loggedInUser");
    let userProducts = JSON.parse(localStorage.getItem(loggedInUserEmail)) || [];
    const productIndex = userProducts.findIndex(product => product.id === updatedProduct.id);
    if (productIndex !== -1) {
      userProducts[productIndex] = updatedProduct;
      localStorage.setItem(loggedInUserEmail, JSON.stringify(userProducts));
    }
  }

  updateTableRow(updatedProduct) {
    const productRow = this.findProductRow(updatedProduct.id);
    if (productRow) {
      const cells = productRow.cells;
      cells[2].textContent = updatedProduct.productName;
      cells[3].textContent = updatedProduct.productTitle;
      cells[4].textContent = updatedProduct.productDescription;
      cells[5].textContent = updatedProduct.productVendor;
      cells[6].textContent = updatedProduct.inStock;
      cells[7].textContent = updatedProduct.buyingPrice;
      cells[8].textContent = updatedProduct.salePrice;
      cells[9].textContent = updatedProduct.purchaseQuantity;
      cells[10].textContent = updatedProduct.productType;
      cells[11].textContent = updatedProduct.shippingRates;
      cells[12].textContent = updatedProduct.refillLimit;
      cells[13].textContent = updatedProduct.productLocationAddress;
    }
  }

  handleEditButtonClick(event) {
    if (event.target.classList.contains("button-edit-product")) {
      const productId = event.target.closest("tr").cells[1].textContent;
      this.openEditModal(productId);
    }
  }

  handleFormSubmission(event) {
    event.preventDefault();
    const updatedProduct = this.collectFormData();
    this.updateProductInLocalStorage(updatedProduct);
    this.updateTableRow(updatedProduct);
    this.editModal.style.display = "none";
    alert("Product updated successfully!");
  }

  collectFormData() {
    const form = this.editProductForm.elements;
    return {
      id: form["edit-product-id"].value,
      productName: form["edit-product-name"].value,
      productTitle: form["edit-product-title"].value,
      productDescription: form["edit-product-description"].value,
      productVendor: form["edit-product-vendor"].value,
      inStock: form["edit-in-stock"].value,
      buyingPrice: form["edit-buying-price"].value,
      salePrice: form["edit-sale-price"].value,
      purchaseQuantity: form["edit-purchase-quantity"].value,
      productType: form["edit-product-type"].value,
      shippingRates: form["edit-shipping-rates"].value,
      refillLimit: form["edit-refill-limit"].value,
      productLocationAddress: form["edit-product-location-address"].value
    };
  }

  registerCloseEvents() {
    const closeModal = modal => modal.style.display = "none";
    document.querySelectorAll(".close").forEach(closeBtn => {
      closeBtn.addEventListener("click", function() {
        closeModal(this.closest(".modal"));
      });
    });
    window.addEventListener("click", event => {
      document.querySelectorAll(".modal").forEach(modal => {
        if (event.target === modal) {
          closeModal(modal);
        }
      });
    });
  }
}

// Usage
document.addEventListener("DOMContentLoaded", () => {
  const productEditor = new ProductEditor();
});
