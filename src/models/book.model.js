exports.Book = class Book {
    constructor(bookId, title, ibsn, description, publisher, author, pages) {
        this.bookId = bookId
        this.title = title
        this.ibsn = ibsn
        this.description = description
        this.publisher = publisher
        this.author = author
        this.pages = pages
    }
}