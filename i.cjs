// generateColors.js
const { generate, presetPalettes, gray } = require('@ant-design/colors');

// 1. 获取 Ant Design 的 13 个色板名称
// presetPalettes 包含：red, volcano, orange, gold, yellow, lime, green, cyan, blue, geekblue, purple, magenta
// 灰色需要单独引入：gray
const colorNames = [
	'red',
	'volcano',
	'orange',
	'gold',
	'yellow',
	'pink',
	'lime',
	'green',
	'cyan',
	'blue',
	'geekblue',
	'purple',
	'magenta',
	'gray',
];

let cssVariables = ':root {\n';

colorNames.forEach((name) => {
	// 获取颜色数组，每个色板包含10个从浅到深的颜色
	const colorPalette = name === 'gray' ? gray : presetPalettes[name];

	// 转换为以 --svant- 开头的 CSS 自定义属性
	colorPalette.forEach((color, index) => {
		const variableName = `--svant-${name}-${index + 1}`; // 例如 --svant-red-1
		cssVariables += `  ${variableName}: ${color};\n`;
	});
});

cssVariables += '}';

// 输出结果
console.log(cssVariables);
// 你也可以将结果写入文件
// const fs = require('fs');
// fs.writeFileSync('antd-colors.css', cssVariables);
