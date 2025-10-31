const API_URL = "https://ptl8j1f4jh.execute-api.ap-south-1.amazonaws.com/data"; // Replace with your API Gateway URL

// Fetch data from API Gateway
async function fetchData() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        populateTable(data);
        drawChart(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Populate HTML table
function populateTable(data) {
    const tbody = document.querySelector("#dataTable tbody");
    tbody.innerHTML = "";

    data.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.device_id}</td>
            <td>${item.temperature.toFixed(2)}</td>
            <td>${item.humidity.toFixed(2)}</td>
            <td>${item.air_quality.toFixed(2)}</td>
            <td>${item.alert}</td>
            <td>${item.message}</td>
            <td>${new Date(item.timestamp * 1000).toLocaleString()}</td>
        `;
        tbody.appendChild(row);
    });
}

// Draw Chart
function drawChart(data) {
    const ctx = document.getElementById("chartCanvas").getContext("2d");

    const labels = data.map(item => new Date(item.timestamp * 1000).toLocaleTimeString());
    const tempData = data.map(item => item.temperature);
    const humData = data.map(item => item.humidity);

    new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Temperature (°C)",
                    data: tempData,
                    borderColor: "red",
                    fill: false
                },
                {
                    label: "Humidity (%)",
                    data: humData,
                    borderColor: "blue",
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: { display: true },
                y: { display: true }
            }
        }
    });
}

// Initial fetch
fetchData();

// Optional: refresh every 10 seconds for real-time updates
setInterval(fetchData, 10000);
