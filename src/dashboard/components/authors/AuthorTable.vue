<template>
    <div>
        <!-- Search input and add author button -->
        <div class="d-flex justify-content-between align-books-center mb-4">
            <input type="text" v-model="searchText" placeholder="Search authors..." class="form-control w-50" />
            <b-button variant="primary" @click="showModal(null)">Add Author</b-button>
        </div>

        <!-- Authors table -->
        <b-table striped hover :items="authors" :fields="tableFields" :per-page="perPage" :current-page="currentPage"
            responsive class="hoverable-table" @row-clicked="showModal" :filter="searchText">
            <template #cell(numOfBooks)="row">
                {{ row.item.books?.length ?? 0 }}
            </template>
        </b-table>
        <div class="mt-3">
            <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" align="center"></b-pagination>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
export default {
    data() {
        return {
            searchText: "",
            perPage: 7,
            currentPage: 1,
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
        rows() {
            return this.authors.length;
        }
    },
};

</script>