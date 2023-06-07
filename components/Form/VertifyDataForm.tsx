import { useForm } from "react-hook-form";
import { useFrontFormDataStore, useStatusDataStore } from "../store/main.store";
// import { PatternFormat } from "react-number-format";

export default function VertifyDataForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      th_fname: "",
      th_lname: "",
      en_fname: "",
      en_lname: "",
      id_num: "",
    },
  });

  return (
    <div className="bg-white rounded-lg drop-shadow-lg p-3 m-5 flex flex-col items-center justify-center">
      <form
        className="flex flex-col justify-between h-full"
        onSubmit={handleSubmit(async (data) => {
          useFrontFormDataStore.getState().setData(data);
          useStatusDataStore.getState().setStep("step1", false);
          useStatusDataStore.getState().setStep("step2", true);
        })}
      >
        <div className="flex flex-col">
          <label>ชื่อ :</label>
          <input
            type="text"
            className="border border-gray-300 rounded-md p-1"
            {...register("th_fname", { required: "Required" })}
          />
        </div>
        <div className="flex flex-col">
          <label>นามสกุล :</label>
          <input
            type="text"
            className="border border-gray-300 rounded-md p-1"
            {...register("th_lname", { required: "Required" })}
          />
        </div>
        <div className="flex flex-col">
          <label>First name:</label>
          <input
            type="text"
            className="border border-gray-300 rounded-md p-1"
            {...register("en_fname", { required: "Required" })}
          />
        </div>
        <div className="flex flex-col">
          <label>Last name:</label>
          <input
            type="text"
            className="border border-gray-300 rounded-md p-1"
            {...register("en_lname", { required: "Required" })}
          />
        </div>
        <div className="flex flex-col">
          <label>ID Card Number (13 Digit):</label>
          {/* <PatternFormat
            format="% %%%% %%%%% %% %"
            patternChar="%"
            allowEmptyFormatting={false}

            onValueChange={({value}) => {
              console.log(value)
             }}
            customInput={(inputProps) => ( */}
              <input
                // {...inputProps}
                className="border border-gray-300 rounded-md p-1"
                type="string"
                {...register("id_num", { required: "Required" })}

              />
            {/* )} */}

          {/* /> */}
        </div>
        <button
          type="submit"
          className="my-1 py-2 px-8 rounded-md bg-[#6dabe4] hover:bg-[#4292dc] text-white self-end"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
