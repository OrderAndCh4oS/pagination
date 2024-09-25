function* rangeIter(a: number, b: number): Generator<number> {
    for (let i = a; i <= b; ++i) yield i;
}

export default function paginate(
    page: number,
    total: number,
    limit: number,
    maxRange = 5,
): number[] {
    const pageCount = Math.ceil(total / limit);
    switch (true) {
        case page < 1 || page > pageCount:
            return [];
        case pageCount <= maxRange * 2:
            return [...rangeIter(1, pageCount)];
        case page <= maxRange:
            return [...rangeIter(1, maxRange), -1, pageCount];
        case page > pageCount - maxRange:
            return [1, -1, ...rangeIter(pageCount - maxRange, pageCount)];
        default:
            return [
                1,
                -1,
                ...rangeIter(page - ~~(maxRange / 2), page + ~~(maxRange / 2)),
                -1,
                pageCount,
            ];
    }
}

console.log(paginate(1, 1000, 10, 20));
console.log(paginate(10, 1000, 10, 20));
console.log(paginate(20, 1000, 10, 20));
console.log(paginate(50, 1000, 10, 20));
console.log(paginate(90, 1000, 10, 20));
console.log(paginate(100, 1000, 10, 20));

console.log(paginate(1, 1000, 10, 20));
console.log(paginate(10, 1000, 10, 20));
console.log(paginate(20, 1000, 10, 20));
console.log(paginate(50, 1000, 10, 20));
console.log(paginate(90, 1000, 10, 20));
console.log(paginate(100, 1000, 10, 20));
