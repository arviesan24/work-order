Vue.component('workorder-list', {
    delimiters: ['[[', ']]'],
    props: {
      workOrders: Array,
    },
    data() {
      return {
        showWorkerModal: false,
        selectedWorkOrder: {},
      }
    },
    methods: {
      emitWorker(workOrder, worker) {
        this.$emit('worker-to-delete', {'work-order': workOrder, 'worker': worker});
      }
    },
    template: `
    <div class="table-responsive">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Deadline</th>
            <th scope="col">Workers</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="workOrder in workOrders">
            <th scope="row">[[ workOrder.title ]]</th>
            <td>[[ workOrder.description ]]</td>
            <td>[[ workOrder.deadline ]]</td>
            <td>
              <span v-for="worker in workOrder.workers">
                <button v-on:dblclick="emitWorker(workOrder, worker)" v-bind:disabled="workOrder.workers.length==1" tooltip.hover title="Double-click to remove" class="btn btn-outline-primary workeritem btn-sm mx-1 my-1">
                  [[ worker.name ]]
                </button>
              </span>
              <button @click="showWorkerModal=true; selectedWorkOrder=workOrder;" tooltip.hover title="Add Workers" class="btn btn-outline-success btn-sm mx-1">
                Edit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <worker-modal v-if="showWorkerModal" v-bind:selected-work-order="selectedWorkOrder" @close="showWorkerModal=false"></worker-modal>
    </div>
    `
  })Vue.component('workorder-list', {
    delimiters: ['[[', ']]'],
    props: {
      workOrders: Array,
    },
    data() {
      return {
        showWorkerModal: false,
        selectedWorkOrder: {},
      }
    },
    methods: {
      emitWorker(workOrder, worker) {
        this.$emit('worker-to-delete', {'work-order': workOrder, 'worker': worker});
      }
    },
    template: `
    <div class="table-responsive">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Deadline</th>
            <th scope="col">Workers</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="workOrder in workOrders">
            <th scope="row">[[ workOrder.title ]]</th>
            <td>[[ workOrder.description ]]</td>
            <td>[[ workOrder.deadline ]]</td>
            <td>
              <span v-for="worker in workOrder.workers">
                <button v-on:dblclick="emitWorker(workOrder, worker)" v-bind:disabled="workOrder.workers.length==1" tooltip.hover title="Double-click to remove" class="btn btn-outline-primary workeritem btn-sm mx-1 my-1">
                  [[ worker.name ]]
                </button>
              </span>
              <button @click="showWorkerModal=true; selectedWorkOrder=workOrder;" tooltip.hover title="Add Workers" class="btn btn-outline-success btn-sm mx-1">
                Edit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <worker-modal v-if="showWorkerModal" v-bind:selected-work-order="selectedWorkOrder" @close="showWorkerModal=false"></worker-modal>
    </div>
    `
  })
