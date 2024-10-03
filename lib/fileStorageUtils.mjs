function generateUniqueFileName(file) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9)
    const fileName = file.fieldname + "-" + uniqueSuffix + "-" + file.originalname
    return fileName;
}




export { generateUniqueFileName }