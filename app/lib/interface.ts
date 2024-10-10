export interface Asset {
  _type: string;
  asset: {
    _ref: string; // Sanity asset reference ID
    url?: string; // Optional URL for convenience
  };
}

export interface simpleProjectCard {
  name: string;
  currentSlug: string;
  description: any; // PortableText is often dynamically typed, so keep it flexible
  siteImage: Asset;
  siteIcon?: Asset; // Optional because it may not exist
  tecIcon1?: Asset;
  tecIcon2?: Asset;
  tecIcon3?: Asset;
  siteLink?: string; // Optional since it can be null
  showcaseVideoFile: Asset;
  techDescription?: string; // Optional as in your example
  darkimage?: boolean;
  active?: boolean;
  tags: string[]; // Tags are an array of strings
}
