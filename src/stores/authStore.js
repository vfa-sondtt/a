import { defineStore } from "pinia";
import { useStorage } from "vue3-storage";
import { useMutation, useQuery } from "villus";

// thêm vô page/auth/grapql
import { mutatioLoginUserCms } from "../pages/auth/graphql/MutationLoginUserCms";

const Login = `mutation Login($email: String!, $password: String!){
  login(UserInput:{
    email:$email,
    password:$password
    
  }){
    accessToken
    refreshToken
}
}`;

const SignUp = `mutation createUser($name: String!, $email: String!, $password: String!) {
  createUser(CreateUserInput: {
    name: $name
    email: $email
    password: $password
  }) {
    name
    email
  }
}`;

const CreateNote = `mutation createList($Content: String!, $Piority: Int!, $isComplete:Boolean!) {
  createList(DtoCreate: {
    Content: $Content
    Piority: $Piority
    isComplete: $isComplete
  }) {
    Content
    Title
  }
}`;

const DeleteNote = `mutation deleteList($id: Int!) {
  removeTodoList(id: $id) {
    Content
    Title
    id
  }
}`;

const ToggleNote = `mutation updateList($isComplete: Bolean!, $id: Float!){
  updateTodoList(updateTodoListInput:{
    	isComplete: $isComplete
    	id:$id
  }){
    id
    isComplete
  }
}`;

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
      console.log(state.currentUser);
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

        var condition2 = note.text?.includes(state.filter.search);

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
    SignUp() {
      const { data, execute } = useMutation(SignUp);

      return { data, execute };
    },
    handleLoginApi() {
      // const { data, execute } = useMutation(mutatioLoginUserCms);
      const { data, execute } = useMutation(Login);

      return { data, execute };
    },

    async getNoteDepart() {
      const { data } = await useQuery({
        query: `query FindByIdUser {
          findByIdUser{
            id
            Content
            Title
            Piority
            isComplete
            user {
              id
            }
          }
        }`,
      });
      function check(x) {
        switch (x) {
          case 1:
            return "Low";
            break;
          case 2:
            return "Medium";
            break;
          case 3:
            return "High";
            break;

          default:
            return "Medium";
        }
      }
      var x = data.value.findByIdUser.map((item) => ({
        id: item.id,
        text: item.Content,
        priority: check(item.Piority),
        isCompleted: item.isComplete,
      }));

      console.log("data return", x);
      this.notes = x;
      // return { data, execute };
    },
    addNoteToReload(note) {
      this.notes.push(note);
    },

    addNote() {
      // console.log("notes:", this.notes);

      const { data, execute } = useMutation(CreateNote);
      return { data, execute };
    },

    removeNote(index) {
      // this.notes.splice(index, 1);
      const { data, execute } = useMutation(DeleteNote);
      return { data, execute };
    },

    toggleNote(index) {
      this.notes[index].isCompleted = !this.notes[index].isCompleted;
    },

    handleFilter(value) {
      this.filter = value;
    },
    create() {
      const { data, execute } = useMutation(newusser);

      return { data, execute };
    },
    // fetchNotesApi() {
    //   const { data, execute } = useMutation(GetNote);

    //   return { data, execute };
    // },

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
    setUserInfomation(result) {
      const storage = useStorage();
      console.log("result", result);
      storage.setStorageSync("currentUser", {
        // userName: result.userId,
        userName: "dinh son",
        accessToken: result.accessToken,
        error: "",
      });
      this.currentUser = {
        // userName: result.userId,
        userName: "dinh son",
        accessToken: result.accessToken,
        error: "",
      };
    },
  },
});
