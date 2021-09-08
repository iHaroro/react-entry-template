export const vConsoleTools = () => {
  if (process.env.NODE_ENV === 'development') {
    const vConsole = require('vconsole')
    new vConsole()
  }
}
