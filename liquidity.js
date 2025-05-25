// Configuration: Replace with your actual addresses and ABI arrays
const ROUTER_ADDRESS = '0xC9B0dDBd6a93f8C623428BA39511e210Ff9B327F';
const NUUR_ADDRESS = '0x99110619B49fc1B1d7508c0244d17ef32859CA59';
const ROUTER_ABI = [{"inputs":[{"internalType":"address","name":"_nuurToken","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newFee","type":"uint256"}],"name":"FeeUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"provider","type":"address"},{"indexed":false,"internalType":"uint256","name":"sdaAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"nuurAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"liquidity","type":"uint256"}],"name":"LiquidityAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"provider","type":"address"},{"indexed":false,"internalType":"uint256","name":"sdaAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"nuurAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"liquidity","type":"uint256"}],"name":"LiquidityRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"bool","name":"isSdaToNuur","type":"bool"},{"indexed":false,"internalType":"uint256","name":"amountIn","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amountOut","type":"uint256"}],"name":"Swap","type":"event"},{"inputs":[],"name":"FEE_DENOMINATOR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MINIMUM_LIQUIDITY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"minNuurAmount","type":"uint256"}],"name":"addLiquidity","outputs":[{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"reserveIn","type":"uint256"},{"internalType":"uint256","name":"reserveOut","type":"uint256"}],"name":"getAmountOut","outputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getReserves","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"liquidityBalances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nuurReserve","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nuurToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"minSdaAmount","type":"uint256"},{"internalType":"uint256","name":"minNuurAmount","type":"uint256"}],"name":"removeLiquidity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"sdaReserve","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"newFee","type":"uint256"}],"name":"setSwapFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"swapFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"nuurAmount","type":"uint256"},{"internalType":"uint256","name":"minSdaOut","type":"uint256"}],"name":"swapNuurForSda","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"minNuurOut","type":"uint256"}],"name":"swapSdaForNuur","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"totalLiquidity","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];
const TOKEN_ABI = [{"inputs":[{"internalType":"address","name":"recipient","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"allowance","type":"uint256"},{"internalType":"uint256","name":"needed","type":"uint256"}],"name":"ERC20InsufficientAllowance","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"needed","type":"uint256"}],"name":"ERC20InsufficientBalance","type":"error"},{"inputs":[{"internalType":"address","name":"approver","type":"address"}],"name":"ERC20InvalidApprover","type":"error"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"}],"name":"ERC20InvalidReceiver","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"}],"name":"ERC20InvalidSender","type":"error"},{"inputs":[{"internalType":"address","name":"spender","type":"address"}],"name":"ERC20InvalidSpender","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];
const CHAIN_ID = 97453; // Replace with your chain ID

let provider, signer, routerContract, nuurContract, userAddress;
let isAutoCalculating = false;

// Current user info
const currentUser = 'freelife8081';
const currentUTCTime = '2025-05-25 14:59:27';

window.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    if (typeof window.ethereum !== 'undefined') {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        routerContract = new ethers.Contract(ROUTER_ADDRESS, ROUTER_ABI, provider);
        nuurContract = new ethers.Contract(NUUR_ADDRESS, TOKEN_ABI, provider);
    }
    // Display current time in header if you have a time element
    const timeElement = document.getElementById('currentTime');
    if (timeElement) {
        timeElement.textContent = currentUTCTime;
    }
});

function setupEventListeners() {
    document.getElementById('connectWallet').onclick = connectWallet;
    document.getElementById('addLiquidityButton').onclick = addLiquidity;
    
    const sdaInput = document.getElementById('sdaAmount');
    const nuurInput = document.getElementById('nuurAmount');
    
    sdaInput.addEventListener('input', debounce(async (e) => {
        if (isAutoCalculating) return;
        const value = e.target.value;
        if (value && parseFloat(value) > 0) {
            await updateNuurAmount(true);
        }
    }, 500));

    nuurInput.addEventListener('input', debounce(async (e) => {
        if (isAutoCalculating) return;
        const value = e.target.value;
        if (value && parseFloat(value) > 0) {
            await updateSdaAmount(true);
        }
    }, 500));
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
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

        document.getElementById('connectWallet').style.display = 'none';
        document.getElementById('walletAddress').textContent = `${userAddress.slice(0,6)}...${userAddress.slice(-4)}`;
        document.getElementById('walletAddress').classList.add('connected');
        document.getElementById('addLiquidityButton').disabled = false;
        
        // Log connection time
        console.log(`Wallet connected at ${new Date().toISOString()} by user ${currentUser}`);
        
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
                    <p class="last-update">Last updated: ${currentUTCTime}</p>
                    <button onclick="removeLiquidity()" class="action-button" style="margin-top:12px;">Remove Liquidity</button>
                </div>
            `;
        } else {
            positionsDiv.innerHTML = '<p>No liquidity positions found</p>';
        }
    } catch (e) {
        showError('Failed to update liquidity positions');
    }
}

async function updateNuurAmount(userInput = false) {
    if (!routerContract || isAutoCalculating) return;
    const sdaAmountStr = document.getElementById('sdaAmount').value;
    if (!sdaAmountStr || parseFloat(sdaAmountStr) <= 0) {
        if (!userInput) document.getElementById('nuurAmount').value = '';
        return;
    }
    
    try {
        const [sdaReserve, nuurReserve] = await routerContract.getReserves();
        if (sdaReserve.isZero() || nuurReserve.isZero()) return;
        
        isAutoCalculating = true;
        const sdaValue = ethers.utils.parseEther(sdaAmountStr);
        const nuurNeeded = sdaValue.mul(nuurReserve).div(sdaReserve);
        document.getElementById('nuurAmount').value = ethers.utils.formatEther(nuurNeeded);
    } catch (e) {
        if (!userInput) document.getElementById('nuurAmount').value = '';
    } finally {
        isAutoCalculating = false;
    }
}

async function updateSdaAmount(userInput = false) {
    if (!routerContract || isAutoCalculating) return;
    const nuurAmountStr = document.getElementById('nuurAmount').value;
    if (!nuurAmountStr || parseFloat(nuurAmountStr) <= 0) {
        if (!userInput) document.getElementById('sdaAmount').value = '';
        return;
    }
    
    try {
        const [sdaReserve, nuurReserve] = await routerContract.getReserves();
        if (sdaReserve.isZero() || nuurReserve.isZero()) return;
        
        isAutoCalculating = true;
        const nuurValue = ethers.utils.parseEther(nuurAmountStr);
        const sdaNeeded = nuurValue.mul(sdaReserve).div(nuurReserve);
        document.getElementById('sdaAmount').value = ethers.utils.formatEther(sdaNeeded);
    } catch (e) {
        if (!userInput) document.getElementById('sdaAmount').value = '';
    } finally {
        isAutoCalculating = false;
    }
}

async function addLiquidity() {
    if (!userAddress || !routerContract) return;
    try {
        const sdaAmountStr = document.getElementById('sdaAmount').value;
        const nuurAmountStr = document.getElementById('nuurAmount').value;
        if (!sdaAmountStr || !nuurAmountStr || 
            parseFloat(sdaAmountStr) <= 0 || parseFloat(nuurAmountStr) <= 0) {
            throw new Error('Please enter valid amounts');
        }
        
        const sdaValue = ethers.utils.parseEther(sdaAmountStr);
        const nuurValue = ethers.utils.parseEther(nuurAmountStr);

        // First approve NUUR spending
        const approveTx = await nuurContract.approve(ROUTER_ADDRESS, nuurValue);
        await approveTx.wait();

        // Add liquidity
        const tx = await routerContract.addLiquidity(
            nuurValue,
            { value: sdaValue }
        );
        await tx.wait();
        
        document.getElementById('sdaAmount').value = '';
        document.getElementById('nuurAmount').value = '';
        await updateBalances();
        await updateLiquidityPositions();
        
        showSuccess('Liquidity added successfully!');
        console.log(`Liquidity added by ${currentUser} at ${currentUTCTime}`);
    } catch (e) {
        showError(e.message || 'Failed to add liquidity');
    }
}

async function removeLiquidity() {
    if (!userAddress || !routerContract) return;
    try {
        const liquidityBalance = await routerContract.liquidityBalances(userAddress);
        if (liquidityBalance.isZero()) {
            throw new Error('No liquidity to remove');
        }

        // Get reserves and calculate minimum amounts
        const [sdaReserve, nuurReserve] = await routerContract.getReserves();
        const totalLiquidity = await routerContract.totalLiquidity();
        
        // Calculate minimum amounts with 1% slippage tolerance
        const minSdaAmount = sdaReserve.mul(liquidityBalance).div(totalLiquidity)
            .mul(99).div(100);
        const minNuurAmount = nuurReserve.mul(liquidityBalance).div(totalLiquidity)
            .mul(99).div(100);

        // First approve router to spend LP tokens
        const approveTx = await routerContract.approve(ROUTER_ADDRESS, liquidityBalance);
        await approveTx.wait();

        // Remove liquidity
        const tx = await routerContract.removeLiquidity(
            liquidityBalance,
            minSdaAmount,
            minNuurAmount
        );
        await tx.wait();
        
        await updateBalances();
        await updateLiquidityPositions();
        
        showSuccess('Liquidity removed successfully!');
        console.log(`Liquidity removed by ${currentUser} at ${currentUTCTime}`);
    } catch (e) {
        showError(e.message || 'Failed to remove liquidity');
    }
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
