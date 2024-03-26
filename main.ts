import {
	App,
	MarkdownPostProcessorContext,
	Plugin,
	PluginSettingTab,
	Setting,
} from "obsidian";
import * as path from "path";

// Remember to rename these classes and interfaces!

interface BookGallerySettings {
	coverFolder: string;
}

const DEFAULT_SETTINGS: BookGallerySettings = {
	coverFolder: "_resources",
};

export default class BookGallery extends Plugin {
	settings: BookGallerySettings;

	async onload() {
		await this.loadSettings();

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SampleSettingTab(this.app, this));

		this.registerMarkdownCodeBlockProcessor(
			"bookgallery",
			this.drawGallery()
		);
	}

	onunload() {}

	async loadSettings() {
		this.settings = {
			...DEFAULT_SETTINGS,
			...(await this.loadData()),
		};
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	private drawGallery() {
		return (
			source: string,
			el: HTMLElement,
			ctx: MarkdownPostProcessorContext
		) => {
			const gallery = document.createElement("div");
			el.appendChild(gallery);

			let style = undefined;
			let c1 = undefined;
			let c2 = undefined;
			const books = source.split("\n");
			books.forEach((book) => {
				if (book.startsWith("BGSTYLE:")) {
					style = book.split(":")[1];
					return;
				}
				if (book.startsWith("C1:")) {
					c1 = book.split(":")[1];
					return;
				}
				if (book.startsWith("C2:")) {
					c2 = book.split(":")[1];
					return;
				}
				gallery.appendChild(this.drawBook(book));
			});

			if (c1 && c2) {
				style = `linear-gradient(54deg, ${c1} 0%, ${c2} 100%)`;
			}

			gallery.classList.add("book-gallery");
			if (style) {
				console.log(style);
				gallery.style.setProperty("background", style);
			}
		};
	}

	private drawBook(src: string) {
		const book = document.createElement("figure");
		book.classList.add("book-cover");
		const imgwrapper = document.createElement("div");
		imgwrapper.classList.add("img-wrapper");
		const img = document.createElement("img");
		img.src = this.expandPath(src);
		imgwrapper.appendChild(img);
		book.appendChild(imgwrapper);
		return book;
	}

	private isLocalFile(src: string) {
		return !src.startsWith("https://") && !src.startsWith("http://");
	}

	private expandPath(src: string) {
		if (this.isLocalFile(src)) {
			return app.vault.adapter.getResourcePath(
				path.join(this.settings.coverFolder, src)
			);
		}
		return src;
	}
}

class SampleSettingTab extends PluginSettingTab {
	plugin: BookGallery;

	constructor(app: App, plugin: BookGallery) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName("Cover Folder")
			.setDesc("Folder where the book covers are stored.")
			.addText((text) =>
				text
					.setPlaceholder("Folder name")
					.setValue(this.plugin.settings.coverFolder)
					.onChange(async (value) => {
						this.plugin.settings.coverFolder = value;
						await this.plugin.saveSettings();
					})
			);
	}
}
