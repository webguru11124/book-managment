<template>
    <div>
        <b-navbar type="dark" variant="dark">
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-navbar-brand href="/">My App</b-navbar-brand>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item href="/authors">Authors</b-nav-item>
                    <b-nav-item href="/books">Books</b-nav-item>
                </b-navbar-nav>

                <b-navbar-nav class="ml-auto">
                    <b-nav-item v-if="!auth" href="/login">Login</b-nav-item>
                    <b-nav-item v-else @click="logout">Logout</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>

        <nuxt />
        <notification-popup class="minipopup-area"></notification-popup>
    </div>
</template>
  
<script>
import { mapActions, mapGetters } from "vuex";
import NotificationPopup from "~/components/common/partials/NotificationPopup";
export default {
    components: {
        NotificationPopup,
    },
    computed: {
        ...mapGetters("auth", ["auth"]),
    },
    methods: {
        ...mapActions("auth", ["setAuth", "removeAuth"]),
        logout() {
            this.removeAuth();
            this.$router.push('/login');
        },
    },
};
</script>
  