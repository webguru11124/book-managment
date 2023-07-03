<template>
    <div>
        <h1>Error</h1>
        <p>{{ error.message }}</p>
    </div>
</template>
  
<script>
export default {
    props: ['error'],
}
</script>
  