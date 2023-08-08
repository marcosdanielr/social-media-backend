-- CreateTable
CREATE TABLE "likes" (
    "by_id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("by_id","post_id")
);

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_by_id_fkey" FOREIGN KEY ("by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
