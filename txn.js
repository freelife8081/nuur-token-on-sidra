document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const ledgerBody = document.getElementById('ledger-body');
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const pageInfo = document.getElementById('page-info');
    
    // State variables
    let currentFilter = 'all';
    let currentPage = 1;
    let isSearching = false;
    let currentSearchTerm = '';
    let pollingInterval;
    
    // Initialize
    fetchRecentTransactions();
    startPolling();
    
    // Event listeners
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') handleSearch();
    });
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.filter;
            filterTransactions();
        });
    });
    
    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updatePagination();
            if (isSearching) {
                searchTransactions(currentSearchTerm);
            } else {
                fetchRecentTransactions();
            }
        }
    });
    
    nextPageBtn.addEventListener('click', () => {
        currentPage++;
        updatePagination();
        if (isSearching) {
            searchTransactions(currentSearchTerm);
        } else {
            fetchRecentTransactions();
        }
    });
    
    // Functions
    function startPolling() {
        // Clear any existing interval
        if (pollingInterval) clearInterval(pollingInterval);
        
        // Poll for new transactions every 15 seconds
        pollingInterval = setInterval(() => {
            if (!isSearching) {
                fetchRecentTransactions(true); // true means we're polling for new txns
            }
        }, 15000);
    }
    
    async function fetchRecentTransactions(isPolling = false) {
        try {
            if (!isPolling) {
                ledgerBody.innerHTML = '<div class="loading">Loading transactions...</div>';
            }
            
            // In a real implementation, you would fetch from node.sidrachain.com
            // For this example, we'll use mock data or a testnet API if available
            let apiUrl;
            
            if (isPolling) {
                // For polling, we only want transactions from the last minute
                const timestamp = Math.floor(Date.now() / 1000) - 60;
                apiUrl = `https://node.sidrachain.com/api?module=transaction&action=getlasttransactions&timestamp=${timestamp}`;
            } else {
                apiUrl = `https://node.sidrachain.com/api?module=transaction&action=getlasttransactions&page=${currentPage}`;
            }
            
            // Since we can't actually connect to node.sidrachain.com from a static site,
            // we'll use mock data for this example
            // In a real implementation, you would use fetch(apiUrl) here
            
            // Mock data - replace with actual API call
            const mockTransactions = generateMockTransactions(isPolling ? 3 : 10);
            
            if (isPolling && mockTransactions.length > 0) {
                // Prepend new transactions to the ledger
                const existingTransactions = Array.from(ledgerBody.children).filter(el => el.classList.contains('transaction'));
                const existingTxHashes = existingTransactions.map(tx => tx.dataset.txhash);
                
                const newTransactions = mockTransactions.filter(tx => !existingTxHashes.includes(tx.hash));
                
                if (newTransactions.length > 0) {
                    const fragment = document.createDocumentFragment();
                    newTransactions.forEach(tx => {
                        fragment.appendChild(createTransactionElement(tx));
                    });
                    
                    ledgerBody.insertBefore(fragment, ledgerBody.firstChild);
                    
                    // Show a notification
                    showNotification(`${newTransactions.length} new transaction(s) found`);
                }
            } else if (!isPolling) {
                // Display all transactions
                displayTransactions(mockTransactions);
            }
        } catch (error) {
            console.error('Error fetching transactions:', error);
            ledgerBody.innerHTML = '<div class="loading error">Failed to load transactions. Please try again later.</div>';
        }
    }
    
    function generateMockTransactions(count) {
        const methods = ['Transfer', 'Approve', 'Swap', 'Mint', 'Burn'];
        const types = ['native', 'contract', 'contract', 'contract', 'contract']; // More contract txns for variety
        const addresses = [
            '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
            '0x1a5a73fC2F2F2F2F2F2F2F2F2F2F2F2F2F2F2F2F',
            '0x2c8c99fF2F2F2F2F2F2F2F2F2F2F2F2F2F2F2F2F',
            '0xf2b035f2F2F2F2F2F2F2F2F2F2F2F2F2F2F2F2F',
            '0x0d1b2a0d1b2a0d1b2a0d1b2a0d1b2a0d1b2a0d1b2a'
        ];
        
        const transactions = [];
        
        for (let i = 0; i < count; i++) {
            const isNative = Math.random() > 0.7; // 30% chance of being native
            const methodIndex = isNative ? 0 : Math.floor(Math.random() * (methods.length - 1)) + 1;
            
            transactions.push({
                hash: `0x${Math.random().toString(16).substr(2, 64)}`,
                from: addresses[Math.floor(Math.random() * addresses.length)],
                to: addresses[Math.floor(Math.random() * addresses.length)],
                method: methods[methodIndex],
                type: isNative ? 'native' : types[methodIndex],
                amount: (Math.random() * 1000).toFixed(4) + ' SDA',
                timestamp: Math.floor(Date.now() / 1000) - Math.floor(Math.random() * 3600),
                contractAddress: isNative ? null : '0xcontract' + Math.random().toString(16).substr(2, 40)
            });
        }
        
        return transactions;
    }
    
    function displayTransactions(transactions) {
        if (transactions.length === 0) {
            ledgerBody.innerHTML = '<div class="loading">No transactions found</div>';
            return;
        }
        
        ledgerBody.innerHTML = '';
        const fragment = document.createDocumentFragment();
        
        transactions.forEach(tx => {
            fragment.appendChild(createTransactionElement(tx));
        });
        
        ledgerBody.appendChild(fragment);
        filterTransactions();
    }
    
    function createTransactionElement(tx) {
        const txElement = document.createElement('div');
        txElement.className = `transaction ${tx.type}`;
        txElement.dataset.txhash = tx.hash;
        txElement.dataset.type = tx.type;
        
        const timeAgo = formatTimeAgo(tx.timestamp);
        
        txElement.innerHTML = `
            <div class="address from">${shortenAddress(tx.from)}</div>
            <div class="address to">${shortenAddress(tx.to)}</div>
            <div class="method method-${tx.type === 'native' ? 'transfer' : 'contract'}">${tx.method}</div>
            <div class="amount">${tx.amount}</div>
            <div class="time" title="${new Date(tx.timestamp * 1000).toLocaleString()}">${timeAgo}</div>
            <div class="txn-link">
                <a href="https://ledger.sidrachain.com/tx/${tx.hash}" target="_blank" title="View on Ledger">
                    <i class="fas fa-external-link-alt"></i>
                </a>
            </div>
        `;
        
        return txElement;
    }
    
    function shortenAddress(address) {
        return address ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}` : '';
    }
    
    function formatTimeAgo(timestamp) {
        const seconds = Math.floor((Date.now() / 1000) - timestamp);
        
        if (seconds < 60) return `${seconds} sec ago`;
        if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)} hr ago`;
        return `${Math.floor(seconds / 86400)} days ago`;
    }
    
    function filterTransactions() {
        const transactions = ledgerBody.querySelectorAll('.transaction');
        
        transactions.forEach(tx => {
            const shouldShow = 
                currentFilter === 'all' || 
                (currentFilter === 'native' && tx.dataset.type === 'native') ||
                (currentFilter === 'contract' && tx.dataset.type === 'contract');
            
            tx.style.display = shouldShow ? 'grid' : 'none';
        });
    }
    
    function handleSearch() {
        const searchTerm = searchInput.value.trim();
        
        if (searchTerm) {
            currentSearchTerm = searchTerm;
            isSearching = true;
            currentPage = 1;
            updatePagination();
            searchTransactions(searchTerm);
        } else {
            isSearching = false;
            currentPage = 1;
            updatePagination();
            fetchRecentTransactions();
        }
    }
    
    async function searchTransactions(term) {
        try {
            ledgerBody.innerHTML = '<div class="loading">Searching transactions...</div>';
            
            // Determine if the term is a block number, tx hash, or address
            let apiUrl;
            
            if (term.startsWith('0x') && term.length === 66) {
                // Probably a transaction hash
                apiUrl = `https://node.sidrachain.com/api?module=transaction&action=gettxinfo&txhash=${term}`;
            } else if (term.startsWith('0x') && term.length === 42) {
                // Probably an address
                apiUrl = `https://node.sidrachain.com/api?module=account&action=txlist&address=${term}&page=${currentPage}`;
            } else if (!isNaN(term)) {
                // Probably a block number
                apiUrl = `https://node.sidrachain.com/api?module=block&action=getblocktxns&blockno=${term}`;
            } else {
                throw new Error('Invalid search term');
            }
            
            // Mock search results - replace with actual API call
            const mockResults = generateMockTransactions(5).map(tx => {
                // Modify some fields to match the search term
                if (term.startsWith('0x') && term.length === 42) {
                    // Address search - randomly assign to from or to
                    if (Math.random() > 0.5) {
                        tx.from = term;
                    } else {
                        tx.to = term;
                    }
                } else if (term.startsWith('0x') && term.length === 66) {
                    // Tx hash search
                    tx.hash = term;
                }
                return tx;
            });
            
            displayTransactions(mockResults);
        } catch (error) {
            console.error('Error searching transactions:', error);
            ledgerBody.innerHTML = '<div class="loading error">Search failed. Please check your input and try again.</div>';
        }
    }
    
    function updatePagination() {
        pageInfo.textContent = `Page ${currentPage}`;
        prevPageBtn.disabled = currentPage <= 1;
        
        // In a real implementation, you would know if there's a next page
        // For this example, we'll always enable it
        nextPageBtn.disabled = false;
    }
    
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.backgroundColor = 'var(--success-color)';
        notification.style.color = 'white';
        notification.style.padding = '10px 20px';
        notification.style.borderRadius = '4px';
        notification.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
        notification.style.zIndex = '1000';
        notification.style.animation = 'slideIn 0.3s, fadeOut 0.5s 2.5s';
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
    
    // Add some simple animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        
        .notification {
            transition: all 0.3s;
        }
    `;
    document.head.appendChild(style);
});
