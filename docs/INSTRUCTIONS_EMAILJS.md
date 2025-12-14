# Instructions de Configuration EmailJS pour IVOIRE.AI

## ⚠️ PROBLÈME ACTUEL : "The recipients address is empty"

Cette erreur signifie que le destinataire n'est pas configuré dans votre template EmailJS.

## ✅ SOLUTION - Configuration du Template

### Étape 1 : Accéder à votre template
1. Connectez-vous à https://www.emailjs.com/
2. Allez dans **"Email Templates"** (dans le menu de gauche)
3. Cliquez sur votre template **`template_yunlpaa`** pour l'éditer

### Étape 2 : Configurer le destinataire (IMPORTANT !)

Vous avez **2 options** :

#### **OPTION A : Adresse fixe (Recommandée)**
Dans le champ **"To Email"**, entrez directement :
```
newtiv05@gmail.com
```

#### **OPTION B : Adresse dynamique**
Dans le champ **"To Email"**, entrez :
```
{{to_email}}
```

### Étape 3 : Configurer les autres champs

1. **From Name** : Laissez vide ou mettez `IVOIRE.AI`

2. **Subject** : Entrez
```
{{subject}}
```

3. **Content** (Corps de l'email) : Entrez
```
Nouveau message depuis le site IVOIRE.AI

De: {{from_name}}
Email: {{from_email}}

Message:
{{message}}
```

### Étape 4 : Enregistrer
- Cliquez sur le bouton **"Save"** en bas de la page

### Étape 5 : Tester
1. Ouvrez `test-emailjs.html` dans votre navigateur
2. Cliquez sur "Envoyer un email de test"
3. Vérifiez votre boîte mail `newtiv05@gmail.com`

## 🔍 Vérification

Après avoir configuré le template, vérifiez que :
- ✅ Le champ "To Email" contient soit `newtiv05@gmail.com` soit `{{to_email}}`
- ✅ Le champ "Subject" contient `{{subject}}`
- ✅ Le contenu utilise les variables `{{from_name}}`, `{{from_email}}`, `{{message}}`
- ✅ Le template est sauvegardé

## 📧 Contact

Si le problème persiste après avoir suivi ces instructions, vérifiez :
1. Que votre service email (`service_s92d6ru`) est bien connecté et actif
2. Que votre compte EmailJS n'a pas atteint la limite d'envois gratuits
3. Ouvrez la console du navigateur (F12) pour voir les erreurs détaillées

