# Obsidian Book Gallery

This plugin allows you to show a nice image to showcase a book gallery on a note. I made this plugin because I was tired of having to "composite" the gallery image for my blog posts, and I thought it would be nice to do that automatically with CSS and a bit of Obsidian magic.

This plugin is developed for my personal use case but mybe it can be useful to someone else too.

## Example

The plugin works very simply. you have to create a conde fence of type `bookgallery` and put inside:

1. The gradient colors (`C1:` and `C2:`). It should work with any CSS color format (e.g., `rgb`, `hsl`, color names such as `red`, or the exadecimal format `#ff0000`).
2. The images you want to show in the gallery. They should be book covers, in some resonable aspect ratio. The images should be in whatever folder you have configured as the assets folder.

````markdown
```bookgallery
C1: rgb(162 193 199)
C2: rgb(87 110 112)
the-lost-cause-doctorow.jpeg
faster-than-light.webp
how-to-be-a-leader.png
```
````

Result:

![gallery](https://github.com/THeK3nger/obsidian-book-gallery/assets/133159/04ebe2fc-5a09-4641-91a3-e97dbb288fcc)


## Installation

### From within Obsidian

This plugin is experimental and it is not yet present in the community plugins list. If you think it will be useful, I'll put in there too. Let me know.

### Manual Installation

You can install it manually by downloading the latest release from the releases page and extracting the zip into your vault's plugins folder.

## Known issues

For some reason, at the moment it doesn't work in mobile. It should not be difficult (after all, it is just CSS) so if you want to give it a try, I'll be happy to accept PRs. (Mobile support is not a priority for me at the moment.)
