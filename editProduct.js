class ProductEditor {
  constructor() {
    this.tableBody = document.getElementById("table-body");
    this.editModal = document.getElementById("editModal");
    this.editProductForm = document.getElementById("edit-product-form");

    this.tableBody.addEventListener("click", event => this.handleEditButtonClick(event));
    this.editProductForm.addEventListener("submit", event => this.handleFormSubmission(event));
    this.registerCloseEvents();
  }

  async openEditModal(productId) {
    const product = await this.findProductRow(productId);
    if (!product) {
      console.error(`Product with ID ${productId} not found.`);
      return;
    }
    this.fillEditForm(product);
    this.editModal.style.display = "block";
  }

  async findProductRow(productId) {
    try {
      const response = await fetch(`http://localhost:3001/api/show/products/${productId}`);
      if (!response.ok) {
        throw new Error('Product not found');
      }
      const product = await response.json();
      return product;
    } catch (error) {
      console.error(`Error finding product with ID ${productId}:`, error.message);
      return null;
    }
  }

  fillEditForm(product) {
    const editForm = this.editProductForm;
    const elements = editForm.elements;
    elements["edit-product-id"].value = product._id;
    elements["edit-product-name"].value = product.productName;
    elements["edit-product-title"].value = product.productTitle;
    elements["edit-product-description"].value = product.productDescription;
    elements["edit-product-vendor"].value = product.productVendor;
    elements["edit-in-stock"].value = product.inStock;
    elements["edit-buying-price"].value = product.buyingPrice;
    elements["edit-sale-price"].value = product.salePrice;
    elements["edit-purchase-quantity"].value = product.purchaseQuantity;
    elements["edit-product-type"].value = product.productType;
    elements["edit-shipping-rates"].value = product.shippingRates;
    elements["edit-refill-limit"].value = product.refillLimit;
    elements["edit-product-location-address"].value = product.productLocationAddress;
  }

  async updateProductInDatabase(updatedProduct) {
    try {
      const response = await fetch(`http://localhost:3001/api/edit/products/${updatedProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      alert("Product updated successfully!");
      // Update table after successful update
      await this.populateTableFromDatabase();
    } catch (error) {
      console.error('Error updating product:', error.message);
      alert('Failed to update product. Please try again.');
    }
  }

  async handleEditButtonClick(event) {
    if (event.target.classList.contains("button-edit-product")) {
      const productId = event.target.closest("tr").cells[1].textContent;
      await this.openEditModal(productId);
    }
  }

  async handleFormSubmission(event) {
    event.preventDefault();
    const updatedProduct = this.collectFormData();
    await this.updateProductInDatabase(updatedProduct);
    this.editModal.style.display = "none";
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

  async populateTableFromDatabase() {
    try {
      const response = await fetch('http://localhost:3001/api/show/products');
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
