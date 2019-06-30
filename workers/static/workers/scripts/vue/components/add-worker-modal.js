Vue.component('add-worker-modal', {
  delimiters: ['[[', ']]'],
  data() {
    return {
      inputName: null,
      inputCompany: null,
      inputEmail: null,
      errors: {},
      submitDisabled: true,
    }
  },
  methods: {
    validEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    disableSubmit() {
      if (!this.inputName || !this.inputCompany || !this.inputEmail ||
          !this.validEmail(this.inputEmail)) {
        this.submitDisabled = true;
      } else {
        this.submitDisabled = false;
      }
    },
    saveWorker() {
      axios.defaults.xsrfCookieName = 'csrftoken';
      axios.defaults.xsrfHeaderName = 'X-CSRFToken';
      axios({
        method: "post",
        url: `${apiRootUrl}workers/`,
        header: {
          'Authorization': UserToken
        },
        data: {
          name: this.inputName,
          company: this.inputCompany,
          email: this.inputEmail
        }
      })
      .then(()=> {
        this.$parent.loadWorkers();
      });
    }
  },
  watch: {
    inputName() {
      if (!this.inputName) {
        this.errors['inputName'] = "Name is required.";
      } else {
        this.errors['inputName'] = "";
      }
    },
    inputCompany() {
      if (!this.inputCompany) {
        this.errors['inputCompany'] = "Company is required.";
      } else {
        this.errors['inputCompany'] = "";
      }
    },
    inputEmail() {
      if (!this.inputEmail) {
        this.errors['inputEmail'] = "Email is required.";
      } else if (!this.validEmail(this.inputEmail)) {
        this.errors['inputEmail'] = ('Valid email is required.');
      } else {
        this.errors['inputEmail'] = "";
      }
    }
  },
  template: `
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              <h3>New Worker</h3>
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              <form>
                <small class="text-danger">Please note that all fields marked with an asterisk (*) are required.</small>
                <div class="form-group">
                  <span class="text-danger">* </span><label for="inputName">Name:</label>
                  <input type="text" v-model="inputName" v-on:input="disableSubmit" class="form-control" id="inputName" placeholder="Worker's name">
                  <small class="text-danger">[[errors.inputName]]</small>
                </div>
                <div class="form-group">
                  <span class="text-danger">* </span><label for="inputCompany">Company:</label>
                  <input type="text" v-model="inputCompany" v-on:input="disableSubmit" class="form-control" id="inputCompany" placeholder="Worker's company">
                  <small class="text-danger">[[errors.inputCompany]]</small>
                </div>
                <div class="form-group">
                  <span class="text-danger">* </span><label for="inputEmail">Email:</label>
                  <input type="email"  v-model="inputEmail" v-on:input="disableSubmit" class="form-control" id="inputEmail" placeholder="Worker's e-mail">
                  <small class="text-danger">[[errors.inputEmail]]</small>
                </div>
              </form>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="btn btn-outline-danger mx-2" @click="$emit('close')">
                Cancel
              </button>
              <button class="btn btn-danger ml-2" v-bind:disabled="submitDisabled" @click="saveWorker(); $emit('close')">
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
