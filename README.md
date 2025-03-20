## Features

- **LLMs & NLU Support:** Integrate with your favorite LLM model whether it's by using Ollama, ChatGPT, Mistral or Gemini ... Manage training datasets for machine learning models that detect user intent and language, providing intelligent responses.
- **Multi-Channel Support:** Create consistent chatbot experiences across multiple channels like web, mobile, and social media platforms.
- **Visual Editor:** Design and manage chatbot flows with an intuitive drag-and-drop interface. Supports text messages, quick replies, carousels, and more.
- **Multi-lingual Support:** Define multiple languages, allowing the chatbot to interact with users in their preferred language.
- **Knowledge Base:** Seamlessly integrate and manage dynamic content such as product catalogs and store lists for more engaging conversations.
- **User Roles & Permissions:** Granular access control to manage user roles and permissions for different parts of the system.
- **Contextual Data:** Define variables to collect and leverage relevant information about end-users to deliver personalized responses.
- **Subscribers & Labels:** Organize users by assigning labels and customize their chat experience based on defined segments.
- **Inbox & Handover:** Provides a real-time chat window where conversations can be monitored and handed over to human agents when necessary.
- **Analytics Dashboard:** Monitor chatbot interactions and performance with insightful metrics and visualizations.

## Directory Structure

- **frontend:** The admin panel built with React/Next.js for managing chatbot configurations and flows.
- **api:** The backend API built with NestJS and connected to MongoDB for data storage and management.
- **widget:** A React-based live chat widget that can be embedded into any website to provide real-time interaction.
- **docker:** A set of Docker Compose files for deploying the entire solution, making it easy to run Hexabot in any environment.

## Getting Started

### Prerequisites

- Node.js >= 18.17.0
- npm (Node Package Manager)
- Docker installed

### Installation

Install Hexabot CLI globally to have easy access to its commands:

```sh
npm install -g hexabot-cli
```

### Usage

1. **Create a new project**:

   ```sh
   hexabot create my-chatbot
   ```

   This will create a new folder `my-chatbot` with all necessary files to get started.

2. **Navigate to your project folder**:

   ```sh
   cd my-chatbot
   ```

3. **Install dependencies**:

   ```sh
   npm install
   ```

4. **Initialize environment**:

   ```sh
   hexabot init
   ```

   This command copies the `.env.example` file to `.env`, which you can edit to customize your configuration.

5. **Run in development mode**:

   ```sh
   hexabot dev --services ollama
   ```

   This starts the required services in development mode.

UI Admin Panel is accessible via http://localhost:8080, the default credentials are :

- **Username:** admin@admin.admin
- **Password:** adminadmin

## Documentation

For detailed information on how to get started, as well as in-depth user and developer guides, please refer to our full documentation available in the docs folder or visit the [Documentation](https://docs.hexabot.ai).

You can also find specific documentation for different components of the project in the following locations:

- [CLI Documentation](https://github.com/Hexastack/hexabot-cli/)
- [API Documentation](api/README.md)
- [UI Documentation](frontend/README.md)
- [Live Chat Widget Documentation](widget/README.md)

1. **Clone the Repository:**

```bash
$ git clone https://github.com/hexastack/hexabot.git
```

2. **Installation:**
   Install node dependencies:

```bash
$ npm install
```

3. **Environment Setup:** To configure the environment variables, use the following command at the root folder for initialization:

```bash
$ hexabot init
```

This will copy the `.env.example` file to `.env` in the `./docker` directory if the file does not already exist.

4. **Running the Application:** Once your environment is set up, you can start the app. Use either of the following commands:

For development mode:

```bash
$ hexabot dev
```

Otherwise, you can choose to download docker images rather than building them:

```bash
$ hexabot start
```

You can also enable services such as Ollama (The services are declared under the `./docker` folder) :

```bash
$ hexabot dev --services ollama
```

**Note:** The first time you run the app, Docker will take some time to download all the required images.

## License

This software is licensed under the GNU Affero General Public License v3.0 (AGPLv3).
