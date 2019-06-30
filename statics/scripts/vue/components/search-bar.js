Vue.component('search-bar', {
    props: {
  
    },
    data() {
      return {
        searchText: ''
      }
    },
    mounted() {
      this.search = this.searchText;
    },
    methods: {
      emitSearchValue(searchText) {
        this.$emit('emitted-search-text',  searchText);
      }
    },
    template: `
      <div class="input-group">
        <input type="text" v-model:value="searchText" class="form-control" placeholder="Search Worker" aria-label="Search Worker">
        <div class="input-group-append">
          <button class="btn btn-outline-danger" v-on:click="emitSearchValue(searchText)">Search</button>
        </div>
      </div>
    `
  })
