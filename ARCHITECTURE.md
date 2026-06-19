# 🏗️ Architecture - Red Tiger

## Vue d'Ensemble

```
┌─────────────────────┐
│   Frontend (React)  │
│  http://localhost:3001
└──────────────┬──────┘
               │ HTTP
               ▼
┌─────────────────────────┐
│ Backend (Node.js/Express)│
│ http://localhost:3000   │
└──────────────┬──────────┘
               │ exec()
               ▼
      ┌──────────────────┐
      │  k6 Load Testing │
      └──────────────────┘
               │
               ▼
      ┌──────────────────┐
      │  Target Server   │
      └──────────────────┘
```

## Composants

### Frontend (React)

**Fichiers:**
- `frontend/public/index.html` - Page principale
- `frontend/public/app.js` - Application JavaScript vanilla
- `frontend/package.json` - Dépendances

**Fonctionnalités:**
- Interface de configuration des tests
- Affichage du statut en temps réel
- Résultats des tests

### Backend (Express)

**Fichiers:**
- `backend/server.js` - Serveur Express
- `backend/package.json` - Dépendances

**Routes:**
- `GET /api/health` - Vérifier l'état du backend
- `POST /api/test/start` - Démarrer un test
- `GET /api/test/:testId/status` - Obtenir le statut
- `GET /api/test/:testId/results` - Obtenir les résultats
- `GET /api/tests` - Lister tous les tests

### k6 Load Testing

- Outil de test de charge open-source
- Scripts générés dynamiquement par le backend
- Communication HTTP directe avec le serveur cible

## Flux d'Exécution

1. **Utilisateur configure le test** (Frontend)
   - Saisit URL, nombre d'utilisateurs, durée, taille des fichiers

2. **Frontend envoie la requête** (POST /api/test/start)
   - Backend reçoit la configuration

3. **Backend génère un script k6**
   - Crée le fichier `test_[testId].js`
   - Configure les paramètres (vus, duration, thresholds)

4. **Backend exécute k6**
   - Commande: `k6 run test_[testId].js`
   - k6 simule les utilisateurs
   - Envoie les requêtes au serveur cible

5. **Frontend poll le statut**
   - Vérifie l'état du test chaque seconde
   - Affiche "Test en cours..."

6. **Test complété**
   - k6 retourne les résultats
   - Backend parse les résultats
   - Frontend affiche les métriques

## Stockage des Tests

- **Map en mémoire** : `activeTests`
- Chaque test a un ID unique (timestamp)
- Contient : status, startTime, endTime, url, users, duration, results

## Sécurité

⚠️ **Important:**
- Aucune authentification actuellement (à ajouter)
- Pas de validation poussée des URLs
- CORS enabled (à restreindre en production)

## Performance

- k6 est très efficace pour les tests de charge
- Peut gérer des centaines d'utilisateurs virtuels
- Résultats en temps réel

## Améliorations Futures

- [ ] Authentification utilisateur
- [ ] Persistance des résultats (base de données)
- [ ] Graphiques temps réel
- [ ] Export des résultats (JSON, PDF, CSV)
- [ ] Historique des tests
- [ ] Tests préenregistrés
- [ ] Support des uploads de fichiers
- [ ] Alertes et notifications