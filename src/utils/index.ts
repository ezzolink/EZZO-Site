export const createPageUrl = (pageName: string) => {
    // Maps internal page names to URL paths
    const pageMap: { [key: string]: string } = {
        'Home': '/',
        'Servicos': '/servicos',
        'Aplicativos': '/aplicativos',
        'SobreNos': '/sobrenos',
        'Contacto': '/contacto',
        'Portfolio': '/portfolio',
        'Blog': '/blog',
        'cliente': '/cliente'
    };

    return pageMap[pageName] || '/';
};
