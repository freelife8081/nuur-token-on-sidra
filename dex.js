// Initialize provider and contract variables
let provider;
let signer;
let routerContract;
let nuurContract;
let userAddress;

// Contract addresses - replace with your actual contract addresses
const ROUTER_ADDRESS = '0xC9B0dDBd6a93f8C623428BA39511e210Ff9B327F';
const NUUR_ADDRESS = '0x99110619B49fc1B1d7508c0244d17ef32859CA59';

// ABI definitions - replace with your actual ABIs
const ROUTER_ABI = [{"inputs":[{"internalType":"address","name":"_nuurToken","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newFee","type":"uint256"}],"name":"FeeUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"provider","type":"address"},{"indexed":false,"internalType":"uint256","name":"sdaAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"nuurAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"liquidity","type":"uint256"}],"name":"LiquidityAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"provider","type":"address"},{"indexed":false,"internalType":"uint256","name":"sdaAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"nuurAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"liquidity","type":"uint256"}],"name":"LiquidityRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"bool","name":"isSdaToNuur","type":"bool"},{"indexed":false,"internalType":"uint256","name":"amountIn","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amountOut","type":"uint256"}],"name":"Swap","type":"event"},{"inputs":[],"name":"FEE_DENOMINATOR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MINIMUM_LIQUIDITY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"minNuurAmount","type":"uint256"}],"name":"addLiquidity","outputs":[{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"reserveIn","type":"uint256"},{"internalType":"uint256","name":"reserveOut","type":"uint256"}],"name":"getAmountOut","outputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getReserves","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"liquidityBalances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nuurReserve","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nuurToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"minSdaAmount","type":"uint256"},{"internalType":"uint256","name":"minNuurAmount","type":"uint256"}],"name":"removeLiquidity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"sdaReserve","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"newFee","type":"uint256"}],"name":"setSwapFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"swapFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"nuurAmount","type":"uint256"},{"internalType":"uint256","name":"minSdaOut","type":"uint256"}],"name":"swapNuurForSda","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"minNuurOut","type":"uint256"}],"name":"swapSdaForNuur","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"totalLiquidity","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]; // Your router contract ABI
const TOKEN_ABI = [{"inputs":[{"internalType":"address","name":"recipient","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"allowance","type":"uint256"},{"internalType":"uint256","name":"needed","type":"uint256"}],"name":"ERC20InsufficientAllowance","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"needed","type":"uint256"}],"name":"ERC20InsufficientBalance","type":"error"},{"inputs":[{"internalType":"address","name":"approver","type":"address"}],"name":"ERC20InvalidApprover","type":"error"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"}],"name":"ERC20InvalidReceiver","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"}],"name":"ERC20InvalidSender","type":"error"},{"inputs":[{"internalType":"address","name":"spender","type":"address"}],"name":"ERC20InvalidSpender","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]; // Your ERC20 token ABI

// Initialize event listeners
document.addEventListener('DOMContentLoaded', () => {
    initializeWeb3();
    setupEventListeners();
    updateTimedElements();
});

// Initialize Web3 and contracts
async function initializeWeb3() {
    try {
        if (typeof window.ethereum === 'undefined') {
            throw new Error('Please install MetaMask');
        }

        provider = new ethers.providers.Web3Provider(window.ethereum);
        const network = await provider.getNetwork();
        
        // Check if we're on the correct network (replace with your chain ID)
        if (network.chainId !== 0x17cad) {
            throw new Error('Please connect to Sidra Chain');
        }

        routerContract = new ethers.Contract(ROUTER_ADDRESS, ROUTER_ABI, provider);
        nuurContract = new ethers.Contract(NUUR_ADDRESS, TOKEN_ABI, provider);

        // Setup MetaMask event listeners
        window.ethereum.on('accountsChanged', handleAccountsChanged);
        window.ethereum.on('chainChanged', () => window.location.reload());
    } catch (error) {
        showError(error.message);
    }
}

// Handle account changes
function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
        // MetaMask is locked or user has no accounts
        disconnectWallet();
    } else if (accounts[0] !== userAddress) {
        userAddress = accounts[0];
        updateUI();
    }
}

// Connect wallet function
async function connectWallet() {
    try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        userAddress = accounts[0];
        signer = provider.getSigner();
        
        // Update contracts with signer
        routerContract = routerContract.connect(signer);
        nuurContract = nuurContract.connect(signer);

        // Update UI
        document.getElementById('connectWallet').style.display = 'none';
        document.getElementById('walletAddress').textContent = `${userAddress.slice(0, 6)}...${userAddress.slice(-4)}`;
        document.getElementById('walletAddress').classList.add('connected');
        
        // Enable buttons
        document.getElementById('swapButton').disabled = false;
        document.getElementById('addLiquidityButton').disabled = false;
        
        // Update balances
        await updateBalances();
    } catch (error) {
        showError(error.message);
    }
}

// Disconnect wallet function
function disconnectWallet() {
    userAddress = null;
    signer = null;
    
    // Update UI
    document.getElementById('connectWallet').style.display = 'block';
    document.getElementById('walletAddress').classList.remove('connected');
    document.getElementById('swapButton').disabled = true;
    document.getElementById('addLiquidityButton').disabled = true;
}

// Update balances
async function updateBalances() {
    if (!userAddress) return;

    try {
        // Get native token (SDA) balance
        const sdaBalance = await provider.getBalance(userAddress);
        document.getElementById('fromTokenBalance').textContent = ethers.utils.formatEther(sdaBalance);
        document.getElementById('sdaLiquidityBalance').textContent = ethers.utils.formatEther(sdaBalance);

        // Get NUUR balance
        const nuurBalance = await nuurContract.balanceOf(userAddress);
        document.getElementById('toTokenBalance').textContent = ethers.utils.formatEther(nuurBalance);
        document.getElementById('nuurLiquidityBalance').textContent = ethers.utils.formatEther(nuurBalance);

        // Update liquidity positions
        await updateLiquidityPositions();
    } catch (error) {
        showError('Failed to update balances');
    }
}

// Update liquidity positions
async function updateLiquidityPositions() {
    if (!userAddress || !routerContract) return;

    try {
        // Get user's liquidity balance
        const liquidityBalance = await routerContract.getLiquidityBalance(userAddress);
        const totalLiquidity = await routerContract.getTotalLiquidity();
        
        const liquidityPositionsDiv = document.getElementById('liquidityPositions');
        
        if (liquidityBalance.gt(0)) {
            // Get reserves
            const [sdaReserve, nuurReserve] = await routerContract.getReserves();
            
            // Calculate share
            const share = liquidityBalance.mul(100).div(totalLiquidity);
            
            // Calculate token amounts
            const sdaAmount = sdaReserve.mul(liquidityBalance).div(totalLiquidity);
            const nuurAmount = nuurReserve.mul(liquidityBalance).div(totalLiquidity);
            
            liquidityPositionsDiv.innerHTML = `
                <div class="liquidity-position">
                    <h3>Your Liquidity Position</h3>
                    <p>Share of Pool: ${ethers.utils.formatUnits(share, 2)}%</p>
                    <p>SDA: ${ethers.utils.formatEther(sdaAmount)}</p>
                    <p>NUUR: ${ethers.utils.formatEther(nuurAmount)}</p>
                </div>
            `;
        } else {
            liquidityPositionsDiv.innerHTML = '<p>No liquidity positions found</p>';
        }
    } catch (error) {
        showError('Failed to update liquidity positions');
    }
}

// Swap tokens
async function swap() {
    if (!userAddress || !routerContract) return;

    try {
        const fromAmount = document.getElementById('fromAmount').value;
        if (!fromAmount || parseFloat(fromAmount) <= 0) {
            throw new Error('Please enter a valid amount');
        }

        const amountIn = ethers.utils.parseEther(fromAmount);
        
        // Get minimum amount out (considering slippage)
        const slippage = parseFloat(document.getElementById('slippage').textContent) / 100;
        const [_, amountOut] = await routerContract.getAmountsOut(amountIn);
        const minAmountOut = amountOut.mul(Math.floor((1 - slippage) * 1000)).div(1000);

        // Execute swap
        const tx = await routerContract.swapExactSDAForNUUR(
            minAmountOut,
            userAddress,
            { value: amountIn }
        );
        
        await tx.wait();
        await updateBalances();
        
        // Clear input fields
        document.getElementById('fromAmount').value = '';
        document.getElementById('toAmount').value = '';
    } catch (error) {
        showError(error.message);
    }
}

// Add liquidity
async function addLiquidity() {
    if (!userAddress || !routerContract) return;

    try {
        const sdaAmount = document.getElementById('sdaAmount').value;
        const nuurAmount = document.getElementById('nuurAmount').value;
        
        if (!sdaAmount || !nuurAmount || parseFloat(sdaAmount) <= 0 || parseFloat(nuurAmount) <= 0) {
            throw new Error('Please enter valid amounts');
        }

        const sdaValue = ethers.utils.parseEther(sdaAmount);
        const nuurValue = ethers.utils.parseEther(nuurAmount);

        // First approve NUUR tokens
        const approveTx = await nuurContract.approve(ROUTER_ADDRESS, nuurValue);
        await approveTx.wait();

        // Add liquidity
        const tx = await routerContract.addLiquidity(
            nuurValue,
            userAddress,
            { value: sdaValue }
        );
        
        await tx.wait();
        await updateBalances();
        
        // Clear input fields
        document.getElementById('sdaAmount').value = '';
        document.getElementById('nuurAmount').value = '';
    } catch (error) {
        showError(error.message);
    }
}

// Setup event listeners
function setupEventListeners() {
    document.getElementById('connectWallet').addEventListener('click', connectWallet);
    document.getElementById('swapButton').addEventListener('click', swap);
    document.getElementById('addLiquidityButton').addEventListener('click', addLiquidity);
    document.getElementById('switchTokens').addEventListener('click', () => {
        // Since SDA is native token, we don't allow switching
        showError('Cannot switch tokens - SDA must be the input token');
    });
    
    // Setup input event listeners
    document.getElementById('fromAmount').addEventListener('input', updateToAmount);
    document.getElementById('sdaAmount').addEventListener('input', updateNuurAmount);
    document.getElementById('nuurAmount').addEventListener('input', updateSdaAmount);
}

// Update estimated output amount for swap
async function updateToAmount() {
    if (!routerContract) return;

    try {
        const fromAmount = document.getElementById('fromAmount').value;
        if (!fromAmount || parseFloat(fromAmount) <= 0) {
            document.getElementById('toAmount').value = '';
            return;
        }

        const amountIn = ethers.utils.parseEther(fromAmount);
        const [_, amountOut] = await routerContract.getAmountsOut(amountIn);
        document.getElementById('toAmount').value = ethers.utils.formatEther(amountOut);
        
        // Update exchange rate
        const rate = amountOut.mul(ethers.utils.parseEther('1')).div(amountIn);
        document.getElementById('exchangeRate').textContent = ethers.utils.formatEther(rate);
    } catch (error) {
        document.getElementById('toAmount').value = '';
        document.getElementById('exchangeRate').textContent = '0.00';
    }
}

// Update estimated NUUR amount for liquidity
async function updateNuurAmount() {
    if (!routerContract) return;

    try {
        const sdaAmount = document.getElementById('sdaAmount').value;
        if (!sdaAmount || parseFloat(sdaAmount) <= 0) {
            document.getElementById('nuurAmount').value = '';
            return;
        }

        const [sdaReserve, nuurReserve] = await routerContract.getReserves();
        const nuurAmount = ethers.utils.parseEther(sdaAmount).mul(nuurReserve).div(sdaReserve);
        document.getElementById('nuurAmount').value = ethers.utils.formatEther(nuurAmount);
    } catch (error) {
        document.getElementById('nuurAmount').value = '';
    }
}

// Update estimated SDA amount for liquidity
async function updateSdaAmount() {
    if (!routerContract) return;

    try {
        const nuurAmount = document.getElementById('nuurAmount').value;
        if (!nuurAmount || parseFloat(nuurAmount) <= 0) {
            document.getElementById('sdaAmount').value = '';
            return;
        }

        const [sdaReserve, nuurReserve] = await routerContract.getReserves();
        const sdaAmount = ethers.utils.parseEther(nuurAmount).mul(sdaReserve).div(nuurReserve);
        document.getElementById('sdaAmount').value = ethers.utils.formatEther(sdaAmount);
    } catch (error) {
        document.getElementById('sdaAmount').value = '';
    }
}

// Show error message
function showError(message) {
    const errorDiv = document.querySelector('.error-message') || document.createElement('div');
    errorDiv.classList.add('error-message');
    errorDiv.textContent = message;
    
    if (!errorDiv.parentElement) {
        document.querySelector('.container').appendChild(errorDiv);
    }
    
    errorDiv.classList.add('visible');
    setTimeout(() => {
        errorDiv.classList.remove('visible');
    }, 5000);
}
