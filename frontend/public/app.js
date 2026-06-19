// Red Tiger Frontend Application
const API_URL = 'http://localhost:3000/api';

class RedTigerApp {
  constructor() {
    this.currentTest = null;
    this.init();
  }

  init() {
    this.render();
    this.attachEventListeners();
  }

  render() {
    document.getElementById('root').innerHTML = `
      <div class="container">
        <header>
          <h1>🐯 Red Tiger</h1>
          <p class="subtitle">Load Testing Tool - Test de performance serveur</p>
        </header>

        <div class="warning">
          ⚠️ <strong>AVERTISSEMENT LÉGAL</strong> : Cet outil ne doit être utilisé que sur vos propres serveurs ou avec l'autorisation explicite du propriétaire. Toute utilisation non autorisée est illégale.
        </div>

        <div class="content">
          <div class="card">
            <h2>⚙️ Configuration du Test</h2>
            
            <div class="form-group">
              <label for="url">URL Cible:</label>
              <input type="url" id="url" placeholder="https://example.com" value="https://reborn.unityrp.io/">
            </div>

            <div class="form-group">
              <label for="users">Nombre d'utilisateurs:</label>
              <input type="number" id="users" min="1" max="1000" value="100">
            </div>

            <div class="form-group">
              <label for="duration">Durée du test (secondes):</label>
              <input type="number" id="duration" min="1" max="3600" value="60">
            </div>

            <div class="form-group">
              <label for="fileSize">Taille fichiers (Mo):</label>
              <input type="number" id="fileSize" min="0.1" max="1000" value="10">
            </div>

            <button onclick="app.startTest()">🚀 Lancer le Test</button>
          </div>

          <div class="card">
            <h2>📊 État & Résultats</h2>
            <div id="status-container"></div>
          </div>
        </div>
      </div>
    `;
  }

  async startTest() {
    const url = document.getElementById('url').value;
    const users = parseInt(document.getElementById('users').value);
    const duration = parseInt(document.getElementById('duration').value);
    const fileSize = parseFloat(document.getElementById('fileSize').value);

    if (!url) {
      alert('Veuillez entrer une URL');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/test/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, users, duration, fileSize })
      });

      const data = await response.json();
      this.currentTest = data.testId;
      
      this.updateStatus('running');
      this.pollTestStatus();
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors du lancement du test');
    }
  }

  async pollTestStatus() {
    if (!this.currentTest) return;

    try {
      const response = await fetch(`${API_URL}/test/${this.currentTest}/status`);
      const data = await response.json();

      if (data.status === 'running') {
        this.updateStatus('running');
        setTimeout(() => this.pollTestStatus(), 1000);
      } else if (data.status === 'completed') {
        this.updateStatus('completed', data);
        this.getResults();
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  }

  async getResults() {
    try {
      const response = await fetch(`${API_URL}/test/${this.currentTest}/results`);
      const data = await response.json();
      this.displayResults(data);
    } catch (error) {
      console.error('Erreur:', error);
    }
  }

  updateStatus(status, data = {}) {
    const container = document.getElementById('status-container');
    
    if (status === 'running') {
      container.innerHTML = `
        <div class="status running">
          <div class="loader"></div> Test en cours...
        </div>
      `;
    } else if (status === 'completed') {
      const duration = data.endTime - data.startTime;
      container.innerHTML = `
        <div class="status completed">
          ✅ Test complété en ${(duration / 1000).toFixed(2)}s
        </div>
      `;
    }
  }

  displayResults(data) {
    const container = document.getElementById('status-container');
    const { results, duration, url } = data;

    container.innerHTML = `
      <div class="status completed">✅ Test complété</div>
      
      <div class="results">
        <div class="result-item">
          <div class="result-label">Durée Totale</div>
          <div class="result-value">${(duration / 1000).toFixed(2)}s</div>
        </div>
        <div class="result-item">
          <div class="result-label">URL Testée</div>
          <div class="result-value" style="font-size: 1em; word-break: break-all;">${url}</div>
        </div>
        <div class="result-item">
          <div class="result-label">État</div>
          <div class="result-value">✅ Succès</div>
        </div>
        <div class="result-item">
          <div class="result-label">Timestamp</div>
          <div class="result-value" style="font-size: 0.9em;">${new Date().toLocaleTimeString()}</div>
        </div>
      </div>

      <button onclick="app.init()" style="margin-top: 20px;">Nouveau Test</button>
    `;
  }

  attachEventListeners() {
    // Event listeners attached via onclick
  }
}

const app = new RedTigerApp();