const fs = require('fs');

function fixFile(file, replacements) {
    let content = fs.readFileSync(file, 'utf8');
    for (const [search, replace] of replacements) {
        content = content.replace(search, replace);
    }
    fs.writeFileSync(file, content);
}

// 1. app/about/page.tsx
fixFile('app/about/page.tsx', [
    [/const { setCursorText } = useUiStore\(\);\n/, ''],
    [/"La sophistication réside dans le moindre fil, la beauté dans le souffle de notre culture."/g, '&quot;La sophistication réside dans le moindre fil, la beauté dans le souffle de notre culture.&quot;'],
    [/L'histoire/g, 'L&apos;histoire'],
    [/n'avons/g, "n&apos;avons"],
    [/l'artisan/g, "l&apos;artisan"],
    [/d'une/g, "d&apos;une"],
    [/l'essence/g, "l&apos;essence"],
    [/d'expression/g, "d&apos;expression"],
    [/L'Evolution/g, "L&apos;Evolution"],
    [/L'apogée/g, "L&apos;apogée"],
    [/d'œuvre/g, "d&apos;œuvre"]
]);

// 2. components/home/FeaturedCollections.tsx
fixFile('components/home/FeaturedCollections.tsx', [
    [/import { ScrollTrigger } from "gsap\/ScrollTrigger";\n/, ''],
    [/\(collection, i\)/g, '(collection)']
]);

// 3. components/home/HeroSection.tsx
fixFile('components/home/HeroSection.tsx', [
    [/L'Histoire/g, "L&apos;Histoire"]
]);

// 4. components/home/Marquee.tsx
fixFile('components/home/Marquee.tsx', [
    [/import { motion } from "framer-motion";\n/, ''],
    [/const { isDarkMode } = useUiStore\(\);\n/g, '']
]);

// 5. components/home/NewsletterSection.tsx
fixFile('components/home/NewsletterSection.tsx', [
    [/S'abonner/g, "S&apos;abonner"]
]);

// 6. components/layout/Navbar.tsx
fixFile('components/layout/Navbar.tsx', [
    [/isDarkMode, toggleDarkMode, setDarkMode/g, "isDarkMode, toggleDarkMode"]
]);

// 7. components/product/ProductInfo.tsx
fixFile('components/product/ProductInfo.tsx', [
    [/d'achat/g, "d&apos;achat"],
    [/L'article/g, "L&apos;article"],
    [/d'origine/g, "d&apos;origine"]
]);
