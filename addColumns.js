document.addEventListener("DOMContentLoaded", function() {
    const table = document.querySelector(".data-table");
    const selectColumn = document.getElementById("selectColumn");
    let selectedColumns = []; 
    const numColumns = 14; 

    selectColumn.addEventListener("change", function() {
        const selectedColumn = selectColumn.value;
        addColumn(selectedColumn);
    });

    function addColumn(selectedColumn) {
        const columnIndex = getColumnIndex(selectedColumn);

        if (!selectedColumns.includes(columnIndex)) {
            selectedColumns.push(columnIndex);

            selectedColumns.sort((a, b) => a - b);

            const columnWidth = 100 / numColumns;

            const headerCells = document.querySelectorAll(".data-table th");
            headerCells.forEach((cell, index) => {
                cell.style.width = `${columnWidth}%`;
                if (selectedColumns.includes(index) || index === 0 || index === 1) {
                    cell.style.display = "table-cell";
                } else {
                    cell.style.display = "none";
                }
            });

            const dataRows = table.querySelectorAll("tbody tr");
            dataRows.forEach(row => {
                const cells = row.querySelectorAll("td");
                cells.forEach((cell, index) => {
                    cell.style.width = `${columnWidth}%`;
                    if (selectedColumns.includes(index) || index === 0 || index === 1) {
                        cell.style.display = "table-cell";
                    } else {
                        cell.style.display = "none";
                    }
                });
            });
        }
    }

    function getColumnIndex(selectedColumn) {
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
});
