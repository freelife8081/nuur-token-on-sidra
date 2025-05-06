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

// Connect Wallet and Check Eligibility
const connectWalletButton = document.getElementById("connectWalletButton");
const statusMessage = document.getElementById("statusMessage");
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

    // Initialize Web3
    const web3 = new Web3(provider);

    // Load NUUR Token Contract
    const nuurContract = new web3.eth.Contract(nuurAbi, nuurContractAddress);

    // Fetch NUUR Token Balance
    const balance = await nuurContract.methods.balanceOf(userAddress).call();
    const formattedBalance = balance / Math.pow(10, 18); // Assuming NUUR token has 18 decimals

    // Check Eligibility
    if (formattedBalance > 200000) {
      statusMessage.innerHTML = `
        🎉 Congratulations! You're eligible for the airdrop. You will receive your share after listing.<br>
        Your NUUR balance: ${formattedBalance.toLocaleString()} NUUR.
      `;
    } else {
      statusMessage.innerHTML = `
        ❌ Sorry, you're not eligible for airdrop. You have less than 200K NUUR. Buy now to be eligible. <br>
        Your NUUR balance: ${formattedBalance.toLocaleString()} NUUR.
      `;
    }
  } catch (error) {
    console.error(error);
    statusMessage.innerText = "An error occurred while connecting your wallet. Please try again.";
  }
});
