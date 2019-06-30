Vue.component('worker-modal', {
    delimiters: ['[[', ']]'],
    props: {
      selectedWorkOrder: Object,
    },
    data() {
      return {
        value: [],
        options: [],
        valueError: '',
        submitDisabled: false,
      }
    },
    watch: {
      value() {
        if (this.value.length > 5) {
          this.valueError = 'Max of 5 workers are allowed.';
          this.submitDisabled = true;
        } else if (this.value.length == 0) {
          this.valueError = "Workers can't be empty.";
          this.submitDisabled = true;
        } else {
          this.valueError = '';
          this.submitDisabled = false;
        }
      }
    },
    mounted() {
      this.value = this.selectedWorkOrder.workers;
      axios({
        method: 'get',
        url: `${apiRootUrl}workers/`,
        header: {
          'Authorization': UserToken
        }
      }).then(res => {
        this.options = res.data;
      });
    },
    methods: {
      saveWorkers() {
        axios.defaults.xsrfCookieName = 'csrftoken';
        axios.defaults.xsrfHeaderName = 'X-CSRFToken';
        axios({
          method: 'patch',
          url: this.selectedWorkOrder.url,
          header: {
          'Authorization': UserToken,
          },
          data: {
            workers: this.value.map(val => val.url)
          }
        }).then(() => {
          // reload workOrder list
          this.$parent.$parent.loadWorkOrders();
        }).catch((error) => {
          console.log(error);
        });
      }
    },
    template: `
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
  
            <div class="modal-header">
              <slot name="header">
                <h3>Add Workers</h3>
              </slot>
            </div>
  
            <div class="modal-body">
              <slot name="body">
                <mutiselect-dropdown
                  v-model="value"
                  :options="options"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  placeholder="Select workers"
                  label="name" track-by="name"
                  :preselect-first="true">
                  <template slot="selection" slot-scope="{ values, search, isOpen }">
                    <span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} options selected</span>
                  </template>
                </mutiselect-dropdown>
                <small class="text-danger">[[valueError]]</small>
              </slot>
            </div>
  
            <div class="modal-footer">
              <slot name="footer">
                <button class="btn btn-outline-danger" @click="$emit('close')">
                  Cancel
                </button>
                <button class="btn btn-danger" v-bind:disabled="submitDisabled" @click="saveWorkers(); $emit('close')">
                  Save
                </button>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
    `
  })
