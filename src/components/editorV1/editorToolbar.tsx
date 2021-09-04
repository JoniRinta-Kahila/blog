import React, { CSSProperties, useState } from 'react';
import Select, { StylesConfig } from 'react-select';
import styles from './editor.module.scss';
import { FaGithubSquare } from 'react-icons/fa';

type EditorToolbarProps = {

}

const EditorToolbar: React.FC<EditorToolbarProps> = () => {
    
    type MyOptionType = {
        label: string;
        value: string;
        fontSize: string;
      };
      
      const options: MyOptionType[] = [
        { value: 'Paragraph', label: 'Paragraph', fontSize: '18px' },
        { value: 'h1', label: 'Header-1', fontSize: '2em' },
        { value: 'h2', label: 'Header-2', fontSize: '1.5em' },
        { value: 'h3', label: 'Header-3', fontSize: '1.17em' },
        { value: 'h4', label: 'Header-4', fontSize: '1em' },
        { value: 'h5', label: 'Header-5', fontSize: '0.83em' },
        { value: 'h6', label: 'Header-6', fontSize: '0.75em' },
      ];
      
      // react-select styling: https://stackoverflow.com/a/63699270
      const customControlStyles: CSSProperties = {
        color: 'white',
        width: 200,
        maxHeight: 2
      };
      
      type IsMulti = false;

      const selectStyle: StylesConfig<MyOptionType, IsMulti> = {
        option: (provided, state) => {
            return {
                ...provided,
                fontSize: state.data.fontSize,
            }
        },
        control: (provided, state) => {
            return {
              ...provided,
              ...customControlStyles,
            };
          },
      }

  return (
    <div className={styles.toolbarContainer}>
        <Select
            options={options}
            styles={selectStyle}
            maxMenuHeight={250}
            defaultValue={options[0]}
            
            />
        <button><b>B</b></button>
        <button><b><i>I</i></b></button>
        <button><b><u>U</u></b></button>
        <button><b><del>S</del></b></button>
        <button className={styles.iconButton}><FaGithubSquare size={35}/></button>
        
    </div>
  )
}

export default EditorToolbar
