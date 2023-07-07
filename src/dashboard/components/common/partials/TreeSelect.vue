<template>
    <div>
        <treeselect :options="options" v-model:value="value" :multiple="multiple">
            <div slot="value-label" slot-scope="{ node }">{{ node.raw.label }}</div>
        </treeselect>
    </div>
</template>
<script>

import { mapState, mapActions, mapGetters } from "vuex";
import Treeselect from '@riophae/vue-treeselect'
// import the styles
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
    components: { Treeselect },
    name: "tree-select",
    emits: ['update:selectedValue'],
    props: ['selectedValue'],
    data: () => ({
        multiple: false,
    }),
    methods: {
        ...mapActions("authors", ['fetchAuthors']),
    },
    computed: {
        value: {
            get() {
                return this.selectedValue
            },
            set(newValue) {
                this.$emit('update:selectedValue', newValue)
            }
        },
        ...mapState("authors", ["authors"]),
        options() {
            return this.authors.map(author => ({
                id: author.id,
                label: author.name
            }))
        }
    },
    mounted() {
        this.fetchAuthors();
    },
}
</script>