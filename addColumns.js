document.addEventListener("DOMContentLoaded", function() {
    const numColumnsInput = document.getElementById("numColumns");
    const addColumnButton = document.getElementById("addColumnButton");
    const table = document.querySelector(".data-table");

    addColumnButton.addEventListener("click", function() {
        const numColumns = parseInt(numColumnsInput.value);
        if (!isNaN(numColumns) && numColumns > 0) {
            for (let i = 0; i < numColumns; i++) {
                let columnName;
                if (i === 0) {
                    columnName = prompt("Enter name for the first column:");
                } else {
                    columnName = prompt(`Enter name for the ${ordinalSuffix(i + 1)} column:`);
                }
                if (columnName !== null && columnName.trim() !== "") {
                    addColumn(columnName);
                } else {
                    alert("Please enter a valid name for the new column.");
                    return; 
                }
            }
            numColumnsInput.value = "";
        } else {
            alert("Please enter a valid number of columns.");
        }
    });

    function addColumn(columnName) {
        const headerRow = table.querySelector("thead tr");
        const lastHeaderCell = headerRow.lastElementChild;
        const newHeaderCell = document.createElement("th");
        newHeaderCell.textContent = columnName;
        headerRow.insertBefore(newHeaderCell, lastHeaderCell);

        const dataRows = table.querySelectorAll("tbody tr");
        dataRows.forEach(row => {
            const lastDataCell = row.lastElementChild;
            const newDataCell = document.createElement("td");
            newDataCell.textContent = "";
            row.insertBefore(newDataCell, lastDataCell);
        });
    }

    function ordinalSuffix(num) {
        const suffixes = ["th", "st", "nd", "rd"];
        const remainder = num % 100;
        return num + (suffixes[(remainder - 20) % 10] || suffixes[remainder] || suffixes[0]);
    }
});
