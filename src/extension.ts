import * as vscode from 'vscode';
import { getterGen, setterGen, getterSetterGen } from './generators';

export function activate(context: vscode.ExtensionContext) {
	let createGetter = vscode.commands.registerCommand(
		'cs-get-set-gen.create-getter',
		() => {
			vscode.window.showInformationMessage('getter');
		}
	);

	let createSetter = vscode.commands.registerCommand(
		'cs-get-set-gen.create-setter',
		() => {
			vscode.window.showInformationMessage('setter');
			}
		}
	);

	let createGetterAndSetter = vscode.commands.registerCommand(
		'cs-get-set-gen.create-getter-and-setter',
		() => {
			vscode.window.showInformationMessage('getterSetter');
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
