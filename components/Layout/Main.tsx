import { Button } from "@mui/material";
import DropZone from "../UploadImage/DropZone";
import { useAllFileDataStore, useStatusDataStore } from "../store/main.store";



export default function Main() {
  const step1 = useStatusDataStore((state) => state.step1);
  const step2 = useStatusDataStore((state) => state.step2);
  const step3 = useStatusDataStore((state) => state.step3);
  const step4 = useStatusDataStore((state) => state.step4);

  const step1_img = useAllFileDataStore((state) => state.step1_img);
  const step2_img = useAllFileDataStore((state) => state.step2_img);
  const step3_img = useAllFileDataStore((state) => state.step3_img);


  return (
    <>
      <div className="w-full flex flex-col items-center justify-center">
        <h1
          className={
            step1 == false
              ? "line-through text-gray-500"
              : step1 == true
              ? ""
              : "text-gray-500"
          }
        >
          Step 1: Upload front picture of your ID card.
        </h1>
        {step1 && (
          <div className="relative">
            <DropZone state={1} />
          </div>
        )}
        {step1_img && (
          <img
            src={URL.createObjectURL(step1_img)}
            alt="Dropped Image"
            className="w-36"
          />
        )}
        <h1
          className={
            step2 == false
              ? "line-through text-gray-500"
              : step2 == true
              ? ""
              : "text-gray-500"
          }
        >
          Step 2: Upload back picture of your ID card.
        </h1>
        {step2 && (
          <div className="relative">
            <DropZone state={2} />
          </div>
        )}
        {step2_img && (
          <img
            src={URL.createObjectURL(step2_img)}
            alt="Dropped Image"
            className="w-36"
          />
        )}
        <h1
          className={
            step3 == false
              ? "line-through text-gray-500"
              : step3 == true
              ? ""
              : "text-gray-500"
          }
        >
          Step 3: Upload picture of your face.
        </h1>
        {step3 && (
          <div className="relative">
            <DropZone state={3} />
          </div>
        )}
        {step3_img && (
          <img
            src={URL.createObjectURL(step3_img)}
            alt="Dropped Image"
            className="w-36"
          />
        )}
      </div>

      {step4 && (
        <div>
          <h1>Authorization Successfully</h1>
        </div>
      )}
    </>
  );
}
