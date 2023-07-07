<template>
    <!-- Add author modal -->
    <b-modal v-model="isModalShown" :title="modalTitle" class="text-center" hide-footer size="lg">

        <b-form @submit.prevent="mutateAuthor">
            <b-form-group label="Author Name" label-for="author-name">
                <b-input-group>
                    <b-form-input id="author-name" v-model="author.name" class="mr-3" required></b-form-input>
                    <b-input-group-append>
                        <b-button variant="primary" type="submit">
                            <font-awesome-icon :icon="['fas', 'save']" />
                            Save
                        </b-button>
                    </b-input-group-append>
                </b-input-group>
            </b-form-group>
        </b-form>
        <books-crud-table></books-crud-table>
    </b-modal>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import BookCrudTable from './BookCRUDTable'
import { MODAL_STATE } from "~/utils/data/constants";
export default {
    comments: {
        BookCrudTable
    },
    data() {
        return {
            author: { name: "", id: null }
        };
    },
    watch: {
        selected(newSelection) {
            this.author = authors[newSelection];
        }
    },
    methods: {
        ...mapActions('authors', { fetchAuthors: 'fetchAuthors', }),
        mutateAuthor() {
            if (this.modalState === MODAL_STATE.SHOWN_UPDATE) {
                // Dispatch Vuex action to edit author
                this.updateAuthor({ name: this.author.name });
            }
            else if (this.modalState === MODAL_STATE.SHOWN_CREATE) {
                // Dispatch Vuex action to add new author
                this.createAuthor(this.author);
                this.author = { id: null, name: "" };
            }
        },
    },
    mounted() {
        // Dispatch Vuex action to fetch authors data
        this.fetchAuthors();
    },
    computed: {
        ...mapState('selection', ['selected', 'modalState']),
        ...mapState('authors', ['authors']),
        isModalShown() {
            return this.modalState !== MODAL_STATE.HIDDEN;
        },
    },
};

</script>