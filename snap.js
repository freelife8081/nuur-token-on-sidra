// snap.js - Full JavaScript for NUUR Airdrop Dapp with Bulma styling

// ====== CONFIGURATION ======
const PRESALE1_ADDRESS = '0x98FCc396547D450208e926995a74b61874a1423A';
const PRESALE2_ADDRESS = '0x858024C3c8179Ed448A9133190f991cfA9873657';
const NUUR_TOKEN_ADDRESS = '0x003BEc2e6ef4369f9d968eCD288d31B59fD9c2CD';
const AIRDROP_CONTRACT_ADDRESS = '0x8e4384ed929b82A2FEE2e6F043213170C1d905D9';

// ABIs (simplified, add all needed functions for your contracts)
const presaleAbi = [
  // Only buyers(address) view returns (uint256)
  "function buyers(address) view returns (uint256)"
];
const nuurTokenAbi = [
  "function balanceOf(address) view returns (uint256)",
  "function decimals() view returns (uint8)"
];
const airdropAbi = [
  "function snapshotBalances(address) view returns (uint256)",
  "function getClaimableAmount(address) view returns (uint256)",
  "function hasClaimed(address) view returns (bool)",
  "function paused() view returns (bool)",
  "function takeSnapshot()"
];

// ====== GLOBAL STATE ======
let provider, signer, userAddress;
let presale1, presale2, nuurToken, airdrop;

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

  // Optionally: auto-connect if already authorized
  if (window.ethereum) {
    window.ethereum.on('accountsChanged', () => location.reload());
    window.ethereum.on('chainChanged', () => location.reload());
  }
});

// ====== WALLET CONNECTION ======
async function connectWallet() {
  if (!window.ethereum) {
    // Prompt user to install MetaMask
    updateStatus(
      `MetaMask not detected. <a href="https://metamask.io/download/" target="_blank" rel="noopener" style="color:#3273dc;text-decoration:underline;">Install MetaMask</a> to connect your wallet.`,
      'error'
    );
    return;
  }
  provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  await provider.send("eth_requestAccounts", []);
  signer = provider.getSigner();
  userAddress = await signer.getAddress();

  // Update UI
  walletAddressElem.textContent = shortenAddress(userAddress);
  connectWalletBtn.disabled = true;
  connectWalletBtn.textContent = "Connected";
  updateStatus('Wallet connected.', 'success');
  statusDotElem.classList.add('connected');

  // Setup contracts
  presale1 = new ethers.Contract(PRESALE1_ADDRESS, presaleAbi, provider);
  presale2 = new ethers.Contract(PRESALE2_ADDRESS, presaleAbi, provider);
  nuurToken = new ethers.Contract(NUUR_TOKEN_ADDRESS, nuurTokenAbi, provider);
  airdrop = new ethers.Contract(AIRDROP_CONTRACT_ADDRESS, airdropAbi, signer);

  // Network Info
  const network = await provider.getNetwork();
  networkNameElem.textContent = network.name.charAt(0).toUpperCase() + network.name.slice(1);

  await updateWalletInfo();
}

// ====== WALLET INFO & UI UPDATE ======
async function updateWalletInfo() {
  if (!provider || !signer || !userAddress) return;

  // Show loading while fetching
  nuurBalanceElem.textContent = 'fetching your NUUR balance...';

  try {
    // NUUR balance
    const [rawBalance, decimals] = await Promise.all([
      nuurToken.balanceOf(userAddress),
      nuurToken.decimals()
    ]);
    const balance = ethers.utils.formatUnits(rawBalance, decimals);
    nuurBalanceElem.textContent = parseFloat(balance).toLocaleString();

    // Snapshot balance
    const rawSnapshotBalance = await airdrop.snapshotBalances(userAddress);
    const snapshotBalance = ethers.utils.formatUnits(rawSnapshotBalance, decimals);
    snapshotBalanceElem.textContent = parseFloat(snapshotBalance).toLocaleString();

    // Paused state
    const paused = await airdrop.paused();

    // Presale status & eligibility logic
    const eligible = await checkPresaleParticipation(userAddress);

    // Update presale status and snapshot prompt
    if (eligible) {
      presaleStatusElem.textContent = 'Eligible';
      takeSnapshotBtn.disabled = true;
      takeSnapshotBtn.classList.remove('is-danger');
      takeSnapshotBtn.textContent = "Take Snapshot";
      updateStatus('');
    } else {
      presaleStatusElem.textContent = 'Not Verified';
      takeSnapshotBtn.disabled = false;
      takeSnapshotBtn.classList.add('is-danger');
      takeSnapshotBtn.textContent = "Take Snapshot (Verify)";
      updateStatus('Take a snapshot to verify your presale status.', 'error');
    }

    // Claimable amount
    const rawClaimable = await airdrop.getClaimableAmount(userAddress);
    const claimable = ethers.utils.formatUnits(rawClaimable, decimals);
    claimableAmountElem.textContent = parseFloat(claimable).toLocaleString();

    // Has claimed
    const hasClaimed = await airdrop.hasClaimed(userAddress);
    if (hasClaimed) {
      claimButtonElem.disabled = true;
      claimButtonElem.textContent = 'Already Claimed';
    } else if (paused) {
      claimButtonElem.disabled = true;
      claimButtonElem.textContent = 'Claiming Paused';
    } else if (!eligible) {
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
    updateStatus('Error updating wallet info: ' + (err.data?.message || err.message), 'error');
    console.error('Error updating wallet info:', err);
  }
}

// ====== PRESALE PARTICIPATION LOGIC ======
async function checkPresaleParticipation(address) {
  let amount1 = ethers.BigNumber.from(0);
  let amount2 = ethers.BigNumber.from(0);
  try {
    amount1 = await presale1.buyers(address);
  } catch (e) {
    // Treat as 0 if contract errors (e.g. not started)
  }
  try {
    amount2 = await presale2.buyers(address);
  } catch (e) {
    // Treat as 0 if contract errors (e.g. not started)
  }
  return amount1.gt(0) || amount2.gt(0);
}

// ====== SNAPSHOT FUNCTIONALITY ======
async function handleTakeSnapshot() {
  if (!airdrop) return;
  takeSnapshotBtn.disabled = true;
  updateStatus('Taking snapshot for verification...', 'success');
  try {
    const tx = await airdrop.takeSnapshot();
    await tx.wait();
    updateStatus('Snapshot taken! You are now verified.', 'success');
    await updateWalletInfo();
  } catch (err) {
    updateStatus('Snapshot failed: ' + (err.data?.message || err.message), 'error');
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
    await tx.wait();
    updateStatus('Airdrop claimed successfully!', 'success');
    await updateWalletInfo();
  } catch (err) {
    updateStatus('Claim failed: ' + (err.data?.message || err.message), 'error');
    claimButtonElem.disabled = false;
  }
}

// ====== HELPERS ======
function shortenAddress(addr) {
  if (!addr) return '';
  return addr.slice(0, 6) + '...' + addr.slice(-4);
}
function updateStatus(msg, type) {
  statusElem.innerHTML = msg;
  statusElem.className = 'status';
  if (type === 'success') statusElem.classList.add('success');
  if (type === 'error') statusElem.classList.add('error');
}
function updateCurrentTime() {
  if (!currentTimeElem) return;
  const now = new Date();
  const utc = now.getUTCHours().toString().padStart(2, '0') + ':' +
              now.getUTCMinutes().toString().padStart(2, '0') + ':' +
              now.getUTCSeconds().toString().padStart(2, '0');
  currentTimeElem.textContent = utc;
}
