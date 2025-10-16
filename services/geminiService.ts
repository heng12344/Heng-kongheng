
import { GoogleGenAI, Modality } from "@google/genai";

// FIX: Removed the explicit API key check. Per coding guidelines, the API key must be assumed to be present in the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const PROMPT = `follow building object original 100% details ,A realistic photograph . The scene is in the afternoon, just after a rain shower, with wet streets reflecting the light. There is Light style coming out of the building through the windows and doors that have decorations inside and add people . The background can be a building or a tree that fits .Crucially, there are no messy electrical wires visible in the image , Motion Blur people`;

export const generateImageFromImage = async (base64ImageData: string, mimeType: string): Promise<string | null> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64ImageData,
              mimeType: mimeType,
            },
          },
          {
            text: PROMPT,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return part.inlineData.data;
      }
    }
    return null;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("មិនអាចបង្កើតរូបភាពបានទេ។ សូមពិនិត្យមើល Console សម្រាប់ព័ត៌មានលម្អិត។");
  }
};
