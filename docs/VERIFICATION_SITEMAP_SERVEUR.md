# 🔍 Vérification du Sitemap sur le Serveur

## ❌ Problème : "Je ne vois pas le sitemap"

Si le sitemap n'est pas accessible via `https://www.ivoire.ai/sitemap.xml`, voici comment le vérifier et le corriger.

## ✅ Vérifications sur le Serveur

### 1. Vérifier que le fichier existe

```bash
# Se placer dans le répertoire
cd /var/www/iv

# Vérifier que le fichier existe
ls -la sitemap.xml
```

**Résultat attendu** : Le fichier doit être listé avec les permissions `-rw-r--r--`

### 2. Vérifier le contenu du fichier

```bash
# Afficher le contenu
cat sitemap.xml
```

**Résultat attendu** :
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://www.ivoire.ai/</loc>
        <lastmod>2025-12-17</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
</urlset>
```

### 3. Vérifier les permissions

```bash
# Vérifier les permissions actuelles
ls -la sitemap.xml

# Si nécessaire, corriger les permissions
chmod 644 sitemap.xml

# Vérifier le propriétaire (doit être www-data ou nginx)
chown www-data:www-data sitemap.xml
```

### 4. Tester l'accessibilité HTTP

```bash
# Tester depuis le serveur
curl -I https://www.ivoire.ai/sitemap.xml
```

**Résultat attendu** :
```
HTTP/1.1 200 OK
Content-Type: application/xml
```

### 5. Vérifier la configuration Nginx

Vérifiez que Nginx peut servir les fichiers XML. Le fichier de configuration devrait être dans `/etc/nginx/sites-available/` ou `/etc/nginx/nginx.conf`.

```bash
# Vérifier la configuration Nginx
sudo nginx -t

# Voir la configuration du site
cat /etc/nginx/sites-available/ivoire.ai
# ou
cat /etc/nginx/sites-available/default
```

## 🔧 Solutions si le fichier n'existe pas

### Solution 1 : Copier depuis GitHub

```bash
# Se placer dans le répertoire
cd /var/www/iv

# Faire un pull pour récupérer le sitemap
git pull origin main

# Vérifier que le fichier est là
ls -la sitemap.xml
```

### Solution 2 : Créer le fichier manuellement

```bash
# Se placer dans le répertoire
cd /var/www/iv

# Créer le fichier sitemap.xml
cat > sitemap.xml << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://www.ivoire.ai/</loc>
        <lastmod>2025-12-17</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
</urlset>
EOF

# Vérifier le contenu
cat sitemap.xml

# Corriger les permissions
chmod 644 sitemap.xml
chown www-data:www-data sitemap.xml
```

### Solution 3 : Vérifier le répertoire de travail

```bash
# Vérifier où vous êtes
pwd

# Vérifier le contenu du répertoire
ls -la

# Si vous n'êtes pas dans le bon répertoire
cd /var/www/iv
ls -la sitemap.xml
```

## 🔧 Solutions si le fichier existe mais n'est pas accessible

### Solution 1 : Vérifier la configuration Nginx

Assurez-vous que Nginx peut servir les fichiers XML. Ajoutez cette configuration si nécessaire :

```nginx
location ~ \.xml$ {
    add_header Content-Type application/xml;
    try_files $uri =404;
}
```

Puis redémarrez Nginx :
```bash
sudo systemctl restart nginx
```

### Solution 2 : Vérifier les permissions

```bash
# Vérifier les permissions
ls -la sitemap.xml

# Si nécessaire, corriger
chmod 644 sitemap.xml
chown www-data:www-data sitemap.xml

# Vérifier les permissions du répertoire parent
ls -la /var/www/iv
chmod 755 /var/www/iv
```

### Solution 3 : Vérifier les logs Nginx

```bash
# Voir les erreurs récentes
sudo tail -f /var/log/nginx/error.log

# Tester l'accès au sitemap
curl -v https://www.ivoire.ai/sitemap.xml
```

## 📋 Checklist Complète

- [ ] Le fichier `sitemap.xml` existe dans `/var/www/iv/`
- [ ] Le contenu du fichier est correct (XML valide)
- [ ] Les permissions sont `644` (`-rw-r--r--`)
- [ ] Le propriétaire est `www-data` ou `nginx`
- [ ] Le répertoire parent a les permissions `755`
- [ ] Nginx peut servir les fichiers XML
- [ ] L'URL `https://www.ivoire.ai/sitemap.xml` est accessible dans le navigateur
- [ ] Le Content-Type est `application/xml`

## 🚀 Commandes de Diagnostic Complètes

```bash
# 1. Se placer dans le répertoire
cd /var/www/iv

# 2. Vérifier que le fichier existe
ls -la sitemap.xml

# 3. Voir le contenu
cat sitemap.xml

# 4. Vérifier les permissions
stat sitemap.xml

# 5. Corriger les permissions si nécessaire
chmod 644 sitemap.xml
chown www-data:www-data sitemap.xml

# 6. Tester l'accessibilité
curl -I https://www.ivoire.ai/sitemap.xml

# 7. Vérifier la configuration Nginx
sudo nginx -t

# 8. Redémarrer Nginx
sudo systemctl restart nginx

# 9. Tester à nouveau
curl https://www.ivoire.ai/sitemap.xml
```

## 🔍 Test depuis votre Navigateur

1. Ouvrez votre navigateur
2. Allez sur : `https://www.ivoire.ai/sitemap.xml`
3. **Résultat attendu** : Le fichier XML doit s'afficher

Si vous voyez une erreur 404 :
- Le fichier n'existe pas sur le serveur
- Le fichier n'est pas au bon endroit
- La configuration Nginx bloque l'accès

Si vous voyez une erreur 403 :
- Problème de permissions
- Le serveur web n'a pas les droits de lecture

## 📞 Support

Si le problème persiste après ces vérifications :

1. Vérifiez les logs Nginx : `sudo tail -f /var/log/nginx/error.log`
2. Vérifiez que Git a bien récupéré le fichier : `git status`
3. Vérifiez la configuration du serveur web
4. Contactez l'hébergeur si nécessaire

---

**Date** : 2025-12-17  
**Statut** : Guide de vérification du sitemap sur le serveur

