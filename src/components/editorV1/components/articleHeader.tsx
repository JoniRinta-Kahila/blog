import React from 'react'

type ArticleHeaderProps = {
  str: string,
  inEditor: boolean
}

const ArticleHeader: React.FC<ArticleHeaderProps> = ({ str, inEditor }) => {

  return inEditor && !str ? (
    <h1 style={{
      marginBottom: '10px',
      paddingLeft: '5px',
      color:'red',
    }}>HEADER MISSING</h1>
  ) : (
    <h1 style={{
      marginBottom: '10px',
      paddingLeft: '5px',
      color: '#646464',
    }}>{str}</h1>
  )
}

export default ArticleHeader
