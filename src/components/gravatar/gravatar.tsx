import React from 'react';
import GetEmailHash from './getEmailHash';

type GravatarProps = {
  email: string;
  size?: string;
}

const Gravatar: React.FC<GravatarProps & React.HTMLAttributes<HTMLImageElement>> = ({ style, className, email, size=200 }) => {
  return <img
    style={style}
    className={className} 
    src={`https://www.gravatar.com/avatar/${GetEmailHash(email)}${size ? '?s='+size : null}&r=pg&d=404`} alt='gravatar'
  />
}

export default Gravatar;
