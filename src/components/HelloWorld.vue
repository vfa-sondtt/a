<template>
  <div id="q-app">
    <div class="column q-pa-lg">
      <div class="row">
        <q-card square class="shadow-24" style="width: 400px; height: 540px">
          <!-- TITLE -->
          <q-card-section class="bg-deep-purple-7">
            <h4 class="text-h5 text-white q-my-md">{{ title }}</h4>
          </q-card-section>
          <q-card-section>
            <!-- Btn Switch -->
            <q-fab
              color="primary"
              @click="switchTypeForm"
              icon="add"
              class="absolute"
              style="top: 0; right: 12px; transform: translateY(-50%)"
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
                v-if="register"
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
                v-if="register"
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
          <!-- Forgot pass? -->
          <q-card-section v-if="!register" class="text-center q-pa-sm">
            <p class="text-grey-6">Forgot your password?</p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>

  <!-- <q-input
    ref="inputRef"
    filled
    v-model="model"
    label="Required Field"
    :rules="[(val) => !!val || 'Field is required']"
  /> -->
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
      if (this.register) {
        this.$refs.email.validate();
        this.$refs.username.validate();
        this.$refs.password.validate();
        this.$refs.repassword.validate();
      } else {
        this.$refs.email.validate();
        this.$refs.password.validate();
      }

      if (!this.register)
        if (!this.$refs.email.hasError && !this.$refs.password.hasError) {
          this.$q.notify({
            icon: "done",
            color: "positive",
            message: "Authorization",
          });
        }
    },
    switchTypeForm() {
      this.register = !this.register;
      this.title = this.register ? "Signup Page" : "Login Page";
      this.btnLabel = this.register ? "Registration" : "Login";
      this.password = "";
      this.email = "";
    },
    switchVisibility() {
      this.visibility = !this.visibility;
      this.passwordFieldType = this.visibility ? "text" : "password";
      this.visibilityIcon = this.visibility ? "visibility_off" : "visibility";
    },
  },
};
</script>
