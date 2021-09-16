import React from 'react'

type ArticleCategoryProps = {
  str: string,
  inEditor: boolean
}

const ArticleCategory: React.FC<ArticleCategoryProps> = ({ str, inEditor }) => {
  return inEditor && !str ? (
    <p style={{
      marginLeft: '6px',
      fontSize: '13px',
      color:'red',
    }}>CATEGORY MISSING</p>
  ) : (
    <p style={{
      marginLeft: '6px',
      fontSize: '13px',
      color: '#646464',
    }}>{str}</p>
  )
}

export default ArticleCategory
