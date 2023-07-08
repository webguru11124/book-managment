<template>
    <!-- Add/edit book modal -->
    <b-modal id="BookModal" :title="modalTitle" class="text-center" @ok="saveBook">
        <b-form ref="bookForm" @submit.prevent="saveBook">
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

import { mapActions, mapGetters, mapState } from 'vuex';
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
        isShown(newShown,) {
            if (newShown) {
                this.$bvModal.show('BookModal');
            }
            else this.$bvModal.hide('BookModal');
        },
        selected(newSelection) {
            this.editedBook = { ...this.books.find(book => book.id === newSelection) };
        },
        authors: {
            immediate: true,
            handler(newAuthors) {
                if (newAuthors.length > 0 && this.editedBook.owner_id === null) {
                    this.setInitialOwnerId();
                }
            }
        }
    },
    methods: {

        ...mapActions('authors', ['fetchAuthors']),
        ...mapActions('books', {
            createBook: 'addBook',
            updateBook: 'editBook',
            deleteBook: 'deleteBook',
        }),
        ...mapActions('selection', ['hideModal']),
        saveBook() {
            if (this.editedBook.owner_id == null) return;
            this.$bvModal.hide('BookModal');
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
        setInitialOwnerId() {
            if (this.authors.length > 0 && this.editedBook.owner_id === null) {
                this.editedBook.owner_id = this.authors[0].id;
            }
        },
    },
    computed: {
        ...mapGetters('selection', ['isShown']),
        ...mapState('authors', ['authors']),
        ...mapState('selection', ['selected', 'modalState']),
        ...mapState('books', ['books']),
        modalTitle() {
            return this.modalState === MODAL_STATE.SHOWN_CREATE ? 'Add Book' : (this.modalState === MODAL_STATE.SHOWN_UPDATE ? 'Edit Book' : '');
        },
    },
    mounted() {
        this.$root.$on('bv::modal::hide', (bvEvent, modalId) => {
            this.hideModal();
        });
        this.fetchAuthors();
        this.setInitialOwnerId();
    },
};
</script>