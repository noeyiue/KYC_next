import { useRef } from "react";
import { FiUpload } from "react-icons/fi";
import {
  handleAddFile,
  handleCancel,
  handleDragOver,
  handleDrop,
  handleSubmit,
} from "./DropZone.hook";
import { useErrorStore, useFileStore } from "../store/uploaded.store";

export default function DropZone({ state }: { state: number }) {
  const image = useFileStore((state) => state.image);
  const isLoading = useFileStore((state) => state.isLoading);
  const isFetching = useFileStore((state) => state.isFetching);
  const isError = useErrorStore((state) => state.isError);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="bg-white rounded-lg drop-shadow-lg w-2/5 p-3 min-h-48 m-5 flex flex-col items-center justify-center">
      {!image && (
        <div
          className="flex flex-col items-center justify-center"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <FiUpload size={56} />
          <h1>Drag and Drop Image here</h1>
          <h1>OR</h1>
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleAddFile}
            ref={inputRef}
          />
          <button
            className="bg-rose-400 rounded-lg"
            onClick={() => {
              if (inputRef.current) {
                inputRef.current.click();
              }
            }}
          >
            Select File
          </button>
          {isError && <h1>Please select only 1 image</h1>}
        </div>
      )}
      {isLoading && <h1>Loading...</h1>}
      {!isLoading && image && (
        <div className={`flex flex-col ${isFetching ? "opacity-50" : ""}`}>
          {isFetching && (
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Replace this with your loading indicator or desired UI element */}
              <div className="loader">Loading...</div>
            </div>
          )}
          <div className="flex flex-col items-center justify-center">
            <img
              src={URL.createObjectURL(image)}
              alt="Dropped Image"
              className="w-56"
            />
            <p>Filename: {image.name}</p>
          </div>
          <div>
            <button
              className="my-1 py-2 px-8 mx-3 rounded-md bg-[#f44336] hover:bg-[#d13126] text-white"
              onClick={() => handleCancel()}
            >
              Cancel
            </button>
            <button
              className="my-1 py-2 px-8 mx-3 rounded-md bg-[#3ecf43] hover:bg-[#4CAF50] text-white"
              onClick={async () => {
                const response = await handleSubmit(state, image);
              }}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
