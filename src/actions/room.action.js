export const CHOOSE_ROOM = "CHOOSE_ROOM"
export function chooseRoom(roomId){
  return {
    type: CHOOSE_ROOM,
    payload: roomId
  }
}
