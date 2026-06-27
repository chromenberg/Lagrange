class PubSub extends EventTarget {
  constructor() {
    super()
  }
  
}

export const pubsub = new PubSub()

pubsub.addEventListener("MESSAGE_CREATE", (data) => {
  console.log(data)
})


pubsub.addEventListener("testagain", () => {
  console.log("sdsdfaggotfsfd")
})