import { createContext, Context, useContext } from "react";
import { BaseEditor } from "slate";
import { HistoryEditor } from "slate-history";
import { ReactEditor } from "slate-react";

export type TeditorContext = {
  editor: (BaseEditor & ReactEditor & HistoryEditor) | undefined
}

export const EditorContext: Context<TeditorContext> =
  createContext<TeditorContext>({
    editor: undefined
  });

export const useEditor = () => useContext(EditorContext);