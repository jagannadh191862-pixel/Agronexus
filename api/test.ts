export default function handler() {
  return new Response(
    JSON.stringify({
      success: true,
      message: "AGRO NEXUS backend is working!"
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
}