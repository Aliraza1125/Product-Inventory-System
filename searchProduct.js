document.addEventListener("DOMContentLoaded", function() {
  const searchInput = document.getElementById("searchInput");
  const table = document.querySelector(".data-table");

  searchInput.addEventListener("input", function() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    filterProducts(searchTerm);
  });

  function filterProducts(searchTerm) {
    const dataRows = table.querySelectorAll("tbody tr");
    dataRows.forEach(row => {
      const productName = row.querySelector("td:nth-child(3)").textContent.toLowerCase(); 
      if (productName.includes(searchTerm)) {
        row.style.display = "table-row";
      } else {
        row.style.display = "none";
      }
    });
  }
});