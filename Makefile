install: 
		npm install

start: 
		npx babel-node -- src/bin/gendiff.js

publish:
		npx eslint .
		npm test
		npm publish

lint:
		npx eslint .

test:
		npm test

watch:
		npx jest --watch