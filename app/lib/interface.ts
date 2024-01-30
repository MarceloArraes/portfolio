export interface simpleProjectCard {
    name: string;
    currentSlug: string;
    description: any;
    siteImage: { _type:string, asset: [Object] };
    siteIcon: { _type:string, asset: [Object] };
    tecIcon1: { _type:string, asset: [Object] };
    tecIcon2: { _type:string, asset: [Object] };
    tecIcon3: { _type:string, asset: [Object] };
    techDescription?: string;
    darkimage?: boolean;
    active?: boolean;
}