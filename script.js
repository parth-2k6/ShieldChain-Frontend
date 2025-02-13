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

const API_URL = "https://shield-chain-backend.vercel.app/api/scan"; // Replace with your deployed Vercel API URL

document.getElementById("scanButton").addEventListener("click", async () => {
    const contractCode = document.getElementById("contractCode").value;
    const analysisOutput = document.getElementById("analysisOutput");
    const downloadButton = document.getElementById("downloadPdfButton");

    if (!contractCode.trim()) {
        alert("⚠️ Please enter Solidity contract code.");
        return;
    }

    // Show loading state
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

        // Convert response JSON into a pretty-printed format for display
        const formattedResult = JSON.stringify(result, null, 4);

        // Display result in the webpage
        analysisOutput.textContent = formattedResult;

        // Show Download PDF Button
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

    doc.setFont("courier", "normal"); // Use a monospaced font for better JSON readability
    doc.setFontSize(10);

    doc.text("🛡️ ShieldChain - AI Security Report", 20, 20);
    doc.text("🔍 Analysis Result:", 20, 30);

    const analysisOutput = document.getElementById("analysisOutput").textContent;
    
    // Split text into multiple lines to fit in the PDF
    const splitText = doc.splitTextToSize(analysisOutput, 180);
    
    doc.text(splitText, 20, 40);

    doc.save("ShieldChain_Security_Report.pdf");
});

