/**
 * Stores the data required for an input box keybind override
 * 
 * @param callback function to be ran when the keybind is matched
 * @param keyName the key that needs to be pressed in order to be matched
 * @param shift does shift need to be pressed?
 * @param control does control need to be pressed?
 */
export type InputKeybind = {
  callback: (e?: unknown) => void;
  keyName: string
  shift: boolean
  control: boolean
}

export type InputBoxProps = {
  placeholder: string,
  charmLeft?: React.ReactNode
  charmRight?: React.ReactNode
  height?: string
  keybinds?: InputKeybind[]
}