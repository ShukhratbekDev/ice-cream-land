import LogoSvg from '../public/logo.svg';

type LogoProps = {
  className?: string;
};

const Logo = ({ className }: LogoProps) => <LogoSvg className={className} />;

export default Logo;
