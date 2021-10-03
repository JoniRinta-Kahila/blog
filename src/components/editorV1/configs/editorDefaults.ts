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
  editorVersion: '1.0',
  published: false,
  id: '',
  userId: '',
  inEditor: true,
  new: true,
};
