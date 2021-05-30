import * as vscode from 'vscode';
import { getterGen, setterGen, getterSetterGen } from './generators';

export function activate(context: vscode.ExtensionContext) {
	let createGetter = vscode.commands.registerTextEditorCommand(
		'cs-get-set-gen.create-getter',
		(activeEditor) => {
			getterGen(activeEditor);
		}
	);

	let createSetter = vscode.commands.registerTextEditorCommand(
		'cs-get-set-gen.create-setter',
		(activeEditor) => {
			setterGen(activeEditor);
		}
	);

	let createGetterAndSetter = vscode.commands.registerTextEditorCommand(
		'cs-get-set-gen.create-getter-and-setter',
		(activeEditor) => {
			getterSetterGen(activeEditor);
		}
	);

	context.subscriptions.push(
		createGetter,
		createSetter,
		createGetterAndSetter
	);
}

// this method is called when your extension is deactivated
export function deactivate() {}
