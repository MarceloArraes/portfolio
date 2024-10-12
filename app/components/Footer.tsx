import {
  SiX,
  SiInstagram,
  SiGithub,
  SiLinkedin,
} from "@icons-pack/react-simple-icons"; // Use icons of your choice
import {
  GITHUB_PROFILE,
  LINKEDIN_PROFILE,
  INSTAGRAM_PROFILE,
} from "../constants";

const Footer = () => {
  return (
    <div className="flex justify-center gap-6 mt-16">
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
        <SiX className="w-8 h-8 text-primary hover:text-secondary transition-colors" />
      </a>
      <a href={INSTAGRAM_PROFILE} target="_blank" rel="noopener noreferrer">
        <SiInstagram className="w-8 h-8 text-primary hover:text-secondary transition-colors" />
      </a>
      <a href={LINKEDIN_PROFILE} target="_blank" rel="noopener noreferrer">
        <SiLinkedin className="w-8 h-8 text-primary hover:text-secondary transition-colors" />
      </a>
      <a href={GITHUB_PROFILE} target="_blank" rel="noopener noreferrer">
        <SiGithub className="w-8 h-8 text-primary hover:text-secondary transition-colors" />
      </a>
    </div>
  );
};

export default Footer;
