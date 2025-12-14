# 🔄 Mise à Jour du Site sur le VPS

## ⚠️ Problème : Les modifications ne sont pas visibles en production

Si les tailles d'icônes (ou autres modifications) sont correctes en local mais pas sur le VPS, c'est que le VPS n'a pas les dernières modifications.

---

## ✅ Solution Rapide

### Sur le VPS, exécutez :

```bash
# Aller dans le répertoire du site
cd /var/www/iv

# Récupérer les dernières modifications
git pull origin main

# Forcer le rechargement du cache Apache/Nginx
sudo systemctl reload apache2
# OU si Nginx :
sudo systemctl reload nginx
```

---

## 🔍 Vérification

### 1. Vérifier que le fichier CSS est à jour

```bash
cd /var/www/iv

# Vérifier la date de modification
ls -lh css/styles.css

# Vérifier que les tailles d'icônes sont correctes
grep -A 5 "\.why-icon" css/styles.css | grep "width:"
# Doit afficher : width: 50px;

grep -A 5 "\.service-icon" css/styles.css | grep "width:"
# Doit afficher : width: 48px;

grep -A 5 "\.badge-icon" css/styles.css | grep "width:"
# Doit afficher : width: 45px;
```

### 2. Vérifier le cache du navigateur

**Sur votre navigateur :**
1. Ouvrez les outils de développement (F12)
2. Allez dans l'onglet "Network" (Réseau)
3. Cochez "Disable cache" (Désactiver le cache)
4. Rechargez la page (Ctrl+Shift+R ou Ctrl+F5)

**OU simplement :**
- Chrome/Edge : `Ctrl + Shift + R` ou `Ctrl + F5`
- Firefox : `Ctrl + Shift + R` ou `Ctrl + F5`
- Safari : `Cmd + Shift + R`

---

## 🚀 Script Automatique

J'ai créé un script `update-vps.sh` pour automatiser la mise à jour :

```bash
# Sur le VPS
cd /var/www/iv
chmod +x update-vps.sh
./update-vps.sh
```

Ce script :
- ✅ Récupère les dernières modifications depuis GitHub
- ✅ Vérifie que les fichiers sont présents
- ✅ Ajuste les permissions
- ✅ Recharge Apache/Nginx pour vider le cache serveur

---

## 🐛 Si ça ne fonctionne toujours pas

### 1. Vérifier que Git est à jour

```bash
cd /var/www/iv
git status
git log --oneline -5

# Si nécessaire, forcer la mise à jour
git fetch origin
git reset --hard origin/main
```

### 2. Vérifier les permissions

```bash
# Les fichiers doivent être lisibles
chmod 644 css/styles.css
chmod 644 js/main.js
chmod 644 index.html

# Vérifier le propriétaire (doit être www-data ou apache)
ls -la css/styles.css
```

### 3. Vider le cache serveur

**Apache :**
```bash
sudo systemctl restart apache2
# OU
sudo service apache2 restart
```

**Nginx :**
```bash
sudo systemctl restart nginx
# OU
sudo service nginx restart
```

### 4. Vérifier les logs

```bash
# Apache
tail -f /var/log/apache2/error.log

# Nginx
tail -f /var/log/nginx/error.log
```

### 5. Vérifier que le bon fichier CSS est servi

```bash
# Tester directement
curl -I https://www.ivoire.ai/css/styles.css

# Vérifier le contenu
curl https://www.ivoire.ai/css/styles.css | grep "\.why-icon" | head -5
```

---

## 📋 Checklist de Mise à Jour

- [ ] `git pull origin main` exécuté sur le VPS
- [ ] Fichier `css/styles.css` présent et à jour
- [ ] Permissions correctes (644)
- [ ] Apache/Nginx rechargé
- [ ] Cache du navigateur vidé (Ctrl+Shift+R)
- [ ] Vérification que les icônes ont la bonne taille
- [ ] Pas d'erreurs dans la console du navigateur

---

## 🎯 Commandes Rapides (Copier-Coller)

```bash
# Sur le VPS - Mise à jour complète
cd /var/www/iv && \
git pull origin main && \
chmod 644 css/styles.css js/main.js index.html && \
sudo systemctl reload apache2 && \
echo "✅ Mise à jour terminée! Videz le cache du navigateur (Ctrl+Shift+R)"
```

---

## 💡 Astuce : Versioning du CSS

Pour forcer le rechargement du CSS même avec cache, vous pouvez ajouter un paramètre de version dans `index.html` :

```html
<link rel="stylesheet" href="css/styles.css?v=2.0">
```

Mais normalement, un simple `git pull` et un rechargement du cache suffisent.

---

## ✅ Résumé

**Le problème vient du fait que le VPS n'a pas les dernières modifications CSS.**

**Solution :**
1. `git pull origin main` sur le VPS
2. Recharger Apache/Nginx
3. Vider le cache du navigateur

C'est tout ! Les tailles d'icônes devraient maintenant être correctes en production.

