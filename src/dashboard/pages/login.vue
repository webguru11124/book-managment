<template>
    <b-container class="login-container">
        <h1>Login</h1>
        <b-form @submit.prevent="handleSubmit">
            <b-form-group label="Username" label-for="username">
                <b-form-input id="username" v-model="form.usr" required></b-form-input>
            </b-form-group>
            <b-form-group label="Password" label-for="password">
                <b-form-input id="password" v-model="form.pwd" type="password" required></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>
    </b-container>
</template>
  
<script>
import { mapActions } from "vuex";
import { Api } from "~/api";
import { api, loginUrl } from "~/api/cloud.axios";
import { LOCALSTORAGE_KEYS } from "~/utils/data/constants";
import { getStoreItem } from "~/services/localstorage.service";

export default {
    data: function () {
        return {
            isLoading: false,
            form: {
                usr: null,
                pwd: null,
            },
        };
    },
    methods: {
        ...mapActions("auth", ["setAuth", "getUserInfo"]),
        handleSubmit() {
            this.isLoading = true;

            Api.post(`${api}${loginUrl}`, { username: this.form.usr, password: this.form.pwd })
                .then(({ data }) => {
                    console.log(data);
                    this.setAuth({ ...data.message, username: this.form.usr });
                    // this.getUserInfo();

                    this.$notify({
                        group: "userNotification",
                        type: "success",
                        text: `You have been logged in correctly!`,
                    });

                    setTimeout(() => {
                        const lastCachedRoute = getStoreItem(
                            LOCALSTORAGE_KEYS.LAST_ROUTE_BEFORE_LOGIN
                        );
                        if (lastCachedRoute) {
                            this.$router.push(lastCachedRoute);
                        } else {
                            this.$router.push("/");
                        }
                    }, 500);
                })
                .catch(() => {
                    this.$notify({
                        group: "userNotification",
                        type: "danger",
                        text: `Your credentials are incorrect`,
                    });
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
    },
};
</script>
  
<style scoped>
.login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.b-form-group {
    margin-bottom: 20px;
}

label {
    display: block;
    margin-bottom: 5px;
}
</style>
  