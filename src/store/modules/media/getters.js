const getters = {
  adminMediaList: (state) => state.mediaList.data,
  adminPageParams: (state) => state.mediaList.pageParams,
  adminMediaListTimestamp: (state) => state.mediaList.timestamp,
  adminCategories: (state) => state.categories.data,
  adminCategoriesTimestamp: (state) => state.categories.timestamp
};

export default getters;
