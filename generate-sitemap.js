/**
 * Script de génération automatique du sitemap.xml
 * Usage: node generate-sitemap.js
 */

const fs = require('fs');
const path = require('path');

// Configuration
const config = {
    baseUrl: 'https://www.ivoire.ai',
    outputFile: 'sitemap.xml',
    pages: [
        {
            url: '/',
            lastmod: new Date().toISOString().split('T')[0], // Date actuelle au format YYYY-MM-DD
            changefreq: 'weekly',
            priority: '1.0'
        }
        // Ajouter d'autres pages ici si nécessaire
        // {
        //     url: '/services',
        //     lastmod: '2025-01-27',
        //     changefreq: 'monthly',
        //     priority: '0.8'
        // }
    ]
};

// Générer le XML du sitemap
function generateSitemap() {
    const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    
    <!-- 
        Sitemap pour IVOIRE.AI - Intelligence Artificielle en Côte d'Ivoire et en Afrique
        Site web : ${config.baseUrl}
        Généré automatiquement le : ${new Date().toISOString()}
        
        Note : Les pages de test (test-emailjs.html, test-ga.html, diagnostic-emailjs.html) 
        sont exclues car elles ont des meta tags noindex et sont bloquées dans robots.txt
    -->
    
`;

    let xmlBody = '';
    config.pages.forEach(page => {
        xmlBody += `    <!-- ${page.url === '/' ? 'Page principale - Accueil' : page.url} -->
    <url>
        <loc>${config.baseUrl}${page.url}</loc>
        <lastmod>${page.lastmod}</lastmod>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
    </url>
    
`;
    });

    const xmlFooter = `</urlset>
`;

    return xmlHeader + xmlBody + xmlFooter;
}

// Écrire le fichier sitemap.xml
try {
    const sitemapContent = generateSitemap();
    const outputPath = path.join(__dirname, config.outputFile);
    
    fs.writeFileSync(outputPath, sitemapContent, 'utf8');
    console.log(`✅ Sitemap généré avec succès : ${config.outputFile}`);
    console.log(`📄 ${config.pages.length} page(s) incluse(s)`);
    console.log(`🌐 URL de base : ${config.baseUrl}`);
} catch (error) {
    console.error('❌ Erreur lors de la génération du sitemap:', error);
    process.exit(1);
}

