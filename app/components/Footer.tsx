import { Twitter, Instagram, Github } from "lucide-react"; // Use icons of your choice

const Footer = () => {
  return (
    <div className="flex justify-center gap-6 mt-16">
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
        <Twitter className="w-8 h-8 text-primary hover:text-secondary transition-colors" />
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
        <Instagram className="w-8 h-8 text-primary hover:text-secondary transition-colors" />
      </a>
      <a href="https://github.com" target="_blank" rel="noopener noreferrer">
        <Github className="w-8 h-8 text-primary hover:text-secondary transition-colors" />
      </a>
    </div>
  );
};

export default Footer;
