<template>
    <!-- Add/edit book modal -->
    <b-modal v-model="isModalShown" :title="modalTitle" class="text-center" @ok="saveBook">
        <b-form @submit.prevent>
            <b-form-group label="Name" label-for="book-name">
                <b-form-input id="book-name" v-model="editedBook.name" required></b-form-input>
            </b-form-group>
            <b-form-group label="Number of Pages" label-for="book-pages">
                <b-form-input id="book-pages" v-model="editedBook.pages" type="number" required></b-form-input>
            </b-form-group>
            <b-form-group label="Author" label-for="book-author">
                <tree-select v-bind:selected-value.sync="editedBook.owner_id"></tree-select>
            </b-form-group>
        </b-form>
    </b-modal>
</template>
<script>

import { mapActions, mapState } from 'vuex';
import TreeSelect from "~/components/common/partials/TreeSelect";
import { MODAL_STATE } from "~/utils/data/constants";

export default {
    name: "book-modal",
    components: {
        TreeSelect
    },
    data() {
        return {
            editedBook: { id: null, name: '', pages: null, owner_id: null },
        };
    },
    watch: {
        selection(newSelection) {
            this.editedBook = this.books[newSelection];
        }
    },
    methods: {
        ...mapActions('authors', ['fetchAuthors']),
        ...mapActions('books', {
            createBook: 'addBook',
            updateBook: 'editBook',
            deleteBook: 'deleteBook',
            hideModal: 'hideModal'
        }),
        saveBook() {
            if (this.modalState === MODAL_STATE.SHOWN_UPDATE) {
                this.updateBook(this.editedBook);
            } else if (this.modalState === MODAL_STATE.SHOWN_CREATE) {
                this.createBook(this.editedBook);
            }
            this.hideModal();
        },
        deleteBook(book) {
            this.deleteBook(book.id);
        },
    },
    computed: {
        ...mapState('authors', ['authors']),
        ...mapState('selection', ['selection', 'modalState']),
        ...mapState('books', ['books']),
        isModalShown() {
            return this.modalState !== MODAL_STATE.HIDDEN;
        },
        modalTitle() {
            return this.modalState === MODAL_STATE.SHOWN_CREATE ? 'Add Book' : (this.bookModalVisible === MODAL_STATE.SHOWN_UPDATE ? 'Edit Book' : '');
        },
    },
    mounted() {
        this.fetchAuthors();
    },
};
</script>