class PubSub extends EventTarget {
  constructor() {
    super()
  }
  
}

export const pubsub = new PubSub()

pubsub.addEventListener("test", () => {
  console.log("sdsdfsfd")
})


pubsub.addEventListener("testagain", () => {
  console.log("sdsdfaggotfsfd")
})