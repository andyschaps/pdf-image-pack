var sizeOf = require('image-size')
var fs = require("fs")
var PDFDocument = require('pdfkit')
var dimension = require("./lib/dimension.js")

// image resource
var Resource = function(image){
  this.path = image
  this.size = sizeOf(image)
}

var calcMaxSize = function(imageSet){
  var maxWidth = 0
  var maxHeight = 0

  imageSet.forEach(function(res){
    var size = res.size
    maxWidth = Math.max(maxWidth, size.width)
    maxHeight = Math.max(maxHeight, size.height)
  })
  return [maxWidth, maxHeight]
}

var createDoc = function(imgs, options){
  var images = imgs.map(function(img){
    var res = new Resource(img)
    return res
  })

  // Construct the document with the size of the first image so the first page is that size
  res = images[0]
  options.size = [res.size.width, res.size.height]
  var doc = new PDFDocument(options)

  // Add each image to a PDF page
  images.forEach(function(res, i){
    // Use the image size as the page size for each image/page after the first
    if(i > 0){
      pageOptions = {size : [res.size.width, res.size.height]}
      doc.addPage(pageOptions)
    }
    doc.image(res.path, 0, 0, res.size)
  })
  return doc
}

var PDFImagePack = function(options){
  this.options = options || {}
}

PDFImagePack.prototype.createDoc = function(images){
  return createDoc(images, this.options)
}

PDFImagePack.prototype.output = function(images, output, cb){
  var doc = this.createDoc(images)

  var stream = undefined
  if(typeof output == "string"){
    stream = fs.createWriteStream(output)
  }else{
    stream = output
  }
  doc.pipe(stream)

  // bind event
  stream.on('error', function(err){
    cb(err)
  })
  stream.on('finish', function(){
    cb(null, doc)
  })
  doc.end()
}

module.exports = PDFImagePack
