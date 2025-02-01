document.getElementById("scanButton").addEventListener("click", async () => {
    const contractCode = document.getElementById("contractCode").value;

    if (!contractCode.trim()) {
        alert("Please enter Solidity contract code.");
        return;
    }

    try {
        const response = await fetch("https://your-railway-api-url.com/scan", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contractCode })
        });

        const result = await response.json();
        document.getElementById("analysisOutput").textContent = JSON.stringify(result, null, 2);
    } catch (error) {
        document.getElementById("analysisOutput").textContent = "Error scanning contract.";
    }
});
