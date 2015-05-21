# PDF Image Pack
Create conclude some images PDF slide for node.js.
PDF generated by [PDFKit](http://pdfkit.org/)

# Usage

```js
var PDFImagePack = require("../pdf-image-pack")

var imgs = [
  "./fixture/basic/a.png",
  "./fixture/basic/b.png",
]
var output = "./tmp/out.pdf"
var slide = new PDFImagePack()
slide.output(imgs, output, function(err, doc){
  console.log("finish output")
})

```


# API

## new PDFImagePack([optoon])
- construction
- options
  - option for PDFKit

## PDFImagePack.createDoc(images)
- return pdf slide object with pdfkit
- images
  - images path array

## PDFImagePack.output(images, output, callback)
- output pdf slide file
- images {Array}
  - images path array
- output {String | Stream}
  - output destination.
  - if string, use as output path
- callback {Function}
