import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ICommandPalette, InputDialog, showDialog, showErrorMessage} from '@jupyterlab/apputils';
/**
 * Initialization data for the plotly-extension extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'plotly-extension',
  description: 'Extension To Produce A Dialog Box',
  autoStart: true,
  requires: [ICommandPalette],
  activate: (app: JupyterFrontEnd, palette: ICommandPalette) => {
    console.log('JupyterLab extension jupyterlab_apod is activated!');
    console.log('ICommandPalette:', palette);
    const command: string = 'plotly-extension:open-dialog'

    app.commands.addCommand(command, {
      label: 'plotly-extension:open-dialog',
      execute: () => {
        // Display initial Dialog when the command is initiated
        InputDialog.getText({ title: 'Provide a text' }).then(value => {
          // Check if input is empty
          if (value.value && value.value != ""){
            const input: string = String(value.value)
            showDialog({
              title: 'Confirmation Message',   
              body: input,
            })
          }
          else
          {
            showErrorMessage("Input Error", "Dialog Input Was Empty")
          }

        });
      }
    });


    palette.addItem({command: command, category: 'ui',args: {}});
  }
};



export default plugin;
