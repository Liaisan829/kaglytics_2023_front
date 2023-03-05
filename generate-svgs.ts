const svgstore = require('svgstore');
const fs = require('fs');
const path = require('path');

let sprite = svgstore();

const folder = './src/svg-icons';

// @ts-ignore
fs.readdir(folder, (err, files) => {
	// @ts-ignore
	files.forEach(file => {
		sprite = sprite.add(file.split('.')[0], fs.readFileSync(path.join(folder, file), 'utf8'));
	});

	fs.writeFileSync('./src/assets/sprite.svg', sprite);
});

