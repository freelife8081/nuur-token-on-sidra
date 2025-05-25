// Configuration: replace these with your actual addresses and ABIs
const ROUTER_ADDRESS = '0xC9B0dDBd6a93f8C623428BA39511e210Ff9B327F';
const NUUR_ADDRESS = '0x99110619B49fc1B1d7508c0244d17ef32859CA59';
const ROUTER_ABI = [{"inputs":[{"internalType":"address","name":"_nuurToken","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newFee","type":"uint256"}],"name":"FeeUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"provider","type":"address"},{"indexed":false,"internalType":"uint256","name":"sdaAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"nuurAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"liquidity","type":"uint256"}],"name":"LiquidityAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"provider","type":"address"},{"indexed":false,"internalType":"uint256","name":"sdaAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"nuurAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"liquidity","type":"uint256"}],"name":"LiquidityRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"bool","name":"isSdaToNuur","type":"bool"},{"indexed":false,"internalType":"uint256","name":"amountIn","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amountOut","type":"uint256"}],"name":"Swap","type":"event"},{"inputs":[],"name":"FEE_DENOMINATOR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MINIMUM_LIQUIDITY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"minNuurAmount","type":"uint256"}],"name":"addLiquidity","outputs":[{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"reserveIn","type":"uint256"},{"internalType":"uint256","name":"reserveOut","type":"uint256"}],"name":"getAmountOut","outputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getReserves","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"liquidityBalances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nuurReserve","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nuurToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"minSdaAmount","type":"uint256"},{"internalType":"uint256","name":"minNuurAmount","type":"uint256"}],"name":"removeLiquidity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"sdaReserve","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"newFee","type":"uint256"}],"name":"setSwapFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"swapFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"nuurAmount","type":"uint256"},{"internalType":"uint256","name":"minSdaOut","type":"uint256"}],"name":"swapNuurForSda","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"minNuurOut","type":"uint256"}],"name":"swapSdaForNuur","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"totalLiquidity","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];
const TOKEN_ABI = [{"inputs":[{"internalType":"address","name":"recipient","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"allowance","type":"uint256"},{"internalType":"uint256","name":"needed","type":"uint256"}],"name":"ERC20InsufficientAllowance","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"needed","type":"uint256"}],"name":"ERC20InsufficientBalance","type":"error"},{"inputs":[{"internalType":"address","name":"approver","type":"address"}],"name":"ERC20InvalidApprover","type":"error"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"}],"name":"ERC20InvalidReceiver","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"}],"name":"ERC20InvalidSender","type":"error"},{"inputs":[{"internalType":"address","name":"spender","type":"address"}],"name":"ERC20InvalidSpender","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];
const CHAIN_ID = 97453; // Your chain ID

let provider, signer, routerContract, nuurContract, userAddress;

window.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  if (typeof window.ethereum !== 'undefined') {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    routerContract = new ethers.Contract(ROUTER_ADDRESS, ROUTER_ABI, provider);
    nuurContract = new ethers.Contract(NUUR_ADDRESS, TOKEN_ABI, provider);
  }
});

function setupEventListeners() {
  document.getElementById('connectWallet').onclick = connectWallet;
  document.getElementById('addLiquidityButton').onclick = addLiquidity;
  document.getElementById('sdaAmount').oninput = updateNuurAmount;
  document.getElementById('nuurAmount').oninput = updateSdaAmount;
}

async function connectWallet() {
  try {
    await provider.send('eth_requestAccounts', []);
    signer = provider.getSigner();
    userAddress = await signer.getAddress();
    routerContract = routerContract.connect(signer);
    nuurContract = nuurContract.connect(signer);

    document.getElementById('connectWallet').style.display = 'none';
    document.getElementById('walletAddress').textContent = `${userAddress.slice(0,6)}...${userAddress.slice(-4)}`;
    document.getElementById('walletAddress').classList.add('connected');
    document.getElementById('addLiquidityButton').disabled = false;
    await updateBalances();
    await updateLiquidityPositions();
  } catch (e) {
    showError(e.message || 'Wallet connection failed');
  }
}

async function updateBalances() {
  if (!userAddress) return;
  try {
    const sdaBalance = await provider.getBalance(userAddress);
    const nuurBalance = await nuurContract.balanceOf(userAddress);
    document.getElementById('sdaLiquidityBalance').textContent = ethers.utils.formatEther(sdaBalance);
    document.getElementById('nuurLiquidityBalance').textContent = ethers.utils.formatEther(nuurBalance);
  } catch (e) {
    showError('Could not fetch balances');
  }
}

async function updateLiquidityPositions() {
  if (!userAddress || !routerContract) return;
  try {
    const liquidityBalance = await routerContract.liquidityBalances(userAddress);
    const totalLiquidity = await routerContract.totalLiquidity();
    const positionsDiv = document.getElementById('liquidityPositions');
    if (liquidityBalance.gt(0)) {
      const [sdaReserve, nuurReserve] = await routerContract.getReserves();
      const share = liquidityBalance.mul(100).div(totalLiquidity);
      const sdaAmount = sdaReserve.mul(liquidityBalance).div(totalLiquidity);
      const nuurAmount = nuurReserve.mul(liquidityBalance).div(totalLiquidity);
      positionsDiv.innerHTML = `
        <div class="liquidity-position">
          <h3>Your Liquidity Position</h3>
          <p>Share of Pool: ${ethers.utils.formatUnits(share, 2)}%</p>
          <p>SDA: ${ethers.utils.formatEther(sdaAmount)}</p>
          <p>NUUR: ${ethers.utils.formatEther(nuurAmount)}</p>
        </div>
      `;
    } else {
      positionsDiv.innerHTML = '<p>No liquidity positions found</p>';
    }
  } catch (e) {
    showError('Failed to update liquidity positions');
  }
}

async function addLiquidity() {
  if (!userAddress || !routerContract) return;
  try {
    const sdaAmountStr = document.getElementById('sdaAmount').value;
    const nuurAmountStr = document.getElementById('nuurAmount').value;
    if (!sdaAmountStr || !nuurAmountStr || parseFloat(sdaAmountStr) <= 0 || parseFloat(nuurAmountStr) <= 0) {
      throw new Error('Please enter valid amounts');
    }
    const sdaValue = ethers.utils.parseEther(sdaAmountStr);
    const nuurValue = ethers.utils.parseEther(nuurAmountStr);

    // Approve the router to spend the NUUR first
    const approveTx = await nuurContract.approve(ROUTER_ADDRESS, nuurValue);
    await approveTx.wait();

    // Add liquidity
    const tx = await routerContract.addLiquidity(
      nuurValue,
      { value: sdaValue }
    );
    await tx.wait();
    await updateBalances();
    await updateLiquidityPositions();
    document.getElementById('sdaAmount').value = '';
    document.getElementById('nuurAmount').value = '';
  } catch (e) {
    showError(e.message || 'Add liquidity failed');
  }
}

// When user enters SDA, auto-fill required NUUR (proportional to reserves)
async function updateNuurAmount() {
  if (!routerContract) return;
  const sdaAmountStr = document.getElementById('sdaAmount').value;
  if (!sdaAmountStr || parseFloat(sdaAmountStr) <= 0) {
    document.getElementById('nuurAmount').value = '';
    return;
  }
  try {
    const sdaValue = ethers.utils.parseEther(sdaAmountStr);
    const [sdaReserve, nuurReserve] = await routerContract.getReserves();
    if (sdaReserve.isZero()) {
      document.getElementById('nuurAmount').value = '';
      return;
    }
    const nuurNeeded = sdaValue.mul(nuurReserve).div(sdaReserve);
    document.getElementById('nuurAmount').value = ethers.utils.formatEther(nuurNeeded);
  } catch (e) {
    document.getElementById('nuurAmount').value = '';
  }
}

// When user enters NUUR, auto-fill required SDA (proportional to reserves)
async function updateSdaAmount() {
  if (!routerContract) return;
  const nuurAmountStr = document.getElementById('nuurAmount').value;
  if (!nuurAmountStr || parseFloat(nuurAmountStr) <= 0) {
    document.getElementById('sdaAmount').value = '';
    return;
  }
  try {
    const nuurValue = ethers.utils.parseEther(nuurAmountStr);
    const [sdaReserve, nuurReserve] = await routerContract.getReserves();
    if (nuurReserve.isZero()) {
      document.getElementById('sdaAmount').value = '';
      return;
    }
    const sdaNeeded = nuurValue.mul(sdaReserve).div(nuurReserve);
    document.getElementById('sdaAmount').value = ethers.utils.formatEther(sdaNeeded);
  } catch (e) {
    document.getElementById('sdaAmount').value = '';
  }
}

function showError(msg) {
  const div = document.getElementById('errorMessage');
  div.textContent = msg;
  div.classList.add('visible');
  setTimeout(() => div.classList.remove('visible'), 5000);
}
