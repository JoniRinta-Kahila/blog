import { IEditorItem } from "../types/editorItem";

export const EditorDefaults: IEditorItem = {
  header: '',
  subHeader: '',
  caption: '',
  displayImage: '',
  category: '',
  tags: [] as any,
  contentHTML: '<p>Hello from ckEditor5!</p>',
  time: new Date().getTime(),
  inEditor: true,
  editorVersion: '1.0',
  published: false,
  id: '',
  userId: '',
};
