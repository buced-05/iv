# 🔧 Résolution du Conflit Git - Sitemap.xml

## ❌ Problème

Lors du `git pull`, Git indique :
```
error: Your local changes to the following files would be overwritten by merge:
        sitemap.xml
Please commit your changes or stash them before you merge.
```

## ✅ Solutions

### Solution 1 : Sauvegarder et écraser (Recommandé si les modifications locales ne sont pas importantes)

```bash
# Sauvegarder les modifications locales
cp sitemap.xml sitemap.xml.backup

# Écraser avec la version distante
git checkout -- sitemap.xml

# Faire le pull
git pull origin main
```

### Solution 2 : Stash les modifications (Pour les garder en mémoire)

```bash
# Mettre de côté les modifications locales
git stash

# Faire le pull
git pull origin main

# Si vous voulez récupérer les modifications plus tard
git stash pop
```

### Solution 3 : Commit les modifications locales d'abord

```bash
# Ajouter les modifications
git add sitemap.xml

# Commit
git commit -m "fix: Modifications locales sitemap"

# Faire le pull (il y aura peut-être un conflit à résoudre)
git pull origin main

# Si conflit, résoudre manuellement puis :
git add sitemap.xml
git commit -m "fix: Résolution conflit sitemap"
```

### Solution 4 : Forcer le pull (Écraser complètement les modifications locales)

⚠️ **ATTENTION** : Cette commande supprime définitivement les modifications locales !

```bash
# Écraser les modifications locales
git reset --hard origin/main

# Ou
git fetch origin
git reset --hard origin/main
```

## 🎯 Solution Recommandée pour votre cas

Puisque vous venez de mettre à jour le sitemap sur GitHub, la version distante est la bonne. Utilisez la **Solution 1** :

```bash
# 1. Sauvegarder (au cas où)
cp sitemap.xml sitemap.xml.backup

# 2. Écraser avec la version GitHub
git checkout -- sitemap.xml

# 3. Faire le pull
git pull origin main
```

## 📋 Commandes Complètes

```bash
# Se placer dans le répertoire
cd /var/www/iv

# Sauvegarder
cp sitemap.xml sitemap.xml.backup

# Écraser les modifications locales
git checkout -- sitemap.xml

# Faire le pull
git pull origin main

# Vérifier que tout est à jour
git status
```

## 🔍 Vérification

Après le pull, vérifiez que le sitemap est correct :

```bash
# Voir le contenu du sitemap
cat sitemap.xml

# Vérifier l'état Git
git status

# Voir les dernières modifications
git log --oneline -5
```

## 🚨 Si le problème persiste

Si vous avez toujours des problèmes :

```bash
# Voir les différences
git diff sitemap.xml

# Voir l'état complet
git status

# Forcer la synchronisation
git fetch origin
git reset --hard origin/main
```

---

**Date** : 2025-12-17  
**Statut** : Guide de résolution de conflit Git

