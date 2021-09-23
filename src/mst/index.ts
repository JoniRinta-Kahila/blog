import {
  Instance,
  SnapshotOut,
  types as t 
} from 'mobx-state-tree';

export const PostModel = t.model('Post', {
  caption: t.string,
  category: t.string,
  contentHTML: t.string,
  editorVersion: t.string,
  published: t.boolean,
  tags: t.array(t.string),
  time: t.integer,
  userId: t.string,
});

export const RootStoreModel = t
  .model('Root', {
    posts: t.array(PostModel),
  })
  .actions(self => ({
    setPosts(data: Post[]) {
      self.posts.replace(data);
    }
  }));

export interface Post extends Instance<typeof PostModel> { };
export interface PostSnapshot extends SnapshotOut<typeof PostModel> { };

export interface RootStore extends Instance<typeof RootStoreModel> { };
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> { };