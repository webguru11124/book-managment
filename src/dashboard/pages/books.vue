<template>
    <div class="container">
        <h1>Books </h1>
        <book-table></book-table>
        <book-modal></book-modal>
    </div>
</template>
  
<script>
import BookTable from "~/components/books/BookTable"
import BookModal from "~/components/books/BookModal"


export default {
    components: {
        BookModal,
        BookTable
    },
};
</script>
  
<style scoped></style>
  