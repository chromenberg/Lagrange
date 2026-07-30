// const useContext = (await import("react")).useContext;
import { useMemo } from "react";
import useToken from "../../scripts/client/requests/Authorization";
import { apiURL, routes } from "../../scripts/client/Routes";
import { populate } from "../../scripts/core/SetPlaceholders";
import { useCurrentRoute } from "../../scripts/stores/current-store/CurrentStore";
import type { InputKeybind } from "../components/InputBox/InputBox.types";
import Message from "../non-mana/message/Message";
import { createMarkupItem } from "../../scripts/core/Markup";
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
  const route = useCurrentRoute();
  // console.log(route.channel)
  // const currentRoute = useCurrentRoute();
  const sendMessage: InputKeybind = useMemo(() => {
    // console.log(route.channel)

    return {
      shift: true,
      control: false,
      keyName: "Enter",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      callback: (ref: any) => {
        fetch(apiURL + populate(routes.messages, route.channel.id ?? ""), {
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
  }, [route, token]);
  // const [state, setState] = useState(1)
  // const {channel} = useCurrentRoute()
  return (
    <main className="chatPanel">
      <div className="flexHoriz fillAll">
        <div className="fillAll flexVert">
          <div className="fillAll">
            <h1> MAKE THIS SCROLLABLE!!!! </h1>
            <Message
              info={{
                channel: "384752398457",
                content: [createMarkupItem("hi this has no markup", ["none"])],
                properties: {
                  timestamp: new Date()
                },
                id: "dfgdfgsdfgsfghdfgh",
                user: {
                  avatar: "image hash",
                  display_name: "display MD!ame",
                  username: "raine",
                  id: "5485230233642356456"
                }
              }}
            />
          </div>
          <form>
            <div className="chatInputContainer">
              <InputBox
                placeholder={"Message "}
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
