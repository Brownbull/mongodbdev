# go to location to create project folder
cd ${projectLocation}

# create project folder and get in to it
mkdir ${projectName}
cd ${projectName}

# start npm
npm init

# install packages
npm i --save mocha nodemon mongoose

# create folders and files
mkdir src
cd src
copy NUL users.js
cd ..
mkdir test
cd test
copy NUL helper_test.js
copy NUL create_test.js
copy NUL read_test.js
copy NUL update_test.js
copy NUL destroy_test.js

# Database Structure
$database.$Model.$schema.$instance[$index]
user_test.user.UserSchema.gabe

# Schema
$Schema{properties: dataType}
UserScema{name: String}


