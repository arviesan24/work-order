Vue.component('delete-worker-modal', {
  delimiters: ['[[', ']]'],
  props: {
    worker: Object,
  },
  methods: {
    deleteWorkerRecords() {
      axios.defaults.xsrfCookieName = 'csrftoken';
      axios.defaults.xsrfHeaderName = 'X-CSRFToken';
      axios({
        method: "delete",
        url: this.worker.url,
        header: {
          'Authorization': UserToken
        }
      })
      .then(() => {
        this.$parent.loadWorkers();
      })
    }
  },
  template: `
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              <h3>Delete Confirmation</h3>
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              <p>Do you really want to delete worker <strong>[[ worker.name ]]</strong>?</p>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="btn btn-outline-danger mx-2" @click="$emit('close')">
                Cancel
              </button>
              <button class="btn btn-danger ml-2" @click="deleteWorkerRecords(); $emit('close')">
                Delete
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
  `
})
