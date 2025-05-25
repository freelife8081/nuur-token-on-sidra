const CONTRACT_ADDRESSES = {
    ROUTER: "0xC9B0dDBd6a93f8C623428BA39511e210Ff9B327F",
    NUUR: "0x99110619B49fc1B1d7508c0244d17ef32859CA59"
};

let provider, signer, routerContract;
let userAddress;
const CURRENT_USER = 'freelife'; // Hardcoded user for demo

// Initialize UI and start time updates
function initializeUI() {
    // Set initial user display
    const userDisplay = document.querySelector('.user-value');
    if (userDisplay) {
        userDisplay.textContent = CURRENT_USER;
    }

    // Start time updates
    updateDateTime();
    setInterval(updateDateTime, 1000);

    // Set up event listeners
    attachEventListeners();
}

// Format date for display (YYYY-MM-DD HH:MM:SS)
function formatDateTime(date) {
    const pad = (num) => String(num).padStart(2, '0');
    
    const year = date.getUTCFullYear();
    const month = pad(date.getUTCMonth() + 1);
    const day = pad(date.getUTCDate());
    const hours = pad(date.getUTCHours());
    const minutes = pad(date.getUTCMinutes());
    const seconds = pad(date.getUTCSeconds());

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Update the datetime display
function updateDateTime() {
    const timeElement = document.querySelector('.time-value');
    if (timeElement) {
        const now = new Date();
        timeElement.textContent = formatDateTime(now);
    }
}

// Attach event listeners
function attachEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => switchView(btn.dataset.view));
    });

    // Wallet connection
    const connectWalletBtn = document.getElementById('connectWallet');
    if (connectWalletBtn) {
        connectWalletBtn.addEventListener('click', connectWallet);
    }

    // Swap functionality
    const swapBtn = document.getElementById('swapButton');
    if (swapBtn) {
        swapBtn.addEventListener('click', handleSwap);
    }

    // Token switching
    const switchTokensBtn = document.getElementById('switchTokens');
    if (switchTokensBtn) {
        switchTokensBtn.addEventListener('click', handleTokenSwitch);
    }

    // Input validation
    document.querySelectorAll('input[type="number"]').forEach(input => {
        input.addEventListener('input', validateInput);
    });
}

// Switch between views
function switchView(viewName) {
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active');
    });
    
    document.getElementById(`${viewName}View`).classList.add('active');
    
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.view === viewName);
    });
}

// Connect wallet function
async function connectWallet() {
    const connectBtn = document.getElementById('connectWallet');
    
    try {
        if (typeof window.ethereum !== 'undefined') {
            connectBtn.textContent = 'Connecting...';
            connectBtn.disabled = true;

            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            userAddress = accounts[0];
            
            provider = new ethers.providers.Web3Provider(window.ethereum);
            signer = provider.getSigner();
            
            // Initialize contract
            initializeContract();
            
            // Update UI
            updateWalletDisplay();
            await updateBalances();
            
            // Enable trading buttons
            document.getElementById('swapButton').textContent = 'Swap';
            document.getElementById('swapButton').disabled = false;
            document.getElementById('addLiquidityButton').disabled = false;
            document.getElementById('addLiquidityButton').textContent = 'Add Liquidity';

            // Setup event listeners
            window.ethereum.on('accountsChanged', handleAccountsChanged);
            window.ethereum.on('chainChanged', () => window.location.reload());
        } else {
            showError('Please install MetaMask!');
        }
    } catch (error) {
        console.error('Error connecting wallet:', error);
        showError(error.message || 'Failed to connect wallet');
    } finally {
        connectBtn.textContent = 'Connect Wallet';
        connectBtn.disabled = false;
    }
}

// Initialize contract
function initializeContract() {
    const routerABI = [{"inputs":[{"internalType":"address","name":"_nuurToken","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newFee","type":"uint256"}],"name":"FeeUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"provider","type":"address"},{"indexed":false,"internalType":"uint256","name":"sdaAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"nuurAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"liquidity","type":"uint256"}],"name":"LiquidityAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"provider","type":"address"},{"indexed":false,"internalType":"uint256","name":"sdaAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"nuurAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"liquidity","type":"uint256"}],"name":"LiquidityRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"bool","name":"isSdaToNuur","type":"bool"},{"indexed":false,"internalType":"uint256","name":"amountIn","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amountOut","type":"uint256"}],"name":"Swap","type":"event"},{"inputs":[],"name":"FEE_DENOMINATOR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MINIMUM_LIQUIDITY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"minNuurAmount","type":"uint256"}],"name":"addLiquidity","outputs":[{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"reserveIn","type":"uint256"},{"internalType":"uint256","name":"reserveOut","type":"uint256"}],"name":"getAmountOut","outputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getReserves","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"liquidityBalances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nuurReserve","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nuurToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"minSdaAmount","type":"uint256"},{"internalType":"uint256","name":"minNuurAmount","type":"uint256"}],"name":"removeLiquidity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"sdaReserve","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"newFee","type":"uint256"}],"name":"setSwapFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"swapFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"nuurAmount","type":"uint256"},{"internalType":"uint256","name":"minSdaOut","type":"uint256"}],"name":"swapNuurForSda","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"minNuurOut","type":"uint256"}],"name":"swapSdaForNuur","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"totalLiquidity","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]; // Add your router ABI here
    routerContract = new ethers.Contract(CONTRACT_ADDRESSES.ROUTER, routerABI, signer);
}

// Update wallet display
function updateWalletDisplay() {
    const connectBtn = document.getElementById('connectWallet');
    const walletAddr = document.getElementById('walletAddress');
    
    if (userAddress) {
        connectBtn.style.display = 'none';
        walletAddr.textContent = `${userAddress.substring(0, 6)}...${userAddress.substring(38)}`;
        walletAddr.classList.add('connected');
    } else {
        connectBtn.style.display = 'block';
        walletAddr.classList.remove('connected');
    }
}

// Update token balances
async function updateBalances() {
    if (!userAddress) return;

    try {
        // Get SDA balance
        const sdaBalance = await provider.getBalance(userAddress);
        updateBalanceDisplay('fromTokenBalance', sdaBalance);

        // Get NUUR balance
        const nuurContract = new ethers.Contract(
            CONTRACT_ADDRESSES.NUUR,
            ['function balanceOf(address) view returns (uint256)'],
            provider
        );
        const nuurBalance = await nuurContract.balanceOf(userAddress);
        updateBalanceDisplay('toTokenBalance', nuurBalance);
    } catch (error) {
        console.error('Error updating balances:', error);
        showError('Failed to update balances');
    }
}

// Update balance display
function updateBalanceDisplay(elementId, balance) {
    const formatted = ethers.utils.formatEther(balance);
    document.getElementById(elementId).textContent = 
        parseFloat(formatted).toFixed(4);
}

// Handle account changes
function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
        disconnectWallet();
    } else if (accounts[0] !== userAddress) {
        userAddress = accounts[0];
        updateWalletDisplay();
        updateBalances();
    }
}

// Disconnect wallet
function disconnectWallet() {
    userAddress = null;
    provider = null;
    signer = null;
    updateWalletDisplay();
    document.getElementById('swapButton').disabled = true;
    document.getElementById('swapButton').textContent = 'Connect Wallet to Swap';
    document.getElementById('addLiquidityButton').disabled = true;
    document.getElementById('addLiquidityButton').textContent = 'Add Liquidity';
}

// Handle token switch
function handleTokenSwitch() {
    const fromSymbol = document.getElementById('fromTokenSymbol');
    const toSymbol = document.getElementById('toTokenSymbol');
    const fromLogo = document.getElementById('fromTokenLogo');
    const toLogo = document.getElementById('toTokenLogo');
    const fromAmount = document.getElementById('fromAmount');
    const toAmount = document.getElementById('toAmount');
    
    [fromSymbol.textContent, toSymbol.textContent] = [toSymbol.textContent, fromSymbol.textContent];
    [fromLogo.src, toLogo.src] = [toLogo.src, fromLogo.src];
    [fromAmount.value, toAmount.value] = ['', ''];
}

// Validate input
function validateInput(e) {
    const value = e.target.value;
    if (value && (isNaN(value) || parseFloat(value) < 0)) {
        showError('Please enter a valid amount');
        e.target.value = '';
    }
}

// Show error message
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message visible';
    errorDiv.textContent = message;
    
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    const container = document.querySelector('.container');
    container.insertBefore(errorDiv, container.firstChild);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Handle swap
async function handleSwap() {
    if (!userAddress) {
        showError('Please connect your wallet first');
        return;
    }

    const fromAmount = document.getElementById('fromAmount').value;
    const fromToken = document.getElementById('fromTokenSymbol').textContent;
    
    try {
        const amount = ethers.utils.parseEther(fromAmount);
        
        if (fromToken === 'SDA') {
            await swapSDAForNUUR(amount);
        } else {
            await swapNUURForSDA(amount);
        }
        
        await updateBalances();
        document.getElementById('fromAmount').value = '';
        document.getElementById('toAmount').value = '';
    } catch (error) {
        console.error('Swap failed:', error);
        showError(error.message || 'Swap failed. Please try again.');
    }
}

// Initialize when document is loaded
document.addEventListener('DOMContentLoaded', initializeUI);

async function swapSDAForNUUR(amountIn) {
    const path = [await provider.getSigner().getAddress(), CONTRACT_ADDRESSES.NUUR];
    const deadline = Math.floor(Date.now() / 1000) + 60 * 10; // 10 minutes

    const tx = await routerContract.swapExactETHForTokens(
        0, // amountOutMin
        [CONTRACT_ADDRESSES.ROUTER, CONTRACT_ADDRESSES.NUUR],
        userAddress,
        deadline,
        { value: amountIn }
    );

    await tx.wait();
}

async function swapNUURForSDA(amountIn) {
    const deadline = Math.floor(Date.now() / 1000) + 60 * 10;

    // Approve token first
    const nuurContract = new ethers.Contract(
        CONTRACT_ADDRESSES.NUUR,
        ["function approve(address spender, uint256 amount) public returns (bool)"],
        signer
    );
    await nuurContract.approve(CONTRACT_ADDRESSES.ROUTER, amountIn);

    const tx = await routerContract.swapExactTokensForETH(
        amountIn,
        0, // amountOutMin
        [CONTRACT_ADDRESSES.NUUR, CONTRACT_ADDRESSES.ROUTER],
        userAddress,
        deadline
    );

    await tx.wait();
}
