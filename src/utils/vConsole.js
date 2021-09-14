export const vConsoleTools = () => {
  if (process.env.IS_DEV) {
    const vConsole = require('vconsole')
    new vConsole()
  }
}
