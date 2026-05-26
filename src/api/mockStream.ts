const getResponseForPrompt = (prompt: string): string => {
  const p = prompt.toLowerCase();
  
  if (p.includes('react') || p.includes('component')) {
    return "Creating React components is efficient! Here's a quick example of a styled button:\n\n```tsx\nexport const Button = ({ children }) => (\n  <button className=\"px-4 py-2 bg-primary text-white rounded-lg\">\n    {children}\n  </button>\n);\n```";
  }
  
  if (p.includes('glass') || p.includes('design')) {
    return "Glassmorphism creates a premium feel by using `backdrop-filter: blur()`. It works best when you have a colorful background behind your translucent elements, like the one we've implemented in this chat interface!";
  }

  if (p.includes('hello') || p.includes('hi')) {
    return "Hello there! I'm your premium AI interface. I'm currently running in 'Mock Mode' but I can handle complex streaming and markdown rendering. How are you liking the design?";
  }

  if (p.includes('shortcut') || p.includes('keyboard')) {
    return "You can use `Cmd/Ctrl + K` to start a new chat instantly. It's designed to keep your workflow fast and seamless!";
  }

  return `That's an interesting point! As a simulated AI, I can't process your specific request in real-time without an API key, but I can demonstrate how my **streaming engine** handles chunked data with markdown and code blocks correctly.

### Markdown Features

Here's a quick list of supported formatting:
- **Bold text** for emphasis
- *Italic text* for subtle highlights
- [Links](https://example.com) to external resources

### Code Block Demonstration

Here is an example of a simple algorithm written in TypeScript:

\`\`\`typescript
function calculateFibonacci(n: number): number[] {
  const sequence: number[] = [0, 1];
  for (let i = 2; i < n; i++) {
    sequence.push(sequence[i - 1] + sequence[i - 2]);
  }
  return sequence.slice(0, n);
}

// Generate the first 10 Fibonacci numbers
console.log(calculateFibonacci(10));
\`\`\`

You can see how the syntax highlighting is applied as the text streams in!`;
};

export async function mockFetchStream(prompt: string): Promise<Response> {
  const responseText = getResponseForPrompt(prompt);
  const encoder = new TextEncoder();
  
  const stream = new ReadableStream({
    async start(controller) {
      // Split into words to simulate tokens
      const tokens = responseText.split(' ');
      for (const token of tokens) {
        // Variable delay for a more natural feel
        await new Promise((resolve) => setTimeout(resolve, 20 + Math.random() * 40));
        controller.enqueue(encoder.encode(token + ' '));
      }
      controller.close();
    },
  });

  return new Response(stream);
}
