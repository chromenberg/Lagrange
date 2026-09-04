import { useEffect, useRef, type RefObject } from "react";
import ButtonGroup from "../../../mana/button-group/ButtonGroup";
import ManaButton from "../../../mana/button/ManaButton";
import CloseButton from "../../../mana/button/subtypes/Close";
import Divider from "../../../mana/divider/Divider";
import FileUploadWrapper from "../../../mana/file-upload/FileUploadWrapper";
import Modal from "../Modal";
import ModalView from "../ModalView";
import { apiURL, routes } from "../../../../scripts/client/Routes";
import type { WeakObj } from "../../../../scripts/types/WeakObj";
import useToken from "../../../../scripts/client/requests/Authorization";
import("./AvatarUpload.css");
import("../../../styles/Header.css");

function getAvatarData(
  ref: RefObject<HTMLInputElement | null>,
): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as ArrayBuffer);
    reader.onerror = () => reject(reader.error);
    const file = ref.current?.files?.[0];
    if (!file) {
      reject(new Error("No file selected"));
      return;
    }
    reader.readAsArrayBuffer(file);
  });
}

async function uploadAvatar(
  ref: RefObject<HTMLInputElement | null>,
  token: string,
) {
  try {
    const buffer = await getAvatarData(ref);
    console.log("Uploading...", buffer.byteLength, "bytes");

    
    fetch(apiURL + "/users" + routes.upload_avatar, {
      method: "POST",
      body: buffer,
      headers: {
        Authorization: token,
        "Content-type": "image/png",
      },
    });
  } catch (err) {
    console.error("Failed to read file:", err);
  }
}

export default function AvatarUploadModal({
  state,
}: {
  state?: (arg: boolean) => void;
  data?: WeakObj;
}) {
  const token = useToken();
  const wrapperRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    console.log(wrapperRef);
  }, []);

  return (
    <ModalView>
      <div className="modalContainerInner">
        <Modal style="modal" classes="modalType1">
          <div className="panel_avatarUpload">
            <header className="header_avatarUpload">
              <div className="headerLayout">
                <div className="headerMain">
                  <h1 className="semibold heading-lg">Select an Image</h1>
                </div>
                <div className="headerLast_avatarUpload">
                  <CloseButton callback={() => state?.(false)} />
                </div>
              </div>
            </header>
            <Divider color="lighten" gap="small" padding="large" />
            <div className="container_avatarUpload">
              <div className="container_avatarUpload_upload">
                <div className="uploadContainer">
                  <div className="uploadItemContainer">
                    <FileUploadWrapper ref={wrapperRef}>
                      <div className="imageUploadOption"></div>
                    </FileUploadWrapper>
                  </div>
                  <div className="imageUploadOption"></div>
                </div>
              </div>

              <div className="imageUploadButtonGroup">
                <ButtonGroup>
                  <ManaButton
                    onclick={() => state?.(false)}
                    style="Tertiary"
                    mana-type="text-button"
                  >
                    Cancel
                  </ManaButton>
                  <ManaButton
                    onclick={() => {
                      uploadAvatar(wrapperRef, token);
                    }}
                    style="Primary"
                    mana-type="text-button"
                  >
                    Upload
                  </ManaButton>
                </ButtonGroup>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </ModalView>
  );
}
