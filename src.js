class AutoDope {
  private isEnabled: boolean = false;
  private titleEl: HTMLElement | null;
  private dopeBtn: HTMLElement | null;
  private mutationObserver: MutationObserver | null = null;
  private toggleBtn: HTMLElement | null = null;

  constructor() {
    this.titleEl = document.querySelector('#trackTitle a');
    this.dopeBtn = document.querySelector("[title='Vote Up']");

    if (!this.titleEl || !this.dopeBtn) {
      console.error('AutoDope: Required elements not found');
      return;
    }

    this.init();
  }

  private init(): void {
    this.setupMutationObserver();
    this.createToggleButton();
  }

  private setupMutationObserver(): void {
    this.mutationObserver = new MutationObserver(() => this.onTrackChange());
    this.mutationObserver.observe(this.titleEl!, {
      childList: true,
      subtree: true, // Also observe nested changes
    });
  }

  private onTrackChange(): void {
    if (this.titleEl) {
      console.log('Track changed:', this.titleEl.textContent);
    }
    if (this.isEnabled && this.dopeBtn) {
      this.dopeBtn.click();
      console.log('Auto-voted track');
    }
  }

  private createToggleButton(): void {
    this.toggleBtn = document.createElement('button');
    this.toggleBtn.textContent = 'AutoDope';
    this.toggleBtn.setAttribute('aria-label', 'Toggle AutoDope');
    
    Object.assign(this.toggleBtn.style, {
      position: 'absolute',
      bottom: '50px',
      right: '20px',
      padding: '8px 12px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      backgroundColor: '#f0f0f0',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: 'bold',
      zIndex: '9999',
      transition: 'all 0.3s ease',
    });

    this.toggleBtn.addEventListener('click', () => this.toggle());
    document.body.appendChild(this.toggleBtn);
  }

  private loadState(): void {
    const saved = localStorage.getItem('autoDope_enabled');
    this.isEnabled = saved === 'true';
    if (this.toggleBtn) this.updateButtonState();
  }

  private saveState(): void {
    localStorage.setItem('autoDope_enabled', this.isEnabled.toString());
  }
  
  private toggle(): void {
    this.isEnabled = !this.isEnabled;
    this.saveState();
    this.updateButtonState();
    console.log(`AutoDope is now ${this.isEnabled ? 'ON' : 'OFF'}`);
  }

  private updateButtonState(): void {
    if (!this.toggleBtn) return;

    if (this.isEnabled) {
      this.toggleBtn.style.backgroundColor = '#4CAF50';
      this.toggleBtn.style.color = 'white';
      this.toggleBtn.textContent = '✓ AutoDope ON';
    } else {
      this.toggleBtn.style.backgroundColor = '#f0f0f0';
      this.toggleBtn.style.color = 'black';
      this.toggleBtn.textContent = 'AutoDope';
    }
  }

  public destroy(): void {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
    if (this.toggleBtn) {
      this.toggleBtn.removeEventListener('click', () => this.toggle());
      this.toggleBtn.remove();
    }
  }
}

// Initialize
let autoDopeInstance: AutoDope | null = null;

if (!autoDopeInstance) {
  autoDopeInstance = new AutoDope();
}

// Optional: Add to window for console access
(window as any).autoDope = autoDopeInstance;
