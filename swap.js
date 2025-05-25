// Configuration: Replace with your actual addresses and ABI arrays
const ROUTER_ADDRES = '0xC9B0dDBd6a93f8C623428BA39511e210Ff9B327F';
const NUUR_ADDRESS = '0x99110619B49fc1B1d7508c0244d17ef32859CA59';
const ROUTER_ABI = [{"inputs":[{"internalType":"address","name":"_nuurToken","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newFee","type":"uint256"}],"name":"FeeUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"provider","type":"address"},{"indexed":false,"internalType":"uint256","name":"sdaAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"nuurAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"liquidity","type":"uint256"}],"name":"LiquidityAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"provider","type":"address"},{"indexed":false,"internalType":"uint256","name":"sdaAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"nuurAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"liquidity","type":"uint256"}],"name":"LiquidityRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"bool","name":"isSdaToNuur","type":"bool"},{"indexed":false,"internalType":"uint256","name":"amountIn","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amountOut","type":"uint256"}],"name":"Swap","type":"event"},{"inputs":[],"name":"FEE_DENOMINATOR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MINIMUM_LIQUIDITY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"minNuurAmount","type":"uint256"}],"name":"addLiquidity","outputs":[{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"reserveIn","type":"uint256"},{"internalType":"uint256","name":"reserveOut","type":"uint256"}],"name":"getAmountOut","outputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getReserves","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"liquidityBalances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nuurReserve","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nuurToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"minSdaAmount","type":"uint256"},{"internalType":"uint256","name":"minNuurAmount","type":"uint256"}],"name":"removeLiquidity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"sdaReserve","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"newFee","type":"uint256"}],"name":"setSwapFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"swapFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"nuurAmount","type":"uint256"},{"internalType":"uint256","name":"minSdaOut","type":"uint256"}],"name":"swapNuurForSda","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"minNuurOut","type":"uint256"}],"name":"swapSdaForNuur","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"totalLiquidity","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];
const TOKEN_ABI = [{"inputs":[{"internalType":"address","name":"recipient","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"allowance","type":"uint256"},{"internalType":"uint256","name":"needed","type":"uint256"}],"name":"ERC20InsufficientAllowance","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"needed","type":"uint256"}],"name":"ERC20InsufficientBalance","type":"error"},{"inputs":[{"internalType":"address","name":"approver","type":"address"}],"name":"ERC20InvalidApprover","type":"error"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"}],"name":"ERC20InvalidReceiver","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"}],"name":"ERC20InvalidSender","type":"error"},{"inputs":[{"internalType":"address","name":"spender","type":"address"}],"name":"ERC20InvalidSpender","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];
const CHAIN_ID = 97453; // Replace with your chain ID

let provider, signer, routerContract, nuurContract, userAddress;
let isSdaToNuur = true; // Swap direction: true = SDA→NUUR, false = NUUR→SDA
let slippage = 0.05; // percent

window.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  setupSlippageUI();
  if (typeof window.ethereum !== 'undefined') {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    routerContract = new ethers.Contract(ROUTER_ADDRESS, ROUTER_ABI, provider);
    nuurContract = new ethers.Contract(NUUR_ADDRESS, TOKEN_ABI, provider);
  }
  updateSwapUI();
});

function setupEventListeners() {
  document.getElementById('connectWallet').onclick = connectWallet;
  document.getElementById('swapButton').onclick = swap;
  document.getElementById('fromAmount').oninput = updateToAmount;
  document.getElementById('switchTokens').onclick = () => {
    isSdaToNuur = !isSdaToNuur;
    updateSwapUI();
    updateToAmount();
  };
}

function setupSlippageUI() {
  const slider = document.getElementById('slippageSlider');
  const input = document.getElementById('slippageInput');

  // Set initial values
  slider.value = slippage;
  input.value = slippage;

  slider.addEventListener('input', (e) => {
    let v = parseFloat(e.target.value);
    slippage = v;
    input.value = v;
    input.style.color = '#2980b9';
  });

  input.addEventListener('input', (e) => {
    let v = parseFloat(e.target.value);
    if (!isNaN(v) && v > 0) {
      slippage = v;
      if (v > parseFloat(slider.max)) {
        slider.value = slider.max;
      } else if (v < parseFloat(slider.min)) {
        slider.value = slider.min;
      } else {
        slider.value = v;
      }
      input.style.color = '#2980b9';
    } else {
      input.style.color = '#dc2626';
    }
  });

  input.addEventListener('blur', (e) => {
    // Clamp value within slider min/max on blur
    let v = parseFloat(input.value);
    if (isNaN(v) || v < parseFloat(slider.min)) v = parseFloat(slider.min);
    if (v > parseFloat(slider.max)) v = parseFloat(slider.max);
    input.value = v;
    slider.value = v;
    slippage = v;
    input.style.color = '#2980b9';
  });
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
    document.getElementById('swapButton').disabled = false;
    await updateBalances();
  } catch (e) {
    showError(e.message || 'Wallet connection failed');
  }
}

async function updateBalances() {
  if (!userAddress) return;
  try {
    const sdaBalance = await provider.getBalance(userAddress);
    const nuurBalance = await nuurContract.balanceOf(userAddress);
    // SDA is native, NUUR is ERC20
    if (isSdaToNuur) {
      document.getElementById('fromTokenBalance').textContent = ethers.utils.formatEther(sdaBalance);
      document.getElementById('toTokenBalance').textContent = ethers.utils.formatEther(nuurBalance);
    } else {
      document.getElementById('fromTokenBalance').textContent = ethers.utils.formatEther(nuurBalance);
      document.getElementById('toTokenBalance').textContent = ethers.utils.formatEther(sdaBalance);
    }
  } catch (e) {
    showError('Could not fetch balances');
  }
}

function updateSwapUI() {
  // Update token symbols and logos
  if (isSdaToNuur) {
    document.getElementById('fromTokenSymbol').textContent = 'SDA';
    document.getElementById('fromTokenLogo').src = 'sidra.png';
    document.getElementById('toTokenSymbol').textContent = 'NUUR';
    document.getElementById('toTokenLogo').src = 'logo.png';
    document.getElementById('fromTokenSymbolRate').textContent = 'SDA';
    document.getElementById('toTokenSymbolRate').textContent = 'NUUR';
    document.getElementById('fromAmount').placeholder = '0.0';
    document.getElementById('fromAmount').value = '';
    document.getElementById('toAmount').placeholder = '0.0';
    document.getElementById('toAmount').value = '';
  } else {
    document.getElementById('fromTokenSymbol').textContent = 'NUUR';
    document.getElementById('fromTokenLogo').src = 'logo.png';
    document.getElementById('toTokenSymbol').textContent = 'SDA';
    document.getElementById('toTokenLogo').src = 'sidra.png';
    document.getElementById('fromTokenSymbolRate').textContent = 'NUUR';
    document.getElementById('toTokenSymbolRate').textContent = 'SDA';
    document.getElementById('fromAmount').placeholder = '0.0';
    document.getElementById('fromAmount').value = '';
    document.getElementById('toAmount').placeholder = '0.0';
    document.getElementById('toAmount').value = '';
  }
  updateBalances();
}

async function updateToAmount() {
  if (!routerContract) return;
  const fromAmount = document.getElementById('fromAmount').value;
  if (!fromAmount || parseFloat(fromAmount) <= 0) {
    document.getElementById('toAmount').value = '';
    document.getElementById('exchangeRate').textContent = '0.00';
    return;
  }
  try {
    const amountIn = ethers.utils.parseEther(fromAmount);
    const [sdaReserve, nuurReserve] = await routerContract.getReserves();
    let amountOut, rate;
    if (isSdaToNuur) {
      // SDA → NUUR
      amountOut = await routerContract.getAmountOut(amountIn, sdaReserve, nuurReserve);
      rate = amountOut.mul(ethers.utils.parseEther('1')).div(amountIn);
    } else {
      // NUUR → SDA
      amountOut = await routerContract.getAmountOut(amountIn, nuurReserve, sdaReserve);
      rate = amountOut.mul(ethers.utils.parseEther('1')).div(amountIn);
    }
    document.getElementById('toAmount').value = ethers.utils.formatEther(amountOut);
    document.getElementById('exchangeRate').textContent = ethers.utils.formatEther(rate);
  } catch (e) {
    document.getElementById('toAmount').value = '';
    document.getElementById('exchangeRate').textContent = '0.00';
  }
}

async function swap() {
  if (!userAddress || !routerContract) return;
  try {
    const fromAmount = document.getElementById('fromAmount').value;
    if (!fromAmount || parseFloat(fromAmount) <= 0)
      throw new Error('Please enter a valid amount');
    const amountIn = ethers.utils.parseEther(fromAmount);
    const [sdaReserve, nuurReserve] = await routerContract.getReserves();

    if (isSdaToNuur) {
      // SDA → NUUR
      const amountOut = await routerContract.getAmountOut(amountIn, sdaReserve, nuurReserve);
      const minNuurOut = amountOut.mul(Math.floor((1 - slippage / 100) * 10000)).div(10000);
      const tx = await routerContract.swapSdaForNuur(
        minNuurOut,
        { value: amountIn }
      );
      await tx.wait();
    } else {
      // NUUR → SDA
      const amountOut = await routerContract.getAmountOut(amountIn, nuurReserve, sdaReserve);
      const minSdaOut = amountOut.mul(Math.floor((1 - slippage / 100) * 10000)).div(10000);
      // Approve router to spend NUUR
      const approveTx = await nuurContract.approve(ROUTER_ADDRESS, amountIn);
      await approveTx.wait();
      const tx = await routerContract.swapNuurForSda(
        amountIn,
        minSdaOut
      );
      await tx.wait();
    }
    await updateBalances();
    document.getElementById('fromAmount').value = '';
    document.getElementById('toAmount').value = '';
  } catch (e) {
    showError(e.message || 'Swap failed');
  }
}

function showError(msg) {
  const div = document.getElementById('errorMessage');
  div.textContent = msg;
  div.classList.add('visible');
  setTimeout(() => div.classList.remove('visible'), 5000);
          }
