# 🔧 Correction de l'erreur Gmail API Permissions

## ❌ ERREUR ACTUELLE
```
Gmail_API: Request had insufficient authentication scopes.
```

Cette erreur signifie que votre service Gmail dans EmailJS n'a pas les bonnes permissions.

---

## ✅ SOLUTION - Reconnecter Gmail avec les bonnes permissions

### ÉTAPE 1 : Accéder aux Services Email
1. Allez sur **https://www.emailjs.com/**
2. Connectez-vous à votre compte
3. Dans le menu de gauche, cliquez sur **"Email Services"**

### ÉTAPE 2 : Reconnecter le Service Gmail
1. Trouvez votre service `service_s92d6ru` dans la liste
2. **Cliquez sur le service** pour l'éditer
3. Vous verrez un bouton **"Reconnect"** ou **"Disconnect"** puis **"Connect"**
4. Cliquez dessus pour déconnecter et reconnecter

### ÉTAPE 3 : Autoriser les Permissions
Quand vous reconnectez Gmail, Google vous demandera des permissions :

1. **Autorisez l'accès** à votre compte Gmail
2. **IMPORTANT** : Assurez-vous d'autoriser **TOUTES** les permissions demandées, notamment :
   - ✅ Envoyer des emails
   - ✅ Lire et gérer les emails
   - ✅ Accès complet à Gmail (si demandé)

3. Cliquez sur **"Autoriser"** ou **"Allow"**

### ÉTAPE 4 : Vérifier le Service
1. Après la reconnexion, vérifiez que le service est **actif** (statut vert)
2. Le service devrait maintenant avoir les bonnes permissions

### ÉTAPE 5 : Tester
1. Retournez sur votre site
2. Testez le formulaire de contact
3. L'email devrait maintenant être envoyé avec succès

---

## 🔄 Alternative : Créer un Nouveau Service

Si la reconnexion ne fonctionne pas :

1. Dans EmailJS, allez dans **"Email Services"**
2. Cliquez sur **"Add New Service"**
3. Choisissez **"Gmail"**
4. Connectez votre compte Gmail (`newtiv05@gmail.com`)
5. **Autorisez TOUTES les permissions** demandées par Google
6. Copiez le nouveau **Service ID** généré
7. Mettez à jour `config.js` avec le nouveau Service ID

---

## ⚠️ IMPORTANT

- Assurez-vous d'autoriser **toutes les permissions** demandées par Google
- Ne refusez aucune permission, sinon l'envoi d'emails ne fonctionnera pas
- Si vous avez plusieurs comptes Google, assurez-vous de vous connecter avec `newtiv05@gmail.com`

---

## ✅ Vérification

Après avoir reconnecté, votre service devrait :
- ✅ Avoir un statut **"Active"** (vert)
- ✅ Afficher votre email Gmail connecté
- ✅ Ne plus afficher d'erreurs de permissions

Testez ensuite le formulaire sur votre site !

