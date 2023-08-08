<template>
  <q-card class="shadow-24 container">
    <!-- TITLE -->
    <q-card-section class="bg-deep-purple-7">
      <h4 class="text-h5 text-white q-my-md">Login Page</h4>
    </q-card-section>
    <q-card-section>
      <!-- Btn Switch -->
      <q-fab
        color="primary"
        @click="navSignup"
        icon="add"
        class="absolute btn-switch"
      >
        <q-tooltip> New User Registration </q-tooltip>
      </q-fab>

      <!-- Form input -->
      <q-form class="q-px-sm q-pt-xl">
        <!-- Email -->
        <q-input
          ref="email"
          square
          clearable
          v-model="email"
          type="email"
          lazy-rules
          :rules="[this.required, this.isEmail, this.short]"
          label="Email"
          @keydown.enter="next"
        >
          <template v-slot:prepend>
            <q-icon name="email" />
          </template>
        </q-input>

        <!-- Pass -->
        <q-input
          ref="password"
          square
          clearable
          v-model="password"
          :type="passwordFieldType"
          lazy-rules
          :rules="[this.required, this.short]"
          @keydown.enter="submit"
          label="Password"
        >
          <template v-slot:prepend>
            <q-icon name="lock" />
          </template>
          <template v-slot:append>
            <q-icon
              :name="visibilityIcon"
              @click="switchVisibility"
              class="cursor-pointer"
            />
          </template>
        </q-input>
      </q-form>
    </q-card-section>

    <!-- Btn Submit -->
    <q-card-actions class="q-px-lg">
      <q-btn
        unelevated
        size="lg"
        color="secondary"
        @click="submit"
        class="full-width text-white"
        label="Submit"
      />
    </q-card-actions>
    <!-- Forgot pass? -->
    <q-card-section
      @click="navForgotPass"
      class="text-center q-pa-sm hoverable-section"
    >
      <p class="text-grey-6">Forgot your password?</p>
    </q-card-section>
  </q-card>
</template>

<script>
import { authStore } from "../stores/authStore";

export default {
  data() {
    return {
      email: "",
      password: "",
      passwordFieldType: "password",
      btnLabel: "Login",
      visibility: false,
      visibilityIcon: "visibility",
    };
  },
  setup() {
    const store = authStore();
    const { execute, data } = store.handleLoginApi();
    return { execute, store, data };
  },
  methods: {
    required(val) {
      return (val && val.length > 0) || "Require";
    },

    // handle Submit Login
    async submit() {
      this.$refs.email.validate();
      this.$refs.password.validate();
      console.log("run");

      try {
        const result = await this.execute({
          email: this.email,
          password: this.password,
        });

        console.log("ten: ", result);

        if (result.error) {
          console.log("error  ", result.error.message);
          this.$q.notify({
            message: result.error.message,
            type: "negative",
            timeout: 1000000,
          });
        } else {
          console.log("result-> ", this.data.login);
          // var x1 = this.store.accessToken
          this.store.setUserInfomation(this.data.login);
          console.log("data user", this.store);
          this.$router.push({ name: "Note" });
        }
      } catch (error) {
        // this.loading = false;
        console.log("system error-> ", error);
      }
    },
    switchVisibility() {
      this.visibility = !this.visibility;
      this.passwordFieldType = this.visibility ? "text" : "password";
      this.visibilityIcon = this.visibility ? "visibility_off" : "visibility";
    },
    navSignup() {
      this.$router.push({ name: "Signup" });
    },
    navForgotPass() {
      this.$router.push({ name: "ForgotPass" });
    },
    next() {
      this.$refs.password.focus();
    },
    // login
    // async handleLoginApi() {
    //   const variables = {
    //     LoginDto: {
    //       loginId: this.email,
    //       password: this.password,
    //     },
    //   };
    //   try {
    //     const result = await this.execute(variables);
    //     if (result.error) {
    //       console.log("error  ", result.error.message);
    //       this.$q.notify({
    //         progress: true,
    //         message: result.error.message,
    //         type: "negative",
    //         timeout: 1000,
    //       });
    //     } else {
    //       console.log("result-> ", this.data);

    //       // this.store.setUserInfomation(this.data.result.data);
    //       this.$router.push({ name: "Note" });

    //       // this.$router.push("/");
    //     }
    //   } catch (error) {
    //     // this.loading = false;
    //     console.log("system error-> ", error);
    //   }
    // },

    short(val) {
      return (val && val.length > 3) || "Value is too short";
    },
    isEmail(val) {
      const emailPattern =
        /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(val) || "Please enter a valid email";
    },
  },
};
</script>

<style scoped>
.container {
  width: 400px;
  height: 540px;
  border-radius: 43px;
}

.btn-switch {
  top: 0;
  right: 12px;
  transform: translateY(-50%);
}

.hoverable-section:hover {
  cursor: pointer;
}
</style>
