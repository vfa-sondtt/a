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
  methods: {
    required(val) {
      return (val && val.length > 0) || "Require";
    },
    // handle Submit Login
    submit() {
      this.$refs.email.validate();
      this.$refs.password.validate();

      localStorage.setItem("accessToken", this.email + this.password);
      this.$router.push({ name: "Note" });

      //   if (!this.$refs.email.hasError && !this.$refs.password.hasError) {
      //     this.$q.notify({
      //       icon: "done",
      //       color: "positive",
      //       message: "Authorization",
      //     });
      //   }
    },
    switchTypeForm() {},
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
