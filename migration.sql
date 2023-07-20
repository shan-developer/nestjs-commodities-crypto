-- CreateTable
CREATE TABLE "_commoditiesothers" (
    "commoditytype" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "changevalue" TEXT NOT NULL,
    "changepercentage" TEXT NOT NULL,
    "lowprice" TEXT NOT NULL,
    "highprice" TEXT NOT NULL,
    "shorttime" TEXT NOT NULL,
    "quotejson" JSONB NOT NULL,
    "createdate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "_commoditiesothers_pkey" PRIMARY KEY ("commoditytype")
);

-- CreateTable
CREATE TABLE "_pmquotes" (
    "pmtype" TEXT NOT NULL,
    "bid" TEXT NOT NULL,
    "ask" TEXT NOT NULL,
    "low" TEXT NOT NULL,
    "high" TEXT NOT NULL,
    "changevalue" TEXT NOT NULL,
    "changepercentage" TEXT NOT NULL,
    "month1changevalue" TEXT NOT NULL,
    "month1changepercentage" TEXT NOT NULL,
    "year1changevalue" TEXT NOT NULL,
    "year1changepercentage" TEXT NOT NULL,
    "year1lowprice" TEXT NOT NULL,
    "year1highprice" TEXT NOT NULL,
    "longtime" TEXT NOT NULL,
    "quotejson" JSONB NOT NULL,
    "createdate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "_pmquotes_pkey" PRIMARY KEY ("pmtype")
);

-- CreateIndex
CREATE INDEX "_commoditiesothers_createdate_idx" ON "_commoditiesothers"("createdate");

-- CreateIndex
CREATE INDEX "_commoditiesothers_updatedate_idx" ON "_commoditiesothers"("updatedate");

-- CreateIndex
CREATE INDEX "_pmquotes_createdate_idx" ON "_pmquotes"("createdate");

-- CreateIndex
CREATE INDEX "_pmquotes_updatedate_idx" ON "_pmquotes"("updatedate");
