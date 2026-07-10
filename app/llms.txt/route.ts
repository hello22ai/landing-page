// /llms.txt — AI crawlers ke liye site ka short index (llmstxt.org convention).
export const dynamic = "force-static";

const LLMS_TXT = `# https://www.hello22.ai/ llms.txt

- [24/7 AI Voice Receptionist](https://www.hello22.ai/): AI receptionist that answers calls, books appointments 24/7.
- [Privacy Policy Overview](https://www.hello22.ai/privacy): Clear insights on our privacy practices and data handling.
- [Terms of Service](https://www.hello22.ai/terms): Understand terms for using hello22 AI voice agent services.
`;

export function GET() {
  return new Response(LLMS_TXT, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
