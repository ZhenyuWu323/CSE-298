TARGETFOLDER=../SpringBoot_tutorial/SpringBoot_tutorial/src/main/resources/static
WEBFOLDERNAME=dist
rm -rf $TARGETFOLDER/*

npm run build

cp -r dist/* $TARGETFOLDER/