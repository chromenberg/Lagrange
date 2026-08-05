import type { WeakObj } from "../../scripts/types/WeakObj";
import ManaButton from "../mana/button/ManaButton";
import ScrollMenu from "../mana/scroll-menu/ScrollMenu";
import Stack from "../mana/stack/Stack";
import Modal from "./Modal";
import ModalView from "./ModalView";
import("./styles/Settings.css");

export default function SettingsModal({
  state,
  data // FIX: Temporary solution
}: {
  state?: (arg: boolean) => void,
  data: WeakObj
}) {
  return (
    <ModalView>
      <Modal classes="settingsModal modalBackground">
        <div data-fill className="settingsContainer">
          <div data-fill className="settingsItems settingsFlexColumn">
            <div className="scrollbarHeader alignCenter">
              <div>Settings</div>
            </div>
            <ScrollMenu direction="vertical">
              <div>placeholder</div>
              <div>placeholder</div>
              <div>placeholder</div>
              <div>placeholder</div>
              <div>placeholder</div>
            </ScrollMenu>
          </div>
          <div className="menuPanel settingsFlexColumn">
            <div className="menuHeader alignCenter">
              <div className="flexleftright">
                <div className="autoRight">Menu Name</div>
                <div
                  onClick={() => {
                    state?.(false);
                  }}
                >
                  <div>X</div>
                </div>
              </div>
            </div>
            <div className="settingsContent" data-fill>
              <Stack gap="medium">
                <header>Account Info</header>
                {/*<Divider padding="xsmall" color="subtle" thickness="vthin" direction="horizontal"/>*/}
                <div style={{ paddingTop: "16px" }}>
                  <Stack>
                    <div className="labeledComponent labelSpread flexleftright">
                      <span>Username</span>
                      <div id="usernameContainer" className="labelValueContainer">
                        <span id="usernameText">{data.username}</span>
                      </div>
                      <div className="buttonContainerSettings">
                        <ManaButton
                          height="medium"
                          onclick={() => {
                            console.log("Requested to change username");
                          }}
                          style="Tertiary"
                        >
                          Edit
                        </ManaButton>
                      </div>
                    </div>
                    <div className="flexleftright">
                      <span>Display Name</span>
                    </div>
                  </Stack>
                </div>
              </Stack>
            </div>
          </div>
        </div>
      </Modal>
    </ModalView>
  );
}
