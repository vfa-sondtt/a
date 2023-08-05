<template>
  <q-card class="shadow-24 container">
    <!-- TITLE -->
    <q-card-section class="bg-deep-purple-7">
      <h4 class="text-h5 text-white q-my-md">Signup Page</h4>
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
          label="Email"
        >
          <template v-slot:prepend>
            <q-icon name="email" />
          </template>
        </q-input>

        <!-- Username -->
        <q-input
          ref="username"
          square
          clearable
          v-model="username"
          lazy-rules
          :rules="[this.required, this.short]"
          type="username"
          label="User"
        >
          <template v-slot:prepend>
            <q-icon name="person" />
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

        <!-- repeatPass  -->
        <q-input
          ref="repassword"
          square
          clearable
          v-model="repassword"
          :type="passwordFieldType"
          lazy-rules
          :rules="[this.required, this.short, this.diffPassword]"
          label="Repeat password"
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
  </q-card>
</template>

<script>
export default {
  data() {
    return {
      title: "Login Page",
      email: "",
      username: "",
      password: "",
      repassword: "",
      register: false,
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
    diffPassword(val) {
      const val2 = this.$refs.password.value;
      return (val && val === val2) || "Password doesn't match!";
    },
    short(val) {
      return (val && val.length > 3) || "Value is too short";
    },
    isEmail(val) {
      const emailPattern =
        /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(val) || "Please enter a valid email";
    },
    // handle Submit
    submit() {
      this.$refs.email.validate();
      this.$refs.username.validate();
      this.$refs.password.validate();
      this.$refs.repassword.validate();

      if (!this.register)
        if (!this.$refs.email.hasError && !this.$refs.password.hasError) {
          this.$q.notify({
            icon: "done",
            color: "positive",
            message: "Authorization",
          });
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
  height: 590px;
  border-radius: 43px;
}

.btn-switch {
  top: 0;
  right: 12px;
  transform: translateY(-50%);
}
</style>
