# Configuration du domaine ivoire.ai

## Problème identifié

Le domaine `https://ivoire.ai` (sans www) n'est pas accessible, alors que `https://www.ivoire.ai` fonctionne correctement.

## Solutions

### 1. Vérification DNS (Priorité 1)

Assurez-vous que les deux enregistrements DNS sont configurés :

#### Option A : Enregistrements A (Recommandé)
```
Type    Nom              Valeur (IP)
A       ivoire.ai        [VOTRE_IP_SERVEUR]
A       www.ivoire.ai    [VOTRE_IP_SERVEUR]
```

#### Option B : Enregistrement CNAME (Alternative)
```
Type    Nom              Valeur
A       ivoire.ai        [VOTRE_IP_SERVEUR]
CNAME   www              ivoire.ai
```

### 2. Configuration du serveur web

#### Apache (cPanel, Plesk, etc.)
- Vérifiez que le domaine `ivoire.ai` (sans www) est ajouté comme alias ou domaine principal
- Le fichier `.htaccess` est déjà configuré pour rediriger `ivoire.ai` vers `www.ivoire.ai`

#### Nginx
Ajoutez dans votre configuration :
```nginx
server {
    listen 80;
    listen 443 ssl;
    server_name ivoire.ai;
    
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    return 301 https://www.ivoire.ai$request_uri;
}

server {
    listen 80;
    listen 443 ssl;
    server_name www.ivoire.ai;
    
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    root /path/to/your/website;
    index index.html;
    
    # ... reste de la configuration
}
```

### 3. Vérification de la redirection

Une fois la configuration DNS et serveur effectuée, testez :

```bash
# Test de redirection
curl -I http://ivoire.ai
curl -I https://ivoire.ai
curl -I http://www.ivoire.ai
curl -I https://www.ivoire.ai
```

Toutes les requêtes doivent rediriger vers `https://www.ivoire.ai` avec un code `301`.

### 4. Vérification SSL/HTTPS

Assurez-vous que le certificat SSL couvre les deux domaines :
- `ivoire.ai`
- `www.ivoire.ai`

Si vous utilisez Let's Encrypt :
```bash
certbot certonly --nginx -d ivoire.ai -d www.ivoire.ai
```

### 5. Configuration actuelle du projet

#### Fichier `.htaccess`
✅ Déjà configuré pour rediriger `ivoire.ai` → `www.ivoire.ai` avec HTTPS

#### Fichier `robots.txt`
✅ Contient les deux versions du sitemap :
- `https://www.ivoire.ai/sitemap.xml`
- `https://ivoire.ai/sitemap.xml`

#### Fichier `sitemap.xml`
✅ Utilise uniquement `https://www.ivoire.ai` (version canonique)

#### Fichier `index.html`
✅ Toutes les URLs utilisent `https://www.ivoire.ai` (version canonique)

### 6. Actions à effectuer

1. **Vérifier la configuration DNS avec votre registrar
2. **Vérifier que le serveur web accepte les requêtes sur `ivoire.ai`
3. **Vérifier que le certificat SSL couvre les deux domaines
4. **Tester les redirections après configuration
5. **Soumettre le sitemap uniquement pour `https://www.ivoire.ai/sitemap.xml` dans Google Search Console et Bing Webmaster Tools

### 7. URL canonique à soumettre

**Sitemap principal :**
```
https://www.ivoire.ai/sitemap.xml
```

**URL canonique du site :**
```
https://www.ivoire.ai/
```

### 8. Vérification post-configuration

Après avoir configuré le domaine, vérifiez :

1. **Accessibilité :**
   - `https://ivoire.ai` doit rediriger vers `https://www.ivoire.ai`
   - `https://www.ivoire.ai` doit afficher le site

2. **Redirections :**
   - Toutes les variantes doivent rediriger vers `https://www.ivoire.ai`
   - Code de redirection : `301` (Permanent Redirect)

3. **SSL :**
   - Les deux domaines doivent avoir un certificat SSL valide
   - Pas d'avertissements de sécurité

4. **Sitemap :**
   - `https://www.ivoire.ai/sitemap.xml` doit être accessible
   - `https://ivoire.ai/sitemap.xml` doit rediriger vers la version www

### 9. Support

Si le problème persiste après ces vérifications, contactez :
- Votre hébergeur pour la configuration DNS/serveur
- Votre registrar pour la configuration des enregistrements DNS

---

**Note importante :** Le fichier `.htaccess` est déjà optimisé pour gérer les redirections. Le problème est probablement au niveau de la configuration DNS ou du serveur web qui n'accepte pas les requêtes sur `ivoire.ai` (sans www).
