import { createClient, OAuthStrategy } from "@wix/sdk";
import { items } from "@wix/data";
import { z } from "astro:content";

const myWixClient = createClient({
  modules: { items },
  auth: OAuthStrategy({
    clientId: import.meta.env.WIX_CLIENT_ID,
  }),
});

const WixArticleSchema = z.object({
  dataCollectionId: z.string(),
  data: z.object({
    body: z.string(),
    tutorialImage: z.string(),
    _id: z.string(),
    _owner: z.string(),
    // _createdDate: z.date(),
    // _updatedDate: z.date(),
    tutorialTitle: z.string(),
    content: z.string(),
    publishDate: z.string(),
    text: z.string(),
  }),
  _id: z.string(),
});

type WixArticle = z.infer<typeof WixArticleSchema>;

export async function fetchArticles({
  count = undefined,
  featured = false,
}: {
  count?: number;
  featured?: boolean;
}): Promise<WixArticle[]> {
  let query = myWixClient.items.queryDataItems({
    dataCollectionId: "ProgTutorials",
  });

  if (count) {
    query = query.limit(count);
  }

  if (featured) {
    query = query.eq("featured", true);
  }

  try {
    const articles = await query.find();

    return WixArticleSchema.array().parse(articles.items);
  } catch (error) {
    console.error(error);
    return [];
  }
}
