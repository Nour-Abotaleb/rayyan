const en = {
  auth: {
    welcomeBack: "Welcome Back to",
    brandName: "RAYYAN",
    subtitle:
      "Your gateway to designing professional proposals that win top tenders with intelligence and precision.",
    email: "Your Email",
    emailPlaceholder: "ex: example@gmail.com",
    password: "Password",
    passwordPlaceholder: "XXXX XXXX XXXX",
    rememberMe: "Remember me",
    forgotPassword: "Forgot Password",
    login: "Login",
    signInWithGoogle: "Sign In With Google",
    noAccount: "Don't have an account?",
    signUp: "Sign Up",
    createAccountTitle: "Create Your Account with",
    signupSubtitle:
      "Start managing your documents smarter with AI in just a few steps.",
    yourName: "Your Name",
    namePlaceholder: "ex: Ahmed Adel",
    confirmPassword: "Confirm Password",
    alreadyHaveAccount: "Already have an account?",
  },
  nav: {
    layout: "Layout",
    gallery: "Gallery",
    folderCloud: "Folder Cloud",
    settings: "Settings",
    lightMode: "Light Mode",
    darkMode: "Dark Mode",
    language: "Language",
  },
  contact: {
    contactUs: "Contact Us",
    loginNow: "Login Now",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    heroTitleLine1: "Let's Power Your",
    heroTitleLine2: "Next Proposal",
    heroSubtitle:
      "Cut hours spent to answer your questions and help you discover how Rayyan can transform your proposal workflow.",
    fullName: "Full Name",
    namePlaceholder: "ex. Ahmed Ali",
    email: "Email",
    emailPlaceholder: "ex. sample@gmail.com",
    yourMessage: "Your Message",
    messagePlaceholder: "Enter your message",
    send: "Send",
  },
  home: {
    hero: {
      titleLine1: "All Your Documents.",
      titleLine2: "One Smart Platform",
      subtitle:
        "Upload, analyze, and manage your files with intelligent tools designed to simplify your workflow and boost productivity.",
      getStarted: "Get Started",
      dashboardPreviewAlt: "Dashboard preview",
    },
    marketing: {
      eyebrow: "Built for Proposal Professionals.",
      governmentTendersTitle:
        "Empowering your team with the tools needed to win complex government tenders.",
      trustedBy: "Trusted by 7,000+ top startups, freelancers and studios",
    },
    secondSection: {
      recordsEyebrow: "Stay in Control of Your Records",
      recordsHeading:
        "Easily access, track, and manage your documents from anywhere with a clean and intuitive interface.",
      rfpBidProgress: "RFP Bid Progress",
      completed: "Completed",
      filterTechnical: "Technical",
      filterVisualization: "Visualization",
      filterFinancial: "Financial",
    },
    capabilities: {
      createFirstProposal: "Create First Proposal",
      watchDemo: "Watch Demo",
      technicalRow: {
        eyebrow: "Technical Power",
        title: "Master Every RFP with Intelligent Insights",
        description:
          "Rayyan doesn't just read; it comprehends. Our AI dives deep into complex RFP documents to extract hidden requirements and build a tailored technical methodology that hits every mark—saving you weeks of manual drafting.",
        tags: [
          "Smart RFP Extraction",
          "Custom Methodology",
          "Scope Alignment",
          "AI-Powered Drafting",
        ] as const,
      },
      outputsRow: {
        eyebrow: "Professional Outputs",
        title: "Impressive Financials, Delivered in Seconds",
        description:
          "Move beyond basic spreadsheets. With our advanced BOQ engine and automated visualizations, you can generate stunning financial tables and interactive charts that build immediate trust.",
        tags: [
          "Advanced BOQ Engine",
          "Dynamic Analytics",
          "Precise Timelines",
          "One-Click PDF Export",
        ] as const,
      },
    },
    built: {
      leftCardTitle:
        "Smart, flexible, and built for your unique bid structure.",
      hideBranding: "Hide Dreelio branding",
      leftCardBody:
        "Tailor every proposal to the specific requirements of the RFP. From Technical Methodologies to Cybersecurity and Sustainability plans—Rayyan adapts to your firm’s identity and the client’s standards.",
      rightCardTitle: "Extract intelligence directly from your RFP documents.",
      rightCardBody:
        "Stop manual data entry. Our AI automatically scans your tender documents to identify deliverables, mandatory timelines, and team requirements in seconds—so you can focus on strategy.",
      bottom1Title: "Technical Approach Mastery",
      bottom1Body:
        "Automatically generate rich technical methodologies based on bid requirements and scoring criteria.",
      bottom2Title: "Smart Resource Mapping",
      bottom2Body:
        "Structure teams by role and cost while balancing effort and timeline for every section.",
      bottom3Title: "Zero-Error Compliance",
      bottom3Body:
        "Cross-check your proposal against all mandatory RFP clauses before submission.",
    },
    testimonials: {
      heading:
        "See how RAYYAN AI is transforming the way bidding teams win tenders",
      items: [
        {
          quote:
            "The AI’s ability to extract requirements from a 200-page RFP and generate a compliant methodology in minutes is mind-blowing.",
          name: "Eng. Abdullah Mansour",
          role: "Senior Proposal Specialist",
        },
        {
          quote:
            "Rayyan has completely redefined how we approach complex government tenders. It's our gain and speed in the delivery.",
          name: "Maya Detris",
          role: "Bid Lead, Public Sector",
        },
        {
          quote:
            "Our technical scores have never been higher. The methodology generated is compliant and professional.",
          name: "Eng. Adelah Noor",
          role: "CEO, Building Matrix",
        },
        {
          quote:
            "Extracting requirements used to take days; now it takes minutes. Highly recommended for bidding teams.",
          name: "Marcus Chen",
          role: "Operations Director",
        },
      ] as const,
    },
    pricing: {
      filterAnnually: "Annually",
      filterMonthly: "Monthly",
      plans: [
        {
          name: "Dreelo Basic",
          tier: "Free",
          price: "",
          description: "For solo users with light needs.",
          features: [
            "Unlimited projects",
            "Unlimited clients",
            "Time tracking",
            "CRM",
            "1/5 AI bid help",
          ] as const,
          cta: "Try FreeNow",
        },
        {
          name: "Dreelo Premium",
          tier: "Dreelio Premium",
          price: "$189/mo",
          description: "For pro solo and agile teams.",
          features: [
            "Everything in Basic",
            "Unlimited payments",
            "Expense tracking",
            "Income tracking",
            "Shared client view",
          ] as const,
          cta: "Get started",
          badge: "Save 25%",
        },
        {
          name: "Dreelo Enterprise",
          tier: "Flexible",
          price: "",
          description: "For teams scaling high-value bids.",
          features: [
            "Everything in Premium",
            "Custom role layouts",
            "Advanced automation",
            "Budget integrations",
            "Forecasting",
          ] as const,
          cta: "Contact sales",
        },
      ] as const,
    },
    insights: {
      eyebrow: "Bid Insights & Strategies",
      sectionTitle:
        "Master the art of tendering with our expert guides and AI-driven procurement strategies.",
      featuredImageAlt: "Featured article",
      featuredPost: "FEATURED POST",
      featuredArticleTitle: "The Future of Government Tendering in 2026",
      featuredArticleBody:
        "Discover how AI is reshaping technical methodologies and how your firm can maintain a competitive edge in a rapidly evolving digital procurement landscape.",
      authorName: "Martha Punla",
      authorRole: "VP Marketing, Meta",
      featuredBadge: "FEATURED",
      miniArticles: [
        {
          title: "Top 5 Features Every Technical Proposal Needs",
          badge: "VIDEO",
        },
        {
          title: "Mastering BOQ Accuracy: A Guide to Precision",
          badge: "NEW",
        },
        {
          title: "RFP Compliance: How to Avoid Rejections",
          badge: "TIPS",
        },
      ] as const,
    },
    community: {
      titleLine: "All Your Documents.",
      subtitle:
        "Upload, analyze, and manage your files with intelligent tools designed to simplify your workflow and boost productivity.",
      getStarted: "Get Started",
      learnMore: "Learn More",
    },
    footer: {
      tagline:
        "The next generation of business proposal intelligence. From document analysis to final export, experience a seamless AI workflow designed for modern enterprises.",
      linkHome: "Home Page",
      linkFeatures: "Features",
      linkPricing: "Pricing",
      linkTechnical: "Technical Proposals",
      linkFinancial: "Financial Proposals",
      linkVisualization: "Visualization Proposals",
      copyright: "Copyright © 2026 Rayyan AI. All rights reserved.",
      builtIn: "Built in",
      codgooLogoAlt: "codgoo logo",
    },
  },
} as const;

export default en;
