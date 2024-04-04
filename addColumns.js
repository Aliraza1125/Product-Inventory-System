class ColumnManager {
    constructor(tableSelector, selectColumnId) {
      this.table = document.querySelector(tableSelector);
      this.selectColumn = document.getElementById(selectColumnId);
      this.selectedColumns = [];
      this.numColumns = 14;
  
      this.selectColumn.addEventListener("change", () => {
        this.addColumn();
      });
    }
  
    addColumn() {
      const selectedColumn = this.selectColumn.value;
      const columnIndex = this.getColumnIndex(selectedColumn);
  
      if (!this.selectedColumns.includes(columnIndex)) {
        this.selectedColumns.push(columnIndex);
        this.selectedColumns.sort((a, b) => a - b);
        this.updateTable();
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
  
      const headerCells = document.querySelectorAll(".data-table th");
      headerCells.forEach((cell, index) => {
        cell.style.width = `${columnWidth}%`;
        if (this.selectedColumns.includes(index) || index === 0 || index === 1) {
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
          if (this.selectedColumns.includes(index) || index === 0 || index === 1) {
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
  