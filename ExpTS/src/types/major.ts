import { Major } from "@prisma/client";

export type createMajorDto = Pick<Major, "name" | "code" | "description">;
