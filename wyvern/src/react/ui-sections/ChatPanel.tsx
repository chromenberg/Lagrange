// const useContext = (await import("react")).useContext;
import useToken from "../../scripts/client/requests/Authorization";
import { useCurrentRoute } from "../../scripts/stores/current-store/CurrentStore";
import type { InputKeybind } from "../components/InputBox/InputBox.types";
const InputBox = (await import("../components/InputBox/InputBox")).default;
const InputBoxAccessories = (
  await import("../components/InputBox/InputBoxAccessories")
).default;
// const UserContext = (await import("../../scripts/client/UserContext")).default;
import("../styles/ChatPanel.css");

const rightCharms = (
  <InputBoxAccessories>
    <div>#</div>
    <div>#</div>
    <div>#</div>
    <div>#</div>
  </InputBoxAccessories>
);
const leftCharms = (
  <InputBoxAccessories>
    <div>+</div>
  </InputBoxAccessories>
);
export default function ChatPanel() {
  // const wyvernState = useContext(UserContext)
  const token = useToken();
  const currentRoute = useCurrentRoute();
  const sendMessage: InputKeybind = {
    shift: true,
    control: false,
    keyName: "Enter",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callback: (ref: any) => {
      fetch("/api/v1/channels/" + currentRoute.channel_id + "/messages/", {
        method: "POST",
        headers: {
          Authorization: token,
        },
        body: JSON.stringify({
          content: ref.current.innerText,
        }),
      });
    },
  };
  // const [state, setState] = useState(1)
  return (
    <main className="chatPanel">
      <div className="flexHoriz fillAll">
        <div className="fillAll flexVert">
          <div className="fillAll"></div>
          <form>
            <div className="chatInputContainer">
              <InputBox
                placeholder="Message #{name}"
                charmLeft={leftCharms}
                charmRight={rightCharms}
                keybinds={[sendMessage]}
              ></InputBox>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
