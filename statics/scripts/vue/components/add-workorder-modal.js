Vue.component('add-workorder-modal', {
    delimiters: ['[[', ']]'],
    data() {
      return {
        inputTitle: '',
        inputDescription: '',
        inputDeadline: null,
        options: [],
        value: [],
        titleError: '',
        descriptionError: '',
        deadlineError: '',
        submitDisabled: true,
        valueError: '',
      }
    },
    methods: {
      saveWorkOrder() {
        axios.defaults.xsrfCookieName = 'csrftoken';
        axios.defaults.xsrfHeaderName = 'X-CSRFToken';
        axios({
          method: 'post',
          url: `${apiRootUrl}work-orders/`,
          header: {
          'Authorization': UserToken,
          },
          data: {
            title: this.inputTitle,
            description: this.inputDescription,
            deadline: this.inputDeadline,
            workers: this.value.map(val => val.url)
          }
        }).then(() => {
          // reload workOrder list
          this.$parent.loadWorkOrders();
        }).catch((error) => {
          console.log(error);
        });
      },
      inputValidation() {
        let dateToday = new Date().toLocaleDateString();
        if (this.inputTitle==='' || 
            this.inputDescription==='' ||
            !Date.parse(this.inputDeadline) ||
            Date.parse(this.inputDeadline) < Date.parse(dateToday) ||
            this.value.length > 5 ||
            this.value.length == 0) {
              this.submitDisabled = true;
        } else {
          this.submitDisabled = false;
        }
      },
    },
    watch: {
      inputTitle() {
        this.titleError = (this.inputTitle==='') ? 'Title is required.' : '';
      },
      inputDescription() {
        this.descriptionError = (this.inputDescription==='') ? 'Description is required.' : '';
      },
      inputDeadline() {
        let dateToday = new Date().toLocaleDateString();
        this.deadlineError = (!Date.parse(this.inputDeadline) || Date.parse(this.inputDeadline) < Date.parse(dateToday)) ? "Deadline can't be empty or in the past." : '';
      },
      value() {
        if (this.value.length > 5) {
          this.valueError = 'Max of 5 workers are allowed.';
        } else if (this.value.length == 0) {
          this.valueError = "Workers can't be empty.";
        } else {
          this.valueError = '';
        }
      }
    },
    mounted() {
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
    template: `
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
  
            <div class="modal-header">
              <slot name="header">
                <h3>New Work Order</h3>
              </slot>
            </div>
  
            <div class="modal-body">
              <slot name="body">
                <form>
                  <small class="text-danger">Please note that all fields marked with an asterisk (*) are required.</small>
                  <div class="form-group">
                    <span class="text-danger">* </span><label for="inputTitle">Title:</label>
                    <input v-model="inputTitle" v-on:input="inputValidation()" type="text" class="form-control" id="inputTitle" placeholder="Enter Title">
                    <small class="text-danger">[[titleError]]</small>
                  </div>
                  <div class="form-group">
                    <span class="text-danger">* </span><label for="inputDescription">Description:</label>
                    <textarea v-model="inputDescription" v-on:input="inputValidation()" class="form-control" id="inputDescription" rows="3"></textarea>
                    <small class="text-danger">[[descriptionError]]</small>
                  </div>
                  <div class="form-group">
                    <span class="text-danger">* </span><label for="inputDeadline">Deadline:</label>
                    <input v-model="inputDeadline" v-on:input="inputValidation()" type="date" class="form-control" id="inputDeadline">
                    <small class="text-danger">[[deadlineError]]</small>
                  </div>
                  <span class="text-danger">* </span><label>Assign Workers:</label>
                  <mutiselect-dropdown
                    v-model="value"
                    @input="inputValidation()"
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
                </form>
              </slot>
            </div>
  
            <div class="modal-footer">
              <slot name="footer">
                <button class="btn btn-outline-danger mx-2" @click="$emit('close')">
                  Cancel
                </button>
                <button class="btn btn-danger ml-2" v-bind:disabled="submitDisabled" @click="saveWorkOrder(); $emit('close')">
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
