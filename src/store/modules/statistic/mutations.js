const mutations = {
  transformCommitStatistics(state, payload) {
    const commitStatistics = [];
    const entries = Object.entries(payload.commitStatistics);
    for (const entry of entries) {
      commitStatistics.push({
        date: entry[0],
        count: entry[1]
      });
    }
    state.commitStatistics = commitStatistics;
  }
};

export default mutations;
