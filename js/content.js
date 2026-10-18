// All visible text and link data for the site.
// CONTENT is split by language; inside each one:
//   ui     -> controls and accessibility labels
//   common -> text shared by both modes
//   game / web -> text that changes with the selected mode

// icon: small mark for the contact list (null = no icon yet).
const LINKS = {
  email: { href: "mailto:santino.aued@gmail.com", display: "santino.aued@gmail.com", icon: "assets/img/icon-email.svg" },
  whatsapp: { href: "https://wa.me/5493435142378", display: "+54 9 343 514-2378", icon: "assets/img/icon-whatsapp.png" },
  instagram: { href: "https://www.instagram.com/santi.aued/", display: "@santi.aued", icon: "assets/img/icon-instagram.svg" },
  linkedin: { href: "https://www.linkedin.com/in/santino-aued/", display: "in/santino-aued", icon: "assets/img/icon-linkedin.png" },
  github: { href: "https://github.com/santinoaued", display: "github.com/santinoaued", icon: "assets/img/icon-github.png" },
  itch: { href: "https://santino-aued.itch.io/", display: "santino-aued.itch.io", icon: "assets/img/icon-itch.png" },
};

// Contact links shown in each mode, in order.
const MODE_CONTACTS = {
  game: ["email", "linkedin", "github", "itch"],
  web: ["whatsapp", "email", "instagram", "linkedin"],
};

// Platform logos shown on the project cards (light, transparent PNGs).
// While null, the card shows the platform name instead.
const CARD_LOGOS = {
  itch: "assets/img/logo-itch.png",
  github: "assets/img/logo-github.png",
  linkedin: "assets/img/logo-linkedin.png",
};

// Featured game projects (game mode). Text lives in CONTENT[lang].game.featured, matched by id.
const FEATURED_PROJECTS = {
  resurge: {
    href: "https://esusdev.itch.io/resurge",
    image: "assets/img/project-resurge.webp",
    width: 677,
    height: 602,
  },
};

const CONTENT = {
  es: {
    ui: {
      skipLink: "Saltar al contenido",
      modeSwitchLabel: "Elegir perfil: videojuegos o web",
      modeGame: "Game Dev",
      modeWeb: "Web Dev",
      langSwitchLabel: "Elegir idioma",
      newTab: "(se abre en otra pestaña)",
      sliderLabel: "Proyectos y perfiles",
      sliderPrev: "Anterior",
      sliderNext: "Siguiente",
      whatsappButton: "Escribime",
      whatsappNote: "por WhatsApp (se abre en otra pestaña)",
      whatsappMessage: "Hola Santino, vi tu portfolio y quería escribirte.",
      contactLabels: {
        email: "Email",
        whatsapp: "WhatsApp",
        instagram: "Instagram",
        linkedin: "LinkedIn",
        github: "GitHub",
        itch: "itch.io",
      },
    },
    common: {
      location: "Entre Ríos / Ciudad Autónoma de Buenos Aires",
      aboutTitle: "Sobre mí",
      photoAlt: "Retrato de Santino Aued con una campera de corderoy marrón",
      about:
        "Soy Santino Aued, estudio la Tecnicatura Universitaria en Desarrollo y Producción de Videojuegos en la UTN. Antes de dedicarme al desarrollo estudié un año marketing, y de ahí me quedó algo que sigo usando: pensar primero en la persona que va a usar lo que hago.",
      aboutPassion: "Me apasiona gestionar y crear sistemas complejos de forma limpia y escalable.",
      howIWorkTitle: "Cómo trabajo",
      howIWork: [
        "Defino el diseño antes de armar el código.",
        "Prefiero soluciones simples y legibles a arquitecturas complicadas.",
        "Trabajo con Git y un historial de commits ordenado.",
        "Me gusta entender el problema completo, no solo la parte que me toca.",
      ],
      experienceTitle: "Experiencia actual",
      experienceRole: "Product Manager",
      experienceText:
        "Actualmente me desempeño como Product Manager en el desarrollo de un videojuego para un cliente real, como parte de las prácticas profesionales supervisadas de la carrera.",
      techTitle: "Tecnologías",
      projectsTitle: "Proyectos",
      contactTitle: "Contacto",
    },
    game: {
      metaTitle: "Santino Aued · Game Developer",
      metaDescription:
        "Santino Aued, Game Developer. Desarrollo videojuegos con Unity y C#, con foco en diseño de sistemas y producción.",
      heroTitle: "Game Developer",
      heroLead:
        "Desarrollo videojuegos con Unity y C#. Me interesa el diseño de sistemas y la producción.",
      heroActions: [
        { label: "Ver proyectos", href: "#projects" },
        { label: "Contacto", href: "#contact" },
      ],
      techGroups: [
        {
          title: "Desarrollo de videojuegos",
          items: ["Unity", "Godot", "C#", "Blueprints (Unreal Engine)", "Blender"],
        },
        { title: "Gestión y producción", items: ["Notion", "GitHub", "Trello"] },
      ],
      projectsLead: "Mis juegos, mi código y mi recorrido, cada cosa en su lugar.",
      featured: [
        {
          id: "resurge",
          title: "Resurge",
          badge: "3.er puesto · Game Jam UTN",
          text: "Juego hecho en equipo para la Game Jam de Videojuegos UTN. Quedamos en el tercer puesto entre 22 juegos participantes.",
          cta: "Jugar en itch.io",
          imageAlt: "Portada de Resurge: un pequeño robot blanco asomándose entre chatarra oxidada, con la insignia de tercer puesto de la Jam de Videojuegos UTN.",
        },
      ],
      projects: [
        {
          id: "itch",
          name: "itch.io",
          text: "Mis proyectos publicados para jugar en el navegador o descargar: trabajos de la universidad, personales y de game jams.",
          cta: "Ver juegos",
        },
        {
          id: "github",
          name: "GitHub",
          text: "Mis repositorios, para revisar cómo organizo los proyectos y cómo armo el código.",
          cta: "Ver repositorios",
        },
        {
          id: "linkedin",
          name: "LinkedIn",
          text: "Publicaciones, certificaciones y más información sobre mi recorrido.",
          cta: "Ver perfil",
        },
      ],
      contactLead:
        "Si estás armando un equipo, organizando una jam o querés charlar de un proyecto, escribime.",
    },
    web: {
      metaTitle: "Santino Aued · Web Developer",
      metaDescription:
        "Santino Aued, Web Developer. Sitios web para comercios y emprendimientos en Entre Ríos y Buenos Aires.",
      heroTitle: "Web Developer",
      heroLead:
        "Sitios web para comercios y emprendimientos. Formándome como Full Stack con freeCodeCamp.",
      heroActions: [
        { label: "Hablemos de tu sitio", href: "#contact" },
        { label: "Sobre mí", href: "#about" },
      ],
      techGroups: [
        {
          title: "Desarrollo web",
          items: ["HTML", "CSS", "JavaScript", "Git y GitHub", "Vercel"],
        },
        { title: "Organización", items: ["Notion", "Trello"] },
      ],
      projectsLead: "",
      emptyProjects: {
        text: "Mis primeros proyectos web están en camino. Si tenés un comercio o emprendimiento y querés tu sitio, escribime.",
        cta: "Escribime",
      },
      contactLead:
        "Contame qué hace tu comercio o emprendimiento y qué necesitás. Por WhatsApp te respondo más rápido.",
    },
  },

  en: {
    ui: {
      skipLink: "Skip to content",
      modeSwitchLabel: "Choose profile: games or web",
      modeGame: "Game Dev",
      modeWeb: "Web Dev",
      langSwitchLabel: "Choose language",
      newTab: "(opens in a new tab)",
      sliderLabel: "Projects and profiles",
      sliderPrev: "Previous",
      sliderNext: "Next",
      whatsappButton: "Message me",
      whatsappNote: "on WhatsApp (opens in a new tab)",
      whatsappMessage: "Hi Santino, I saw your portfolio and wanted to get in touch.",
      contactLabels: {
        email: "Email",
        whatsapp: "WhatsApp",
        instagram: "Instagram",
        linkedin: "LinkedIn",
        github: "GitHub",
        itch: "itch.io",
      },
    },
    common: {
      location: "Entre Ríos / Buenos Aires City, Argentina",
      aboutTitle: "About me",
      photoAlt: "Portrait of Santino Aued wearing a brown corduroy jacket",
      about:
        "I'm Santino Aued, and I'm studying Game Development and Production at UTN (Argentina). Before getting into development I studied marketing for a year, and it left me with a habit I still rely on: thinking first about the person who will use what I make.",
      aboutPassion: "I'm passionate about managing and building complex systems in a clean, scalable way.",
      howIWorkTitle: "How I work",
      howIWork: [
        "I define the design before building the code.",
        "I prefer simple, readable solutions over complex architecture.",
        "I work with Git and keep a clean commit history.",
        "I like to understand the whole problem, not just my part of it.",
      ],
      experienceTitle: "Current experience",
      experienceRole: "Product Manager",
      experienceText:
        "I'm currently working as Product Manager on a game being developed for a real client, as part of my degree's supervised professional internship.",
      techTitle: "Technologies",
      projectsTitle: "Projects",
      contactTitle: "Contact",
    },
    game: {
      metaTitle: "Santino Aued · Game Developer",
      metaDescription:
        "Santino Aued, Game Developer. I build games with Unity and C#, focused on systems design and production.",
      heroTitle: "Game Developer",
      heroLead:
        "I build games with Unity and C#. I care about systems design and production.",
      heroActions: [
        { label: "See projects", href: "#projects" },
        { label: "Contact", href: "#contact" },
      ],
      techGroups: [
        {
          title: "Game development",
          items: ["Unity", "Godot", "C#", "Blueprints (Unreal Engine)", "Blender"],
        },
        { title: "Management and production", items: ["Notion", "GitHub", "Trello"] },
      ],
      projectsLead: "My games, my code and my background, each in its own place.",
      featured: [
        {
          id: "resurge",
          title: "Resurge",
          badge: "3rd place · UTN Game Jam",
          text: "A team project made for the UTN Video Game Jam. We placed third out of 22 entries.",
          cta: "Play on itch.io",
          imageAlt: "Resurge cover art: a small white robot peeking out from rusty scrap, with the UTN Video Game Jam third place badge.",
        },
      ],
      projects: [
        {
          id: "itch",
          name: "itch.io",
          text: "My published projects, playable in the browser or downloadable: university, personal and game jam work.",
          cta: "See games",
        },
        {
          id: "github",
          name: "GitHub",
          text: "My repositories, to see how I organize projects and how I build my code.",
          cta: "See repositories",
        },
        {
          id: "linkedin",
          name: "LinkedIn",
          text: "Posts, certifications and more about my background.",
          cta: "See profile",
        },
      ],
      contactLead:
        "If you're building a team, running a jam or want to talk about a project, get in touch.",
    },
    web: {
      metaTitle: "Santino Aued · Web Developer",
      metaDescription:
        "Santino Aued, Web Developer. Websites for local businesses and entrepreneurs in Argentina.",
      heroTitle: "Web Developer",
      heroLead:
        "Websites for local businesses and entrepreneurs. Currently training as a Full Stack developer with freeCodeCamp.",
      heroActions: [
        { label: "Let's talk about your site", href: "#contact" },
        { label: "About me", href: "#about" },
      ],
      techGroups: [
        {
          title: "Web development",
          items: ["HTML", "CSS", "JavaScript", "Git & GitHub", "Vercel"],
        },
        { title: "Organization", items: ["Notion", "Trello"] },
      ],
      projectsLead: "",
      emptyProjects: {
        text: "My first web projects are on the way. If you run a business and need a website, get in touch.",
        cta: "Get in touch",
      },
      contactLead:
        "Tell me about your business and what you need. WhatsApp is the fastest way to reach me.",
    },
  },
};
