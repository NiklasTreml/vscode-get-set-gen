import * as vscode from 'vscode';
import { getterGen, setterGen, getterSetterGen } from './generators';

export function activate(context: vscode.ExtensionContext) {
	let createGetter = vscode.commands.registerTextEditorCommand(
		'cs-get-set-gen.create-getter',
		(activeEditor, edit, args) => {
			getterGen(activeEditor, edit);
		}
	);

	let createSetter = vscode.commands.registerTextEditorCommand(
		'cs-get-set-gen.create-setter',
		(activeEditor, edit, args) => {
			setterGen(activeEditor, edit);
		}
	);

	let createGetterAndSetter = vscode.commands.registerTextEditorCommand(
		'cs-get-set-gen.create-getter-and-setter',
		function (activeEditor, edit, args) {
			getterSetterGen(activeEditor, edit);
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
