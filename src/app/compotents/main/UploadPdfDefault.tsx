import { ChangeEvent } from "react";

interface Props {
  handleFileUpload: (e: ChangeEvent<HTMLInputElement>) => void;
}
const UploadPdfDefault = ({ handleFileUpload }: Props) => {
  return (
    <div className="h-[350px] relative text-center w-[275px]">
      <input
        className="cursor-pointer hidden"
        onChange={(e) => handleFileUpload(e)}
        type="file"
        id="input-file-upload"
        accept=".pdf"
      />
      <label
        className="h-full flex items-center justify-center border rounded transition-all bg-white border-dashed border-stone-300"
        htmlFor="input-file-upload"
      >
        <div className="cursor-pointer flex flex-col items-center space-y-3">
          <img src="loadFile.svg" className="w-8 h-8" />
          <p className="pointer-events-none font-medium text-sm leading-6 pointer opacity-75">
            Click to upload or drag and drop
          </p>
        </div>
      </label>
    </div>
  );
};

export default UploadPdfDefault;
