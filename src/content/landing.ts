export const DEMO_URL = "https://supportbot.apinext.in/ui";

export type LandingItem = {
  title: string;
  body: string;
  icon?: string;
};

export const site = {
  name: "Support Bot",
  tagline: "Workforce support assistant",
  deskName: "Support Desk",
  deskStatus: "Online · answers from your support docs",
} as const;

export const hero = {
  brand: site.name,
  headline: "Account, card, and wallet support — answered from your docs, 24/7",
  sub: "An AI assistant that looks up real account details, gives step-by-step help, and hands the chat to a human agent when it cannot solve the problem.",
  primaryCta: "Open live demo",
  secondaryCta: "See how it works",
  chips: [
    "I did not receive my OTP",
    "How can I reset my password?",
    "I cannot log in",
  ],
  chat: [
    {
      id: "u1",
      role: "user" as const,
      text: "I did not receive my OTP",
    },
    {
      id: "b1",
      role: "bot" as const,
      text: "Got it — let’s fix OTP delivery. Open Profile → Security, tap Resend OTP, and wait 30 seconds before trying again.",
      sources: ["OTP troubleshooting", "Password reset guide"],
    },
    {
      id: "u2",
      role: "user" as const,
      text: "Can you check if my account is active?",
    },
    {
      id: "b2",
      role: "bot" as const,
      text: "Checked your account — status is Active, phone verified. You’re good to request a new OTP.",
      tools: ["check_account_status → Active", "validate_phone → Verified"],
    },
    {
      id: "u3",
      role: "user" as const,
      text: "Still stuck — I need a person",
    },
    {
      id: "b3",
      role: "bot" as const,
      text: "No problem. I’m opening a ticket with this chat history and connecting you to a human agent now.",
      handoff: true,
    },
  ],
} as const;

export const overview =
  "AI Support Bot is an AI assistant that answers customer questions about accounts, card redemption and wallet issues, around the clock. It looks up real account details, gives step-by-step help, and hands the chat to a human agent when it can’t solve the problem.";

export const problems = [
  {
    title: "Repeated questions",
    body: "Support teams spend most of their time on the same questions — card redemption, OTP, password reset — instead of hard cases.",
    icon: "repeat",
    scene: {
      label: "Same inbox, every day",
      lines: [
        "How do I redeem my card?",
        "I did not receive my OTP",
        "How can I reset my password?",
      ],
    },
  },
  {
    title: "Long waits",
    body: "Customers sit in queues for answers that should take seconds — account status, wallet help, login fixes.",
    icon: "clock",
    scene: {
      label: "Queue",
      lines: ["Position 47 in line", "Estimated wait: 28 min", "Still waiting…"],
    },
  },
  {
    title: "Guesswork bots",
    body: "Generic chatbots invent steps and don’t know if the account is active, verified, or blocked.",
    icon: "guess",
    scene: {
      label: "Hallucinated reply",
      lines: [
        "Just click Settings → Magic Unlock…",
        "No source. No account check.",
      ],
    },
  },
  {
    title: "Dead ends",
    body: "When the bot gets stuck or confidence drops, customers have no clean path to a human — and tickets never open.",
    icon: "deadend",
    scene: {
      label: "Stuck chat",
      lines: [
        "Bot: I’m not sure I can help.",
        "No agent. No ticket. Gone.",
      ],
    },
  },
] as const;

export const solution = {
  eyebrow: "Why Support Bot",
  title: "Built for teams\nsolving real support",
  body: "A support agent that answers from your own documentation instead of guessing. It checks the customer’s actual account, solves what it can, and escalates the rest to a human with a ticket.",
  steps: [
    {
      id: "docs",
      label: "Docs search",
      title: "Accurate answers from your documentation",
      body: "Hybrid search (keyword + meaning) returns grounded replies with real screen names — not invented steps.",
      panel: {
        kind: "docs" as const,
        image: "/landing/solution-docs.jpg",
        headline: "Hybrid search",
        lines: [
          "Matched: Password reset guide",
          "Matched: OTP troubleshooting",
          "Screen names used: Profile → Security",
        ],
        metric: "Sources used",
        metricValue: "3",
      },
    },
    {
      id: "tools",
      label: "Tool calling",
      title: "Looks up the customer’s real account",
      body: "Checks account status, validates phone numbers and emails, and creates tickets when action is needed.",
      panel: {
        kind: "tools" as const,
        image: "/landing/solution-tools.jpg",
        headline: "Live tool calls",
        lines: [
          "check_account_status → Active",
          "validate_phone → Verified",
          "create_ticket → Ready",
        ],
        metric: "Tools ready",
        metricValue: "3",
      },
    },
    {
      id: "human",
      label: "Human in the loop",
      title: "Customers can reach a person anytime",
      body: "Ask for an agent at any moment — or the bot hands off on its own when confidence drops.",
      panel: {
        kind: "human" as const,
        image: "/landing/solution-human.jpg",
        headline: "Handoff path",
        lines: [
          "Customer: “I need a person”",
          "Bot: Collecting context…",
          "Ticket opened with full chat history",
        ],
        metric: "Wait",
        metricValue: "0s",
      },
    },
    {
      id: "auto",
      label: "Auto escalation",
      title: "No dead ends when things go wrong",
      body: "Inactive or deleted accounts, or a bot stuck in a loop, raise a ticket without anyone asking.",
      panel: {
        kind: "auto" as const,
        image: "/landing/solution-auto.jpg",
        headline: "Watchdog",
        lines: [
          "Loop detected → escalate",
          "Account inactive → ticket",
          "Context attached automatically",
        ],
        metric: "Stuck chats",
        metricValue: "0",
      },
    },
  ],
};

export const features: LandingItem[] = [
  {
    title: "Instant answers from your docs",
    body: "Hybrid search over your documentation so answers stay accurate and use real screen names.",
    icon: "docs",
  },
  {
    title: "Tool calling",
    body: "Checks account status, validates phone numbers and emails, and creates tickets.",
    icon: "tools",
  },
  {
    title: "Human in the loop",
    body: "Customers can ask for a person at any time, and the bot hands off when it isn’t sure.",
    icon: "human",
  },
  {
    title: "Automatic escalation",
    body: "Inactive or deleted accounts, or a bot stuck in a loop, raise a ticket without anyone asking.",
    icon: "escalate",
  },
  {
    title: "User feedback",
    body: "Thumbs up or down on every answer. Negative feedback is reviewed by an AI that suggests what to fix.",
    icon: "feedback",
  },
  {
    title: "Secure and production-ready",
    body: "API-key authentication, rate limiting, saved conversations, and friendly error messages.",
    icon: "secure",
  },
  {
    title: "Flexible AI models",
    body: "Works with OpenAI, Groq, or Ollama for in-house AI.",
    icon: "models",
  },
];

export const tourSteps: LandingItem[] = [
  {
    title: "Support Desk chat",
    body: "Streaming answers, suggestion chips, and a clear Ready status.",
    icon: "chat",
  },
  {
    title: "Sources panel",
    body: "See which support docs grounded the reply.",
    icon: "sources",
  },
  {
    title: "Session controls",
    body: "New chat, export chat, and session ID for continuity.",
    icon: "session",
  },
  {
    title: "Intent and status",
    body: "Live intent detection and Online / Ready indicators.",
    icon: "status",
  },
  {
    title: "Answer feedback",
    body: "Thumbs up or down so the system keeps improving.",
    icon: "feedback",
  },
  {
    title: "Escalation path",
    body: "Hard cases become tickets with conversation context attached.",
    icon: "escalate",
  },
];

export const benefits: LandingItem[] = [
  {
    title: "Fewer tickets for your team",
    body: "Common questions are solved without a human.",
    icon: "tickets",
  },
  {
    title: "Faster help for customers",
    body: "Instant replies, any time of day.",
    icon: "fast",
  },
  {
    title: "More trustworthy answers",
    body: "Based on your docs and real account data, not guesses.",
    icon: "trust",
  },
  {
    title: "No dead ends",
    body: "Hard cases go to a person with the context already attached.",
    icon: "handoff",
  },
  {
    title: "It keeps improving",
    body: "Feedback shows which docs or answers are missing.",
    icon: "improve",
  },
  {
    title: "Easy to run",
    body: "Deploys with Docker.",
    icon: "docker",
  },
];

export const demoCta = {
  title: "Talk to Support Desk now",
  body: "Answers from support docs · real tools · human handoff",
  button: "Open live demo",
} as const;

export const navLinks = [
  { href: "#problem", label: "Problem" },
  { href: "#solution", label: "How it works" },
  { href: "#features", label: "Features" },
  { href: "#demo", label: "Demo" },
] as const;
