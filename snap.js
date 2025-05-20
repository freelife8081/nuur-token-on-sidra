class AirdropInterface {
    constructor() {
        this.provider = null;
        this.signer = null;
        this.contract = null;
        this.nuurToken = null;
        
        // Contract addresses - Replace these with your deployed contract addresses
        this.contractAddress = "YOUR_AIRDROP_CONTRACT_ADDRESS";
        this.nuurTokenAddress = "YOUR_NUUR_TOKEN_ADDRESS";
        this.presaleContract1 = "YOUR_PRESALE_CONTRACT_1_ADDRESS";
        this.presaleContract2 = "YOUR_PRESALE_CONTRACT_2_ADDRESS";
        
        // Current user info
        this.currentUser = 'freelife8081';
        
        this.init();
        this.updateCurrentTime();
    }

    async init() {
        this.setupEventListeners();
        
        if (typeof window.ethereum !== 'undefined') {
            this.provider = new ethers.providers.Web3Provider(window.ethereum);
            await this.setupEthereumEvents();
            this.checkNetwork();
        } else {
            this.updateStatus('Please install MetaMask to use this dApp', 'error');
        }
    }

    setupEventListeners() {
        document.getElementById('connectWallet').addEventListener('click', () => this.connectWallet());
        document.getElementById('takeSnapshot').addEventListener('click', () => this.takeSnapshot());
        document.getElementById('claimButton').addEventListener('click', () => this.claimAirdrop());
    }

    async setupEthereumEvents() {
        window.ethereum.on('accountsChanged', (accounts) => {
            if (accounts.length > 0) {
                this.updateWalletInfo(accounts[0]);
            } else {
                this.resetUI();
            }
        });

        window.ethereum.on('chainChanged', () => {
            window.location.reload();
        });
    }

    updateCurrentTime() {
        const updateTime = () => {
            const now = new Date();
            const timeString = now.toISOString().replace('T', ' ').substr(0, 19);
            document.getElementById('currentTime').textContent = timeString;
        };
        updateTime();
        setInterval(updateTime, 1000);
    }

    async checkNetwork() {
        try {
            const network = await this.provider.getNetwork();
            const networkName = this.getNetworkName(network.chainId);
            document.getElementById('networkName').textContent = networkName;
            document.querySelector('.status-dot').classList.toggle('connected', true);
        } catch (error) {
            console.error('Error checking network:', error);
        }
    }

    getNetworkName(chainId) {
        const networks = {
            1: 'Ethereum Mainnet',
            3: 'Ropsten',
            4: 'Rinkeby',
            5: 'Goerli',
            42: 'Kovan',
            56: 'BSC Mainnet',
            97: 'BSC Testnet'
        };
        return networks[chainId] || 'Unknown Network';
    }

    async connectWallet() {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            this.signer = this.provider.getSigner();
            
            this.contract = new ethers.Contract(this.contractAddress, contractABI, this.signer);
            this.nuurToken = new ethers.Contract(
                this.nuurTokenAddress,
                [
                    "function balanceOf(address) view returns (uint256)",
                    "function decimals() view returns (uint8)"
                ],
                this.signer
            );

            await this.updateWalletInfo(accounts[0]);
            this.updateStatus('Wallet connected successfully!', 'success');
        } catch (error) {
            this.updateStatus('Failed to connect wallet: ' + error.message, 'error');
        }
    }

    async checkPresaleParticipation(address) {
        try {
            const isParticipant = await this.contract.verifyPresaleParticipation(address);
            const presaleStatus = document.getElementById('presaleStatus');
            presaleStatus.textContent = isParticipant ? 'Verified' : 'Not Eligible';
            presaleStatus.style.color = isParticipant ? 'var(--success-color)' : 'var(--error-color)';
            return isParticipant;
        } catch (error) {
            console.error('Error checking presale participation:', error);
            return false;
        }
    }

    async takeSnapshot() {
        try {
            const address = await this.signer.getAddress();
            const tx = await this.contract.takeSnapshot(address);
            this.updateStatus('Taking snapshot of your balance...', 'info');
            await tx.wait();
            this.updateStatus('Snapshot taken successfully!', 'success');
            await this.updateWalletInfo(address);
        } catch (error) {
            this.updateStatus('Failed to take snapshot: ' + error.message, 'error');
        }
    }

    async updateWalletInfo(address) {
        document.getElementById('walletAddress').textContent = this.shortenAddress(address);
        
        try {
            // Check if contract is paused
            const isPaused = await this.isPaused();
            
            // Get current balance
            const balance = await this.nuurToken.balanceOf(address);
            const decimals = await this.nuurToken.decimals();
            const formattedBalance = ethers.utils.formatUnits(balance, decimals);
            document.getElementById('nuurBalance').textContent = parseFloat(formattedBalance).toLocaleString();

            // Get snapshot balance
            const snapshotBalance = await this.contract.snapshotBalances(address);
            const formattedSnapshotBalance = ethers.utils.formatUnits(snapshotBalance, decimals);
            document.getElementById('snapshotBalance').textContent = parseFloat(formattedSnapshotBalance).toLocaleString();

            // Check presale participation
            const isPresaleParticipant = await this.checkPresaleParticipation(address);

            // Check claimable amount
            const claimableAmount = await this.contract.getClaimableAmount(address);
            const formattedClaimable = ethers.utils.formatUnits(claimableAmount, decimals);
            document.getElementById('claimableAmount').textContent = parseFloat(formattedClaimable).toLocaleString();

            // Check if already claimed
            const hasClaimed = await this.contract.hasClaimed(address);
            
            // Update snapshot button
            const snapshotButton = document.getElementById('takeSnapshot');
            snapshotButton.disabled = snapshotBalance.gt(0) || !isPresaleParticipant;
            
            // Update claim button
            const claimButton = document.getElementById('claimButton');
            claimButton.disabled = hasClaimed || claimableAmount.eq(0) || isPaused || !isPresaleParticipant;
            claimButton.textContent = hasClaimed ? 'Already Claimed' : 
                                    isPaused ? 'Claiming Paused' :
                                    !isPresaleParticipant ? 'Not Eligible' : 
                                    'Claim Airdrop';
        } catch (error) {
            this.updateStatus('Error updating wallet info: ' + error.message, 'error');
        }
    }

    async claimAirdrop() {
        try {
            const tx = await this.contract.claim();
            this.updateStatus('Claiming airdrop... Please wait for transaction confirmation.', 'info');
            
            await tx.wait();
            this.updateStatus('Airdrop claimed successfully!', 'success');
            
            const address = await this.signer.getAddress();
            await this.updateWalletInfo(address);
        } catch (error) {
            this.updateStatus('Failed to claim airdrop: ' + error.message, 'error');
        }
    }

    async isPaused() {
        try {
            const paused = await this.contract.paused();
            if (paused) {
                this.updateStatus('Contract is currently paused', 'error');
            }
            return paused;
        } catch (error) {
            console.error('Error checking pause status:', error);
            return false;
        }
    }

    shortenAddress(address) {
        return address.slice(0, 6) + '...' + address.slice(-4);
    }

    updateStatus(message, type) {
        const statusElement = document.getElementById('status');
        statusElement.textContent = message;
        statusElement.className = 'status ' + type;
    }

    resetUI() {
        document.getElementById('walletAddress').textContent = 'Not Connected';
        document.getElementById('nuurBalance').textContent = '0';
        document.getElementById('snapshotBalance').textContent = '0';
        document.getElementById('claimableAmount').textContent = '0';
        document.getElementById('presaleStatus').textContent = 'Not Verified';
        document.getElementById('claimButton').disabled = true;
        document.getElementById('takeSnapshot').disabled = true;
        document.querySelector('.status-dot').classList.remove('connected');
        this.updateStatus('', '');
    }
}

// Initialize the app when the page loads
window.addEventListener('DOMContentLoaded', () => {
    new AirdropInterface();
});
