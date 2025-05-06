// NUUR Token Contract Address and Minimal ABI
const nuurContractAddress = "0x003BEc2e6ef4369f9d968eCD288d31B59fD9c2CD"; // Replace with the real NUUR contract address
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
    statusMessage.innerText = "MetaMask is not installed. Please install MetaMask to proceed.";
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
    loadingMessage.innerText = "Checking Connected Wallet...";
    await new Promise((resolve) => setTimeout(resolve, 2000));

    loadingMessage.innerText = "Checking NUUR Balance...";
    const balance = await nuurContract.methods.balanceOf(userAddress).call();
    const formattedBalance = balance / Math.pow(10, 18); // Assuming NUUR token has 18 decimals

    await new Promise((resolve) => setTimeout(resolve, 2000));
    loadingMessage.innerText = "Finalizing Result...";
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Clear loading message
    loadingMessage.innerText = "";

    // Display NUUR balance
    balanceMessage.innerHTML = `Your NUUR Balance: ${formattedBalance.toLocaleString()} NUUR`;

    // Check Eligibility
    if (formattedBalance > 200000) {
      statusMessage.innerHTML = `
        🎉 Congratulations! You're eligible for the airdrop. You will receive on listing day<br>
      `;
    } else {
      statusMessage.innerHTML = `
        ❌ Sorry, your NUUR balance is less than 200K. Buy now to be eligible. <br>
      `;
    }
  } catch (error) {
    console.error(error);
    statusMessage.innerText = "An error occurred while connecting your wallet. Please try again.";
  }
});
