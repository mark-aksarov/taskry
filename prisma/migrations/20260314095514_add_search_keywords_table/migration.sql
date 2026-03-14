-- CreateTable
CREATE TABLE "search_keywords" (
    "id" SERIAL NOT NULL,
    "word" TEXT NOT NULL,
    "usage" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "search_keywords_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "search_keywords_word_key" ON "search_keywords"("word");
