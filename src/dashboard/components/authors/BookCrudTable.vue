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

        <b-table-simple class="striped bordered responsive">
            <b-thead>
                <b-tr>
                    <b-th>Name</b-th>
                    <b-th>Number of Pages</b-th>
                    <b-th>Edit/Del</b-th>
                </b-tr>
            </b-thead>
            <b-tbody>
                <b-tr v-for="(book, index) in books" :key="index">
                    <b-td>
                        <input v-if="book.edit" type="text" v-model="book.name" class="form-control"
                            v-on:keyup.enter="book.edit = !book.edit">
                        <span v-else>{{ book.name }}</span>
                    </b-td>
                    <b-td>
                        <input v-if="book.edit" type="text" v-model="book.pages" class="form-control"
                            v-on:keyup.enter="book.edit = !book.edit">
                        <span v-else>{{ book.pages }}</span>
                    </b-td>
                    <b-td>
                        <b-button @click="book.edit = !book.edit" variant="info">
                            <font-awesome-icon :icon="['fas', 'pencil-alt']" />
                        </b-button>
                        <b-button @click="removeBook(book.id)" variant="danger">
                            <font-awesome-icon :icon="['fas', 'trash-alt']" />
                        </b-button>
                    </b-td>
                </b-tr>
            </b-tbody>
        </b-table-simple>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
export default {
    name: "book-crud-table",
    data() {
        return {
            newBook: { name: "", id: null, pages: null, owner_id: null },
        };
    },
    methods: {
        ...mapActions('books', {
            createBook: 'addBook',
            updateBook: 'editBook',
            deleteBook: 'deleteBook',
        }),
        addBook() {
            this.createBook({ name: this.newBook.name, pages: this.newBook.pages, owner_id: this.selected });
            this.newBook = { name: "", pages: null, owner_id: null };
        },
        removeBook(id) {
            this.removeBook(id);
        },
    },
    computed: {
        ...mapState('selection', ['selected']),
        ...mapState('authors', ['authors']),
        books() {
            return (this.authors.find(author => author.id === this.selected)?.books ?? []).map(book => ({
                ...book, edit: true,
            }));
        },
        perPage() {
            return 10; // Number of books per page in the table
        },
    },

};
</script>