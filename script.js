// document.getElementById("scanButton").addEventListener("click", async () => {
//     const contractCode = document.getElementById("contractCode").value;

//     if (!contractCode.trim()) {
//         alert("Please enter Solidity contract code.");
//         return;
//     }

//     try {
//         const response = await fetch("https://your-railway-api-url.com/scan", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ contractCode })
//         });

//         const result = await response.json();
//         document.getElementById("analysisOutput").textContent = JSON.stringify(result, null, 2);
//     } catch (error) {
//         document.getElementById("analysisOutput").textContent = "Error scanning contract.";
//     }
// });

document.getElementById("scanButton").addEventListener("click", async () => {
    const contractCode = document.getElementById("contractCode").value;
    const analysisOutput = document.getElementById("analysisOutput");
    const downloadButton = document.getElementById("downloadPdfButton");

    if (!contractCode.trim()) {
        alert("Please enter Solidity contract code.");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/scan", { // Backend URL
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contractCode })
        });

        const result = await response.json();
        analysisOutput.textContent = JSON.stringify(result, null, 2);
        downloadButton.classList.remove("hidden"); // Show Download PDF Button

    } catch (error) {
        analysisOutput.textContent = "Error scanning contract.";
        downloadButton.classList.add("hidden");
    }
});

// PDF Generation
document.getElementById("downloadPdfButton").addEventListener("click", () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("🛡️ ShieldChain - Security Report", 20, 20);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text("Analysis Result:", 20, 30);

    const analysisOutput = document.getElementById("analysisOutput").textContent;
    const splitText = doc.splitTextToSize(analysisOutput, 180);
    doc.text(splitText, 20, 40);

    doc.save("ShieldChain_Security_Report.pdf");
});
