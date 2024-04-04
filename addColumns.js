class ColumnManager {
  constructor(tableSelector, selectColumnId) {
    this.table = document.querySelector(tableSelector);
    this.selectColumn = document.getElementById(selectColumnId);
    this.selectedColumns = [];
    this.numColumns = 15; // Changed to 15 as there are 15 columns including the actions column

    this.selectColumn.addEventListener("change", () => {
      this.toggleColumn();
    });
  }

  toggleColumn() {
    const selectedColumn = this.selectColumn.value;
    const columnIndex = this.getColumnIndex(selectedColumn);

    const index = this.selectedColumns.indexOf(columnIndex);

    if (index === -1) {
      this.selectedColumns.push(columnIndex);
    } else {
      this.selectedColumns.splice(index, 1);
    }

    this.selectedColumns.sort((a, b) => a - b);
    this.updateTable();
    this.updateDropdown();
  }

  updateDropdown() {
    const options = this.selectColumn.options;
    for (let i = 0; i < options.length; i++) {
      const columnIndex = this.getColumnIndex(options[i].value);
      if (this.selectedColumns.includes(columnIndex)) {
        if (!options[i].querySelector(".tick-icon")) {
          const tickIcon = document.createElement("span");
          tickIcon.classList.add("tick-icon");
          tickIcon.textContent = "✔"; // You can use any icon or content here
          options[i].appendChild(tickIcon);
        }
        options[i].classList.add("selected"); // Add class to style selected option
      } else {
        const tickIcon = options[i].querySelector(".tick-icon");
        if (tickIcon) {
          tickIcon.remove();
        }
        options[i].classList.remove("selected"); // Remove class to style deselected option
      }
    }
  }

  getColumnIndex(selectedColumn) {
    const columnMap = {
      "sads": "0",
      "id": 1,
      "productName": 2,
      "productTitle": 3,
      "productDescription": 4,
      "productVendor": 5,
      "inStock": 6,
      "buyingPrice": 7,
      "salePrice": 8,
      "purchaseQuantity": 9,
      "productType": 10,
      "shippingRates": 11,
      "refillLimit": 12,
      "productLocationAddress": 13
    };

    return columnMap[selectedColumn];
  }

  updateTable() {
    const columnWidth = 100 / this.numColumns;

    const headerCells = this.table.querySelectorAll("thead th");
    headerCells.forEach((cell, index) => {
      cell.style.width = `${columnWidth}%`;
      if (this.selectedColumns.includes(index) || index === 0) {
        cell.style.display = "table-cell";
      } else {
        cell.style.display = "none";
      }
    });

    const dataRows = this.table.querySelectorAll("tbody tr");
    dataRows.forEach(row => {
      const cells = row.querySelectorAll("td");
      cells.forEach((cell, index) => {
        cell.style.width = `${columnWidth}%`;
        if (this.selectedColumns.includes(index) || index === 0) {
          cell.style.display = "table-cell";
        } else {
          cell.style.display = "none";
        }
      });
    });
  }
}

// Usage
document.addEventListener("DOMContentLoaded", () => {
  const columnManager = new ColumnManager(".data-table", "selectColumn");
});
