# init mongo from console
```haskshell
mongod --dbpath D:\data\db
```

# go to location to create project folder
```haskshell
cd ${projectLocation}
```

# create project folder and get in to it
```haskshell
mkdir ${projectName}
cd ${projectName}
```

# start npm
```haskshell
npm init
```

# install packages
```haskshell
npm i --save mocha nodemon mongoose
```
# create folders and files
```haskshell
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
```
# Database Structure
```javascript
$database.$Model.$schema.$instance[$index]
user_test.user.UserSchema.gabe
```

# Schema
```javascript
$Schema{properties: dataType}
UserScema{name: String}
```

