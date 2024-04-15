async function deleteProductRow(productId) {
    const confirmed = confirm("Are you sure you want to delete this product?");
    if (!confirmed) {
        return;
    }

    try {
        const response = await fetch(`http://localhost:3001/api/delete/products/${productId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Failed to delete product');
        }

        const tbody = document.getElementById("table-body");
        const rows = tbody.querySelectorAll("tr");

        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const idCell = row.querySelector("td:nth-child(2)");
            if (idCell.textContent.trim() === productId) {
                row.remove();
                alert("Product deleted successfully.");
                return;
            }
        }

        console.error(`Product with ID ${productId} not found in the table.`);
    } catch (error) {
        console.error('Error deleting product:', error.message);
        alert('Failed to delete product. Please try again.');
    }
}

document.getElementById("table-body").addEventListener("click", async function(event) {
    if (event.target.classList.contains("button-delete-product")) {
        const productId = event.target.closest("tr").querySelector("td:nth-child(2)").textContent;
        await deleteProductRow(productId);
    }
});
