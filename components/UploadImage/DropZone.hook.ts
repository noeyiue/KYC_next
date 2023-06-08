
import { useAllFileDataStore, useStatusDataStore } from "../store/main.store";
import { useErrorStore, useFileStore } from "../store/uploaded.store";

export const convertAndAddImage = async (file: File) => {
  if (file.type === "image/heic" && typeof window !== "undefined") {
    const { default: heic2any } = await import("heic2any");
    useFileStore.getState().setLoading(true);
    try {
      const convertedImages = await heic2any({
        blob: file,
        toType: "image/jpeg",
      });
      const convertedBlob = Array.isArray(convertedImages)
        ? convertedImages[0]
        : convertedImages;
      const convertedFile = new File(
        [convertedBlob],
        file.name.replace(/\.heic$/, ".jpg"),
        { type: "image/jpeg" }
      );
      useFileStore.getState().addImage(convertedFile);
    } catch (error) {
      console.error("Conversion error:", error);
    } finally {
      useFileStore.getState().setLoading(false);
    }
  } else {
    useFileStore.getState().addImage(file);
  }
};

export const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
  e.preventDefault();
};

export const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
  e.preventDefault();
  const droppedFiles = Array.from(e.dataTransfer.files);
  if (droppedFiles.length === 1) {
    const droppedFile = droppedFiles[0];
    await convertAndAddImage(droppedFile);
    useErrorStore.getState().setError(false);
    console.log(droppedFile);
  } else {
    useErrorStore.getState().setError(true);
  }
};

export const handleAddFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const selectedFile = e.target.files && e.target.files[0];
  if (selectedFile) {
    await convertAndAddImage(selectedFile);
    useErrorStore.getState().setError(false);
    console.log(selectedFile);
  }
};

export const handleCancel = () => {
  useFileStore.getState().addImage(null);
};

export async function handleSubmit(state: number, image: File) {
  console.log(state);
  let path = " ";
  if (state === 1) { 
    path = `/api/kycs/citizen-card/front`;
  } else if (state === 2) {
    path = `/api/kycs/citizen-card/back`;
  } else if (state === 3) {
    path = `/api/kycs/face-img`;
  }
    const formData = new FormData();
    formData.append("file", image);
    useFileStore.getState().setFetching(true);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}${path}`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: formData,
      }
    );
    const data = await response.json();
    console.log(data);
    if (response.status === 201) {
      useFileStore.getState().setFetching(false);
      useFileStore.getState().addImage(null);
      if (state === 1) { 
        useAllFileDataStore.getState().addFileByStep("step1_img", image)
        useStatusDataStore.getState().setStep("step1", false);
        useStatusDataStore.getState().setStep("step2", true);
      } else if (state === 2) {
        useAllFileDataStore.getState().addFileByStep("step2_img", image)
        useStatusDataStore.getState().setStep("step2", false);
        useStatusDataStore.getState().setStep("step3", true);
      } else if (state === 3) {
        useAllFileDataStore.getState().addFileByStep("step3_img", image)
        useStatusDataStore.getState().setStep("step3", false);
        useStatusDataStore.getState().setStep("step4", true);
      }
    } else {
      useFileStore.getState().setFetching(false);
      useFileStore.getState().addImage(null);
      return false
    }
  }

