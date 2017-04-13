class FirebaseService {

  constructor(config, $firebaseObject) {
    this.config = config;
    this.$firebaseObject = $firebaseObject;
  }

  init() {
    if (firebase.apps.length == 0) {
      firebase.initializeApp(this.config.firebase);
    }
    this.firebase = firebase;
    return firebase
  }

  getDatabase(dbName) {
    return this.firebase.database().ref().child(dbName);
  }

  sendToDb(ref, refObj, data) {
    let stat = true;
    if (data) {
      let refArr = Object.keys(refObj);
      for (var prop in data) {
        stat = stat && refArr.includes(prop);
        if (!stat) {
          console.error(`Ключ ${prop} не существует в базе ${refObj.$id}`)
          return;
        }
      }
      ref.update({...data});
    }

  }

}


FirebaseService.$inject = ['config', '$firebaseObject'];

export default FirebaseService;
