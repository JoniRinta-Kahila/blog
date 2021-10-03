import {
  Instance,
  SnapshotOut,
  types as t 
} from 'mobx-state-tree';

export const PostModel = t.model('Post', {
  id: t.string,
  header: t.string,
  subHeader: t.string,
  caption: t.string,
  displayImage: t.string,
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
    unpublishedPosts: t.array(PostModel),
  })
  .views(self => ({
    get latestFivePost() {
      return self.posts.slice(0,4);
    },
    get allSaved() {
      return [...self.posts, ...self.unpublishedPosts]
    }
  }))
  .actions(self => ({
    setPosts(data: Post[]) {
      self.unpublishedPosts.replace(data.filter(x => x.published === false))
      self.posts.replace(data.filter(x => x.published === true));
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
    },
  }));

export interface Post extends Instance<typeof PostModel> { };
export interface PostSnapshot extends SnapshotOut<typeof PostModel> { };

export interface RootStore extends Instance<typeof RootStoreModel> { };
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> { };