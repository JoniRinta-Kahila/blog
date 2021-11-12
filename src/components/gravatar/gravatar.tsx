import React from 'react';
import { useParams } from 'react-router-dom';
import GetEmailHash from './getEmailHash';

const Gravatar: React.FC<React.HTMLAttributes<HTMLImageElement>> = ({ style, className }) => {
  const params = useParams<any>();
  const email = params.email as string;
  const size = params.size as string;

  return <img style={style} className={className} 
    src={`https://www.gravatar.com/avatar/${GetEmailHash(email)}${size ? '?s='+size : null}&r=pg&d=404`} alt='gravatar' />
}

export default Gravatar;
