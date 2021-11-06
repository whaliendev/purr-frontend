const mutations = {
  transformCommitStatistics(state, payload) {
    const commitStatistics = [];
    for (const record of payload.articleCommits) {
      commitStatistics.push({
        date: record.date,
        count: record.commitCount
      });
    }
    state.commitStatistics = commitStatistics;
  }
};

export default mutations;
