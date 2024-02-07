type Entry = {
  collectionID: string;
  collectionName: string;
  content: string;
  created: Date;
  id: string;
  title: string;
  tldr: string;
  updated: Date;
};

type EntrySubmission = {
  title: string;
  tldr?: string;
  content: string;
};
