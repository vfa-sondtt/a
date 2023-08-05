<template>
  <q-card class="shadow-24 container">
    <!-- TITLE -->
    <q-card-section class="bg-deep-purple-7">
      <h4 class="text-h5 text-white q-my-md">New Password</h4>
    </q-card-section>
    <q-card-section>
      <!-- Btn Switch -->
      <q-fab
        direction="left"
        color="primary"
        @click="switchTypeForm"
        icon="keyboard_arrow_left"
        class="absolute btn-switch"
      >
        <q-fab-action
          color="amber"
          text-color="black"
          @click="navLogin"
          icon="login"
        />
        <q-fab-action
          color="amber"
          text-color="black"
          @click="navForgotPass"
          icon="arrow_back"
        />
      </q-fab>

      <!-- Form input -->
      <q-form class="q-px-sm q-pt-xl">
        <!-- Email -->
        <q-input
          ref="password"
          square
          clearable
          v-model="password"
          :type="text"
          lazy-rules
          :rules="[this.required, this.short]"
          label="Password"
        >
        </q-input>

        <!-- repeatPass  -->
        <q-input
          ref="repassword"
          square
          clearable
          v-model="repassword"
          :type="text"
          lazy-rules
          :rules="[this.required, this.diffPassword]"
          label="Confirm password"
        >
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
        label="Change"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  data() {
    return {
      password: "",
      repassword: "",
    };
  },
  methods: {
    required(val) {
      return (val && val.length > 0) || "Require";
    },
    // handle Submit Login
    submit() {
      this.$refs.password.validate();
      this.$refs.repassword.validate();
    },
    switchTypeForm() {},
    short(val) {
      return (val && val.length > 3) || "Value is too short";
    },
    diffPassword(val) {
      const val2 = this.$refs.password.value;
      return (val && val === val2) || "Password doesn't match!";
    },
    navLogin() {
      this.$router.push({ name: "Login" });
    },
    navForgotPass() {
      this.$router.push({ name: "ForgotPass" });
    },
  },
};
</script>

<style scoped>
.container {
  width: 400px;
  height: 400px;
  border-radius: 43px;
}

.btn-switch {
  top: 0;
  right: 12px;
  transform: translateY(-50%);
}
</style>
