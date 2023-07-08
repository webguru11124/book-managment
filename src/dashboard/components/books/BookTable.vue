<template>
    <div>
        <!-- Search input and add book button -->
        <div class="d-flex justify-content-between align-items-center mb-4">
            <input type="text" v-model="searchText" placeholder="Search books..." class="form-control w-50" />
            <b-button variant="primary" @click="showModal(null)">Add Book</b-button>
        </div>

        <!-- Books table -->
        <b-table striped hover :items="books" :fields="tableFields" :per-page="perPage" :current-page="currentPage"
            responsive class="mb-4" @row-clicked="showModal" :filter="searchText">
            <template #cell(author)="row">
                {{ authors.find((author) => author.id === row.item.owner_id)?.name ?? "" }}
            </template>
        </b-table>
        <div class="mt-3">
            <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" align="center"></b-pagination>
        </div>
    </div>
</template>
<script>

import { mapActions, mapState } from 'vuex';
import TreeSelect from "~/components/common/partials/TreeSelect";

export default {
    name: "book-table",
    components: {
        TreeSelect
    },
    data() {
        return {
            searchText: '',
            perPage: 7,
            currentPage: 1,
        };
    },
    methods: {
        ...mapActions('authors', ['fetchAuthors']),
        ...mapActions('books', { fetchBooks: 'fetchBooks' }),
        ...mapActions('selection', {
            showModal: 'showModal'
        })
    },
    computed: {
        ...mapState('authors', ['authors']),
        ...mapState('books', ['books']),
        tableFields() {
            return [
                { key: 'name', label: 'Name' },
                { key: 'author', label: 'Author' },
                { key: 'pages', label: 'Number of Pages' },
            ];
        },
        authorOptions() {
            return this.authors.map((author) => ({
                value: author.id,
                text: author.name,
            }));
        },
        rows() {
            return this.books.length;
        },
    },
    mounted() {
        this.fetchBooks();
        this.fetchAuthors();
    },
};

</script>