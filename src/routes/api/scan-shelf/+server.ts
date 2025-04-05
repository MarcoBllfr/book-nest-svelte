import { json, type RequestHandler } from "@sveltejs/kit";
import { GEMINI_API_KEY } from "$env/static/private";
import axios from "axios";
import type { AiBook } from "$components/state/user-state.svelte";



interface GeminiResponse {
    candidates?: {
        content?: {
            parts?: {
                text?: string;
            }[];
        };
    }[];
    error?: {
        message: string;
    };
}

export const POST: RequestHandler = async ({ request }) => {
    try {
        const { base64 } = await request.json();
/*
         const prompt = `
         Analizza questa immagine con dei libri e fornisci solo:
         1. Titolo del libro
         2. Autore del libro
         3. Volume (se presente o con più volumi)
        Non fornire altre informazioni, solo titolo, autore e volume.
         Dammi le informazioni con questo formato JSON o NOTHING:
         [
             {
                 "bookTitle": "titolo del libro",
                 "vol": "1,2,3....ecc",
                 "author": "autore del libro"
             }
         ]
         Assicurati di restituire un array anche se è presente un solo libro.
         `;

         const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

         const payload = {
            contents: [
                {
                     parts: [
                         { text: prompt },
                         {
                             inline_data: {
                                 mime_type: "image/jpeg",
                                 data: base64
                            }
                         }
                     ]
                 }
             ]
         };

        
         const response = await axios.post(url, payload);
         const result = response.data as GeminiResponse;

         if (result.error) {
             console.error("Gemini API Error:", result.error.message);
            return json({ error: "AI processing failed" }, { status: 500 });
         }

         const bookArrayString = result.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
         let bookArrayToParse: AiBook[] = [];

         try {
             const bookArray = bookArrayString.replace(/```json|```/g, "").trim();
             const rawBooks = JSON.parse(bookArray);

             if (!Array.isArray(rawBooks)) throw new Error("Parsed data is not an array");

        
             bookArrayToParse = rawBooks.flatMap((book: AiBook) => {
                 if (book.vol && book.vol.includes(",")) {
                     return book.vol.split(",").map(vol => ({
                         bookTitle: book.bookTitle,
                         author: book.author,
                        vol: vol.trim()
                     }));
                 }
                 return book;
             });

         } catch (error) {
             console.error("Error parsing JSON:", error);
             bookArrayToParse = []; 
         }
         
  //usare in caso di raggiungimento limite richieste IA
  */
  const bookArrayToParse = [
    {
        "bookTitle": "Barbascura X Saggio erotico sulla fine del mondo",
        "vol": null,
        "author": "Barbascura X"
    },
    {
        "bookTitle": "Berserk",
        "vol": null,
        "author": "Kentaro Miura"
    },
    {
        "bookTitle": "Berserk",
        "vol": "5",
        "author": "Kentaro Miura"
    },
    {
        "bookTitle": "Berserk",
        "vol": "6",
        "author": "Kentaro Miura"
    }
];
  
        return json({ bookArrayToParse });
    } catch (error) {
        console.error("Server error:", error);
        return json({ error: "Internal server error" }, { status: 500 });
    }
};
