interface GenerativePart {
  inlineData: {
    data: string;
    mimeType: string;
  };
}

export const getBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(`Error: ${error}`);
  });
};

export const fileToGenerativePart = async (
  file: File
): Promise<GenerativePart> => {
  const base64EncodePromise: Promise<string> = new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(",")[1]);
    reader.readAsDataURL(file);
  });

  return {
    inlineData: {
      data: await base64EncodePromise,
      mimeType: file.type,
    },
  };
};
