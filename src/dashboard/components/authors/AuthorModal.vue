<template>
    <!-- Add author modal -->
    <b-modal v-model="shown" :title="modalTitle" class="text-center" size="lg" @ok="mutateAuthor">
        <b-form>
            <b-form-group label="Author Name" label-for="author-name">
                <b-input-group>
                    <b-form-input id="author-name" v-model="author.name" class="mr-3" required></b-form-input>
                </b-input-group>
            </b-form-group>
        </b-form>
        <book-crud-table></book-crud-table>
    </b-modal>
</template>
<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import BookCrudTable from '~/components/authors/BookCrudTable'
import { MODAL_STATE } from "~/utils/data/constants";
export default {
    components: {
        BookCrudTable
    },
    data() {
        return {
            shown: false,
            author: { name: "", id: null }
        };
    },
    watch: {
        isShown(newShown) {
            this.shown = newShown
        },
        selected(newSelection) {
            this.author = { ...this.authors.find(author => author.id === newSelection) };
        }
    },
    methods: {
        ...mapActions('authors', ['editAuthor', 'addAuthor', 'fetchAuthors']),
        ...mapActions('selection', ['showModal', 'hideModal']),
        mutateAuthor() {
            if (this.modalState === MODAL_STATE.SHOWN_UPDATE) {
                // Dispatch Vuex action to edit author
                this.editAuthor({ name: this.author.name, id: this.author.id });
            }
            else if (this.modalState === MODAL_STATE.SHOWN_CREATE) {
                // Dispatch Vuex action to add new author
                this.addAuthor({ name: this.author.name });
                this.author = { id: null, name: "" };
            }
        },
    },
    mounted() {
        // Dispatch Vuex action to fetch authors data
        this.fetchAuthors();
        this.$root.$on('bv::modal::hide', (bvEvent, modalId) => {
            this.hideModal();
        });
    },
    computed: {
        ...mapGetters('selection', ['isShown']),
        ...mapState('selection', ['selected', 'modalState']),
        ...mapState('authors', ['authors']),
        modalTitle() {
            return this.modalState === MODAL_STATE.SHOWN_CREATE ? 'Add Author' : (this.modalState === MODAL_STATE.SHOWN_UPDATE ? 'Edit Author' : '');
        },
    },
};

</script>