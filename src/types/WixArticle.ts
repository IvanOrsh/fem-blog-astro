export interface WixArticle {
  dataCollectionId: string;
  data: {
    body: string;
    tutorialImage: string;
    _id: string;
    _owner: string;
    // _createdDate: Date;
    // _updatedDate: Date;
    tutorialTitle: string;
    content: string;
    publishDate: string;
    text: string; // slug
  };
  _id: string;
}
