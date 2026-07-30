import ScrollMenu from "../mana/scroll-menu/ScrollMenu";
import Modal from "./Modal";
import ModalView from "./ModalView";
import("./styles/Settings.css");

export default function SettingsModal({ state }: { state?: (arg: boolean) => void}) {
  return (
    <ModalView>
      <Modal classes="settingsModal modalBackground">
        <div data-fill className="settingsContainer">
          <div data-fill className="settingsItems settingsFlexColumn">
            <div className="scrollbarHeader alignCenter">
              <div>Profile card</div>
            </div>
            <ScrollMenu direction="vertical">
              <div>item 1</div>
              <div>item 2</div>
              <div>item 3</div>
              <div>item 4</div>
              <div>item 5</div>
            </ScrollMenu>
          </div>
          <div className="menuPanel settingsFlexColumn">
            <div className="menuHeader alignCenter">
              <div className="flexleftright">
                <div className="autoRight">Menu Name</div>
                <div onClick={()=>{state?.(false)}}>
                  <div>X</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </ModalView>
  );
}
