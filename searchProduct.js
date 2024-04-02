document.addEventListener("DOMContentLoaded", function() {
  const searchInput = document.getElementById("searchInput");
  const filterInputs = document.querySelectorAll("#filterRow input[type='text']");
  const table = document.querySelector(".data-table");

  searchInput.addEventListener("input", function() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    filterProducts(searchTerm);
  });

  filterInputs.forEach(input => {
    input.addEventListener("input", function() {
      filterProducts(input.value.trim().toLowerCase(), input.parentElement.cellIndex);
    });
  });

  function filterProducts(searchTerm, columnIndex) {
    const dataRows = table.querySelectorAll("tbody tr");
    dataRows.forEach(row => {
      const cellValue = row.querySelectorAll("td")[columnIndex].textContent.toLowerCase();
      if (cellValue.includes(searchTerm)) {
        row.style.display = "table-row";
      } else {
        row.style.display = "none";
      }
    });
  }
});
