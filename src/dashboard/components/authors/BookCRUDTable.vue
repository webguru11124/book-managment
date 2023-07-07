<template>
    <b-form @submit.prevent="addBook">
        <b-form-group label="Books written" label-for="book-name">
            <b-input-group>
                <b-form-input id="book-name" v-model="newBook.name" placeholder="Name" class="mr-3" required></b-form-input>
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

    <b-table class="table table-striped table-bordered table-sm" :items="books" :per-page="perPage">
        <template #cell(author)="row">
            {{ authors.find((author) => author.id === row.item.owner_id)?.name }}
        </template>
        <tbody>
            <tr v-for="(book, index) in booksShownTable" :key="index">
                <td>
                    <input v-if="book.edit" type="text" v-model="book.name" class="form-control"
                        v-on:keyup.enter="book.edit = !book.edit">
                    <span v-else>{{ book.name }}</span>
                </td>
                <td>
                    <input v-if="book.edit" type="text" v-model="book.pages" class="form-control"
                        v-on:keyup.enter="book.edit = !book.edit">
                    <span v-else>{{ book.pages }}</span>
                </td>
                <td>
                    <b-button @click="book.edit = !book.edit" variant="info">
                        <font-awesome-icon :icon="['fas', 'pencil-alt']" />
                    </b-button>
                    <b-button @click="removeBook(book.id)" variant="danger">
                        <font-awesome-icon :icon="['fas', 'trash-alt']" />
                    </b-button>
                </td>
            </tr>
        </tbody>
    </b-table>
    <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="my-table"></b-pagination>
</template>
<script>
import { mapActions, mapState } from 'vuex';
export default {
    name: 'book-crud-table',
    data() {
        return {
            newBook: { name: "", pages: null, edit: false, owner_id: null },
        };
    },
    methods: {
        ...mapActions('books', {
            createBook: 'addBook',
            updateBook: 'editBook',
            deleteBook: 'deleteBook',
        }),
        addBook() {
            this.createBook({ name: this.editedBook.name, pages: this.editedBook.pages, owner_id: this.editedAuthor.id });
            this.editedBook = { name: "", pages: null, edit: false, owner_id: null };
        },
        removeBook() {
            this.removeBook(this.editedBook.id);
        },
    },
    computed: {
        ...mapState('selection', ['selected']),
        ...mapState('authors', ['authors']),
        books() {
            return authors[selected].books;
        },
        booksShownTable() {
            return this.books.map(book => ({ ...book, edit: false }))
        },
        tableFields() {
            return [
                { key: "name", label: "Name" },
                { key: "pages", label: "Number of Pages" },
                { key: "action", label: "Edit/Del" },
            ];
        },
        perPage() {
            return 10; // Number of books per page in the table
        },
    },
};

</script>

<style scoped>
.hoverable-table tbody tr:hover {
    cursor: pointer;
}

.form-inline input {
    margin-right: 8px;
}

.container {
    margin-top: 2rem;
    padding: 2rem;
}

.container {
    margin-top: 2rem;
    padding: 2rem;
}

.mb-4 {
    margin-bottom: 1rem;
}

.w-50 {
    width: 50%;
}

.table {
    margin-top: 1rem;
}

.form-inline {
    margin-bottom: 1rem;
}

.form-inline input {
    margin-right: 8px;
}

.table th,
.table td {
    vertical-align: middle;
}
</style>
  