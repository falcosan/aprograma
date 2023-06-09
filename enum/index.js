const name =  "Aprograma"

export default {
    name,
    routes: `https://api.storyblok.com/v2/cdn/links?token=${process.env.NUXT_ENV_PREVIEW_TOKEN}&cv=CURRENT_TIMESTAMP&version=published`,
    meta: {
      title: `${name} - A break from stressful coding`,
      description: `Coding can be defined in many ways, sometimes even stressful. The goal of ${name} is to change this`,
      author: "Daniele Falchetti - danielefalche@gmail.com",
      og: {
        image:
          "https://a.storyblok.com/f/106240/810x810/1be2192023/logostatic.png",
        twitter: "@danielefalche",
      },
    },
    rss: {
      description: "Aprograma's blog RSS",
      name: "Daniele Falchetti",
      email: "danielefalche@gmail.com",
      image:
        "https://img2.storyblok.com/1240x0/f/106240/4067x2440/49d9d1a222/noimagedetail.png",
      route: "blog",
      eng: {
        path: "/feedeng.xml",
        title: "Aprograma Blog ENG",
        category: "Blog ENG",
        data: `https://api.storyblok.com/v2/cdn/stories?starts_with=blog&token=${process.env.NUXT_ENV_PREVIEW_TOKEN}&cv=CURRENT_TIMESTAMP&version=published`,
      },
      esp: {
        path: "/feedesp.xml",
        title: "Aprograma Blog ESP",
        category: "Blog ESP",
        data: `https://api.storyblok.com/v2/cdn/stories?starts_with=es/blog&token=${process.env.NUXT_ENV_PREVIEW_TOKEN}&cv=CURRENT_TIMESTAMP&version=published`,
      },
      ita: {
        path: "/feedita.xml",
        title: "Aprograma Blog ITA",
        category: "Blog ITA",
        data: `https://api.storyblok.com/v2/cdn/stories?starts_with=it/blog&token=${process.env.NUXT_ENV_PREVIEW_TOKEN}&cv=CURRENT_TIMESTAMP&version=published`,
      },
    }
  }