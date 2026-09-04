import { useState } from "react";

export default function useToken() {
  const [data] = useState(localStorage.getItem("ApplicationSessionToken") as string)

  return data
}