# 🚀 Guide de Déploiement VPS - IVOIRE.AI

## ⚠️ IMPORTANT : Site Statique - Pas de Build Nécessaire

Ce projet est un **site statique pur HTML/CSS/JS**. Il n'y a **PAS besoin** de :
- ❌ `package.json`
- ❌ `npm install`
- ❌ `npm run build`
- ❌ Node.js
- ❌ Processus de compilation

Le site fonctionne **directement** avec les fichiers présents dans le dépôt.

---

## 📋 Structure du Projet

```
iv/
├── index.html          # Page principale
├── css/
│   └── styles.css     # Styles compilés (déjà prêt)
├── js/
│   └── main.js        # JavaScript (déjà prêt)
├── images/
│   └── logo.png       # Logo (à ajouter)
├── robots.txt
├── sitemap.xml
├── .htaccess          # Configuration Apache
└── docs/              # Documentation
```

**Tous les fichiers sont déjà prêts à être déployés !**

---

## 🎯 Méthode de Déploiement (Recommandée)

### Option 1 : Git Pull (Simple et Recommandé)

```bash
# Sur le VPS
cd /var/www/iv  # ou le chemin de votre site

# Récupérer les dernières modifications
git pull origin main

# Vérifier que les fichiers sont présents
ls -la
ls -la css/
ls -la js/

# Vérifier les permissions
chmod 644 index.html css/styles.css js/main.js robots.txt sitemap.xml .htaccess
chmod 755 css/ js/ images/
```

### Option 2 : Copie Manuelle (si Git n'est pas configuré)

```bash
# Depuis votre machine locale
scp -r index.html user@vps:/var/www/iv/
scp -r css/ user@vps:/var/www/iv/
scp -r js/ user@vps:/var/www/iv/
scp robots.txt user@vps:/var/www/iv/
scp sitemap.xml user@vps:/var/www/iv/
scp .htaccess user@vps:/var/www/iv/
```

---

## ✅ Vérification Post-Déploiement

### 1. Vérifier les Fichiers

```bash
# Sur le VPS
cd /var/www/iv
ls -la

# Doit afficher :
# - index.html
# - css/styles.css
# - js/main.js
# - robots.txt
# - sitemap.xml
# - .htaccess
```

### 2. Vérifier les Permissions

```bash
# Fichiers en lecture seule
chmod 644 index.html css/styles.css js/main.js robots.txt sitemap.xml .htaccess

# Dossiers en exécution
chmod 755 css/ js/ images/
```

### 3. Tester le Site

```bash
# Vérifier que le serveur web peut lire les fichiers
curl -I http://localhost/
curl -I http://localhost/css/styles.css
curl -I http://localhost/js/main.js
```

### 4. Vérifier Apache/Nginx

**Si Apache :**
```bash
# Vérifier que mod_rewrite est activé
sudo a2enmod rewrite
sudo systemctl restart apache2

# Vérifier les logs
tail -f /var/log/apache2/error.log
```

**Si Nginx :**
```bash
# Le .htaccess ne fonctionne pas avec Nginx
# Il faut configurer les redirections dans /etc/nginx/sites-available/ivoire.ai
# Voir docs/CHECKLIST_DEPLOIEMENT_VPS.md pour la configuration Nginx
```

---

## 🔧 Configuration Serveur

### Apache (.htaccess déjà inclus)

Le fichier `.htaccess` est déjà dans le dépôt et configure :
- ✅ Redirection HTTPS
- ✅ Redirection www
- ✅ Compression GZIP
- ✅ Cache des fichiers statiques
- ✅ Headers de sécurité

**Vérifier que mod_rewrite est activé :**
```bash
sudo a2enmod rewrite
sudo systemctl restart apache2
```

### Nginx (Configuration manuelle requise)

Si vous utilisez Nginx, le `.htaccess` ne fonctionnera pas. Il faut configurer les redirections dans la configuration Nginx. Voir `docs/CHECKLIST_DEPLOIEMENT_VPS.md`.

---

## 🐛 Résolution de Problèmes

### Erreur : "ENOENT: no such file or directory, open '/var/www/iv/package.json'"

**Cause :** Vous essayez d'exécuter `npm install` ou `npm run build` alors que ce projet n'en a pas besoin.

**Solution :** Ne pas exécuter ces commandes. Le site fonctionne directement avec les fichiers HTML/CSS/JS présents.

### Erreur : "404 Not Found" pour les fichiers CSS/JS

**Causes possibles :**
1. Les fichiers ne sont pas présents sur le VPS
2. Les permissions sont incorrectes
3. Le chemin dans `index.html` est incorrect

**Solutions :**
```bash
# Vérifier que les fichiers existent
ls -la /var/www/iv/css/styles.css
ls -la /var/www/iv/js/main.js

# Vérifier les permissions
chmod 644 /var/www/iv/css/styles.css
chmod 644 /var/www/iv/js/main.js

# Vérifier les chemins dans index.html
grep "css/styles.css" /var/www/iv/index.html
grep "js/main.js" /var/www/iv/index.html
```

### Interface différente entre local et VPS

**Causes possibles :**
1. Les fichiers CSS/JS ne sont pas à jour sur le VPS
2. Cache du navigateur
3. Fichiers manquants

**Solutions :**
```bash
# Mettre à jour depuis Git
cd /var/www/iv
git pull origin main

# Vider le cache du navigateur (Ctrl+Shift+R ou Ctrl+F5)
# Vérifier que tous les fichiers sont présents
```

---

## 📝 Checklist de Déploiement

- [ ] Fichiers copiés sur le VPS (via Git ou SCP)
- [ ] Permissions correctes (644 pour fichiers, 755 pour dossiers)
- [ ] `.htaccess` présent (si Apache)
- [ ] `mod_rewrite` activé (si Apache)
- [ ] Configuration Nginx (si Nginx)
- [ ] Fichiers CSS/JS accessibles
- [ ] Redirections HTTPS fonctionnelles
- [ ] Site accessible via https://www.ivoire.ai
- [ ] Google Analytics fonctionnel
- [ ] Menu mobile fonctionnel
- [ ] Pas d'erreurs dans la console

---

## 🎉 Résumé

**Ce projet est un site statique. Il suffit de :**

1. ✅ Copier les fichiers sur le VPS (via `git pull` ou `scp`)
2. ✅ Vérifier les permissions
3. ✅ Configurer Apache/Nginx
4. ✅ C'est tout ! Pas de build, pas de npm, pas de compilation.

**Les fichiers sont déjà prêts et fonctionnels !**

---

## 📞 Support

Si vous rencontrez des problèmes :
1. Vérifiez les logs du serveur web
2. Vérifiez que tous les fichiers sont présents
3. Vérifiez les permissions
4. Consultez `docs/CHECKLIST_DEPLOIEMENT_VPS.md` pour plus de détails

