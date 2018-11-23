

#password for sign apk: 123456
# run 'make' command for a apk build with previous local tools

SDK_HOME:=~/Library/

all: java ndk apk sign

java:
	@echo "Creating java files $@..."
	@javac app/src/main/java/at/lukle/clickableareas/NativeFunctions.java app/src/main/java/at/lukle/clickableareas/Device.java


ndk:
	@echo "Building NDK..."
	@cd app/src/main; $(SDK_HOME)/Android/sdk/ndk-bundle/ndk-build;


apk:
	@echo "Building .apk file..."
	@./gradlew
	@./gradlew assembleRelease
	@mv app/build/outputs/apk/app-release-unsigned.apk app-release-unsigned.apk


sign:
	@echo "Signing .apk file..."
	# for any errors replace '25.0.2' with your sdk/build-tools most recent version
	@ $(SDK_HOME)/Android/sdk/build-tools/25.0.2/zipalign -f -v -p 4 app-release-unsigned.apk   MedtronicMinimed530G.apk
	@echo -e "\033[1;31m Password for sign apk: 123456 \033[0m"
	@ $(SDK_HOME)/Android/sdk/build-tools/25.0.2/apksigner sign --ks my-release-key.jks  MedtronicMinimed530G.apk
	@rm app-release-unsigned.apk

#install sdk on local folder is user doesn't have Android SDK installed
install: download local

download:
	@if [ -a sdk.zip ];then echo "File already downloaded. Please delete it to download again.";else echo "Downloading SDK...";wget -O sdk.zip "https://www.dropbox.com/s/il81vpf7e2n53rd/sdk.zip?dl=0";fi;
	@echo "Installing SDK..."
	@unzip sdk.zip
	@rm sdk.zip

local:java ndklocal apklocal signlocal

ndklocal:
	@echo "Building NDK..."
	@cd app/src/main; ../../../sdk/ndk-bundle/ndk-build;

apklocal:
	@echo "Building .apk file..."
	@./gradlew
	@./gradlew assembleRelease
	@mv app/build/outputs/apk/app-release-unsigned.apk app-release-unsigned.apk

signlocal:
	@echo "Signing .apk file..."
	@sdk/build-tools/*/zipalign -f -v -p 4 app-release-unsigned.apk   MedtronicMinimed530G.apk
	@echo -e "\033[1;31m Password for sign apk: 123456 \033[0m"
	@sdk/build-tools/*/apksigner sign --ks my-release-key.jks  MedtronicMinimed530G.apk
	@rm app-release-unsigned.apk


clean:
	@echo "Cleaning..."
	@if [ -a MedtronicMinimed530G.apk ];then rm  MedtronicMinimed530G.apk;fi;
	@if [ -a app-release-unsigned.apk ];then rm app-release-unsigned.apk;fi;
	@if [ -a sdk.zip ];then rm sdk.zip;fi;
