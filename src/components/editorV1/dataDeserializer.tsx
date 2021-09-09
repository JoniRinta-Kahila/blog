import React from 'react';
import Gist from 'react-gist';
import { Descendant } from 'slate';
import { CustomElement, CustomElement2 } from '../../react-app-env';

type DataDeserializerProps = {
  data: Descendant[]
};

const DataDeserializer: React.FC<DataDeserializerProps> = ({ data }) => {

  const deSerializeNodes: (element: CustomElement|CustomElement2) => React.ReactNode = el => {
    switch (el.type) {
      case 'paragraph':
        return <p key={el.uuid}>{el.children[0].text}</p>
      case 'bold':
        return <p key={el.uuid}><b>{el.children[0].text}</b></p>
      case 'italic':
        return <p key={el.uuid}><i>{el.children[0].text}</i></p>
      case 'underline':
        return <p key={el.uuid}><u>{el.children[0].text}</u></p>
      case 'deleted':
        return <p key={el.uuid}><del>{el.children[0].text}</del></p>
      case 'gist':

        if (el.children[0]?.text && el.children[0]?.text) {
          return <Gist key={el.children[0]?.text + el.children[0]?.text} id={el.children[0].text} file={el.children[1].text} />
        }
        if (el.children[0]?.text) {
          return <Gist key={el.children[0]?.text} id={el.children[0].text ?? ' '} file=' ' />
        }

        return <h1>Gist Error</h1>
      case 'heading':
        if (el.level === 1)
          return <h1 key={el.uuid}>{el.children[0].text}</h1>
        if (el.level === 2)
          return <h2 key={el.uuid}>{el.children[0].text}</h2>
        if (el.level === 3)
          return <h3 key={el.uuid}>{el.children[0].text}</h3>
        if (el.level === 4)
          return <h4 key={el.uuid}>{el.children[0].text}</h4>
        if (el.level === 5)
          return <h5 key={el.uuid}>{el.children[0].text}</h5>
        if (el.level === 6)
          return <h6 key={el.uuid}>{el.children[0].text}</h6>
  
        return 
      default:
        return <p>default</p>
    }
  };

  return (
    <div>
      { data.map(deSerializeNodes as any) }
    </div>
  );
};

export default DataDeserializer;
