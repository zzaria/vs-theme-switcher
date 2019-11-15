import * as code from "vscode";
import ConfigurationManager from "./ConfigurationManager";
import ThemeScheduler from "./ThemeScheduler";

const scheduler = new ThemeScheduler();

export async function activate(context: code.ExtensionContext) {
  refresh();

  code.workspace.onDidChangeConfiguration(({ affectsConfiguration }) => {
    if (affectsConfiguration(ConfigurationManager.MAPPINGS_CONFIGURATION)) {
      refresh();
    }
  });
}

function refresh() {
  const mappings = ConfigurationManager.getMappings();

  if (mappings) {
    scheduler.scheduleAll(mappings);
  }
}

export function deactivate() {
  scheduler.clear();
}
