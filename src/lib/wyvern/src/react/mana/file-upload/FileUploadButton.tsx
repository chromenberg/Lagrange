import ManaButton from "../button/ManaButton";
import FileUploadWrapper from "./FileUploadWrapper";

export default function FileUploadButton({ multiple }: { multiple?: boolean }) {
  return (
    <ManaButton
      onclick={() =>
        console.log("Temporary Onclick Log [FileUploadButton.tsx]")
      }
      style="Primary"
      className="metroButton"
    >
      <FileUploadWrapper multiple={multiple}>Select a file</FileUploadWrapper>
    </ManaButton>
  );
}
