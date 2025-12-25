# Guide : Pull Git sur VPS sans conflit

## Procédure sécurisée pour mettre à jour le VPS

### Option 1 : Pull simple (recommandé si pas de modifications locales sur VPS)

```bash
cd /chemin/vers/votre/site
git pull origin main
```

### Option 2 : Si des modifications locales existent sur le VPS

#### Étape 1 : Vérifier l'état
```bash
cd /chemin/vers/votre/site
git status
```

#### Étape 2A : Sauvegarder les modifications locales (si importantes)
```bash
git stash
git pull origin main
git stash pop  # Appliquer les modifications sauvegardées
```

#### Étape 2B : Ignorer les modifications locales (si non importantes)
```bash
git fetch origin
git reset --hard origin/main
```

⚠️ **ATTENTION** : `git reset --hard` supprime toutes les modifications locales non commitées !

### Option 3 : Pull avec rebase (pour un historique propre)

```bash
cd /chemin/vers/votre/site
git pull --rebase origin main
```

## Vérification après le pull

```bash
# Vérifier que tout est à jour
git status

# Vérifier les derniers commits
git log --oneline -5
```

## En cas de conflit

Si un conflit survient malgré tout :

1. **Voir les fichiers en conflit** :
```bash
git status
```

2. **Résoudre manuellement les conflits** dans les fichiers concernés

3. **Après résolution** :
```bash
git add .
git commit -m "Résolution conflit"
```

## Recommandation

Pour éviter les conflits, **ne jamais modifier directement les fichiers sur le VPS**. 
Toujours :
1. Modifier localement
2. Commit et push sur GitHub
3. Pull sur le VPS

## Commandes rapides

```bash
# Pull sécurisé (préfère les changements distants)
cd /chemin/vers/votre/site
git fetch origin
git reset --hard origin/main

# Ou pull simple si pas de modifications locales
git pull origin main
```

