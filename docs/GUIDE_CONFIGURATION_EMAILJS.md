# 🔧 GUIDE COMPLET - Configuration EmailJS pour IVOIRE.AI

## ❌ ERREUR ACTUELLE
```
The recipients address is empty
```

Cette erreur signifie que le champ **"To Email"** dans votre template EmailJS est **VIDE**.

---

## ✅ SOLUTION ÉTAPE PAR ÉTAPE

### ÉTAPE 1 : Se connecter à EmailJS
1. Allez sur **https://www.emailjs.com/**
2. Connectez-vous à votre compte

### ÉTAPE 2 : Accéder aux Templates
1. Dans le menu de gauche, cliquez sur **"Email Templates"**
2. Vous verrez la liste de vos templates
3. **Cliquez sur** `template_yunlpaa` pour l'éditer

### ÉTAPE 3 : Configurer le Destinataire (CRITIQUE !)

**C'est ici que se trouve le problème !**

Dans la page d'édition du template, vous verrez plusieurs champs en haut :

```
┌─────────────────────────────────────────┐
│ Template Settings                        │
├─────────────────────────────────────────┤
│ Template Name: [template_yunlpaa]       │
│                                         │
│ To Email: [  ← CE CHAMP EST VIDE ! ]   │
│                                         │
│ From Name: [IVOIRE.AI]                  │
│                                         │
│ Subject: [{{subject}}]                  │
│                                         │
│ Content: [{{message}}]                  │
└─────────────────────────────────────────┘
```

**ACTION REQUISE :**

Dans le champ **"To Email"** (le premier champ), vous DEVEZ entrer :

```
newtiv05@gmail.com
```

**OU** si vous voulez utiliser une variable :

```
{{to_email}}
```

⚠️ **IMPORTANT** : Ce champ ne doit JAMAIS être vide !

### ÉTAPE 4 : Vérifier les autres champs

Assurez-vous que :
- **Subject** contient : `{{subject}}`
- **Content** contient quelque chose comme :
  ```
  Nouveau message depuis le site IVOIRE.AI
  
  De: {{from_name}}
  Email: {{from_email}}
  
  Message:
  {{message}}
  ```

### ÉTAPE 5 : Sauvegarder
1. Faites défiler vers le bas de la page
2. Cliquez sur le bouton **"Save"** (ou "Save Template")
3. Attendez la confirmation de sauvegarde

### ÉTAPE 6 : Tester
1. Ouvrez votre site web
2. Remplissez le formulaire de contact
3. Envoyez un message
4. Vérifiez votre boîte mail `newtiv05@gmail.com`

---

## 🔍 VÉRIFICATION VISUELLE

Après avoir configuré, votre template devrait ressembler à ceci :

```
Template Name: template_yunlpaa
To Email: newtiv05@gmail.com          ← DOIT ÊTRE REMPLI !
From Name: IVOIRE.AI
Subject: {{subject}}
Content: 
  Nouveau message depuis le site IVOIRE.AI
  
  De: {{from_name}}
  Email: {{from_email}}
  
  Message:
  {{message}}
```

---

## 🆘 SI ÇA NE FONCTIONNE TOUJOURS PAS

### Option 1 : Créer un nouveau template
1. Dans EmailJS, cliquez sur **"Create New Template"**
2. Configurez-le exactement comme décrit ci-dessus
3. Copiez le nouveau **Template ID**
4. Mettez à jour `config.js` avec le nouveau Template ID

### Option 2 : Vérifier le Service Email
1. Allez dans **"Email Services"**
2. Vérifiez que `service_s92d6ru` est **actif** et **connecté**
3. Si ce n'est pas le cas, reconnectez votre compte Gmail

### Option 3 : Utiliser le fichier de diagnostic
1. Ouvrez `diagnostic-emailjs.html` dans votre navigateur
2. Suivez les instructions affichées
3. Utilisez les boutons de test pour identifier le problème

---

## 📧 CONTACT

Si après avoir suivi toutes ces étapes le problème persiste :
- Vérifiez la console du navigateur (F12) pour voir les erreurs détaillées
- Vérifiez que votre compte EmailJS n'a pas atteint la limite d'envois gratuits
- Contactez le support EmailJS si nécessaire

---

## ✅ CHECKLIST FINALE

Avant de tester, vérifiez que :
- [ ] Vous êtes connecté à EmailJS
- [ ] Le template `template_yunlpaa` est ouvert
- [ ] Le champ **"To Email"** contient `newtiv05@gmail.com` ou `{{to_email}}`
- [ ] Le champ **"Subject"** contient `{{subject}}`
- [ ] Le template est **sauvegardé**
- [ ] Le service email `service_s92d6ru` est actif
- [ ] Votre Public Key est correcte dans `config.js`

