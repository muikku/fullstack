
#!/bin/sh
npm run build
rm -rf ../blogilista/build
cp -r build ../blogilista/