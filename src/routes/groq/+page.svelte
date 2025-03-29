<script>
    let user_input = '';
    let response = '';
    let loading = false;
    let chatHistory = []; // Holder styr på chat-historikken
  
    async function submit() {
      if (!user_input.trim()) return; // Ignorer tomme input
  
      // Legg til brukerens melding i historikken
      chatHistory = [...chatHistory, { role: 'user', content: user_input }];
      loading = true;
      response = ''; // Nullstill responsen mens vi laster
  
      try {
        const res = await fetch('/groq-api', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_input })
        });
        if (res.ok) {
          const data = await res.json();
          response = data.response;
          // Legg til AI-svaret i historikken
          chatHistory = [...chatHistory, { role: 'ai', content: response }];
        } else {
          response = 'Error: ' + res.status;
          chatHistory = [...chatHistory, { role: 'ai', content: response }];
        }
      } catch (error) {
        response = 'Error: ' + error.message;
        chatHistory = [...chatHistory, { role: 'ai', content: response }];
      } finally {
        loading = false;
        user_input = ''; // Tøm inputfeltet etter sending
      }
    }
  
    // Håndter Enter-tast for å sende
    function handleKeypress(event) {
      if (event.key === 'Enter' && !loading) {
        submit();
      }
    }
  </script>
  
  <div class="container">
    <!-- Overskrift -->
    <div class="header">
      <h1>Festiv<strong>AI</strong>ente</h1>
      <!-- <h2>- Jeg kan alt om Festivalente, test meg.</h2> -->
    </div>
  
    <!-- Chat-vindu -->
    <div class="chat-window">
      {#if chatHistory.length === 0}
        <div class="welcome-message">
          <p>Jeg kan hjelpe deg med alt du lurer på om Festivalente. Test meg.</p>
        </div>
      {:else}
        {#each chatHistory as message}
          <div class="message {message.role}">
            <div class="message-content">
              <span class="role-label">{message.role === 'user' ? 'Du' : 'FestivAIente'}:</span>
              <p>{message.content}</p>
            </div>
          </div>
        {/each}
        {#if loading}
          <div class="message ai">
            <div class="message-content">
              <span class="role-label">FestivAIente:</span>
              <p class="loading">Skriver...</p>
            </div>
          </div>
        {/if}
      {/if}
    </div>
  
    <!-- Input-boks -->
    <div class="input-box">
      <input
        bind:value={user_input}
        placeholder="Hvor er DRA2?"
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
      background-color: #f5f5f5;
    }
  
    .container {
      display: flex;
      flex-direction: column;
      height: 77vh;
      max-width: 100%;
      margin: 0 auto;
      background-color: #ffffe6;
    }
  
    .header {
      text-align: center;
      padding: 1rem;
      background: radial-gradient(#58cbf2 -110%, #ffffe6 70%);
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
      height: 20%;
      flex: 1;
      overflow-y: auto;
      padding: 1.5rem;
      background-color: #ffffe6;
      border-bottom: 1px solid #e0e0e0;
    }
  
    .welcome-message {
      text-align: center;
      color: #666;
      font-size: 1.1rem;
      margin-top: 2rem;
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
      background-color: #8165ff;
      color: white;
    }

    .message.user .message-content p {
      color: white;
    }
  
    .message.ai .message-content {
      background-color: #fff;
      border: 1px solid #e0e0e0;
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
    }

    p {
        color: black;
    }
  
    .loading {
      color: #999;
      font-style: italic;
      animation: pulse 1.5s infinite;
    }
  
    .input-box {
      display: flex;
      align-items: center;
      padding: 1rem;
      background-color: #ffffe6;
      border-top: 1px solid #e0e0e0;
      /* box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05); */
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
      border-color: #6b48ff;
    }
  
    .input-box button {
      margin-left: 0.5rem;
      padding: 0.75rem;
      background-color: #6b48ff;
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
  
    @media (max-width: 768px) {
      .header h1 {
        font-size: 2rem;
      }
  
      .header strong {
        font-size: 2.5rem;
      }
  
      .chat-window {
        padding: 1rem;
      }
  
      .message-content {
        max-width: 85%;
      }
  
      .input-box {
        padding: 0.75rem;
      }
  
      .input-box input {
        padding: 0.5rem 0.75rem;
        font-size: 0.9rem;
      }
  
      .input-box button {
        padding: 0.5rem;
      }
    }
  </style>