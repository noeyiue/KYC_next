import VertifyDataForm from "../Form/VertifyDataForm";
import DropZone from "../UploadImage/DropZone";
import { useStatusDataStore } from "../store/main.store";

export default function Main() {

  const step1 = useStatusDataStore((state) => state.step1);
  const step2 = useStatusDataStore((state) => state.step2);
  const step3 = useStatusDataStore((state) => state.step3);
  const step4 = useStatusDataStore((state) => state.step4);




  return (
    <>
      {!step4 && 
        <div className="w-full flex flex-col items-center justify-center">
          <h1 className={step1 == false ? "line-through text-gray-500" : ( step1 == true ? "" : "text-gray-500")}>Step 1 : Upload front picture of your id card.</h1>
          {step1 && <DropZone state={1}/> }
          <h1 className={step2 == false ? "line-through text-gray-500" : ( step2 == true ? "" : "text-gray-500")}>Step 2 : Upload back picture of your id card.</h1>
          {step2 && <DropZone state={2}/> }
          <h1 className={step3 == false ? "line-through text-gray-500" : ( step3 == true ? "" : "text-gray-500")}>Step 3 : Upload picture of your face.</h1>
          {step3 && <DropZone state={3}/> }
        </div>
      }
      {step4 && 
        <div>
          <h1>Authorization Successfully </h1>
        </div>
      }

    </>
  );
}
