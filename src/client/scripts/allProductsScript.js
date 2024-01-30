function getAllOrders() {
  fetch("http://localhost:8080/orders")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch orders. Status: ${response.status}`);
      }
      return response.json();
    })
    .then((orders) => fillTable(orders))
    .catch((error) => console.error("Error fetching orders:", error.message));
}

function fillTable(orders) {
    const tableBody = document.getElementById("ordersBody");
    const filteredOrders = orders.filter(order => order.deliver !== "Entregado");

    filteredOrders.forEach((order) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${order.user[0] ? order.user[0].firstName : 'N/A'} ${order.user[0] ? order.user[0].lastName : 'N/A'}</td>
        <td>${order.description}</td>
        <td>${order.trackingNumber}</td>
        <td>${order.orderState}</td>
        <td>${order.deliver}</td>
        <td>${order.weight}</td>
        <td>${order.price}</td>
        <td>${order.cancelled=== true?'Si':'No'}</td>
        <td><button onclick="editOrder('${order._id}')">Editar</button></td>
      `;
  
      tableBody.appendChild(row);
    });
  }
  
  
  
