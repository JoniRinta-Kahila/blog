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

const onlyUnique = (value:any, index:number, self:any) => {
  return self.indexOf(value) === index;
}

export const RootStoreModel = t
  .model('Root', {
    posts: t.array(PostModel),
  })
  .actions(self => ({
    setPosts(data: Post[]) {
      self.posts.replace(data);
    },
    getLatestNPost(n: number) {
      const sorted = self.posts.sort((a,b) => a.time - b.time);
      return sorted.slice(0, sorted.length < n ? sorted.length : n);
    },
    getArrOfAllPostTags() {
      const tagsArrs = self.posts.map(x => x.tags);
      const mergedAndFiltered = tagsArrs.flat(1).filter(onlyUnique);
      return mergedAndFiltered;
    },
    getArrOfAllPostCategories() {
      const categoriesArr = self.posts.map(x => x.category);
      const categoriesFiltered = categoriesArr.filter(onlyUnique);
      return categoriesFiltered;
    }
  }));

export interface Post extends Instance<typeof PostModel> { };
export interface PostSnapshot extends SnapshotOut<typeof PostModel> { };

export interface RootStore extends Instance<typeof RootStoreModel> { };
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> { };