export default {
  base: firebase.database().ref('chatapp/'),
  lobby: firebase.database().ref('chatapp/lobby/'),
  chatList: firebase.database().ref('chatapp/chatList/'),
  user: firebase.database().ref('chatapp/user/')
}
