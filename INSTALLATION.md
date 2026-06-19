# 📦 Guide d'Installation - Red Tiger

## Prérequis

- **Node.js** (v16+) : https://nodejs.org/
- **k6** : https://k6.io/docs/get-started/installation/
- **npm** ou **yarn**

## Installation de k6

### Sur Windows
```bash
# Avec Chocolatey
choco install k6

# Ou télécharger depuis: https://github.com/grafana/k6/releases
```

### Sur macOS
```bash
brew install k6
```

### Sur Linux
```bash
# Debian/Ubuntu
sudo apt-get install k6

# Fedora
sudo dnf install k6
```

## Vérifier l'installation

```bash
k6 version
node --version
npm --version
```

## Cloner et Installer Red Tiger

```bash
# Clone le repo
git clone https://github.com/bourguincharly-cell/red-tiger.git
cd red-tiger

# Backend
cd backend
npm install

# Frontend (dans un autre terminal)
cd frontend
npm install
```

## Lancer l'Application

### Terminal 1 - Backend
```bash
cd backend
npm start
# Devrait afficher: 🐯 Red Tiger Backend running on http://localhost:3000
```

### Terminal 2 - Frontend
```bash
cd frontend
npm start
# Devrait ouvrir http://localhost:3001 dans votre navigateur
```

## Utilisation

1. Ouvrir http://localhost:3001 dans votre navigateur
2. Remplir les champs :
   - **URL Cible** : L'URL de votre serveur
   - **Utilisateurs** : Nombre d'utilisateurs simultanés (par défaut 100)
   - **Durée** : En secondes (par défaut 60s)
   - **Taille fichiers** : En Mo (par défaut 10 Mo)
3. Cliquer sur "🚀 Lancer le Test"
4. Attendre les résultats

## Troubleshooting

### Erreur "k6 not found"
```bash
# Vérifier que k6 est installé
k6 version

# Si erreur persiste, l'installer manuellement
```

### Port 3000 ou 3001 déjà utilisé
```bash
# Backend - changer le port
export PORT=3005
npm start

# Frontend - mettre à jour le proxy dans package.json
"proxy": "http://localhost:3005"
```

### Problème CORS
- Vérifier que le backend est bien en cours d'exécution
- Vérifier les logs du backend pour les erreurs

## Configuration Avancée

Voir `backend/server.js` pour modifier :
- Les thresholds k6
- Les métriques
- Les types de tests

## Support

En cas de problème :
1. Vérifier les logs du terminal
2. Vérifier la documentation de k6 : https://k6.io/docs/
3. Ouvrir une issue sur GitHub