# 🐯 Red Tiger - Load Testing Tool

Un outil complet de test de charge pour évaluer la performance de votre serveur.

## ✨ Fonctionnalités

- ✅ Interface web intuitive
- ✅ Tests configurables (utilisateurs, durée, taille fichiers)
- ✅ Résultats en temps réel
- ✅ Rapports détaillés
- ✅ Support des uploads massifs
- ✅ Tests de performance avancés

## 🚀 Installation Rapide

```bash
# Clone le repo
git clone https://github.com/bourguincharly-cell/red-tiger.git
cd red-tiger

# Install backend
cd backend
npm install

# Install frontend
cd ../frontend
npm install
```

## 🏃 Démarrage

### Terminal 1 - Backend
```bash
cd backend
npm start
# Le serveur démarre sur http://localhost:3000
```

### Terminal 2 - Frontend
```bash
cd frontend
npm start
# L'interface démarre sur http://localhost:3001
```

## 📋 Configuration des Tests

Dans l'interface web :
1. Entrez l'URL cible (ex: https://reborn.unityrp.io/)
2. Configurez le nombre d'utilisateurs (défaut: 100)
3. Définissez la durée du test (défaut: 60 secondes)
4. Taille des fichiers (défaut: 10 Mo)
5. Lancez le test

## 📊 Résultats

Vous obtiendrez :
- Requêtes/sec
- Temps de réponse moyen, min, max
- Taux d'erreur
- Graphiques en temps réel
- Export des résultats
- Rapport détaillé

## ⚠️ Avertissement Légal

**IMPORTANT** : Cet outil ne doit être utilisé **QUE** sur :
- Vos propres serveurs
- Avec l'autorisation explicite du propriétaire du serveur
- À des fins de test de performance légitime

Toute utilisation non autorisée est **ILLÉGALE** et constitue une attaque informatique.

## 📝 Documentation

- [Installation Détaillée](INSTALLATION.md)
- [Guide d'Utilisation](USAGE.md)
- [Architecture](ARCHITECTURE.md)

## 📝 License

MIT