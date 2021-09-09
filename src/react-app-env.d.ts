/// <reference types="react-scripts" />

import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';

declare module '@ckeditor/*' {
  const classes: any;
  export default classes;
}

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor

export type ParagraphElement = {
  type: 'paragraph'
  children: CustomText[]
  uuid: string
}

export type HeadingElement = {
  type: 'heading'
  level: number
  children: CustomText[]
  uuid: string
}

export type BoldElement = {
  type: 'bold',
  children: CustomText[]
  uuid: string
}

export type ItalicElement = {
  type: 'italic',
  children: CustomText[]
  uuid: string
}

export type UnderlineElement = {
  type: 'underline',
  children: CustomText[]
  uuid: string
}

export type DeletedElement = {
  type: 'deleted',
  children: CustomText[]
  uuid: string
}

export type GistElement = {
  type: 'gist'
  // use two object in GistData[]. [0].text for Gist-ID, [1].text for Gist-File* (*Optional).

  children: GistData[]
  uuid: string
}

export type CustomElement = ParagraphElement | HeadingElement | ItalicElement | BoldElement | UnderlineElement | DeletedElement;
export type FormattedText = { text: string; bold?: true };
export type CustomText = FormattedText;

/**
 * GistFormat have properties 'text' & 'text2'. Property text2 need to be random string, and always different between objects in GistData[]
 */
export type CustomElement2 = GistElement
export type GistFormat = { text: string; randStr: string};
export type GistData = GistFormat;

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor
    Element: CustomElement | CustomElement2
    Text: CustomText
    data?: CustomData
  }
}