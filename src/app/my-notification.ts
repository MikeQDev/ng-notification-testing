export class MyNotification {
    id: number;
    title: string;
    message: string;
    acknowledged: boolean;
    public constructor(id: number, title: string, message: string, acknowledged: boolean = false) {
        this.id = id;
        this.title = title;
        this.message = message;
        this.acknowledged = acknowledged;
    }
}
