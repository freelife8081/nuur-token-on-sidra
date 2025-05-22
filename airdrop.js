// Check session storage on page load
document.addEventListener("DOMContentLoaded", () => {
    // Check if user has already visited and been eligible
    if (sessionStorage.getItem("nuurEligibilityChecked")) {
        window.location.href = "airdropsnap";
        return;
    }

    // Create and append user info elements
    const userInfoDiv = document.createElement("div");
    userInfoDiv.className = "user-info";
    userInfoDiv.innerHTML = `
        Welcome, ${currentUser}
        <div class="timestamp">UTC: ${currentUTCTime}</div>
    `;
    document.body.insertBefore(userInfoDiv, document.body.firstChild);

    // Add styles if they don't exist
    if (!document.querySelector('#userInfoStyles')) {
        const styleSheet = document.createElement("style");
        styleSheet.id = 'userInfoStyles';
        styleSheet.textContent = `
            .user-info {
                position: fixed;
                top: 20px;
                right: 20px;
                background: rgba(0,0,0,0.45);
                padding: 10px 20px;
                border-radius: 12px;
                font-size: 0.9rem;
                color: white;
                text-align: right;
                z-index: 1000;
                animation: fadeIn 1s ease;
            }
            
            .timestamp {
                font-size: 0.8rem;
                opacity: 0.8;
                margin-top: 5px;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            @media (max-width: 650px) {
                .user-info {
                    position: relative;
                    top: 10px;
                    right: auto;
                    margin: 10px auto;
                    max-width: 300px;
                    text-align: center;
                }
            }
        `;
        document.head.appendChild(styleSheet);
    }
});

// NUUR Token Contract Address and Minimal ABI
const nuurContractAddress = "0x003BEc2e6ef4369f9d968eCD288d31B59fD9c2CD";
const nuurAbi = [
    {
        "constant": true,
        "inputs": [{ "name": "account", "type": "address" }],
        "name": "balanceOf",
        "outputs": [{ "name": "", "type": "uint256" }],
        "type": "function"
    }
];

// Elements
const connectWalletButton = document.getElementById("connectWalletButton");
const loadingMessage = document.getElementById("loadingMessage");
const statusMessage = document.getElementById("statusMessage");
const balanceMessage = document.getElementById("balanceMessage");
const provider = window.ethereum;

connectWalletButton.addEventListener("click", async () => {
    if (!provider) {
        statusMessage.innerText = "MetaMask not detected. Please open in MetaMask browser.";
        return;
    }

    try {
        // Request wallet connection
        const accounts = await provider.request({ method: "eth_requestAccounts" });
        const userAddress = accounts[0];

        // Disable the button and change text
        connectWalletButton.innerText = "Wallet is Connected";
        connectWalletButton.disabled = true;

        // Initialize Web3
        const web3 = new Web3(provider);

        // Load NUUR Token Contract
        const nuurContract = new web3.eth.Contract(nuurAbi, nuurContractAddress);

        // Display sequential loading messages
        loadingMessage.innerText = "Checking your Wallet...";
        await new Promise((resolve) => setTimeout(resolve, 3000));

        loadingMessage.innerText = "Checking your NUUR Balance...";
        const balance = await nuurContract.methods.balanceOf(userAddress).call();
        const formattedBalance = balance / Math.pow(10, 18); // Assuming NUUR token has 18 decimals

        await new Promise((resolve) => setTimeout(resolve, 3000));
        loadingMessage.innerText = "Finalizing Result...";
        await new Promise((resolve) => setTimeout(resolve, 5000));

        // Clear loading message
        loadingMessage.innerText = "";

        // Display NUUR balance
        balanceMessage.innerHTML = `Your NUUR Balance: ${formattedBalance.toLocaleString()} NUUR`;

        // Check Eligibility and include timestamp in messages
        if (formattedBalance > 200000) {
            // Store eligibility in session storage
            sessionStorage.setItem("nuurEligibilityChecked", "true");
            sessionStorage.setItem("nuurBalance", formattedBalance.toString());
            sessionStorage.setItem("lastCheckTime", currentUTCTime);
            sessionStorage.setItem("userAddress", userAddress);

            statusMessage.innerHTML = `
                🎉 Congratulations! You're eligible for the airdrop. Please visit <a style="color:red" href="airdropsnap">here</a> to claim your share.<br>
                <small style="opacity: 0.8;">Checked at: ${currentUTCTime}</small>
            `;

            // Redirect after 3 seconds
            setTimeout(() => {
                window.location.href = "airdropsnap";
            }, 3000);
        } else {
            statusMessage.innerHTML = `
                ❌ Sorry, your NUUR balance is less than 200K. Buy now to be eligible.<br>
                <small style="opacity: 0.8;">Checked at: ${currentUTCTime}</small>
            `;
        }

        // Log the transaction with user info
        console.log(`Balance check performed by ${currentUser} at ${currentUTCTime}`);

    } catch (error) {
        console.error(`Error occurred for user ${currentUser} at ${currentUTCTime}:`, error);
        statusMessage.innerText = "An error occurred while connecting your wallet. Please try again.";
    }
});

// Function to clear session storage (can be called when needed)
function clearNuurSession() {
    sessionStorage.removeItem("nuurEligibilityChecked");
    sessionStorage.removeItem("nuurBalance");
    sessionStorage.removeItem("lastCheckTime");
    sessionStorage.removeItem("userAddress");
}
