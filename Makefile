install: 
		npm install

start: 
		npx babel-node -- src/bin/gendiff.js

publish:
		npx eslint .
		npm publish

lint:
		npx eslint .