# ✅ Checklist de Déploiement VPS - IVOIRE.AI

## 🔍 Vérification des Conflits Potentiels

### ✅ Fichiers à Déployer (Pas de Conflits Attendus)

#### Fichiers Principaux
- ✅ `index.html` - Fichier principal, remplace l'ancien
- ✅ `css/styles.css` - Styles, remplace l'ancien
- ✅ `js/main.js` - JavaScript, remplace l'ancien

#### Fichiers de Configuration
- ⚠️ `.htaccess` - **ATTENTION** : Vérifier si un .htaccess existe déjà sur le VPS
- ✅ `robots.txt` - Standard, pas de conflit
- ✅ `sitemap.xml` - Standard, pas de conflit

#### Fichiers de Documentation
- ✅ `docs/GUIDE_REFERENCEMENT_GOOGLE.md` - Nouveau, pas de conflit
- ✅ `docs/GUIDE_CONFIGURATION_EMAILJS.md` - Existant, pas de conflit
- ✅ `docs/GUIDE_FIX_GMAIL_PERMISSIONS.md` - Existant, pas de conflit
- ✅ `docs/INSTRUCTIONS_EMAILJS.md` - Existant, pas de conflit

#### Fichiers de Test (Optionnels)
- ⚠️ `test-emailjs.html` - Fichier de test, peut être supprimé en production
- ⚠️ `diagnostic-emailjs.html` - Fichier de test, peut être supprimé en production
- ⚠️ `test-ga.html` - Fichier de test, peut être supprimé en production

---

## ⚠️ Points d'Attention

### 1. Fichier .htaccess

**Risque** : Si un `.htaccess` existe déjà sur le VPS avec une configuration différente, il y aura conflit.

**Solution** :
```bash
# Sur le VPS, avant de déployer :
# 1. Sauvegarder l'ancien .htaccess
cp .htaccess .htaccess.backup

# 2. Vérifier le contenu de l'ancien
cat .htaccess

# 3. Fusionner manuellement si nécessaire OU remplacer complètement
```

**Si le serveur utilise Nginx** :
- Le fichier `.htaccess` ne fonctionnera pas (c'est pour Apache)
- Il faudra configurer les redirections dans la configuration Nginx

### 2. Structure des Répertoires

**Vérification** : Les chemins relatifs sont corrects :
- ✅ `css/styles.css` - Chemin relatif correct
- ✅ `js/main.js` - Chemin relatif correct
- ✅ Tous les liens internes utilisent des chemins relatifs

### 3. Permissions des Fichiers

**Recommandations** :
```bash
# Sur le VPS, après déploiement :
chmod 644 index.html css/styles.css js/main.js robots.txt sitemap.xml
chmod 644 .htaccess
chmod 755 css/ js/ docs/
```

### 4. Configuration Serveur

**Apache** :
- ✅ Le `.htaccess` fonctionnera si `mod_rewrite` est activé
- Vérifier : `a2enmod rewrite` et redémarrer Apache

**Nginx** :
- ❌ Le `.htaccess` ne fonctionnera pas
- Il faudra configurer les redirections dans `/etc/nginx/sites-available/ivoire.ai`

---

## 📋 Procédure de Déploiement Recommandée

### Option 1 : Git Pull (Recommandé)
```bash
# Sur le VPS
cd /var/www/ivoire.ai  # ou le chemin de votre site
git pull origin main

# Vérifier les changements
git status
git diff HEAD~1

# Si .htaccess existe déjà, sauvegarder
if [ -f .htaccess ]; then
    cp .htaccess .htaccess.backup
fi

# Appliquer les permissions
chmod 644 .htaccess index.html css/styles.css js/main.js
```

### Option 2 : Déploiement Manuel
```bash
# 1. Sauvegarder l'ancien .htaccess si existe
if [ -f .htaccess ]; then
    cp .htaccess .htaccess.backup
fi

# 2. Copier les fichiers
# (via FTP, SCP, ou rsync)

# 3. Vérifier les permissions
chmod 644 .htaccess index.html css/styles.css js/main.js robots.txt sitemap.xml
```

---

## ✅ Tests Post-Déploiement

### 1. Vérifier les Redirections
```bash
# Tester les redirections
curl -I http://ivoire.ai
curl -I https://ivoire.ai
curl -I http://www.ivoire.ai
curl -I https://www.ivoire.ai

# Tous doivent rediriger vers https://www.ivoire.ai/
```

### 2. Vérifier les Fichiers Statiques
- ✅ `https://www.ivoire.ai/css/styles.css` - Doit charger
- ✅ `https://www.ivoire.ai/js/main.js` - Doit charger
- ✅ `https://www.ivoire.ai/robots.txt` - Doit être accessible
- ✅ `https://www.ivoire.ai/sitemap.xml` - Doit être accessible

### 3. Vérifier le Site
- ✅ Page d'accueil charge correctement
- ✅ Menu mobile fonctionne
- ✅ Boutons contact fonctionnent
- ✅ Pas d'erreurs dans la console
- ✅ Responsive sur mobile

### 4. Vérifier les Erreurs Serveur
```bash
# Apache
tail -f /var/log/apache2/error.log

# Nginx
tail -f /var/log/nginx/error.log
```

---

## 🔧 Résolution de Conflits

### Si .htaccess entre en conflit :

**Scénario 1 : .htaccess existe avec configuration différente**
```bash
# Fusionner manuellement les règles importantes
# OU remplacer complètement si vous êtes sûr
```

**Scénario 2 : Serveur Nginx**
```nginx
# Ajouter dans la configuration Nginx :
server {
    listen 80;
    server_name ivoire.ai www.ivoire.ai;
    
    # Rediriger vers HTTPS
    return 301 https://www.ivoire.ai$request_uri;
}

server {
    listen 443 ssl;
    server_name ivoire.ai;
    
    # Rediriger vers www
    return 301 https://www.ivoire.ai$request_uri;
}

server {
    listen 443 ssl;
    server_name www.ivoire.ai;
    
    root /var/www/ivoire.ai;
    index index.html;
    
    # ... reste de la configuration
}
```

---

## 📝 Notes Importantes

1. **Fichiers de test** : Les fichiers `test-*.html` et `diagnostic-*.html` peuvent être supprimés en production (ils sont déjà dans robots.txt comme Disallow)

2. **Google Analytics** : Le code GA est déjà intégré dans `index.html`, pas besoin de configuration supplémentaire

3. **SEO** : Tous les meta tags et données structurées sont dans `index.html`, pas de fichiers externes nécessaires

4. **Pas de dépendances** : Le site est statique, pas de `node_modules`, `package.json`, ou autres dépendances

---

## ✅ Résumé : Pas de Conflits Majeurs

- ✅ Tous les chemins sont relatifs
- ✅ Pas de dépendances externes
- ✅ Structure de fichiers simple
- ⚠️ Seul risque : `.htaccess` si déjà présent sur le VPS
- ⚠️ Si Nginx : `.htaccess` ne fonctionnera pas, configurer dans Nginx

**Conclusion** : Le déploiement devrait être sans conflit majeur, sauf pour le `.htaccess` qui nécessite une vérification préalable.

