function deleteProductRow(productId) {
    const confirmed = confirm("Are you sure you want to delete this product?");
    if (!confirmed) {
        return;
    }

    const tbody = document.getElementById("table-body");
    const rows = tbody.querySelectorAll("tr");

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const idCell = row.querySelector("td:nth-child(2)");
        if (idCell.textContent.trim() === productId) {
            row.remove();

            const loggedInUserEmail = localStorage.getItem("loggedInUser");
            const userProducts = JSON.parse(localStorage.getItem(loggedInUserEmail)) || [];

            const productIndex = userProducts.findIndex(p => p.id === productId);

            if (productIndex !== -1) {
                userProducts.splice(productIndex, 1);
                localStorage.setItem(loggedInUserEmail, JSON.stringify(userProducts));
                alert("Product deleted successfully.");
                return;
            } else {
                console.error(`Product with ID ${productId} not found in local storage.`);
                return;
            }
        }
    }

    console.error(`Product with ID ${productId} not found in the table.`);
}

document.getElementById("table-body").addEventListener("click", function(event) {
    if (event.target.classList.contains("button-delete-product")) {
        const productId = event.target.closest("tr").querySelector("td:nth-child(2)").textContent;
        deleteProductRow(productId);
    }
});
