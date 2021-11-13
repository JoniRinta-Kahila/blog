import React from 'react';
import GetEmailHash from './getEmailHash';

type GravatarProps = {
  email: string;
  size?: string;
  round?: boolean;
}

const Gravatar: React.FC<GravatarProps &
  React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement>> = ({ 
      style, className, email, size='200', round = false, alt='Gravatar'
    }) => {
      const imgAttr: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> = {
        style: {
          borderRadius: round ? `calc(${size}px/2)` : style?.borderRadius,
          ...style
        },
        className: className,
        src: `https://www.gravatar.com/avatar/${GetEmailHash(email)}${size ? '?s='+size : null}&r=pg`,
        alt: alt,
      }
      // eslint-disable-next-line jsx-a11y/alt-text
      return <img { ...imgAttr } />
    }

export default Gravatar;
