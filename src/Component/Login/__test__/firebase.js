export default {
    auth() {
      console.log('auth real implementation');
      return this;
    },
    async signInWithEmailAndPassword(email,pass) {
      console.log('signOut real implementation');
    },
  };