class GitHubLinkConverter {
    constructor() {
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Get DOM elements
        this.linkInput = document.getElementById('linkInput');
        this.convertBtn = document.getElementById('convertBtn');
        this.clearBtn = document.getElementById('clearBtn');
        this.resultSection = document.getElementById('resultSection');
        this.resultInput = document.getElementById('resultInput');
        this.copyBtn = document.getElementById('copyBtn');
        this.openBtn = document.getElementById('openBtn');
        this.copyIcon = document.getElementById('copyIcon');
        this.messageSection = document.getElementById('messageSection');

        // Add event listeners
        this.convertBtn.addEventListener('click', () => this.convertLink());
        this.clearBtn.addEventListener('click', () => this.clearFields());
        this.copyBtn.addEventListener('click', () => this.copyToClipboard());
        this.copyIcon.addEventListener('click', () => this.copyToClipboard());
        this.openBtn.addEventListener('click', () => this.openLink());
        
        // Allow Enter key to trigger conversion
        this.linkInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.convertLink();
            }
        });

        // Clear messages when user starts typing
        this.linkInput.addEventListener('input', () => {
            this.clearMessages();
        });
    }

    convertLink() {
        const inputUrl = this.linkInput.value.trim();
        
        if (!inputUrl) {
            this.showMessage('Please enter a GitHub link', 'error');
            return;
        }

        try {
            let convertedUrl;
            
            if (this.isGitHubRepoLink(inputUrl)) {
                convertedUrl = this.convertRepoToPages(inputUrl);
                this.showMessage('Converted to GitHub Pages link', 'success');
            } else if (this.isGitHubPagesLink(inputUrl)) {
                convertedUrl = this.convertPagesToRepo(inputUrl);
                this.showMessage('Converted to GitHub repository link', 'success');
            } else {
                this.showMessage('Invalid GitHub link format. Please check the examples below.', 'error');
                return;
            }

            this.displayResult(convertedUrl);
        } catch (error) {
            this.showMessage(`Error: ${error.message}`, 'error');
        }
    }

    isGitHubRepoLink(url) {
        const repoPattern = /^https:\/\/github\.com\/([^\/]+)\/([^\/]+)\/blob\/([^\/]+)\/(.+)$/;
        return repoPattern.test(url);
    }

    isGitHubPagesLink(url) {
        const pagesPattern = /^https:\/\/([^\.]+)\.github\.io\/([^\/]+)\/(.+)$/;
        return pagesPattern.test(url);
    }

    convertRepoToPages(repoUrl) {
        const repoPattern = /^https:\/\/github\.com\/([^\/]+)\/([^\/]+)\/blob\/([^\/]+)\/(.+)$/;
        const match = repoUrl.match(repoPattern);
        
        if (!match) {
            throw new Error('Invalid GitHub repository link format');
        }

        const [, username, repoName, branch, filePath] = match;
        
        // GitHub Pages URLs don't include the branch in the path
        return `https://${username}.github.io/${repoName}/${filePath}`;
    }

    convertPagesToRepo(pagesUrl) {
        const pagesPattern = /^https:\/\/([^\.]+)\.github\.io\/([^\/]+)\/(.+)$/;
        const match = pagesUrl.match(pagesPattern);
        
        if (!match) {
            throw new Error('Invalid GitHub Pages link format');
        }

        const [, username, repoName, filePath] = match;
        
        // Default to 'main' branch, but user might need to adjust this
        return `https://github.com/${username}/${repoName}/blob/main/${filePath}`;
    }

    displayResult(convertedUrl) {
        this.resultInput.value = convertedUrl;
        this.resultSection.style.display = 'block';
        
        // Scroll to result
        this.resultSection.scrollIntoView({ behavior: 'smooth' });
    }

    clearFields() {
        this.linkInput.value = '';
        this.resultInput.value = '';
        this.resultSection.style.display = 'none';
        this.clearMessages();
        this.linkInput.focus();
    }

    async copyToClipboard() {
        const textToCopy = this.resultInput.value;
        
        if (!textToCopy) {
            this.showMessage('No link to copy', 'error');
            return;
        }

        try {
            await navigator.clipboard.writeText(textToCopy);
            this.showMessage('Link copied to clipboard!', 'success');
            
            // Visual feedback
            this.copyBtn.classList.add('is-loading');
            setTimeout(() => {
                this.copyBtn.classList.remove('is-loading');
            }, 500);
        } catch (error) {
            // Fallback for older browsers
            this.fallbackCopyToClipboard(textToCopy);
        }
    }

    fallbackCopyToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            this.showMessage('Link copied to clipboard!', 'success');
        } catch (error) {
            this.showMessage('Failed to copy link. Please copy manually.', 'error');
        } finally {
            document.body.removeChild(textArea);
        }
    }

    openLink() {
        const linkToOpen = this.resultInput.value;
        
        if (!linkToOpen) {
            this.showMessage('No link to open', 'error');
            return;
        }

        window.open(linkToOpen, '_blank');
        this.showMessage('Opening link in new tab...', 'info');
    }

    showMessage(message, type = 'info') {
        const alertClass = this.getAlertClass(type);
        const iconClass = this.getIconClass(type);
        
        this.messageSection.innerHTML = `
            <div class="notification ${alertClass}">
                <button class="delete" onclick="this.parentElement.remove()"></button>
                <span class="icon">
                    <i class="${iconClass}"></i>
                </span>
                ${message}
            </div>
        `;
    }

    getAlertClass(type) {
        const classes = {
            'success': 'is-success',
            'error': 'is-danger',
            'warning': 'is-warning',
            'info': 'is-info'
        };
        return classes[type] || 'is-info';
    }

    getIconClass(type) {
        const icons = {
            'success': 'fas fa-check-circle',
            'error': 'fas fa-exclamation-triangle',
            'warning': 'fas fa-exclamation-circle',
            'info': 'fas fa-info-circle'
        };
        return icons[type] || 'fas fa-info-circle';
    }

    clearMessages() {
        this.messageSection.innerHTML = '';
    }
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new GitHubLinkConverter();
});

// Add some utility functions for additional functionality
const Utils = {
    // Validate URL format
    isValidUrl: (string) => {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    },

    // Extract repository info from GitHub URL
    extractRepoInfo: (url) => {
        const patterns = {
            repo: /^https:\/\/github\.com\/([^\/]+)\/([^\/]+)/,
            pages: /^https:\/\/([^\.]+)\.github\.io\/([^\/]+)/
        };

        for (const [type, pattern] of Object.entries(patterns)) {
            const match = url.match(pattern);
            if (match) {
                return {
                    type,
                    username: match[1],
                    repository: match[2]
                };
            }
        }
        return null;
    },

    // Format file size
    formatFileSize: (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
};