export class Note {
    constructor(
        public title: string,
        public content: string,
        public deadline: string,
        public labels: string,
        public favorite: boolean,
        public _id?: string,
    ) { }
}