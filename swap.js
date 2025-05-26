// Configuration
const ROUTER_ADDRESS = '0xC9B0dDBd6a93f8C623428BA39511e210Ff9B327F';
const NUUR_ADDRESS = '0x99110619B49fc1B1d7508c0244d17ef32859CA59';
const ROUTER_ABI = [{"inputs":[{"internalType":"address","name":"_nuurToken","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newFee","type":"uint256"}],"name":"FeeUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"provider","type":"address"},{"indexed":false,"internalType":"uint256","name":"sdaAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"nuurAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"liquidity","type":"uint256"}],"name":"LiquidityAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"provider","type":"address"},{"indexed":false,"internalType":"uint256","name":"sdaAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"nuurAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"liquidity","type":"uint256"}],"name":"LiquidityRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"bool","name":"isSdaToNuur","type":"bool"},{"indexed":false,"internalType":"uint256","name":"amountIn","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amountOut","type":"uint256"}],"name":"Swap","type":"event"},{"inputs":[],"name":"FEE_DENOMINATOR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MINIMUM_LIQUIDITY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"minNuurAmount","type":"uint256"}],"name":"addLiquidity","outputs":[{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"reserveIn","type":"uint256"},{"internalType":"uint256","name":"reserveOut","type":"uint256"}],"name":"getAmountOut","outputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getReserves","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"liquidityBalances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nuurReserve","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nuurToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"minSdaAmount","type":"uint256"},{"internalType":"uint256","name":"minNuurAmount","type":"uint256"}],"name":"removeLiquidity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"sdaReserve","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"newFee","type":"uint256"}],"name":"setSwapFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"swapFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"nuurAmount","type":"uint256"},{"internalType":"uint256","name":"minSdaOut","type":"uint256"}],"name":"swapNuurForSda","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"minNuurOut","type":"uint256"}],"name":"swapSdaForNuur","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"totalLiquidity","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];
const TOKEN_ABI = [{"inputs":[{"internalType":"address","name":"recipient","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"allowance","type":"uint256"},{"internalType":"uint256","name":"needed","type":"uint256"}],"name":"ERC20InsufficientAllowance","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"needed","type":"uint256"}],"name":"ERC20InsufficientBalance","type":"error"},{"inputs":[{"internalType":"address","name":"approver","type":"address"}],"name":"ERC20InvalidApprover","type":"error"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"}],"name":"ERC20InvalidReceiver","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"}],"name":"ERC20InvalidSender","type":"error"},{"inputs":[{"internalType":"address","name":"spender","type":"address"}],"name":"ERC20InvalidSpender","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];
const CHAIN_ID = 97453;

let provider, signer, routerContract, nuurContract, userAddress;
let isSdaToNuur = true;
let isApproved = false;

// Update current time
function updateCurrentTime() {
    const now = new Date();
    const formatted = now.getUTCFullYear() + '-' + 
                     String(now.getUTCMonth() + 1).padStart(2, '0') + '-' +
                     String(now.getUTCDate()).padStart(2, '0') + ' ' +
                     String(now.getUTCHours()).padStart(2, '0') + ':' +
                     String(now.getUTCMinutes()).padStart(2, '0') + ':' +
                     String(now.getUTCSeconds()).padStart(2, '0');
    document.getElementById('currentTime').textContent = formatted;
}

window.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    updateSwapUI();
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);
    
    // Initialize contracts if wallet is already connected
    if (typeof window.ethereum !== 'undefined') {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        routerContract = new ethers.Contract(ROUTER_ADDRESS, ROUTER_ABI, provider);
        nuurContract = new ethers.Contract(NUUR_ADDRESS, TOKEN_ABI, provider);
        
        // Check if already connected
        provider.listAccounts().then(accounts => {
            if (accounts.length > 0) {
                connectWallet();
            }
        });
    }
});

function setupEventListeners() {
    document.getElementById('connectWallet').onclick = connectWallet;
    document.getElementById('swapButton').onclick = executeSwap;
    document.getElementById('fromAmount').oninput = updateToAmount;
    document.getElementById('switchTokens').onclick = () => {
        isSdaToNuur = !isSdaToNuur;
        updateSwapUI();
        updateToAmount();
        checkAllowance();
    };
}

async function connectWallet() {
    try {
        if (typeof window.ethereum === 'undefined') {
            showError('No Ethereum wallet detected. Please install MetaMask.');
            return;
        }
        provider = new ethers.providers.Web3Provider(window.ethereum);
        routerContract = new ethers.Contract(ROUTER_ADDRESS, ROUTER_ABI, provider);
        nuurContract = new ethers.Contract(NUUR_ADDRESS, TOKEN_ABI, provider);

        await provider.send('eth_requestAccounts', []);
        signer = provider.getSigner();
        userAddress = await signer.getAddress();
        routerContract = routerContract.connect(signer);
        nuurContract = nuurContract.connect(signer);

        document.getElementById('walletAddress').textContent = `${userAddress.slice(0,6)}...${userAddress.slice(-4)}`;
        document.getElementById('walletAddress').classList.add('connected');
        document.getElementById('swapButton').textContent = 'Swap';
        document.getElementById('swapButton').disabled = false;

        await updateBalances();
        await checkAllowance();
        startPriceUpdates();
    } catch (e) {
        showError(e.message || 'Wallet connection failed');
    }
}

async function checkAllowance() {
    if (!userAddress || !nuurContract || isSdaToNuur) {
        isApproved = true; // No approval needed for SDA
        return;
    }
    try {
        const allowance = await nuurContract.allowance(userAddress, ROUTER_ADDRESS);
        isApproved = allowance.gt(ethers.constants.MaxUint256.div(2));
        updateSwapButtonText();
    } catch (e) {
        console.error('Error checking allowance:', e);
    }
}

function updateSwapButtonText() {
    const button = document.getElementById('swapButton');
    if (!userAddress) {
        button.textContent = 'Connect Wallet to Swap';
        return;
    }
    if (!isSdaToNuur && !isApproved) {
        button.textContent = 'Approve NUUR';
    } else {
        button.textContent = 'Swap';
    }
}

async function updateBalances() {
    if (!userAddress) return;
    try {
        const sdaBalance = await provider.getBalance(userAddress);
        const nuurBalance = await nuurContract.balanceOf(userAddress);
        document.getElementById('sdaBalance').textContent = ethers.utils.formatEther(sdaBalance);
        document.getElementById('nuurBalance').textContent = ethers.utils.formatEther(nuurBalance);
    } catch (e) {
        showError('Could not fetch balances');
    }
}

function startPriceUpdates() {
    updatePrice();
    // Update price every 10 seconds
    setInterval(updatePrice, 10000);
}

async function updatePrice() {
    if (!routerContract) return;
    try {
        const [sdaReserve, nuurReserve] = await routerContract.getReserves();
        if (sdaReserve.isZero() || nuurReserve.isZero()) return;

        const oneEther = ethers.utils.parseEther('1');
        const sdaToNuurRate = await routerContract.getAmountOut(oneEther, sdaReserve, nuurReserve);
        const nuurToSdaRate = await routerContract.getAmountOut(oneEther, nuurReserve, sdaReserve);

        const rateContainer = document.querySelector('.rate-container');
        if (rateContainer) {
            rateContainer.innerHTML = `
                <div class="rate-item">1 SDA = ${parseFloat(ethers.utils.formatEther(sdaToNuurRate)).toFixed(6)} NUUR</div>
                <div class="rate-item">1 NUUR = ${parseFloat(ethers.utils.formatEther(nuurToSdaRate)).toFixed(6)} SDA</div>
            `;
        }
    } catch (e) {
        console.error('Error updating price:', e);
    }
}

async function updateToAmount() {
    if (!routerContract) return;
    const fromAmount = document.getElementById('fromAmount').value;
    if (!fromAmount || parseFloat(fromAmount) <= 0) {
        document.getElementById('toAmount').value = '';
        return;
    }
    try {
        const [sdaReserve, nuurReserve] = await routerContract.getReserves();
        if (sdaReserve.isZero() || nuurReserve.isZero()) return;

        const amountIn = ethers.utils.parseEther(fromAmount);
        let amountOut;

        if (isSdaToNuur) {
            amountOut = await routerContract.getAmountOut(amountIn, sdaReserve, nuurReserve);
        } else {
            amountOut = await routerContract.getAmountOut(amountIn, nuurReserve, sdaReserve);
        }

        document.getElementById('toAmount').value = ethers.utils.formatEther(amountOut);
    } catch (e) {
        document.getElementById('toAmount').value = '';
    }
}

async function executeSwap() {
    if (!userAddress || !routerContract) return;

    try {
        const fromAmount = document.getElementById('fromAmount').value;
        if (!fromAmount || parseFloat(fromAmount) <= 0) {
            throw new Error('Please enter a valid amount');
        }

        // If approval is needed
        if (!isSdaToNuur && !isApproved) {
            const approveTx = await nuurContract.approve(
                ROUTER_ADDRESS,
                ethers.constants.MaxUint256
            );
            await approveTx.wait();
            isApproved = true;
            updateSwapButtonText();
            return;
        }

        const amountIn = ethers.utils.parseEther(fromAmount);
        const [sdaReserve, nuurReserve] = await routerContract.getReserves();
        let tx;

        if (isSdaToNuur) {
            const amountOut = await routerContract.getAmountOut(amountIn, sdaReserve, nuurReserve);
            const minOut = amountOut.mul(995).div(1000); // 0.5% slippage
            tx = await routerContract.swapSdaForNuur(minOut, { value: amountIn });
        } else {
            const amountOut = await routerContract.getAmountOut(amountIn, nuurReserve, sdaReserve);
            const minOut = amountOut.mul(995).div(1000); // 0.5% slippage
            tx = await routerContract.swapNuurForSda(amountIn, minOut);
        }

        await tx.wait();
        document.getElementById('fromAmount').value = '';
        document.getElementById('toAmount').value = '';
        await updateBalances();
        showSuccess('Swap completed successfully!');
    } catch (e) {
        showError(e.message || 'Swap failed');
    }
}

function updateSwapUI() {
    if (isSdaToNuur) {
        document.getElementById('fromTokenSymbol').textContent = 'SDA';
        document.getElementById('toTokenSymbol').textContent = 'NUUR';
        document.getElementById('fromAmount').placeholder = '0.0';
        document.getElementById('toAmount').placeholder = '0.0';
    } else {
        document.getElementById('fromTokenSymbol').textContent = 'NUUR';
        document.getElementById('toTokenSymbol').textContent = 'SDA';
        document.getElementById('fromAmount').placeholder = '0.0';
        document.getElementById('toAmount').placeholder = '0.0';
    }
    updateSwapButtonText();
    updateBalances();
}

function showError(msg) {
    const div = document.getElementById('errorMessage');
    div.textContent = msg;
    div.style.backgroundColor = '#DC2626';
    div.classList.add('visible');
    setTimeout(() => {
        div.classList.remove('visible');
        div.style.backgroundColor = '';
    }, 5000);
}

function showSuccess(msg) {
    const div = document.getElementById('errorMessage');
    div.textContent = msg;
    div.style.backgroundColor = '#10B981';
    div.classList.add('visible');
    setTimeout(() => {
        div.classList.remove('visible');
        div.style.backgroundColor = '';
    }, 5000);
}
