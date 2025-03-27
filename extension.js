const vscode = require("vscode");
const path = require("path");
const player = require("play-sound")(); // Import play-sound library

function activate(context) {
  // Register the playSaveSound command
  // Register the playSaveSound command

  
  let playSoundCommand = vscode.commands.registerCommand(
    "austinGroovy.playSaveSound",
    () => {
      playSaveSound();
    }
  );

  // Register the onDidSaveTextDocument event
  let disposable = vscode.workspace.onDidSaveTextDocument(() => {
    const config = vscode.workspace.getConfiguration("austinGroovy");
    const isEnabled = config.get("enableSaveSound", true); // Default to true
    if (isEnabled) {
      playSaveSound();
    }
  });

  // Add both to the context's subscriptions

  context.subscriptions.push(playSoundCommand, disposable);

}


function playSaveSound() {
  const soundFiles = ["yeahBaby.mp3", "groovy.mp3", "oh.mp3", "yeahbabyhaha.mp3", "bhave.mp3"];
  const randomSound = soundFiles[Math.floor(Math.random() * soundFiles.length)];

  const audioPath = path.join(__dirname, "sounds", randomSound);

  player.play(audioPath, (err) => {
    if (err) {
      vscode.window.showErrorMessage("Failed to play sound: " + err.message);
    }
  });
}

function deactivate() {}

module.exports = { activate, deactivate };
