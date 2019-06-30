var vm = new Vue({
  el: '#app',
  data:{
    workOrders: [],
    searchText: '',
    searchDeadline: null,
    showWorkOrderModal: false,
  },
  mounted() {
    this.loadWorkOrders();
  },
  methods: {
    getSearchText(searchText) {
      this.searchText = searchText;
      this.loadWorkOrders(this.searchDeadline, this.searchText);
    },
    clearSearch() {
      this.searchDeadline = null;
      this.searchText = '';
      // clear searchText from search-bar component
      this.$refs['searchTextComponent'].searchText = '';
      this.loadWorkOrders();
    },
    workOrdersFetchWorkers(workOrdersRes, workersRes) {
      workOrdersRes.forEach(workOrder => {
        let newWorkers = [];
        // map changes to each worker of workOrder
        if (workOrder.workers.length > 0) {
          workOrder.workers.forEach(worker => {
            // fetch new worker value from all workers
            workersRes.forEach(w => {
              if (worker===w['url']) {
                newWorkers.push(w);
              }
            });
          });
        }
        workOrder.workers = newWorkers;
      });
      return workOrdersRes;
    },
    loadWorkOrders(deadlineParam, searchParam) {
      axios({
        method: 'get',
        url: `${apiRootUrl}work-orders/`,
        params: {
          workers_name: searchParam,
          deadline: deadlineParam
        },
        header: {
          'Authorization': UserToken
        }
      })
      .then(workOrdersPromise => {
        let workersPromise = axios({
          method: 'get',
          url: `${apiRootUrl}workers/`,
          header: {
            'Authorization': UserToken
          }
        })
        return Promise.all([workOrdersPromise, workersPromise])
      })
      .then(([workOrdersPromise, workersPromise]) => {
        let workOrdersRes = workOrdersPromise.data;
        let workersRes = workersPromise.data;

        this.workOrders = this.workOrdersFetchWorkers(workOrdersRes, workersRes);
      });
    },
    removeWorkOrderWorker(obj) {
      axios.defaults.xsrfCookieName = 'csrftoken';
      axios.defaults.xsrfHeaderName = 'X-CSRFToken';
      let workOrderWorkers = obj['work-order'].workers;
      let workersSplicer = null;
      // Get the index of the worker to be removed.
      workOrderWorkers.forEach((worker, index) => {
        if (worker.url===obj.worker.url) {
          workersSplicer = index;
        }
      });
      // Remove the selected worker from workOrder's workers.
      workOrderWorkers.splice(workersSplicer, 1);

      axios({
        method: 'patch',
        url: obj['work-order'].url,
        header: {
        'Authorization': UserToken,
        },
        data: {
          workers: workOrderWorkers.map(worker => worker.url)
        }
      })
    }
  }
})
