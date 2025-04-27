<script>
  let web3;
  let accounts;

  // Replace with your deployed Presale Contract address
  const presaleAddress = '0x814bc34460590413664747336cCB5e54141cD8dA';

  // Replace with your actual NUR token contract address
  const tokenAddress = '0x3f2C99C23eE666096d2cFda162A4bFBcC4AE8de8';

  const presaleABI = [{"inputs":[{"internalType":"address","name":"_noorToken","type":"address"},{"internalType":"address","name":"_devWallet","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"buyer","type":"address"},{"indexed":false,"internalType":"uint256","name":"sdaAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"noorAmount","type":"uint256"}],"name":"TokensPurchased","type":"event"},{"inputs":[],"name":"buyNoor","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"devWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"noorToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newRate","type":"uint256"}],"name":"setRate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawETH","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawNoor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];

  async function connectWallet() {
    if (window.ethereum) {
      web3 = new Web3(window.ethereum);
      try {
        accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        document.getElementById('connectBtn').innerText = "Wallet Connected";
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  }

  document.getElementById('connectBtn').addEventListener('click', connectWallet);

  document.getElementById('sdaAmount').addEventListener('input', function() {
    const sda = parseFloat(this.value) || 0;
    document.getElementById('noorAmount').innerText = (sda / 0.001).toLocaleString();
  });

  async function buyTokens() {
    const sdaAmount = document.getElementById('sdaAmount').value;
    if (!web3 || !accounts) {
      alert("Please connect your wallet first!");
      return;
    }

    if (!sdaAmount || sdaAmount < 1 || sdaAmount > 100) {
      alert("The SDA amount must be between 1 and 100.");
      return;
    }

    const amountInWei = web3.utils.toWei(sdaAmount, 'ether');
    const contract = new web3.eth.Contract(presaleABI, presaleAddress);

    try {
      const tx = await contract.methods.buyTokens().send({
        from: accounts[0],
        value: amountInWei
      });

      const hash = tx.transactionHash;
      const url = `https://ledger.sidrachain.com/tx/${hash}`;
      alert(
        `Transaction successful! You bought ${(sdaAmount / 0.001).toLocaleString()} NUUR tokens.\n\n` +
        `Check it on the Sidra Chain Ledger:\n${url}`
      );

      // After success, ask if they want to add NOOR token to MetaMask
      if (
        window.ethereum &&
        confirm("Would you like to add NOOR token to your wallet?")
      ) {
        await addTokenToWallet();
      }

    } catch (error) {
      console.error(error);
      alert("Transaction failed! Please check your input or network.");
    }
  }

  async function addTokenToWallet() {
    try {
      const wasAdded = await ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20', // 🦊
          options: {
            address: 0x3f2C99C23eE666096d2cFda162A4bFBcC4AE8de8, // The address of the NUR token contract
            symbol: 'NUUR',       // A ticker symbol or shorthand, up to 5 chars
            decimals: 18,         // The number of token decimals
            image: 'https://nuurtoken.site/logo.png', // URL to token logo
          },
        },
      });

      if (wasAdded) {
        alert('NUUR token successfully added to your wallet!');
      } else {
        alert('Token not added.');
      }
    } catch (err) {
      console.error(err);
      alert('There was an error adding the token to your wallet.');
    }
  }
</script>
