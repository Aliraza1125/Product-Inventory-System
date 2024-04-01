document.addEventListener("DOMContentLoaded", function() {
  const sortSelect = document.getElementById("sortName");
  const tableBody = document.querySelector("table.data-table tbody");
  const originalTableHtml = tableBody.innerHTML; 

  sortSelect.addEventListener("change", function() {
    const sortBy = sortSelect.value;
    const loggedInUserEmail = localStorage.getItem("loggedInUser");
    let userProducts = JSON.parse(localStorage.getItem(loggedInUserEmail)) || [];
    if (sortBy === "byId") {
      sortById(userProducts);
    } else if (sortBy === "byPrice") {
      sortByPrice(userProducts);
    } else if (sortBy === "byName") {
      sortByName(userProducts);
    } else if (sortBy === "default") {
      resetTable();
    }
  });

  function sortById(products) {
    products.sort((a, b) => {
      return parseInt(a.id) - parseInt(b.id);
    });
    updateTable(products);
  }

  function sortByPrice(products) {
    products.sort((a, b) => {
      return parseFloat(a.buyingPrice) - parseFloat(b.buyingPrice);
    });
    updateTable(products);
  }
  
  function sortByName(products) {
    products.sort((a, b) => {
      return a.productName.localeCompare(b.productName);
    });
    updateTable(products);
  }

  function updateTable(products) {
    clearTable();
    products.forEach(product => {
      const row = createTableRow(product);
      tableBody.appendChild(row);
    });
  }

  function resetTable() {
    originalTableHtml;
  }

  function clearTable() {
    tableBody.innerHTML = "";
  }

  function createTableRow(product) {
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

  const loggedInUserEmail = localStorage.getItem("loggedInUser");
  let userProducts = JSON.parse(localStorage.getItem(loggedInUserEmail)) || [];
  sortById(userProducts);
});
