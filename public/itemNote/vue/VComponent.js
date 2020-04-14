Vue.component("v-input", {
    template: `<div class="VInput"><input placeholder="test"/></div>
    `
})

Vue.component("v-item", {
    props: {
        list: Array
    },
    data() {
        return {
            selectName: "",
        }
    },
    template: `<div class="VItem">
    <select v-model="selectName" @change="updataVal(selectName)">
     <option v-for="item in list" :value="item.value">{{item.label}}</option>
    </select>
    {{selectName}}
    </div>`,
    methods:{
        updataVal(val){
            this.$emit('v-emit',val)
        }
    }
})


