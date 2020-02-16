import test from "./test.js"

new Vue({
  data() {
    return {
      ms: "123"
    };
  },
  methods: {
  	async fTrigger(){
  		this.ms = test.getAge()
  	}
  },
  mounted() {
    this.fTrigger()
  }
}).$mount("#app");

