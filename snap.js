class AirdropInterface {
    constructor() {
        this.provider = null;
        this.signer = null;
        this.contract = null;
        this.nuurToken = null;
        this._decimals = null;

        // Contract addresses - Replace with your deployed addresses
        this.contractAddress = "0x8e4384ed929b82A2FEE2e6F043213170C1d905D9";
        this.nuurTokenAddress = "0x003BEc2e6ef4369f9d968eCD288d31B59fD9c2CD";
        this.presaleContract1 = "0x98FCc396547D450208e926995a74b61874a1423A";
        this.presaleContract2 = "0x858024C3c8179Ed448A9133190f991cfA9873657";

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
                this.provider = new ethers.providers.Web3Provider(window.ethereum);
                await this.setupEthereumEvents();
                // Network check removed as per your request
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
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

            if (accounts.length === 0) throw new Error('No accounts available');

            this.signer = this.provider.getSigner();

            // ABI for the main airdrop contract
            const contractABI = [{"inputs":[{"internalType":"address","name":"_nuurToken","type":"address"},{"internalType":"address","name":"_presale1","type":"address"},{"internalType":"address","name":"_presale2","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Claimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"oldToken","type":"address"},{"indexed":true,"internalType":"address","name":"newToken","type":"address"}],"name":"NUURTokenUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"NativeWithdrawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"presale1","type":"address"},{"indexed":false,"internalType":"address","name":"presale2","type":"address"}],"name":"PresaleContractsUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"balance","type":"uint256"}],"name":"SnapshotTaken","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TokensWithdrawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getClaimableAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"hasClaimed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nuurToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"presaleContract1","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"presaleContract2","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newToken","type":"address"}],"name":"setNUURToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_presale1","type":"address"},{"internalType":"address","name":"_presale2","type":"address"}],"name":"setPresaleContracts","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"snapshotBalances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"snapshotTimestamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"takeSnapshot","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"verifyPresaleParticipation","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdrawNative","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdrawTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];

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

            // Button and status updates on connect
            const connectWalletBtn = document.getElementById('connectWallet');
            const networkName = document.getElementById('networkName');
            const statusDot = document.querySelector('.status-dot');
            if (connectWalletBtn) {
                connectWalletBtn.textContent = 'Connected';
                connectWalletBtn.disabled = true;
            }
            if (networkName) {
                networkName.textContent = 'Connected';
            }
            if (statusDot) {
                statusDot.classList.add('connected');
            }
        } catch (error) {
            console.error('Connection error:', error);
            this.updateStatus('Failed to connect wallet: ' + error.message, 'error');
        }
    }

    async getTokenDecimals() {
        if (this._decimals == null) {
            this._decimals = await this.nuurToken.decimals();
        }
        return this._decimals;
    }

    async updateWalletInfo(address) {
    if (!this.provider || !this.signer) return;

    try {
        document.getElementById('walletAddress').textContent = this.shortenAddress(address);

        // Show loading message for NUUR Balance
        const nuurBalanceElem = document.getElementById('nuurBalance');
        if (nuurBalanceElem) {
            nuurBalanceElem.textContent = 'fetching your NUUR balance...';
        }

        const isPaused = await this.isPaused();

        // Fetch token balance
        const balance = await this.nuurToken.balanceOf(address);
        const decimals = await this.getTokenDecimals();
        const formattedBalance = ethers.utils.formatUnits(balance, decimals);
        if (nuurBalanceElem) {
            nuurBalanceElem.textContent = parseFloat(formattedBalance).toLocaleString();
        }

        const snapshotBalance = await this.contract.snapshotBalances(address);
        const formattedSnapshotBalance = ethers.utils.formatUnits(snapshotBalance, decimals);
        document.getElementById('snapshotBalance').textContent = parseFloat(formattedSnapshotBalance).toLocaleString();

        await this.updateUIComponents(address, isPaused, snapshotBalance);
    } catch (error) {
        console.error('Error updating wallet info:', error);
        this.updateStatus('Error updating wallet info: ' + error.message, 'error');
        // Show error on NUUR balance if applicable
        const nuurBalanceElem = document.getElementById('nuurBalance');
        if (nuurBalanceElem) {
            nuurBalanceElem.textContent = '0';
        }
    }
}
    async updateUIComponents(address, isPaused, snapshotBalance) {
        try {
            const isPresaleParticipant = await this.checkPresaleParticipation(address);

            // Update Presale Status in UI
            const presaleStatus = document.getElementById('presaleStatus');
            if (presaleStatus) {
                presaleStatus.textContent = isPresaleParticipant ? 'Eligible' : 'Not Verified';
            }

            const claimableAmount = await this.contract.getClaimableAmount(address);
            const decimals = await this.getTokenDecimals();
            const formattedClaimable = ethers.utils.formatUnits(claimableAmount, decimals);
            document.getElementById('claimableAmount').textContent = parseFloat(formattedClaimable).toLocaleString();

            const hasClaimed = await this.contract.hasClaimed(address);

            const snapshotButton = document.getElementById('takeSnapshot');
            if (snapshotButton) {
                snapshotButton.disabled = snapshotBalance.gt(0) || !isPresaleParticipant;
            }

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

    async isPaused() {
        try {
            return await this.contract.paused();
        } catch (error) {
            console.error('Error checking paused state:', error);
            return false;
        }
    }

    async checkPresaleParticipation(address) {
        try {
            const presaleABI = ["function buyers(address) view returns (uint256)"];

            const presale1 = new ethers.Contract(this.presaleContract1, presaleABI, this.provider);
            const presale2 = new ethers.Contract(this.presaleContract2, presaleABI, this.provider);

            const amount1 = await presale1.buyers(address);
            const amount2 = await presale2.buyers(address);

            return amount1.gt(0) || amount2.gt(0);
        } catch (error) {
            console.error('Error checking presale participation:', error);
            return false;
        }
    }

    async claimAirdrop() {
        try {
            const tx = await this.contract.claim();
            this.updateStatus('Claiming airdrop...', 'success');
            await tx.wait();
            this.updateStatus('Airdrop claimed successfully!', 'success');
            const address = await this.signer.getAddress();
            await this.updateWalletInfo(address);
        } catch (error) {
            console.error('Error claiming airdrop:', error);
            this.updateStatus('Claim failed: ' + error.message, 'error');
        }
    }

    async takeSnapshot() {
        try {
            const tx = await this.contract.takeSnapshot();
            this.updateStatus('Taking snapshot...', 'success');
            await tx.wait();
            this.updateStatus('Snapshot taken successfully!', 'success');
            const address = await this.signer.getAddress();
            await this.updateWalletInfo(address);
        } catch (error) {
            console.error('Error taking snapshot:', error);
            this.updateStatus('Snapshot failed: ' + error.message, 'error');
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
            if (element) element.textContent = value;
        }

        const buttons = ['claimButton', 'takeSnapshot'];
        buttons.forEach(id => {
            const button = document.getElementById(id);
            if (button) button.disabled = true;
        });

        // Reset connect button and network status
        const connectWalletBtn = document.getElementById('connectWallet');
        const networkName = document.getElementById('networkName');
        const statusDot = document.querySelector('.status-dot');
        if (connectWalletBtn) {
            connectWalletBtn.textContent = 'Connect Wallet';
            connectWalletBtn.disabled = false;
        }
        if (networkName) {
            networkName.textContent = 'Not Connected';
        }
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

    shortenAddress(address) {
        return address.slice(0, 6) + '...' + address.slice(-4);
    }
}

// Initialize when page loads
window.addEventListener('DOMContentLoaded', () => {
    new AirdropInterface();
});
