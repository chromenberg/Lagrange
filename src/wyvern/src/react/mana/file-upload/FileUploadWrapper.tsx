import type { Props } from "../../../Core";
import("./FileUploadWrapper.css");
export default function FileUploadWrapper({
  children,
  multiple,
  ...rest
}: { multiple?: boolean } & Props) {
  return (
    <>
      <div className="fileUploadContainer">
        <input type="file" className="fileWrapper" multiple={multiple} {...rest}></input>
      </div>
      <div>{children}</div>
    </>
  );
}
