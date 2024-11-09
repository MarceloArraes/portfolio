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

export interface Profile {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  _type: "profile";
  name: string;
  description: any;
  quote: string;
  profileImage1?: Asset;
  profileImage2?: Asset;
  profileImage3?: Asset;
  resume?: Asset;
  extraImage?: Asset;
  frontendTechs?: string[];
  backendTechs?: string[];
  generalTechs?: string[];
  githubProfile?: string;
  resumeURL?: string;
  linkedinProfile?: string;
  instagramProfile?: string;
  portfolioProfile?: string;
  active: boolean;
}

interface UserProfile {
  url: string;
  name: string;
  avatarUrl: string;
  bio: string;
  createdAt: string;
  location: string;
  status: {
    id: string;
  };
  pinnedItems: {
    nodes: Array<PinnedItem>;
  };
}

export interface Message {
  _type: "messages";
  active: boolean;
  _id?: string;
  message: string;
  _updatedAt?: string; // ISO date string
  _createdAt?: string; // ISO date string
  _rev?: string;
}

export interface PinnedItem {
  id: string;
  name: string;
  description: string | null;
  url: string;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage: {
    name: string;
    color: string;
  };
}

interface ContributionDay {
  date: string;
  contributionCount: number;
}

export interface WeekContribution {
  contributionDays: ContributionDay[];
}
export interface GithubContributions {
  totalContributions: number;
  weeks: WeekContribution[];
}

export interface ContributionsAndViewerData {
  contributionData: GithubContributions;
  viewerData: UserProfile;
}
