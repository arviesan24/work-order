Vue.component('workers-list', {
  delimiters: ['[[', ']]'],
  props: {
    workers: Array,
  },
  methods: {
    emitDeleteWorker(worker) {
      this.$emit('delete-worker', worker);
    }
  },
  template: `
  <table class="table table-hover">
    <thead>
      <tr>
        <th scope="col">Delete</th>
        <th scope="col">Name</th>
        <th scope="col">Company</th>
        <th scope="col">Email</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="worker in workers">
        <th scope="row">
          <button v-on:click="emitDeleteWorker(worker)" class="btn btn-danger btn-sm mr-2">x</button>
        </th>
        <td>[[ worker.name ]]</td>
        <td>[[ worker.company ]]</td>
        <td>[[ worker.email ]]</td>
      </tr>
    </tbody>
  </table>
  `
})
