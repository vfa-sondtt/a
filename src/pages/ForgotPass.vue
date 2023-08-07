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
          :rules="[this.required, this.isEmail]"
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
import { ref } from "vue";
export default {
  // setup() {
  //   const email = ref("");
  //   const password = ref("");
  //   const passwordFieldType = ref("password");
  //   const btnLabel = ref("Login");
  //   const visibility = ref(false);
  //   const visibilityIcon = ref("visibility");

  //   function required(val) {
  //     return (val && val.length > 0) || "Require";
  //   }
  //   // handle Submit Login
  //   function submit() {
  //     this.$refs.email.validate();
  //     if (1) {
  //       this.$router.push({ name: "NewPass" });
  //     }
  //   }
  //   function navLogin() {
  //     this.$router.push({ name: "Login" });
  //   }

  //   function isEmail(val) {
  //     const emailPattern =
  //       /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
  //     return emailPattern.test(val) || "Please enter a valid email";
  //   }
  //   return {
  //     email,
  //     password,
  //     passwordFieldType,
  //     btnLabel,
  //     visibility,
  //     visibilityIcon,
  //     navLogin,
  //     submit,
  //     required,
  //   };
  // },

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
  height: 340px;
  border-radius: 43px;
}

.btn-switch {
  top: 0;
  right: 12px;
  transform: translateY(-50%);
}
</style>
