//"back-end" endpoint from scan-shelf page
import { json, type RequestHandler } from "@sveltejs/kit";
import {GEMINI_API_KEY} from "$env/static/private"
import axios from "axios";
interface GeminiResponse {
    candidates: {
      content: {
        parts: {
          text: string;
        }[];
      };
    }[];
    error?: {
      message: string;
    };
  }
  
export const POST:RequestHandler = async({request}) => {
    const {base64} = await request.json();
   
    const prompt = `
    Analizza questa immagine con dei libri e fornisci solo:
    1. Titolo del libri
    2. Autore del libri
    3. volume(se presente o con piu volumi)
    Non fornire altre informazioni, solo titolo, autore e volume.
    dammi le informazioni con questo formato JSON o NOTHING
    formato da usare:
    {
    "bookTitle": "titolo del libro",
    "vol":"1,2,3....ecc",
    "author": "autore del libro"
    }
    assicurati di tornare un array se presente un solo libro
  `;

  const url =`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`

  const payload = {
    contents: [{
      parts: [
        { text: prompt },
        {
          inline_data: {
            mime_type: "image/jpeg",
            data: base64
          }
        }
      ]
    }]
  };
  const response = await axios.post(url, payload);
  const result = response.data as GeminiResponse;
  const bookArrayString = result.candidates[0].content.parts[0].text;
  const bookArray = bookArrayString.replace(/```json|```/g,"").trim();
  const bookArrayToParse = JSON.parse(bookArray || "");
  //usare in caso di raggiungimento limite richieste IA
  /*
  const bookArrayToParse = [
    {
        "bookTitle": "Berserk Collection",
        "vol": "1",
        "author": "Kentaro Miura"
    },
    {
        "bookTitle": "Berserk Collection",
        "vol": "2",
        "author": "Kentaro Miura"
    },
    {
        "bookTitle": "Berserk Collection",
        "vol": "3",
        "author": "Kentaro Miura"
    },
    {
        "bookTitle": "Berserk Collection",
        "vol": "4",
        "author": "Kentaro Miura"
    },
    {
        "bookTitle": "Berserk",
        "vol": "6",
        "author": "Kentaro Miura"
    }
  ];
  */
    return json(bookArrayToParse);
}