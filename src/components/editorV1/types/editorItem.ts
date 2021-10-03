import { Post } from "../../../mst";

export interface IEditorItem extends Post {
  inEditor: boolean,
  new: boolean,
};
