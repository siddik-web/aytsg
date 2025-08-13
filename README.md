# Advanced YouTube Script Generator (v2.html)

This project provides an advanced YouTube script generator, leveraging AI models (OpenAI, Gemini, and Ollama) to help users create engaging video scripts. The `v2.html` file is the main application interface.

## Features

- **AI Provider Selection**: Choose between OpenAI, Google Gemini, and local Ollama models for script generation.
- **Dynamic Model Selection**: Automatically lists available models for the selected AI provider (e.g., GPT-4, Gemini Pro, or local Ollama models).
- **API Key Management**: Securely store and load API keys (for OpenAI and Gemini) and Ollama Base URL in local storage.
- **Script Configuration**: Customize script generation with options for video topic, target audience, tone of voice, and video length.
- **Advanced Script Structure**: Include specific sections like Intro Hook, Problem Statement, Solution, Benefits, Examples, Action Steps, and Common Mistakes.
- **SEO Optimization**: Generate SEO tags and auto-hashtags.
- **Script History**: Save and load previously generated scripts.
- **Script Statistics**: View word count, character count, estimated video length, and token count for generated scripts.
- **Export Options**: Copy script to clipboard, download as TXT, or export as PDF.

## Setup and Usage

To run this application locally, follow these steps:

1.  **Clone the Repository (if applicable)**:
    ```bash
    git clone <repository-url>
    cd ytsg
    ```

2.  **Install Dependencies (for `lite-server`)**:
    This project uses `lite-server` for local development. If you don't have it installed, you can install it globally or locally:
    ```bash
    npm install -g lite-server
    # or locally
    npm install lite-server
    ```

3.  **Start the Development Server**:
    Navigate to the project directory in your terminal and run:
    ```bash
    npx lite-server
    ```
    This will open `index.html` in your browser. To access the advanced version, navigate to `http://localhost:3000/v2.html`.

4.  **Configure Ollama (for local models)**:
    If you plan to use Ollama for local model inference, you need to:
    -   **Install Ollama**: Download and install Ollama from [ollama.ai](https://ollama.ai/).
    -   **Pull Models**: Pull desired models (e.g., `ollama pull llama2`) using the Ollama CLI.
    -   **Enable CORS**: To allow your browser-based application to communicate with Ollama, you must enable Cross-Origin Resource Sharing (CORS). On macOS, open your terminal and run:
        ```bash
        launchctl setenv OLLAMA_ORIGINS "*"
        ```
        **Important**: After running this command, you **must restart the Ollama application or service** for the changes to take effect.

5.  **Using the Application**:
    -   Open `v2.html` in your browser.
    -   Select your desired AI Provider (OpenAI, Gemini, or Ollama).
    -   Enter your API Key (for OpenAI/Gemini) or Ollama Base URL (usually `http://localhost:11434`).
    -   Fill in the script configuration details and click "Generate Script".