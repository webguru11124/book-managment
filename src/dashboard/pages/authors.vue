<template>
    <div class="container">
        <h1>Authors</h1>
        <author-table></author-table>
        <author-modal></author-modal>
    </div>
</template>
  
<script>
import AuthorTable from "~/components/authors/AuthorTable"
import AuthorModal from "~/components/authors/AuthorModal"


export default {
    components: {
        AuthorModal,
        AuthorTable
    },
};
</script>
  
<style scoped></style>
  