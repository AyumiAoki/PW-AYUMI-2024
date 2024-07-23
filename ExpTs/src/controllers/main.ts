import { Request, Response } from "express";
import { LoremIpsum } from "lorem-ipsum";

function generateLorem(paragraphs: string) {
  const loremDefinitions = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 5,
    },
    wordsPerSentence: {
      max: 16,
      min: 8,
    },
  });

  const numParagraphs = parseInt(paragraphs, 10);

  return Array.from({ length: numParagraphs }, () =>
    loremDefinitions.generateParagraphs(1)
  ).join("</br></br>");
}

const lorem = (req: Request, res: Response) => {
  res.send(generateLorem(req.params.paragraphs));
};

export default { lorem };
