<template>
    <!-- Search input and add author button -->
    <div class="d-flex justify-content-between align-books-center mb-4">
        <input type="text" v-model="searchText" placeholder="Search authors..." class="form-control w-50" />
        <b-button variant="primary" @click="showModal(null)">Add Author</b-button>
    </div>

    <!-- Authors table -->
    <b-table striped hover :items="authors" :fields="tableFields" :per-page="perPage" responsive class="hoverable-table"
        @row-clicked="showModal" :filter="searchText">
        <template #cell(numOfBooks)="row">
            {{ row.item.books.length }}
        </template>
    </b-table>
</template>
<script>
import { mapActions, mapState } from 'vuex';
export default {
    data() {
        return {
            searchText: "",
        };
    },
    methods: {
        ...mapActions('authors', { fetchAuthors: 'fetchAuthors' }),
        ...mapActions('selection', ['showModal']),
    },
    mounted() {
        // Dispatch Vuex action to fetch authors data
        this.fetchAuthors();
    },
    computed: {
        ...mapState('authors', ['authors']),

        tableFields() {
            return [
                { key: "name", label: "Name" },
                { key: "numOfBooks", label: "Number of Books" },
            ];
        },
        perPage() {
            return 10; // Number of books per page in the table
        },
    },
};

</script>