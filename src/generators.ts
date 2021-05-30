import * as vscode from 'vscode';

function createGetFunction(line: Line) {
	let conf = vscode.workspace.getConfiguration('cs-get-set-gen');
	let prefix = conf.get('getPrefix');
	let functionStr = `public ${line.dataType} ${prefix}${
		line.variableName.charAt(0).toUpperCase() + line.variableName.slice(1)
	}()`;
	if (conf.get('useLambda')) {
		functionStr += ` => this.${line.variableName};`;
	} else {
		functionStr += ` {return this.${line.variableName};}`;
	}
	return functionStr;
}

function createSetFunction(line: Line) {
	let conf = vscode.workspace.getConfiguration('cs-get-set-gen');
	let prefix = conf.get('setPrefix');
	let functionStr = `public void ${prefix}${
		line.variableName.charAt(0).toUpperCase() + line.variableName.slice(1)
	}(${line.dataType} ${line.variableName})`;

	functionStr += ` {this.${line.variableName} =  ${line.variableName};}`;

	return functionStr;
}

export function getterGen(activeEditor: vscode.TextEditor) {
	let currentLine = activeEditor.document.lineAt(
		activeEditor.selection.active.line
	).text;

	vscode.window.showInformationMessage(currentLine);

	let token = getTokensFromSelection(currentLine);
	let functionStr = createGetFunction(token);
	vscode.window.showInformationMessage(functionStr);
}

export function setterGen(activeEditor: vscode.TextEditor) {
	let currentLine = activeEditor.document.lineAt(
		activeEditor.selection.active.line
	).text;

	vscode.window.showInformationMessage(currentLine);

	let token = getTokensFromSelection(currentLine);
	let functionStr = createSetFunction(token);
	vscode.window.showInformationMessage(functionStr);
}
export function getterSetterGen(activeEditor: vscode.TextEditor) {
	let currentLine = activeEditor.document.lineAt(
		activeEditor.selection.active.line
	).text;

	let token = getTokensFromSelection(currentLine);

	let getFunctionStr = createGetFunction(token);
	let setFunctionStr = createSetFunction(token);

	vscode.window.showInformationMessage(getFunctionStr);
	vscode.window.showInformationMessage(setFunctionStr);

	insertFunction(getFunctionStr, activeEditor);
	insertFunction(setFunctionStr, activeEditor);
}

function insertFunction(functionStr: String, activeEditor: vscode.TextEditor) {}

function getTokensFromSelection(line: String): Line {
	let leftSide: string[];

	if (line.includes('//')) {
		//remove comments
		line = line.split('//')[0];
	} else if (line.includes('/*')) {
		line = line.split('/*')[0];
	}

	if (line.includes('=')) {
		// check for assignment to variable
		leftSide = line.split('=')[0].split(' ').reverse();
	} else {
		line = line.slice(0, -1); // remove semicolon
		leftSide = line.split(' ').reverse(); // reversing the array ensures datatype is index 1 and name is index 0
	}
	leftSide = leftSide.filter((x) => x.length > 0); // in some cases empty strings would remain in array

	let tokenized = new Line(leftSide[1], leftSide[0]);
	vscode.window.showInformationMessage(JSON.stringify(tokenized));
	return tokenized;
}

class Line {
	dataType: String;
	variableName: String;

	constructor(dataType: String, variableName: String) {
		this.dataType = dataType;
		this.variableName = variableName;
	}
}
