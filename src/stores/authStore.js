import { defineStore } from "pinia";
import { useStorage } from "vue3-storage";
// import { useMutation } from 'villus';
// import { mutatioLoginUserCms } from "../pages/auth/graphql/MutationLoginUserCms";
export const authStore = defineStore("authStore", {
  state: () => ({
    currentUser: { userName: "", accessToken: "", error: "" },
    notes: [],
    filter: {
      search: "",
      status: "All",
      priority: [],
    },
  }),

  getters: {
    getCurrentUser(state) {
      if (state.currentUser.userName == "") {
        const storageLocal = useStorage();
        const storageCurentUser = storageLocal.getStorageSync("currentUser");
        if (storageCurentUser != null && storageCurentUser.userName != "")
          state.currentUser = storageCurentUser;
      }
      return state.currentUser;
    },
    getAccessToken(state) {
      return state.currentUser.accessToken;
    },
    getNotes(state) {
      // apply filter
      const noteNeed = state.notes.filter((note) => {
        var condition1 =
          state.filter.status == "All" ||
          note.isCompleted == state.filter.status;

        var condition2 = note.text.includes(state.filter.search);

        var condition3 =
          !state.filter.priority[0] ||
          state.filter.priority.includes(note.priority);

        return condition1 && condition2 && condition3;
      });

      return noteNeed;
    },
    getNoteById(id) {
      return this.notes.find((note) => note.id === id);
    },
    getNotesByPriority(priority) {
      return this.notes.filter((note) => note.priority === priority);
    },
  },

  actions: {
    loginFake(email, pass) {
      console.log(email, pass);
      // call api in real case and return result

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (email.includes("trung")) {
            const storage = useStorage();
            storage.setStorageSync("currentUser", {
              userName: email,
              accessToken: "jfghfkjghkfghhjkfgbhjftrung1234",
              error: "",
            });
            this.currentUser = {
              userName: email,
              accessToken: "jfghfkjghkfghhjkfgbhjftrung1234",
              error: "",
            };

            resolve({
              userName: email,
              accessToken: "jfghfkjghkfghhjkfgbhjftrung1234",
              error: "",
            });
          } else {
            console.log("not ok ");
            reject({ userName: "", accessToken: "", error: "have errors" });
          }
          return;
        }, 2000);
      });
    },
    logout() {
      const storage = useStorage();

      storage.setStorageSync("currentUser", {
        userName: "",
        accessToken: "",
        error: "logout",
      });
      this.currentUser = { userName: "", accessToken: "", error: "logout" };
    },
    handleLoginApi() {
      // const loginMutation = require('../pages/auth/graphql/MutationLoginUserCms.graphql');
      //   const { data, execute } = useMutation(mutatioLoginUserCms);
      //   return { data, execute };
    },
    addNote(note) {
      console.log("notes:", this.notes);
      this.notes.push(note);
    },
    removeNote(index) {
      this.notes.splice(index, 1);
    },
    toggleNote(index) {
      this.notes[index].isCompleted = !this.notes[index].isCompleted;
    },

    handleFilter(value) {
      // console.log(this.filter);
      this.filter = value;
    },

    // for example only

    // setUserInfomation(userInfo: {
    //   accessToken: string;
    //   user: { userEmail: string; userName: string };
    // }) {
    //   const storage = useStorage();
    //   storage.setStorageSync('currentUser', {
    //     userName: userInfo.user.userEmail,
    //     accessToken: userInfo.accessToken,
    //     error: '',
    //   });
    //   this.currentUser = {
    //     userName: userInfo.user.userEmail,
    //     accessToken: userInfo.accessToken,
    //     error: '',
    //   };
    // },
    // for real backend
    // setUserInfomation(userInfo: {
    //   auth: { accessToken, refreshToken },
    //   user: { id, userName },
    // }) {
    //   const storage = useStorage();
    //   storage.setStorageSync("currentUser", {
    //     userName: userInfo.user.userName,
    //     accessToken: userInfo.auth.accessToken,
    //     error: "",
    //   });
    //   this.currentUser = {
    //     userName: userInfo.user.userName,
    //     accessToken: userInfo.auth.accessToken,
    //     error: "",
    //   };
    // },
  },
});
