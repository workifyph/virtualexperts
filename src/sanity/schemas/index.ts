import type { SchemaTypeDefinition } from "sanity";
import { blockContent } from "./blockContent";
import { author } from "./author";
import { category } from "./category";
import { post } from "./post";
import { caseStudy } from "./caseStudy";

export const schemaTypes: SchemaTypeDefinition[] = [
  post,
  caseStudy,
  author,
  category,
  blockContent,
];
