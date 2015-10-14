#!/bin/bash

mkdir "src/php/components/$1"

touch "src/php/components/$1/$1.php"
touch "src/php/components/$1/$1.js"

touch "src/sass/organisms/_$1.scss"

echo $'\n' >> src/sass/organisms/_all.scss
echo "@import \"$1\";" >> src/sass/organisms/_all.scss
