/**
 * Schema.org JSON-LD para SEO
 * Tipos: Organization, LocalBusiness, Service
 */

export interface SchemaOrgProps {
    type: 'organization' | 'localBusiness' | 'service';
    name?: string;
    description?: string;
    url?: string;
    logo?: string;
    image?: string;
    address?: {
        streetAddress: string;
        addressLocality: string;
        addressRegion: string;
        postalCode: string;
        addressCountry: string;
    };
    contactPoint?: {
        telephone: string;
        contactType: string;
        availableLanguage: string;
    };
    sameAs?: string[];
    priceRange?: string;
    serviceType?: string;
}

export default function SchemaOrg(props: SchemaOrgProps) {
    let schema: any = {
        '@context': 'https://schema.org',
    };

    if (props.type === 'organization') {
        schema = {
            ...schema,
            '@type': 'Organization',
            name: props.name || 'EZZO',
            description: props.description || 'Agência de Design, Desenvolvimento Web, Áudio e Audiovisual em Angola',
            url: props.url || 'https://ezzo.ao',
            logo: props.logo || 'https://ezzo.ao/logo.png',
            sameAs: props.sameAs || [
                'https://facebook.com/ezzo',
                'https://instagram.com/ezzo',
                'https://linkedin.com/company/ezzo'
            ],
            contactPoint: props.contactPoint || {
                '@type': 'ContactPoint',
                telephone: '+244-921-063-706',
                contactType: 'customer service',
                availableLanguage: ['Portuguese', 'English']
            }
        };
    }

    if (props.type === 'localBusiness') {
        schema = {
            ...schema,
            '@type': 'LocalBusiness',
            name: props.name || 'EZZO - Agência Multifuncional',
            description: props.description || 'Agência especializada em Design, Web, Áudio e Audiovisual',
            url: props.url || 'https://ezzo.ao',
            image: props.image || 'https://ezzo.ao/og-image.jpg',
            address: props.address || {
                '@type': 'PostalAddress',
                streetAddress: 'Rua Principal',
                addressLocality: 'Luanda',
                addressRegion: 'Luanda',
                postalCode: '00000',
                addressCountry: 'AO'
            },
            telephone: '+244-921-063-706',
            priceRange: props.priceRange || '$$',
        };
    }

    if (props.type === 'service') {
        schema = {
            ...schema,
            '@type': 'Service',
            name: props.name,
            description: props.description,
            provider: {
                '@type': 'Organization',
                name: 'EZZO'
            },
            serviceType: props.serviceType,
            areaServed: 'Angola'
        };
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
