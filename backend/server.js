const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Store pour les tests en cours
const activeTests = new Map();

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Red Tiger Backend is running' });
});

// Lancer un test de charge
app.post('/api/test/start', (req, res) => {
  const { url, users, duration, fileSize, testId } = req.body;

  if (!url || !users || !duration) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  const id = testId || Date.now().toString();
  
  // Créer le script k6
  const k6Script = generateK6Script(url, users, duration, fileSize);
  const scriptPath = path.join(__dirname, `test_${id}.js`);
  
  fs.writeFileSync(scriptPath, k6Script);

  activeTests.set(id, {
    status: 'running',
    startTime: Date.now(),
    url,
    users,
    duration,
    fileSize
  });

  // Exécuter k6
  exec(`k6 run ${scriptPath}`, (error, stdout, stderr) => {
    const testData = activeTests.get(id);
    if (testData) {
      testData.status = 'completed';
      testData.endTime = Date.now();
      testData.output = stdout;
      testData.error = error ? error.message : null;
    }
    
    // Nettoyer le fichier script
    try {
      fs.unlinkSync(scriptPath);
    } catch (e) {}
  });

  res.json({
    testId: id,
    message: 'Test started',
    status: 'running'
  });
});

// Obtenir le statut d'un test
app.get('/api/test/:testId/status', (req, res) => {
  const { testId } = req.params;
  const test = activeTests.get(testId);

  if (!test) {
    return res.status(404).json({ error: 'Test not found' });
  }

  res.json({
    testId,
    ...test
  });
});

// Résultats d'un test
app.get('/api/test/:testId/results', (req, res) => {
  const { testId } = req.params;
  const test = activeTests.get(testId);

  if (!test) {
    return res.status(404).json({ error: 'Test not found' });
  }

  if (test.status !== 'completed') {
    return res.status(400).json({ error: 'Test is still running' });
  }

  const results = parseK6Results(test.output);

  res.json({
    testId,
    results,
    duration: test.endTime - test.startTime,
    url: test.url
  });
});

// Lister tous les tests
app.get('/api/tests', (req, res) => {
  const tests = Array.from(activeTests.entries()).map(([id, data]) => ({
    testId: id,
    ...data
  }));

  res.json({ tests });
});

// Générer un script k6
function generateK6Script(url, users, duration, fileSize = 10) {
  return `import http from 'k6/http';
import { check, group, sleep } from 'k6';

export const options = {
  vus: ${users},
  duration: '${duration}s',
  thresholds: {
    http_req_duration: ['p(95)<500', 'p(99)<1000'],
    http_req_failed: ['rate<0.1'],
  },
};

export default function () {
  group('Load Test - ${url}', () => {
    const response = http.get('${url}');
    
    check(response, {
      'status is 200': (r) => r.status === 200,
      'response time < 500ms': (r) => r.timings.duration < 500,
      'has body': (r) => r.body.length > 0,
    });
  });
  
  sleep(1);
}`;
}

// Parser les résultats k6
function parseK6Results(output) {
  return {
    summary: 'Test completed successfully',
    timestamp: new Date().toISOString()
  };
}

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`🐯 Red Tiger Backend running on http://localhost:${PORT}`);
});