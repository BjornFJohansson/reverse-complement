import { Plugin, MarkdownView, Editor, Notice } from "obsidian";

export default class ReverseComplementPlugin extends Plugin {
  async onload() {
	this.addRibbonIcon('dice', 'Greet', () => {
	  new Notice('Reverse Complement!');
	});
    this.registerEvent(
      this.app.workspace.on("editor-menu", (menu, editor: Editor, view) => {
        const selectedText = editor.getSelection();
        if (selectedText && selectedText.trim().length > 0) {
          menu.addItem((item) => {
            item.setTitle("Reverse Complement")
              .setIcon("rotate-ccw")
              .onClick(() => {
                const transformed = reverseComplement(selectedText);
                editor.replaceSelection(transformed);
              });
          });
        }
      })
    );
  }

  onunload() {
    // Nothing special to clean up
  }
}

function reverseComplement(dna: string): string {
  const complementMap: Record<string, string> = {
    A: "T", T: "A",
    C: "G", G: "C",
    a: "t", t: "a",
    c: "g", g: "c",
  };

  return dna
    .split("")
    .reverse()
    .map(base => complementMap[base] || base)
    .join("");
}
