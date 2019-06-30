var vm = new Vue({
  el: '#app',
  data: {
    workers: [],
    showAddWorkerModal: false,
    deleteWorkerConfirmModal: false,
    workerToDelete: {},
  },
  mounted() {
    this.loadWorkers();
  },
  methods: {
    loadWorkers() {
      axios({
        method: 'get',
        url: `${apiRootUrl}workers/`,
        header: {
          'Authorization': UserToken
        }
      })
      .then(response => {
        this.workers = response.data;
      });
    },
    deleteWorker(worker) {
      this.deleteWorkerConfirmModal = true;
      this.workerToDelete = worker;
    }
  }
})
