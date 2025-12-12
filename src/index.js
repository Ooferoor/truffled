export default {
  async fetch(request) {
    return new Response("Hello from your Worker!", {
      headers: { "Content-Type": "text/plain" },
    });
  },
};
