export interface simpleProjectCard {
    name: string;
    smallDescription: string;
    currentSlug: string;
    titleImage: { _type:string, asset: [Object] };
    content?: any;
}

/*     
{
    name: 'GeoCapital stock Tracker',
    description: 'A stock tracker for GeoCapital',
    site: 'https://geo-capital-online-portfolio.vercel.app/',
    src: '/GeoCapitalTest.png',
    siteIcon: '/nutriNotes.png',
    darkimage: true,

    active: true,
    tecDescription: 'Typescript, Nextjs, Tailwindcss',
    tecIcon1: '/typescripticon.png',
    tecIcon2: '/nextjsicon.png',
    tecIcon3: '/tailwindcssLogo.png',
},
*/