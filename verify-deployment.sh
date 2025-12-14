#!/bin/bash
# Script de vérification avant déploiement VPS

echo "🔍 Vérification des risques de conflits pour le déploiement VPS..."
echo ""

# Vérifier les chemins relatifs
echo "✅ Vérification des chemins relatifs :"
if grep -q 'href="css/styles.css"' index.html; then
    echo "  ✓ CSS : chemin relatif correct (css/styles.css)"
else
    echo "  ✗ ERREUR : CSS path incorrect"
fi

if grep -q 'src="js/main.js"' index.html; then
    echo "  ✓ JS : chemin relatif correct (js/main.js)"
else
    echo "  ✗ ERREUR : JS path incorrect"
fi

# Vérifier les fichiers essentiels
echo ""
echo "✅ Vérification des fichiers essentiels :"
files=("index.html" "css/styles.css" "js/main.js" "robots.txt" "sitemap.xml" ".htaccess")
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "  ✓ $file existe"
    else
        echo "  ✗ ERREUR : $file manquant"
    fi
done

# Vérifier .htaccess
echo ""
echo "⚠️  Point d'attention : .htaccess"
if [ -f ".htaccess" ]; then
    echo "  ✓ .htaccess présent dans le repo"
    echo "  ⚠️  ATTENTION : Si un .htaccess existe déjà sur le VPS, il y aura conflit"
    echo "  → Solution : Sauvegarder l'ancien avant déploiement"
else
    echo "  ✗ .htaccess manquant"
fi

# Vérifier les URLs absolues
echo ""
echo "✅ Vérification des URLs :"
if grep -q 'https://www.ivoire.ai' index.html; then
    echo "  ✓ URLs canoniques correctes (www.ivoire.ai)"
else
    echo "  ⚠️  URLs non standardisées"
fi

# Vérifier les fichiers de test
echo ""
echo "📝 Fichiers de test (optionnels en production) :"
test_files=("test-emailjs.html" "diagnostic-emailjs.html" "test-ga.html")
for file in "${test_files[@]}"; do
    if [ -f "$file" ]; then
        echo "  ⚠️  $file présent (peut être supprimé en production)"
    fi
done

echo ""
echo "✅ Vérification terminée !"
echo ""
echo "📋 Actions recommandées avant déploiement :"
echo "  1. Vérifier si .htaccess existe déjà sur le VPS"
echo "  2. Sauvegarder l'ancien .htaccess si présent"
echo "  3. Vérifier que le serveur utilise Apache (pas Nginx)"
echo "  4. Vérifier que mod_rewrite est activé (Apache)"
echo ""
echo "📖 Consultez docs/CHECKLIST_DEPLOIEMENT_VPS.md pour plus de détails"

