class NotFoundError extends Error {
    constructor() {
        super();
        this.statusCode = 404;
        this.name = "NotFoundError";
    }
}

export { NotFoundError };