// ====== CONFIGURATION ======
const PRESALE1_ADDRESS = '0x858024C3c8179Ed448A9133190f991cfA9873657'
const PRESALE2_ADDRESS = '0x98FCc396547D450208e926995a74b61874a1423A';
const NUUR_TOKEN_ADDRESS = '0x003BEc2e6ef4369f9d968eCD288d31B59fD9c2CD';
const AIRDROP_CONTRACT_ADDRESS = '0x8e4384ed929b82A2FEE2e6F043213170C1d905D9';

// ====== PRESALE 1 ABI ======
const presale1Abi = [{"inputs":[{"internalType":"address","name":"_nuurToken","type":"address"},{"internalType":"address","name":"_devWallet","type":"address"},{"internalType":"address","name":"initialOwner","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"NUURWithdrawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"SDAWithdrawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"buyer","type":"address"},{"indexed":false,"internalType":"uint256","name":"sdaAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"nuurAmount","type":"uint256"}],"name":"TokensPurchased","type":"event"},{"inputs":[],"name":"RATE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"buyTokens","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"devWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nuurToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newDevWallet","type":"address"}],"name":"updateDevWallet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawNUUR","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawSDA","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];

// ====== PRESALE 2 ABI ======
const presale2Abi = [{"inputs":[{"internalType":"address","name":"_nuurToken","type":"address"},{"internalType":"address","name":"_devWallet","type":"address"},{"internalType":"address","name":"initialOwner","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"newDevWallet","type":"address"}],"name":"DevWalletUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"NUURWithdrawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"phaseId","type":"uint256"},{"indexed":false,"internalType":"string","name":"phaseName","type":"string"},{"indexed":false,"internalType":"uint256","name":"rate","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"startTime","type":"uint256"}],"name":"PhaseUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"isActive","type":"bool"}],"name":"PresaleStatusChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"SDAWithdrawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TokensDeposited","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"buyer","type":"address"},{"indexed":false,"internalType":"uint256","name":"sdaAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"nuurAmount","type":"uint256"},{"indexed":false,"internalType":"string","name":"phaseName","type":"string"},{"indexed":false,"internalType":"uint256","name":"rate","type":"uint256"}],"name":"TokensPurchased","type":"event"},{"inputs":[],"name":"buyTokens","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"sdaAmount","type":"uint256"}],"name":"calculateNUURAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"currentPhaseId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"currentPhaseName","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"currentRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"depositTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"devWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCurrentPhaseInfo","outputs":[{"internalType":"uint256","name":"phaseId","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"rate","type":"uint256"},{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"tokensSold","type":"uint256"},{"internalType":"uint256","name":"sdaReceived","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getNUURBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"phaseId","type":"uint256"}],"name":"getPhaseInfo","outputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"rate","type":"uint256"},{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"tokensSold","type":"uint256"},{"internalType":"uint256","name":"sdaReceived","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getSDABalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nuurToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"phaseStartTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"phases","outputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"rate","type":"uint256"},{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"tokensSold","type":"uint256"},{"internalType":"uint256","name":"sdaReceived","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"presaleActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_status","type":"bool"}],"name":"setPresaleStatus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalSDAReceived","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalTokensSold","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newDevWallet","type":"address"}],"name":"updateDevWallet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newPhaseId","type":"uint256"},{"internalType":"string","name":"newPhaseName","type":"string"},{"internalType":"uint256","name":"newRate","type":"uint256"}],"name":"updatePhase","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawNUUR","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawSDA","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];

// ====== NUUR TOKEN ABI ======
const nuurTokenAbi = [{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"address","name":"initialOwner","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"ERC1363ApproveFailed","type":"error"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"}],"name":"ERC1363InvalidReceiver","type":"error"},{"inputs":[{"internalType":"address","name":"spender","type":"address"}],"name":"ERC1363InvalidSpender","type":"error"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"ERC1363TransferFailed","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"receiver","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"ERC1363TransferFromFailed","type":"error"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"allowance","type":"uint256"},{"internalType":"uint256","name":"needed","type":"uint256"}],"name":"ERC20InsufficientAllowance","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"needed","type":"uint256"}],"name":"ERC20InsufficientBalance","type":"error"},{"inputs":[{"internalType":"address","name":"approver","type":"address"}],"name":"ERC20InvalidApprover","type":"error"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"}],"name":"ERC20InvalidReceiver","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"}],"name":"ERC20InvalidSender","type":"error"},{"inputs":[{"internalType":"address","name":"spender","type":"address"}],"name":"ERC20InvalidSpender","type":"error"},{"inputs":[],"name":"EnforcedPause","type":"error"},{"inputs":[],"name":"ExpectedPause","type":"error"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approveAndCall","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"approveAndCall","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"burnFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferAndCall","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"transferAndCall","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"transferFromAndCall","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFromAndCall","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"}];

// ====== AIRDROP ABI ======
const airdropAbi = [{"inputs":[{"internalType":"address","name":"_nuurToken","type":"address"},{"internalType":"address","name":"_presale1","type":"address"},{"internalType":"address","name":"_presale2","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Claimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"oldToken","type":"address"},{"indexed":true,"internalType":"address","name":"newToken","type":"address"}],"name":"NUURTokenUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"NativeWithdrawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"presale1","type":"address"},{"indexed":false,"internalType":"address","name":"presale2","type":"address"}],"name":"PresaleContractsUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"balance","type":"uint256"}],"name":"SnapshotTaken","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TokensWithdrawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getClaimableAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"hasClaimed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nuurToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"presaleContract1","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"presaleContract2","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newToken","type":"address"}],"name":"setNUURToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_presale1","type":"address"},{"internalType":"address","name":"_presale2","type":"address"}],"name":"setPresaleContracts","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"snapshotBalances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"snapshotTimestamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"takeSnapshot","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"verifyPresaleParticipation","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdrawNative","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdrawTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];

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
    nuurToken = new ethers.Contract(NUUR_TOKEN_ADDRESS, nuurTokenAbi, provider);
    airdrop = new ethers.Contract(AIRDROP_CONTRACT_ADDRESS, airdropAbi, signer);

    try {
      const network = await provider.getNetwork();
      let networkLabel = "Unknown Network";
      if (network && network.chainId) {
        // Replace 12079 with Sidra Chain's actual chainId if different
        if (network.chainId === 12079) {
          networkLabel = "Sidra Chain";
        } else if (network.name && network.name !== "unknown") {
          networkLabel = network.name.charAt(0).toUpperCase() + network.name.slice(1);
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
    const [rawBalance, decimals] = await Promise.all([
      nuurToken.balanceOf(userAddress),
      nuurToken.decimals()
    ]);
    const balance = ethers.utils.formatUnits(rawBalance, decimals);
    nuurBalanceElem.textContent = parseFloat(balance).toLocaleString();

    const rawSnapshotBalance = await airdrop.snapshotBalances(userAddress);
    const snapshotBalance = ethers.utils.formatUnits(rawSnapshotBalance, decimals);
    snapshotBalanceElem.textContent = parseFloat(snapshotBalance).toLocaleString();

    const paused = await airdrop.paused();
    const eligible = await checkPresaleParticipation(userAddress);

    // Only eligible users can snapshot
    if (eligible) {
      presaleStatusElem.textContent = 'Eligible';
      // Only enable "Take Snapshot" if not yet snapshotted
      if (parseFloat(snapshotBalance) === 0) {
        takeSnapshotBtn.disabled = false;
        takeSnapshotBtn.classList.add('is-danger');
        takeSnapshotBtn.textContent = "Take Snapshot (Verify)";
        updateStatus('Take a snapshot to verify your presale status.', 'error');
      } else {
        takeSnapshotBtn.disabled = true;
        takeSnapshotBtn.classList.remove('is-danger');
        takeSnapshotBtn.textContent = "Take Snapshot";
        updateStatus('');
      }
    } else {
      presaleStatusElem.textContent = 'Not Verified';
      takeSnapshotBtn.disabled = true;
      takeSnapshotBtn.classList.remove('is-danger');
      takeSnapshotBtn.textContent = "Take Snapshot";
      updateStatus('You are not eligible to take a snapshot. Only presale participants can verify.', 'error');
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
    updateStatus('Failed to update wallet info. Please retry.', 'error');
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
    console.warn("Presale1 check error:", e);
  }
  try {
    amount2 = await presale2.buyers(address);
  } catch (e) {
    // Treat as 0 if contract errors (e.g. not started)
    console.warn("Presale2 check error:", e);
  }
  return amount1.gt(0) || amount2.gt(0);
}

// ====== SNAPSHOT FUNCTIONALITY ======
async function handleTakeSnapshot() {
  if (!airdrop) return;

  // Check eligibility before allowing snapshot
  let eligible = false;
  try {
    eligible = await checkPresaleParticipation(userAddress);
  } catch (err) {
    updateStatus('Unable to verify eligibility. Please try again.', 'error');
    console.error('Eligibility check error:', err);
    takeSnapshotBtn.disabled = false;
    return;
  }

  if (!eligible) {
    updateStatus('You are not eligible to take a snapshot. Only presale participants can verify.', 'error');
    takeSnapshotBtn.disabled = true;
    return;
  }

  takeSnapshotBtn.disabled = true;
  updateStatus('Taking snapshot for verification...', 'success');
  try {
    const tx = await airdrop.takeSnapshot();
    await tx.wait();
    updateStatus('Snapshot taken! You are now verified.', 'success');
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
    await tx.wait();
    updateStatus('Airdrop claimed successfully!', 'success');
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
