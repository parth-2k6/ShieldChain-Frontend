const API_URL = "https://shield-chain-backend.vercel.app/api/scan"; 

document.getElementById("scanButton").addEventListener("click", async () => {
    const contractCode = document.getElementById("contractCode").value;
    const analysisOutput = document.getElementById("analysisOutput");
    const downloadButton = document.getElementById("downloadPdfButton");

    if (!contractCode.trim()) {
        alert("⚠️ Please enter Solidity contract code.");
        return;
    }

   
    analysisOutput.textContent = "🔄 Analyzing smart contract...";
    downloadButton.classList.add("hidden");

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contractCode })
        });

        if (!response.ok) {
            throw new Error("Server responded with an error.");
        }

        const result = await response.json();

        const formattedResult = JSON.stringify(result, null, 4);

        analysisOutput.textContent = formattedResult;

        downloadButton.classList.remove("hidden");

    } catch (error) {
        analysisOutput.textContent = "❌ Error scanning contract.";
        downloadButton.classList.add("hidden");
    }
});

// PDF Generation
document.getElementById("downloadPdfButton").addEventListener("click", () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFont("courier", "normal");
    doc.setFontSize(10);

    doc.text("🛡️ ShieldChain - AI Security Report", 20, 20);
    doc.text("🔍 Analysis Result:", 20, 30);

    const analysisOutput = document.getElementById("analysisOutput").textContent;

    const splitText = doc.splitTextToSize(analysisOutput, 180);
    
    doc.text(splitText, 20, 40);

    doc.save("ShieldChain_Security_Report.pdf");
});


