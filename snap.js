// ====== CONFIGURATION ======
const PRESALE1_ADDRESS = '0x858024C3c8179Ed448A9133190f991cfA9873657';
const PRESALE2_ADDRESS = '0x98FCc396547D450208e926995a74b61874a1423A';
const AIRDROP_CONTRACT_ADDRESS = '0x8e4384ed929b82A2FEE2e6F043213170C1d905D9';
const LEDGER_EXPLORER_URL = 'https://ledger.sidrachain.com/tx/';

// ====== ABIs ======
const presale1Abi = [
  "event TokensPurchased(address indexed buyer, uint256 sdaAmount, uint256 nuurAmount)"
];
const presale2Abi = [
  "event TokensPurchased(address indexed buyer, uint256 sdaAmount, uint256 nuurAmount, string phaseName, uint256 rate)"
];
const airdropAbi = [{"inputs":[{"internalType":"address","name":"_nuurToken","type":"address"},{"internalType":"address","name":"_presale1","type":"address"},{"internalType":"address","name":"_presale2","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Claimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"oldToken","type":"address"},{"indexed":true,"internalType":"address","name":"newToken","type":"address"}],"name":"NUURTokenUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"NativeWithdrawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"presale1","type":"address"},{"indexed":false,"internalType":"address","name":"presale2","type":"address"}],"name":"PresaleContractsUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"balance","type":"uint256"}],"name":"SnapshotTaken","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TokensWithdrawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getClaimableAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"hasClaimed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nuurToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"presaleContract1","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"presaleContract2","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newToken","type":"address"}],"name":"setNUURToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_presale1","type":"address"},{"internalType":"address","name":"_presale2","type":"address"}],"name":"setPresaleContracts","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"snapshotBalances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"snapshotTimestamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"takeSnapshot","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"verifyPresaleParticipation","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdrawNative","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdrawTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];

// ====== GLOBAL STATE ======
let provider, signer, userAddress;
let presale1, presale2, airdrop;

// ====== DOM ELEMENTS ======
const networkNameElem = document.getElementById('networkName');
const statusDotElem = document.getElementById('statusDot');
const connectWalletBtn = document.getElementById('connectWallet');
const walletAddressElem = document.getElementById('walletAddress');
const nuurBalanceElem = document.getElementById('nuurBalance');
const snapshotBalanceElem = document.getElementById('snapshotBalance');
const presaleStatusElem = document.getElementById('presaleStatus');
const takeSnapshotBtn = document.getElementById('takeSnapshot');
const claimableAmountElem = document.getElementById('claimableAmount');
const claimButtonElem = document.getElementById('claimButton');
const statusElem = document.getElementById('status');
const currentTimeElem = document.getElementById('currentTime');

// ====== INIT ======
window.addEventListener('DOMContentLoaded', () => {
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);

    connectWalletBtn.addEventListener('click', connectWallet);
    if (takeSnapshotBtn) takeSnapshotBtn.addEventListener('click', handleTakeSnapshot);
    if (claimButtonElem) claimButtonElem.addEventListener('click', handleClaimAirdrop);

    if (window.ethereum) {
        window.ethereum.on('accountsChanged', () => location.reload());
        window.ethereum.on('chainChanged', () => location.reload());
    }
});

// ====== WALLET CONNECTION ======
async function connectWallet() {
    if (!window.ethereum) {
        updateStatus(
            `MetaMask not detected. Install MetaMask to connect your wallet.`,
            'error'
        );
        return;
    }
    try {
        provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner();
        userAddress = await signer.getAddress();

        walletAddressElem.textContent = shortenAddress(userAddress);
        connectWalletBtn.disabled = true;
        connectWalletBtn.textContent = "Connected";
        updateStatus('Wallet connected.', 'success');
        statusDotElem.classList.add('connected');

        presale1 = new ethers.Contract(PRESALE1_ADDRESS, presale1Abi, provider);
        presale2 = new ethers.Contract(PRESALE2_ADDRESS, presale2Abi, provider);
        airdrop = new ethers.Contract(AIRDROP_CONTRACT_ADDRESS, airdropAbi, signer);

        try {
            const network = await provider.getNetwork();
            let networkLabel = "Unknown Network";
            if (network && typeof network.chainId !== "undefined") {
                if (network.chainId === 97453) {
                    networkLabel = "Sidra Chain";
                } else if (network.name && network.name !== "unknown") {
                    networkLabel = network.name.charAt(0).toUpperCase() + network.name.slice(1);
                } else {
                    networkLabel = `Switch to Sidra chain`;
                }
            }
            networkNameElem.textContent = networkLabel;
        } catch (e) {
            networkNameElem.textContent = "Unknown Network";
            console.warn("Could not fetch network info:", e);
        }

        await updateWalletInfo();
    } catch (err) {
        updateStatus('Could not connect wallet. Please try again.', 'error');
        console.error('Wallet connection error:', err);
    }
}

// ====== WALLET INFO & UI UPDATE ======
async function updateWalletInfo() {
    if (!provider || !signer || !userAddress) return;

    nuurBalanceElem.textContent = '...';
    snapshotBalanceElem.textContent = '...';

    try {
        // Get token address from airdrop contract
        const tokenAddress = await airdrop.nuurToken();

        // Get balances
        const [rawBalance, rawSnapshotBalance] = await Promise.all([
            provider.call({
                to: tokenAddress,
                data: '0x70a08231' + userAddress.slice(2).padStart(64, '0') // balanceOf(address)
            }),
            airdrop.snapshotBalances(userAddress)
        ]);

        // Assuming 18 decimals (standard for ERC20)
        const decimals = 18;
        const balance = ethers.utils.formatUnits(rawBalance, decimals);
        nuurBalanceElem.textContent = parseFloat(balance).toLocaleString();

        const snapshotBalance = ethers.utils.formatUnits(rawSnapshotBalance, decimals);
        snapshotBalanceElem.textContent = parseFloat(snapshotBalance).toLocaleString();

        const paused = await airdrop.paused();
        const eligibilityStatus = await checkEligibility(userAddress);
        const isVerified = rawSnapshotBalance.gt(0);

        // Update UI based on verification and eligibility
        if (isVerified) {
            presaleStatusElem.textContent = 'Verified';
            takeSnapshotBtn.disabled = true;
            takeSnapshotBtn.classList.remove('is-danger');
            takeSnapshotBtn.textContent = "Snapshot Taken";
            updateStatus('', 'success');
        } else if (eligibilityStatus.isEligible) {
            presaleStatusElem.textContent = 'Eligible - Not Verified';
            takeSnapshotBtn.disabled = false;
            takeSnapshotBtn.classList.add('is-danger');
            takeSnapshotBtn.textContent = "Take Snapshot (Verify)";
            updateStatus('Take a snapshot to verify your status.', 'error');
        } else {
            presaleStatusElem.textContent = 'Not Eligible';
            takeSnapshotBtn.disabled = true;
            takeSnapshotBtn.classList.remove('is-danger');
            takeSnapshotBtn.textContent = "Take Snapshot";
            updateStatus(eligibilityStatus.message, 'error');
        }

        const rawClaimable = await airdrop.getClaimableAmount(userAddress);
        const claimable = ethers.utils.formatUnits(rawClaimable, decimals);
        claimableAmountElem.textContent = parseFloat(claimable).toLocaleString();

        const hasClaimed = await airdrop.hasClaimed(userAddress);
        if (hasClaimed) {
            claimButtonElem.disabled = true;
            claimButtonElem.textContent = 'Already Claimed';
        } else if (paused) {
            claimButtonElem.disabled = true;
            claimButtonElem.textContent = 'Claiming Paused';
        } else if (!isVerified || !eligibilityStatus.isEligible) {
            claimButtonElem.disabled = true;
            claimButtonElem.textContent = 'Not Eligible';
        } else if (rawClaimable.eq(0)) {
            claimButtonElem.disabled = true;
            claimButtonElem.textContent = 'No Airdrop';
        } else {
            claimButtonElem.disabled = false;
            claimButtonElem.textContent = 'Claim Airdrop';
        }
    } catch (err) {
        nuurBalanceElem.textContent = '0';
        snapshotBalanceElem.textContent = '0';
        updateStatus('Failed to update wallet info. Please switch to Sidra Chain and retry.', 'error');
        console.error('Error updating wallet info:', err);
    }
}

// ====== PRESALE PARTICIPATION CHECK (EVENT BASED) ======
const PRESALE1_DEPLOY_BLOCK = 0; // Set to actual deployment block for performance
const PRESALE2_DEPLOY_BLOCK = 0; // Set to actual deployment block for performance

async function userParticipatedInPresale(contract, userAddress, fromBlock = 0) {
    try {
        const filter = contract.filters.TokensPurchased(userAddress);
        const events = await contract.queryFilter(filter, fromBlock, 'latest');
        return events.length > 0;
    } catch (err) {
        console.error('Error querying presale participation:', err);
        return false;
    }
}

// ====== ELIGIBILITY CHECK ======
async function checkEligibility(address) {
    try {
        const [presale1Participated, presale2Participated] = await Promise.all([
            userParticipatedInPresale(presale1, address, PRESALE1_DEPLOY_BLOCK),
            userParticipatedInPresale(presale2, address, PRESALE2_DEPLOY_BLOCK)
        ]);
        const isPresaleParticipant = presale1Participated || presale2Participated;

        // Get token balance using airdrop contract
        const tokenAddress = await airdrop.nuurToken();
        const rawBalance = await provider.call({
            to: tokenAddress,
            data: '0x70a08231' + address.slice(2).padStart(64, '0') // balanceOf(address)
        });
        const balance = ethers.utils.formatUnits(rawBalance, 18);
        const hasMinimumBalance = parseFloat(balance) >= 200000;

        if (!isPresaleParticipant) {
            return {
                isEligible: false,
                message: 'You must be a presale participant to be eligible'
            };
        }

        if (!hasMinimumBalance) {
            return {
                isEligible: false,
                message: 'You need at least 200,000 NUUR tokens to be eligible'
            };
        }

        return {
            isEligible: true,
            message: ''
        };
    } catch (err) {
        console.error('Error checking eligibility:', err);
        return {
            isEligible: false,
            message: 'Error checking eligibility. Please try again.'
        };
    }
}

// ====== SNAPSHOT FUNCTIONALITY ======
async function handleTakeSnapshot() {
    if (!airdrop) return;

    try {
        // Check if already verified by checking snapshot balance
        const rawSnapshotBalance = await airdrop.snapshotBalances(userAddress);
        if (rawSnapshotBalance.gt(0)) {
            updateStatus('Your account is already verified with a snapshot.', 'error');
            takeSnapshotBtn.disabled = true;
            return;
        }

        // Check eligibility before allowing snapshot
        const eligibilityStatus = await checkEligibility(userAddress);
        if (!eligibilityStatus.isEligible) {
            updateStatus(eligibilityStatus.message, 'error');
            takeSnapshotBtn.disabled = true;
            return;
        }

        takeSnapshotBtn.disabled = true;
        updateStatus('Taking snapshot for verification...', 'success');

        const tx = await airdrop.takeSnapshot(userAddress);
        const receipt = await tx.wait();

        const ledgerLink = `<a href="${LEDGER_EXPLORER_URL}${receipt.transactionHash}" target="_blank" rel="noopener noreferrer">View on Ledger</a>`;
        updateStatus(`Snapshot taken! You are now verified. ${ledgerLink}`, 'success');

        await updateWalletInfo();
    } catch (err) {
        updateStatus('Snapshot failed. Please try again.', 'error');
        console.error('Snapshot error:', err);
        takeSnapshotBtn.disabled = false;
    }
}

// ====== CLAIM FUNCTIONALITY ======
async function handleClaimAirdrop() {
    if (!airdrop) return;
    claimButtonElem.disabled = true;
    updateStatus('Processing airdrop claim...', 'success');
    try {
        const tx = await airdrop.claim();
        const receipt = await tx.wait();

        const ledgerLink = `<a href="${LEDGER_EXPLORER_URL}${receipt.transactionHash}" target="_blank" rel="noopener noreferrer">View on Ledger</a>`;
        updateStatus(`Airdrop claimed successfully! ${ledgerLink}`, 'success');

        await updateWalletInfo();
    } catch (err) {
        updateStatus('Claim failed. Please try again.', 'error');
        console.error('Claim error:', err);
        claimButtonElem.disabled = false;
    }
}

// ====== HELPERS ======
function shortenAddress(addr) {
    if (!addr) return '';
    return addr.slice(0, 6) + '...' + addr.slice(-4);
}

function updateStatus(msg, type) {
    statusElem.innerHTML = msg; // Changed to innerHTML to support HTML links
    statusElem.className = 'status';
    if (type === 'success') statusElem.classList.add('success');
    if (type === 'error') statusElem.classList.add('error');
}

function updateCurrentTime() {
    if (!currentTimeElem) return;
    const now = new Date();
    const formattedDate = now.getUTCFullYear() + '-' +
        String(now.getUTCMonth() + 1).padStart(2, '0') + '-' +
        String(now.getUTCDate()).padStart(2, '0') + ' ' +
        String(now.getUTCHours()).padStart(2, '0') + ':' +
        String(now.getUTCMinutes()).padStart(2, '0') + ':' +
        String(now.getUTCSeconds()).padStart(2, '0');
    currentTimeElem.textContent = formattedDate;
}
