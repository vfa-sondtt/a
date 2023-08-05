<template>
  <q-card class="shadow-24 container">
    <!-- TITLE -->
    <q-card-section class="bg-deep-purple-7">
      <h4 class="text-h5 text-white q-my-md">Forgot Password</h4>
    </q-card-section>
    <q-card-section>
      <!-- Btn Switch -->
      <q-fab
        color="primary"
        @click="navLogin"
        icon="arrow_back"
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
          label="Enter email address"
        >
          <template v-slot:prepend>
            <q-icon name="email" />
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
        label="Reset Password"
      />
    </q-card-actions>
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
      if (1) {
        this.$router.push({ name: "NewPass" });
      }
    },
    navLogin() {
      this.$router.push({ name: "Login" });
    },
    switchVisibility() {
      this.visibility = !this.visibility;
      this.passwordFieldType = this.visibility ? "text" : "password";
      this.visibilityIcon = this.visibility ? "visibility_off" : "visibility";
    },
  },
};
</script>

<style scoped>
.container {
  width: 400px;
  height: 340px;
  border-radius: 43px;
}

.btn-switch {
  top: 0;
  right: 12px;
  transform: translateY(-50%);
}
</style>
