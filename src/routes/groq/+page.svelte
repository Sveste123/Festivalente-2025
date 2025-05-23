<script>
  import { afterUpdate } from 'svelte';
  import { marked } from 'marked';

  // Configure marked for GFM and line breaks
  marked.setOptions({
    gfm: true,
    breaks: true
  });

  let user_input = '';
  let response = '';
  let loading = false;
  let chatHistory = [];
  let chatWindow;

  function scrollToBottom() {
      if (chatWindow) {
          chatWindow.scrollTo({
              top: chatWindow.scrollHeight,
              behavior: 'smooth'
          });
      }
  }

  async function submit() {
  if (!user_input.trim()) return;

  chatHistory = [...chatHistory, { role: 'user', content: user_input }];
  loading = true;
  response = '';

  try {
    const res = await fetch('/groq-api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_input, chatHistory })  // Inkluder chatHistory
    });
    if (res.ok) {
      const data = await res.json();
      response = data.response;
      chatHistory = [...chatHistory, { role: 'assistant', content: response }];  // Bruk "assistant"
    } else {
      response = 'Error: ' + res.status;
      chatHistory = [...chatHistory, { role: 'assistant', content: response }];
    }
  } catch (error) {
    response = 'Error: ' + error.message;
    chatHistory = [...chatHistory, { role: 'assistant', content: response }];
  } finally {
    loading = false;
    user_input = '';
  }
}

  function handleKeypress(event) {
    if (event.key === 'Enter' && !loading) {
      submit();
    }
  }

  afterUpdate(() => {
      if (chatWindow) {
      chatWindow.scrollTo({
          top: chatWindow.scrollHeight,
          behavior: 'smooth'
      });
      }
  });
</script>

<div class="container">
<div class="header">
  <h1>Festiv<strong>AI</strong>ente</h1>
</div>

<div class="chat-window" bind:this={chatWindow}>
  {#if chatHistory.length === 0}
    <div class="welcome-message">
      <p>Jeg kan hjelpe deg med alt du lurer på om Festivalente. Test meg.</p>
      <p1>FestivAIente vet ikke hvor du skal være når; av personverns-årsaker. Oppgi gjerne band- eller konsert- navn og spør i vei!</p1>
    </div>
  {:else}
    {#each chatHistory as message}
      <div class="message {message.role}">
        <div class="message-content">
          <span class="role-label">{message.role === 'user' ? 'Du' : 'FestivAIente'}:</span>
          {#if message.role === 'assistant'}
            {@const parsedContent = marked.parse(message.content)}
            <div>{@html parsedContent}</div>
          {:else}
            <p>{message.content}</p>
          {/if}
        </div>
      </div>
    {/each}
    {#if loading}
      <div class="message assistant">
        <div class="message-content">
          <span class="role-label">FestivAIente:</span>
          <p class="loading">Tenker..</p>
        </div>
      </div>
    {/if}
  {/if}
</div>

<div class="input-box">
  <input
    bind:value={user_input}
    placeholder="Hvor er Kammersalen?"
    on:keydown={handleKeypress}
    disabled={loading}
  />
  <button on:click={submit} disabled={loading || !user_input.trim()}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <line x1="22" y1="2" x2="11" y2="13"></line>
      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
    </svg>
  </button>
</div>
</div>

<style>
:global(body) {
  margin: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: #ffffe6;
}

.container {
  display: flex;
  flex-direction: column;
  height: 82vh;
  max-width: 100%;
  margin: 0 auto;
  background-color: #ffffe6;
  z-index: 1000;
}

.header {
  position: fixed;
  left: 50%;
  top: 14%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 100%;
  padding-top: 1rem;
  color: white;
}

.header h1 {
  font-size: 2.5rem;
  margin: 0;
}

.header strong {
  font-size: 3rem;
  font-weight: 800;
}

.chat-window {
  margin-top: 80px;
  margin-bottom: 4.5%;
  height: 100%;
  width: 100%;
  max-width: 700px;
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  background-color: #ffffe6;
}

.welcome-message {
  text-align: center;
  position: fixed;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #666;
  font-size: 1.1rem;
  margin-top: 3rem;
  width: 80%;
}

.message {
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: flex-start;
}

.message.user {
  justify-content: flex-end;
}

.message-content {
  max-width: 70%;
  padding: 0.75rem 1.25rem;
  border-radius: 1rem;
  background-color: #e0e0e0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.3s ease-in;
}

.message.user .message-content {
  background-color: #58cbf2;
  color: white;
}

.message.user .message-content p {
  color: white;
}

.message.assistant .message-content {
  background-color: #fff;
  color: black;
  border: 1px solid #e0e0e0;
}

.message.assistant .message-content strong {
  font-weight: bold;
  font-size: 0.9rem;
}

.message.assistant .message-content ul {
  list-style: disc;
  margin-left: 20px;
  padding-left: 0;
  font-size: 0.9rem;
}

.message.assistant .message-content li {
  margin-bottom: 0.5rem;
  line-height: 1.5;
  font-size: 0.9rem;
}

.message.assistant .message-content div {
  text-align: left;
}

.role-label {
  font-weight: 600;
  font-size: 0.9rem;
  color: #999;
  display: block;
  margin-bottom: 0.25rem;
}

.message.user .role-label {
  color: #ddd;
}

.message p {
  margin: 0;
  line-height: 1.5;
  text-align: left;
  color: black;

}

p {
  color: black;
}

p1 {
  color: rgba(0, 0, 0, 0.3);
  font-size: 16px;
}

.loading {
  color: #999;
  font-style: italic;
  animation: pulse 1.5s infinite;
}

.input-box {
  display: flex;
  position: fixed;
  left: 50%;
  top: 90%;
  transform: translate(-50%, -50%);
  align-items: center;
  width: 85%;
  max-width: 610px;
  padding: 3rem;
  background-color: #ffffe6;
  border-top: 0.5px solid #e0e0e0;
}

.input-box input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 2rem;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
}

.input-box input:focus {
  border-color: #58cbf2;
}

.input-box button {
  margin-left: 0.5rem;
  padding: 0.75rem;
  background-color: #58cbf2;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.input-box button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.input-box button:hover:not(:disabled) {
  background-color: #5439cc;
}

.input-box button svg {
  color: white;
  width: 20px;
  height: 20px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

@media (max-width: 610px) {
  .container {
    height: 74vh;
    width: 100%;
  }
  .header h1 {
    font-size: 2rem;
  }
  .header {
    top: 12%;
  }

  .header strong {
    font-size: 2.5rem;
  }

  .chat-window {
    padding: 0rem;
  }

  .message-content {
    max-width: 80%;
  }

  .input-box {
    padding: 1rem;
  }

  .input-box input {
    padding: 0.5rem 0.75rem;
    font-size: 17px;
  }

  .input-box button {
    padding: 0.5rem;
  }
  .chat-window {
    margin-top: 60px;
    margin-bottom: 12.5%;
  }
}
</style>