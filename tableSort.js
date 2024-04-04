class TableSorter {
  constructor(tableBodySelector) {
    this.tableBody = document.querySelector(tableBodySelector);
    this.originalTableHtml = this.tableBody.innerHTML;

    document.querySelectorAll('.fa-sort').forEach(icon => {
      icon.addEventListener('click', () => {
        const column = icon.dataset.column;
        this.sortTable(column);
      });
    });
  }

  sortTable(column) {
    const loggedInUserEmail = localStorage.getItem("loggedInUser");
    let userProducts = JSON.parse(localStorage.getItem(loggedInUserEmail)) || [];

    if (column === "id") {
      this.sortById(userProducts);
    } else {
      this.sortByColumn(userProducts, column);
    }
  }

  sortById(products) {
    products.sort((a, b) => parseInt(a.id) - parseInt(b.id));
    this.updateTable(products);
  }

  sortByColumn(products, columnName) {
    products.sort((a, b) => {
      if (["buyingPrice", "salePrice", "purchaseQuantity", "shippingRates", "refillLimit"].includes(columnName)) {
        return parseFloat(a[columnName]) - parseFloat(b[columnName]);
      }
      return a[columnName].localeCompare(b[columnName]);
    });
    this.updateTable(products);
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
}

// Usage
document.addEventListener("DOMContentLoaded", () => {
  const tableSorter = new TableSorter("table.data-table tbody");
});
