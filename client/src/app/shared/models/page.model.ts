export class Pagination {
    currentPage: number = 1;
    pageSize: number = 10;
    totalPage: number;
    totalSize: number;

    constructor(currentPage?: number, pageSize?: number) {
        if (currentPage) this.currentPage = currentPage;
        if (pageSize) this.pageSize = pageSize;
    }
}