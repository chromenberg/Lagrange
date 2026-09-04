import CloseButton from "../../../mana/button/subtypes/Close";
import Divider from "../../../mana/divider/Divider";
import ScrollMenu from "../../../mana/scroll-menu/ScrollMenu";
import Stack from "../../../mana/stack/Stack";
import Modal from "../Modal";
import ModalView from "../ModalView";
import AvatarItem from "./account/AvatarUpload";
import DisplayNameItem from "./account/DisplayName";
import UserIDItem from "./account/UserID";
import UsernameItem from "./account/Username";
import("../styles/Settings.css");
import("../styles/SettingsControlButton.css");

export default function SettingsModal({
  state,
}: {
  state?: (arg: boolean) => void;
}) {
  return (
    <ModalView>
      <div className="modalContainerInner">
        <Modal classes="settingsModal" style="modal">
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
                <Stack fillAll align="center">
                  <div className="autoRight settingsCategoryTitle">Account</div>
                  <CloseButton
                    callback={() => {
                      state?.(false);
                    }}
                    style="subtle"
                  />
                </Stack>
              </div>
              <div>
                <div className="settingsContent">
                  <ScrollMenu direction="vertical">
                    <div className="panel_settings">
                      <div className="container_settings">
                        <Stack gap="xlarge" direction="vertical">
                          <header>Account Info</header>
                          {/*<Divider padding="xsmall" color="subtle" thickness="vthin" direction="horizontal"/>*/}
                          <div>
                            {/*
                                User info jargon, each item is a settings control group component
                                (Label -> Control [Value, Input])
                              */}
                            <Stack
                              direction="vertical"
                              gap="medium"
                              className="categoryContents_settings"
                            >
                              <UsernameItem />
                              <DisplayNameItem />
                              <UserIDItem />
                              {/* Mark new section */}
                              <Divider gap="medium" />
                              {/* Mark new section */}
                              <AvatarItem />
                            </Stack>
                          </div>
                        </Stack>
                      </div>
                    </div>
                  </ScrollMenu>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </ModalView>
  );
}
