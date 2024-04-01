function displayModal() {
  const modal = document.getElementById("myModal");
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("myModal");
  modal.style.display = "none";
}

function addProductToTable(productDetails) {
  const tbody = document.getElementById("table-body");
  const loggedInUserEmail = localStorage.getItem("loggedInUser");

  if (!loggedInUserEmail) {
    alert("Please log in to add products.");
    return;
  }

  let userProducts = JSON.parse(localStorage.getItem(loggedInUserEmail)) || [];

  const existingProductIndex = userProducts.findIndex(p => p.id === productDetails.id);

  if (existingProductIndex !== -1) {
    userProducts[existingProductIndex] = productDetails;
  } else {
    userProducts.push(productDetails);
  }

  localStorage.setItem(loggedInUserEmail, JSON.stringify(userProducts));

  tbody.innerHTML = "";

  userProducts.forEach((product) => {
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
    tbody.appendChild(row);
  });
}

function populateTableFromStorage() {
  const loggedInUserEmail = localStorage.getItem("loggedInUser");
  if (!loggedInUserEmail) {
    alert("Please log in to view products.");
    return;
  }

  const userProducts = JSON.parse(localStorage.getItem(loggedInUserEmail)) || [];
  const tbody = document.getElementById("table-body");
  tbody.innerHTML = "";

  userProducts.forEach((product) => {
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
    tbody.appendChild(row);
  });
}

document.getElementById("addProduct").addEventListener("click", displayModal);

document.getElementsByClassName("close")[0].addEventListener("click", closeModal);

document.getElementById("product-form").addEventListener("submit", function (event) {
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

  addProductToTable(productDetails);

  document.getElementById("product-form").reset();

  closeModal();
});


window.addEventListener("load", populateTableFromStorage);
