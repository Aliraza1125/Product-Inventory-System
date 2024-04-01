function openEditModal(productId) {
  const tableRows = document.querySelectorAll("#table-body tr");
  let productRow = null;
  tableRows.forEach(row => {
    if (row.cells[1].textContent === productId) {
      productRow = row;
    }
  });

  if (!productRow) {
    console.error(`Product with ID ${productId} not found.`);
    return;
  }

  const productName = productRow.cells[2].textContent;
  const productTitle = productRow.cells[3].textContent;
  const productDescription = productRow.cells[4].textContent;
  const productVendor = productRow.cells[5].textContent;
  const inStock = productRow.cells[6].textContent;
  const buyingPrice = productRow.cells[7].textContent;
  const salePrice = productRow.cells[8].textContent;
  const purchaseQuantity = productRow.cells[9].textContent;
  const productType = productRow.cells[10].textContent;
  const shippingRates = productRow.cells[11].textContent;
  const refillLimit = productRow.cells[12].textContent;
  const productLocationAddress = productRow.cells[13].textContent;

  document.getElementById("edit-product-name").value = productName;
  document.getElementById("edit-product-id").value = productId;
  document.getElementById("edit-product-title").value = productTitle;
  document.getElementById("edit-product-description").value = productDescription;
  document.getElementById("edit-product-vendor").value = productVendor;
  document.getElementById("edit-in-stock").value = inStock;
  document.getElementById("edit-buying-price").value = buyingPrice;
  document.getElementById("edit-sale-price").value = salePrice;
  document.getElementById("edit-purchase-quantity").value = purchaseQuantity;
  document.getElementById("edit-product-type").value = productType;
  document.getElementById("edit-shipping-rates").value = shippingRates;
  document.getElementById("edit-refill-limit").value = refillLimit;
  document.getElementById("edit-product-location-address").value = productLocationAddress;

  const modal = document.getElementById("editModal");
  modal.style.display = "block";
}

function updateProductInLocalStorage(productId, updatedProduct) {
  const loggedInUserEmail = localStorage.getItem("loggedInUser");

  let userProducts = JSON.parse(localStorage.getItem(loggedInUserEmail)) || [];

  const productIndex = userProducts.findIndex(product => product.id === productId);

  if (productIndex !== -1) {
    userProducts[productIndex] = updatedProduct;

    localStorage.setItem(loggedInUserEmail, JSON.stringify(userProducts));
  }
}

document.getElementById("table-body").addEventListener("click", function(event) {
  if (event.target.classList.contains("button-edit-product")) {
    const productId = event.target.closest("tr").querySelector("td:nth-child(2)").textContent;
    openEditModal(productId);
  }
});

document.getElementById("edit-product-form").addEventListener("submit", function(event) {
  event.preventDefault(); 

  const updatedProduct = {
    id: document.getElementById("edit-product-id").value,
    productName: document.getElementById("edit-product-name").value,
    productTitle: document.getElementById("edit-product-title").value,
    productDescription: document.getElementById("edit-product-description").value,
    productVendor: document.getElementById("edit-product-vendor").value,
    inStock: document.getElementById("edit-in-stock").value,
    buyingPrice: document.getElementById("edit-buying-price").value,
    salePrice: document.getElementById("edit-sale-price").value,
    purchaseQuantity: document.getElementById("edit-purchase-quantity").value,
    productType: document.getElementById("edit-product-type").value,
    shippingRates: document.getElementById("edit-shipping-rates").value,
    refillLimit: document.getElementById("edit-refill-limit").value,
    productLocationAddress: document.getElementById("edit-product-location-address").value
  };

  updateProductInLocalStorage(updatedProduct.id, updatedProduct);

  const tableRows = document.querySelectorAll("#table-body tr");
  tableRows.forEach(row => {
    if (row.cells[1].textContent === updatedProduct.id) {
      row.cells[2].textContent = updatedProduct.productName;
      row.cells[3].textContent = updatedProduct.productTitle;
      row.cells[4].textContent = updatedProduct.productDescription;
      row.cells[5].textContent = updatedProduct.productVendor;
      row.cells[6].textContent = updatedProduct.inStock;
      row.cells[7].textContent = updatedProduct.buyingPrice;
      row.cells[8].textContent = updatedProduct.salePrice;
      row.cells[9].textContent = updatedProduct.purchaseQuantity;
      row.cells[10].textContent = updatedProduct.productType;
      row.cells[11].textContent = updatedProduct.shippingRates;
      row.cells[12].textContent = updatedProduct.refillLimit;
      row.cells[13].textContent = updatedProduct.productLocationAddress;
    }
  });

  const modal = document.getElementById("editModal");
  modal.style.display = "none";
});

document.querySelectorAll(".close").forEach(closeBtn => {
  closeBtn.addEventListener("click", function() {
    const modal = this.closest(".modal");
    modal.style.display = "none";
  });
});

window.addEventListener("click", function(event) {
  const modals = document.querySelectorAll(".modal");
  modals.forEach(modal => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });
});
