import { useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";
import {
  handleAddFile,
  handleCancel,
  handleDragOver,
  handleDrop,
  handleSubmit,
} from "./DropZone.hook";
import { useErrorStore, useFileStore } from "../store/uploaded.store";
import { Loading } from "@nextui-org/react";
import { Alert, IconButton, Snackbar } from "@mui/material";
import { GrClose } from "react-icons/gr";

export default function DropZone({ state }: { state: number }) {
  const image = useFileStore((state) => state.image);
  const isLoading = useFileStore((state) => state.isLoading);
  const isFetching = useFileStore((state) => state.isFetching);
  const isError = useErrorStore((state) => state.isError);
  const inputRef = useRef<HTMLInputElement>(null);

  const [open, setOpen] = useState(false);

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <GrClose fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <div className="bg-white rounded-lg drop-shadow-lg w-96 p-3 min-h-48 m-5 flex flex-col items-center justify-center">
      <div
        className={`${
          isFetching || isLoading ? "opacity-10" : ""
        } relative flex flex-col items-center justify-center`}
      >
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
              className="my-1 py-2 px-6 rounded-md bg-[#6dabe4] hover:bg-[#4292dc] text-white"
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
        {!isLoading && image && (
          <div className="flex flex-col">
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
                  if (!response) {
                    setOpen(true);
                  }
                }}
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
      {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center ">
            <Loading>Loading</Loading>
          </div>
        )}
      {isFetching && (
          <div className="absolute inset-0 flex items-center justify-center ">
            <Loading>Processing</Loading>
          </div>
        )}
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            Your picture is not correct. Please try again.
          </Alert>
        </Snackbar>
    </div>
  );
}
