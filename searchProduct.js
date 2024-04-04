class FilterManager {
  constructor(searchInputId, filterRowSelector, dataTableSelector) {
    this.searchInput = document.getElementById(searchInputId);
    this.filterInputs = document.querySelectorAll(`${filterRowSelector} input[type='text']`);
    this.table = document.querySelector(dataTableSelector);

    this.searchInput.addEventListener("input", () => {
      this.filterProducts(this.searchInput.value.trim().toLowerCase());
    });

    this.filterInputs.forEach(input => {
      input.addEventListener("input", () => {
        this.filterProducts(input.value.trim().toLowerCase(), input.parentElement.cellIndex);
      });
    });
  }

  filterProducts(searchTerm, columnIndex) {
    const dataRows = this.table.querySelectorAll("tbody tr");
    dataRows.forEach(row => {
      const cellValue = row.querySelectorAll("td")[columnIndex].textContent.toLowerCase();
      if (cellValue.includes(searchTerm)) {
        row.style.display = "table-row";
      } else {
        row.style.display = "none";
      }
    });
  }
}

// Usage
document.addEventListener("DOMContentLoaded", () => {
  const filterManager = new FilterManager("searchInput", "#filterRow", ".data-table");
});
