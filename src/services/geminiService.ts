/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI, Type } from "@google/genai";
import { BrandBible } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const BRAND_BIBLE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    companyName: { type: Type.STRING },
    missionStatement: { type: Type.STRING },
    brandPersonality: { type: Type.STRING },
    palette: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          hex: { type: Type.STRING, description: "Hex color code starting with #" },
          name: { type: Type.STRING },
          usage: { type: Type.STRING, description: "How to use this color (e.g., Primary background, Accent, Text)" }
        },
        required: ["hex", "name", "usage"]
      }
    },
    typography: {
      type: Type.OBJECT,
      properties: {
        header: {
          type: Type.OBJECT,
          properties: {
            fontFamily: { type: Type.STRING, description: "A high-quality Google Font name (e.g., Playfair Display, Space Grotesk)" },
            source: { type: Type.STRING, default: "Google Fonts" },
            description: { type: Type.STRING }
          },
          required: ["fontFamily", "source", "description"]
        },
        body: {
          type: Type.OBJECT,
          properties: {
            fontFamily: { type: Type.STRING, description: "A legible Google Font name (e.g., Inter, Roboto)" },
            source: { type: Type.STRING, default: "Google Fonts" },
            description: { type: Type.STRING }
          },
          required: ["fontFamily", "source", "description"]
        }
      },
      required: ["header", "body"]
    },
    logoConcepts: {
      type: Type.OBJECT,
      properties: {
        primary: {
          type: Type.OBJECT,
          properties: {
            description: { type: Type.STRING },
            style: { type: Type.STRING },
            visualElements: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["description", "style", "visualElements"]
        },
        secondary: {
          type: Type.OBJECT,
          properties: {
            description: { type: Type.STRING },
            style: { type: Type.STRING },
            visualElements: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["description", "style", "visualElements"]
        },
        mark: {
          type: Type.OBJECT,
          properties: {
            description: { type: Type.STRING },
            style: { type: Type.STRING },
            visualElements: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["description", "style", "visualElements"]
        }
      },
      required: ["primary", "secondary", "mark"]
    },
    narrative: { type: Type.STRING, description: "A 2-3 paragraph poetic narrative about the brand's identity and future." }
  },
  required: ["companyName", "missionStatement", "brandPersonality", "palette", "typography", "logoConcepts", "narrative"]
};

export async function generateBrandBible(mission: string): Promise<BrandBible> {
  const result = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `You are a world-class brand strategist and creative director. 
    Based on the following mission, generate a comprehensive brand identity "Bible".
    
    Mission: "${mission}"
    
    Ensure the colors are harmonious, the fonts are available on Google Fonts, and the logo descriptions are vivid enough for an AI image generator to use directly.
    The identity should feel cohesive and reflect the core values of the mission.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: BRAND_BIBLE_SCHEMA
    }
  });

  if (!result.text) {
    throw new Error("Failed to generate brand identity");
  }

  return JSON.parse(result.text) as BrandBible;
}

export async function generateLogoImage(prompt: string, brandBible: BrandBible): Promise<string> {
    // We'll use nano banana 2 (gemini-3.1-flash-image-preview) or gemini-2.5-flash-image
    // Skill says 'gemini-2.5-flash-image' for general image tasks.
    
    const stylePrompt = `Create a high-end minimalist logo. Style: ${brandBible.logoConcepts.primary.style}. Elements: ${brandBible.logoConcepts.primary.visualElements.join(', ')}. Description: ${prompt}. Solid background, clean lines, professional branding, 4k.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: stylePrompt }] },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    
    throw new Error("No image generated");
}
