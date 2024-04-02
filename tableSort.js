document.addEventListener("DOMContentLoaded", function() {
  const tableBody = document.querySelector("table.data-table tbody");
  const originalTableHtml = tableBody.innerHTML; 

  // Event listener for column sort icons
  document.querySelectorAll('.fa-sort').forEach(icon => {
    icon.addEventListener('click', function () {
      const column = this.dataset.column;
      const loggedInUserEmail = localStorage.getItem("loggedInUser");
      let userProducts = JSON.parse(localStorage.getItem(loggedInUserEmail)) || [];
      
      if (column === "id") {
        sortById(userProducts);
      } else {
        sortByColumn(userProducts, column);
      }
    });
  });

  function sortById(products) {
    products.sort((a, b) => {
      return parseInt(a.id) - parseInt(b.id);
    });
    updateTable(products);
  }

  function sortByColumn(products, columnName) {
    products.sort((a, b) => {
      // Handle sorting for numeric columns
      if (["buyingPrice", "salePrice", "purchaseQuantity", "shippingRates", "refillLimit"].includes(columnName)) {
        return parseFloat(a[columnName]) - parseFloat(b[columnName]);
      }
      // Default sorting for other columns
      return a[columnName].localeCompare(b[columnName]);
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
