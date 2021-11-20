const getters = {
  tagOptions: (state) => state.tagOptions,
  adminTagsList: (state) => state.adminTagsList.data,
  adminTagsListTimestamp: (state) => state.adminTagsList.timestamp,
  adminTagsListPageParams: (state) => state.adminTagsList.pageParams
};

export default getters;
