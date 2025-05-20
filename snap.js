class AirdropInterface {
    constructor() {
        this.provider = null;
        this.signer = null;
        this.contract = null;
        this.nuurToken = null;
        
        // Contract addresses - Replace these with your deployed contract addresses
        this.contractAddress = "0x8e4384ed929b82A2FEE2e6F043213170C1d905D9";
        this.nuurTokenAddress = "0x003BEc2e6ef4369f9d968eCD288d31B59fD9c2CD";
        this.presaleContract1 = "0x98FCc396547D450208e926995a74b61874a1423A";
        this.presaleContract2 = "0x858024C3c8179Ed448A9133190f991cfA9873657";
        
        // Current user info
        this.currentUser = 'freelife8081';
        
        this.init();
        this.updateCurrentTime();
    }

    async init() {
        try {
            this.setupEventListeners();
            await this.initializeProvider();
        } catch (error) {
            console.error('Initialization error:', error);
            this.updateStatus('Failed to initialize: ' + error.message, 'error');
        }
    }

    async initializeProvider() {
        if (typeof window.ethereum !== 'undefined') {
            try {
                // Initialize provider
                this.provider = new ethers.providers.Web3Provider(window.ethereum);
                await this.setupEthereumEvents();
                await this.checkNetwork();
            } catch (error) {
                console.error('Provider initialization error:', error);
                this.updateStatus('Failed to initialize provider', 'error');
            }
        } else {
            this.updateStatus('Please install MetaMask to claim airdrop', 'error');
            document.getElementById('connectWallet').disabled = true;
        }
    }

    setupEventListeners() {
        const connectWalletBtn = document.getElementById('connectWallet');
        const takeSnapshotBtn = document.getElementById('takeSnapshot');
        const claimButton = document.getElementById('claimButton');

        if (connectWalletBtn) {
            connectWalletBtn.addEventListener('click', () => this.connectWallet());
        }
        if (takeSnapshotBtn) {
            takeSnapshotBtn.addEventListener('click', () => this.takeSnapshot());
        }
        if (claimButton) {
            claimButton.addEventListener('click', () => this.claimAirdrop());
        }
    }

    async setupEthereumEvents() {
        if (!window.ethereum) return;

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

        // Check if already connected
        const accounts = await this.provider.listAccounts();
        if (accounts.length > 0) {
            await this.updateWalletInfo(accounts[0]);
        }
    }

    updateCurrentTime() {
        const updateTime = () => {
            const now = new Date();
            const timeString = now.toISOString().replace('T', ' ').substr(0, 19);
            const timeElement = document.getElementById('currentTime');
            if (timeElement) {
                timeElement.textContent = timeString;
            }
        };
        updateTime();
        setInterval(updateTime, 1000);
    }

    async connectWallet() {
        if (!this.provider) {
            await this.initializeProvider();
        }

        try {
            // Request account access
            const accounts = await window.ethereum.request({ 
                method: 'eth_requestAccounts' 
            });

            if (accounts.length === 0) {
                throw new Error('No accounts available');
            }

            // Initialize signer
            this.signer = this.provider.getSigner();
            
            // Initialize contracts
            this.contract = new ethers.Contract(
                this.contractAddress, 
                contractABI, 
                this.signer
            );
            
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
            console.error('Connection error:', error);
            this.updateStatus('Failed to connect wallet: ' + error.message, 'error');
        }
    }

    // ... (rest of the methods remain the same)

    async updateWalletInfo(address) {
        if (!this.provider || !this.signer) {
            console.error('Provider or signer not initialized');
            return;
        }

        try {
            document.getElementById('walletAddress').textContent = this.shortenAddress(address);
            
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

            // Update UI components
            this.updateUIComponents(address, isPaused, snapshotBalance);
        } catch (error) {
            console.error('Error updating wallet info:', error);
            this.updateStatus('Error updating wallet info: ' + error.message, 'error');
        }
    }

    async updateUIComponents(address, isPaused, snapshotBalance) {
        try {
            // Check presale participation
            const isPresaleParticipant = await this.checkPresaleParticipation(address);

            // Check claimable amount
            const claimableAmount = await this.contract.getClaimableAmount(address);
            const decimals = await this.nuurToken.decimals();
            const formattedClaimable = ethers.utils.formatUnits(claimableAmount, decimals);
            document.getElementById('claimableAmount').textContent = parseFloat(formattedClaimable).toLocaleString();

            // Check if already claimed
            const hasClaimed = await this.contract.hasClaimed(address);
            
            // Update snapshot button
            const snapshotButton = document.getElementById('takeSnapshot');
            if (snapshotButton) {
                snapshotButton.disabled = snapshotBalance.gt(0) || !isPresaleParticipant;
            }
            
            // Update claim button
            const claimButton = document.getElementById('claimButton');
            if (claimButton) {
                claimButton.disabled = hasClaimed || claimableAmount.eq(0) || isPaused || !isPresaleParticipant;
                claimButton.textContent = hasClaimed ? 'Already Claimed' : 
                                        isPaused ? 'Claiming Paused' :
                                        !isPresaleParticipant ? 'Not Eligible' : 
                                        'Claim Airdrop';
            }
        } catch (error) {
            console.error('Error updating UI components:', error);
            this.updateStatus('Error updating UI: ' + error.message, 'error');
        }
    }

    resetUI() {
        const elements = {
            'walletAddress': 'Not Connected',
            'nuurBalance': '0',
            'snapshotBalance': '0',
            'claimableAmount': '0',
            'presaleStatus': 'Not Verified'
        };

        for (const [id, value] of Object.entries(elements)) {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = value;
            }
        }

        const buttons = ['claimButton', 'takeSnapshot'];
        buttons.forEach(id => {
            const button = document.getElementById(id);
            if (button) {
                button.disabled = true;
            }
        });

        const statusDot = document.querySelector('.status-dot');
        if (statusDot) {
            statusDot.classList.remove('connected');
        }

        this.updateStatus('', '');
    }

    updateStatus(message, type) {
        const statusElement = document.getElementById('status');
        if (statusElement) {
            statusElement.textContent = message;
            statusElement.className = 'status ' + type;
        }
    }
}

// Initialize the app when the page loads
window.addEventListener('DOMContentLoaded', () => {
    new AirdropInterface();
});
