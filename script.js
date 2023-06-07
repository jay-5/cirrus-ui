const apiUrl = "https://node1.mercata-testnet2.blockapps.net/cirrus/search/BlockApps-Dapp-Order?select=ownerCommonName,address,transaction_hash,amountPaid,orderId,owner,status";

function buildTable(selectedFields) {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const tableContainer = document.getElementById("table-container");
      tableContainer.innerHTML = ""; // Clear previous table

      const table = document.createElement("table");
      const headerRow = document.createElement("tr");

      // Create table headers
      selectedFields.forEach(header => {
        const th = document.createElement("th");
        th.textContent = header;
        headerRow.appendChild(th);
      });
      table.appendChild(headerRow);

      // Create table rows
      data.forEach(item => {
        const row = document.createElement("tr");
        selectedFields.forEach(header => {
          const td = document.createElement("td");
          td.textContent = item[header];
          row.appendChild(td);
        });
        table.appendChild(row);
      });

      // Append the table to the container
      tableContainer.appendChild(table);
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
}

document.getElementById("updateTable").addEventListener("click", () => {
  const fieldsSelect = document.getElementById("fields");
  const selectedFields = Array.from(fieldsSelect.selectedOptions).map(option => option.value);
  buildTable(selectedFields);
});