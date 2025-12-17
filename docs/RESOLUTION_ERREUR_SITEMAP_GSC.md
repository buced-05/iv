# 🔧 Résolution - Erreur "Adresse de sitemap incorrecte" dans Google Search Console

## ❌ Erreur

Google Search Console affiche :
```
Adresse de sitemap incorrecte
Veuillez saisir un chemin valide vers le sitemap de votre site.
```

## ✅ Solutions

### Solution 1 : Utiliser le chemin relatif (RECOMMANDÉ)

Dans le champ "Ajouter un sitemap", entrez **UNIQUEMENT** :

```
sitemap.xml
```

**PAS** :
- ❌ `https://www.ivoire.ai/sitemap.xml`
- ❌ `www.ivoire.ai/sitemap.xml`
- ❌ `/sitemap.xml`
- ❌ `sitemap.xml/`

### Solution 2 : Utiliser l'URL complète (Alternative)

Si la solution 1 ne fonctionne pas, essayez l'URL complète :

```
https://www.ivoire.ai/sitemap.xml
```

### Solution 3 : Vérifier que le sitemap est accessible

**AVANT** de soumettre dans Google Search Console, testez :

1. **Dans votre navigateur**, ouvrez :
   ```
   https://www.ivoire.ai/sitemap.xml
   ```

2. **Résultat attendu** : Le fichier XML doit s'afficher correctement

3. **Si erreur 404** : Le fichier n'est pas à la racine du site

### Solution 4 : Vérifier le domaine dans Google Search Console

Assurez-vous que vous êtes dans la **bonne propriété** :

- ✅ `www.ivoire.ai` OU
- ✅ `ivoire.ai`

Le sitemap doit correspondre au domaine de la propriété.

## 📋 Étapes Détaillées dans Google Search Console

### Étape 1 : Accéder à la section Sitemaps

1. Allez sur : https://search.google.com/search-console
2. Connectez-vous
3. Sélectionnez la propriété : `www.ivoire.ai` ou `ivoire.ai`
4. Dans le menu de gauche, cliquez sur **"Sitemaps"**

### Étape 2 : Ajouter le sitemap

1. Dans la section **"Ajouter un sitemap"**
2. Dans le champ de saisie, entrez **EXACTEMENT** :
   ```
   sitemap.xml
   ```
3. **Cliquez sur "Envoyer"**

### Étape 3 : Vérifier le résultat

Après soumission, vous devriez voir :
- ✅ Statut : "En attente" puis "Réussi"
- ✅ Type : "Sitemap"
- ✅ URLs envoyées : 1

## 🔍 Vérifications Avant Soumission

### 1. Vérifier l'accessibilité du sitemap

```bash
# Sur le serveur
curl -I https://www.ivoire.ai/sitemap.xml
```

**Résultat attendu** :
```
HTTP/1.1 200 OK
Content-Type: application/xml
```

### 2. Vérifier le contenu du sitemap

```bash
# Sur le serveur
cat /var/www/iv/sitemap.xml
```

**Résultat attendu** : XML valide avec l'URL `https://www.ivoire.ai/`

### 3. Vérifier les permissions

```bash
# Sur le serveur
ls -la /var/www/iv/sitemap.xml
```

**Résultat attendu** : Permissions `644` ou `644`

### 4. Vérifier la configuration Nginx

Assurez-vous que Nginx sert correctement les fichiers XML :

```nginx
location ~ \.xml$ {
    add_header Content-Type application/xml;
}
```

## 🚨 Erreurs Courantes et Solutions

### Erreur : "Sitemap could not be read"
**Cause** : Le fichier n'est pas accessible
**Solution** : Vérifier les permissions et l'accessibilité

### Erreur : "Invalid XML"
**Cause** : Erreur de syntaxe dans le XML
**Solution** : Valider le XML avec un validateur

### Erreur : "Sitemap URL not in allowed list"
**Cause** : L'URL ne correspond pas au domaine vérifié
**Solution** : Utiliser le bon domaine (www.ivoire.ai ou ivoire.ai)

### Erreur : "Adresse de sitemap incorrecte"
**Cause** : Format de chemin incorrect
**Solution** : Utiliser `sitemap.xml` (chemin relatif) ou l'URL complète

## 📝 Format Correct du Sitemap

Le sitemap doit être dans ce format :

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

## 🔄 Commandes de Vérification sur le Serveur

```bash
# 1. Se placer dans le répertoire
cd /var/www/iv

# 2. Vérifier que le sitemap existe
ls -la sitemap.xml

# 3. Vérifier le contenu
cat sitemap.xml

# 4. Tester l'accessibilité
curl -I https://www.ivoire.ai/sitemap.xml

# 5. Vérifier les permissions
chmod 644 sitemap.xml

# 6. Redémarrer Nginx si nécessaire
sudo systemctl restart nginx
```

## ✅ Checklist Finale

Avant de soumettre dans Google Search Console :

- [ ] Le fichier `sitemap.xml` existe à `/var/www/iv/sitemap.xml`
- [ ] L'URL `https://www.ivoire.ai/sitemap.xml` est accessible dans le navigateur
- [ ] Le XML est valide (pas d'erreurs de syntaxe)
- [ ] Le Content-Type est `application/xml`
- [ ] Les permissions sont correctes (644)
- [ ] Nginx est configuré pour servir les fichiers XML
- [ ] Vous êtes dans la bonne propriété dans Google Search Console

## 🎯 Solution Rapide

**Dans Google Search Console, dans le champ "Ajouter un sitemap" :**

1. **Effacez tout le contenu du champ**
2. **Tapez exactement** : `sitemap.xml`
3. **Cliquez sur "Envoyer"**

C'est tout ! Google va automatiquement chercher le sitemap à :
- `https://www.ivoire.ai/sitemap.xml` (si propriété www.ivoire.ai)
- `https://ivoire.ai/sitemap.xml` (si propriété ivoire.ai)

---

**Date** : 2025-12-17  
**Statut** : Guide de résolution erreur Google Search Console

