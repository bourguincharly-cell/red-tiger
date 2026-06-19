# 📖 Guide d'Utilisation - Red Tiger

## Démarrage Rapide

1. **Lancer le backend**
   ```bash
   cd backend
   npm start
   ```

2. **Lancer le frontend**
   ```bash
   cd frontend
   npm start
   ```

3. **Accéder à l'interface**
   - Ouvrir http://localhost:3001 dans votre navigateur

## Configuration des Tests

### Paramètres

- **URL Cible** : L'adresse du serveur à tester
  - Exemple: `https://reborn.unityrp.io/`
  - Exemple: `http://localhost:8080`

- **Nombre d'utilisateurs** : Utilisateurs virtuels simultanés
  - Défaut: 100
  - Recommandé: 10-500
  - Max: 1000

- **Durée du test** : En secondes
  - Défaut: 60
  - Recommandé: 30-300
  - Max: 3600

- **Taille fichiers** : En Mo (pour les uploads)
  - Défaut: 10 Mo
  - Recommandé: 1-100 Mo
  - Max: 1000 Mo

## Interprétation des Résultats

### Métriques

- **Durée Totale** : Temps d'exécution du test
- **État** : Succès ou Erreur
- **URL Testée** : URL qui a été chargée
- **Timestamp** : Moment du test

### Analyse

- **Temps de réponse rapide** : < 200ms ✅
- **Temps de réponse acceptable** : 200-500ms ⚠️
- **Temps de réponse lent** : > 500ms ❌

## Scénarios de Test

### Test de Charge Basique
```
Utilisateurs: 100
Durée: 60s
Fichiers: 10 Mo
```

### Test de Stress
```
Utilisateurs: 500
Durée: 300s
Fichiers: 50 Mo
```

### Test de Performance
```
Utilisateurs: 50
Durée: 30s
Fichiers: 5 Mo
```

## Conseils

1. **Commencer petit** : Débuter avec peu d'utilisateurs
2. **Augmenter progressivement** : Monter le nombre d'utilisateurs
3. **Observer les résultats** : Analyser les temps de réponse
4. **Tester régulièrement** : Après chaque modification du serveur

## Sauvegarder les Résultats

- Les résultats s'affichent dans l'interface
- Vous pouvez faire une capture d'écran
- Les données peuvent être exportées (prochaine version)

## Avertissement Légal

⚠️ **IMPORTANT** : N'utilisez cet outil QUE sur :
- Vos propres serveurs
- Avec l'autorisation explicite du propriétaire
- À des fins légitimes de test de performance

Toute utilisation non autorisée est illégale.