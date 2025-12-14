#!/bin/bash
# Script pour mettre à jour le site sur le VPS

echo "🔄 Mise à jour du site IVOIRE.AI sur le VPS..."
echo ""

# Aller dans le répertoire du site
cd /var/www/iv || exit 1

# Récupérer les dernières modifications
echo "📥 Récupération des dernières modifications depuis GitHub..."
git pull origin main

# Vérifier que les fichiers CSS sont bien présents
echo ""
echo "✅ Vérification des fichiers..."
if [ -f "css/styles.css" ]; then
    echo "  ✓ css/styles.css présent"
    echo "  📏 Taille du fichier: $(du -h css/styles.css | cut -f1)"
    echo "  📅 Dernière modification: $(stat -c %y css/styles.css)"
else
    echo "  ✗ ERREUR: css/styles.css manquant!"
    exit 1
fi

# Vérifier les tailles d'icônes dans le CSS
echo ""
echo "🔍 Vérification des tailles d'icônes dans le CSS..."
if grep -q "\.why-icon" css/styles.css && grep -q "width: 50px" css/styles.css; then
    echo "  ✓ Tailles d'icônes correctes détectées"
else
    echo "  ⚠️  Les tailles d'icônes peuvent ne pas être à jour"
fi

# Ajuster les permissions
echo ""
echo "🔐 Ajustement des permissions..."
chmod 644 index.html css/styles.css js/main.js robots.txt sitemap.xml .htaccess 2>/dev/null
chmod 755 css/ js/ images/ 2>/dev/null
echo "  ✓ Permissions ajustées"

# Vider le cache si possible (Apache)
if command -v apache2ctl &> /dev/null; then
    echo ""
    echo "🗑️  Redémarrage d'Apache pour vider le cache..."
    sudo systemctl reload apache2 2>/dev/null || sudo service apache2 reload 2>/dev/null
    echo "  ✓ Apache rechargé"
fi

# Vider le cache si possible (Nginx)
if command -v nginx &> /dev/null; then
    echo ""
    echo "🗑️  Redémarrage de Nginx pour vider le cache..."
    sudo systemctl reload nginx 2>/dev/null || sudo service nginx reload 2>/dev/null
    echo "  ✓ Nginx rechargé"
fi

echo ""
echo "✅ Mise à jour terminée!"
echo ""
echo "📋 Actions recommandées:"
echo "  1. Vider le cache du navigateur (Ctrl+Shift+R ou Ctrl+F5)"
echo "  2. Vérifier que les icônes ont la bonne taille"
echo "  3. Vérifier la console du navigateur pour les erreurs"
echo ""
echo "🔗 URL: https://www.ivoire.ai"

