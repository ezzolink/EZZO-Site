import { useEffect } from 'react';

export default function MetaTags({
    title = "EZZO Digital - Agência Multifuncional em Angola",
    description = "Transformamos ideias em realidade digital com design inovador, tecnologia de ponta, produção musical e audiovisual de excelência. Serviços de criação de sites, identidade visual, aplicativos, marketing digital e muito mais em Luanda, Angola.",
    keywords = "EZZO Digital, agência digital angola, design gráfico luanda, criação de sites angola, identidade visual, desenvolvimento web, aplicativos web, marketing digital angola, produção audiovisual, gravação música angola, streaming eventos, chatbot ia, automação empresas angola",
    ogImage = "https://res.cloudinary.com/djhn3zwkw/image/upload/v1765715698/1-Photoroom_ucz9sl.png",
    url = "https://ezzo.ao"
}) {
    useEffect(() => {
        // Update document title
        document.title = title;

        // Update meta tags
        const metaTags = {
            'description': description,
            'keywords': keywords,

            // Open Graph
            'og:title': title,
            'og:description': description,
            'og:image': ogImage,
            'og:url': url,
            'og:type': 'website',
            'og:site_name': 'EZZO Digital',
            'og:locale': 'pt_AO',

            // Twitter
            'twitter:card': 'summary_large_image',
            'twitter:title': title,
            'twitter:description': description,
            'twitter:image': ogImage,
            'twitter:site': '@ezzo_digital',

            // Additional
            'robots': 'index, follow',
            'author': 'EZZO Digital',
            'language': 'Portuguese',
            'revisit-after': '7 days',
            'theme-color': '#0a0a0f',
            'apple-mobile-web-app-capable': 'yes',
            'apple-mobile-web-app-status-bar-style': 'black-translucent',
            'apple-mobile-web-app-title': 'EZZO Digital',
            'application-name': 'EZZO Digital',
            'msapplication-TileColor': '#0a0a0f',
            'msapplication-TileImage': ogImage
        };

        Object.entries(metaTags).forEach(([name, content]) => {
            let meta = document.querySelector(`meta[name="${name}"]`) ||
                document.querySelector(`meta[property="${name}"]`);

            if (!meta) {
                meta = document.createElement('meta');
                if (name.startsWith('og:') || name.startsWith('twitter:')) {
                    meta.setAttribute('property', name);
                } else {
                    meta.setAttribute('name', name);
                }
                document.head.appendChild(meta);
            }

            meta.setAttribute('content', content);
        });

        // Add canonical link
        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.setAttribute('rel', 'canonical');
            document.head.appendChild(canonical);
        }
        canonical.setAttribute('href', url);

        // Add manifest link (VitePWA handles this in build, but keeping for dev optional verification or remove)
        // VitePWA injects it in index.html. We can remove this if we want to be pure PWA plugin managed.
        // But keeping it safe doesn't hurt much, though it might duplicate.
        // Let's remove manual manifest link injection to avoid conflicts/redundancy.
        // Actually, let's keep it simple and just update the icon.

        // Add apple touch icon
        let appleTouchIcon = document.querySelector('link[rel="apple-touch-icon"]');
        if (!appleTouchIcon) {
            appleTouchIcon = document.createElement('link');
            appleTouchIcon.setAttribute('rel', 'apple-touch-icon');
            appleTouchIcon.setAttribute('href', ogImage);
            document.head.appendChild(appleTouchIcon);
        }

        // Add viewport meta for mobile
        let viewport = document.querySelector('meta[name="viewport"]');
        if (!viewport) {
            viewport = document.createElement('meta');
            viewport.setAttribute('name', 'viewport');
            viewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes');
            document.head.appendChild(viewport);
        }

        // Add structured data (JSON-LD)

        // Add structured data (JSON-LD)
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "EZZO Digital",
            "alternateName": "EZZO",
            "url": url,
            "logo": ogImage,
            "description": description,
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Luanda",
                "addressCountry": "AO"
            },
            "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+244-921-063-706",
                "contactType": "customer service",
                "email": "contato@ezzo.ao",
                "availableLanguage": "Portuguese"
            },
            "sameAs": [
                "https://www.instagram.com/ezzo_digital/",
                "https://www.facebook.com/ezzodigital"
            ],
            "areaServed": {
                "@type": "Country",
                "name": "Angola"
            },
            "service": [
                {
                    "@type": "Service",
                    "serviceType": "Design Gráfico e Identidade Visual",
                    "provider": {
                        "@type": "Organization",
                        "name": "EZZO Digital"
                    }
                },
                {
                    "@type": "Service",
                    "serviceType": "Desenvolvimento Web e Aplicativos",
                    "provider": {
                        "@type": "Organization",
                        "name": "EZZO Digital"
                    }
                },
                {
                    "@type": "Service",
                    "serviceType": "Produção Audiovisual e Musical",
                    "provider": {
                        "@type": "Organization",
                        "name": "EZZO Digital"
                    }
                },
                {
                    "@type": "Service",
                    "serviceType": "Marketing Digital",
                    "provider": {
                        "@type": "Organization",
                        "name": "EZZO Digital"
                    }
                }
            ]
        };

        let script = document.querySelector('script[type="application/ld+json"]');
        if (!script) {
            script = document.createElement('script');
            script.setAttribute('type', 'application/ld+json');
            document.head.appendChild(script);
        }
        script.textContent = JSON.stringify(structuredData);

    }, [title, description, keywords, ogImage, url]);

    return null;
}