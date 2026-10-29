// All visible text and link data for the site.
// CONTENT is split by language; inside each one:
//   ui     -> controls and accessibility labels
//   common -> general text
//   game   -> hero, technologies, projects and contact text (the only mode for now)

// icon: small mark for the contact list (null = no icon yet).
const LINKS = {
  email: { href: "mailto:santino.aued@gmail.com", display: "santino.aued@gmail.com", icon: "assets/img/icon-email.svg" },
  whatsapp: { href: "https://wa.me/5493435142378", display: "+54 9 343 514-2378", icon: "assets/img/icon-whatsapp.png" },
  instagram: { href: "https://www.instagram.com/santi.aued/", display: "@santi.aued", icon: "assets/img/icon-instagram.svg" },
  linkedin: { href: "https://www.linkedin.com/in/santino-aued/", display: "in/santino-aued", icon: "assets/img/icon-linkedin.png" },
  github: { href: "https://github.com/santinoaued", display: "github.com/santinoaued", icon: "assets/img/icon-github.png" },
  itch: { href: "https://santino-aued.itch.io/", display: "santino-aued.itch.io", icon: "assets/img/icon-itch.png" },
};

// Contact links shown in the contact section, in order.
const MODE_CONTACTS = {
  game: ["email", "linkedin", "github", "itch"],
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
      tabsLabel: "Secciones del sitio",
      tabAbout: "Sobre mí",
      tabRaudo: "raudo estudio",
      langSwitchLabel: "Elegir idioma",
      newTab: "(se abre en otra pestaña)",
      sliderLabel: "Mis perfiles",
      carouselPause: "Pausar el carrusel",
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
      profilesTitle: "Dónde encontrar más de mi trabajo",
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
    raudo: {
      metaTitle: "Santino Aued · raudo estudio",
      metaDescription:
        "raudo estudio, la agencia de desarrollo web de Santino Aued y Lautaro Togni: landing pages y sistemas a medida para comercios de zona norte y CABA.",
      title: "Mi agencia de desarrollo web",
      lead: "Con Lautaro Togni armamos landing pages y sistemas a medida para comercios y emprendimientos de zona norte y CABA. Los ponemos en marcha rápido y no les soltamos la mano.",
      cta: "Visitar raudoestudio.com",
      logoAlt: "raudo estudio",
      servicesTitle: "Qué hacemos",
      services: [
        {
          title: "Landing page",
          text: "Para darse a conocer y aparecer en Google: una web con WhatsApp, ubicación y servicios.",
          tags: ["WhatsApp", "Ubicación", "SEO"],
          time: "Andando en días",
        },
        {
          title: "Sistema a medida",
          text: "Para dejar el cuaderno, el Excel que nadie actualiza o los pedidos perdidos entre chats.",
          tags: ["Turnos", "Pedidos", "Stock", "Clientes"],
          time: "Andando en 1 a 2 semanas",
        },
      ],
      roleTitle: "Mi parte",
      roleText:
        "Me encargo del diseño y el desarrollo web: que cada sitio se vea bien, se entienda en cinco segundos y aparezca en Google. Lautaro arma lo que no se ve: los turnos, pedidos y stock que funcionan solos mientras el negocio atiende. Entre los dos diseñamos, programamos y mantenemos cada proyecto de punta a punta.",
      stepsTitle: "Cómo trabajamos",
      steps: [
        { title: "Charlamos", text: "El cliente nos cuenta cómo funciona su negocio. La primera charla no tiene cargo." },
        { title: "Andando en días", text: "En pocos días tiene algo funcionando para probar." },
        { title: "No le soltamos la mano", text: "Mantenemos la web y le sumamos lo que haga falta, cuando lo necesite." },
      ],
      closingTitle: "¿Tenés un negocio que quiere ordenarse?",
      closingText: "En raudoestudio.com están los servicios, los precios y el WhatsApp para arrancar.",
    },
  },

  en: {
    ui: {
      skipLink: "Skip to content",
      tabsLabel: "Site sections",
      tabAbout: "About me",
      tabRaudo: "raudo estudio",
      langSwitchLabel: "Choose language",
      newTab: "(opens in a new tab)",
      sliderLabel: "My profiles",
      carouselPause: "Pause the carousel",
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
      profilesTitle: "Where to find more of my work",
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
    raudo: {
      metaTitle: "Santino Aued · raudo estudio",
      metaDescription:
        "raudo estudio, the web development studio of Santino Aued and Lautaro Togni: landing pages and custom systems for local businesses in Buenos Aires.",
      title: "My web development studio",
      lead: "With Lautaro Togni I build landing pages and custom systems for local businesses and entrepreneurs in Buenos Aires. We get them up and running fast and stay by their side.",
      cta: "Visit raudoestudio.com",
      logoAlt: "raudo estudio",
      servicesTitle: "What we do",
      services: [
        {
          title: "Landing page",
          text: "To get known and show up on Google: a site with WhatsApp, location and services.",
          tags: ["WhatsApp", "Location", "SEO"],
          time: "Live in days",
        },
        {
          title: "Custom system",
          text: "To leave behind the notebook, the spreadsheet nobody updates or orders lost in chats.",
          tags: ["Bookings", "Orders", "Stock", "Clients"],
          time: "Live in 1 to 2 weeks",
        },
      ],
      roleTitle: "My part",
      roleText:
        "I handle web design and development: making every site look good, make sense in five seconds and show up on Google. Lautaro builds what you don't see: the bookings, orders and stock that run on their own while the business serves its customers. Together we design, build and maintain every project end to end.",
      stepsTitle: "How we work",
      steps: [
        { title: "We talk", text: "The client tells us how their business works. The first call is free." },
        { title: "Live in days", text: "Within a few days they have something working to try." },
        { title: "We stay by their side", text: "We maintain the site and add whatever it needs, when it needs it." },
      ],
      closingTitle: "Have a business that needs some order?",
      closingText: "raudoestudio.com has the services, the prices and the WhatsApp link to get started.",
    },
  },
};
