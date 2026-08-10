import type { Props } from "../../../Core";
import("./FileUploadWrapper.css");
export default function FileUploadWrapper({ children, multiple }: {multiple?: boolean} & Props ) {
  return (
    <>
      <input type="file" className="fileWrapper" multiple={multiple}></input>
      <div>{children}</div>
    </>
  );
}
