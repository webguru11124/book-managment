<template>
    <div>
        <b-form @submit.prevent="addBook">
            <b-form-group label="Books written" label-for="book-name">
                <b-input-group>
                    <b-form-input id="book-name" v-model="newBook.name" placeholder="Name" class="mr-3"
                        required></b-form-input>
                    <b-form-input id="book-pages" v-model="newBook.pages" type="number" class="mr-3"
                        placeholder="Number of pages"></b-form-input>
                    <b-input-group-append>
                        <b-button type="submit" variant="dark">
                            <font-awesome-icon :icon="['fas', 'plus']" />
                        </b-button>
                    </b-input-group-append>
                </b-input-group>
            </b-form-group>
        </b-form>

        <b-table striped hover :items="books" :fields="tableFields" :per-page="perPage" :current-page="currentPage">
            <template #cell(actions)="row">
                <div v-if="!row.item.editMode">
                    <b-button @click="toggleEditMode(row.item)" variant="info" size="sm">Edit</b-button>
                    <b-button @click="removeBook(row.item)" variant="danger" size="sm">Remove</b-button>
                </div>

                <div v-else>
                    <b-button @click="saveChanges(row.item)" variant="success" size="sm">Save</b-button>
                    <b-button @click="cancelEdit(row.item)" variant="secondary" size="sm">Cancel</b-button>
                </div>
            </template>
            <template #cell(name)="row">
                <template v-if="!row.item.editMode">
                    {{ row.item.name }}
                </template>
                <template v-else>
                    <b-form-input v-model="row.item.editName" />
                </template>
            </template>

            <template #cell(pages)="row">
                <template v-if="!row.item.editMode">
                    {{ row.item.pages }}
                </template>
                <template v-else>
                    <b-form-input v-model="row.item.editPages" type="number" />
                </template>
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
    name: "book-crud-table",
    data() {
        return {
            perPage: 4,
            currentPage: 1,
            newBook: { name: "", id: null, pages: null },
            tableFields: [
                { key: 'name', label: 'Name' },
                { key: 'pages', label: 'Number of Pages' },
                { key: 'actions', label: 'Actions' }
            ]
        };
    },
    methods: {
        ...mapActions('books', {
            fetchBooks: 'fetchBooks',
            createBook: 'addBook',
            updateBook: 'editBook',
            deleteBook: 'deleteBook',
        }),
        toggleEditMode(book) {
            book.editMode = !book.editMode;
        },
        saveChanges(book) {
            const newBook = {
                id: book.id,
                name: book.editName,
                pages: book.editPages,
                owner_id: book.owner_id,
            };
            this.updateBook(newBook);
            book.name = newBook.name;
            book.pages = newBook.pages;
            book.editMode = false;
        },
        cancelEdit(book) {
            book.editMode = false;
            book.editName = book.name;
            book.editPages = book.pages;
        },
        addBook() {
            const newBook = { name: this.newBook.name, pages: this.newBook.pages, owner_id: this.selected }
            this.createBook(newBook);

            this.books.unshift(newBook);
            this.newBook = { name: "", pages: null, owner_id: null };
        },
        removeBook(book) {
            this.deleteBook(book.id);
        },
    },
    computed: {
        ...mapState('selection', ['selected']),
        ...mapState('books', { originalBooks: 'books' }),
        books() {
            return this.originalBooks.filter(book => book.owner_id === this.selected).map(book => ({
                ...book, editMode: false, editName: book.name, editPages: book.pages
            }));
        },
        rows() {
            return this.books.length;
        }
    },
    mounted() {
        this.fetchBooks();
    }

};
</script>